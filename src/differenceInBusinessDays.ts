import { isBusinessDay } from './isBusinessDay';
import { parseDate } from './parseDate';

/** Signed local calendar-day count. Forward ranges exclude the first date and include the last; reversed ranges negate the corresponding ordered interval. */
export function differenceInBusinessDays(
  startDate: Date | string | number,
  endDate: Date | string | number,
): number {
  const safeStartDate = parseDate(startDate, { throwError: true });
  const safeEndDate = parseDate(endDate, { throwError: true });

  // Normalize to start of day for accurate counting
  const start = new Date(safeStartDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(safeEndDate);
  end.setHours(0, 0, 0, 0);

  // Determine direction
  const isForward = end >= start;
  const fromDate = isForward ? start : end;
  const toDate = isForward ? end : start;

  let count = 0;
  const current = new Date(fromDate);

  // Don't include the start date, only count days between
  current.setDate(current.getDate() + 1);

  while (current <= toDate) {
    if (isBusinessDay(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return isForward ? count : -count;
}
