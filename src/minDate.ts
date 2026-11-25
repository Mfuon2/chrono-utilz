import { ChronoUtilzError } from './ChronoUtilzError';
import { readDate } from './readDate';

/**
 * Returns the earliest date from an array of dates
 * @param dates - Array of dates to compare
 * @returns The earliest date
 */
export function minDate(...dates: (Date | string | number)[]): Date {
  if (dates.length === 0) {
    throw new ChronoUtilzError('At least one date must be provided to minDate');
  }

  const parsedDates = dates.map((date) => {
    const parsed = readDate(date);

    return parsed;
  });

  return new Date(Math.min(...parsedDates.map((d) => d.getTime())));
}
