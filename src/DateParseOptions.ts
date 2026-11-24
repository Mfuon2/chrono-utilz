import { IANATimezone } from './IANATimezone';

/**
 * ChronoUtilz options for parsing dates
 */
export interface DateParseOptions {
  /**
   * Whether to throw an error if the date is invalid
   */
  throwError?: boolean;
  /**
   * The fallback date to use if parsing fails
   */
  fallback?: Date | null;
  /**
   * Timezone to use for parsing (defaults to user's timezone)
   */
  timezone?: IANATimezone;
}
