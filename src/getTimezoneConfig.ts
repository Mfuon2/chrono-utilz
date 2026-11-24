import { getUserTimezone } from './getUserTimezone';
import { getEffectiveTimezone } from './getEffectiveTimezone';
import { globalTimezoneConfig } from './globalTimezoneConfig';

/**
 * Get current timezone configuration
 * @returns Current configuration
 */
export function getTimezoneConfig(): {
  defaultTimezone: string;
  autoDetect: boolean;
  currentEffectiveTimezone: string;
} {
  return {
    defaultTimezone: globalTimezoneConfig.defaultTimezone || getUserTimezone(),
    autoDetect: globalTimezoneConfig.autoDetect,
    currentEffectiveTimezone: getEffectiveTimezone(),
  };
}
