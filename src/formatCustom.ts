import { getOrdinalSuffix } from './getOrdinalSuffix';
import { parseDate } from './parseDate';

/** Single-pass token substitution with [literal text] escaping. Supported tokens are listed by getConfigs().formatTokens; d (weekday number) is also supported. Uses host local fields. */
export function formatCustom(date: Date | string | number, pattern: string): string {
  const safeDate = parseDate(date, { throwError: true });

  // Define tokens in order of length (longest first to avoid conflicts)
  const tokens: Array<{ token: string; fn: () => string }> = [
    { token: 'YYYY', fn: () => safeDate.getFullYear().toString().padStart(4, '0') },
    { token: 'MMMM', fn: () => safeDate.toLocaleString('en', { month: 'long' }) },
    { token: 'dddd', fn: () => safeDate.toLocaleString('en', { weekday: 'long' }) },
    { token: 'MMM', fn: () => safeDate.toLocaleString('en', { month: 'short' }) },
    { token: 'ddd', fn: () => safeDate.toLocaleString('en', { weekday: 'short' }) },
    { token: 'SSS', fn: () => safeDate.getMilliseconds().toString().padStart(3, '0') },
    { token: 'YY', fn: () => safeDate.getFullYear().toString().padStart(4, '0').slice(-2) },
    { token: 'MM', fn: () => (safeDate.getMonth() + 1).toString().padStart(2, '0') },
    { token: 'DD', fn: () => safeDate.getDate().toString().padStart(2, '0') },
    { token: 'Do', fn: () => getOrdinalSuffix(safeDate.getDate()) },
    { token: 'dd', fn: () => safeDate.toLocaleString('en', { weekday: 'narrow' }) },
    { token: 'HH', fn: () => safeDate.getHours().toString().padStart(2, '0') },
    { token: 'hh', fn: () => (safeDate.getHours() % 12 || 12).toString().padStart(2, '0') },
    { token: 'mm', fn: () => safeDate.getMinutes().toString().padStart(2, '0') },
    { token: 'ss', fn: () => safeDate.getSeconds().toString().padStart(2, '0') },
    { token: 'M', fn: () => (safeDate.getMonth() + 1).toString() },
    { token: 'D', fn: () => safeDate.getDate().toString() },
    { token: 'd', fn: () => safeDate.getDay().toString() },
    { token: 'H', fn: () => safeDate.getHours().toString() },
    { token: 'h', fn: () => (safeDate.getHours() % 12 || 12).toString() },
    { token: 'm', fn: () => safeDate.getMinutes().toString() },
    { token: 's', fn: () => safeDate.getSeconds().toString() },
    { token: 'A', fn: () => (safeDate.getHours() >= 12 ? 'PM' : 'AM') },
    { token: 'a', fn: () => (safeDate.getHours() >= 12 ? 'pm' : 'am') },
  ];

  const offset = -safeDate.getTimezoneOffset();
  const pad = (n: number) => String(n).padStart(2, '0');
  const z =
    (offset < 0 ? '-' : '+') +
    pad(Math.floor(Math.abs(offset) / 60)) +
    ':' +
    pad(Math.abs(offset) % 60);
  tokens.unshift(
    { token: 'ZZ', fn: () => z.replace(':', '') },
    { token: 'Z', fn: () => z },
    { token: 'X', fn: () => String(Math.floor(safeDate.getTime() / 1000)) },
    { token: 'x', fn: () => String(safeDate.getTime()) },
  );
  const map = new Map(tokens.map((t) => [t.token, t.fn]));
  const expression = new RegExp(
    String.raw`\[([^\]]*)\]|` +
      tokens
        .map((t) => t.token)
        .sort((a, b) => b.length - a.length)
        .join('|'),
    'g',
  );
  return pattern.replace(expression, (match, literal) =>
    literal !== undefined ? literal : map.get(match)!(),
  );
}
