import { ChronoUtilzError } from './ChronoUtilzError';
import { WeekBoundaries } from './WeekBoundaries';
import { readDate } from './readDate';

/** Monday start by default; weekStartsOn can be 0-6. startOf/endOf/isSameWeek use Sunday start. */
export function getWeekBoundaries(
  date: Date | string | number,
  weekStartsOn = 1, // Remove `: number` here
): WeekBoundaries {
  const safeDate = readDate(date);

  if (weekStartsOn < 0 || weekStartsOn > 6 || !Number.isInteger(weekStartsOn)) {
    throw new ChronoUtilzError('weekStartsOn must be an integer between 0 and 6');
  }

  const day = safeDate.getDay();
  const diff = day < weekStartsOn ? day + 7 - weekStartsOn : day - weekStartsOn;

  const start = new Date(safeDate);
  start.setDate(safeDate.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
