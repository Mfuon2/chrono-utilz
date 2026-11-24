import { parseDate } from './parseDate';

/**
 * Checks if the given date is the first day of the month
 * @param date - The date to check
 * @returns True if it's the first day of the month
 *
 * @example
 * ```typescript
 * isFirstDayOfMonth(new Date('2024-01-01')) // true
 * isFirstDayOfMonth(new Date('2024-01-15')) // false
 * ```
 */
export function isFirstDayOfMonth(date: Date | string | number): boolean {
  const safeDate = parseDate(date, { throwError: true });

  return safeDate.getDate() === 1;
}
