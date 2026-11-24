import { CalendarEvent } from './CalendarEvent';
import { ChronoUtilzError } from './ChronoUtilzError';
import { WorkingTimeConfig } from './WorkingTimeConfig';
import { getDaysInMonth } from './getDaysInMonth';
import { isConfiguredHoliday } from './isConfiguredHoliday';
import { isWeekend } from './isWeekend';
import { parseDate } from './parseDate';
import { localWallDate, zonedWallDate } from './zone';
import { validateWorkingConfig } from './validateWorkingConfig';

/**
 * Generates a calendar with events and business logic
 * @param year - Year
 * @param month - Month (1-12)
 * @param events - Array of calendar events
 * @param config - Working time configuration
 * @returns Calendar object with detailed day information
 */
export function generateBusinessCalendar(
  year: number,
  month: number,
  events: CalendarEvent[] = [],
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): Array<{
  date: Date;
  isWorkingDay: boolean;
  isHoliday: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
  workingHours: number;
}> {
  validateWorkingConfig(config);
  if (!Number.isInteger(year) || year < 1000 || year > 9999 || !Number.isInteger(month))
    throw new ChronoUtilzError('Invalid calendar year or month');

  if (month < 1 || month > 12) {
    throw new ChronoUtilzError('Month must be between 1 and 12');
  }

  const calendar: Array<{
    date: Date;
    isWorkingDay: boolean;
    isHoliday: boolean;
    isWeekend: boolean;
    events: CalendarEvent[];
    workingHours: number;
  }> = [];

  const daysInMonth = getDaysInMonth(new Date(year, month - 1, 1));

  for (let day = 1; day <= daysInMonth; day++) {
    const calendarDay = new Date(year, month - 1, day);
    const date = config.timezone
      ? parseDate(
          String(year) + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0'),
          { throwError: true, timezone: config.timezone },
        )
      : calendarDay;
    const isWeekendDay = isWeekend(calendarDay);
    const isHolidayDay = isConfiguredHoliday(calendarDay, config.holidayConfig);
    const isWorkingDay =
      config.workingDays.includes(calendarDay.getDay()) &&
      !(config.excludeHolidays && isHolidayDay);

    // Calculate working hours for the day
    const workingHours = isWorkingDay ? (config.endHour - config.startHour + 24) % 24 : 0;

    // Find events for this day
    const dayEvents = events.filter((event) => {
      const eventStart = event.startDate;
      const eventEnd = event.endDate || event.startDate;
      if (event.recurring)
        throw new ChronoUtilzError(
          'Expand recurring events with generateRecurringDates before calendar generation',
        );
      if (event.timezone)
        throw new ChronoUtilzError(
          'Calendar event dates must be instants; use config.timezone for display',
        );
      const wall = (d: Date) => {
        const w = config.timezone ? zonedWallDate(d, config.timezone) : localWallDate(d);
        w.setUTCHours(0, 0, 0, 0);
        return +w;
      };
      return wall(date) >= wall(eventStart) && wall(date) <= wall(eventEnd);
    });

    calendar.push({
      date: new Date(date),
      isWorkingDay,
      isHoliday: isHolidayDay,
      isWeekend: isWeekendDay,
      events: dayEvents,
      workingHours,
    });
  }

  return calendar;
}
