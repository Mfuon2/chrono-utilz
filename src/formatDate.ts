import { zonedWallDate } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { DateFormat } from './DateFormat';
import { IANATimezone } from './IANATimezone';
import { getEffectiveTimezone } from './getEffectiveTimezone';
import { parseDate } from './parseDate';

/** The eight DateFormat patterns only. Displays an instant in the explicit or globally effective timezone. Strings are parsed first; configureTimezone does not change parsing of offset-free strings. */
export function formatDate(
  date: Date | string | number,
  format: DateFormat = 'YYYY-MM-DD',
  timezone?: IANATimezone,
): string {
  const targetTimezone = getEffectiveTimezone(timezone);
  const safeDate = zonedWallDate(parseDate(date, { throwError: true })!, targetTimezone);
  if (!safeDate) {
    throw new ChronoUtilzError('Invalid date provided to formatDate');
  }

  const year = String(safeDate.getUTCFullYear()).padStart(4, '0');
  const month = safeDate.getUTCMonth() + 1;
  const day = safeDate.getUTCDate();
  const hours24 = safeDate.getUTCHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = safeDate.getUTCMinutes();
  const seconds = safeDate.getUTCSeconds();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  const pad = (num: number): string => num.toString().padStart(2, '0');

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${pad(month)}-${pad(day)}`;
    case 'MM/DD/YYYY':
      return `${pad(month)}/${pad(day)}/${year}`;
    case 'DD/MM/YYYY':
      return `${pad(day)}/${pad(month)}/${year}`;
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${pad(month)}-${pad(day)} ${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
    case 'DD MMM YYYY':
      return `${pad(day)} ${monthNames[safeDate.getUTCMonth()]} ${year}`;
    case 'MMM DD, YYYY':
      return `${monthNames[safeDate.getUTCMonth()]} ${pad(day)}, ${year}`;
    case 'HH:mm:ss':
      return `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
    case 'hh:mm A':
      return `${pad(hours12)}:${pad(minutes)} ${ampm}`;
    default:
      throw new ChronoUtilzError(`Unsupported date format: ${format}`);
  }
}
