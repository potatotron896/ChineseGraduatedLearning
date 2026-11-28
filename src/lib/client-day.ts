/**
 * Helpers de data no fuso horário local do usuário (YYYY-MM-DD)
 */

export function getLocalDayString(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDayString(dayStr: string): Date {
  const [y, m, d] = dayStr.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
}

export function addDaysToDayString(dayStr: string, delta: number): string {
  const dt = parseDayString(dayStr);
  dt.setUTCDate(dt.getUTCDate() + delta);
  const year = dt.getUTCFullYear();
  const month = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dt.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Retorna a segunda-feira da semana do dia informado (YYYY-MM-DD)
 */
export function getWeekStartDayString(dayStr: string): string {
  const dt = parseDayString(dayStr);
  const dow = dt.getUTCDay(); // 0=Dom, 1=Seg, ...
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  return addDaysToDayString(dayStr, diffToMonday);
}

export function isWeekendDayString(dayStr: string): boolean {
  const dt = parseDayString(dayStr);
  const dow = dt.getUTCDay();
  return dow === 0 || dow === 6;
}

