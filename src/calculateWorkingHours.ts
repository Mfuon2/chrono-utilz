import { zonedWallDate } from './zone';
import { localWallDate } from './zone';
import { fromWallDate } from './zone';
import { WorkingTimeConfig } from './WorkingTimeConfig';
import { createDate } from './createDate';
import { isConfiguredHoliday } from './isConfiguredHoliday';
import { parseDate } from './parseDate';
import { validateWorkingConfig } from './validateWorkingConfig';

/** Overlap with half-open [start,end) work intervals. Supports fractional hours, overnight intervals (endHour < startHour), explicit timezone and configured holiday exclusion. The shift belongs to its starting calendar day. DST-ambiguous boundaries throw. */
export function calculateWorkingHours(
  startDate: Date | string | number,
  endDate: Date | string | number,
  config: WorkingTimeConfig,
): number {
  validateWorkingConfig(config);
  const start = parseDate(startDate, { throwError: true })!,
    end = parseDate(endDate, { throwError: true })!;
  if (start >= end) return 0;
  const zone = config.timezone;
  const first = zone ? zonedWallDate(start, zone) : localWallDate(start);
  const last = zone ? zonedWallDate(end, zone) : localWallDate(end);
  first.setUTCHours(0, 0, 0, 0);
  first.setUTCDate(first.getUTCDate() - 1);
  last.setUTCHours(0, 0, 0, 0);
  let total = 0;
  for (let wall = first; wall <= last; wall = new Date(wall.getTime() + 86400000)) {
    if (!config.workingDays.includes(wall.getUTCDay())) continue;
    const local = createDate(wall.getUTCFullYear(), wall.getUTCMonth(), wall.getUTCDate(), 12);
    if (config.excludeHolidays && isConfiguredHoliday(local, config.holidayConfig)) continue;
    const a = new Date(wall),
      b = new Date(wall);
    a.setUTCMilliseconds(Math.round(config.startHour * 3600000));
    b.setUTCMilliseconds(Math.round(config.endHour * 3600000));
    if (config.endHour <= config.startHour) b.setUTCDate(b.getUTCDate() + 1);
    const resolve = (d: Date) =>
      zone
        ? fromWallDate(d, zone)
        : createDate(
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
            d.getUTCMilliseconds(),
          );
    total += Math.max(
      0,
      Math.min(end.getTime(), resolve(b).getTime()) -
        Math.max(start.getTime(), resolve(a).getTime()),
    );
  }
  return total / 3600000;
}
