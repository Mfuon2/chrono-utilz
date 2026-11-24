import { ChronoUtilzError } from './ChronoUtilzError';
import { MonthNameFormat } from './MonthNameFormat';

/**
 * Gets month name
 * @param monthNumber - Month number (1-12)
 * @param locale - Locale string (default: 'en-US')
 * @param format - Format type (default: 'long')
 * @returns Month name
 */
export function getMonthName(
  monthNumber: number,
  locale = 'en-US',
  format: MonthNameFormat = 'long',
): string {
  if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    throw new ChronoUtilzError('monthNumber must be between 1 and 12');
  }

  const date = new Date(2000, monthNumber - 1, 1);

  return date.toLocaleDateString(locale, { month: format });
}
