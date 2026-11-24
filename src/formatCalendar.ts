import { formatDate } from './formatDate';
import { parseDate } from './parseDate';

/**
 * Formats date as calendar format (Today, Tomorrow, etc.)
 * @param date - Date to format
 * @param baseDate - Base date for comparison
 * @returns Calendar format string
 */
export function formatCalendar(date: Date | string | number, baseDate?: Date): string {
  const d = parseDate(date, { throwError: true })!,
    b = parseDate(baseDate || new Date(), { throwError: true })!;
  const days = Math.round(
    (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) -
      Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) /
      86400000,
  );
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 1 && days <= 7) return d.toLocaleDateString('en', { weekday: 'long' });
  if (days < -1 && days >= -7) return 'Last ' + d.toLocaleDateString('en', { weekday: 'long' });
  return formatDate(d, 'MMM DD, YYYY');
}
