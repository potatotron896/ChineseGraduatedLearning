import { NextResponse } from "next/server";
import {
  hashPassword,
  loadUserAccount,
  normalizeUsername,
  saveUserAccount,
  verifyPassword,
} from "@/lib/user-storage";
import type { UserProfileData } from "@/types/story";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, profile } = body as {
      action: "login" | "register" | "sync";
      username: string;
      password?: string;
      profile?: UserProfileData;
    };

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

      return NextResponse.json({
        ok: true,
        username: cleanUser,
        profile: initialProfile,
        storageMode: process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local-json",
      });
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

      // Merge any local guest progress into the cloud account on login
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

      return NextResponse.json({
        ok: true,
        username: cleanUser,
        profile: mergedProfile,
        storageMode: process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local-json",
      });
    }

    if (action === "sync") {
      const existing = await loadUserAccount(cleanUser);
      if (!existing) {
        return NextResponse.json({ error: "Conta não encontrada para sincronização." }, { status: 404 });
      }
      if (password && !verifyPassword(password, existing.passwordSalt, existing.passwordHash)) {
        return NextResponse.json({ error: "Sessão inválida." }, { status: 401 });
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
        return NextResponse.json({
          ok: true,
          username: cleanUser,
          profile: updatedProfile,
          storageMode: process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local-json",
        });
      }

      return NextResponse.json({
        ok: true,
        username: cleanUser,
        profile: existing.profile,
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

