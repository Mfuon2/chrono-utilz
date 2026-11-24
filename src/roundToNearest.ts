import { ChronoUtilzError } from './ChronoUtilzError';
import { TimeUnit } from './TimeUnit';
import { parseDate } from './parseDate';

/**
 * Rounds a date to the nearest specified unit
 * @param date - The date to round
 * @param unit - The time unit to round to
 * @returns A new Date rounded to the nearest unit
 */
export function roundToNearest(
  date: Date | string | number,
  unit: Extract<TimeUnit, 'minute' | 'hour' | 'day'>,
): Date {
  const safeDate = parseDate(date, { throwError: true });

  const result = new Date(safeDate.getTime());

  switch (unit) {
    case 'minute': {
      const seconds = result.getSeconds();
      if (seconds >= 30) {
        result.setMinutes(result.getMinutes() + 1);
      }
      result.setSeconds(0, 0);
      break;
    }
    case 'hour': {
      const minutes = result.getMinutes();
      if (minutes >= 30) {
        result.setHours(result.getHours() + 1);
      }
      result.setMinutes(0, 0, 0);
      break;
    }
    case 'day': {
      const hours = result.getHours();
      if (hours >= 12) {
        result.setDate(result.getDate() + 1);
      }
      result.setHours(0, 0, 0, 0);
      break;
    }
    default:
      throw new ChronoUtilzError(`Unsupported unit for roundToNearest: ${unit}`);
  }

  return result;
}
