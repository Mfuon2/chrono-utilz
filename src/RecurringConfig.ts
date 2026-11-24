import { RecurringPattern } from './RecurringPattern';

/**
 * Recurring date configuration
 */
export interface RecurringConfig {
  pattern: RecurringPattern;
  interval?: number; // e.g., every 2 weeks
  daysOfWeek?: number[]; // 0-6, Sunday is 0
  daysOfMonth?: number[]; // 1-31
  monthsOfYear?: number[]; // 1-12
  endDate?: Date;
  maxOccurrences?: number;
}
