import { TimeOfDay } from './TimeOfDayType';
import { readDate } from './readDate';

/**
 * Gets the time of day category
 * @param date - The date to categorize
 * @returns Time of day category
 */
export function timeOfDay(date: Date | string | number): TimeOfDay {
  const safeDate = readDate(date);

  const hour = safeDate.getHours();

  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
}
