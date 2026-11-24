import { currentConfig } from './currentConfig';
import { customHolidays } from './customHolidays';
import { formatDateForComparison } from './formatDateForComparison';
import { isWeekend } from './isWeekend';
import { parseDate } from './parseDate';

/**
 * Checks if a date is a business day (weekday and not a holiday)
 * @param date - The date to check
 * @returns True if the date is a business day
 *
 * @example
 * ```typescript
 * isBusinessDay(new Date('2024-01-08')) // true (Monday, not holiday)
 * isBusinessDay(new Date('2024-01-01')) // false (New Year's Day)
 * isBusinessDay(new Date('2024-01-06')) // false (Saturday)
 * ```
 */
export function isBusinessDay(date: Date | string | number): boolean {
  const safeDate = parseDate(date, { throwError: true });

  // First check if it's a weekday
  if (isWeekend(safeDate)) {
    return false;
  }

  // Then check if it's a holiday
  const dateStr = formatDateForComparison(safeDate);
  return !currentConfig.holidays.has(dateStr) && !customHolidays.has(dateStr);
}
