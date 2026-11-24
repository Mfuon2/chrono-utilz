import { BusinessDayRules } from './BusinessDayRules';
import { ChronoUtilzError } from './ChronoUtilzError';
import { addTime } from './addTime';
import { isHoliday } from './isHoliday';
import { startOf } from './startOf';
import { validateWorkingConfig } from './validateWorkingConfig';

/** Excludes the start date and includes the end date. Global/custom holidays are combined with the supplied holidays. Reversed ranges return 0. workingHours is rejected; use calculateWorkingHours. */
export function calculateBusinessDaysCustom(
  start: Date | string | number,
  end: Date | string | number,
  rules: BusinessDayRules,
): number {
  if (rules.workingHours)
    throw new ChronoUtilzError('Use calculateWorkingHours for working-hour intervals');
  const config = { startHour: 9, endHour: 17, workingDays: rules.workingDays };
  validateWorkingConfig(config);
  const a = startOf(start, 'day'),
    b = startOf(end, 'day');
  let count = 0;
  for (let d = addTime(a, 1, 'day'); d <= b; d = addTime(d, 1, 'day'))
    if (rules.workingDays.includes(d.getDay()) && !isHoliday(d, rules.holidays)) count++;
  return count;
}
