import { assertTimezone } from './zone';
import { zoneOffset } from './zone';
import { getTimezoneInfo as getTimezoneInfoFromDB } from './timezones';
import { IANATimezone } from './IANATimezone';
import { readDate } from './readDate';

/** offset is hours east of UTC. isDST is a seasonal offset heuristic, not authoritative historical daylight-saving metadata; Intl does not expose a DST flag. Use offset for calculations. */
export function getTimezoneInfo(
  timezone: IANATimezone,
  date: Date = new Date(),
): {
  name: string;
  abbreviation: string;
  offset: number;
  isDST: boolean;
  offsetString: string;
  description?: string;
} {
  const parsed = readDate(date);
  assertTimezone(timezone);
  const offset = zoneOffset(parsed, timezone);
  const offsets = [0, 3, 6, 9].map((month) =>
    zoneOffset(new Date(Date.UTC(parsed.getUTCFullYear(), month, 1)), timezone),
  );
  const abbreviation =
    new Intl.DateTimeFormat('en', { timeZone: timezone, timeZoneName: 'short' })
      .formatToParts(parsed)
      .find((p) => p.type === 'timeZoneName')?.value || '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    name: timezone,
    abbreviation,
    offset: offset / 60,
    isDST: offset > Math.min(...offsets),
    offsetString:
      (offset < 0 ? '-' : '+') +
      pad(Math.floor(Math.abs(offset) / 60)) +
      ':' +
      pad(Math.abs(offset) % 60),
    description: getTimezoneInfoFromDB(timezone)?.description,
  };
}
