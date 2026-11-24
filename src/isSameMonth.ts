import { parseDate } from './parseDate';

/**
 * Checks if two dates fall in the same month and year
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are in the same month and year
 */
export function isSameMonth(date1: Date | string | number, date2: Date | string | number): boolean {
  const safeDate1 = parseDate(date1, { throwError: true });
  const safeDate2 = parseDate(date2, { throwError: true });

  return (
    safeDate1.getFullYear() === safeDate2.getFullYear() &&
    safeDate1.getMonth() === safeDate2.getMonth()
  );
}
