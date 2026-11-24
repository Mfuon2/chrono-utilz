import { parseDate } from './parseDate';

/**
 * Gets the number of days in a month
 * @param date - The reference date
 * @returns The number of days in the month
 */
export function getDaysInMonth(date: Date | string | number): number {
  const safeDate = parseDate(date, { throwError: true });

  const end = new Date(safeDate);
  end.setMonth(end.getMonth() + 1, 0);
  return end.getDate();
}
