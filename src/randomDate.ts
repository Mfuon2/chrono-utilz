import { ChronoUtilzError } from './ChronoUtilzError';
import { isValidRange } from './isValidRange';
import { parseDate } from './parseDate';

/**
 * Generates a random date between two dates
 * @param startDate - The start of the range
 * @param endDate - The end of the range
 * @returns A random Date within the specified range
 */
export function randomDate(
  startDate: Date | string | number,
  endDate: Date | string | number,
): Date {
  if (!isValidRange(startDate, endDate)) throw new ChronoUtilzError('Invalid random date range');

  const safeStartDate = parseDate(startDate, { throwError: true });
  const safeEndDate = parseDate(endDate, { throwError: true });

  if (safeStartDate >= safeEndDate) {
    throw new ChronoUtilzError('Start date must be before end date');
  }

  const startTime = safeStartDate.getTime();
  const endTime = safeEndDate.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);

  return new Date(randomTime);
}
