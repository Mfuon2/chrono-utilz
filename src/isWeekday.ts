import { isWeekend } from './isWeekend';

/** Uses configured workingDays; default Monday-Friday. */
export function isWeekday(date: Date | string | number): boolean {
  return !isWeekend(date);
}
