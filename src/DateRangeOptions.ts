import { TimeUnit } from './TimeUnit';

/**
 * Options for date range generation
 */
export interface DateRangeOptions {
  /** The start date of the range */
  start: Date | string;
  /** The end date of the range */
  end: Date | string;
  /** The increment unit (default: 'day') */
  unit?: TimeUnit;
  /** The increment value (default: 1) */
  step?: number;
  /** Whether to include the end date (default: true) */
  inclusive?: boolean;
}
