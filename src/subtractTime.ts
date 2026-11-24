import { IANATimezone } from './IANATimezone';
import { TimeUnit } from './TimeUnit';
import { addTime } from './addTime';

/**
 * Subtracts time from a date
 * @param date - The base date
 * @param amount - The amount to subtract
 * @param unit - The time unit
 * @param timezone - Optional timezone (defaults to user's timezone)
 * @returns A new Date with the subtracted time
 */
export function subtractTime(
  date: Date | string | number,
  amount: number,
  unit: TimeUnit,
  timezone?: IANATimezone,
): Date {
  return addTime(date, -amount, unit, timezone);
}
