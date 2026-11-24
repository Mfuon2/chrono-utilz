import { parseDate } from './parseDate';
import { localWallDate } from './zone';
/** Local calendar ordinal, 1-366, independent of daylight-saving day length. */
export function getDayOfYear(date: Date | string | number): number {
  const d = localWallDate(parseDate(date, { throwError: true })!);
  d.setUTCHours(0, 0, 0, 0);
  const start = new Date(d);
  start.setUTCMonth(0, 1);
  return Math.round((d.getTime() - start.getTime()) / 86400000) + 1;
}
