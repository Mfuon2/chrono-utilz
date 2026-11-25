import { ChronoUtilzError } from './ChronoUtilzError';
import { readDate } from './readDate';

/**
 * Checks if a year is a leap year
 * @param year - The year to check or a date
 * @returns True if the year is a leap year
 */
export function isLeapYear(year: number | Date | string): boolean {
  if (typeof year === 'number' && !Number.isInteger(year))
    throw new ChronoUtilzError('Year must be an integer');

  let yearToCheck: number;

  if (typeof year === 'number') {
    yearToCheck = year;
  } else {
    const safeDate = readDate(year);
    yearToCheck = safeDate!.getFullYear();
  }

  return (yearToCheck % 4 === 0 && yearToCheck % 100 !== 0) || yearToCheck % 400 === 0;
}
