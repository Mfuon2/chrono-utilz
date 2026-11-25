import { localCalendarDate } from './zone';
import { readDate } from './readDate';

/**
 * Gets the week number within a month
 * @param date - The date
 * @returns Week number within the month (1-6)
 */
export function getWeekOfMonth(date: Date | string | number): number {
  const d = readDate(date);
  return (
    Math.floor(
      (d.getDate() + localCalendarDate(d.getFullYear(), d.getMonth(), 1).getDay() - 1) / 7,
    ) + 1
  );
}
