import { getISOWeek } from './getISOWeek';

/** ISO 8601 week number, Monday start and first week containing January 4. Does not return the ISO week-year. */
export function getWeekOfYear(date: Date | string | number): number {
  return getISOWeek(date);
}
