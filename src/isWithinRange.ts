import { isBetweenDates } from './isBetweenDates';

/**
 * Checks if a date falls within a specified range
 * @param date - The date to check
 * @param startDate - The start of the range
 * @param endDate - The end of the range
 * @param inclusive - Whether to include the boundaries (default: true)
 * @returns True if the date is within the specified range
 */
export function isWithinRange(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
  inclusive = true,
): boolean {
  return isBetweenDates(date, startDate, endDate, inclusive);
}
