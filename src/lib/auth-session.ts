import crypto from "node:crypto";

export const SESSION_COOKIE_NAME = "wendu_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 dias

function getSessionSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret) {
      throw new Error("AUTH_SECRET deve ser configurado em ambiente de produção.");
    }
    return secret;
  }
  return secret || "wendu-local-dev-secret-change-me";
}

function signPayload(payloadB64: string): string {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(payloadB64)
    .digest("base64url");
}

export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    u: username,
    exp: Date.now() + SESSION_TTL_MS,
  });
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  const sig = signPayload(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return null;

  const expectedSig = signPayload(payloadB64);
  const sigBuf = Buffer.from(sig, "utf8");
  const expectedBuf = Buffer.from(expectedSig, "utf8");
  if (sigBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    ) as { u?: string; exp?: number };
    if (!parsed.u || !parsed.exp || Date.now() > parsed.exp) {
      return null;
    }
    return parsed.u;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

