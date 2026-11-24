import { compareDetailed } from './compareDetailed';
import { parseDate } from './parseDate';

/**
 * Returns a relative time string (e.g., "5 minutes ago", "in 2 days")
 * @param date - The date to get relative time for
 * @param baseDate - The base date (defaults to now)
 * @returns A human-readable relative time string
 */
export function getRelativeTime(
  date: Date | string | number,
  baseDate: Date | string | number = new Date(),
): string {
  const d = parseDate(date, { throwError: true })!,
    b = parseDate(baseDate, { throwError: true })!;
  const delta = d.getTime() - b.getTime(),
    seconds = Math.round(Math.abs(delta) / 1000);
  const render = (n: number, u: string) =>
    delta < 0
      ? n + ' ' + u + (n === 1 ? '' : 's') + ' ago'
      : 'in ' + n + ' ' + u + (n === 1 ? '' : 's');
  if (seconds < 5) return 'just now';
  for (const [limit, factor, unit] of [
    [60, 1, 'second'],
    [3600, 60, 'minute'],
    [86400, 3600, 'hour'],
    [604800, 86400, 'day'],
    [2629800, 604800, 'week'],
  ] as const)
    if (seconds < limit) return render(Math.floor(seconds / factor), unit);
  const { years, months } = compareDetailed(d, b).difference;
  return years ? render(years, 'year') : render(months || 1, 'month');
}
