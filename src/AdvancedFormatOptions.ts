import { IANATimezone } from './IANATimezone';

/**
 * Advanced formatting options
 */
export interface AdvancedFormatOptions {
  locale?: string;
  timezone?: IANATimezone;
  includeTime?: boolean;
  includeSeconds?: boolean;
  use24Hour?: boolean;
  includeDayOfWeek?: boolean;
  includeTimezone?: boolean;
}
