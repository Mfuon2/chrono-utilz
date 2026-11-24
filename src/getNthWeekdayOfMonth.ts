import { ChronoUtilzError } from './ChronoUtilzError';

/**
 * Gets the nth occurrence of a weekday in a month
 * @param year - Year
 * @param month - Month (1-12)
 * @param dayOfWeek - Day of week (0-6, Sunday is 0)
 * @param occurrence - Which occurrence (1-5, or -1 for last)
 * @returns Date of the nth occurrence
 */
export function getNthWeekdayOfMonth(
  year: number,
  month: number,
  dayOfWeek: number,
  occurrence: number,
): Date | null {
  if (![year, month, dayOfWeek, occurrence].every(Number.isInteger) || year < 1000 || year > 9999)
    throw new ChronoUtilzError('Invalid weekday occurrence components');

  if (month < 1 || month > 12) {
    throw new ChronoUtilzError('Month must be between 1 and 12');
  }
  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new ChronoUtilzError('dayOfWeek must be between 0 and 6');
  }
  if (occurrence < -1 || occurrence === 0 || occurrence > 5) {
    throw new ChronoUtilzError('Occurrence must be between 1-5 or -1 for last');
  }
  const lastDay = new Date(year, month, 0);

  if (occurrence === -1) {
    // Find last occurrence
    for (let day = lastDay.getDate(); day >= 1; day--) {
      const date = new Date(year, month - 1, day);
      if (date.getDay() === dayOfWeek) {
        return date;
      }
    }
  } else {
    // Find nth occurrence
    let count = 0;
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month - 1, day);
      if (date.getDay() === dayOfWeek) {
        count++;
        if (count === occurrence) {
          return date;
        }
      }
    }
  }

  return null;
}
