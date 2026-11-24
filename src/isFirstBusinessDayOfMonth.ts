import { addTime } from './addTime';
import { isBusinessDay } from './isBusinessDay';
import { startOf } from './startOf';

/**
 * Checks if a date is the first business day of the month
 * @param date - The date to check
 * @returns True if it's the first business day of the month
 *
 * @example
 * ```typescript
 * isFirstBusinessDayOfMonth(new Date('2024-01-01')) // true if Jan 1 is a business day
 * isFirstBusinessDayOfMonth(new Date('2024-01-02')) // true if Jan 1 is weekend/holiday
 * ```
 */
export function isFirstBusinessDayOfMonth(date: Date | string | number): boolean {
  const d = startOf(date, 'day');
  if (!isBusinessDay(d)) return false;
  for (let day = startOf(d, 'month'); day < d; day = addTime(day, 1, 'day'))
    if (isBusinessDay(day)) return false;
  return true;
}
