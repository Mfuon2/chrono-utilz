import { readDate } from './readDate';
import { localWallDate } from './zone';
/** ISO 8601 week number, Monday start and first week containing January 4. Does not return the ISO week-year. */
export function getISOWeek(date: Date | string | number): number {
  const target = localWallDate(readDate(date));
  target.setUTCDate(target.getUTCDate() + 4 - (target.getUTCDay() || 7));
  const start = new Date(target);
  start.setUTCMonth(0, 1);
  return Math.ceil(((target.getTime() - start.getTime()) / 86400000 + 1) / 7);
}
