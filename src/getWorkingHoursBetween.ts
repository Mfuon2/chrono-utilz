import { WorkingSchedule } from './WorkingSchedule';
import { calculateWorkingHours } from './calculateWorkingHours';
import { scheduleConfig } from './scheduleConfig';

/**
 * Gets working hours between two dates
 * @param start - Start date/time
 * @param end - End date/time
 * @param workingHours - Working hours schedule
 * @returns Number of working hours
 */
export function getWorkingHoursBetween(
  start: Date | string | number,
  end: Date | string | number,
  workingHours: WorkingSchedule,
): number {
  return calculateWorkingHours(start, end, scheduleConfig(workingHours));
}
