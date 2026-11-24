import { parseDate } from './parseDate';

/**
 * Checks if the given date is the last day of the month
 * @param date - The date to check
 * @returns True if it's the last day of the month
 *
 * @example
 * ```typescript
 * isLastDayOfMonth(new Date('2024-01-31')) // true
 * isLastDayOfMonth(new Date('2024-02-29')) // true (leap year)
 * isLastDayOfMonth(new Date('2024-01-15')) // false
 * ```
 */
export function isLastDayOfMonth(date: Date | string | number): boolean {
  const safeDate = parseDate(date, { throwError: true });

  const nextDay = new Date(safeDate);
  nextDay.setDate(safeDate.getDate() + 1);
  return nextDay.getMonth() !== safeDate.getMonth();
}
