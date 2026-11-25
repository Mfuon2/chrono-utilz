import { timezoneCatalog } from './timezones';

/** Returns a copy of the bundled catalog, not a promise of every identifier supported by the runtime. */
export function listTimezones(): string[] {
  return timezoneCatalog().map((tz) => tz.id);
}
