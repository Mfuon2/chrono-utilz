import { ChronoUtilzError } from './ChronoUtilzError';
import { addTime } from './addTime';
import { parseDate } from './parseDate';

/**
 * Manages shift schedules and rotations
 * @param startDate - Schedule start date
 * @param patterns - Array of shift patterns
 * @param duration - Duration in days to generate
 * @returns Array of scheduled shifts
 */
export function generateShiftSchedule(
  startDate: Date | string | number,
  patterns: Array<{
    name: string;
    startHour: number;
    duration: number;
    daysOn: number;
    daysOff: number;
  }>,
  duration = 30,
): Array<{
  date: Date;
  shiftName: string;
  startTime: Date;
  endTime: Date;
  isWorkDay: boolean;
}> {
  if (!Number.isInteger(duration) || duration < 0 || duration > 100000)
    throw new ChronoUtilzError('Invalid schedule duration');
  for (const p of patterns)
    if (
      !p.name ||
      ![p.startHour, p.duration, p.daysOn, p.daysOff].every(Number.isFinite) ||
      p.startHour < 0 ||
      p.startHour >= 24 ||
      p.duration <= 0 ||
      p.duration > 24 ||
      !Number.isInteger(p.daysOn) ||
      p.daysOn <= 0 ||
      !Number.isInteger(p.daysOff) ||
      p.daysOff < 0
    )
      throw new ChronoUtilzError('Invalid shift pattern');

  const safeStartDate = parseDate(startDate, { throwError: true });

  const schedule: Array<{
    date: Date;
    shiftName: string;
    startTime: Date;
    endTime: Date;
    isWorkDay: boolean;
  }> = [];

  for (let day = 0; day < duration; day++) {
    const currentDate = addTime(safeStartDate, day, 'day');

    for (const pattern of patterns) {
      const cycleLength = pattern.daysOn + pattern.daysOff;
      const dayInCycle = day % cycleLength;
      const isWorkDay = dayInCycle < pattern.daysOn;

      if (isWorkDay) {
        const startTime = new Date(currentDate);
        startTime.setHours(pattern.startHour, 0, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + pattern.duration);

        schedule.push({
          date: new Date(currentDate),
          shiftName: pattern.name,
          startTime,
          endTime,
          isWorkDay: true,
        });
      } else {
        schedule.push({
          date: new Date(currentDate),
          shiftName: pattern.name,
          startTime: new Date(currentDate),
          endTime: new Date(currentDate),
          isWorkDay: false,
        });
      }
    }
  }

  return schedule;
}
