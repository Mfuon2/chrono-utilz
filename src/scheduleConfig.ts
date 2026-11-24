import { ChronoUtilzError } from './ChronoUtilzError';
import { WorkingSchedule } from './WorkingSchedule';
import { WorkingTimeConfig } from './WorkingTimeConfig';
import { validateWorkingConfig } from './validateWorkingConfig';

export function scheduleConfig(
  schedule: WorkingSchedule = { start: '09:00', end: '17:00', days: [1, 2, 3, 4, 5] },
): WorkingTimeConfig {
  const parse = (value: string) => {
    if (!/^\d{2}:\d{2}$/.test(value)) throw new ChronoUtilzError('Schedule times must use HH:mm');
    const [h, m] = value.split(':').map(Number);
    if (h > 23 || m > 59) throw new ChronoUtilzError('Invalid schedule time');
    return h + m / 60;
  };
  const config = {
    startHour: parse(schedule.start),
    endHour: parse(schedule.end),
    workingDays: schedule.days || [0, 1, 2, 3, 4, 5, 6],
  };
  validateWorkingConfig(config);
  return config;
}
