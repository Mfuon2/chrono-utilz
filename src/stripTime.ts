import { parseDate } from './parseDate';

/**
 * Returns a new date with time set to midnight (00:00:00.000)
 * @param date - The date to strip time from
 * @returns New date at midnight
 *
 * @example
 * ```typescript
 * stripTime(new Date('2024-01-15 14:30:45'))
 * // Returns: 2024-01-15 00:00:00.000
 * ```
 */
export function stripTime(date: Date | string | number): Date {
  const safeDate = parseDate(date, { throwError: true });

  const result = new Date(safeDate);
  result.setHours(0, 0, 0, 0);
  return result;
}
