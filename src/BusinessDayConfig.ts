/**
 * Global configuration for working days and holidays
 */
export interface BusinessDayConfig {
  /** Working days (0=Sunday, 1=Monday, ..., 6=Saturday) */
  workingDays: number[];
  /** Array of holiday dates (ISO strings or Date objects) */
  holidays: Set<string>;
}
