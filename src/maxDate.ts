import { ChronoUtilzError } from './ChronoUtilzError';
import { parseDate } from './parseDate';

/**
 * Returns the latest date from an array of dates
 * @param dates - Array of dates to compare
 * @returns The latest date
 */
export function maxDate(...dates: (Date | string | number)[]): Date {
  if (dates.length === 0) {
    throw new ChronoUtilzError('At least one date must be provided to maxDate');
  }

  const parsedDates = dates.map((date) => {
    const parsed = parseDate(date, { throwError: true });

    return parsed;
  });

  return new Date(Math.max(...parsedDates.map((d) => d.getTime())));
}
