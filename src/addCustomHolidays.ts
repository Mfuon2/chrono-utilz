import { ChronoUtilzError } from './ChronoUtilzError';
import { customHolidays } from './customHolidays';
import { formatDateForComparison } from './formatDateForComparison';
import { readDate } from './readDate';

/**
 * Adds custom holidays
 * @param holidayArray - Array of custom holiday dates
 */
export function addCustomHolidays(holidayArray: (Date | string | number)[]): void {
  if (!Array.isArray(holidayArray)) {
    throw new ChronoUtilzError('holidayArray must be an array');
  }

  for (const holiday of holidayArray) {
    const holidayDate = readDate(holiday);

    const holidayStr = formatDateForComparison(holidayDate);
    customHolidays.add(holidayStr);
  }
}
