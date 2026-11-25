import { readDate } from './readDate';
import { ChronoUtilzError } from './ChronoUtilzError';
import { holidayRules } from './holidayRules';

/** Built-in recurring presets: US federal actual dates and UK England/Wales recurring actual dates. No substitute-day policy, historical rule changes, exceptional proclamations, or complete worldwide calendar. Add validated custom rules/dates for your jurisdiction and year. */
export function getHolidays(year: number, country = 'US'): Date[] {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new ChronoUtilzError('Year must be a 4-digit integer');
  }

  const countryRules = holidayRules[country.toUpperCase()];
  if (!countryRules) {
    throw new ChronoUtilzError(`No holiday rules found for country: ${country}`);
  }

  const holidays: Date[] = [];

  for (const rule of countryRules) {
    if (typeof rule.date === 'string') {
      // Fixed date format: MM-DD
      if (!/^\d{2}-\d{2}$/.test(rule.date))
        throw new ChronoUtilzError('Fixed holidays must use MM-DD');
      const parsed = readDate(String(year) + '-' + rule.date);
      holidays.push(parsed);
    } else if (typeof rule.date === 'function') {
      // Floating date calculation
      const calculated = rule.date(year);
      if (!Number.isFinite(calculated.getTime()) || calculated.getFullYear() !== year)
        throw new ChronoUtilzError('Invalid calculated holiday');
      holidays.push(new Date(calculated));
    }
  }

  return holidays.sort((a, b) => a.getTime() - b.getTime());
}
