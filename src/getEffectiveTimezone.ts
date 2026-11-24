import { getUserTimezone } from './getUserTimezone';
import { IANATimezone } from './IANATimezone';
import { globalTimezoneConfig } from './globalTimezoneConfig';

/**
 * Get the effective timezone to use (either auto-detected or manually set default)
 */
export function getEffectiveTimezone(providedTimezone?: IANATimezone): string {
  if (providedTimezone) return providedTimezone;
  return globalTimezoneConfig.autoDetect
    ? getUserTimezone()
    : globalTimezoneConfig.defaultTimezone || getUserTimezone();
}
