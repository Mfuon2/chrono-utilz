import { ChronoUtilzError } from './ChronoUtilzError';
import { parseDate } from './parseDate';

/**
 * Gets the next occurrence of a specific day of week
 * @param date - Starting date
 * @param dayOfWeek - Day of week (0=Sunday, 1=Monday, etc.)
 * @returns Next occurrence date
 */
export function nextOccurrence(date: Date | string | number, dayOfWeek: number): Date {
  const safeDate = parseDate(date, { throwError: true });

  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new ChronoUtilzError('dayOfWeek must be between 0 and 6');
  }

  const result = new Date(safeDate);
  const currentDay = result.getDay();
  const daysToAdd = (dayOfWeek - currentDay + 7) % 7 || 7;

  result.setDate(result.getDate() + daysToAdd);
  return result;
}
