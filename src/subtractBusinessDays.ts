import { addBusinessDays } from './addBusinessDays';

/**
 * Subtracts the specified number of business days from a date
 * @param date - The starting date
 * @param businessDays - Number of business days to subtract
 * @returns A new date with business days subtracted
 *
 * @example
 * ```typescript
 * // Subtract 3 business days from Wednesday, Jan 10, 2024
 * subtractBusinessDays(new Date('2024-01-10'), 3)
 * // Returns: Friday, Jan 5, 2024 (skips weekend)
 * ```
 */
export function subtractBusinessDays(date: Date | string | number, businessDays: number): Date {
  return addBusinessDays(date, -businessDays);
}
