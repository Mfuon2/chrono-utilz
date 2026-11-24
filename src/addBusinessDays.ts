import { ChronoUtilzError } from './ChronoUtilzError';
import { IANATimezone } from './IANATimezone';
import { currentConfig } from './currentConfig';
import { isHoliday } from './isHoliday';
import { parseDate } from './parseDate';
import { addTime } from './addTime';
import { localWallDate, zonedWallDate } from './zone';
/** Add signed calendar business days, excluding the starting date and preserving clock time. */
export function addBusinessDays(
  date: Date | string | number,
  businessDays: number,
  timezone?: IANATimezone,
): Date {
  if (!Number.isSafeInteger(businessDays) || Math.abs(businessDays) > 100000)
    throw new ChronoUtilzError('Business days must be an integer between -100000 and 100000');
  let result = parseDate(date, { throwError: true, timezone })!;
  const step = businessDays < 0 ? -1 : 1;
  let remaining = Math.abs(businessDays);
  while (remaining > 0) {
    result = addTime(result, step, 'day', timezone);
    const wall = timezone ? zonedWallDate(result, timezone) : localWallDate(result);
    if (
      currentConfig.workingDays.includes(wall.getUTCDay()) &&
      !isHoliday(result, undefined, timezone)
    )
      remaining--;
  }
  return result;
}
