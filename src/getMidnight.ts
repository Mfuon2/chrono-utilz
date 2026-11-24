import { stripTime } from './stripTime';

/**
 * Returns a new date set to midnight (00:00:00.000) of the given date
 * Alias for stripTime() for semantic clarity
 * @param date - The date to set to midnight
 * @returns New date at midnight
 *
 * @example
 * ```typescript
 * getMidnight(new Date('2024-01-15 14:30:45'))
 * // Returns: 2024-01-15 00:00:00.000
 * ```
 */
export function getMidnight(date: Date | string | number): Date {
  return stripTime(date);
}
