import { assertTimezone } from './zone';
import { wallFromComponents } from './zone';
import { fromWallDate } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { DateParseOptions } from './DateParseOptions';
import { createDate } from './createDate';

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
  try {
    if (options.timezone) assertTimezone(options.timezone);
    const isDate = Object.prototype.toString.call(input) === '[object Date]';
    if (isDate || typeof input === 'number') {
      const result = new Date(isDate ? Date.prototype.getTime.call(input) : (input as number));
      if (!Number.isFinite(result.getTime())) throw new ChronoUtilzError('Invalid date');
      return result;
    }
    if (typeof input !== 'string' || !input.trim())
      throw new ChronoUtilzError('Invalid date input');
    const text = input.trim();
    const iso = text.match(
      /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:?\d{2})?)?$/,
    );
    if (iso) {
      const [, y, m, d, h = '0', mi = '0', s = '0', ms = '0', offset] = iso;
      const wall = wallFromComponents(+y, +m - 1, +d, +h, +mi, +s, +ms.padEnd(3, '0'));
      if (offset) {
        const compact = offset.replace(':', '');
        const hours = offset === 'Z' ? 0 : +compact.slice(1, 3);
        const minutes = offset === 'Z' ? 0 : +compact.slice(3, 5);
        if (hours > 23 || minutes > 59) throw new ChronoUtilzError('Invalid ISO offset');
        const utc = new Date(0);
        utc.setUTCFullYear(+y, +m - 1, +d);
        utc.setUTCHours(+h, +mi, +s, +ms.padEnd(3, '0'));
        return new Date(
          utc.getTime() - (offset.startsWith('-') ? -1 : 1) * (hours * 60 + minutes) * 60000,
        );
      }
      return options.timezone
        ? fromWallDate(wall, options.timezone)
        : createDate(+y, +m - 1, +d, +h, +mi, +s, +ms.padEnd(3, '0'));
    }
    // Slash dates are month-first, with day-first fallback only when unambiguous.
    const slash = text.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/,
    );
    if (slash) {
      const [, a, b, y, h = '0', m = '0', s = '0'] = slash;
      const components: [number, number, number, number, number, number] = [
        +y,
        +(+a > 12 ? b : a) - 1,
        +(+a > 12 ? a : b),
        +h,
        +m,
        +s,
      ];
      const wall = wallFromComponents(...components);
      return options.timezone ? fromWallDate(wall, options.timezone) : createDate(...components);
    }
    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    const named = text.match(
      /^(?:(\d{1,2})\s+([a-z]+)|([a-z]+)\s+(\d{1,2}),?)\s+(\d{4})(?:,?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/i,
    );
    if (named) {
      const [, d1, m1, m2, d2, y, h = '0', m = '0', s = '0'] = named;
      const month = months.indexOf((m1 || m2).toLowerCase().slice(0, 3));
      if (month < 0) throw new ChronoUtilzError('Invalid month');
      const components: [number, number, number, number, number, number] = [
        +y,
        month,
        +(d1 || d2),
        +h,
        +m,
        +s,
      ];
      const wall = wallFromComponents(...components);
      return options.timezone ? fromWallDate(wall, options.timezone) : createDate(...components);
    }
    throw new ChronoUtilzError('Unsupported date format');
  } catch (error) {
    if (options.throwError)
      throw error instanceof ChronoUtilzError ? error : new ChronoUtilzError(String(error));
    return options.fallback ? new Date(options.fallback.getTime()) : null;
  }
}
