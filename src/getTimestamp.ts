import { parseDate } from './parseDate';

/**
 * Gets the Unix timestamp for a date
 * @param date - The date to convert
 * @param inSeconds - Whether to return timestamp in seconds (default: false, returns milliseconds)
 * @returns Unix timestamp
 */
export function getTimestamp(date: Date | string | number, inSeconds = false): number {
  const safeDate = parseDate(date, { throwError: true });

  const timestamp = safeDate.getTime();
  return inSeconds ? Math.floor(timestamp / 1000) : timestamp;
}
