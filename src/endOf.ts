import { ChronoUtilzError } from './ChronoUtilzError';
import { TimeUnit } from './TimeUnit';
import { parseDate } from './parseDate';

/**
 * Gets the end of a time unit (e.g., end of day, end of month)
 * @param date - The reference date
 * @param unit - The time unit
 * @returns A new Date representing the end of the specified unit
 */
export function endOf(
  date: Date | string | number,
  unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute'>,
): Date {
  const safeDate = parseDate(date, { throwError: true });

  const result = new Date(safeDate.getTime());

  switch (unit) {
    case 'hour':
      result.setMinutes(59, 59, 999);
      break;
    case 'day':
      result.setHours(23, 59, 59, 999);
      break;
    case 'week': {
      // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
      const dayOfWeek = result.getDay();
      // Add days to get to Saturday (end of week)
      result.setDate(result.getDate() + (6 - dayOfWeek));
      result.setHours(23, 59, 59, 999);
      break;
    }
    case 'month': {
      // Go to the first day of the next month, then subtract 1 millisecond
      result.setMonth(result.getMonth() + 1, 0);
      result.setHours(23, 59, 59, 999);
      break;
    }
    case 'quarter':
      result.setMonth(Math.floor(result.getMonth() / 3) * 3 + 3, 0);
      result.setHours(23, 59, 59, 999);
      break;
    case 'year':
      result.setMonth(11, 31);
      result.setHours(23, 59, 59, 999);
      break;
    default:
      throw new ChronoUtilzError(`Invalid time unit for endOf: ${unit}`);
  }

  return result;
}
