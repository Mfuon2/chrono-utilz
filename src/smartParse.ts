import { parseDate } from './parseDate';
import { parseNaturalLanguage } from './parseNaturalLanguage';

/**
 * Smart parsing with multiple fallback strategies
 * @param dateString - Date string to parse
 * @returns Parsed date or null
 */
export function smartParse(dateString: string): Date | null {
  if (typeof dateString !== 'string' || !dateString.trim()) return null;
  return parseNaturalLanguage(dateString.trim()) || parseDate(dateString.trim());
}
