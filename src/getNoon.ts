import { parseDate } from './parseDate';

/**
 * Returns a new date set to noon (12:00:00.000) of the given date
 * @param date - The date to set to noon
 * @returns New date at noon
 *
 * @example
 * ```typescript
 * getNoon(new Date('2024-01-15 14:30:45'))
 * // Returns: 2024-01-15 12:00:00.000
 * ```
 */
export function getNoon(date: Date | string | number): Date {
  const safeDate = parseDate(date, { throwError: true });

  const result = new Date(safeDate);
  result.setHours(12, 0, 0, 0);
  return result;
}
