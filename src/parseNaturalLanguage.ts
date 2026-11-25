import { ChronoUtilzError } from './ChronoUtilzError';
import { NaturalTimeExpression } from './NaturalTimeExpression';
import { NaturalLanguageOptions } from './NaturalLanguageOptions';
import { TimeUnit } from './TimeUnit';
import { readDate } from './readDate';
import { addTime } from './addTime';
import { zonedWallDate, localWallDate, fromWallDate, assertTimezone } from './zone';
/** Supported English expressions only; options.baseDate and timezone determine relative calculations. Next/last weekday preserves clock time; today/tomorrow/yesterday resolve local midnight. Strict mode throws on unsupported expressions. */
export function parseNaturalLanguage(
  expression: NaturalTimeExpression,
  options: NaturalLanguageOptions = {},
): Date | null {
  try {
    if (typeof expression !== 'string') throw new ChronoUtilzError('Expression must be a string');
    const base = readDate(options.baseDate || new Date());
    const zone = options.timezone;
    if (zone) assertTimezone(zone);
    const expr = expression.toLowerCase().trim();
    if (expr === 'now') return base;
    const resolve = (wall: Date) => {
      if (zone) return fromWallDate(wall, zone);
      const out = new Date(base);
      out.setFullYear(wall.getUTCFullYear(), wall.getUTCMonth(), wall.getUTCDate());
      out.setHours(
        wall.getUTCHours(),
        wall.getUTCMinutes(),
        wall.getUTCSeconds(),
        wall.getUTCMilliseconds(),
      );
      return out;
    };
    const boundary = (unit: string, end = false) => {
      const wall = zone ? zonedWallDate(base, zone) : localWallDate(base);
      wall.setUTCHours(0, 0, 0, 0);
      if (unit === 'week') wall.setUTCDate(wall.getUTCDate() - wall.getUTCDay());
      if (unit === 'month') wall.setUTCDate(1);
      if (unit === 'year') wall.setUTCMonth(0, 1);
      if (end) {
        if (unit === 'day') wall.setUTCDate(wall.getUTCDate() + 1);
        if (unit === 'week') wall.setUTCDate(wall.getUTCDate() + 7);
        if (unit === 'month') wall.setUTCMonth(wall.getUTCMonth() + 1);
        if (unit === 'year') wall.setUTCFullYear(wall.getUTCFullYear() + 1);
        return new Date(resolve(wall).getTime() - 1);
      }
      return resolve(wall);
    };
    if (['today', 'tomorrow', 'yesterday'].includes(expr))
      return addTime(
        boundary('day'),
        expr === 'today' ? 0 : expr === 'tomorrow' ? 1 : -1,
        'day',
        zone,
      );
    const period = expr.match(/^(next|last|beginning of|end of) (week|month|year)$/);
    if (period)
      return period[1] === 'beginning of' || period[1] === 'end of'
        ? boundary(period[2], period[1] === 'end of')
        : addTime(boundary(period[2]), period[1] === 'next' ? 1 : -1, period[2] as TimeUnit, zone);
    const weekday = expr.match(
      /^(next|last) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/,
    );
    if (weekday) {
      const target = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ].indexOf(weekday[2]);
      const current = (zone ? zonedWallDate(base, zone) : localWallDate(base)).getUTCDay();
      const delta =
        weekday[1] === 'next'
          ? (target - current + 7) % 7 || 7
          : -((current - target + 7) % 7 || 7);
      return addTime(base, delta, 'day', zone);
    }
    const relative = expr.match(
      /^(?:in (\d+) (day|week|month|year)s?|(\d+) (day|week|month|year)s? ago)$/,
    );
    if (relative)
      return addTime(
        base,
        relative[1] ? +relative[1] : -Number(relative[3]),
        (relative[2] || relative[4]) as TimeUnit,
        zone,
      );
    throw new ChronoUtilzError('Unsupported natural language expression');
  } catch (error) {
    if (options.strictParsing) throw error;
    return null;
  }
}
