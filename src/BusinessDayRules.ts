/**
 * Custom business day rules interface
 */
export interface BusinessDayRules {
  workingDays: number[];
  holidays: (Date | string)[];
  workingHours?: { start: string; end: string };
}
