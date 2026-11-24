import { IANATimezone } from './IANATimezone';

/**
 * Natural language parsing options
 */
export interface NaturalLanguageOptions {
  baseDate?: Date;
  timezone?: IANATimezone;
  strictParsing?: boolean;
}
