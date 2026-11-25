import { readDate } from './readDate';

/**
 * Checks if a date is between two other dates
 * @param date - The date to check
 * @param startDate - The start date
 * @param endDate - The end date
 * @param inclusive - Whether to include the boundaries
 * @returns True if the date is between the start and end dates
 */
export function isBetweenDates(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
  inclusive = true,
): boolean {
  const safeDate = readDate(date);
  const safeStartDate = readDate(startDate);
  const safeEndDate = readDate(endDate);

  const dateTime = safeDate.getTime();
  const startTime = safeStartDate.getTime();
  const endTime = safeEndDate.getTime();

  if (inclusive) {
    return dateTime >= startTime && dateTime <= endTime;
  } else {
    return dateTime > startTime && dateTime < endTime;
  }
}
