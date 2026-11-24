import { ChronoUtilzError } from './ChronoUtilzError';
import { HolidayConfig } from './HolidayConfig';
import { getHolidays } from './getHolidays';
import { isHoliday } from './isHoliday';

export function isConfiguredHoliday(date: Date, config: HolidayConfig = {}): boolean {
  if (config.region || config.includeObserved)
    throw new ChronoUtilzError(
      'Regional and observed holiday policies require explicit custom holidays',
    );
  return (
    isHoliday(date, config.customHolidays) ||
    (!!config.country && isHoliday(date, getHolidays(date.getFullYear(), config.country)))
  );
}
