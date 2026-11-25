import { ChronoUtilzError } from './ChronoUtilzError';
import { TimeUnit } from './TimeUnit';
import { readDate } from './readDate';
import { truncateToUnit } from './truncateToUnit';

/** Filters invalid entries and keeps the first original instant at each requested calendar precision. */
export function removeDuplicateDates(
  dateArray: (Date | string | number)[],
  unit: TimeUnit = 'day',
): Date[] {
  if (!Array.isArray(dateArray)) {
    throw new ChronoUtilzError('First argument must be an array');
  }

  if (dateArray.length === 0) {
    return [];
  }

  // Parse all dates and filter out invalid ones
  const parsedDates = dateArray
    .map((date) => readDate(date, { throwError: false }))
    .filter((date): date is Date => date !== null);

  // Use a Set to track unique timestamps at the specified unit precision
  const seenTimestamps = new Set<number>();
  const uniqueDates: Date[] = [];

  for (const date of parsedDates) {
    const truncatedDate = truncateToUnit(date, unit);
    const timestamp = truncatedDate.getTime();

    if (!seenTimestamps.has(timestamp)) {
      seenTimestamps.add(timestamp);
      uniqueDates.push(new Date(date.getTime())); // Keep original precision
    }
  }

  return uniqueDates;
}
