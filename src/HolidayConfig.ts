/**
 * Holiday configuration
 */
export interface HolidayConfig {
  country?: string;
  region?: string;
  includeObserved?: boolean;
  customHolidays?: Date[];
}
