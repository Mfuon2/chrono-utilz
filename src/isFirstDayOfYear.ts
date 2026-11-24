import { parseDate } from './parseDate';

/**
 * Checks if the given date is the first day of the year (January 1st)
 * @param date - The date to check
 * @returns True if it's January 1st
 *
 * @example
 * ```typescript
 * isFirstDayOfYear(new Date('2024-01-01')) // true
 * isFirstDayOfYear(new Date('2024-12-31')) // false
 * ```
 */
export function isFirstDayOfYear(date: Date | string | number): boolean {
  const safeDate = parseDate(date, { throwError: true });

  return safeDate.getMonth() === 0 && safeDate.getDate() === 1;
}
