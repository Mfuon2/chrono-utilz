import { parseDate } from './parseDate';

/**
 * Checks if the given date is the last day of the year (December 31st)
 * @param date - The date to check
 * @returns True if it's December 31st
 *
 * @example
 * ```typescript
 * isLastDayOfYear(new Date('2024-12-31')) // true
 * isLastDayOfYear(new Date('2024-01-01')) // false
 * ```
 */
export function isLastDayOfYear(date: Date | string | number): boolean {
  const safeDate = parseDate(date, { throwError: true });

  return safeDate.getMonth() === 11 && safeDate.getDate() === 31;
}
