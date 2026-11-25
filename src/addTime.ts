import { assertTimezone } from './zone';
import { checkedDate } from './zone';
import { zonedWallDate } from './zone';
import { localWallDate } from './zone';
import { fromWallDate } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { IANATimezone } from './IANATimezone';
import { TimeUnit } from './TimeUnit';
import { globalTimezoneConfig } from './globalTimezoneConfig';
import { readDate } from './readDate';

/** Hours and smaller units are elapsed time. Days and larger units are calendar arithmetic; month/year additions clamp to the last valid day. Explicit timezone calendar operations reject DST gaps/folds. Calendar amounts must be integers. */
export function addTime(
  date: Date | string | number,
  amount: number,
  unit: TimeUnit,
  timezone?: IANATimezone,
): Date {
  const parsed = readDate(date);
  if (!Number.isFinite(amount)) throw new ChronoUtilzError('Amount must be finite');
  if (timezone) assertTimezone(timezone);
  const factors: Partial<Record<TimeUnit, number>> = {
    millisecond: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
  };
  if (factors[unit]) return checkedDate(parsed.getTime() + amount * factors[unit]!);
  if (!Number.isInteger(amount)) throw new ChronoUtilzError('Calendar amounts must be integers');
  const zone =
    timezone ||
    (!globalTimezoneConfig.autoDetect ? globalTimezoneConfig.defaultTimezone : undefined);
  const wall = zone ? zonedWallDate(parsed, zone) : localWallDate(parsed);
  switch (unit) {
    case 'day':
      wall.setUTCDate(wall.getUTCDate() + amount);
      break;
    case 'week':
      wall.setUTCDate(wall.getUTCDate() + amount * 7);
      break;
    case 'month':
    case 'quarter':
    case 'year': {
      const day = wall.getUTCDate();
      wall.setUTCDate(1);
      wall.setUTCMonth(
        wall.getUTCMonth() + amount * (unit === 'year' ? 12 : unit === 'quarter' ? 3 : 1),
      );
      const last = new Date(wall);
      last.setUTCMonth(last.getUTCMonth() + 1, 0);
      wall.setUTCDate(Math.min(day, last.getUTCDate()));
      break;
    }
    default:
      throw new ChronoUtilzError('Invalid time unit');
  }
  checkedDate(wall.getTime());
  if (zone) return fromWallDate(wall, zone);
  const result = new Date(parsed);
  result.setFullYear(wall.getUTCFullYear(), wall.getUTCMonth(), wall.getUTCDate());
  result.setHours(
    wall.getUTCHours(),
    wall.getUTCMinutes(),
    wall.getUTCSeconds(),
    wall.getUTCMilliseconds(),
  );
  return result;
}
