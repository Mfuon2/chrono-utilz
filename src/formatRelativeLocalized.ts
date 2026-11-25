import { getRelativeTime } from './getRelativeTime';
import { readDate } from './readDate';

/**
 * Formats relative time with localization
 * @param date - Date to format
 * @param locale - Locale identifier
 * @param baseDate - Base date for comparison
 * @returns Localized relative time string
 */
export function formatRelativeLocalized(
  date: Date | string | number,
  locale = 'en-US',
  baseDate?: Date,
): string {
  const safeDate = readDate(date);
  const base = baseDate || new Date();

  try {
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const diffInSeconds = (safeDate.getTime() - base.getTime()) / 1000;

    if (Math.abs(diffInSeconds) < 60) {
      return formatter.format(Math.round(diffInSeconds), 'second');
    } else if (Math.abs(diffInSeconds) < 3600) {
      return formatter.format(Math.round(diffInSeconds / 60), 'minute');
    } else if (Math.abs(diffInSeconds) < 86400) {
      return formatter.format(Math.round(diffInSeconds / 3600), 'hour');
    } else if (Math.abs(diffInSeconds) < 2592000) {
      return formatter.format(Math.round(diffInSeconds / 86400), 'day');
    } else if (Math.abs(diffInSeconds) < 31536000) {
      return formatter.format(Math.round(diffInSeconds / 2592000), 'month');
    } else {
      return formatter.format(Math.round(diffInSeconds / 31536000), 'year');
    }
  } catch {
    // Fallback to English if locale not supported
    return getRelativeTime(safeDate, base);
  }
}
