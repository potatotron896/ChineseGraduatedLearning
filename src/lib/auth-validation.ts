export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 24;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

const USERNAME_ALLOWED_REGEX = /^[a-z0-9_.-]+$/;

const RESERVED_USERNAMES = new Set([
  "admin",
  "administrator",
  "administrador",
  "root",
  "system",
  "sistema",
  "support",
  "suporte",
  "wendu",
  "moderator",
  "moderador",
  "mod",
  "staff",
  "null",
  "undefined",
  "api",
  "auth",
  "login",
  "register",
  "logout",
  "guest",
  "visitante",
]);

const COMMON_PASSWORDS = new Set([
  "12345678",
  "123456789",
  "1234567890",
  "password",
  "password1",
  "password123",
  "senha123",
  "senha1234",
  "qwerty123",
  "qwertyui",
  "abc12345",
  "admin123",
  "letmein1",
  "welcome1",
  "11111111",
  "00000000",
  "iloveyou",
  "mudar123",
  "wendu123",
  "changeme",
  "P@ssword1",
  "Pass@123",
  "Senha@123",
  "Admin@123",
].map((p) => p.toLowerCase()));

export interface UsernameValidationResult {
  ok: boolean;
  normalized: string;
  errors: string[];
}

export interface PasswordRuleCheck {
  id:
    | "length"
    | "lowercase"
    | "uppercase"
    | "number"
    | "symbol"
    | "no-username"
    | "not-common"
    | "no-sequence";
  label: string;
  passed: boolean;
}

export interface PasswordValidationResult {
  ok: boolean;
  errors: string[];
  checks: PasswordRuleCheck[];
}

export interface PasswordStrength {
  level: "weak" | "medium" | "strong";
  label: "Fraca" | "Média" | "Forte";
  score: number; // 0 a 100
}

export interface PasswordMatchResult {
  ok: boolean;
  error?: string;
}

export function normalizeUsernameInput(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateUsername(raw: string): UsernameValidationResult {
  const normalized = normalizeUsernameInput(raw);
  const errors: string[] = [];

  if (!normalized) {
    errors.push("Informe um nome de usuário.");
    return { ok: false, normalized, errors };
  }

  if (normalized.length < USERNAME_MIN_LENGTH || normalized.length > USERNAME_MAX_LENGTH) {
    errors.push(
      `O nome de usuário deve ter entre ${USERNAME_MIN_LENGTH} e ${USERNAME_MAX_LENGTH} caracteres.`
    );
  }

  if (!USERNAME_ALLOWED_REGEX.test(normalized)) {
    errors.push("Use apenas letras minúsculas, números, ponto (.), traço (-) ou sublinhado (_).");
  }

  if (normalized.includes("..") || normalized.startsWith(".") || normalized.endsWith(".")) {
    errors.push("O nome de usuário não pode começar, terminar ou conter pontos consecutivos.");
  }

  if (RESERVED_USERNAMES.has(normalized)) {
    errors.push("Este nome de usuário é reservado. Escolha outro.");
  }

  return {
    ok: errors.length === 0,
    normalized,
    errors,
  };
}

function hasRepeatedChars(password: string, runLength = 4): boolean {
  const lower = password.toLowerCase();
  let count = 1;
  for (let i = 1; i < lower.length; i++) {
    if (lower[i] === lower[i - 1]) {
      count++;
      if (count >= runLength) return true;
    } else {
      count = 1;
    }
  }
  return false;
}

function hasSequentialChars(password: string, seqLength = 4): boolean {
  const lower = password.toLowerCase();
  const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  // Sequências numéricas ou alfabéticas crescentes/decrescentes (ex: 1234, abcd, dcba)
  let asc = 1;
  let desc = 1;
  for (let i = 1; i < lower.length; i++) {
    const prev = lower.charCodeAt(i - 1);
    const curr = lower.charCodeAt(i);
    const isAlphaNum =
      (curr >= 48 && curr <= 57 && prev >= 48 && prev <= 57) ||
      (curr >= 97 && curr <= 122 && prev >= 97 && prev <= 122);

    if (isAlphaNum && curr === prev + 1) {
      asc++;
      desc = 1;
    } else if (isAlphaNum && curr === prev - 1) {
      desc++;
      asc = 1;
    } else {
      asc = 1;
      desc = 1;
    }

    if (asc >= seqLength || desc >= seqLength) return true;
  }

  // Sequências de teclado (ex: qwer, asdf)
  for (const row of keyboardRows) {
    for (let i = 0; i <= row.length - seqLength; i++) {
      const sub = row.slice(i, i + seqLength);
      const rev = sub.split("").reverse().join("");
      if (lower.includes(sub) || lower.includes(rev)) {
        return true;
      }
    }
  }

  return false;
}

export function getPasswordChecks(
  password: string,
  username?: string
): PasswordRuleCheck[] {
  const cleanUser = username ? normalizeUsernameInput(username) : "";
  const lowerPw = password.toLowerCase();

  const lengthOk =
    password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH;
  const lowercaseOk = /[a-z]/.test(password);
  const uppercaseOk = /[A-Z]/.test(password);
  const numberOk = /[0-9]/.test(password);
  const symbolOk = /[^A-Za-z0-9]/.test(password);
  const noUsernameOk =
    !cleanUser || cleanUser.length < 3 || !lowerPw.includes(cleanUser);
  const notCommonOk = password.length === 0 || !COMMON_PASSWORDS.has(lowerPw);
  const noSequenceOk =
    password.length === 0 ||
    (!hasRepeatedChars(password, 4) && !hasSequentialChars(password, 4));

  return [
    {
      id: "length",
      label: `Entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres`,
      passed: lengthOk,
    },
    {
      id: "lowercase",
      label: "Pelo menos 1 letra minúscula (a-z)",
      passed: lowercaseOk,
    },
    {
      id: "uppercase",
      label: "Pelo menos 1 letra maiúscula (A-Z)",
      passed: uppercaseOk,
    },
    {
      id: "number",
      label: "Pelo menos 1 número (0-9)",
      passed: numberOk,
    },
    {
      id: "symbol",
      label: "Pelo menos 1 símbolo (!@#$%...)",
      passed: symbolOk,
    },
    {
      id: "no-username",
      label: "Não conter o nome de usuário",
      passed: noUsernameOk,
    },
    {
      id: "not-common",
      label: "Não ser uma senha comum ou óbvia",
      passed: notCommonOk,
    },
    {
      id: "no-sequence",
      label: "Sem repetições ou sequências (ex: aaaa, 1234, abcd)",
      passed: noSequenceOk,
    },
  ];
}

export function validatePassword(
  password: string,
  username?: string
): PasswordValidationResult {
  const checks = getPasswordChecks(password, username);
  const errors: string[] = [];

  if (!password) {
    return {
      ok: false,
      errors: ["Informe uma senha."],
      checks,
    };
  }

  const errorMap: Record<PasswordRuleCheck["id"], string> = {
    length: `A senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres.`,
    lowercase: "A senha deve conter pelo menos uma letra minúscula.",
    uppercase: "A senha deve conter pelo menos uma letra maiúscula.",
    number: "A senha deve conter pelo menos um número.",
    symbol: "A senha deve conter pelo menos um símbolo (ex: !@#$%).",
    "no-username": "A senha não pode conter o seu nome de usuário.",
    "not-common": "Esta senha é muito comum. Escolha uma combinação mais segura.",
    "no-sequence": "Evite sequências ou repetições óbvias (ex: aaaa, 1234, abcd).",
  };

  for (const check of checks) {
    if (!check.passed) {
      errors.push(errorMap[check.id]);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    checks,
  };
}

export function getPasswordStrength(
  password: string,
  username?: string
): PasswordStrength {
  if (!password) {
    return { level: "weak", label: "Fraca", score: 0 };
  }

  const checks = getPasswordChecks(password, username);
  const passedCount = checks.filter((c) => c.passed).length;
  const allBasicPassed = checks.every((c) => c.passed);

  let score = Math.round((passedCount / checks.length) * 75);
  if (password.length >= 12) score += 15;
  if (password.length >= 16) score += 10;
  score = Math.min(100, score);

  if (!allBasicPassed || password.length < PASSWORD_MIN_LENGTH) {
    return {
      level: passedCount >= 5 && password.length >= 6 ? "medium" : "weak",
      label: passedCount >= 5 && password.length >= 6 ? "Média" : "Fraca",
      score: Math.min(score, 65),
    };
  }

  if (password.length >= 12) {
    return { level: "strong", label: "Forte", score };
  }

  return { level: "medium", label: "Média", score };
}

export function validatePasswordMatch(
  password: string,
  confirm: string
): PasswordMatchResult {
  if (!confirm) {
    return { ok: false, error: "Confirme sua senha." };
  }
  if (password !== confirm) {
    return { ok: false, error: "As senhas não conferem." };
  }
  return { ok: true };
}
