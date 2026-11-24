import { parseDate } from './parseDate';

/**
 * Validates if a date range is valid (start date is before or equal to end date)
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @returns True if the range is valid
 */
export function isValidRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
): boolean {
  const safeStartDate = parseDate(startDate, { throwError: false });
  const safeEndDate = parseDate(endDate, { throwError: false });

  if (!safeStartDate || !safeEndDate) {
    return false;
  }

  return safeStartDate.getTime() <= safeEndDate.getTime();
}
