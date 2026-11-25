import { assertTimezone, fromWallDate } from './zone';
import { DateParseOptions } from './DateParseOptions';
import { parseWith, ZoneResolver } from './parseCore';

const resolveZone: ZoneResolver = (timezone, wall) =>
  wall ? fromWallDate(wall, timezone) : assertTimezone(timezone);

/** Strict supported ISO, slash and English month-name formats. Offset-bearing inputs preserve the instant. Offset-free inputs use the host timezone unless options.timezone is supplied. Ambiguous slash dates are month-first. Invalid input returns null, a cloned fallback, or throws when requested. No native-parser fallback. */
export function parseDate(
  input: string | number | Date,
  options: DateParseOptions & { throwError: true },
): Date;
export function parseDate(input: string | number | Date, options?: DateParseOptions): Date | null;
export function parseDate(
  input: string | number | Date,
  options: DateParseOptions = {},
): Date | null {
  return parseWith(input, options, resolveZone);
}
