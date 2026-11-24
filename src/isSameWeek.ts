import { parseDate } from './parseDate';
import { startOf } from './startOf';

/**
 * Checks if two dates fall in the same week (Sunday-Saturday)
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are in the same week
 */
export function isSameWeek(date1: Date | string | number, date2: Date | string | number): boolean {
  const safeDate1 = parseDate(date1, { throwError: true });
  const safeDate2 = parseDate(date2, { throwError: true });

  const startOfWeek1 = startOf(safeDate1, 'week');
  const startOfWeek2 = startOf(safeDate2, 'week');

  return startOfWeek1.getTime() === startOfWeek2.getTime();
}
