import { TIMEZONE_IDS } from './timezones';

/** Returns a copy of the bundled catalog, not a promise of every identifier supported by the runtime. */
export function listTimezones(): string[] {
  // Return our comprehensive standardized timezone list
  return [...TIMEZONE_IDS];
}
