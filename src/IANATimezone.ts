import { TIMEZONE_IDS } from './timezones';

/**
 * IANA Timezone identifiers - Complete standardized list
 */
export type IANATimezone = (typeof TIMEZONE_IDS)[number] | string;
