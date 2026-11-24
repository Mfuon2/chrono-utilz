import { ChronoUtilzError } from './ChronoUtilzError';

/** Elapsed approximation: 365-day years and 30-day months. Negative values retain a minus sign. maxUnits must be a positive integer. */
export function formatDuration(
  milliseconds: number,
  options: { longFormat?: boolean; maxUnits?: number } = {},
): string {
  if (
    !Number.isFinite(milliseconds) ||
    !Number.isInteger(options.maxUnits ?? 3) ||
    (options.maxUnits ?? 3) < 1
  )
    throw new ChronoUtilzError('Invalid duration options');

  const { longFormat = true, maxUnits = 3 } = options;

  if (milliseconds === 0) {
    return longFormat ? '0 milliseconds' : '0ms';
  }

  const units: [string, string, number][] = [
    ['year', 'y', 31536000000],
    ['month', 'mo', 2592000000],
    ['day', 'd', 86400000],
    ['hour', 'h', 3600000],
    ['minute', 'm', 60000],
    ['second', 's', 1000],
    ['millisecond', 'ms', 1],
  ];

  const parts: string[] = [];
  let remaining = Math.abs(milliseconds);

  for (const [longName, shortName, value] of units) {
    if (parts.length >= maxUnits) break;

    const count = Math.floor(remaining / value);
    remaining %= value;

    if (count === 0) continue;

    if (longFormat) {
      parts.push(`${count} ${longName}${count !== 1 ? 's' : ''}`);
    } else {
      parts.push(`${count}${shortName}`);
    }
  }

  return (milliseconds < 0 ? '-' : '') + parts.join(longFormat ? ', ' : ' ');
}
