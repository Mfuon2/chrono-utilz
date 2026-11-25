import { ChronoUtilzError } from './ChronoUtilzError';
import { readDate } from './readDate';

/**
 * Gets the previous occurrence of a specific day of week
 * @param date - Starting date
 * @param dayOfWeek - Day of week (0=Sunday, 1=Monday, etc.)
 * @returns Previous occurrence date
 */
export function previousOccurrence(date: Date | string | number, dayOfWeek: number): Date {
  const safeDate = readDate(date);

  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new ChronoUtilzError('dayOfWeek must be between 0 and 6');
  }

  const result = new Date(safeDate);
  const currentDay = result.getDay();
  const daysToSubtract = (currentDay - dayOfWeek + 7) % 7 || 7;

  result.setDate(result.getDate() - daysToSubtract);
  return result;
}
