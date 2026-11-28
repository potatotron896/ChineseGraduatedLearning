export interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockMs: number;
}

interface AttemptEntry {
  failures: number;
  firstFailureAt: number;
  blockedUntil: number;
}

export interface RateLimitStatus {
  allowed: boolean;
  retryAfterSeconds: number;
  remainingAttempts: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 10 * 60 * 1000, // 10 minutos
  blockMs: 10 * 60 * 1000, // 10 minutos de bloqueio
};

const store = new Map<string, AttemptEntry>();

function cleanupExpired(now: number, config: RateLimitConfig) {
  if (store.size < 500) return;
  for (const [key, entry] of store.entries()) {
    const expiredBlock = entry.blockedUntil > 0 && now > entry.blockedUntil;
    const expiredWindow =
      entry.blockedUntil === 0 && now - entry.firstFailureAt > config.windowMs;
    if (expiredBlock || expiredWindow) {
      store.delete(key);
    }
  }
}

export function checkRateLimit(
  key: string,
  now = Date.now(),
  config: RateLimitConfig = DEFAULT_CONFIG
): RateLimitStatus {
  const entry = store.get(key);
  if (!entry) {
    return {
      allowed: true,
      retryAfterSeconds: 0,
      remainingAttempts: config.maxAttempts,
    };
  }

  if (entry.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.blockedUntil - now) / 1000)),
      remainingAttempts: 0,
    };
  }

  if (now - entry.firstFailureAt > config.windowMs) {
    store.delete(key);
    return {
      allowed: true,
      retryAfterSeconds: 0,
      remainingAttempts: config.maxAttempts,
    };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remainingAttempts: Math.max(0, config.maxAttempts - entry.failures),
  };
}

export function recordFailedAttempt(
  key: string,
  now = Date.now(),
  config: RateLimitConfig = DEFAULT_CONFIG
): RateLimitStatus {
  cleanupExpired(now, config);

  const existing = store.get(key);
  if (!existing || (existing.blockedUntil > 0 && now > existing.blockedUntil) || now - existing.firstFailureAt > config.windowMs) {
    const failures = 1;
    const blockedUntil = failures >= config.maxAttempts ? now + config.blockMs : 0;
    store.set(key, { failures, firstFailureAt: now, blockedUntil });
    return {
      allowed: blockedUntil === 0,
      retryAfterSeconds: blockedUntil > 0 ? Math.ceil(config.blockMs / 1000) : 0,
      remainingAttempts: Math.max(0, config.maxAttempts - failures),
    };
  }

  const failures = existing.failures + 1;
  const blockedUntil = failures >= config.maxAttempts ? now + config.blockMs : 0;
  store.set(key, {
    failures,
    firstFailureAt: existing.firstFailureAt,
    blockedUntil,
  });

  return {
    allowed: blockedUntil === 0,
    retryAfterSeconds: blockedUntil > 0 ? Math.ceil(config.blockMs / 1000) : 0,
    remainingAttempts: Math.max(0, config.maxAttempts - failures),
  };
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}

export function formatRetryAfterPt(seconds: number): string {
  if (seconds >= 60) {
    const mins = Math.ceil(seconds / 60);
    return `${mins} ${mins === 1 ? "minuto" : "minutos"}`;
  }
  return `${seconds} ${seconds === 1 ? "segundo" : "segundos"}`;
}
