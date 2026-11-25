import { DateComparison } from './DateComparison';
import { addTime } from './addTime';
import { readDate } from './readDate';

/** Absolute calendar decomposition: clamped years, then clamped months, calendar days, then elapsed sub-day remainder. Direction is reported separately. */
export function compareDetailed(
  date1: Date | string | number,
  date2: Date | string | number,
): DateComparison {
  const a = readDate(date1),
    b = readDate(date2);
  const first = a < b ? a : b,
    last = a < b ? b : a;
  let cursor = new Date(first);
  let years = last.getFullYear() - first.getFullYear();
  if (addTime(cursor, years, 'year') > last) years--;
  cursor = addTime(cursor, years, 'year');
  let months =
    (last.getFullYear() - cursor.getFullYear()) * 12 + last.getMonth() - cursor.getMonth();
  if (addTime(cursor, months, 'month') > last) months--;
  cursor = addTime(cursor, months, 'month');
  let days = 0;
  while (addTime(cursor, 1, 'day') <= last) {
    cursor = addTime(cursor, 1, 'day');
    days++;
  }
  let ms = last.getTime() - cursor.getTime();
  const hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  ms %= 1000;
  return {
    isBefore: a < b,
    isAfter: a > b,
    isSame: a.getTime() === b.getTime(),
    difference: { years, months, days, hours, minutes, seconds, milliseconds: ms },
  };
}
