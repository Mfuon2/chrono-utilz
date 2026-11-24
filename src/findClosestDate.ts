import { parseDate } from './parseDate';

/**
 * Finds the closest date to a target from an array of dates
 * @param targetDate - Target date
 * @param dates - Array of dates to search
 * @returns Closest date or null if array is empty
 */
export function findClosestDate(
  targetDate: Date | string | number,
  dates: (Date | string | number)[],
): Date | null {
  if (dates.length === 0) return null;

  const safeTargetDate = parseDate(targetDate, { throwError: true });

  let closest: Date | null = null;
  let minDifference = Infinity;

  for (const date of dates) {
    const safeDate = parseDate(date);
    if (!safeDate) continue;

    const difference = Math.abs(safeDate.getTime() - safeTargetDate.getTime());
    if (difference < minDifference) {
      minDifference = difference;
      closest = safeDate;
    }
  }

  return closest;
}
