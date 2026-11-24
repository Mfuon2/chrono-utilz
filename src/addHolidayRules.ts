import { ChronoUtilzError } from './ChronoUtilzError';
import { HolidayRule } from './HolidayRule';
import { holidayRules } from './holidayRules';

/** Replaces a country preset with copied rules. Fixed dates use MM-DD; floating rules are functions returning a valid date in the requested year. */
export function addHolidayRules(country: string, rules: HolidayRule[]): void {
  if (!Array.isArray(rules)) {
    throw new ChronoUtilzError('Rules must be an array');
  }

  if (!country.trim()) throw new ChronoUtilzError('Country code must not be empty');
  holidayRules[country.toUpperCase()] = rules.map((rule) => ({ ...rule }));
}
