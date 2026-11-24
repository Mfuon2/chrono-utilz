import { DateFormat } from './DateFormat';
import { createDate } from './createDate';
import { parseDate } from './parseDate';
import { validateDateFormat } from './validateDateFormat';

/**
 * Tries multiple date formats for parsing
 * @param dateString - Date string to parse
 * @param formats - Array of formats to try
 * @returns First successfully parsed date or null
 */
export function parseMultipleFormats(dateString: string, formats: string[]): Date | null {
  for (const format of formats) {
    if (!validateDateFormat(dateString, format as DateFormat)) continue;
    if (format === 'DD/MM/YYYY') {
      const [d, m, y] = dateString.split('/').map(Number);
      return createDate(y, m - 1, d);
    }
    return parseDate(dateString);
  }
  return null;
}
