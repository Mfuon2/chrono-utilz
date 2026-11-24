import { TimeUnit } from './TimeUnit';
import { parseDate } from './parseDate';
import { truncateToUnit } from './truncateToUnit';

/**
 * Compares two dates and returns -1, 0, or 1
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Optional time unit for comparison precision
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareDates(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: TimeUnit,
): -1 | 0 | 1 {
  const safeDate1 = parseDate(date1, { throwError: true });
  const safeDate2 = parseDate(date2, { throwError: true });

  let time1 = safeDate1.getTime();
  let time2 = safeDate2.getTime();

  // If unit is specified, truncate both dates to that unit for comparison
  if (unit) {
    const truncated1 = truncateToUnit(safeDate1, unit);
    const truncated2 = truncateToUnit(safeDate2, unit);
    time1 = truncated1.getTime();
    time2 = truncated2.getTime();
  }

  if (time1 < time2) return -1;
  if (time1 > time2) return 1;
  return 0;
}
