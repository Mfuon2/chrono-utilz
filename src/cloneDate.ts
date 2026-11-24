import { parseDate } from './parseDate';

/**
 * Creates a deep copy of a Date object
 * @param date - The date to clone
 * @returns A new Date object with the same time value
 */
export function cloneDate(date: Date | string | number): Date {
  const safeDate = parseDate(date, { throwError: true });

  return new Date(safeDate.getTime());
}
