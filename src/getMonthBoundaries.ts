import { localCalendarDate } from './zone';
import { MonthBoundaries } from './MonthBoundaries';
import { readDate } from './readDate';

/**
 * Gets the start and end dates of the month containing the given date
 * @param date - The date to find month boundaries for
 * @returns Object with 'start' and 'end' Date properties
 *
 * @example
 * ```typescript
 * getMonthBoundaries(new Date('2024-01-15'))
 * // Returns: { start: 2024-01-01 00:00:00, end: 2024-01-31 23:59:59 }
 *
 * getMonthBoundaries(new Date('2024-02-15'))
 * // Returns: { start: 2024-02-01 00:00:00, end: 2024-02-29 23:59:59 } (leap year)
 * ```
 */
export function getMonthBoundaries(date: Date | string | number): MonthBoundaries {
  const safeDate = readDate(date);

  const start = localCalendarDate(safeDate.getFullYear(), safeDate.getMonth(), 1);
  start.setHours(0, 0, 0, 0);

  const end = localCalendarDate(safeDate.getFullYear(), safeDate.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
