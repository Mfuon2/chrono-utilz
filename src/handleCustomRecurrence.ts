import { ChronoUtilzError } from './ChronoUtilzError';
import { RecurringConfig } from './RecurringConfig';
import { addTime } from './addTime';

/**
 * Handles custom recurring patterns
 */
export function handleCustomRecurrence(currentDate: Date, config: RecurringConfig): Date {
  const { daysOfWeek, daysOfMonth, monthsOfYear } = config;
  let nextDate = addTime(currentDate, 1, 'day');

  let attempts = 0;
  const maxAttempts = 366 * 8;

  while (attempts < maxAttempts) {
    let matches = true;

    if (daysOfWeek && !daysOfWeek.includes(nextDate.getDay())) {
      matches = false;
    }

    if (daysOfMonth && !daysOfMonth.includes(nextDate.getDate())) {
      matches = false;
    }

    if (monthsOfYear && !monthsOfYear.includes(nextDate.getMonth() + 1)) {
      matches = false;
    }

    if (matches) break;

    nextDate = addTime(nextDate, 1, 'day');
    attempts++;
  }

  if (attempts === maxAttempts)
    throw new ChronoUtilzError('No matching recurrence within eight years');
  return nextDate;
}
