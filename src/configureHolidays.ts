import { BusinessDayConfig } from './BusinessDayConfig';
import { ChronoUtilzError } from './ChronoUtilzError';
import { currentConfig } from './currentConfig';
import { parseDate } from './parseDate';

/**
 * Adds holidays to the business day configuration
 * @param holidays - Array of holiday dates
 * @returns The updated configuration for method chaining
 *
 * @example
 * ```typescript
 * configureHolidays([
 *   '2024-01-01', // New Year's Day
 *   '2024-07-04', // Independence Day
 *   '2024-12-25'  // Christmas Day
 * ])
 * ```
 */
export function configureHolidays(holidays: (Date | string | number)[]): BusinessDayConfig {
  if (!Array.isArray(holidays)) {
    throw new ChronoUtilzError('holidays must be an array');
  }

  const holidaySet = new Set<string>();

  for (const holiday of holidays) {
    const parsedHoliday = parseDate(holiday, { throwError: true });

    // Store as YYYY-MM-DD format for consistent comparison (timezone neutral)
    const year = String(parsedHoliday.getFullYear()).padStart(4, '0');
    const month = String(parsedHoliday.getMonth() + 1).padStart(2, '0');
    const day = String(parsedHoliday.getDate()).padStart(2, '0');
    const holidayStr = `${year}-${month}-${day}`;
    holidaySet.add(holidayStr);
  }

  currentConfig.holidays = holidaySet;
  return {
    ...currentConfig,
    workingDays: [...currentConfig.workingDays],
    holidays: new Set(currentConfig.holidays),
  };
}
