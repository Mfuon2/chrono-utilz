import { readDate } from './readDate';

/** Returns a clone of the same instant; Date does not carry a timezone. */
export function toUTC(date: Date | string | number): Date {
  return readDate(date);
}
