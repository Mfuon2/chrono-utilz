/** Validate calendar components and return them as a UTC-field wall date. */
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
