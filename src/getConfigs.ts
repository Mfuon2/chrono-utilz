import { STANDARD_LOCALES } from './locales';
import { POPULAR_LOCALES } from './locales';
import { LOCALES_BY_REGION } from './locales';
import { ChronoUtilzConfig } from './ChronoUtilzConfig';
import { getBusinessDayConfig } from './getBusinessDayConfig';
import { holidayRules } from './holidayRules';
import { listTimezones } from './listTimezones';

/** Returns available format values, actual loaded holiday rule presets, timezone/locale catalogs and current business configuration. Large catalogs are loaded only when this API is imported. */
export function getConfigs(): ChronoUtilzConfig {
  const currentBusinessConfig = getBusinessDayConfig();

  return {
    dateFormats: [
      'YYYY-MM-DD',
      'MM/DD/YYYY',
      'DD/MM/YYYY',
      'YYYY-MM-DD HH:mm:ss',
      'DD MMM YYYY',
      'MMM DD, YYYY',
      'HH:mm:ss',
      'hh:mm A',
    ],

    timeUnits: [
      'millisecond',
      'second',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'quarter',
      'year',
    ],

    timezones: listTimezones(),

    naturalLanguageExpressions: [
      'now',
      'today',
      'tomorrow',
      'yesterday',
      'next week',
      'last week',
      'next month',
      'last month',
      'next year',
      'last year',
      'next monday',
      'next tuesday',
      'next wednesday',
      'next thursday',
      'next friday',
      'next saturday',
      'next sunday',
      'last monday',
      'last tuesday',
      'last wednesday',
      'last thursday',
      'last friday',
      'last saturday',
      'last sunday',
      'beginning of week',
      'end of week',
      'beginning of month',
      'end of month',
      'beginning of year',
      'end of year',
      'in 1 day',
      'in 2 days',
      'in 1 week',
      'in 2 weeks',
      'in 1 month',
      'in 2 months',
      '2 days ago',
      '1 week ago',
      '1 month ago',
    ],

    recurringPatterns: [
      'daily',
      'weekly',
      'biweekly',
      'monthly',
      'quarterly',
      'yearly',
      'weekdays',
      'weekends',
      'custom',
    ],

    businessDayConfig: {
      defaultWorkingDays: [1, 2, 3, 4, 5],
      currentWorkingDays: currentBusinessConfig.workingDays,
      defaultHolidays: [],
      currentHolidays: Array.from(currentBusinessConfig.holidays),
      workingDayNames: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      },
    },

    holidayConfig: {
      supportedCountries: Object.keys(holidayRules),
      availableHolidayRules: (() => {
        const rules: Record<string, Array<{ name: string; date: string; type: string }>> = {};
        for (const countryCode in holidayRules) {
          if (Object.prototype.hasOwnProperty.call(holidayRules, countryCode)) {
            rules[countryCode] = holidayRules[countryCode].map((holiday: any) => ({
              name: holiday.name,
              date: typeof holiday.date === 'string' ? holiday.date : 'calculated',
              type: holiday.type || 'floating',
            }));
          }
        }
        return rules;
      })(),
    },

    locales: {
      standard: [...STANDARD_LOCALES],
      popular: [...POPULAR_LOCALES],
      regions: Object.fromEntries(
        Object.entries(LOCALES_BY_REGION).map(([key, values]) => [key, [...values]]),
      ),
    },

    workingTimeDefaults: {
      startHour: 9,
      endHour: 17,
      workingDays: [1, 2, 3, 4, 5],
      timezone: 'UTC',
    },

    payrollFrequencies: [
      'weekly',
      'bi-weekly',
      'biweekly',
      'semi-monthly',
      'monthly',
      'semimonthly',
    ],

    seasonalConfig: {
      hemispheres: ['northern', 'southern'],
      seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
      timeOfDay: ['Night', 'Morning', 'Afternoon', 'Evening'],
    },

    formatTokens: {
      YYYY: '4-digit year (2024)',
      YY: '2-digit year (24)',
      MMMM: 'Full month name (January)',
      MMM: 'Short month name (Jan)',
      MM: '2-digit month (01-12)',
      M: 'Month number (1-12)',
      DD: '2-digit day (01-31)',
      D: 'Day number (1-31)',
      Do: 'Day with ordinal suffix (1st, 2nd, 3rd)',
      dddd: 'Full weekday name (Monday)',
      ddd: 'Short weekday name (Mon)',
      dd: 'Narrow weekday (M)',
      HH: '24-hour format hours (00-23)',
      hh: '12-hour format hours (01-12)',
      H: '24-hour format hours (0-23)',
      h: '12-hour format hours (1-12)',
      mm: 'Minutes (00-59)',
      m: 'Minutes (0-59)',
      ss: 'Seconds (00-59)',
      s: 'Seconds (0-59)',
      SSS: 'Milliseconds (000-999)',
      A: 'AM/PM (uppercase)',
      a: 'am/pm (lowercase)',
      Z: 'Timezone offset (+05:00)',
      ZZ: 'Timezone offset (+0500)',
      X: 'Unix timestamp (seconds)',
      x: 'Unix timestamp (milliseconds)',
    },

    fiscalYearDefaults: {
      startMonth: 1, // January
      startDay: 1, // 1st day
    },

    overtime: {
      defaultRegularHours: 40,
      defaultOvertimeMultiplier: 1.5,
      defaultDoubleTimeThreshold: 60,
    },
  };
}
