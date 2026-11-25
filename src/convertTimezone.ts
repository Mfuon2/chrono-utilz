import { assertTimezone } from './zone';
import { fromWallDate } from './zone';
import { zonedWallDate } from './zone';
import { TimezoneConversionOptions } from './TimezoneConversionOptions';
import { readDate } from './readDate';

/** Default: return a new Date with the same instant, validating the zones. preserveTime:true reinterprets source-zone wall fields in the target zone. Use formatDate/formatTimezone to display a zone. Gap/fold reinterpretations throw. */
export function convertTimezone(
  date: Date | string | number,
  options: TimezoneConversionOptions,
): Date {
  const parsed = readDate(date);
  assertTimezone(options.to);
  if (options.from !== undefined) assertTimezone(options.from);
  // A Date is an instant. Only preserveTime explicitly reinterprets wall-clock fields.
  return options.preserveTime
    ? fromWallDate(zonedWallDate(parsed, options.from || 'UTC'), options.to)
    : new Date(parsed);
}
