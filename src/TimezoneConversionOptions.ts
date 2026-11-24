import { IANATimezone } from './IANATimezone';

/**
 * Timezone conversion options
 */
export interface TimezoneConversionOptions {
  from?: IANATimezone;
  to: IANATimezone;
  preserveTime?: boolean;
}
