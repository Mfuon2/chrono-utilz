import { assertTimezone } from './zone';
import { zonedWallDate } from './zone';
import { localWallDate } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { IANATimezone } from './IANATimezone';
import { TimeUnit } from './TimeUnit';
import { readDate } from './readDate';

/** date1 minus date2. Elapsed units truncate toward zero. Month differences count calendar month boundaries, quarters truncate that count / 3, and years return month count / 12. These are not full-anniversary differences. */
export function getDateDiff(
  date1: Date | string | number,
  date2: Date | string | number,
  unit: TimeUnit,
  timezone?: IANATimezone,
): number {
  const first = readDate(date1),
    second = readDate(date2);
  const factors: Partial<Record<TimeUnit, number>> = {
    millisecond: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
  };
  if (timezone) assertTimezone(timezone);
  const factor = factors[unit];
  if (factor) return Math.trunc((first.getTime() - second.getTime()) / factor) || 0;
  const a = timezone ? zonedWallDate(first, timezone) : localWallDate(first),
    b = timezone ? zonedWallDate(second, timezone) : localWallDate(second);
  const months = (a.getUTCFullYear() - b.getUTCFullYear()) * 12 + a.getUTCMonth() - b.getUTCMonth();
  if (unit === 'month') return months;
  if (unit === 'quarter') return Math.trunc(months / 3) || 0;
  if (unit === 'year') return months / 12;
  throw new ChronoUtilzError('Invalid time unit');
}
