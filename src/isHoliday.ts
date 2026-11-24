import { IANATimezone } from './IANATimezone';
import { currentConfig } from './currentConfig';
import { customHolidays } from './customHolidays';
import { formatDateForComparison } from './formatDateForComparison';
import { formatDate } from './formatDate';
import { parseDate } from './parseDate';
/** Checks configured global holidays, custom holidays, and an optional supplied list. Country presets are applied explicitly through getHolidays or WorkingTimeConfig.holidayConfig. */
export function isHoliday(
  date: Date | string | number,
  holidaysList?: (Date | string)[],
  timezone?: IANATimezone,
): boolean {
  const parsed = parseDate(date, { throwError: true, timezone })!;
  const key = (d: Date) =>
    timezone ? formatDate(d, 'YYYY-MM-DD', timezone) : formatDateForComparison(d);
  const dateStr = key(parsed);
  if (customHolidays.has(dateStr) || currentConfig.holidays.has(dateStr)) return true;
  return (holidaysList || []).some(
    (value) => key(parseDate(value, { throwError: true, timezone })!) === dateStr,
  );
}
