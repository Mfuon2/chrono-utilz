import { ChronoUtilzError } from './ChronoUtilzError';
import { DateRangeOptions } from './DateRangeOptions';
import { addTime } from './addTime';
import { readDate } from './readDate';

/**
 * Generates an array of dates between a start and end date
 *
 * @example
 * ```
 * // Generate dates for each day in May 2025
 * const datesInMay = ChronoUtilz.generateDateRange({
 *   start: '2025-05-01',
 *   end: '2025-05-31'
 * });
 * ```
 *
 * @param options - Configuration options for the date range
 * @returns An array of Date objects
 */
export function generateDateRange(options: DateRangeOptions): Date[] {
  const { start, end, unit = 'day', step = 1, inclusive = true } = options;

  if (!Number.isInteger(step) || step <= 0)
    throw new ChronoUtilzError('Step must be a positive integer');
  const startDate = readDate(start, {});
  const endDate = readDate(end, {});

  if (!startDate || !endDate) {
    throw new Error('Invalid start or end date provided');
  }

  if (startDate > endDate) {
    throw new Error('Start date must be before or equal to end date');
  }

  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate < endDate || (inclusive && currentDate.getTime() === endDate.getTime())) {
    if (dates.length >= 100000) throw new ChronoUtilzError('Date range exceeds 100,000 entries');
    dates.push(new Date(currentDate));
    currentDate = addTime(currentDate, step, unit);
  }

  return dates;
}
