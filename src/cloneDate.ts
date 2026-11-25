import { readDate } from './readDate';

/**
 * Creates a deep copy of a Date object
 * @param date - The date to clone
 * @returns A new Date object with the same time value
 */
export function cloneDate(date: Date | string | number): Date {
  const safeDate = readDate(date);

  return new Date(safeDate.getTime());
}
