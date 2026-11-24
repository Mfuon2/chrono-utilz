import { parseDate } from './parseDate';

/**
 * Copies the time portion (hours, minutes, seconds, milliseconds) from one date to another
 * @param fromDate - The date to copy time from
 * @param toDate - The date to copy time to
 * @returns A new Date with the date from toDate and time from fromDate
 */
export function copyTime(fromDate: Date | string | number, toDate: Date | string | number): Date {
  const safeFromDate = parseDate(fromDate, { throwError: true });
  const safeToDate = parseDate(toDate, { throwError: true });

  const result = new Date(safeToDate.getTime());
  result.setHours(
    safeFromDate.getHours(),
    safeFromDate.getMinutes(),
    safeFromDate.getSeconds(),
    safeFromDate.getMilliseconds(),
  );

  return result;
}
