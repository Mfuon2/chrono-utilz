import { getHolidays } from './getHolidays';
import { readDate } from './readDate';

/**
 * Gets the next holiday from a given date
 * @param date - The starting date
 * @param country - Optional country code (default: 'US')
 * @returns The next holiday date
 */
export function getNextHoliday(date: Date | string | number, country = 'US'): Date | null {
  const safeDate = readDate(date);

  const currentYear = safeDate.getFullYear();

  // Get holidays for current and next year
  const thisYearHolidays = getHolidays(currentYear, country);
  const nextYearHolidays = getHolidays(currentYear + 1, country);

  const allHolidays = [...thisYearHolidays, ...nextYearHolidays];

  // Find the next holiday after the given date
  const futureHolidays = allHolidays
    .filter((holiday) => holiday > safeDate)
    .sort((a, b) => a.getTime() - b.getTime());

  return futureHolidays.length > 0 ? futureHolidays[0] : null;
}
