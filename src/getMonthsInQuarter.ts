import { localCalendarDate } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { getMonthName } from './getMonthName';

/**
 * Gets detailed information about months in a quarter
 * @param quarter - Quarter number (1-4)
 * @param year - Year
 * @returns Object containing quarter info and months
 */
export function getMonthsInQuarter(quarter: number, year: number) {
  if (!Number.isInteger(quarter) || quarter < 1 || quarter > 4) {
    throw new ChronoUtilzError('Quarter must be between 1 and 4');
  }

  if (!Number.isInteger(year) || year < 1) {
    throw new ChronoUtilzError('Year must be a positive integer');
  }

  const startMonth = (quarter - 1) * 3 + 1;
  const months = [];

  for (let i = 0; i < 3; i++) {
    const monthNumber = startMonth + i;
    months.push({
      name: getMonthName(monthNumber),
      number: monthNumber,
      firstDay: localCalendarDate(year, monthNumber - 1, 1),
      lastDay: localCalendarDate(year, monthNumber, 0), // 0th day of next month = last day of current month
    });
  }

  return {
    quarter,
    year,
    months,
    startDate: localCalendarDate(year, (quarter - 1) * 3, 1),
    endDate: localCalendarDate(year, quarter * 3, 0),
  };
}
