import { currentConfig } from './currentConfig';
import { readDate } from './readDate';

/** Uses the complement of configured workingDays; default Saturday/Sunday. */
export function isWeekend(date: Date | string | number): boolean {
  const safeDate = readDate(date);

  const dayOfWeek = safeDate.getDay();
  return !currentConfig.workingDays.includes(dayOfWeek);
}
