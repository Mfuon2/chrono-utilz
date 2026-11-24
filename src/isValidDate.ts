import { parseDate } from './parseDate';

/**
 * Validates whether a given input is a valid date in supported formats.
 * Checks if a date is valid
 * @param date - The date to check
 * @returns True if the date is valid
 */
export function isValidDate(date: any): boolean {
  const parsedDate = parseDate(date, { throwError: false });
  return parsedDate !== null;
}
