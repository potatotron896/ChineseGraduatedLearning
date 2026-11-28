import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth-session";
import {
  getStorageMode,
  hashPassword,
  loadUserAccount,
  normalizeUsername,
  saveUserAccount,
  verifyPassword,
} from "@/lib/user-storage";
import type { UserProfileData } from "@/types/story";

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
    const { action, username, password, profile } = body as {
      action: "login" | "register" | "sync" | "logout";
      username?: string;
      password?: string;
      profile?: UserProfileData;
    };

    if (action === "logout") {
      const response = NextResponse.json({ ok: true });
      response.cookies.set(SESSION_COOKIE_NAME, "", getSessionCookieOptions(0));
      return response;
    }

    const cleanUser = normalizeUsername(username || "");
    if (!cleanUser || cleanUser.length < 2) {
      return NextResponse.json(
        { error: "O nome de usuário deve ter pelo menos 2 caracteres (letras ou números)." },
        { status: 400 }
      );
    }

    if (action === "register") {
      if (!password || password.length < 4) {
        return NextResponse.json(
          { error: "A senha deve ter pelo menos 4 caracteres." },
          { status: 400 }
        );
      }

      const existing = await loadUserAccount(cleanUser);
      if (existing) {
        return NextResponse.json(
          { error: "Este nome de usuário já existe. Escolha outro ou faça login." },
          { status: 409 }
        );
      }

      const { salt, hash } = hashPassword(password);
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
        storageMode: getStorageMode(),
      });
      response.cookies.set(
        SESSION_COOKIE_NAME,
        createSessionToken(cleanUser),
        getSessionCookieOptions()
      );
      return response;
    }

    if (action === "login") {
      if (!password) {
        return NextResponse.json({ error: "Informe sua senha." }, { status: 400 });
      }
      const existing = await loadUserAccount(cleanUser);
      if (!existing) {
        return NextResponse.json(
          { error: "Usuário não encontrado. Verifique o nome ou crie uma conta." },
          { status: 404 }
        );
      }
      if (!verifyPassword(password, existing.passwordSalt, existing.passwordHash)) {
        return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
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
