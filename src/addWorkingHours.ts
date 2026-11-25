import { ChronoUtilzError } from './ChronoUtilzError';
import { WorkingSchedule } from './WorkingSchedule';
import { addTime } from './addTime';
import { readDate } from './readDate';
import { scheduleConfig } from './scheduleConfig';
import { startOf } from './startOf';

/** Consume nonnegative elapsed working hours, starting at or after the input. Supports partial days, overnight schedules and absent days (all days). Empty/zero-length schedules are rejected. Search is bounded to 100,000 iterations. */
export function addWorkingHours(
  date: Date | string | number,
  hours: number,
  schedule?: WorkingSchedule,
): Date {
  if (!Number.isFinite(hours) || hours < 0)
    throw new ChronoUtilzError('Hours must be finite and nonnegative');
  const config = scheduleConfig(schedule);
  let remaining = hours * 3600000;
  let current = readDate(date);
  if (!remaining) return current;
  for (let attempts = 0; attempts < 100000; attempts++) {
    let found = false;
    for (let offset = -1; offset <= 0; offset++) {
      const day = addTime(startOf(current, 'day'), offset, 'day');
      if (!config.workingDays.includes(day.getDay())) continue;
      const a = new Date(day),
        b = new Date(day);
      a.setMilliseconds(Math.round(config.startHour * 3600000));
      b.setMilliseconds(Math.round(config.endHour * 3600000));
      if (config.endHour <= config.startHour) b.setDate(b.getDate() + 1);
      const available = b.getTime() - Math.max(current.getTime(), a.getTime());
      if (available > 0) {
        current = new Date(Math.max(current.getTime(), a.getTime()));
        if (remaining <= available) return new Date(current.getTime() + remaining);
        remaining -= available;
        current = b;
        found = true;
        break;
      }
    }
    if (!found) current = addTime(startOf(current, 'day'), 1, 'day');
  }
  throw new ChronoUtilzError('Working-hour search exceeded supported range');
}
