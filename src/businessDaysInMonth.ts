import { ChronoUtilzError } from './ChronoUtilzError';
import { isBusinessDay } from './isBusinessDay';

/**
 * Counts the number of business days in a given month
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Number of business days in the month
 *
 * @example
 * ```typescript
 * businessDaysInMonth(2024, 1) // Returns: 23 (January 2024)
 * businessDaysInMonth(2024, 12) // Returns: 22 (December 2024)
 * ```
 */
export function businessDaysInMonth(year: number, month: number): number {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new ChronoUtilzError('Year must be a 4-digit integer');
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new ChronoUtilzError('Month must be between 1 and 12');
  }

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  let count = 0;
  const current = new Date(firstDay);

  while (current <= lastDay) {
    if (isBusinessDay(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}
