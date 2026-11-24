import { WorkingSchedule } from './WorkingSchedule';
import { addWorkingHours } from './addWorkingHours';
import { isWorkingHours } from './isWorkingHours';
import { parseDate } from './parseDate';

/** During a working interval, consume one working hour. Outside it, return the next interval opening. */
export function getNextWorkingHour(date: Date | string | number, schedule?: WorkingSchedule): Date {
  const d = parseDate(date, { throwError: true })!;
  if (isWorkingHours(d, schedule)) return addWorkingHours(d, 1, schedule);
  // Locate the next interval start without consuming a working hour.
  return new Date(addWorkingHours(d, 1 / 3600000, schedule).getTime() - 1);
}
