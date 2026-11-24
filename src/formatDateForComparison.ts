/**
 * Converts a date to YYYY-MM-DD format for holiday comparison
 * @param date - The date to format
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateForComparison(date: Date): string {
  return [
    String(date.getFullYear()).padStart(4, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}
