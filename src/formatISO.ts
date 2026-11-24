import { parseDate } from './parseDate';

/** UTC ISO output. includeTimezone:false removes the Z marker; remaining fields still represent UTC. */
export function formatISO(
  date: Date | string | number,
  options: { includeTime?: boolean; includeTimezone?: boolean; includeMilliseconds?: boolean } = {},
): string {
  const safeDate = parseDate(date, { throwError: true });

  const { includeTime = true, includeTimezone = true, includeMilliseconds = false } = options;

  let iso = safeDate.toISOString();

  if (!includeTime) {
    iso = iso.split('T')[0];
  } else {
    if (!includeMilliseconds) {
      iso = iso.replace(/\.\d{3}Z$/, 'Z');
    }
    if (!includeTimezone) {
      iso = iso.replace(/Z$/, '');
    }
  }

  return iso;
}
