import { currentConfig } from './currentConfig';
import { ChronoUtilzError } from './ChronoUtilzError';
import { RecurringConfig } from './RecurringConfig';
import { addTime } from './addTime';
import { getNextBusinessDay } from './getNextBusinessDay';
import { handleCustomRecurrence } from './handleCustomRecurrence';
import { isValidDate } from './isValidDate';
import { isWeekend } from './isWeekend';
import { parseDate } from './parseDate';

/** Includes the supplied start when inside the end bound, even if it does not match a filter. maxOccurrences:0 returns []. Positive integer intervals; finite bounded counts. Custom searches throw after eight years without a match. */
export function generateRecurringDates(
  startDate: Date | string | number,
  config: RecurringConfig,
): Date[] {
  if (
    !Number.isSafeInteger(config.interval ?? 1) ||
    (config.interval ?? 1) <= 0 ||
    (config.interval ?? 1) > 10000 ||
    !Number.isSafeInteger(config.maxOccurrences ?? 100) ||
    (config.maxOccurrences ?? 100) < 0 ||
    (config.maxOccurrences ?? 100) > 100000
  )
    throw new ChronoUtilzError('Invalid recurrence limits');
  if (config.endDate && !isValidDate(config.endDate))
    throw new ChronoUtilzError('Invalid recurrence end');
  if (config.maxOccurrences === 0) return [];
  for (const [values, min, max] of [
    [config.daysOfWeek, 0, 6],
    [config.daysOfMonth, 1, 31],
    [config.monthsOfYear, 1, 12],
  ] as const)
    if (
      values &&
      (!values.length || !values.every((n) => Number.isInteger(n) && n >= min && n <= max))
    )
      throw new ChronoUtilzError('Invalid recurrence filters');

  if (config.pattern === 'weekends' && currentConfig.workingDays.length === 7)
    throw new ChronoUtilzError('No weekend days are configured');
  const safeStartDate = parseDate(startDate, { throwError: true });

  if (config.endDate && safeStartDate > config.endDate) return [];
  const dates: Date[] = [new Date(safeStartDate)];
  const interval = config.interval || 1;
  const maxOccurrences = config.maxOccurrences || 100;
  const endDate = config.endDate;

  let currentDate = new Date(safeStartDate);
  let count = 1;

  while (count < maxOccurrences && (!endDate || currentDate <= endDate)) {
    let nextDate: Date;

    switch (config.pattern) {
      case 'daily':
        nextDate = addTime(currentDate, interval, 'day');
        break;
      case 'weekly':
        nextDate = addTime(currentDate, interval * 7, 'day');
        break;
      case 'biweekly':
        nextDate = addTime(currentDate, interval * 14, 'day');
        break;
      case 'monthly':
        nextDate = addTime(safeStartDate, count * interval, 'month');
        break;
      case 'quarterly':
        nextDate = addTime(safeStartDate, count * interval * 3, 'month');
        break;
      case 'yearly':
        nextDate = addTime(safeStartDate, count * interval, 'year');
        break;
      case 'weekdays':
        nextDate = getNextBusinessDay(currentDate);
        if (interval > 1) {
          for (let i = 1; i < interval; i++) {
            nextDate = getNextBusinessDay(nextDate);
          }
        }
        break;
      case 'weekends':
        nextDate = new Date(currentDate);
        for (let i = 0; i < interval; i++) {
          do {
            nextDate = addTime(nextDate, 1, 'day');
          } while (!isWeekend(nextDate));
        }
        break;
      case 'custom':
        // Handle custom patterns based on configuration
        nextDate = new Date(currentDate);
        for (let i = 0; i < interval; i++) nextDate = handleCustomRecurrence(nextDate, config);
        break;
      default:
        throw new ChronoUtilzError(`Unsupported recurring pattern: ${config.pattern}`);
    }

    if (endDate && nextDate > endDate) break;

    currentDate = nextDate;
    dates.push(new Date(currentDate));
    count++;
  }

  return dates;
}
