import { localWallDate } from './zone';
import { formatDate } from './formatDate';
import { readDate } from './readDate';

/**
 * Formats date as calendar format (Today, Tomorrow, etc.)
 * @param date - Date to format
 * @param baseDate - Base date for comparison
 * @returns Calendar format string
 */
export function formatCalendar(date: Date | string | number, baseDate?: Date): string {
  const d = readDate(date),
    b = readDate(baseDate || new Date());
  const wallA = localWallDate(d),
    wallB = localWallDate(b);
  wallA.setUTCHours(0, 0, 0, 0);
  wallB.setUTCHours(0, 0, 0, 0);
  const days = Math.round((+wallA - +wallB) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 1 && days <= 7) return d.toLocaleDateString('en', { weekday: 'long' });
  if (days < -1 && days >= -7) return 'Last ' + d.toLocaleDateString('en', { weekday: 'long' });
  return formatDate(d, 'MMM DD, YYYY');
}
