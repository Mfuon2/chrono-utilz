import { addTime } from './addTime';
import { formatDateForComparison } from './formatDateForComparison';
import { isBusinessDay } from './isBusinessDay';
import { parseDate } from './parseDate';
import { startOf } from './startOf';

/** Inclusive local calendar-day count, using configured working days and the union of global, custom, and supplied holidays. Reversed ranges return 0. */
export function getBusinessDays(
  startDate: Date | string,
  endDate: Date | string,
  holidays: (Date | string)[] = [],
): number {
  const start = startOf(startDate, 'day'),
    end = startOf(endDate, 'day');
  const excluded = new Set(
    holidays.map((h) => formatDateForComparison(parseDate(h, { throwError: true })!)),
  );
  let count = 0;
  for (let day = start; day <= end; day = addTime(day, 1, 'day'))
    if (isBusinessDay(day) && !excluded.has(formatDateForComparison(day))) count++;
  return count;
}
