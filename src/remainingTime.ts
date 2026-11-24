import { IANATimezone } from './IANATimezone';
import { TimeUnit } from './TimeUnit';
import { getDateDiff } from './getDateDiff';

/** target minus reference, with the same units and truncation as getDateDiff. */
export function remainingTime(
  targetDate: Date | string | number,
  unit: TimeUnit = 'millisecond',
  referenceDate: Date | string | number = new Date(),
  timezone?: IANATimezone,
): number {
  return getDateDiff(targetDate, referenceDate, unit, timezone);
}
