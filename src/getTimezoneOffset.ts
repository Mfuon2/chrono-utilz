import { parseDate } from './parseDate';

/**
 * Gets the timezone offset in minutes
 * @param date - The date to get timezone offset for
 * @returns Timezone offset in minutes
 */
export function getTimezoneOffset(date: Date | string | number = new Date()): number {
  const safeDate = parseDate(date, { throwError: true });

  return safeDate.getTimezoneOffset();
}
