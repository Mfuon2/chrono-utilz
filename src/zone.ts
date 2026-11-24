/** Internal timezone primitives. Wall dates in this module use UTC fields. */
export function assertTimezone(timezone: string): void {
  if (typeof timezone !== 'string' || !timezone.trim())
    throw new RangeError('Timezone must be a nonempty IANA identifier');
  new Intl.DateTimeFormat('en', { timeZone: timezone }).format(0);
}

export function zonedWallDate(date: Date, timezone: string): Date {
  const parts = new Intl.DateTimeFormat('en-US-u-ca-gregory-nu-latn', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const values: Record<string, number> = {};
  for (const part of parts) if (part.type !== 'literal') values[part.type] = Number(part.value);
  const wall = new Date(0);
  wall.setUTCFullYear(values.year, values.month - 1, values.day);
  wall.setUTCHours(values.hour, values.minute, values.second, date.getMilliseconds());
  return wall;
}

export function zoneOffset(date: Date, timezone: string): number {
  return (zonedWallDate(date, timezone).getTime() - date.getTime()) / 60000;
}

export function checkedDate(timestamp: number): Date {
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) throw new RangeError('Date overflow');
  return date;
}

/** Resolve wall time strictly: ambiguous or nonexistent times throw. */
export function fromWallDate(wall: Date, timezone: string): Date {
  assertTimezone(timezone);
  const stamp = wall.getTime();
  const offsets = new Set(
    [-172800000, -86400000, 0, 86400000, 172800000].map((delta) =>
      zoneOffset(new Date(stamp + delta), timezone),
    ),
  );
  const matches = [...offsets]
    .map((offset) => new Date(stamp - offset * 60000))
    .filter((date) => zonedWallDate(date, timezone).getTime() === stamp);
  if (matches.length !== 1)
    throw new RangeError(
      matches.length
        ? 'Ambiguous local time; supply an explicit UTC offset'
        : 'Nonexistent local time',
    );
  return matches[0];
}

export function fromZonedTime(date: Date, timezone: string): Date {
  const wall = new Date(0);
  wall.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  wall.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return fromWallDate(wall, timezone);
}

export function localWallDate(date: Date): Date {
  const wall = new Date(0);
  wall.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  wall.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return wall;
}

export function wallFromComponents(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
): Date {
  if (
    ![year, month, day, hours, minutes, seconds, milliseconds].every(Number.isInteger) ||
    year < 0 ||
    year > 9999 ||
    month < 0 ||
    month > 11 ||
    day < 1 ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59 ||
    milliseconds < 0 ||
    milliseconds > 999
  )
    throw new RangeError('Invalid date components');
  const wall = new Date(0);
  wall.setUTCFullYear(year, month, day);
  wall.setUTCHours(hours, minutes, seconds, milliseconds);
  if (wall.getUTCMonth() !== month || wall.getUTCDate() !== day)
    throw new RangeError('Invalid calendar date');
  return wall;
}

/** Construct a local calendar boundary without the 0-99 -> 1900-1999 constructor mapping. */
export function localCalendarDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}
