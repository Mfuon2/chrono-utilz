import { TimeUnit } from './TimeUnit';
import { parseDate } from './parseDate';
import { truncateToUnit } from './truncateToUnit';

/**
 * Checks if the first date is before the second date
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @param unit - Optional time unit for comparison precision
 * @returns True if date1 is before date2
 */
export function isBefore(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: TimeUnit,
): boolean {
  const safeDate1 = parseDate(date1, { throwError: true });
  const safeDate2 = parseDate(date2, { throwError: true });

  if (unit) {
    const truncated1 = truncateToUnit(safeDate1, unit);
    const truncated2 = truncateToUnit(safeDate2, unit);
    return truncated1.getTime() < truncated2.getTime();
  }

  return safeDate1.getTime() < safeDate2.getTime();
}
