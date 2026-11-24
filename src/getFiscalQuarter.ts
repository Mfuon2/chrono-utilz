import { ChronoUtilzError } from './ChronoUtilzError';
import { parseDate } from './parseDate';

/**
 * Gets fiscal quarter
 * @param date - The date
 * @param fiscalYearStart - Fiscal year start month (1-12, default: 1 for January)
 * @returns Fiscal quarter (1-4)
 */
export function getFiscalQuarter(date: Date | string | number, fiscalYearStart = 1): number {
  if (!Number.isInteger(fiscalYearStart))
    throw new ChronoUtilzError('Fiscal start must be an integer');

  const safeDate = parseDate(date, { throwError: true });

  if (fiscalYearStart < 1 || fiscalYearStart > 12) {
    throw new ChronoUtilzError('fiscalYearStart must be between 1 and 12');
  }

  const month = safeDate.getMonth() + 1; // Convert to 1-12
  const adjustedMonth = ((month - fiscalYearStart + 12) % 12) + 1;

  return Math.ceil(adjustedMonth / 3);
}
