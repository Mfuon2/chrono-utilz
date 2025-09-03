# ChronoUtilz Complete Function Reference

ChronoUtilz is a comprehensive date utility library built on **Three Pillars Architecture** with 135+ functions.

## Three Pillars Architecture

1. **Core Operations (45+ functions)**: Date manipulation & comparison
2. **Business Utilities (55+ functions)**: Real-world business logic
3. **Formatting & Parsing (35+ functions)**: Advanced presentation

---

# Library Configuration

## getConfigs()
Get comprehensive configuration information to help you use ChronoUtilz effectively without struggling with documentation.

**Sample Input:**
```typescript
import { getConfigs } from 'chrono-utilz';

const config = getConfigs();
```

**Sample Output:**
```typescript
{
  dateFormats: ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', ...],
  timeUnits: ['millisecond', 'second', 'minute', 'hour', 'day', ...],
  timezones: ['UTC', 'America/New_York', 'Europe/London', ...],
  naturalLanguageExpressions: ['now', 'today', 'tomorrow', 'next week', ...],
  recurringPatterns: ['daily', 'weekly', 'monthly', 'quarterly', ...],
  businessDayConfig: {
    defaultWorkingDays: [1, 2, 3, 4, 5],
    currentWorkingDays: [1, 2, 3, 4, 5],
    workingDayNames: { 0: 'Sunday', 1: 'Monday', ... }
  },
  // ... comprehensive configuration data
}
```

### Complete Configuration Object Structure

#### 1. Date Formats
```typescript
config.dateFormats: [
  'YYYY-MM-DD',        // 2024-01-15
  'MM/DD/YYYY',        // 01/15/2024  
  'DD/MM/YYYY',        // 15/01/2024
  'YYYY-MM-DD HH:mm:ss', // 2024-01-15 14:30:45
  'DD MMM YYYY',       // 15 Jan 2024
  'MMM DD, YYYY',      // Jan 15, 2024
  'HH:mm:ss',          // 14:30:45
  'hh:mm A',           // 02:30 PM
  // ... and more
]
```

#### 2. Time Units
```typescript
config.timeUnits: [
  'millisecond', 'second', 'minute', 'hour', 
  'day', 'week', 'month', 'quarter', 'year'
]
```

#### 3. Supported Timezones
```typescript
config.timezones: [
  'UTC',
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome',
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai',
  'Australia/Sydney', 'Australia/Melbourne',
  // ... 33+ timezones total
]
```

#### 4. Natural Language Expressions
```typescript
config.naturalLanguageExpressions: [
  'now', 'today', 'tomorrow', 'yesterday',
  'next week', 'last week', 'next month', 'last month',
  'next monday', 'next tuesday', // ... all weekdays
  'last friday', 'last saturday', // ... all weekdays
  'beginning of week', 'end of week',
  'beginning of month', 'end of month',
  'in 1 day', 'in 2 days', 'in 1 week',
  '2 days ago', '1 week ago', '1 month ago',
  // ... 39+ expressions
]
```

#### 5. Business Day Configuration
```typescript
config.businessDayConfig: {
  defaultWorkingDays: [1, 2, 3, 4, 5],        // Monday-Friday
  currentWorkingDays: [1, 2, 3, 4, 5],        // Current setting
  defaultHolidays: [],
  currentHolidays: ['2024-12-25', '2024-01-01'], // If configured
  workingDayNames: {
    0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
    4: 'Thursday', 5: 'Friday', 6: 'Saturday'
  }
}
```

#### 6. Holiday Configuration
```typescript
config.holidayConfig: {
  supportedCountries: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN'],
  availableHolidayRules: {
    'US': [
      { name: "New Year's Day", date: '01-01', type: 'fixed' },
      { name: 'Independence Day', date: '07-04', type: 'fixed' },
      { name: 'Christmas Day', date: '12-25', type: 'fixed' },
      { name: 'Thanksgiving', date: 'fourth-thursday-november', type: 'calculated' },
      // ... more US holidays
    ],
    'UK': [
      { name: "New Year's Day", date: '01-01', type: 'fixed' },
      { name: 'Christmas Day', date: '12-25', type: 'fixed' },
      { name: 'Boxing Day', date: '12-26', type: 'fixed' },
      // ... more UK holidays
    ]
  }
}
```

#### 7. Locale Support
```typescript
config.locales: {
  popular: [
    'en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 
    'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW', 'ru-RU', 'ar-SA', 'hi-IN',
    // ... 22+ popular locales
  ],
  regions: {
    'North America': ['en-US', 'en-CA', 'es-MX', 'fr-CA'],
    'Europe': ['en-GB', 'fr-FR', 'de-DE', 'it-IT', ...],
    'Asia': ['ja-JP', 'ko-KR', 'zh-CN', 'zh-TW', ...],
    'South America': ['pt-BR', 'es-AR', 'es-CO', ...],
    'Africa': ['ar-SA', 'ar-EG', 'sw-KE', 'af-ZA'],
    'Oceania': ['en-AU', 'en-NZ']
  }
}
```

#### 8. Format Tokens
```typescript
config.formatTokens: {
  'YYYY': '4-digit year (2024)',
  'YY': '2-digit year (24)', 
  'MMMM': 'Full month name (January)',
  'MMM': 'Short month name (Jan)',
  'MM': '2-digit month (01-12)',
  'DD': '2-digit day (01-31)',
  'HH': '24-hour format hours (00-23)',
  'hh': '12-hour format hours (01-12)',
  'mm': 'Minutes (00-59)',
  'ss': 'Seconds (00-59)',
  'A': 'AM/PM (uppercase)',
  'Z': 'Timezone offset (+05:00)',
  // ... 27+ format tokens
}
```

#### 9. Default Settings
```typescript
config.workingTimeDefaults: {
  startHour: 9,                    // 9 AM
  endHour: 17,                     // 5 PM
  workingDays: [1, 2, 3, 4, 5],   // Monday-Friday
  timezone: 'UTC'
}

config.fiscalYearDefaults: {
  startMonth: 1,                   // January
  startDay: 1                      // 1st day
}

config.overtime: {
  defaultRegularHours: 40,         // 40 hours/week
  defaultOvertimeMultiplier: 1.5,  // 1.5x pay rate
  defaultDoubleTimeThreshold: 60   // 60+ hours = double time
}
```

#### 10. Recurring Patterns & Seasonal
```typescript
config.recurringPatterns: [
  'daily', 'weekly', 'biweekly', 'monthly', 
  'quarterly', 'yearly', 'weekdays', 'weekends', 'custom'
]

config.seasonalConfig: {
  hemispheres: ['northern', 'southern'],
  seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
  timeOfDay: ['Night', 'Morning', 'Afternoon', 'Evening']
}

config.payrollFrequencies: [
  'weekly', 'bi-weekly', 'biweekly', 'semi-monthly', 
  'monthly', 'quarterly', 'yearly'
]
```

### Practical Usage Examples

#### Getting Available Options
```typescript
const config = getConfigs();

// See all supported date formats
console.log('Available formats:', config.dateFormats);

// Check which timezones are supported
if (config.timezones.includes('Europe/Stockholm')) {
  // Use Stockholm timezone
}

// Get format token information
console.log('Year token:', config.formatTokens.YYYY); // "4-digit year (2024)"
```

#### Configuration-Based Validation
```typescript
const config = getConfigs();

function validateFormat(format) {
  return config.dateFormats.includes(format);
}

function validateTimezone(tz) {
  return config.timezones.includes(tz);
}

function validateLocale(locale) {
  return config.locales.popular.includes(locale);
}
```

#### Dynamic Configuration Discovery
```typescript
const config = getConfigs();

// Get current business day setup
console.log('Working days:', config.businessDayConfig.currentWorkingDays);
console.log('Holidays:', config.businessDayConfig.currentHolidays);

// Check available holiday rules by country
const usHolidays = config.holidayConfig.availableHolidayRules.US;
console.log('US holidays:', usHolidays.map(h => h.name));
```

#### Building UI Components
```typescript
const config = getConfigs();

// Create timezone dropdown
const timezoneOptions = config.timezones.map(tz => ({
  value: tz,
  label: tz.replace('_', ' ')
}));

// Create locale selector by region  
const localesByRegion = config.locales.regions;

// Create format picker with examples
const formatOptions = config.dateFormats.map(fmt => ({
  value: fmt,
  example: formatDate(new Date(), fmt)
}));
```

**Key Benefits:**
- ✅ **No Guesswork**: See exactly what options are available
- ✅ **Dynamic Updates**: Reflects current configuration state  
- ✅ **Type Safety**: Full TypeScript interface provided
- ✅ **Validation Ready**: Perfect for building validation functions
- ✅ **UI Integration**: Ideal for populating dropdowns and selectors
- ✅ **Documentation**: Each token includes description and example

---

# Core Operations (Pillar 1)

## Date Parsing & Validation

### parseDate(input, options)
Parses various input formats into a Date object.

**Sample Input:**
```typescript
parseDate('2024-01-15')
parseDate('01/15/2024')
parseDate(1705276800000)
parseDate('invalid-date', { throwError: false })
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// null
```

### isValidDate(date)
Checks if a date is valid.

**Sample Input:**
```typescript
isValidDate('2024-01-15')
isValidDate('invalid')
```

**Sample Output:**
```typescript
// true
// false
```

### validateDateFormat(dateStr, format)
Validates if a date string matches a specific format.

**Sample Input:**
```typescript
validateDateFormat('2024-01-15', 'YYYY-MM-DD')
validateDateFormat('01/15/2024', 'YYYY-MM-DD')
```

**Sample Output:**
```typescript
// true
// false
```

## Date Creation & Manipulation

### createDate(year, month, day, hour?, minute?, second?, ms?)
Creates a new Date object with specified components.

**Sample Input:**
```typescript
createDate(2024, 0, 15)
createDate(2024, 0, 15, 14, 30, 0)
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 15 2024 14:30:00 GMT+0000 (UTC)
```

### cloneDate(date)
Creates a copy of a Date object.

**Sample Input:**
```typescript
cloneDate(new Date('2024-01-15'))
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
```

### addTime(date, amount, unit)
Adds a specified amount of time to a date.

**Sample Input:**
```typescript
addTime('2024-01-15', 1, 'day')
addTime('2024-01-15', 2, 'month')
addTime('2024-01-15', 1, 'year')
```

**Sample Output:**
```typescript
// Tue Jan 16 2024 00:00:00 GMT+0000 (UTC)
// Thu Mar 15 2024 00:00:00 GMT+0000 (UTC)
// Wed Jan 15 2025 00:00:00 GMT+0000 (UTC)
```

### subtractTime(date, amount, unit)
Subtracts a specified amount of time from a date.

**Sample Input:**
```typescript
subtractTime('2024-01-15', 1, 'day')
subtractTime('2024-01-15', 1, 'month')
```

**Sample Output:**
```typescript
// Sun Jan 14 2024 00:00:00 GMT+0000 (UTC)
// Fri Dec 15 2023 00:00:00 GMT+0000 (UTC)
```

### setTime(date, hour, minute?, second?, ms?)
Sets the time portion of a date.

**Sample Input:**
```typescript
setTime('2024-01-15', 14, 30, 45)
setTime('2024-01-15', 9)
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 14:30:45 GMT+0000 (UTC)
// Mon Jan 15 2024 09:00:00 GMT+0000 (UTC)
```

### copyTime(sourceDate, targetDate)
Copies the time portion from one date to another.

**Sample Input:**
```typescript
copyTime('2024-01-15T14:30:00', '2024-02-20T09:15:00')
```

**Sample Output:**
```typescript
// Tue Feb 20 2024 14:30:00 GMT+0000 (UTC)
```

### mergeDateTime(dateSource, timeSource)
Merges date from one source and time from another.

**Sample Input:**
```typescript
mergeDateTime('2024-01-15', '2024-02-20T14:30:00')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 14:30:00 GMT+0000 (UTC)
```

## Date Comparison

### getDateDiff(date1, date2, unit)
Gets the difference between two dates in the specified unit.

**Sample Input:**
```typescript
getDateDiff('2024-01-15', '2024-01-20', 'day')
getDateDiff('2024-01-15', '2024-02-15', 'month')
getDateDiff('2024-01-15', '2025-01-15', 'year')
```

**Sample Output:**
```typescript
// 5
// 1
// 1
```

### isBetweenDates(date, startDate, endDate, inclusive?)
Checks if a date falls between two other dates.

**Sample Input:**
```typescript
isBetweenDates('2024-01-15', '2024-01-10', '2024-01-20')
isBetweenDates('2024-01-15', '2024-01-15', '2024-01-20', false)
```

**Sample Output:**
```typescript
// true
// false
```

### isSameDay(date1, date2)
Checks if two dates are on the same day.

**Sample Input:**
```typescript
isSameDay('2024-01-15T09:30:00', '2024-01-15T18:45:00')
isSameDay('2024-01-15', '2024-01-16')
```

**Sample Output:**
```typescript
// true
// false
```

### isSameWeek(date1, date2, startOfWeek?)
Checks if two dates are in the same week.

**Sample Input:**
```typescript
isSameWeek('2024-01-15', '2024-01-18')
isSameWeek('2024-01-15', '2024-01-22')
```

**Sample Output:**
```typescript
// true
// false
```

### isSameMonth(date1, date2)
Checks if two dates are in the same month.

**Sample Input:**
```typescript
isSameMonth('2024-01-15', '2024-01-30')
isSameMonth('2024-01-15', '2024-02-15')
```

**Sample Output:**
```typescript
// true
// false
```

### isSameYear(date1, date2)
Checks if two dates are in the same year.

**Sample Input:**
```typescript
isSameYear('2024-01-15', '2024-12-31')
isSameYear('2024-01-15', '2025-01-15')
```

**Sample Output:**
```typescript
// true
// false
```

### isAfter(date1, date2)
Checks if the first date is after the second date.

**Sample Input:**
```typescript
isAfter('2024-01-20', '2024-01-15')
isAfter('2024-01-10', '2024-01-15')
```

**Sample Output:**
```typescript
// true
// false
```

### isBefore(date1, date2)
Checks if the first date is before the second date.

**Sample Input:**
```typescript
isBefore('2024-01-10', '2024-01-15')
isBefore('2024-01-20', '2024-01-15')
```

**Sample Output:**
```typescript
// true
// false
```

### isWithinRange(date, startDate, endDate)
Checks if a date is within a specified range.

**Sample Input:**
```typescript
isWithinRange('2024-01-15', '2024-01-10', '2024-01-20')
isWithinRange('2024-01-25', '2024-01-10', '2024-01-20')
```

**Sample Output:**
```typescript
// true
// false
```

### compareDates(date1, date2)
Compares two dates, returning -1, 0, or 1.

**Sample Input:**
```typescript
compareDates('2024-01-10', '2024-01-15')
compareDates('2024-01-15', '2024-01-15')
compareDates('2024-01-20', '2024-01-15')
```

**Sample Output:**
```typescript
// -1
// 0
// 1
```

### compareDetailed(date1, date2)
Provides detailed comparison information between two dates.

**Sample Input:**
```typescript
compareDetailed('2024-01-15T10:30:00', '2024-02-20T15:45:30')
```

**Sample Output:**
```typescript
// {
//   comparison: -1,
//   daysDifference: -36,
//   exactDifference: { years: 0, months: -1, days: -5, hours: -5, minutes: -15, seconds: -30 },
//   humanReadable: "36 days before"
// }
```

## Date Boundaries & Periods

### startOf(date, unit)
Gets the start of a time unit (day, week, month, etc.).

**Sample Input:**
```typescript
startOf('2024-01-15T14:30:45', 'day')
startOf('2024-01-15', 'month')
startOf('2024-01-15', 'year')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 01 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 01 2024 00:00:00 GMT+0000 (UTC)
```

### endOf(date, unit)
Gets the end of a time unit (day, week, month, etc.).

**Sample Input:**
```typescript
endOf('2024-01-15T14:30:45', 'day')
endOf('2024-01-15', 'month')
endOf('2024-01-15', 'year')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 23:59:59.999 GMT+0000 (UTC)
// Wed Jan 31 2024 23:59:59.999 GMT+0000 (UTC)
// Tue Dec 31 2024 23:59:59.999 GMT+0000 (UTC)
```

### stripTime(date)
Removes time portion, keeping only date.

**Sample Input:**
```typescript
stripTime('2024-01-15T14:30:45')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
```

### getMidnight(date)
Gets midnight for the given date.

**Sample Input:**
```typescript
getMidnight('2024-01-15T14:30:45')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
```

### getNoon(date)
Gets noon for the given date.

**Sample Input:**
```typescript
getNoon('2024-01-15T14:30:45')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 12:00:00 GMT+0000 (UTC)
```

## Timezone Operations

### convertTimezone(date, fromTimezone, toTimezone, options?)
Converts a date from one timezone to another.

**Sample Input:**
```typescript
convertTimezone('2024-01-15T14:30:00', 'America/New_York', 'Europe/London')
convertTimezone('2024-01-15T14:30:00', 'UTC', 'Asia/Tokyo')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 19:30:00 GMT+0000 (UTC) [in London time]
// Tue Jan 16 2024 00:30:00 GMT+0000 (UTC) [in Tokyo time]
```

### getTimezoneOffset(date?)
Gets the timezone offset in minutes.

**Sample Input:**
```typescript
getTimezoneOffset('2024-01-15')
getTimezoneOffset()
```

**Sample Output:**
```typescript
// -300 (for EST, UTC-5)
// -300 (current timezone offset)
```

### getTimezoneString()
Gets the current timezone offset as a string.

**Sample Input:**
```typescript
getTimezoneString()
```

**Sample Output:**
```typescript
// "UTC-05:00"
```

### utcNow()
Gets the current date and time in UTC.

**Sample Input:**
```typescript
utcNow()
```

**Sample Output:**
```typescript
// Current date in UTC
```

### toUTC(date)
Converts a date to UTC.

**Sample Input:**
```typescript
toUTC('2024-01-15T14:30:00')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 19:30:00 GMT+0000 (UTC) [adjusted to UTC]
```

## Natural Language Parsing

### parseNaturalLanguage(expression, options?)
Parses natural language date expressions.

**Sample Input:**
```typescript
parseNaturalLanguage('tomorrow')
parseNaturalLanguage('next friday')
parseNaturalLanguage('in 2 weeks')
parseNaturalLanguage('last monday')
```

**Sample Output:**
```typescript
// Tomorrow's date
// Next Friday's date
// Date 2 weeks from now
// Last Monday's date
```

## Calendar Information

### getDayOfYear(date)
Gets the day number within the year (1-366).

**Sample Input:**
```typescript
getDayOfYear('2024-01-15')
getDayOfYear('2024-12-31')
```

**Sample Output:**
```typescript
// 15
// 366 (leap year)
```

### getWeekOfYear(date)
Gets the week number within the year (1-53).

**Sample Input:**
```typescript
getWeekOfYear('2024-01-15')
getWeekOfYear('2024-12-30')
```

**Sample Output:**
```typescript
// 3
// 52
```

### getISOWeek(date)
Gets the ISO week number (1-53).

**Sample Input:**
```typescript
getISOWeek('2024-01-01')
getISOWeek('2024-01-15')
```

**Sample Output:**
```typescript
// 1
// 3
```

### getWeekOfMonth(date)
Gets the week number within the month (1-6).

**Sample Input:**
```typescript
getWeekOfMonth('2024-01-15')
getWeekOfMonth('2024-01-31')
```

**Sample Output:**
```typescript
// 3
// 5
```

### isLeapYear(year)
Checks if a year is a leap year.

**Sample Input:**
```typescript
isLeapYear(2024)
isLeapYear(2023)
isLeapYear('2024-01-15')
```

**Sample Output:**
```typescript
// true
// false
// true
```

### getDaysInMonth(date)
Gets the number of days in a month.

**Sample Input:**
```typescript
getDaysInMonth('2024-01-15')
getDaysInMonth('2024-02-15')
getDaysInMonth('2023-02-15')
```

**Sample Output:**
```typescript
// 31
// 29 (leap year)
// 28
```

### getQuarter(date)
Gets the quarter number (1-4) for a date.

**Sample Input:**
```typescript
getQuarter('2024-01-15')
getQuarter('2024-07-15')
getQuarter('2024-12-15')
```

**Sample Output:**
```typescript
// 1
// 3
// 4
```

### getSeason(date, hemisphere?)
Gets the season for a date.

**Sample Input:**
```typescript
getSeason('2024-01-15')
getSeason('2024-07-15')
getSeason('2024-01-15', 'south')
```

**Sample Output:**
```typescript
// "Winter"
// "Summer"
// "Summer"
```

---

# Business Utilities (Pillar 2)

## Business Day Operations

### configureWorkingDays(dayArray)
Configures which days are considered working days.

**Sample Input:**
```typescript
configureWorkingDays([1, 2, 3, 4, 5])  // Mon-Fri
configureWorkingDays([1, 2, 3, 4, 5, 6])  // Mon-Sat
```

**Sample Output:**
```typescript
// { workingDays: [1,2,3,4,5], holidays: [] }
// { workingDays: [1,2,3,4,5,6], holidays: [] }
```

### configureHolidays(holidays)
Configures holidays to exclude from business days.

**Sample Input:**
```typescript
configureHolidays(['2024-12-25', '2024-01-01'])
```

**Sample Output:**
```typescript
// { workingDays: [1,2,3,4,5], holidays: [Date objects for holidays] }
```

### isWeekend(date)
Checks if a date falls on a weekend.

**Sample Input:**
```typescript
isWeekend('2024-01-13')  // Saturday
isWeekend('2024-01-15')  // Monday
```

**Sample Output:**
```typescript
// true
// false
```

### isWeekday(date)
Checks if a date falls on a weekday.

**Sample Input:**
```typescript
isWeekday('2024-01-15')  // Monday
isWeekday('2024-01-13')  // Saturday
```

**Sample Output:**
```typescript
// true
// false
```

### isBusinessDay(date)
Checks if a date is a business day (excludes weekends and holidays).

**Sample Input:**
```typescript
isBusinessDay('2024-01-15')  // Monday
isBusinessDay('2024-12-25')  // Christmas (if configured as holiday)
```

**Sample Output:**
```typescript
// true
// false
```

### getBusinessDays(startDate, endDate)
Gets the number of business days between two dates.

**Sample Input:**
```typescript
getBusinessDays('2024-01-15', '2024-01-19')  // Mon-Fri
getBusinessDays('2024-01-15', '2024-01-22')  // Mon-Mon (1 week)
```

**Sample Output:**
```typescript
// 5
// 6
```

### addBusinessDays(date, days)
Adds business days to a date.

**Sample Input:**
```typescript
addBusinessDays('2024-01-15', 5)  // Add 5 business days to Monday
addBusinessDays('2024-01-12', 1)  // Add 1 business day to Friday
```

**Sample Output:**
```typescript
// Fri Jan 19 2024 (skipping weekend)
// Mon Jan 15 2024 (skipping weekend)
```

### subtractBusinessDays(date, days)
Subtracts business days from a date.

**Sample Input:**
```typescript
subtractBusinessDays('2024-01-15', 1)  // Subtract 1 business day from Monday
subtractBusinessDays('2024-01-15', 5)  // Subtract 5 business days
```

**Sample Output:**
```typescript
// Fri Jan 12 2024 (skipping weekend)
// Wed Jan 10 2024
```

### getNextBusinessDay(date)
Gets the next business day after a given date.

**Sample Input:**
```typescript
getNextBusinessDay('2024-01-12')  // Friday
getNextBusinessDay('2024-01-15')  // Monday
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 (skipping weekend)
// Tue Jan 16 2024
```

### getPreviousBusinessDay(date)
Gets the previous business day before a given date.

**Sample Input:**
```typescript
getPreviousBusinessDay('2024-01-15')  // Monday
getPreviousBusinessDay('2024-01-16')  // Tuesday
```

**Sample Output:**
```typescript
// Fri Jan 12 2024 (skipping weekend)
// Mon Jan 15 2024
```

### businessDaysInMonth(year, month)
Gets the number of business days in a month.

**Sample Input:**
```typescript
businessDaysInMonth(2024, 1)  // January 2024
businessDaysInMonth(2024, 2)  // February 2024
```

**Sample Output:**
```typescript
// 23
// 21
```

### differenceInBusinessDays(startDate, endDate)
Gets the difference in business days between two dates.

**Sample Input:**
```typescript
differenceInBusinessDays('2024-01-15', '2024-01-19')
differenceInBusinessDays('2024-01-12', '2024-01-15')
```

**Sample Output:**
```typescript
// 4
// 1
```

## Fiscal Year Operations

### getFiscalQuarter(date, fiscalYearStart)
Gets the fiscal quarter for a date.

**Sample Input:**
```typescript
getFiscalQuarter('2024-01-15', 1)    // Fiscal year starts Jan
getFiscalQuarter('2024-01-15', 4)    // Fiscal year starts April
getFiscalQuarter('2024-07-15', 4)    // Q2 in fiscal year starting April
```

**Sample Output:**
```typescript
// 1
// 4
// 2
```

### getFiscalYear(date, fiscalYearStart)
Gets the fiscal year for a date.

**Sample Input:**
```typescript
getFiscalYear('2024-01-15', 1)     // Fiscal year starts Jan
getFiscalYear('2024-01-15', 4)     // Fiscal year starts April
getFiscalYear('2024-06-15', 4)     // Before new fiscal year
```

**Sample Output:**
```typescript
// 2024
// 2023 (still in FY2023-24)
// 2024 (now in FY2024-25)
```

### getFiscalPeriodAdvanced(date, config)
Gets advanced fiscal period information.

**Sample Input:**
```typescript
getFiscalPeriodAdvanced('2024-07-15', {
  startMonth: 4,     // April start
  periodsPerYear: 12,
  periodNames: ['Apr', 'May', 'Jun', ...]
})
```

**Sample Output:**
```typescript
// {
//   fiscalYear: 2024,
//   fiscalQuarter: 2,
//   fiscalPeriod: 4,
//   periodName: "Jul",
//   daysInPeriod: 31,
//   daysRemaining: 16
// }
```

## Payroll & Working Hours

### getPayPeriods(startDate, endDate, frequency)
Gets pay periods between two dates.

**Sample Input:**
```typescript
getPayPeriods('2024-01-01', '2024-03-31', 'bi-weekly')
getPayPeriods('2024-01-01', '2024-03-31', 'monthly')
```

**Sample Output:**
```typescript
// [Array of bi-weekly pay period objects]
// [Array of monthly pay period objects]
```

### generatePayrollPeriods(startDate, endDate, frequency, config?)
Generates comprehensive payroll periods.

**Sample Input:**
```typescript
generatePayrollPeriods('2024-01-01', '2024-12-31', 'biweekly', {
  payDelay: 2,  // Pay 2 days after period ends
  includeHolidays: true
})
```

**Sample Output:**
```typescript
// [
//   {
//     periodNumber: 1,
//     startDate: Date('2024-01-01'),
//     endDate: Date('2024-01-14'),
//     payDate: Date('2024-01-16'),
//     workingDays: 10,
//     holidays: []
//   },
//   ...
// ]
```

### calculateWorkingHours(startDate, endDate, schedule)
Calculates working hours between dates with a schedule.

**Sample Input:**
```typescript
calculateWorkingHours('2024-01-15', '2024-01-19', {
  hoursPerDay: 8,
  workingDays: [1,2,3,4,5],  // Mon-Fri
  holidays: ['2024-01-15']   // MLK Day
})
```

**Sample Output:**
```typescript
// {
//   totalDays: 5,
//   workingDays: 4,         // Excluding MLK Day
//   totalHours: 32,         // 4 days × 8 hours
//   overtimeHours: 0,
//   breakdown: { regular: 32, overtime: 0 }
// }
```

### getWorkingHoursBetween(startDateTime, endDateTime, schedule)
Gets working hours between two specific date-times.

**Sample Input:**
```typescript
getWorkingHoursBetween(
  '2024-01-15T09:00:00',
  '2024-01-17T17:00:00',
  {
    start: '09:00',
    end: '17:00',
    days: [1,2,3,4,5],
    breaks: [{ start: '12:00', end: '13:00' }]
  }
)
```

**Sample Output:**
```typescript
// {
//   totalHours: 14,         // 2 full working days (7 hours each after breaks)
//   dailyBreakdown: [
//     { date: '2024-01-15', hours: 7 },
//     { date: '2024-01-16', hours: 7 }
//   ]
// }
```

### addWorkingHours(date, hours, schedule)
Adds working hours to a date considering work schedule.

**Sample Input:**
```typescript
addWorkingHours('2024-01-15T09:00:00', 16, {
  start: '09:00',
  end: '17:00',
  days: [1,2,3,4,5]  // Mon-Fri, 8 hours/day
})
```

**Sample Output:**
```typescript
// Wed Jan 17 2024 09:00:00 GMT+0000 (UTC) [16 hours = 2 working days]
```

### calculateOvertime(hoursWorked, standardHours, overtimeRules)
Calculates overtime based on hours worked and rules.

**Sample Input:**
```typescript
calculateOvertime(45, 40, {
  dailyOvertimeThreshold: 8,
  weeklyOvertimeThreshold: 40,
  overtimeMultiplier: 1.5,
  doubleTimeThreshold: 12
})
```

**Sample Output:**
```typescript
// {
//   regularHours: 40,
//   overtimeHours: 5,
//   doubleTimeHours: 0,
//   totalPay: (40 * rate) + (5 * rate * 1.5)
// }
```

## Holiday Management

### addHolidayRules(country, rules)
Adds holiday rules for a specific country.

**Sample Input:**
```typescript
addHolidayRules('US', [
  { name: "Independence Day", date: '07-04' },
  { name: "Christmas", date: '12-25' }
])
```

**Sample Output:**
```typescript
// void (rules added to system)
```

### isHoliday(date, country?)
Checks if a date is a holiday.

**Sample Input:**
```typescript
isHoliday('2024-07-04', 'US')
isHoliday('2024-01-15', 'US')
```

**Sample Output:**
```typescript
// true (Independence Day)
// false
```

### getHolidays(year, country?)
Gets all holidays for a year in a country.

**Sample Input:**
```typescript
getHolidays(2024, 'US')
```

**Sample Output:**
```typescript
// [Array of Date objects for US holidays in 2024]
```

### getNextHoliday(date, country?)
Gets the next holiday after a given date.

**Sample Input:**
```typescript
getNextHoliday('2024-06-01', 'US')
```

**Sample Output:**
```typescript
// Thu Jul 04 2024 (Independence Day)
```

### addCustomHolidays(holidayArray)
Adds custom holidays to the system.

**Sample Input:**
```typescript
addCustomHolidays(['2024-03-15', '2024-09-20'])
```

**Sample Output:**
```typescript
// void (custom holidays added)
```

## Project Management & Scheduling

### calculateProjectMilestones(startDate, endDate, milestoneConfig)
Calculates project milestones based on configuration.

**Sample Input:**
```typescript
calculateProjectMilestones('2024-01-15', '2024-06-15', {
  phases: [
    { name: 'Planning', percentage: 20 },
    { name: 'Development', percentage: 60 },
    { name: 'Testing', percentage: 15 },
    { name: 'Deployment', percentage: 5 }
  ],
  excludeWeekends: true
})
```

**Sample Output:**
```typescript
// [
//   { phase: 'Planning', startDate: Date('2024-01-15'), endDate: Date('2024-02-09'), duration: 25 },
//   { phase: 'Development', startDate: Date('2024-02-09'), endDate: Date('2024-04-26'), duration: 75 },
//   { phase: 'Testing', startDate: Date('2024-04-26'), endDate: Date('2024-05-15'), duration: 19 },
//   { phase: 'Deployment', startDate: Date('2024-05-15'), endDate: Date('2024-06-15'), duration: 6 }
// ]
```

### calculateSLACompliance(tickets, slaRules)
Calculates SLA compliance for tickets.

**Sample Input:**
```typescript
calculateSLACompliance([
  { priority: 'high', createdAt: '2024-01-15T09:00:00', resolvedAt: '2024-01-15T11:00:00' },
  { priority: 'medium', createdAt: '2024-01-15T10:00:00', resolvedAt: '2024-01-16T14:00:00' }
], {
  high: { responseTime: 1, resolutionTime: 4 },    // hours
  medium: { responseTime: 4, resolutionTime: 24 }  // hours
})
```

**Sample Output:**
```typescript
// {
//   overallCompliance: 100,
//   ticketResults: [
//     { ticketId: 0, priority: 'high', responseCompliant: true, resolutionCompliant: true },
//     { ticketId: 1, priority: 'medium', responseCompliant: true, resolutionCompliant: false }
//   ],
//   summary: { total: 2, compliant: 1, nonCompliant: 1 }
// }
```

### generateShiftSchedule(startDate, endDate, shiftConfig)
Generates shift schedules for workers.

**Sample Input:**
```typescript
generateShiftSchedule('2024-01-15', '2024-01-28', {
  shiftPattern: 'rotating',
  shifts: [
    { name: 'Morning', start: '06:00', end: '14:00' },
    { name: 'Evening', start: '14:00', end: '22:00' },
    { name: 'Night', start: '22:00', end: '06:00' }
  ],
  workers: ['Alice', 'Bob', 'Charlie'],
  rotationDays: 3
})
```

**Sample Output:**
```typescript
// [
//   { date: '2024-01-15', shift: 'Morning', worker: 'Alice', hours: 8 },
//   { date: '2024-01-15', shift: 'Evening', worker: 'Bob', hours: 8 },
//   { date: '2024-01-15', shift: 'Night', worker: 'Charlie', hours: 8 },
//   ...
// ]
```

---

# Formatting & Parsing (Pillar 3)

## Date Formatting

### formatDate(date, format)
Formats a date using predefined formats.

**Sample Input:**
```typescript
formatDate('2024-01-15T14:30:45', 'YYYY-MM-DD')
formatDate('2024-01-15T14:30:45', 'MM/DD/YYYY')
formatDate('2024-01-15T14:30:45', 'DD MMM YYYY')
formatDate('2024-01-15T14:30:45', 'HH:mm:ss')
```

**Sample Output:**
```typescript
// "2024-01-15"
// "01/15/2024"
// "15 Jan 2024"
// "14:30:45"
```

### formatISO(date, options?)
Formats a date in ISO 8601 format with options.

**Sample Input:**
```typescript
formatISO('2024-01-15T14:30:45')
formatISO('2024-01-15T14:30:45', { includeTime: false })
formatISO('2024-01-15T14:30:45', { includeMilliseconds: true })
formatISO('2024-01-15T14:30:45', { includeTimezone: true })
```

**Sample Output:**
```typescript
// "2024-01-15T14:30:45"
// "2024-01-15"
// "2024-01-15T14:30:45.000"
// "2024-01-15T14:30:45-05:00"
```

### formatCustom(date, pattern, options?)
Formats a date using custom patterns.

**Sample Input:**
```typescript
formatCustom('2024-01-15T14:30:45', 'YYYY-MM-DD HH:mm:ss')
formatCustom('2024-01-15T14:30:45', 'MMM DD, YYYY')
formatCustom('2024-01-15T14:30:45', 'EEEE, MMMM Do, YYYY')
```

**Sample Output:**
```typescript
// "2024-01-15 14:30:45"
// "Jan 15, 2024"
// "Monday, January 15th, 2024"
```

### formatLocalized(date, locale?, options?)
Formats a date for a specific locale.

**Sample Input:**
```typescript
formatLocalized('2024-01-15T14:30:45', 'en-US')
formatLocalized('2024-01-15T14:30:45', 'fr-FR')
formatLocalized('2024-01-15T14:30:45', 'ja-JP')
```

**Sample Output:**
```typescript
// "1/15/2024, 2:30:45 PM"
// "15/01/2024 à 14:30:45"
// "2024/1/15 14:30:45"
```

### formatRelativeLocalized(date, locale?, options?)
Formats relative time in a specific locale.

**Sample Input:**
```typescript
formatRelativeLocalized('2024-01-13', 'en-US')  // 2 days ago
formatRelativeLocalized('2024-01-17', 'fr-FR')  // in 2 days
formatRelativeLocalized('2024-01-13', 'es-ES')  // 2 days ago in Spanish
```

**Sample Output:**
```typescript
// "2 days ago"
// "dans 2 jours"
// "hace 2 días"
```

### formatCalendar(date, referenceDate?)
Formats a date relative to a reference point.

**Sample Input:**
```typescript
formatCalendar('2024-01-15')      // Today
formatCalendar('2024-01-14')      // Yesterday
formatCalendar('2024-01-16')      // Tomorrow
formatCalendar('2024-01-20')      // This Saturday
```

**Sample Output:**
```typescript
// "Today"
// "Yesterday"
// "Tomorrow"
// "This Saturday"
```

### formatTimezone(date, timezone, format?)
Formats a date in a specific timezone.

**Sample Input:**
```typescript
formatTimezone('2024-01-15T14:30:00', 'America/New_York')
formatTimezone('2024-01-15T14:30:00', 'Europe/London')
formatTimezone('2024-01-15T14:30:00', 'Asia/Tokyo')
```

**Sample Output:**
```typescript
// "2024-01-15 09:30:00 EST"
// "2024-01-15 19:30:00 GMT"
// "2024-01-16 04:30:00 JST"
```

## Duration Formatting

### formatDuration(duration, options?)
Formats duration in milliseconds to human-readable format.

**Sample Input:**
```typescript
formatDuration(3600000)                           // 1 hour
formatDuration(90061000)                          // 1 day, 1 hour, 1 minute, 1 second
formatDuration(3600000, { longFormat: false })   // Short format
formatDuration(3600000, { maxUnits: 2 })         // Limit to 2 units
```

**Sample Output:**
```typescript
// "1 hour"
// "1 day, 1 hour, 1 minute, 1 second"
// "1h"
// "1 hour"
```

### humanizeDuration(startDate, endDate, options?)
Humanizes duration between two dates.

**Sample Input:**
```typescript
humanizeDuration('2024-01-15T09:00:00', '2024-01-15T17:30:00')
humanizeDuration('2024-01-15', '2024-01-18')
humanizeDuration('2024-01-15', '2024-03-15', { precision: 'month' })
```

**Sample Output:**
```typescript
// "8 hours 30 minutes"
// "3 days"
// "2 months"
```

### getRelativeTime(date, referenceDate?, options?)
Gets relative time description.

**Sample Input:**
```typescript
getRelativeTime('2024-01-13')       // 2 days ago
getRelativeTime('2024-01-17')       // in 2 days
getRelativeTime('2024-01-15T12:30:00', '2024-01-15T14:30:00')  // 2 hours ago
```

**Sample Output:**
```typescript
// "2 days ago"
// "in 2 days"
// "2 hours ago"
```

## Date Parsing

### parseISO(isoString)
Parses an ISO 8601 date string.

**Sample Input:**
```typescript
parseISO('2024-01-15T14:30:45')
parseISO('2024-01-15T14:30:45.123Z')
parseISO('2024-01-15T14:30:45-05:00')
parseISO('invalid-iso')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 14:30:45 GMT+0000 (UTC)
// Mon Jan 15 2024 14:30:45.123 GMT+0000 (UTC)
// Mon Jan 15 2024 19:30:45 GMT+0000 (UTC)
// null
```

### parseMultipleFormats(dateString, formats)
Attempts to parse a date using multiple format patterns.

**Sample Input:**
```typescript
parseMultipleFormats('15-01-2024', ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'])
parseMultipleFormats('Jan 15, 2024', ['MMM DD, YYYY', 'DD MMM YYYY'])
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
```

### smartParse(input, options?)
Intelligently parses various date formats.

**Sample Input:**
```typescript
smartParse('2024-01-15')
smartParse('Jan 15, 2024')
smartParse('15/01/2024')
smartParse('tomorrow')
smartParse('in 3 days')
```

**Sample Output:**
```typescript
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Mon Jan 15 2024 00:00:00 GMT+0000 (UTC)
// Tomorrow's date
// Date 3 days from now
```

## Timezone Information

### getTimezoneInfo(timezone)
Gets detailed information about a timezone.

**Sample Input:**
```typescript
getTimezoneInfo('America/New_York')
getTimezoneInfo('Europe/London')
getTimezoneInfo('Asia/Tokyo')
```

**Sample Output:**
```typescript
// {
//   timezone: 'America/New_York',
//   offset: -300,          // minutes from UTC
//   offsetString: 'UTC-05:00',
//   abbreviation: 'EST',
//   isDST: false,
//   dstStart: Date('2024-03-10T07:00:00.000Z'),
//   dstEnd: Date('2024-11-03T06:00:00.000Z')
// }
```

### listTimezones()
Lists all available IANA timezone identifiers.

**Sample Input:**
```typescript
listTimezones()
```

**Sample Output:**
```typescript
// [
//   'UTC',
//   'America/New_York',
//   'America/Chicago',
//   'America/Denver',
//   'America/Los_Angeles',
//   'Europe/London',
//   'Europe/Paris',
//   'Asia/Tokyo',
//   ...
// ]
```

---

# Utility Functions

## Date Arrays & Collections

### sortDates(dates, order?)
Sorts an array of dates.

**Sample Input:**
```typescript
sortDates(['2024-01-20', '2024-01-10', '2024-01-15'])
sortDates(['2024-01-20', '2024-01-10', '2024-01-15'], 'desc')
```

**Sample Output:**
```typescript
// [Wed Jan 10 2024, Mon Jan 15 2024, Sat Jan 20 2024]
// [Sat Jan 20 2024, Mon Jan 15 2024, Wed Jan 10 2024]
```

### minDate(...dates)
Finds the minimum (earliest) date.

**Sample Input:**
```typescript
minDate('2024-01-20', '2024-01-10', '2024-01-15')
```

**Sample Output:**
```typescript
// Wed Jan 10 2024 00:00:00 GMT+0000 (UTC)
```

### maxDate(...dates)
Finds the maximum (latest) date.

**Sample Input:**
```typescript
maxDate('2024-01-20', '2024-01-10', '2024-01-15')
```

**Sample Output:**
```typescript
// Sat Jan 20 2024 00:00:00 GMT+0000 (UTC)
```

### getEarliestDate(dateArray)
Gets the earliest date from an array.

**Sample Input:**
```typescript
getEarliestDate(['2024-01-20', '2024-01-10', '2024-01-15'])
```

**Sample Output:**
```typescript
// Wed Jan 10 2024 00:00:00 GMT+0000 (UTC)
```

### getLatestDate(dateArray)
Gets the latest date from an array.

**Sample Input:**
```typescript
getLatestDate(['2024-01-20', '2024-01-10', '2024-01-15'])
```

**Sample Output:**
```typescript
// Sat Jan 20 2024 00:00:00 GMT+0000 (UTC)
```

### removeDuplicateDates(dates)
Removes duplicate dates from an array.

**Sample Input:**
```typescript
removeDuplicateDates(['2024-01-15', '2024-01-20', '2024-01-15', '2024-01-10'])
```

**Sample Output:**
```typescript
// [Mon Jan 15 2024, Sat Jan 20 2024, Wed Jan 10 2024]
```

### findClosestDate(targetDate, dateArray)
Finds the date in an array closest to the target.

**Sample Input:**
```typescript
findClosestDate('2024-01-14', ['2024-01-10', '2024-01-15', '2024-01-20'])
```

**Sample Output:**
```typescript
// {
//   closestDate: Mon Jan 15 2024,
//   difference: 1,           // days
//   index: 1
// }
```

## Date Generation & Ranges

### generateDateRange(options)
Generates a range of dates based on options.

**Sample Input:**
```typescript
generateDateRange({
  start: '2024-01-15',
  end: '2024-01-20',
  unit: 'day'
})

generateDateRange({
  start: '2024-01-01',
  count: 5,
  unit: 'week'
})
```

**Sample Output:**
```typescript
// [Mon Jan 15 2024, Tue Jan 16 2024, Wed Jan 17 2024, Thu Jan 18 2024, Fri Jan 19 2024, Sat Jan 20 2024]

// [Mon Jan 01 2024, Mon Jan 08 2024, Mon Jan 15 2024, Mon Jan 22 2024, Mon Jan 29 2024]
```

### generateRecurringDates(startDate, pattern, options)
Generates recurring dates based on a pattern.

**Sample Input:**
```typescript
generateRecurringDates('2024-01-15', 'weekly', { count: 4 })
generateRecurringDates('2024-01-01', 'monthly', { until: '2024-04-01' })
generateRecurringDates('2024-01-15', 'custom', { interval: 3, unit: 'day', count: 5 })
```

**Sample Output:**
```typescript
// [Mon Jan 15 2024, Mon Jan 22 2024, Mon Jan 29 2024, Mon Feb 05 2024]
// [Mon Jan 01 2024, Thu Feb 01 2024, Fri Mar 01 2024]
// [Mon Jan 15 2024, Thu Jan 18 2024, Sun Jan 21 2024, Wed Jan 24 2024, Sat Jan 27 2024]
```

### randomDate(startDate?, endDate?)
Generates a random date within a range.

**Sample Input:**
```typescript
randomDate('2024-01-01', '2024-12-31')
randomDate()  // Any random date
```

**Sample Output:**
```typescript
// Random date between Jan 1 and Dec 31, 2024
// Any random date
```

## Advanced Calculations

### calculateAge(birthDate, referenceDate?)
Calculates age based on birth date.

**Sample Input:**
```typescript
calculateAge('1990-01-15')
calculateAge('1990-01-15', '2024-01-15')
calculateAge('1990-01-15', '2024-01-14')
```

**Sample Output:**
```typescript
// Current age based on today's date
// 34 (exact birthday)
// 33 (day before birthday)
```

### calculateAdvancedDuration(startDate, endDate, options?)
Calculates advanced duration with detailed breakdown.

**Sample Input:**
```typescript
calculateAdvancedDuration('2024-01-15T09:30:00', '2024-03-20T15:45:30', {
  includeMilliseconds: true,
  excludeWeekends: false
})
```

**Sample Output:**
```typescript
// {
//   total: {
//     milliseconds: 5589930000,
//     seconds: 5589930,
//     minutes: 93165.5,
//     hours: 1552.75,
//     days: 64.69
//   },
//   breakdown: {
//     years: 0,
//     months: 2,
//     days: 5,
//     hours: 6,
//     minutes: 15,
//     seconds: 30,
//     milliseconds: 0
//   },
//   businessDays: 46,
//   weekendDays: 19
// }
```

## Time Zone Conversion

### convertTimezone(date, fromTimezone, toTimezone, options?)
Converts dates between timezones with detailed options.

**Sample Input:**
```typescript
convertTimezone('2024-01-15T14:30:00', 'America/New_York', 'Europe/London', {
  preserveLocalTime: false,
  format: 'ISO'
})
```

**Sample Output:**
```typescript
// {
//   originalDate: Mon Jan 15 2024 14:30:00 GMT-0500 (EST),
//   convertedDate: Mon Jan 15 2024 19:30:00 GMT+0000 (GMT),
//   fromTimezone: 'America/New_York',
//   toTimezone: 'Europe/London',
//   offsetDifference: 300 // minutes
// }
```

---

This comprehensive documentation covers all 135+ functions in the ChronoUtilz library, organized by the Three Pillars Architecture with detailed sample inputs and expected outputs for each function.