import { isBusinessDay } from './isBusinessDay';
import { readDate } from './readDate';

/**
 * Gets the next business day from the given date
 * @param date - The starting date
 * @returns The next business day
 *
 * @example
 * ```typescript
 * // From Friday, Jan 5, 2024
 * getNextBusinessDay(new Date('2024-01-05'))
 * // Returns: Monday, Jan 8, 2024
 * ```
 */
export function getNextBusinessDay(date: Date | string | number): Date {
  const safeDate = readDate(date);

  const result = new Date(safeDate);

  do {
    result.setDate(result.getDate() + 1);
  } while (!isBusinessDay(result));

  return result;
}
