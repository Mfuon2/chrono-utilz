import { readDate } from './readDate';

/**
 * Merges a date part with a time part
 * @param datePart - The date component
 * @param timePart - The time component
 * @returns New date with merged date and time
 */
export function mergeDateTime(
  datePart: Date | string | number,
  timePart: Date | string | number,
): Date {
  const safeDate = readDate(datePart);
  const safeTime = readDate(timePart);

  const result = new Date(safeDate);
  result.setHours(
    safeTime.getHours(),
    safeTime.getMinutes(),
    safeTime.getSeconds(),
    safeTime.getMilliseconds(),
  );

  return result;
}
