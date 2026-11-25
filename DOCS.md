# ChronoUtilz API reference

Generated from the public TypeScript exports for version 3.0.1. Run `npm run docs` to regenerate.

136 callable exports. [Hosted documentation](https://chronoutilz.netlify.app/documentation) · [API reference](https://chronoutilz.netlify.app/api-docs) · [Playground](https://chronoutilz.netlify.app/playground)

Read [behavior and migration](docs/MIGRATION.md) before upgrading from version 2. Examples in [docs/examples.json](docs/examples.json) are executed in CI. All date-returning operations return fresh objects; inputs are not mutated. Calendar helpers use the host timezone unless an explicit timezone option is documented. Shared business configuration is module-scoped.

## addBusinessDays

Add signed calendar business days, excluding the starting date and preserving clock time.

```typescript
function addBusinessDays(
  date: Date | string | number,
  businessDays: number,
  timezone?: IANATimezone,
): Date
```

## addCustomHolidays

Adds custom holidays

```typescript
function addCustomHolidays(holidayArray: (Date | string | number)[]): void
```

## addHolidayRules

Replaces a country preset with copied rules. Fixed dates use MM-DD; floating rules are functions returning a valid date in the requested year.

```typescript
function addHolidayRules(country: string, rules: HolidayRule[]): void
```

## addTime

Hours and smaller units are elapsed time. Days and larger units are calendar arithmetic; month/year additions clamp to the last valid day. Explicit timezone calendar operations reject DST gaps/folds. Calendar amounts must be integers.

```typescript
function addTime(
  date: Date | string | number,
  amount: number,
  unit: TimeUnit,
  timezone?: IANATimezone,
): Date
```

## addWorkingHours

Consume nonnegative elapsed working hours, starting at or after the input. Supports partial days, overnight schedules and absent days (all days). Empty/zero-length schedules are rejected. Search is bounded to 100,000 iterations.

```typescript
function addWorkingHours(
  date: Date | string | number,
  hours: number,
  schedule?: WorkingSchedule,
): Date
```

## businessDaysInMonth

Counts the number of business days in a given month

```typescript
function businessDaysInMonth(year: number, month: number): number
```

## calculateAdvancedDuration

Absolute calendar decomposition. Supported display units: year, month, day, hour, minute, second. Default precision 2. Omitted larger components are not converted into smaller units.

```typescript
function calculateAdvancedDuration(
  startDate: Date | string | number,
  endDate: Date | string | number,
  options: DurationDisplayOptions = {},
): string
```

## calculateAge

Age calculator that handles leap years and different formats

```typescript
function calculateAge(
  birthDate: Date | string,
  options: { referenceDate?: Date | string; units?: ('year' | 'month' | 'day')[] } = {},
): number | { years: number; months: number; days: number }
```

## calculateBusinessDaysAdvanced

Inclusive calendar days in config.timezone (host timezone by default). Honors workingDays, excludeHolidays and holidayConfig.

```typescript
function calculateBusinessDaysAdvanced(
  startDate: Date | string | number,
  endDate: Date | string | number,
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): number
```

## calculateBusinessDaysCustom

Excludes the start date and includes the end date. Global/custom holidays are combined with the supplied holidays. Reversed ranges return 0. workingHours is rejected; use calculateWorkingHours.

```typescript
function calculateBusinessDaysCustom(
  start: Date | string | number,
  end: Date | string | number,
  rules: BusinessDayRules,
): number
```

## calculateOvertime

Returns pay factors assuming hourly rate 1. Explicit thresholds are arithmetic inputs, not jurisdiction-specific payroll rules.

```typescript
function calculateOvertime(
  hoursWorked: number,
  regularHours = 40,
  overtimeMultiplier = 1.5,
  doubleTimeThreshold?: number,
): {
  regularHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  totalRegularPay: number;
  totalOvertimePay: number;
  totalDoubleTimePay: number;
}
```

## calculateProjectMilestones

Calculates project milestones based on working days

```typescript
function calculateProjectMilestones(
  startDate: Date | string | number,
  tasks: number[],
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): Date[]
```

## calculateSLACompliance

Calculates service level agreement (SLA) compliance

```typescript
function calculateSLACompliance(
  incidentDate: Date | string | number,
  resolvedDate: Date | string | number,
  slaHours: number,
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): {
  actualHours: number;
  slaHours: number;
  isCompliant: boolean;
  breachHours: number;
  percentageOfSLA: number;
}
```

## calculateWorkingHours

Overlap with half-open [start,end) work intervals. Supports fractional hours, overnight intervals (endHour < startHour), explicit timezone and configured holiday exclusion. The shift belongs to its starting calendar day. DST-ambiguous boundaries throw.

```typescript
function calculateWorkingHours(
  startDate: Date | string | number,
  endDate: Date | string | number,
  config: WorkingTimeConfig,
): number
```

## CalendarDate

A calendar date without time information

```typescript
declare class CalendarDate {
  constructor(year: number, month: number, day: number);
  static fromDate(date: Date): CalendarDate;
  static fromString(input: string | number): CalendarDate;
  get year(): number;
  get month(): number;
  get day(): number;
  toDate(): Date;
  toString(): string;
  add(amount: number, unit: Extract<TimeUnit, 'day' | 'week' | 'month' | 'year'>): CalendarDate;
  equals(other: CalendarDate): boolean;
  compare(other: CalendarDate): number;
  isBefore(other: CalendarDate): boolean;
  isAfter(other: CalendarDate): boolean;
}
```

## ChronoUtilzError

ChronoUtilz error class

```typescript
declare class ChronoUtilzError {
  constructor(message: string);
}
```

## cloneDate

Creates a deep copy of a Date object

```typescript
function cloneDate(date: Date | string | number): Date
```

## compareDates

Compares two dates and returns -1, 0, or 1

```typescript
function compareDates(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: TimeUnit,
): -1 | 0 | 1
```

## compareDetailed

Absolute calendar decomposition: clamped years, then clamped months, calendar days, then elapsed sub-day remainder. Direction is reported separately.

```typescript
function compareDetailed(
  date1: Date | string | number,
  date2: Date | string | number,
): DateComparison
```

## configureHolidays

Adds holidays to the business day configuration

```typescript
function configureHolidays(holidays: (Date | string | number)[]): BusinessDayConfig
```

## configureTimezone

Configure global timezone behavior for ChronoUtilz

```typescript
function configureTimezone(config: {
  defaultTimezone?: IANATimezone;
  autoDetect?: boolean;
}): void
```

## configureWorkingDays

Configures which days of the week are considered working days

```typescript
function configureWorkingDays(dayArray: number[]): BusinessDayConfig
```

## convertTimezone

Default: return a new Date with the same instant, validating the zones. preserveTime:true reinterprets source-zone wall fields in the target zone. Use formatDate/formatTimezone to display a zone. Gap/fold reinterpretations throw.

```typescript
function convertTimezone(
  date: Date | string | number,
  options: TimezoneConversionOptions,
): Date
```

## copyTime

Copies the time portion (hours, minutes, seconds, milliseconds) from one date to another

```typescript
function copyTime(fromDate: Date | string | number, toDate: Date | string | number): Date
```

## createDate

Creates a date from components

```typescript
function createDate(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
): Date
```

## differenceInBusinessDays

Signed local calendar-day count. Forward ranges exclude the first date and include the last; reversed ranges negate the corresponding ordered interval.

```typescript
function differenceInBusinessDays(
  startDate: Date | string | number,
  endDate: Date | string | number,
): number
```

## endOf

Gets the end of a time unit (e.g., end of day, end of month)

```typescript
function endOf(
  date: Date | string | number,
  unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute'>,
): Date
```

## findClosestDate

Finds the closest date to a target from an array of dates

```typescript
function findClosestDate(
  targetDate: Date | string | number,
  dates: (Date | string | number)[],
): Date | null
```

## formatCalendar

Formats date as calendar format (Today, Tomorrow, etc.)

```typescript
function formatCalendar(date: Date | string | number, baseDate?: Date): string
```

## formatCustom

Single-pass token substitution with [literal text] escaping. Supported tokens are listed by getConfigs().formatTokens; d (weekday number) is also supported. Uses host local fields.

```typescript
function formatCustom(date: Date | string | number, pattern: string): string
```

## formatDate

The eight DateFormat patterns only. Displays an instant in the explicit or globally effective timezone. Strings are parsed first; configureTimezone does not change parsing of offset-free strings.

```typescript
function formatDate(
  date: Date | string | number,
  format: DateFormat = 'YYYY-MM-DD',
  timezone?: IANATimezone,
): string
```

## formatDuration

Elapsed approximation: 365-day years and 30-day months. Negative values retain a minus sign. maxUnits must be a positive integer.

```typescript
function formatDuration(
  milliseconds: number,
  options: { longFormat?: boolean; maxUnits?: number } = {},
): string
```

## formatISO

UTC ISO output. includeTimezone:false removes the Z marker; remaining fields still represent UTC.

```typescript
function formatISO(
  date: Date | string | number,
  options: { includeTime?: boolean; includeTimezone?: boolean; includeMilliseconds?: boolean } = {},
): string
```

## formatLocalized

Formats date with localization support

```typescript
function formatLocalized(
  date: Date | string | number,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {},
): string
```

## formatRelativeLocalized

Formats relative time with localization

```typescript
function formatRelativeLocalized(
  date: Date | string | number,
  locale = 'en-US',
  baseDate?: Date,
): string
```

## formatTimezone

Formats date in a specific timezone

```typescript
function formatTimezone(
  date: Date | string | number,
  timezone: IANATimezone,
  options: AdvancedFormatOptions = {},
): string
```

## fromTimestamp

Unix milliseconds by default. Pass inSeconds:true for Unix seconds. No magnitude guessing.

```typescript
function fromTimestamp(timestamp: number, inSeconds = false): Date
```

## generateBusinessCalendar

Generate local calendar days, or midnight instants in config.timezone. workingHours is the nominal shift duration, not elapsed DST duration. Event date ranges include both calendar days; pre-expand recurring events. Event-specific timezone/recurring options are rejected rather than ignored.

```typescript
function generateBusinessCalendar(
  year: number,
  month: number,
  events: CalendarEvent[] = [],
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): Array<{
  date: Date;
  isWorkingDay: boolean;
  isHoliday: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
  workingHours: number;
}>
```

## generateDateRange

Generates an array of dates between a start and end date

```typescript
function generateDateRange(options: DateRangeOptions): Date[]
```

## generatePayrollPeriods

Calendar-year periods; final end is clipped to year end and includes the final millisecond. Pay date remains the scheduled date even when the period is clipped. No jurisdiction-specific payroll policy.

```typescript
function generatePayrollPeriods(
  year: number,
  frequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly',
  startDate?: Date,
): Array<{ startDate: Date; endDate: Date; payDate: Date }>
```

## generateRecurringDates

Includes the supplied start when inside the end bound, even if it does not match a filter. maxOccurrences:0 returns []. Positive integer intervals; finite bounded counts. Custom searches throw after eight years without a match. Month/year recurrences retain the original day anchor after clamping. Weekend/custom intervals count matching occurrences. Weekend generation rejects an all-working-days calendar. Interval is limited to 10,000.

```typescript
function generateRecurringDates(
  startDate: Date | string | number,
  config: RecurringConfig,
): Date[]
```

## generateShiftSchedule

Manages shift schedules and rotations

```typescript
function generateShiftSchedule(
  startDate: Date | string | number,
  patterns: Array<{
    name: string;
    startHour: number;
    duration: number;
    daysOn: number;
    daysOff: number;
  }>,
  duration = 30,
): Array<{
  date: Date;
  shiftName: string;
  startTime: Date;
  endTime: Date;
  isWorkDay: boolean;
}>
```

## getBusinessDayConfig

Gets the current business day configuration

```typescript
function getBusinessDayConfig(): BusinessDayConfig
```

## getBusinessDays

Inclusive local calendar-day count, using configured working days and the union of global, custom, and supplied holidays. Reversed ranges return 0.

```typescript
function getBusinessDays(
  startDate: Date | string,
  endDate: Date | string,
  holidays: (Date | string)[] = [],
): number
```

## getBusinessDaysInMonth

Gets an array of all business days in a given month

```typescript
function getBusinessDaysInMonth(year: number, month: number): Date[]
```

## getConfigs

Returns available format values, actual loaded holiday rule presets, timezone/locale catalogs and current business configuration. Large catalogs are loaded only when this API is imported.

```typescript
function getConfigs(): ChronoUtilzConfig
```

## getDateDiff

date1 minus date2. Elapsed units truncate toward zero. Month differences count calendar month boundaries, quarters truncate that count / 3, and years return month count / 12. These are not full-anniversary differences.

```typescript
function getDateDiff(
  date1: Date | string | number,
  date2: Date | string | number,
  unit: TimeUnit,
  timezone?: IANATimezone,
): number
```

## getDayOfYear

Local calendar ordinal, 1-366, independent of daylight-saving day length.

```typescript
function getDayOfYear(date: Date | string | number): number
```

## getDaysInMonth

Gets the number of days in a month

```typescript
function getDaysInMonth(date: Date | string | number): number
```

## getEarliestDate

Gets the earliest date from an array of dates

```typescript
function getEarliestDate(dateArray: (Date | string | number)[]): Date
```

## getFiscalPeriodAdvanced

Fiscal years are named by starting calendar year. startDay is restricted to 1-28 so every quarter has an unambiguous anchor. End includes the final millisecond of the quarter.

```typescript
function getFiscalPeriodAdvanced(
  date: Date | string | number,
  config: FiscalYearConfig = { startMonth: 1, startDay: 1 },
): FiscalPeriod
```

## getFiscalQuarter

Gets fiscal quarter

```typescript
function getFiscalQuarter(date: Date | string | number, fiscalYearStart = 1): number
```

## getFiscalYear

Gets fiscal year

```typescript
function getFiscalYear(date: Date | string | number, fiscalYearStart = 1): number
```

## getHolidays

Built-in recurring presets: US federal actual dates and UK England/Wales recurring actual dates. No substitute-day policy, historical rule changes, exceptional proclamations, or complete worldwide calendar. Add validated custom rules/dates for your jurisdiction and year.

```typescript
function getHolidays(year: number, country = 'US'): Date[]
```

## getISOWeek

ISO 8601 week number, Monday start and first week containing January 4. Does not return the ISO week-year.

```typescript
function getISOWeek(date: Date | string | number): number
```

## getLatestDate

Gets the latest date from an array of dates

```typescript
function getLatestDate(dateArray: (Date | string | number)[]): Date
```

## getMidnight

Returns a new date set to midnight (00:00:00.000) of the given date

```typescript
function getMidnight(date: Date | string | number): Date
```

## getMonthBoundaries

Gets the start and end dates of the month containing the given date

```typescript
function getMonthBoundaries(date: Date | string | number): MonthBoundaries
```

## getMonthName

Gets month name

```typescript
function getMonthName(
  monthNumber: number,
  locale = 'en-US',
  format: MonthNameFormat = 'long',
): string
```

## getMonthsInQuarter

Gets detailed information about months in a quarter

```typescript
function getMonthsInQuarter(quarter: number, year: number)
```

## getNextBusinessDay

Gets the next business day from the given date

```typescript
function getNextBusinessDay(date: Date | string | number): Date
```

## getNextHoliday

Gets the next holiday from a given date

```typescript
function getNextHoliday(date: Date | string | number, country = 'US'): Date | null
```

## getNextWorkingHour

During a working interval, consume one working hour. Outside it, return the next interval opening.

```typescript
function getNextWorkingHour(date: Date | string | number, schedule?: WorkingSchedule): Date
```

## getNoon

Returns a new date set to noon (12:00:00.000) of the given date

```typescript
function getNoon(date: Date | string | number): Date
```

## getNthWeekdayOfMonth

Gets the nth occurrence of a weekday in a month

```typescript
function getNthWeekdayOfMonth(
  year: number,
  month: number,
  dayOfWeek: number,
  occurrence: number,
): Date | null
```

## getPayPeriods

Anchored at startDate. Semi-monthly uses the anchor then the next 15th/1st; monthly additions clamp month ends. Invalid frequencies throw.

```typescript
function getPayPeriods(
  startDate: Date | string | number,
  endDate: Date | string | number,
  frequency: PayPeriodFrequency,
): Date[]
```

## getPreviousBusinessDay

Gets the previous business day from the given date

```typescript
function getPreviousBusinessDay(date: Date | string | number): Date
```

## getQuarter

Returns the quarter number (1-4) for a given date

```typescript
function getQuarter(date: Date | string): number
```

## getQuarterBoundaries

Gets the start and end dates of the specified quarter in the given year

```typescript
function getQuarterBoundaries(year: number, quarter: number): QuarterBoundaries
```

## getQuarterDate

Returns the first or last date of a quarter

```typescript
function getQuarterDate(date: Date | string, type: 'start' | 'end'): Date
```

## getRelativeTime

Returns a relative time string (e.g., "5 minutes ago", "in 2 days")

```typescript
function getRelativeTime(
  date: Date | string | number,
  baseDate: Date | string | number = new Date(),
): string
```

## getSeason

Gets the season for a date

```typescript
function getSeason(
  date: Date | string | number,
  hemisphere: Hemisphere = 'northern',
): Season
```

## getTimestamp

Gets the Unix timestamp for a date

```typescript
function getTimestamp(date: Date | string | number, inSeconds = false): number
```

## getTimezoneConfig

Get current timezone configuration

```typescript
function getTimezoneConfig(): {
  defaultTimezone: string;
  autoDetect: boolean;
  currentEffectiveTimezone: string;
}
```

## getTimezoneInfo

offset is hours east of UTC. isDST is a seasonal offset heuristic, not authoritative historical daylight-saving metadata; Intl does not expose a DST flag. Use offset for calculations.

```typescript
function getTimezoneInfo(
  timezone: IANATimezone,
  date: Date = new Date(),
): {
  name: string;
  abbreviation: string;
  offset: number;
  isDST: boolean;
  offsetString: string;
  description?: string;
}
```

## getTimezoneOffset

Gets the timezone offset in minutes

```typescript
function getTimezoneOffset(date: Date | string | number = new Date()): number
```

## getTimezonesByOffset

Filters the bundled catalog by its static reference offset; use getTimezoneInfo for a date-specific offset.

```typescript
function getTimezonesByOffset(offset: number): Array<{
  id: string;
  offset: number;
  description: string;
}>
```

## getTimezonesByRegion

Get all available timezones filtered by region

```typescript
function getTimezonesByRegion(region: string): Array<{
  id: string;
  offset: number;
  description: string;
}>
```

## getTimezoneString

Gets a string representation of the current timezone

```typescript
function getTimezoneString(): string
```

## getUserTimezone

Return the host IANA timezone, falling back to UTC when Intl is unavailable.

```typescript
function getUserTimezone(): string
```

## getWeekBoundaries

Monday start by default; weekStartsOn can be 0-6. startOf/endOf/isSameWeek use Sunday start.

```typescript
function getWeekBoundaries(
  date: Date | string | number,
  weekStartsOn = 1, // Remove `: number` here
): WeekBoundaries
```

## getWeekOfMonth

Gets the week number within a month

```typescript
function getWeekOfMonth(date: Date | string | number): number
```

## getWeekOfYear

ISO 8601 week number, Monday start and first week containing January 4. Does not return the ISO week-year.

```typescript
function getWeekOfYear(date: Date | string | number): number
```

## getWorkingHoursBetween

Gets working hours between two dates

```typescript
function getWorkingHoursBetween(
  start: Date | string | number,
  end: Date | string | number,
  workingHours: WorkingSchedule,
): number
```

## getYearBoundaries

Gets the start and end dates of the specified year

```typescript
function getYearBoundaries(year: number): YearBoundaries
```

## humanizeDuration

Elapsed approximation: 365-day years and 30-day months. Honors unit filtering and precision. Negative values append ago; month abbreviation is mo.

```typescript
function humanizeDuration(
  milliseconds: number,
  options: DurationDisplayOptions = {},
): string
```

## isAfter

Checks if the first date is after the second date

```typescript
function isAfter(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: TimeUnit,
): boolean
```

## isBefore

Checks if the first date is before the second date

```typescript
function isBefore(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: TimeUnit,
): boolean
```

## isBetweenDates

Checks if a date is between two other dates

```typescript
function isBetweenDates(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
  inclusive = true,
): boolean
```

## isBusinessDay

Checks if a date is a business day (weekday and not a holiday)

```typescript
function isBusinessDay(date: Date | string | number): boolean
```

## isFirstBusinessDayOfMonth

Checks if a date is the first business day of the month

```typescript
function isFirstBusinessDayOfMonth(date: Date | string | number): boolean
```

## isFirstDayOfMonth

Checks if the given date is the first day of the month

```typescript
function isFirstDayOfMonth(date: Date | string | number): boolean
```

## isFirstDayOfYear

Checks if the given date is the first day of the year (January 1st)

```typescript
function isFirstDayOfYear(date: Date | string | number): boolean
```

## isHoliday

Checks configured global holidays, custom holidays, and an optional supplied list. Country presets are applied explicitly through getHolidays or WorkingTimeConfig.holidayConfig.

```typescript
function isHoliday(
  date: Date | string | number,
  holidaysList?: (Date | string)[],
  timezone?: IANATimezone,
): boolean
```

## isLastBusinessDayOfMonth

Checks if a date is the last business day of the month

```typescript
function isLastBusinessDayOfMonth(date: Date | string | number): boolean
```

## isLastDayOfMonth

Checks if the given date is the last day of the month

```typescript
function isLastDayOfMonth(date: Date | string | number): boolean
```

## isLastDayOfYear

Checks if the given date is the last day of the year (December 31st)

```typescript
function isLastDayOfYear(date: Date | string | number): boolean
```

## isLeapYear

Checks if a year is a leap year

```typescript
function isLeapYear(year: number | Date | string): boolean
```

## isSameDay

Checks if two dates fall on the same day

```typescript
function isSameDay(date1: Date | string | number, date2: Date | string | number): boolean
```

## isSameMonth

Checks if two dates fall in the same month and year

```typescript
function isSameMonth(date1: Date | string | number, date2: Date | string | number): boolean
```

## isSameWeek

Checks if two dates fall in the same week (Sunday-Saturday)

```typescript
function isSameWeek(date1: Date | string | number, date2: Date | string | number): boolean
```

## isSameYear

Checks if two dates fall in the same year

```typescript
function isSameYear(date1: Date | string | number, date2: Date | string | number): boolean
```

## isValidDate

Validates whether a given input is a valid date in supported formats.

```typescript
function isValidDate(date: any): boolean
```

## isValidRange

Validates if a date range is valid (start date is before or equal to end date)

```typescript
function isValidRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
): boolean
```

## isWeekday

Uses configured workingDays; default Monday-Friday.

```typescript
function isWeekday(date: Date | string | number): boolean
```

## isWeekend

Uses the complement of configured workingDays; default Saturday/Sunday.

```typescript
function isWeekend(date: Date | string | number): boolean
```

## isWithinRange

Checks if a date falls within a specified range

```typescript
function isWithinRange(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
  inclusive = true,
): boolean
```

## isWorkingHours

Start-inclusive, end-exclusive. Overnight shifts belong to their starting weekday.

```typescript
function isWorkingHours(date: Date | string | number, schedule?: WorkingSchedule): boolean
```

## listTimezones

Returns a copy of the bundled catalog, not a promise of every identifier supported by the runtime.

```typescript
function listTimezones(): string[]
```

## maxDate

Returns the latest date from an array of dates

```typescript
function maxDate(...dates: (Date | string | number)[]): Date
```

## mergeDateTime

Merges a date part with a time part

```typescript
function mergeDateTime(
  datePart: Date | string | number,
  timePart: Date | string | number,
): Date
```

## minDate

Returns the earliest date from an array of dates

```typescript
function minDate(...dates: (Date | string | number)[]): Date
```

## nextOccurrence

Gets the next occurrence of a specific day of week

```typescript
function nextOccurrence(date: Date | string | number, dayOfWeek: number): Date
```

## parseDate

Strict supported ISO, slash and English month-name formats. Offset-bearing inputs preserve the instant. Offset-free inputs use the host timezone unless options.timezone is supplied. Ambiguous slash dates are month-first. Invalid input returns null, a cloned fallback, or throws when requested. No native-parser fallback.

```typescript
function parseDate(
  input: string | number | Date,
  options: DateParseOptions & { throwError: true },
): Date;
function parseDate(input: string | number | Date, options?: DateParseOptions): Date | null;
```

## parseISO

Strict ISO subset: date-only, or T-separated time with optional seconds, 1-3 fractional digits and Z or numeric offset. Date-only is a local calendar date. Invalid dates return null.

```typescript
function parseISO(isoString: string): Date | null
```

## parseMultipleFormats

Tries multiple date formats for parsing

```typescript
function parseMultipleFormats(dateString: string, formats: string[]): Date | null
```

## parseNaturalLanguage

Supported English expressions only; options.baseDate and timezone determine relative calculations. Next/last weekday preserves clock time; today/tomorrow/yesterday resolve local midnight. Strict mode throws on unsupported expressions.

```typescript
function parseNaturalLanguage(
  expression: NaturalTimeExpression,
  options: NaturalLanguageOptions = {},
): Date | null
```

## previousOccurrence

Gets the previous occurrence of a specific day of week

```typescript
function previousOccurrence(date: Date | string | number, dayOfWeek: number): Date
```

## randomDate

Generates a random date between two dates

```typescript
function randomDate(
  startDate: Date | string | number,
  endDate: Date | string | number,
): Date
```

## remainingTime

target minus reference, with the same units and truncation as getDateDiff.

```typescript
function remainingTime(
  targetDate: Date | string | number,
  unit: TimeUnit = 'millisecond',
  referenceDate: Date | string | number = new Date(),
  timezone?: IANATimezone,
): number
```

## removeDuplicateDates

Filters invalid entries and keeps the first original instant at each requested calendar precision.

```typescript
function removeDuplicateDates(
  dateArray: (Date | string | number)[],
  unit: TimeUnit = 'day',
): Date[]
```

## resetBusinessDayConfig

Resets business day configuration to defaults

```typescript
function resetBusinessDayConfig(): BusinessDayConfig
```

## roundToNearest

Rounds a date to the nearest specified unit

```typescript
function roundToNearest(
  date: Date | string | number,
  unit: Extract<TimeUnit, 'minute' | 'hour' | 'day'>,
): Date
```

## searchTimezones

Search timezones by description or ID

```typescript
function searchTimezones(query: string): Array<{
  id: string;
  offset: number;
  description: string;
}>
```

## setTime

Sets the time components of a date

```typescript
function setTime(
  date: Date | string | number,
  hours: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number,
): Date
```

## smartParse

Smart parsing with multiple fallback strategies

```typescript
function smartParse(dateString: string): Date | null
```

## sortDates

Returns new Dates, filters invalid entries, and rejects unknown sort orders.

```typescript
function sortDates(dateArray: (Date | string | number)[], order: SortOrder = 'asc'): Date[]
```

## startOf

Gets the start of a time unit (e.g., start of day, start of month)

```typescript
function startOf(
  date: Date | string | number,
  unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute'>,
): Date
```

## stripTime

Returns a new date with time set to midnight (00:00:00.000)

```typescript
function stripTime(date: Date | string | number): Date
```

## subtractBusinessDays

Subtracts the specified number of business days from a date

```typescript
function subtractBusinessDays(date: Date | string | number, businessDays: number): Date
```

## subtractTime

Subtracts time from a date

```typescript
function subtractTime(
  date: Date | string | number,
  amount: number,
  unit: TimeUnit,
  timezone?: IANATimezone,
): Date
```

## timeOfDay

Gets the time of day category

```typescript
function timeOfDay(date: Date | string | number): TimeOfDay
```

## toUTC

Returns a clone of the same instant; Date does not carry a timezone.

```typescript
function toUTC(date: Date | string | number): Date
```

## truncateToUnit

Truncates a date to the specified unit (sets smaller units to their minimum values)

```typescript
function truncateToUnit(date: Date | string | number, unit: TimeUnit): Date
```

## utcNow

Returns the current instant. Format with timezone UTC to display UTC calendar fields.

```typescript
function utcNow(): Date
```

## validateDateFormat

Validates if a date string matches a specific format

```typescript
function validateDateFormat(dateStr: string, format: DateFormat): boolean
```

## Public types and classes

```typescript
export interface AdvancedFormatOptions {
  locale?: string;
  timezone?: IANATimezone;
  includeTime?: boolean;
  includeSeconds?: boolean;
  use24Hour?: boolean;
  includeDayOfWeek?: boolean;
  includeTimezone?: boolean;
}

export interface BusinessDayRules {
  workingDays: number[];
  holidays: (Date | string)[];
  workingHours?: { start: string; end: string };
}

export interface CalendarEvent {
  id?: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  isAllDay?: boolean;
  recurring?: RecurringConfig;
  timezone?: IANATimezone;
}

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

export interface DateComparison {
  isBefore: boolean;
  isAfter: boolean;
  isSame: boolean;
  difference: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
}

export type DateFormat =
  | 'YYYY-MM-DD' // 2025-05-07
  | 'MM/DD/YYYY' // 05/07/2025
  | 'DD/MM/YYYY' // 07/05/2025
  | 'YYYY-MM-DD HH:mm:ss' // 2025-05-07 14:30:00
  | 'DD MMM YYYY' // 07 May 2025
  | 'MMM DD, YYYY' // May 07, 2025
  | 'HH:mm:ss' // 14:30:00
  | 'hh:mm A';

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

export interface DurationDisplayOptions {
  precision?: number;
  units?: TimeUnit[];
  format?: 'long' | 'short' | 'narrow';
  separator?: string;
  includeZeroValues?: boolean;
}

export interface FiscalPeriod {
  quarter: number;
  year: number;
  startDate: Date;
  endDate: Date;
  isCurrentPeriod: boolean;
}

export interface FiscalYearConfig {
  startMonth: number; // 1-12
  startDay: number; // 1-31
}

export type Hemisphere = 'northern' | 'southern';

export interface HolidayConfig {
  country?: string;
  region?: string;
  includeObserved?: boolean;
  customHolidays?: Date[];
}

export interface HolidayRule {
  name: string;
  date: string | ((year: number) => Date);
  type?: 'fixed' | 'floating';
}

export type IANATimezone = string;

export interface MonthBoundaries {
  /** Start of the month */
  start: Date;
  /** End of the month */
  end: Date;
}

export type MonthNameFormat = 'long' | 'short' | 'narrow';

export interface NaturalLanguageOptions {
  baseDate?: Date;
  timezone?: IANATimezone;
  strictParsing?: boolean;
}

export type NaturalTimeExpression =
  | 'now'
  | 'today'
  | 'tomorrow'
  | 'yesterday'
  | 'next week'
  | 'last week'
  | 'next month'
  | 'last month'
  | 'next year'
  | 'last year'
  | 'next monday'
  | 'next tuesday'
  | 'next wednesday'
  | 'next thursday'
  | 'next friday'
  | 'next saturday'
  | 'next sunday'
  | 'last monday'
  | 'last tuesday'
  | 'last wednesday'
  | 'last thursday'
  | 'last friday'
  | 'last saturday'
  | 'last sunday'
  | 'beginning of week'
  | 'end of week'
  | 'beginning of month'
  | 'end of month'
  | 'beginning of year'
  | 'end of year'
  | string;

export type PayPeriodFrequency = 'weekly' | 'bi-weekly' | 'semi-monthly' | 'monthly';

export interface QuarterBoundaries {
  /** Start of the quarter */
  start: Date;
  /** End of the quarter */
  end: Date;
}

export interface RecurringConfig {
  pattern: RecurringPattern;
  interval?: number; // e.g., every 2 weeks
  daysOfWeek?: number[]; // 0-6, Sunday is 0
  daysOfMonth?: number[]; // 1-31
  monthsOfYear?: number[]; // 1-12
  endDate?: Date;
  maxOccurrences?: number;
}

export type RecurringPattern =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly'
  | 'weekdays'
  | 'weekends'
  | 'custom';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type SortOrder = 'asc' | 'desc';

export type TimeOfDay = 'Night' | 'Morning' | 'Afternoon' | 'Evening';

export type TimeUnit =
  'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface TimezoneConversionOptions {
  from?: IANATimezone;
  to: IANATimezone;
  preserveTime?: boolean;
}

export interface WeekBoundaries {
  /** Start of the week */
  start: Date;
  /** End of the week */
  end: Date;
}

export interface WorkingSchedule {
  start: string; // HH:mm format
  end: string; // HH:mm format
  days?: number[]; // Optional specific days
}

export interface WorkingTimeConfig {
  startHour: number;
  endHour: number;
  workingDays: number[]; // 0-6, Sunday is 0
  timezone?: IANATimezone;
  excludeHolidays?: boolean;
  holidayConfig?: HolidayConfig;
}

export interface YearBoundaries {
  /** Start of the year */
  start: Date;
  /** End of the year */
  end: Date;
}
```
