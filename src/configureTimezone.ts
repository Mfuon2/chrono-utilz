import { assertTimezone } from './zone';
import { IANATimezone } from './IANATimezone';
import { globalTimezoneConfig } from './globalTimezoneConfig';

/**
 * Configure global timezone behavior for ChronoUtilz
 * @param config - Timezone configuration
 */
export function configureTimezone(config: {
  defaultTimezone?: IANATimezone;
  autoDetect?: boolean;
}): void {
  if (config.defaultTimezone !== undefined) {
    assertTimezone(config.defaultTimezone);
    globalTimezoneConfig.defaultTimezone = config.defaultTimezone;
  }
  if (config.autoDetect !== undefined) {
    globalTimezoneConfig.autoDetect = config.autoDetect;
  }
}
