import { ChronoUtilzError } from './ChronoUtilzError';

/**
 * Creates a date from components
 * @param year - The year
 * @param month - The month (0-11)
 * @param day - The day (1-31)
 * @param hours - The hours (0-23)
 * @param minutes - The minutes (0-59)
 * @param seconds - The seconds (0-59)
 * @param milliseconds - The milliseconds (0-999)
 * @returns A new Date object
 */
export function createDate(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
): Date {
  const values = [year, month, day, hours, minutes, seconds, milliseconds];
  if (
    !values.every(Number.isInteger) ||
    year < 0 ||
    year > 9999 ||
    month < 0 ||
    month > 11 ||
    day < 1 ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59 ||
    milliseconds < 0 ||
    milliseconds > 999
  )
    throw new ChronoUtilzError('Invalid date components');
  const result = new Date(0);
  result.setFullYear(year, month, day);
  result.setHours(hours, minutes, seconds, milliseconds);
  if (
    result.getFullYear() !== year ||
    result.getMonth() !== month ||
    result.getDate() !== day ||
    result.getHours() !== hours
  )
    throw new ChronoUtilzError('Invalid calendar date or nonexistent local time');
  return result;
}
