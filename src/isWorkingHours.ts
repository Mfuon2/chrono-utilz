import { WorkingSchedule } from './WorkingSchedule';
import { calculateWorkingHours } from './calculateWorkingHours';
import { parseDate } from './parseDate';
import { scheduleConfig } from './scheduleConfig';

/** Start-inclusive, end-exclusive. Overnight shifts belong to their starting weekday. */
export function isWorkingHours(date: Date | string | number, schedule?: WorkingSchedule): boolean {
  const d = parseDate(date, { throwError: true })!,
    config = scheduleConfig(schedule);
  return calculateWorkingHours(d, new Date(d.getTime() + 1), config) > 0;
}
