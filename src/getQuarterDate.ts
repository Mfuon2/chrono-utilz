import { getQuarter } from './getQuarter';
import { parseDate } from './parseDate';

/**
 * Returns the first or last date of a quarter
 *
 * @example
 * ```
 * // Get the first day of the current quarter
 * const startOfQuarter = ChronoUtilz.getQuarterDate(new Date(), 'start');
 *
 * // Get the last day of Q3 2025
 * const endOfQ3 = ChronoUtilz.getQuarterDate(new Date(2025, 8, 15), 'end');
 * ```
 *
 * @param date - The reference date
 * @param type - Either 'start' or 'end' of the quarter
 * @returns Date object representing the start or end of the quarter
 */
export function getQuarterDate(date: Date | string, type: 'start' | 'end'): Date {
  const parsedDate = parseDate(date);
  if (!parsedDate) {
    throw new Error('Invalid date provided');
  }

  const quarter = getQuarter(parsedDate);
  const year = parsedDate.getFullYear();

  if (type === 'start') {
    // First day of the quarter (months are 0-indexed)
    return new Date(year, (quarter - 1) * 3, 1);
  } else {
    // Last day of the quarter
    return new Date(year, quarter * 3, 0);
  }
}
