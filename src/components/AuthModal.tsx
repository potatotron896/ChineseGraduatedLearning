"use client";

import React, { useEffect, useState } from "react";
import { Check, Eye, EyeOff, KeyRound, User, X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import {
  getPasswordStrength,
  validatePassword,
  validatePasswordMatch,
  validateUsername,
  type PasswordRuleCheck,
} from "@/lib/auth-validation";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete: "current-password" | "new-password";
  required?: boolean;
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-ink mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 pr-10 rounded-md border border-border bg-surface text-base sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-jade"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded flex items-center justify-center text-muted hover:text-ink hover:bg-canvas/60 transition-colors"
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function PasswordRequirements({
  password,
  username,
  checks,
}: {
  password: string;
  username?: string;
  checks: PasswordRuleCheck[];
}) {
  const strength = getPasswordStrength(password, username);

  const barColor =
    strength.level === "strong"
      ? "bg-jade"
      : strength.level === "medium"
      ? "bg-amber-500"
      : "bg-cinnabar";

  const labelColor =
    strength.level === "strong"
      ? "text-jade"
      : strength.level === "medium"
      ? "text-amber-600 dark:text-amber-400"
      : "text-cinnabar";

  return (
    <div className="space-y-2.5 rounded-md border border-border bg-surface/70 p-3">
      <div>
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-muted font-medium">Força da senha</span>
          <span className={`font-semibold ${labelColor}`}>
            {password ? strength.label : "—"}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${
              password ? barColor : "bg-transparent"
            }`}
            style={{ width: `${password ? Math.max(10, strength.score) : 0}%` }}
          />
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-1" aria-label="Requisitos da senha">
        {checks.map((check) => {
          const passed = password.length > 0 && check.passed;
          return (
            <li
              key={check.id}
              className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                passed
                  ? "text-jade font-medium"
                  : password.length > 0
                  ? "text-muted"
                  : "text-muted/80"
              }`}
            >
              {passed ? (
                <Check className="w-3.5 h-3.5 text-jade shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-muted/70 shrink-0" />
              )}
              <span>{check.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { loginOrRegister } = useUser();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [authErrors, setAuthErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password, usernameValidation.normalized);
  const matchValidation = validatePasswordMatch(password, passwordConfirm);

  const canSubmitRegister =
    usernameValidation.ok &&
    passwordValidation.ok &&
    matchValidation.ok &&
    !submitting;

  const canSubmitLogin =
    username.trim().length > 0 && password.length > 0 && !submitting;

  function switchMode(nextMode: "login" | "register") {
    setAuthMode(nextMode);
    setAuthErrors([]);
    setPasswordConfirm("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthErrors([]);

    if (authMode === "register") {
      const clientErrors = [...usernameValidation.errors, ...passwordValidation.errors];
      if (!matchValidation.ok && matchValidation.error) {
        clientErrors.push(matchValidation.error);
      }
      if (clientErrors.length > 0) {
        setAuthErrors(clientErrors);
        return;
      }
    }

    setSubmitting(true);
    const res = await loginOrRegister(
      authMode,
      username,
      password,
      authMode === "register" ? passwordConfirm : undefined
    );
    setSubmitting(false);

    if (!res.ok) {
      setAuthErrors(
        res.errors && res.errors.length > 0
          ? res.errors
          : [res.error || "Erro ao autenticar."]
      );
      return;
    }

    setPassword("");
    setPasswordConfirm("");
    setAuthErrors([]);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-lg bg-canvas border-t sm:border border-border p-5 sm:p-6 shadow-lg pb-safe modal-sheet-anim">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2
              id="auth-modal-title"
              className="text-base sm:text-lg font-semibold text-ink flex items-center gap-2"
            >
              <User className="w-5 h-5 text-jade shrink-0" />
              <span>Sincronizar Progresso na Nuvem</span>
            </h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Acesse seu histórico de capítulos, preferências de fonte e
              vocabulário salvo em qualquer computador ou celular.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-md text-muted hover:text-ink hover:bg-surface flex items-center justify-center shrink-0"
            aria-label="Fechar janela de login"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 p-1 rounded-md bg-surface border border-border mb-4">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`py-2 text-xs font-semibold rounded-[5px] transition-colors ${
              authMode === "login"
                ? "bg-jade text-canvas"
                : "text-muted hover:text-ink"
            }`}
          >
            Já tenho conta
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`py-2 text-xs font-semibold rounded-[5px] transition-colors ${
              authMode === "register"
                ? "bg-jade text-canvas"
                : "text-muted hover:text-ink"
            }`}
          >
            Criar nova conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          <div>
            <label
              htmlFor="auth-username"
              className="block text-xs font-semibold text-ink mb-1"
            >
              Nome de usuário
            </label>
            <input
              id="auth-username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: marlo.silva"
              className="w-full px-3 py-2.5 rounded-md border border-border bg-surface text-base sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-jade"
            />
            {authMode === "register" && username.length > 0 && !usernameValidation.ok && (
              <p className="mt-1 text-[11px] text-cinnabar font-medium">
                {usernameValidation.errors[0]}
              </p>
            )}
          </div>

          <PasswordField
            id="auth-password"
            label="Senha"
            value={password}
            onChange={setPassword}
            autoComplete={authMode === "register" ? "new-password" : "current-password"}
            placeholder={
              authMode === "register"
                ? "Mínimo de 8 caracteres"
                : "Digite sua senha"
            }
          />

          {authMode === "register" && (
            <>
              <PasswordField
                id="auth-password-confirm"
                label="Confirmar senha"
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                autoComplete="new-password"
                placeholder="Repita a senha"
              />

              {passwordConfirm.length > 0 && !matchValidation.ok && (
                <p className="text-[11px] text-cinnabar font-medium" role="status">
                  {matchValidation.error}
                </p>
              )}

              <PasswordRequirements
                password={password}
                username={usernameValidation.normalized}
                checks={passwordValidation.checks}
              />
            </>
          )}

          {authErrors.length > 0 && (
            <div
              role="alert"
              aria-live="polite"
              className="p-2.5 rounded-md bg-cinnabar-soft border border-cinnabar-border text-xs text-cinnabar font-medium space-y-1"
            >
              {authErrors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 sm:py-2 rounded-md border border-border text-xs font-medium text-muted hover:text-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={authMode === "register" ? !canSubmitRegister : !canSubmitLogin}
              className="px-4 py-2.5 sm:py-2 rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? authMode === "login"
                  ? "Entrando..."
                  : "Criando conta..."
                : authMode === "login"
                ? "Entrar e Sincronizar"
                : "Criar Conta e Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const { profile, changePassword } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const pwValidation = validatePassword(newPassword, profile.username);
  const matchValidation = validatePasswordMatch(newPassword, newPasswordConfirm);
  const isDifferent = !newPassword || newPassword !== currentPassword;

  const canSubmit =
    currentPassword.length > 0 &&
    pwValidation.ok &&
    matchValidation.ok &&
    isDifferent &&
    !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSuccessMsg(null);

    if (!isDifferent) {
      setErrors(["A nova senha deve ser diferente da senha atual."]);
      return;
    }

    setSubmitting(true);
    const res = await changePassword(
      currentPassword,
      newPassword,
      newPasswordConfirm
    );
    setSubmitting(false);

    if (!res.ok) {
      setErrors(
        res.errors && res.errors.length > 0
          ? res.errors
          : [res.error || "Erro ao alterar a senha."]
      );
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setSuccessMsg("Senha atualizada com sucesso!");
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1000);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-pw-modal-title"
    >
      <div className="w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-lg bg-canvas border-t sm:border border-border p-5 sm:p-6 shadow-lg pb-safe modal-sheet-anim">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2
              id="change-pw-modal-title"
              className="text-base sm:text-lg font-semibold text-ink flex items-center gap-2"
            >
              <KeyRound className="w-5 h-5 text-jade shrink-0" />
              <span>Alterar Senha</span>
            </h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Atualize sua senha para uma combinação mais forte e segura.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-md text-muted hover:text-ink hover:bg-surface flex items-center justify-center shrink-0"
            aria-label="Fechar janela de alteração de senha"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          <PasswordField
            id="current-password"
            label="Senha atual"
            value={currentPassword}
            onChange={setCurrentPassword}
            autoComplete="current-password"
            placeholder="Digite sua senha atual"
          />

          <PasswordField
            id="new-password"
            label="Nova senha"
            value={newPassword}
            onChange={setNewPassword}
            autoComplete="new-password"
            placeholder="Mínimo de 8 caracteres"
          />

          <PasswordField
            id="new-password-confirm"
            label="Confirmar nova senha"
            value={newPasswordConfirm}
            onChange={setNewPasswordConfirm}
            autoComplete="new-password"
            placeholder="Repita a nova senha"
          />

          {newPasswordConfirm.length > 0 && !matchValidation.ok && (
            <p className="text-[11px] text-cinnabar font-medium" role="status">
              {matchValidation.error}
            </p>
          )}

          {!isDifferent && newPassword.length > 0 && (
            <p className="text-[11px] text-cinnabar font-medium" role="status">
              A nova senha deve ser diferente da senha atual.
            </p>
          )}

          <PasswordRequirements
            password={newPassword}
            username={profile.username}
            checks={pwValidation.checks}
          />

          {errors.length > 0 && (
            <div
              role="alert"
              aria-live="polite"
              className="p-2.5 rounded-md bg-cinnabar-soft border border-cinnabar-border text-xs text-cinnabar font-medium space-y-1"
            >
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          {successMsg && (
            <div
              role="status"
              aria-live="polite"
              className="p-2.5 rounded-md bg-jade-soft border border-jade-border text-xs text-jade font-medium"
            >
              {successMsg}
            </div>
          )}

          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 sm:py-2 rounded-md border border-border text-xs font-medium text-muted hover:text-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-2.5 sm:py-2 rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Salvando..." : "Salvar Nova Senha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
