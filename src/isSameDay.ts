import { parseDate } from './parseDate';

/**
 * Checks if two dates fall on the same day
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are on the same day
 */
export function isSameDay(date1: Date | string | number, date2: Date | string | number): boolean {
  const safeDate1 = parseDate(date1, { throwError: true });
  const safeDate2 = parseDate(date2, { throwError: true });

  return (
    safeDate1.getFullYear() === safeDate2.getFullYear() &&
    safeDate1.getMonth() === safeDate2.getMonth() &&
    safeDate1.getDate() === safeDate2.getDate()
  );
}
