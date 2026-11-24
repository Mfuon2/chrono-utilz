import { ChronoUtilzError } from './ChronoUtilzError';
import { parseDate } from './parseDate';

/**
 * Formats date with localization support
 * @param date - Date to format
 * @param locale - Locale identifier
 * @param options - Intl.DateTimeFormat options
 * @returns Localized date string
 */
export function formatLocalized(
  date: Date | string | number,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {},
): string {
  const safeDate = parseDate(date, { throwError: true });

  try {
    return safeDate.toLocaleDateString(locale, options);
  } catch (error) {
    throw new ChronoUtilzError(`Failed to format date with locale ${locale}: ${error}`);
  }
}
