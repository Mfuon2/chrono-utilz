import { ChronoUtilzError } from './ChronoUtilzError';
import { parseDate } from './parseDate';

/**
 * Sets the time components of a date
 * @param date - The base date
 * @param hours - Hours (0-23)
 * @param minutes - Minutes (0-59), optional
 * @param seconds - Seconds (0-59), optional
 * @param milliseconds - Milliseconds (0-999), optional
 * @returns A new Date with the specified time components
 */
export function setTime(
  date: Date | string | number,
  hours: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number,
): Date {
  const safeDate = parseDate(date, { throwError: true });

  // Validate hours
  if (hours < 0 || hours > 23 || !Number.isInteger(hours)) {
    throw new ChronoUtilzError('Hours must be an integer between 0 and 23');
  }

  // Validate minutes if provided
  if (minutes !== undefined && (minutes < 0 || minutes > 59 || !Number.isInteger(minutes))) {
    throw new ChronoUtilzError('Minutes must be an integer between 0 and 59');
  }

  // Validate seconds if provided
  if (seconds !== undefined && (seconds < 0 || seconds > 59 || !Number.isInteger(seconds))) {
    throw new ChronoUtilzError('Seconds must be an integer between 0 and 59');
  }

  // Validate milliseconds if provided
  if (
    milliseconds !== undefined &&
    (milliseconds < 0 || milliseconds > 999 || !Number.isInteger(milliseconds))
  ) {
    throw new ChronoUtilzError('Milliseconds must be an integer between 0 and 999');
  }

  const result = new Date(safeDate.getTime());
  result.setHours(
    hours,
    minutes ?? result.getMinutes(),
    seconds ?? result.getSeconds(),
    milliseconds ?? result.getMilliseconds(),
  );

  return result;
}
