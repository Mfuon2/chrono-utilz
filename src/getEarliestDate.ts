import { ChronoUtilzError } from './ChronoUtilzError';
import { minDate } from './minDate';

/**
 * Gets the earliest date from an array of dates
 * @param dateArray - Array of dates to compare
 * @returns The earliest date as a new Date object
 */
export function getEarliestDate(dateArray: (Date | string | number)[]): Date {
  if (!Array.isArray(dateArray)) {
    throw new ChronoUtilzError('Argument must be an array');
  }

  if (dateArray.length === 0) {
    throw new ChronoUtilzError('Array cannot be empty');
  }

  return minDate(...dateArray);
}
