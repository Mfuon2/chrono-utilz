import { ChronoUtilzError } from './ChronoUtilzError';
import { isBusinessDay } from './isBusinessDay';

/**
 * Gets an array of all business days in a given month
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Array of Date objects representing business days
 *
 * @example
 * ```typescript
 * getBusinessDaysInMonth(2024, 1)
 * // Returns: Array of Date objects for all business days in January 2024
 * ```
 */
export function getBusinessDaysInMonth(year: number, month: number): Date[] {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new ChronoUtilzError('Year must be a 4-digit integer');
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new ChronoUtilzError('Month must be between 1 and 12');
  }

  const businessDays: Date[] = [];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const current = new Date(firstDay);

  while (current <= lastDay) {
    if (isBusinessDay(current)) {
      businessDays.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return businessDays;
}
