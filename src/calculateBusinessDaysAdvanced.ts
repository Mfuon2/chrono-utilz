import { zonedWallDate } from './zone';
import { localWallDate } from './zone';
import { WorkingTimeConfig } from './WorkingTimeConfig';
import { createDate } from './createDate';
import { isConfiguredHoliday } from './isConfiguredHoliday';
import { readDate } from './readDate';
import { validateWorkingConfig } from './validateWorkingConfig';

/** Inclusive calendar days in config.timezone (host timezone by default). Honors workingDays, excludeHolidays and holidayConfig. */
export function calculateBusinessDaysAdvanced(
  startDate: Date | string | number,
  endDate: Date | string | number,
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): number {
  validateWorkingConfig(config);
  const a = readDate(startDate),
    b = readDate(endDate);
  const first = config.timezone ? zonedWallDate(a, config.timezone) : localWallDate(a),
    last = config.timezone ? zonedWallDate(b, config.timezone) : localWallDate(b);
  first.setUTCHours(0, 0, 0, 0);
  last.setUTCHours(0, 0, 0, 0);
  let count = 0;
  for (let d = first; d <= last; d = new Date(d.getTime() + 86400000)) {
    const local = createDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12);
    if (
      config.workingDays.includes(d.getUTCDay()) &&
      (!config.excludeHolidays || !isConfiguredHoliday(local, config.holidayConfig))
    )
      count++;
  }
  return count;
}
