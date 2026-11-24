import { IANATimezone } from './IANATimezone';
import { RecurringConfig } from './RecurringConfig';

/**
 * Calendar event interface
 */
export interface CalendarEvent {
  id?: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  isAllDay?: boolean;
  recurring?: RecurringConfig;
  timezone?: IANATimezone;
}
