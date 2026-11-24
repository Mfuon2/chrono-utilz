import { addTime } from './addTime';
import { isBusinessDay } from './isBusinessDay';
import { startOf } from './startOf';

/**
 * Checks if a date is the last business day of the month
 * @param date - The date to check
 * @returns True if it's the last business day of the month
 *
 * @example
 * ```typescript
 * isLastBusinessDayOfMonth(new Date('2024-01-31')) // true if Jan 31 is a business day
 * isLastBusinessDayOfMonth(new Date('2024-01-30')) // true if Jan 31 is weekend/holiday
 * ```
 */
export function isLastBusinessDayOfMonth(date: Date | string | number): boolean {
  const d = startOf(date, 'day');
  if (!isBusinessDay(d)) return false;
  for (
    let day = addTime(d, 1, 'day');
    day.getMonth() === d.getMonth();
    day = addTime(day, 1, 'day')
  )
    if (isBusinessDay(day)) return false;
  return true;
}
