import test from "node:test";
import assert from "node:assert/strict";
import {
  getPasswordStrength,
  validatePassword,
  validatePasswordMatch,
  validateUsername,
} from "../src/lib/auth-validation.ts";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "../src/lib/rate-limit.ts";

test("validateUsername aceita nomes válidos e normaliza", () => {
  const res = validateUsername("  Marlo.Silva_01 ");
  assert.equal(res.ok, true);
  assert.equal(res.normalized, "marlo.silva_01");
  assert.equal(res.errors.length, 0);
});

test("validateUsername rejeita nomes curtos, reservados, pontos consecutivos e caracteres inválidos", () => {
  assert.equal(validateUsername("ab").ok, false);
  assert.equal(validateUsername("admin").ok, false);
  assert.equal(validateUsername("root").ok, false);
  assert.equal(validateUsername("marlo..silva").ok, false);
  assert.equal(validateUsername(".marlo").ok, false);
  assert.equal(validateUsername("marlo!").ok, false);
});

test("validatePassword rejeita senhas fracas, curtas, comuns, com usuário ou sequências", () => {
  // Curta (4 chars)
  assert.equal(validatePassword("A1!a", "marlo").ok, false);
  // Sem maiúscula
  assert.equal(validatePassword("senha@991", "marlo").ok, false);
  // Sem minúscula
  assert.equal(validatePassword("SENHA@991", "marlo").ok, false);
  // Sem número
  assert.equal(validatePassword("Senha@forte", "marlo").ok, false);
  // Sem símbolo
  assert.equal(validatePassword("SenhaForte9", "marlo").ok, false);
  // Contém username
  assert.equal(validatePassword("Marlo@991", "marlo").ok, false);
  // Senha comum
  assert.equal(validatePassword("Senha@123", "marlo").ok, false);
  // Sequência numérica/alfabética
  assert.equal(validatePassword("Abcd@987", "marlo").ok, false);
  assert.equal(validatePassword("Test@1234", "marlo").ok, false);
  // Repetição
  assert.equal(validatePassword("Aaaa@987", "marlo").ok, false);
});

test("validatePassword aceita senha forte válida", () => {
  const res = validatePassword("Kaiti#8429", "marlo");
  assert.equal(res.ok, true);
  assert.equal(res.errors.length, 0);
});

test("getPasswordStrength classifica fraca, média e forte", () => {
  assert.equal(getPasswordStrength("123", "marlo").level, "weak");
  assert.equal(getPasswordStrength("Kaiti#84", "marlo").level, "medium");
  assert.equal(getPasswordStrength("Kaiti#8429!WenDu", "marlo").level, "strong");
});

test("validatePasswordMatch valida confirmação", () => {
  assert.equal(validatePasswordMatch("Kaiti#8429", "").ok, false);
  assert.equal(validatePasswordMatch("Kaiti#8429", "Kaiti#8420").ok, false);
  assert.equal(validatePasswordMatch("Kaiti#8429", "Kaiti#8429").ok, true);
});

test("rate-limit bloqueia após 5 falhas e reseta após sucesso", () => {
  const key = "test:ip-user";
  resetRateLimit(key);

  const now = 1_000_000;
  for (let i = 0; i < 4; i++) {
    const res = recordFailedAttempt(key, now + i * 1000);
    assert.equal(res.allowed, true);
  }
  const fifth = recordFailedAttempt(key, now + 4000);
  assert.equal(fifth.allowed, false);
  assert.ok(fifth.retryAfterSeconds > 0);

  const blocked = checkRateLimit(key, now + 5000);
  assert.equal(blocked.allowed, false);

  resetRateLimit(key);
  assert.equal(checkRateLimit(key, now + 6000).allowed, true);
});
