import { ChronoUtilzError } from './ChronoUtilzError';
import { TimeUnit } from './TimeUnit';
import { readDate } from './readDate';

/**
 * Truncates a date to the specified unit (sets smaller units to their minimum values)
 * @param date - The date to truncate
 * @param unit - The time unit to truncate to
 * @returns A new Date truncated to the specified unit
 */
export function truncateToUnit(date: Date | string | number, unit: TimeUnit): Date {
  const safeDate = readDate(date);

  const result = new Date(safeDate.getTime());

  switch (unit) {
    case 'millisecond':
      // No truncation needed
      break;
    case 'second':
      result.setMilliseconds(0);
      break;
    case 'minute':
      result.setSeconds(0, 0);
      break;
    case 'hour':
      result.setMinutes(0, 0, 0);
      break;
    case 'day':
      result.setHours(0, 0, 0, 0);
      break;
    case 'week': {
      const dayOfWeek = result.getDay();
      result.setDate(result.getDate() - dayOfWeek);
      result.setHours(0, 0, 0, 0);
      break;
    }
    case 'month':
      result.setDate(1);
      result.setHours(0, 0, 0, 0);
      break;
    case 'quarter':
      result.setMonth(Math.floor(result.getMonth() / 3) * 3, 1);
      result.setHours(0, 0, 0, 0);
      break;
    case 'year':
      result.setMonth(0, 1);
      result.setHours(0, 0, 0, 0);
      break;
    default:
      throw new ChronoUtilzError(`Invalid time unit for truncateToUnit: ${unit}`);
  }

  return result;
}
