import { ChronoUtilzError } from './ChronoUtilzError';
import { SortOrder } from './SortOrder';
import { parseDate } from './parseDate';

/** Returns new Dates, filters invalid entries, and rejects unknown sort orders. */
export function sortDates(dateArray: (Date | string | number)[], order: SortOrder = 'asc'): Date[] {
  if (!['asc', 'desc'].includes(order)) throw new ChronoUtilzError('Invalid sort order');

  if (!Array.isArray(dateArray)) {
    throw new ChronoUtilzError('First argument must be an array');
  }

  if (dateArray.length === 0) {
    return [];
  }

  // Parse all dates and filter out invalid ones
  const parsedDates = dateArray
    .map((date) => parseDate(date, { throwError: false }))
    .filter((date): date is Date => date !== null);

  // Sort based on order
  const sortedDates = parsedDates.sort((a, b) => {
    const comparison = a.getTime() - b.getTime();
    return order === 'asc' ? comparison : -comparison;
  });

  // Return new Date objects to maintain immutability
  return sortedDates.map((date) => new Date(date.getTime()));
}
