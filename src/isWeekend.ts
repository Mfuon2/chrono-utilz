import { currentConfig } from './currentConfig';
import { parseDate } from './parseDate';

/** Uses the complement of configured workingDays; default Saturday/Sunday. */
export function isWeekend(date: Date | string | number): boolean {
  const safeDate = parseDate(date, { throwError: true });

  const dayOfWeek = safeDate.getDay();
  return !currentConfig.workingDays.includes(dayOfWeek);
}
