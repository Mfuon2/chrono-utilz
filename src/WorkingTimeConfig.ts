import { HolidayConfig } from './HolidayConfig';
import { IANATimezone } from './IANATimezone';

/**
 * Working time configuration
 */
export interface WorkingTimeConfig {
  startHour: number;
  endHour: number;
  workingDays: number[]; // 0-6, Sunday is 0
  timezone?: IANATimezone;
  excludeHolidays?: boolean;
  holidayConfig?: HolidayConfig;
}
