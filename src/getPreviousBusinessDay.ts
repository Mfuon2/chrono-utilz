import { isBusinessDay } from './isBusinessDay';
import { readDate } from './readDate';

/**
 * Gets the previous business day from the given date
 * @param date - The starting date
 * @returns The previous business day
 *
 * @example
 * ```typescript
 * // From Monday, Jan 8, 2024
 * getPreviousBusinessDay(new Date('2024-01-08'))
 * // Returns: Friday, Jan 5, 2024
 * ```
 */
export function getPreviousBusinessDay(date: Date | string | number): Date {
  const safeDate = readDate(date);

  const result = new Date(safeDate);

  do {
    result.setDate(result.getDate() - 1);
  } while (!isBusinessDay(result));

  return result;
}
