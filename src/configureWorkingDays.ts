import { BusinessDayConfig } from './BusinessDayConfig';
import { ChronoUtilzError } from './ChronoUtilzError';
import { currentConfig } from './currentConfig';

/**
 * Configures which days of the week are considered working days
 * @param dayArray - Array of day numbers (0=Sunday, 1=Monday, ..., 6=Saturday)
 * @returns The updated configuration for method chaining
 *
 * @example
 * ```typescript
 * // Standard Monday-Friday
 * configureWorkingDays([1, 2, 3, 4, 5])
 *
 * // Sunday-Thursday (Middle East style)
 * configureWorkingDays([0, 1, 2, 3, 4])
 *
 * // Monday-Saturday
 * configureWorkingDays([1, 2, 3, 4, 5, 6])
 * ```
 */
export function configureWorkingDays(dayArray: number[]): BusinessDayConfig {
  if (!Array.isArray(dayArray)) {
    throw new ChronoUtilzError('dayArray must be an array');
  }

  if (dayArray.length === 0) {
    throw new ChronoUtilzError('dayArray cannot be empty');
  }

  // Validate day numbers
  for (const day of dayArray) {
    if (!Number.isInteger(day) || day < 0 || day > 6) {
      throw new ChronoUtilzError('Day numbers must be integers between 0 and 6');
    }
  }

  // Remove duplicates and sort
  const uniqueDays = [...new Set(dayArray)].sort((a, b) => a - b);

  currentConfig.workingDays = uniqueDays;
  return {
    ...currentConfig,
    workingDays: [...currentConfig.workingDays],
    holidays: new Set(currentConfig.holidays),
  };
}
