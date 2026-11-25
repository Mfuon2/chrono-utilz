import { ChronoUtilzError } from './ChronoUtilzError';
import { TimeUnit } from './TimeUnit';
import { readDate } from './readDate';

/**
 * Gets the start of a time unit (e.g., start of day, start of month)
 * @param date - The reference date
 * @param unit - The time unit
 * @returns A new Date representing the start of the specified unit
 */
export function startOf(
  date: Date | string | number,
  unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute'>,
): Date {
  const safeDate = readDate(date);

  const result = new Date(safeDate.getTime());

  switch (unit) {
    case 'hour':
      result.setMinutes(0, 0, 0);
      break;
    case 'day':
      result.setHours(0, 0, 0, 0);
      break;
    case 'week': {
      // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
      const dayOfWeek = result.getDay();
      // Subtract days to get to Sunday (start of week)
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
      throw new ChronoUtilzError(`Invalid time unit for startOf: ${unit}`);
  }

  return result;
}
