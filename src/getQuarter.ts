import { parseDate } from './parseDate';

/**
 * Returns the quarter number (1-4) for a given date
 *
 * @example
 * ```
 * const quarter = ChronoUtilz.getQuarter(new Date(2025, 4, 15)); // 2 (Q2)
 * ```
 *
 * @param date - The date to get the quarter for
 * @returns The quarter number (1-4)
 */
export function getQuarter(date: Date | string): number {
  const parsedDate = parseDate(date);
  if (!parsedDate) {
    throw new Error('Invalid date provided');
  }

  const month = parsedDate.getMonth();
  return Math.floor(month / 3) + 1;
}
