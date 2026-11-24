import { ChronoUtilzError } from './ChronoUtilzError';
import { maxDate } from './maxDate';

/**
 * Gets the latest date from an array of dates
 * @param dateArray - Array of dates to compare
 * @returns The latest date as a new Date object
 */
export function getLatestDate(dateArray: (Date | string | number)[]): Date {
  if (!Array.isArray(dateArray)) {
    throw new ChronoUtilzError('Argument must be an array');
  }

  if (dateArray.length === 0) {
    throw new ChronoUtilzError('Array cannot be empty');
  }

  return maxDate(...dateArray);
}
