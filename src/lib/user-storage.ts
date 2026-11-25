import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { get, put } from "@vercel/blob";
import type { UserProfileData } from "../types/story";

export interface StoredUserAccount {
  username: string;
  passwordSalt: string;
  passwordHash: string;
  profile: UserProfileData;
  updatedAt: string;
}

const LOCAL_DIR = path.join(process.cwd(), ".data", "users");

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

export function hashPassword(password: string, salt?: string) {
  const actualSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, actualSalt, 64).toString("hex");
  return { salt: actualSalt, hash };
}

export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
}

function hasVercelBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function loadUserAccount(username: string): Promise<StoredUserAccount | null> {
  const clean = normalizeUsername(username);
  if (!clean) return null;

  if (hasVercelBlobToken()) {
    const result = await get(`users/${clean}.json`, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200) return null;

    return (await new Response(result.stream).json()) as StoredUserAccount;
  }

  // Local development file fallback (.data/users/<username>.json)
  const filePath = path.join(LOCAL_DIR, `${clean}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as StoredUserAccount;
  } catch {
    return null;
  }
}

export async function saveUserAccount(account: StoredUserAccount): Promise<void> {
  const clean = normalizeUsername(account.username);
  const payload = JSON.stringify(account, null, 2);

  if (hasVercelBlobToken()) {
    await put(`users/${clean}.json`, payload, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  const filePath = path.join(LOCAL_DIR, `${clean}.json`);
  fs.writeFileSync(filePath, payload, "utf8");
}

