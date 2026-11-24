import { ChronoUtilzError } from './ChronoUtilzError';
import { DurationDisplayOptions } from './DurationDisplayOptions';

/** Elapsed approximation: 365-day years and 30-day months. Honors unit filtering and precision. Negative values append ago; month abbreviation is mo. */
export function humanizeDuration(
  milliseconds: number,
  options: DurationDisplayOptions = {},
): string {
  if (
    !Number.isFinite(milliseconds) ||
    !Number.isInteger(options.precision ?? 2) ||
    (options.precision ?? 2) < 1
  )
    throw new ChronoUtilzError('Invalid duration options');

  if (milliseconds < 0) {
    return `${humanizeDuration(Math.abs(milliseconds), options)} ago`;
  }

  const { precision = 2, format = 'long', separator = ', ', includeZeroValues = false } = options;

  const units = [
    { name: 'year', value: 1000 * 60 * 60 * 24 * 365 },
    { name: 'month', value: 1000 * 60 * 60 * 24 * 30 },
    { name: 'week', value: 1000 * 60 * 60 * 24 * 7 },
    { name: 'day', value: 1000 * 60 * 60 * 24 },
    { name: 'hour', value: 1000 * 60 * 60 },
    { name: 'minute', value: 1000 * 60 },
    { name: 'second', value: 1000 },
  ];

  if (
    !['long', 'short', 'narrow'].includes(format) ||
    (options.units &&
      (!options.units.length || !options.units.every((u) => units.some((v) => v.name === u))))
  )
    throw new ChronoUtilzError('Invalid duration units or format');
  const parts: string[] = [];
  let remaining = milliseconds;
  let count = 0;

  for (const unit of units) {
    if (options.units && !options.units.includes(unit.name as any)) continue;
    if (count >= precision) break;

    const value = Math.floor(remaining / unit.value);
    if (value > 0 || includeZeroValues) {
      const labelMap = {
        long: { singular: unit.name, plural: `${unit.name}s` },
        short: {
          singular: unit.name === 'month' ? 'mo' : unit.name.charAt(0),
          plural: unit.name === 'month' ? 'mo' : unit.name.charAt(0),
        },
        narrow: {
          singular: unit.name === 'month' ? 'mo' : unit.name.charAt(0),
          plural: unit.name === 'month' ? 'mo' : unit.name.charAt(0),
        },
      };

      const label = value === 1 ? labelMap[format].singular : labelMap[format].plural;

      parts.push(`${value} ${label}`);
      count++;
    }

    remaining %= unit.value;
  }

  return parts.length > 0 ? parts.join(separator) : '0 seconds';
}
