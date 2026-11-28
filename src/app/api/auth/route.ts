import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth-session";
import {
  PASSWORD_MIN_LENGTH,
  validatePassword,
  validatePasswordMatch,
  validateUsername,
} from "@/lib/auth-validation";
import {
  checkRateLimit,
  formatRetryAfterPt,
  recordFailedAttempt,
  resetRateLimit,
} from "@/lib/rate-limit";
import {
  getStorageMode,
  hashPassword,
  loadUserAccount,
  normalizeUsername,
  saveUserAccount,
  verifyPassword,
} from "@/lib/user-storage";
import type { UserProfileData } from "@/types/story";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

function getRateLimitKeys(ip: string, username: string): string[] {
  const keys = [`ip:${ip}`];
  if (username) {
    keys.push(`user:${username}`);
    keys.push(`ip-user:${ip}:${username}`);
  }
  return keys;
}

// Hash dummy usado quando o usuário não existe, para evitar enumeração por tempo de resposta
const DUMMY_SALT = "00112233445566778899aabbccddeeff";
const DUMMY_HASH =
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const sessionUser = verifySessionToken(token);
    if (!sessionUser) {
      return NextResponse.json({ ok: false, storageMode: getStorageMode() });
    }

    const existing = await loadUserAccount(sessionUser);
    if (!existing) {
      return NextResponse.json({ ok: false, storageMode: getStorageMode() });
    }

    return NextResponse.json({
      ok: true,
      username: existing.username,
      profile: existing.profile,
      storageMode: getStorageMode(),
    });
  } catch (err) {
    console.error("Auth GET Error:", err);
    return NextResponse.json(
      { ok: false, error: "Erro ao verificar sessão." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      action,
      username,
      password,
      passwordConfirm,
      currentPassword,
      newPassword,
      newPasswordConfirm,
      profile,
    } = body as {
      action: "login" | "register" | "sync" | "logout" | "change-password";
      username?: string;
      password?: string;
      passwordConfirm?: string;
      currentPassword?: string;
      newPassword?: string;
      newPasswordConfirm?: string;
      profile?: UserProfileData;
    };

    if (action === "logout") {
      const response = NextResponse.json({ ok: true });
      response.cookies.set(SESSION_COOKIE_NAME, "", getSessionCookieOptions(0));
      return response;
    }

    if (action === "change-password") {
      const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      const sessionUser = verifySessionToken(token);
      if (!sessionUser) {
        return NextResponse.json(
          { error: "Sessão inválida ou expirada. Faça login novamente." },
          { status: 401 }
        );
      }

      const ip = getClientIp(request);
      const rateKeys = getRateLimitKeys(ip, `cpw:${sessionUser}`);
      for (const key of rateKeys) {
        const status = checkRateLimit(key);
        if (!status.allowed) {
          return NextResponse.json(
            {
              error: `Muitas tentativas inválidas. Aguarde ${formatRetryAfterPt(
                status.retryAfterSeconds
              )} para tentar novamente.`,
              retryAfterSeconds: status.retryAfterSeconds,
            },
            { status: 429 }
          );
        }
      }

      if (!currentPassword) {
        return NextResponse.json(
          { error: "Informe sua senha atual.", errors: ["Informe sua senha atual."] },
          { status: 400 }
        );
      }

      const existing = await loadUserAccount(sessionUser);
      if (!existing) {
        return NextResponse.json(
          { error: "Conta não encontrada." },
          { status: 404 }
        );
      }

      if (!verifyPassword(currentPassword, existing.passwordSalt, existing.passwordHash)) {
        let maxRetry = 0;
        for (const key of rateKeys) {
          const res = recordFailedAttempt(key);
          if (!res.allowed) maxRetry = Math.max(maxRetry, res.retryAfterSeconds);
        }
        if (maxRetry > 0) {
          return NextResponse.json(
            {
              error: `Muitas tentativas inválidas. Aguarde ${formatRetryAfterPt(
                maxRetry
              )} para tentar novamente.`,
              retryAfterSeconds: maxRetry,
            },
            { status: 429 }
          );
        }
        return NextResponse.json(
          { error: "Senha atual incorreta.", errors: ["Senha atual incorreta."] },
          { status: 401 }
        );
      }

      const pwValidation = validatePassword(newPassword || "", sessionUser);
      const matchValidation = validatePasswordMatch(
        newPassword || "",
        newPasswordConfirm || ""
      );
      const errors = [...pwValidation.errors];
      if (!matchValidation.ok && matchValidation.error) {
        errors.push(matchValidation.error);
      }
      if (newPassword && newPassword === currentPassword) {
        errors.push("A nova senha deve ser diferente da senha atual.");
      }

      if (errors.length > 0) {
        return NextResponse.json(
          { error: errors[0], errors },
          { status: 400 }
        );
      }

      for (const key of rateKeys) {
        resetRateLimit(key);
      }

      const { salt, hash } = hashPassword(newPassword!);
      const now = new Date().toISOString();
      await saveUserAccount({
        ...existing,
        passwordSalt: salt,
        passwordHash: hash,
        updatedAt: now,
      });

      return NextResponse.json({ ok: true });
    }

    if (action === "register") {
      const userValidation = validateUsername(username || "");
      const cleanUser = userValidation.normalized;
      const pwValidation = validatePassword(password || "", cleanUser);
      const matchValidation = validatePasswordMatch(
        password || "",
        passwordConfirm || ""
      );

      const errors = [...userValidation.errors, ...pwValidation.errors];
      if (!matchValidation.ok && matchValidation.error) {
        errors.push(matchValidation.error);
      }

      if (errors.length > 0) {
        return NextResponse.json(
          { error: errors[0], errors },
          { status: 400 }
        );
      }

      const existing = await loadUserAccount(cleanUser);
      if (existing) {
        const msg = "Este nome de usuário já existe. Escolha outro ou faça login.";
        return NextResponse.json(
          { error: msg, errors: [msg] },
          { status: 409 }
        );
      }

      const { salt, hash } = hashPassword(password!);
      const now = new Date().toISOString();
      const initialProfile: UserProfileData = profile
        ? { ...profile, username: cleanUser, updatedAt: now }
        : {
            username: cleanUser,
            preferences: {
              zhFont: "app",
              fontSizeStep: "lg",
              fontSizePx: 28,
              pinyinMode: "on",
              highlightAboveLevel: true,
              audioSpeed: 1.0,
              darkMode: false,
            },
            chapterProgress: {},
            savedVocabulary: {},
            updatedAt: now,
          };

      await saveUserAccount({
        username: cleanUser,
        passwordSalt: salt,
        passwordHash: hash,
        profile: initialProfile,
        updatedAt: now,
      });

      const response = NextResponse.json({
        ok: true,
        username: cleanUser,
        profile: initialProfile,
        needsPasswordUpgrade: false,
        storageMode: getStorageMode(),
      });
      response.cookies.set(
        SESSION_COOKIE_NAME,
        createSessionToken(cleanUser),
        getSessionCookieOptions()
      );
      return response;
    }

    const cleanUser = normalizeUsername(username || "");

    if (action === "login") {
      if (!cleanUser || !password) {
        return NextResponse.json(
          { error: "Informe usuário e senha." },
          { status: 400 }
        );
      }

      const ip = getClientIp(request);
      const rateKeys = getRateLimitKeys(ip, cleanUser);
      for (const key of rateKeys) {
        const status = checkRateLimit(key);
        if (!status.allowed) {
          return NextResponse.json(
            {
              error: `Muitas tentativas de login. Aguarde ${formatRetryAfterPt(
                status.retryAfterSeconds
              )} para tentar novamente.`,
              retryAfterSeconds: status.retryAfterSeconds,
            },
            { status: 429 }
          );
        }
      }

      const existing = await loadUserAccount(cleanUser);
      const passwordValid = existing
        ? verifyPassword(password, existing.passwordSalt, existing.passwordHash)
        : (verifyPassword(password, DUMMY_SALT, DUMMY_HASH), false);

      if (!existing || !passwordValid) {
        let maxRetry = 0;
        for (const key of rateKeys) {
          const res = recordFailedAttempt(key);
          if (!res.allowed) maxRetry = Math.max(maxRetry, res.retryAfterSeconds);
        }
        if (maxRetry > 0) {
          return NextResponse.json(
            {
              error: `Muitas tentativas inválidas. Aguarde ${formatRetryAfterPt(
                maxRetry
              )} para tentar novamente.`,
              retryAfterSeconds: maxRetry,
            },
            { status: 429 }
          );
        }
        return NextResponse.json(
          { error: "Usuário ou senha inválidos." },
          { status: 401 }
        );
      }

      for (const key of rateKeys) {
        resetRateLimit(key);
      }

      // Mescla progresso local de visitante com a conta na nuvem ao fazer login
      const mergedProfile: UserProfileData = {
        ...existing.profile,
        username: cleanUser,
        chapterProgress: {
          ...(profile?.chapterProgress || {}),
          ...(existing.profile.chapterProgress || {}),
        },
        savedVocabulary: {
          ...(profile?.savedVocabulary || {}),
          ...(existing.profile.savedVocabulary || {}),
        },
        updatedAt: new Date().toISOString(),
      };

      await saveUserAccount({
        ...existing,
        profile: mergedProfile,
        updatedAt: mergedProfile.updatedAt,
      });

      const response = NextResponse.json({
        ok: true,
        username: cleanUser,
        profile: mergedProfile,
        needsPasswordUpgrade: password.length < PASSWORD_MIN_LENGTH,
        storageMode: getStorageMode(),
      });
      response.cookies.set(
        SESSION_COOKIE_NAME,
        createSessionToken(cleanUser),
        getSessionCookieOptions()
      );
      return response;
    }

    if (action === "sync") {
      if (!cleanUser) {
        return NextResponse.json(
          { error: "Nome de usuário inválido." },
          { status: 400 }
        );
      }

      const existing = await loadUserAccount(cleanUser);
      if (!existing) {
        return NextResponse.json(
          { error: "Conta não encontrada para sincronização." },
          { status: 404 }
        );
      }

      const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      const sessionUser = verifySessionToken(token);
      const hasValidCookie = sessionUser === cleanUser;
      const hasValidPassword =
        Boolean(password) &&
        verifyPassword(password!, existing.passwordSalt, existing.passwordHash);

      if (!hasValidCookie && !hasValidPassword) {
        return NextResponse.json(
          { error: "Sessão inválida ou expirada. Faça login novamente." },
          { status: 401 }
        );
      }

      if (profile) {
        const now = new Date().toISOString();
        const updatedProfile: UserProfileData = {
          ...profile,
          username: cleanUser,
          updatedAt: now,
        };
        await saveUserAccount({
          ...existing,
          profile: updatedProfile,
          updatedAt: now,
        });
        const response = NextResponse.json({
          ok: true,
          username: cleanUser,
          profile: updatedProfile,
          storageMode: getStorageMode(),
        });
        if (!hasValidCookie && hasValidPassword) {
          response.cookies.set(
            SESSION_COOKIE_NAME,
            createSessionToken(cleanUser),
            getSessionCookieOptions()
          );
        }
        return response;
      }

      return NextResponse.json({
        ok: true,
        username: cleanUser,
        profile: existing.profile,
        storageMode: getStorageMode(),
      });
    }

    return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
  } catch (err) {
    console.error("Auth/Sync API Error:", err);
    return NextResponse.json(
      { error: "Erro ao processar sincronização de perfil." },
      { status: 500 }
    );
  }
}
