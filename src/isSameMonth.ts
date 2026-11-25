import { readDate } from './readDate';

/**
 * Checks if two dates fall in the same month and year
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are in the same month and year
 */
export function isSameMonth(date1: Date | string | number, date2: Date | string | number): boolean {
  const safeDate1 = readDate(date1);
  const safeDate2 = readDate(date2);

  return (
    safeDate1.getFullYear() === safeDate2.getFullYear() &&
    safeDate1.getMonth() === safeDate2.getMonth()
  );
}
