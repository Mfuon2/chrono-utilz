/**
 * Configuration information interface for ChronoUtilz
 */
export interface ChronoUtilzConfig {
  dateFormats: string[];
  timeUnits: string[];
  timezones: string[];
  naturalLanguageExpressions: string[];
  recurringPatterns: string[];
  businessDayConfig: {
    defaultWorkingDays: number[];
    currentWorkingDays: number[];
    defaultHolidays: string[];
    currentHolidays: string[];
    workingDayNames: Record<number, string>;
  };
  holidayConfig: {
    supportedCountries: string[];
    availableHolidayRules: Record<string, Array<{ name: string; date: string; type: string }>>;
  };
  locales: {
    standard: readonly string[];
    popular: readonly string[];
    regions: Record<string, string[]>;
  };
  workingTimeDefaults: {
    startHour: number;
    endHour: number;
    workingDays: number[];
    timezone: string;
  };
  payrollFrequencies: string[];
  seasonalConfig: {
    hemispheres: string[];
    seasons: string[];
    timeOfDay: string[];
  };
  formatTokens: Record<string, string>;
  fiscalYearDefaults: {
    startMonth: number;
    startDay: number;
  };
  overtime: {
    defaultRegularHours: number;
    defaultOvertimeMultiplier: number;
    defaultDoubleTimeThreshold: number;
  };
}
