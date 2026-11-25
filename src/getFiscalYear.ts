import { ChronoUtilzError } from './ChronoUtilzError';
import { readDate } from './readDate';

/**
 * Gets fiscal year
 * @param date - The date
 * @param fiscalYearStart - Fiscal year start month (1-12, default: 1 for January)
 * @returns Fiscal year
 */
export function getFiscalYear(date: Date | string | number, fiscalYearStart = 1): number {
  if (!Number.isInteger(fiscalYearStart))
    throw new ChronoUtilzError('Fiscal start must be an integer');

  const safeDate = readDate(date);

  if (fiscalYearStart < 1 || fiscalYearStart > 12) {
    throw new ChronoUtilzError('fiscalYearStart must be between 1 and 12');
  }

  const year = safeDate.getFullYear();
  const month = safeDate.getMonth() + 1;

  return month >= fiscalYearStart ? year : year - 1;
}
