import { ChronoUtilzError } from './ChronoUtilzError';
import { compareDetailed } from './compareDetailed';
import { readDate } from './readDate';

/**
 * Age calculator that handles leap years and different formats
 *
 * @example
 * ```
 * // Calculate age in years
 * const age = ChronoUtilz.calculateAge('1990-05-15');  // 35 (in 2025)
 *
 * // Calculate age in multiple units
 * const detailedAge = ChronoUtilz.calculateAge('1990-05-15', {
 *   units: ['year', 'month', 'day']
 * });  // { years: 35, months: 0, days: 23 } (if today is May 7, 2025)
 * ```
 *
 * @param birthDate - The birth date
 * @param options - Calculation options
 * @returns Age in years or detailed object with multiple units
 */
export function calculateAge(
  birthDate: Date | string,
  options: { referenceDate?: Date | string; units?: ('year' | 'month' | 'day')[] } = {},
): number | { years: number; months: number; days: number } {
  const birth = readDate(birthDate),
    reference = readDate(options.referenceDate || new Date());
  if (birth > reference) throw new ChronoUtilzError('Birth date cannot be in the future');
  const { years, months, days } = compareDetailed(birth, reference).difference;
  return !options.units?.length || (options.units.length === 1 && options.units[0] === 'year')
    ? years
    : { years, months, days };
}
