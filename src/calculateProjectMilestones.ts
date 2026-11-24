import { zonedWallDate } from './zone';
import { localWallDate } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { WorkingTimeConfig } from './WorkingTimeConfig';
import { addTime } from './addTime';
import { createDate } from './createDate';
import { isConfiguredHoliday } from './isConfiguredHoliday';
import { parseDate } from './parseDate';
import { validateWorkingConfig } from './validateWorkingConfig';

/**
 * Calculates project milestones based on working days
 * @param startDate - Project start date
 * @param tasks - Array of task durations in working days
 * @param config - Working time configuration
 * @returns Array of milestone dates
 */
export function calculateProjectMilestones(
  startDate: Date | string | number,
  tasks: number[],
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): Date[] {
  validateWorkingConfig(config);
  if (!tasks.every((n) => Number.isSafeInteger(n) && n >= 0))
    throw new ChronoUtilzError('Task durations must be nonnegative integers');
  let current = parseDate(startDate, { throwError: true })!;
  const milestones = [new Date(current)];
  for (const days of tasks) {
    let remaining = days;
    while (remaining > 0) {
      current = addTime(current, 1, 'day', config.timezone);
      const wall = config.timezone
        ? zonedWallDate(current, config.timezone)
        : localWallDate(current);
      const local = createDate(wall.getUTCFullYear(), wall.getUTCMonth(), wall.getUTCDate(), 12);
      if (
        config.workingDays.includes(wall.getUTCDay()) &&
        (!config.excludeHolidays || !isConfiguredHoliday(local, config.holidayConfig))
      )
        remaining--;
    }
    milestones.push(new Date(current));
  }
  return milestones;
}
