import { DateFormat } from './DateFormat';
import { createDate } from './createDate';
import { readDate } from './readDate';

/**
 * Validates if a date string matches a specific format
 * @param dateStr - The date string to validate
 * @param format - The expected format
 * @returns True if the date string matches the format and is valid
 */
export function validateDateFormat(dateStr: string, format: DateFormat): boolean {
  if (typeof dateStr !== 'string') return false;
  if (format === 'HH:mm:ss') return /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(dateStr);
  if (format === 'hh:mm A') return /^(0?[1-9]|1[0-2]):[0-5]\d [AP]M$/.test(dateStr);
  const patterns: Record<string, RegExp> = {
    'YYYY-MM-DD': /^\d{4}-\d{2}-\d{2}$/,
    'YYYY-MM-DD HH:mm:ss': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    'MM/DD/YYYY': /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    'DD/MM/YYYY': /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    'DD MMM YYYY': /^\d{1,2} [A-Za-z]{3} \d{4}$/,
    'MMM DD, YYYY': /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
  };
  if (!patterns[format]?.test(dateStr)) return false;
  try {
    if (format === 'MM/DD/YYYY' || format === 'DD/MM/YYYY') {
      const [a, b, y] = dateStr.split('/').map(Number);
      createDate(y, (format === 'MM/DD/YYYY' ? a : b) - 1, format === 'MM/DD/YYYY' ? b : a);
      return true;
    }
    return readDate(dateStr, {}) !== null;
  } catch {
    return false;
  }
}
