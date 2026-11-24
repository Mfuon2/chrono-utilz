import { ChronoUtilzError } from './ChronoUtilzError';
import { QuarterBoundaries } from './QuarterBoundaries';

/**
 * Gets the start and end dates of the specified quarter in the given year
 * @param year - The year
 * @param quarter - The quarter (1, 2, 3, or 4)
 * @returns Object with 'start' and 'end' Date properties
 *
 * @example
 * ```typescript
 * getQuarterBoundaries(2024, 1)
 * // Returns: { start: 2024-01-01 00:00:00, end: 2024-03-31 23:59:59 }
 *
 * getQuarterBoundaries(2024, 4)
 * // Returns: { start: 2024-10-01 00:00:00, end: 2024-12-31 23:59:59 }
 * ```
 */
export function getQuarterBoundaries(year: number, quarter: number): QuarterBoundaries {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new ChronoUtilzError('Year must be a 4-digit integer');
  }

  if (!Number.isInteger(quarter) || quarter < 1 || quarter > 4) {
    throw new ChronoUtilzError('Quarter must be between 1 and 4');
  }

  const startMonth = (quarter - 1) * 3;
  const endMonth = startMonth + 2;

  const start = new Date(year, startMonth, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(year, endMonth + 1, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
