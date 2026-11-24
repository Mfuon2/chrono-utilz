import { ChronoUtilzError } from './ChronoUtilzError';
import { YearBoundaries } from './YearBoundaries';

/**
 * Gets the start and end dates of the specified year
 * @param year - The year to get boundaries for
 * @returns Object with 'start' and 'end' Date properties
 *
 * @example
 * ```typescript
 * getYearBoundaries(2024)
 * // Returns: { start: 2024-01-01 00:00:00, end: 2024-12-31 23:59:59 }
 * ```
 */
export function getYearBoundaries(year: number): YearBoundaries {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new ChronoUtilzError('Year must be a 4-digit integer');
  }

  const start = new Date(year, 0, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(year, 11, 31);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
