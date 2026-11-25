import { ChronoUtilzError } from './ChronoUtilzError';
import { DurationDisplayOptions } from './DurationDisplayOptions';
import { compareDetailed } from './compareDetailed';
import { readDate } from './readDate';

/** Absolute calendar decomposition. Supported display units: year, month, day, hour, minute, second. Default precision 2. Omitted larger components are not converted into smaller units. */
export function calculateAdvancedDuration(
  startDate: Date | string | number,
  endDate: Date | string | number,
  options: DurationDisplayOptions = {},
): string {
  if (!Number.isInteger(options.precision ?? 2) || (options.precision ?? 2) < 1)
    throw new ChronoUtilzError('Invalid duration precision');

  const safeStartDate = readDate(startDate);
  const safeEndDate = readDate(endDate);

  const comparison = compareDetailed(safeStartDate, safeEndDate);
  const { difference } = comparison;

  const {
    precision = 2,
    units = ['year', 'month', 'day', 'hour', 'minute'],
    format = 'long',
    separator = ', ',
    includeZeroValues = false,
  } = options;

  if (!['long', 'short', 'narrow'].includes(format))
    throw new ChronoUtilzError('Invalid duration format');
  const parts: string[] = [];
  let count = 0;

  const unitLabels = {
    long: {
      year: ['year', 'years'],
      month: ['month', 'months'],
      day: ['day', 'days'],
      hour: ['hour', 'hours'],
      minute: ['minute', 'minutes'],
      second: ['second', 'seconds'],
    },
    short: {
      year: ['yr', 'yrs'],
      month: ['mo', 'mos'],
      day: ['d', 'd'],
      hour: ['h', 'h'],
      minute: ['m', 'm'],
      second: ['s', 's'],
    },
    narrow: {
      year: ['y', 'y'],
      month: ['M', 'M'],
      day: ['d', 'd'],
      hour: ['h', 'h'],
      minute: ['m', 'm'],
      second: ['s', 's'],
    },
  };

  for (const unit of units) {
    if (count >= precision) break;

    if (!['year', 'month', 'day', 'hour', 'minute', 'second'].includes(unit))
      throw new ChronoUtilzError(
        'Supported duration units: year, month, day, hour, minute, second',
      );
    const value = difference[(unit + 's') as keyof typeof difference] as number;
    if (value > 0 || includeZeroValues) {
      const labels = unitLabels[format][unit as keyof (typeof unitLabels)[typeof format]];
      const label = value === 1 ? labels[0] : labels[1];
      parts.push(`${value} ${label}`);
      count++;
    }
  }

  return parts.length > 0 ? parts.join(separator) : '0';
}
