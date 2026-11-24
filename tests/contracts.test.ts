import { strict as assert } from 'assert';
import * as c from '../src';
import fc from 'fast-check';
import { getISOWeek as referenceISOWeek, addMonths as referenceAddMonths } from 'date-fns';

const date = (text = '2025-01-15T12:34:56.789') => new Date(text);
const local = (value: Date) => [
  value.getFullYear(),
  value.getMonth() + 1,
  value.getDate(),
  value.getHours(),
  value.getMinutes(),
  value.getSeconds(),
  value.getMilliseconds(),
];
const day = (value: Date) => local(value).slice(0, 3);
const config = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] };
const covered = new Set<string>();
function contract(name: keyof typeof c, check: () => void) {
  covered.add(name);
  it(name, check);
}

describe('Public API contracts', () => {
  beforeEach(() => {
    c.resetBusinessDayConfig();
    c.configureTimezone({ autoDetect: true });
  });
  afterEach(() => {
    c.resetBusinessDayConfig();
    c.configureTimezone({ autoDetect: true });
  });
  contract('parseDate', () => {
    assert.equal(c.parseDate('2025-02-29'), null);
    assert.equal(
      c.parseDate('2025-01-15T12:00:00+03:00')!.toISOString(),
      '2025-01-15T09:00:00.000Z',
    );
  });
  contract('createDate', () => {
    assert.deepEqual(local(c.createDate(2024, 1, 29, 13)), [2024, 2, 29, 13, 0, 0, 0]);
    assert.throws(() => c.createDate(2025, 1, 29));
    assert.equal(c.createDate(5, 0, 1).getFullYear(), 5);
  });
  contract('ChronoUtilzError', () =>
    assert.equal(new c.ChronoUtilzError('x').message, 'ChronoUtilz Error: x'),
  );
  contract('CalendarDate', () => {
    const d = new c.CalendarDate(2024, 1, 31);
    assert.equal(d.add(1, 'month').toString(), '2024-02-29');
    assert.equal(d.toString(), '2024-01-31');
    assert(d.equals(c.CalendarDate.fromString('2024-01-31')));
    assert(d.isBefore(d.add(1, 'day')));
    assert(d.add(1, 'day').isAfter(d));
  });
  contract('formatDate', () =>
    assert.equal(
      c.formatDate(new Date('2025-01-15T12:00:00Z'), 'YYYY-MM-DD HH:mm:ss', 'America/New_York'),
      '2025-01-15 07:00:00',
    ),
  );
  contract('addTime', () => {
    assert.deepEqual(day(c.addTime('2024-01-31', 1, 'month')), [2024, 2, 29]);
    assert.deepEqual(day(c.addTime('2024-02-29', 1, 'year')), [2025, 2, 28]);
    assert.deepEqual(day(c.addTime('2025-01-15', 1, 'quarter')), [2025, 4, 15]);
    assert.throws(() => c.addTime(date(), Infinity, 'day'));
  });
  contract('subtractTime', () =>
    assert.deepEqual(day(c.subtractTime('2025-01-01', 1, 'day')), [2024, 12, 31]),
  );
  contract('getDateDiff', () => {
    assert.equal(c.getDateDiff(0, 999, 'second'), 0);
    assert.equal(c.getDateDiff('2025-04-01', '2025-01-01', 'quarter'), 1);
  });
  contract('remainingTime', () => assert.equal(c.remainingTime(3000, 'second', 1000), 2));
  for (const name of ['isBetweenDates', 'isWithinRange'] as const)
    contract(name, () => {
      assert(c[name](2, 1, 3));
      assert(!c[name](1, 1, 3, false));
    });
  contract('isValidDate', () => {
    assert(!c.isValidDate('2025-04-31'));
    assert(!c.isValidDate(new Date(NaN)));
    assert(c.isValidDate(0));
  });
  contract('startOf', () =>
    assert.deepEqual(local(c.startOf(date(), 'quarter')), [2025, 1, 1, 0, 0, 0, 0]),
  );
  contract('endOf', () =>
    assert.deepEqual(local(c.endOf(date(), 'quarter')), [2025, 3, 31, 23, 59, 59, 999]),
  );
  contract('getDayOfYear', () => assert.equal(c.getDayOfYear('2024-12-31'), 366));
  for (const name of ['getWeekOfYear', 'getISOWeek'] as const)
    contract(name, () => {
      assert.equal(c[name]('2021-01-01'), 53);
      assert.equal(c[name]('2025-01-01'), 1);
    });
  contract('isLeapYear', () => {
    assert(c.isLeapYear(2000));
    assert(!c.isLeapYear(1900));
  });
  contract('getDaysInMonth', () => assert.equal(c.getDaysInMonth('2024-02-01'), 29));
  contract('getRelativeTime', () =>
    assert.equal(c.getRelativeTime('2025-01-15', '2025-02-15'), '1 month ago'),
  );
  contract('getTimezoneOffset', () =>
    assert.equal(c.getTimezoneOffset(date()), date().getTimezoneOffset()),
  );
  contract('utcNow', () => assert(Math.abs(c.utcNow().getTime() - Date.now()) < 100));
  contract('toUTC', () => assert.equal(c.toUTC(date()).getTime(), date().getTime()));
  contract('getTimezoneString', () => assert.match(c.getTimezoneString(), /^UTC[+-]\d{2}:\d{2}$/));
  contract('validateDateFormat', () => {
    assert(!c.validateDateFormat('02/31/2025', 'MM/DD/YYYY'));
    assert(c.validateDateFormat('31/01/2025', 'DD/MM/YYYY'));
    assert(!c.validateDateFormat('24:00:00', 'HH:mm:ss'));
  });
  contract('generateDateRange', () => {
    assert.deepEqual(c.generateDateRange({ start: '2025-01-01', end: '2025-01-03' }).map(day), [
      [2025, 1, 1],
      [2025, 1, 2],
      [2025, 1, 3],
    ]);
    assert.throws(() => c.generateDateRange({ start: '2025-01-01', end: '2025-01-03', step: 0 }));
  });
  contract('formatDuration', () =>
    assert.equal(c.formatDuration(3661000), '1 hour, 1 minute, 1 second'),
  );
  contract('getQuarter', () => assert.equal(c.getQuarter('2025-06-15'), 2));
  contract('getQuarterDate', () =>
    assert.deepEqual(day(c.getQuarterDate('2025-06-15', 'end')), [2025, 6, 30]),
  );
  contract('getBusinessDays', () => {
    c.configureHolidays(['2025-01-08']);
    assert.equal(c.getBusinessDays('2025-01-06', '2025-01-10'), 4);
  });
  contract('calculateAge', () =>
    assert.deepEqual(
      c.calculateAge('2024-01-31', {
        referenceDate: '2025-03-01',
        units: ['year', 'month', 'day'],
      }),
      { years: 1, months: 1, days: 1 },
    ),
  );
  contract('cloneDate', () => {
    const input = date(),
      out = c.cloneDate(input);
    assert.notEqual(out, input);
    assert.equal(+out, +input);
  });
  for (const name of ['minDate', 'maxDate'] as const)
    contract(name, () => assert.equal(+c[name](100, 200), name === 'minDate' ? 100 : 200));
  contract('roundToNearest', () =>
    assert.deepEqual(local(c.roundToNearest(date(), 'hour')), [2025, 1, 15, 13, 0, 0, 0]),
  );
  contract('compareDates', () => assert.equal(c.compareDates(100, 200), -1));
  contract('getTimestamp', () => assert.equal(c.getTimestamp(1234, true), 1));
  contract('fromTimestamp', () => assert.equal(+c.fromTimestamp(1234), 1234));
  contract('randomDate', () => {
    const d = +c.randomDate(100, 200);
    assert(d >= 100 && d <= 200);
    assert.throws(() => c.randomDate(200, 100));
  });
  contract('copyTime', () =>
    assert.deepEqual(local(c.copyTime(date(), '2025-01-01')), [2025, 1, 1, 12, 34, 56, 789]),
  );
  contract('truncateToUnit', () =>
    assert.deepEqual(local(c.truncateToUnit(date(), 'minute')), [2025, 1, 15, 12, 34, 0, 0]),
  );
  contract('setTime', () =>
    assert.deepEqual(local(c.setTime(date(), 9, 0, 0, 0)), [2025, 1, 15, 9, 0, 0, 0]),
  );
  for (const name of ['isSameDay', 'isSameWeek', 'isSameMonth', 'isSameYear'] as const)
    contract(name, () => {
      assert(c[name](date(), date()));
      assert(!c[name]('2025-01-01', '2026-02-15'));
    });
  contract('isAfter', () => assert(c.isAfter(2, 1)));
  contract('isBefore', () => assert(c.isBefore(1, 2)));
  contract('isValidRange', () => {
    assert(c.isValidRange(1, 2));
    assert(!c.isValidRange('bad', 2));
  });
  contract('sortDates', () => assert.deepEqual(c.sortDates([2, 1]).map(Number), [1, 2]));
  contract('getEarliestDate', () => assert.equal(+c.getEarliestDate([2, 1]), 1));
  contract('getLatestDate', () => assert.equal(+c.getLatestDate([2, 1]), 2));
  contract('removeDuplicateDates', () =>
    assert.deepEqual(c.removeDuplicateDates([1, 1, 2], 'millisecond').map(Number), [1, 2]),
  );
  for (const [name, input] of [
    ['isFirstDayOfMonth', '2025-02-01'],
    ['isLastDayOfMonth', '2024-02-29'],
    ['isFirstDayOfYear', '2025-01-01'],
    ['isLastDayOfYear', '2025-12-31'],
  ] as const)
    contract(name, () => assert(c[name](input)));
  contract('getWeekBoundaries', () =>
    assert.deepEqual(day(c.getWeekBoundaries('2025-01-15').start), [2025, 1, 13]),
  );
  contract('getMonthBoundaries', () =>
    assert.deepEqual(local(c.getMonthBoundaries('2024-02-15').end), [2024, 2, 29, 23, 59, 59, 999]),
  );
  contract('getYearBoundaries', () =>
    assert.deepEqual(day(c.getYearBoundaries(2025).end), [2025, 12, 31]),
  );
  contract('getQuarterBoundaries', () =>
    assert.deepEqual(day(c.getQuarterBoundaries(2025, 2).start), [2025, 4, 1]),
  );
  for (const name of ['stripTime', 'getMidnight'] as const)
    contract(name, () => assert.deepEqual(local(c[name](date())), [2025, 1, 15, 0, 0, 0, 0]));
  contract('getNoon', () => assert.deepEqual(local(c.getNoon(date())), [2025, 1, 15, 12, 0, 0, 0]));
  contract('configureWorkingDays', () => {
    assert.deepEqual(c.configureWorkingDays([6, 1, 1]).workingDays, [1, 6]);
    assert.throws(() => c.configureWorkingDays([]));
  });
  contract('configureHolidays', () =>
    assert(c.configureHolidays(['2025-01-01']).holidays.has('2025-01-01')),
  );
  contract('getBusinessDayConfig', () => {
    const config = c.getBusinessDayConfig();
    config.workingDays.length = 0;
    assert.equal(c.getBusinessDayConfig().workingDays.length, 5);
  });
  contract('resetBusinessDayConfig', () => {
    c.configureWorkingDays([0]);
    assert.deepEqual(c.resetBusinessDayConfig().workingDays, [1, 2, 3, 4, 5]);
  });
  contract('isWeekend', () => assert(c.isWeekend('2025-01-04')));
  contract('isWeekday', () => assert(c.isWeekday('2025-01-06')));
  contract('isBusinessDay', () => {
    c.addCustomHolidays(['2025-01-06']);
    assert(!c.isBusinessDay('2025-01-06'));
  });
  contract('addBusinessDays', () =>
    assert.deepEqual(day(c.addBusinessDays('2025-01-03', 1)), [2025, 1, 6]),
  );
  contract('subtractBusinessDays', () =>
    assert.deepEqual(day(c.subtractBusinessDays('2025-01-06', 1)), [2025, 1, 3]),
  );
  contract('getNextBusinessDay', () =>
    assert.deepEqual(day(c.getNextBusinessDay('2025-01-03')), [2025, 1, 6]),
  );
  contract('getPreviousBusinessDay', () =>
    assert.deepEqual(day(c.getPreviousBusinessDay('2025-01-06')), [2025, 1, 3]),
  );
  contract('businessDaysInMonth', () => assert.equal(c.businessDaysInMonth(2025, 1), 23));
  contract('differenceInBusinessDays', () =>
    assert.equal(c.differenceInBusinessDays('2025-01-06', '2025-01-10'), 4),
  );
  contract('isFirstBusinessDayOfMonth', () => {
    assert(c.isFirstBusinessDayOfMonth('2025-01-01T12:00:00'));
    assert(!c.isFirstBusinessDayOfMonth('2025-01-02'));
  });
  contract('isLastBusinessDayOfMonth', () =>
    assert(c.isLastBusinessDayOfMonth('2025-01-31T12:00:00')),
  );
  contract('getBusinessDaysInMonth', () =>
    assert.equal(c.getBusinessDaysInMonth(2025, 1).length, 23),
  );
  contract('isHoliday', () => {
    c.configureHolidays(['2025-01-01']);
    assert(c.isHoliday('2025-01-01'));
  });
  contract('getHolidays', () => {
    assert(c.getHolidays(2025, 'US').some((d) => d.getMonth() === 11 && d.getDate() === 25));
    assert.throws(() => c.getHolidays(2025, 'XX'));
  });
  contract('addHolidayRules', () => {
    c.addHolidayRules('TEST', [{ name: 'Test', date: '01-02' }]);
    assert.deepEqual(day(c.getHolidays(2025, 'TEST')[0]), [2025, 1, 2]);
  });
  contract('getNextHoliday', () =>
    assert.deepEqual(day(c.getNextHoliday('2025-12-24', 'US')!), [2025, 12, 25]),
  );
  contract('addCustomHolidays', () => {
    c.addCustomHolidays(['2025-01-06']);
    assert(c.isHoliday('2025-01-06'));
  });
  contract('calculateBusinessDaysCustom', () =>
    assert.equal(
      c.calculateBusinessDaysCustom('2025-01-06', '2025-01-10', {
        workingDays: [1, 2, 3, 4, 5],
        holidays: ['2025-01-08'],
      }),
      3,
    ),
  );
  contract('getWorkingHoursBetween', () =>
    assert.equal(
      c.getWorkingHoursBetween('2025-01-06T10:00:00', '2025-01-07T12:00:00', {
        start: '09:00',
        end: '17:00',
        days: [1, 2, 3, 4, 5],
      }),
      10,
    ),
  );
  contract('addWorkingHours', () =>
    assert.deepEqual(local(c.addWorkingHours('2025-01-03T16:00:00', 2)), [2025, 1, 6, 10, 0, 0, 0]),
  );
  contract('isWorkingHours', () => {
    assert(c.isWorkingHours('2025-01-06T09:00:00'));
    assert(!c.isWorkingHours('2025-01-06T17:00:00'));
  });
  contract('getNextWorkingHour', () =>
    assert.deepEqual(local(c.getNextWorkingHour('2025-01-06T08:00:00')), [2025, 1, 6, 9, 0, 0, 0]),
  );
  contract('mergeDateTime', () =>
    assert.deepEqual(local(c.mergeDateTime('2025-01-01', date())), [2025, 1, 1, 12, 34, 56, 789]),
  );
  contract('timeOfDay', () => assert.equal(c.timeOfDay(date()), 'Afternoon'));
  contract('getWeekOfMonth', () => assert.equal(c.getWeekOfMonth('2025-06-01'), 1));
  contract('getFiscalQuarter', () => assert.equal(c.getFiscalQuarter('2025-01-01', 4), 4));
  contract('getFiscalYear', () => assert.equal(c.getFiscalYear('2025-01-01', 4), 2024));
  contract('getPayPeriods', () =>
    assert.deepEqual(c.getPayPeriods('2025-01-01', '2025-01-20', 'weekly').map(day), [
      [2025, 1, 1],
      [2025, 1, 8],
      [2025, 1, 15],
    ]),
  );
  contract('getSeason', () => assert.equal(c.getSeason('2025-07-01', 'southern'), 'Winter'));
  contract('getMonthName', () => assert.equal(c.getMonthName(2), 'February'));
  contract('getMonthsInQuarter', () =>
    assert.deepEqual(
      c.getMonthsInQuarter(2, 2025).months.map((m) => m.number),
      [4, 5, 6],
    ),
  );
  contract('nextOccurrence', () =>
    assert.deepEqual(day(c.nextOccurrence('2025-01-06', 1)), [2025, 1, 13]),
  );
  contract('previousOccurrence', () =>
    assert.deepEqual(day(c.previousOccurrence('2025-01-06', 1)), [2024, 12, 30]),
  );
  contract('convertTimezone', () => {
    const d = new Date('2025-01-01T12:00:00Z');
    assert.equal(+c.convertTimezone(d, { from: 'UTC', to: 'America/New_York' }), +d);
    assert.equal(
      c
        .convertTimezone(d, { from: 'UTC', to: 'America/New_York', preserveTime: true })
        .toISOString(),
      '2025-01-01T17:00:00.000Z',
    );
  });
  contract('parseNaturalLanguage', () =>
    assert.deepEqual(
      day(c.parseNaturalLanguage('next friday', { baseDate: date() })!),
      [2025, 1, 17],
    ),
  );
  contract('generateRecurringDates', () => {
    assert.deepEqual(
      c.generateRecurringDates('2025-01-01', { pattern: 'weekly', maxOccurrences: 2 }).map(day),
      [
        [2025, 1, 1],
        [2025, 1, 8],
      ],
    );
    assert.throws(() => c.generateRecurringDates(date(), { pattern: 'daily', interval: -1 }));
  });
  contract('compareDetailed', () =>
    assert.deepEqual(c.compareDetailed('2024-01-31', '2025-03-01').difference, {
      years: 1,
      months: 1,
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
  );
  contract('calculateAdvancedDuration', () =>
    assert.equal(
      c.calculateAdvancedDuration('2025-01-01', '2025-01-03', { units: ['day'] }),
      '2 days',
    ),
  );
  contract('getNthWeekdayOfMonth', () =>
    assert.deepEqual(day(c.getNthWeekdayOfMonth(2025, 1, 1, -1)!), [2025, 1, 27]),
  );
  contract('calculateBusinessDaysAdvanced', () =>
    assert.equal(c.calculateBusinessDaysAdvanced('2025-01-06', '2025-01-10'), 5),
  );
  contract('findClosestDate', () => assert.equal(+c.findClosestDate(10, [1, 12, 30])!, 12));
  contract('getFiscalPeriodAdvanced', () => {
    const p = c.getFiscalPeriodAdvanced('2025-01-20', { startMonth: 4, startDay: 1 });
    assert.equal(p.quarter, 4);
    assert.equal(p.year, 2024);
    assert.deepEqual(day(p.startDate), [2025, 1, 1]);
    assert.deepEqual(local(p.endDate), [2025, 3, 31, 23, 59, 59, 999]);
  });
  contract('calculateWorkingHours', () =>
    assert.equal(c.calculateWorkingHours('2025-01-06T16:00:00', '2025-01-07T10:00:00', config), 2),
  );
  contract('generatePayrollPeriods', () => {
    const periods = c.generatePayrollPeriods(2025, 'semimonthly');
    assert.equal(periods.length, 24);
    assert.deepEqual(local(periods[0].endDate), [2025, 1, 15, 23, 59, 59, 999]);
  });
  contract('calculateProjectMilestones', () =>
    assert.deepEqual(c.calculateProjectMilestones('2025-01-03', [1, 2]).map(day), [
      [2025, 1, 3],
      [2025, 1, 6],
      [2025, 1, 8],
    ]),
  );
  contract('generateBusinessCalendar', () => {
    const cal = c.generateBusinessCalendar(2025, 1);
    assert.equal(cal.length, 31);
    assert.equal(cal.filter((d) => d.isWorkingDay).length, 23);
  });
  contract('calculateOvertime', () =>
    assert.deepEqual(c.calculateOvertime(65, 40, 1.5, 60), {
      regularHours: 40,
      overtimeHours: 20,
      doubleTimeHours: 5,
      totalRegularPay: 40,
      totalOvertimePay: 30,
      totalDoubleTimePay: 10,
    }),
  );
  contract('generateShiftSchedule', () =>
    assert.deepEqual(
      c
        .generateShiftSchedule(
          '2025-01-01',
          [{ name: 'A', startHour: 22, duration: 8, daysOn: 1, daysOff: 1 }],
          3,
        )
        .map((s) => s.isWorkDay),
      [true, false, true],
    ),
  );
  contract('calculateSLACompliance', () =>
    assert.deepEqual(c.calculateSLACompliance('2025-01-06T09:00:00', '2025-01-06T12:00:00', 2), {
      actualHours: 3,
      slaHours: 2,
      isCompliant: false,
      breachHours: 1,
      percentageOfSLA: 150,
    }),
  );
  contract('formatISO', () =>
    assert.equal(c.formatISO(new Date('2025-01-01T12:00:00Z')), '2025-01-01T12:00:00Z'),
  );
  contract('formatCustom', () =>
    assert.equal(c.formatCustom(date(), 'MMMM [day] Do, YYYY'), 'January day 15th, 2025'),
  );
  contract('formatLocalized', () =>
    assert.equal(
      c.formatLocalized(new Date('2025-01-15T12:00:00Z'), 'en-US', { timeZone: 'UTC' }),
      '1/15/2025',
    ),
  );
  contract('formatRelativeLocalized', () =>
    assert.equal(
      c.formatRelativeLocalized(new Date(+date() + 60000), 'en-US', date()),
      'in 1 minute',
    ),
  );
  contract('formatCalendar', () => {
    assert.equal(c.formatCalendar('2025-01-16T00:01:00', date()), 'Tomorrow');
    assert.equal(c.formatCalendar('2025-01-14', date()), 'Yesterday');
  });
  contract('formatTimezone', () =>
    assert.equal(
      c.formatTimezone(new Date('2025-01-15T12:00:00Z'), 'UTC', {
        locale: 'en-GB',
        use24Hour: true,
      }),
      '15/01/2025, 12:00',
    ),
  );
  contract('humanizeDuration', () => assert.equal(c.humanizeDuration(3661000), '1 hour, 1 minute'));
  contract('parseISO', () => {
    assert.equal(c.parseISO('2025-02-30'), null);
    assert.equal(+c.parseISO('2025-01-01T12:00:00Z')!, Date.parse('2025-01-01T12:00:00Z'));
  });
  contract('parseMultipleFormats', () =>
    assert.deepEqual(day(c.parseMultipleFormats('01/02/2025', ['DD/MM/YYYY'])!), [2025, 2, 1]),
  );
  contract('smartParse', () => assert.equal(c.smartParse('2025-02-31'), null));
  contract('getTimezoneInfo', () => {
    assert.equal(c.getTimezoneInfo('Asia/Kathmandu', date()).offset, 5.75);
    assert(c.getTimezoneInfo('America/New_York', new Date('2025-07-01T00:00:00Z')).isDST);
    assert(!c.getTimezoneInfo('America/New_York', new Date('2025-01-01T00:00:00Z')).isDST);
  });
  contract('listTimezones', () => {
    const zones = c.listTimezones();
    assert(zones.includes('Africa/Nairobi'));
    zones.length = 0;
    assert(c.listTimezones().length > 100);
  });
  contract('getTimezonesByRegion', () =>
    assert(c.getTimezonesByRegion('Africa').every((z) => z.id.startsWith('Africa/'))),
  );
  contract('searchTimezones', () =>
    assert(c.searchTimezones('Nairobi').some((z) => z.id === 'Africa/Nairobi')),
  );
  contract('getTimezonesByOffset', () =>
    assert(c.getTimezonesByOffset(3).some((z) => z.id === 'Africa/Nairobi')),
  );
  contract('getUserTimezone', () =>
    assert.equal(c.getUserTimezone(), Intl.DateTimeFormat().resolvedOptions().timeZone),
  );
  contract('configureTimezone', () => {
    c.configureTimezone({ defaultTimezone: 'UTC', autoDetect: false });
    assert.equal(c.formatDate(new Date('2025-01-01T00:00:00Z'), 'HH:mm:ss'), '00:00:00');
    assert.throws(() => c.configureTimezone({ defaultTimezone: 'bad/zone' }));
  });
  contract('getTimezoneConfig', () => {
    c.configureTimezone({ defaultTimezone: 'UTC', autoDetect: false });
    assert.equal(c.getTimezoneConfig().currentEffectiveTimezone, 'UTC');
  });
  contract('getConfigs', () => {
    const cfg = c.getConfigs();
    for (const country of cfg.holidayConfig.supportedCountries)
      assert.doesNotThrow(() => c.getHolidays(2025, country));
    for (const format of cfg.dateFormats)
      assert.doesNotThrow(() => c.formatDate(date(), format as c.DateFormat));
  });
  it('has an explicit contract test for every public callable export', () => {
    const missing = Object.entries(c)
      .filter(([name, value]) => typeof value === 'function' && !covered.has(name))
      .map(([name]) => name);
    assert.deepEqual(missing, []);
    for (const name of covered)
      assert.equal(c.ChronoUtilz[name as keyof typeof c.ChronoUtilz], c[name as keyof typeof c]);
  });
});

describe('Timezone and calendar regressions', () => {
  it('resolves explicit offsets and rejects DST gaps and folds', () => {
    assert.equal(c.parseDate('2025-03-09T02:30:00', { timezone: 'America/New_York' }), null);
    assert.equal(c.parseDate('2025-11-02T01:30:00', { timezone: 'America/New_York' }), null);
    assert.equal(
      c.parseDate('2025-03-09T03:30:00', { timezone: 'America/New_York' })!.toISOString(),
      '2025-03-09T07:30:00.000Z',
    );
    assert.equal(
      c.parseDate('2025-11-02T01:30:00-04:00')!.toISOString(),
      '2025-11-02T05:30:00.000Z',
    );
  });
  it('distinguishes elapsed hours from zoned calendar days across DST', () => {
    const start = new Date('2025-03-08T17:00:00Z');
    assert.equal(
      c.addTime(start, 1, 'day', 'America/New_York').toISOString(),
      '2025-03-09T16:00:00.000Z',
    );
    assert.equal(
      c.addTime(start, 24, 'hour', 'America/New_York').toISOString(),
      '2025-03-09T17:00:00.000Z',
    );
    const end = new Date('2025-11-01T16:00:00Z');
    assert.equal(
      c.addTime(end, 1, 'day', 'America/New_York').toISOString(),
      '2025-11-02T17:00:00.000Z',
    );
  });
  it('calculates overnight, partial-day and zoned work intervals', () => {
    assert.equal(
      c.calculateWorkingHours('2025-01-06T23:00:00', '2025-01-07T03:00:00', {
        ...config,
        startHour: 22,
        endHour: 6,
      }),
      4,
    );
    assert.equal(
      c.calculateWorkingHours('2025-01-06T14:00:00Z', '2025-01-06T22:00:00Z', {
        ...config,
        timezone: 'America/New_York',
      }),
      8,
    );
    assert.equal(
      c.calculateWorkingHours('2025-01-06T09:00:00', '2025-01-07T17:00:00', {
        ...config,
        excludeHolidays: true,
        holidayConfig: { customHolidays: [date('2025-01-06T00:00:00')] },
      }),
      8,
    );
  });
  it('does not mutate inputs or leak configuration through returned arrays', () => {
    const d = date(),
      stamp = +d;
    c.addTime(d, 1, 'month');
    c.startOf(d, 'day');
    c.setTime(d, 0);
    assert.equal(+d, stamp);
    const cfg = c.configureWorkingDays([1, 2, 3]);
    cfg.workingDays.length = 0;
    assert.deepEqual(c.getBusinessDayConfig().workingDays, [1, 2, 3]);
    c.resetBusinessDayConfig();
  });
  it('terminates or rejects invalid generators and working schedules', () => {
    assert.throws(() => c.addWorkingHours(date(), 1, { start: '17:00', end: '17:00' }));
    assert.throws(() => c.addWorkingHours(date(), 1, { start: '09:00', end: '17:00', days: [] }));
    assert.throws(() => c.getPayPeriods(0, 100, 'invalid' as c.PayPeriodFrequency));
    assert.throws(() => c.generateRecurringDates(date(), { pattern: 'custom', daysOfWeek: [] }));
    assert.equal(
      c.generateRecurringDates(date(), { pattern: 'daily', maxOccurrences: 0 }).length,
      0,
    );
    assert.equal(
      c.generateRecurringDates(date(), { pattern: 'daily', endDate: new Date(0) }).length,
      0,
    );
  });
  it('matches independent ISO week and clamped month arithmetic over generated dates', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2000, max: 2099 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 28 }),
        fc.integer({ min: -24, max: 24 }),
        (y, m, d, n) => {
          const input = new Date(y, m, d, 12);
          assert.equal(c.getISOWeek(input), referenceISOWeek(input));
          assert.equal(+c.addTime(input, n, 'month'), +referenceAddMonths(input, n));
        },
      ),
      { numRuns: 500, seed: 20261124 },
    );
  });
  it('preserves instants through ISO round trips and reversible elapsed arithmetic', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 4000000000000 }),
        fc.integer({ min: -1000, max: 1000 }),
        (stamp, n) => {
          const d = new Date(stamp);
          assert.equal(+c.parseISO(c.formatISO(d, { includeMilliseconds: true }))!, stamp);
          assert.equal(+c.subtractTime(c.addTime(d, n, 'hour'), n, 'hour'), stamp);
          assert.equal(c.getDateDiff(d, new Date(stamp + 999), 'second'), 0);
        },
      ),
      { numRuns: 500, seed: 20261124 },
    );
  });
});

describe('Arithmetic and validation fault detection', () => {
  it('implements Gregorian leap years for ordinary years, centuries and dates', () => {
    for (let year = 1600; year <= 2400; year++)
      assert.equal(c.isLeapYear(year), new Date(year, 1, 29).getMonth() === 1, `year ${year}`);
    assert(c.isLeapYear(new Date(2024, 1, 1)));
    assert(!c.isLeapYear('2025-01-01'));
    assert.throws(() => c.isLeapYear(2024.5), {
      name: 'ChronoUtilzError',
      message: 'ChronoUtilz Error: Year must be an integer',
    });
    assert.throws(() => c.isLeapYear('invalid-date'), { name: 'ChronoUtilzError' });
    assert.throws(() => c.isLeapYear(NaN));
  });
  it('supports explicit timestamp units and rejects nonfinite values', () => {
    assert.equal(+c.fromTimestamp(1234, true), 1234000);
    assert.equal(+c.fromTimestamp(-1234, true), -1234000);
    assert.throws(() => c.fromTimestamp(Infinity), {
      name: 'RangeError',
      message: 'Timestamp must be finite',
    });
    assert.throws(() => c.fromTimestamp(NaN), {
      name: 'RangeError',
      message: 'Timestamp must be finite',
    });
  });
  it('validates both conversion zones and defaults the source to UTC', () => {
    const d = new Date('2025-01-01T12:00:00Z');
    assert.throws(() => c.convertTimezone(d, { to: 'Invalid/Zone' }));
    assert.throws(() => c.convertTimezone(d, { from: 'Invalid/Zone', to: 'UTC' }));
    assert.equal(
      c.convertTimezone(d, { to: 'America/New_York', preserveTime: true }).toISOString(),
      '2025-01-01T17:00:00.000Z',
    );
    assert.notEqual(c.convertTimezone(d, { to: 'UTC' }), d);
    assert.equal(
      c
        .convertTimezone(d, { from: 'Africa/Nairobi', to: 'America/New_York', preserveTime: true })
        .toISOString(),
      '2025-01-01T20:00:00.000Z',
    );
  });
  it('reports library errors for invalid ISO-week inputs', () =>
    assert.throws(() => c.getISOWeek('invalid-date'), { name: 'ChronoUtilzError' }));
});

describe('Zoned business calendars and historical calendar years', () => {
  afterEach(() => {
    c.resetBusinessDayConfig();
    c.configureTimezone({ autoDetect: true });
  });
  it('uses the selected weekday and holiday date across midnight', () => {
    c.configureHolidays(['2025-01-06']);
    assert(c.isHoliday('2025-01-05T22:00:00Z', undefined, 'Africa/Nairobi'));
    assert.equal(
      c.addBusinessDays('2025-01-03T20:30:00Z', 1, 'Africa/Nairobi').toISOString(),
      '2025-01-07T20:30:00.000Z',
    );
  });
  it('resolves natural expressions against the selected calendar timezone', () => {
    const d = c.parseNaturalLanguage('today', {
      baseDate: new Date('2025-01-01T22:00:00Z'),
      timezone: 'Africa/Nairobi',
    });
    assert.equal(d!.toISOString(), '2025-01-01T21:00:00.000Z');
  });
  it('keeps date-only years below 100 without the Date constructor century adjustment', () => {
    const d = new c.CalendarDate(5, 1, 1);
    assert.equal(d.toString(), '0005-01-01');
    assert.equal(d.toDate().getFullYear(), 5);
    assert.equal(c.getDaysInMonth(c.createDate(4, 1, 1)), 29);
    assert.equal(c.getDayOfYear(c.createDate(4, 11, 31)), 366);
  });
  it('isolates locale configuration and supports mid-month pay anchors', () => {
    const cfg = c.getConfigs();
    const original = cfg.locales.regions.Europe?.length;
    if (original) {
      cfg.locales.regions.Europe.length = 0;
      assert.equal(c.getConfigs().locales.regions.Europe.length, original);
    }
    assert.deepEqual(c.getPayPeriods('2025-01-06', '2025-02-01', 'semi-monthly').map(day), [
      [2025, 1, 6],
      [2025, 1, 15],
      [2025, 2, 1],
    ]);
  });
});

describe('Boundaries and invalid input contracts', () => {
  it('checks all calendar truncation and boundary units', () => {
    const input = date();
    for (const unit of ['hour', 'day', 'week', 'month', 'quarter', 'year'] as const) {
      const start = c.startOf(input, unit),
        end = c.endOf(input, unit);
      assert(start <= input && end >= input);
      assert.equal(+c.truncateToUnit(input, unit), +start);
      assert.equal(end.getMilliseconds(), 999);
    }
    assert.equal(c.truncateToUnit(input, 'second').getMilliseconds(), 0);
    assert.equal(+c.truncateToUnit(input, 'millisecond'), +input);
    for (const unit of ['minute', 'hour', 'day'] as const)
      assert(c.roundToNearest(input, unit) instanceof Date);
  });
  it('validates invalid date inputs across date-first APIs', () => {
    const cases: Array<() => unknown> = [
      () => c.cloneDate('bad'),
      () => c.minDate('bad'),
      () => c.maxDate('bad'),
      () => c.startOf('bad', 'day'),
      () => c.endOf('bad', 'day'),
      () => c.getDayOfYear('bad'),
      () => c.getDaysInMonth('bad'),
      () => c.formatDate('bad'),
      () => c.getRelativeTime('bad'),
      () => c.getTimezoneOffset('bad'),
      () => c.getQuarter('bad'),
      () => c.getQuarterDate('bad', 'start'),
      () => c.calculateAge('bad'),
      () => c.compareDates('bad', 0),
      () => c.getTimestamp('bad'),
      () => c.copyTime('bad', 0),
      () => c.setTime('bad', 0),
      () => c.isSameDay('bad', 0),
      () => c.isSameWeek('bad', 0),
      () => c.isSameMonth('bad', 0),
      () => c.isSameYear('bad', 0),
      () => c.isAfter('bad', 0),
      () => c.isBefore('bad', 0),
      () => c.isFirstDayOfMonth('bad'),
      () => c.isLastDayOfMonth('bad'),
      () => c.isFirstDayOfYear('bad'),
      () => c.isLastDayOfYear('bad'),
      () => c.getWeekBoundaries('bad'),
      () => c.getMonthBoundaries('bad'),
      () => c.stripTime('bad'),
      () => c.getNoon('bad'),
      () => c.isWeekend('bad'),
      () => c.isBusinessDay('bad'),
      () => c.getNextBusinessDay('bad'),
      () => c.getPreviousBusinessDay('bad'),
      () => c.differenceInBusinessDays('bad', 0),
      () => c.getNextHoliday('bad'),
      () => c.isWorkingHours('bad'),
      () => c.addWorkingHours('bad', 1),
      () => c.mergeDateTime('bad', 0),
      () => c.timeOfDay('bad'),
      () => c.nextOccurrence('bad', 1),
      () => c.previousOccurrence('bad', 1),
      () => c.compareDetailed('bad', 0),
      () => c.formatISO('bad'),
      () => c.formatCustom('bad', 'YYYY'),
      () => c.formatLocalized('bad'),
      () => c.formatCalendar('bad'),
      () => c.formatTimezone('bad', 'UTC'),
    ];
    for (const operation of cases) assert.throws(operation);
  });
  it('checks time components and invalid calendar selectors', () => {
    for (const values of [[24], [9, 60], [9, 0, 60], [9, 0, 0, 1000]])
      assert.throws(() => c.setTime(date(), values[0], values[1], values[2], values[3]));
    assert.throws(() => c.getYearBoundaries(99));
    assert.throws(() => c.getQuarterBoundaries(2025, 0));
    assert.throws(() => c.getMonthName(13));
    assert.throws(() => c.getWeekBoundaries(date(), 7));
    assert.throws(() => c.getNthWeekdayOfMonth(2025, 1, 1, 0));
    assert.equal(c.getNthWeekdayOfMonth(2025, 2, 1, 5), null);
    assert.throws(() => c.getFiscalQuarter(date(), 0));
    assert.throws(() => c.getFiscalYear(date(), 0));
    assert.throws(() => c.getEarliestDate([]));
    assert.throws(() => c.getLatestDate([]));
  });
  it('exercises fixed formats, calendar classes and all approximate duration options', () => {
    const d = new c.CalendarDate(2025, 1, 15);
    assert.equal(d.year, 2025);
    assert.equal(d.month, 1);
    assert.equal(d.day, 15);
    assert(d.equals(c.CalendarDate.fromDate(d.toDate())));
    assert(!d.equals(d.add(1, 'day')));
    assert.equal(d.compare(d), 0);
    assert.equal(c.formatDate(date(), 'DD MMM YYYY'), '15 Jan 2025');
    assert.equal(c.formatDate(date(), 'hh:mm A'), '12:34 PM');
    assert.equal(c.humanizeDuration(3661000, { units: ['minute'] }), '61 minutes');
    assert.equal(c.formatDuration(-1000, { longFormat: false }), '-1s');
    assert.throws(() => c.formatDuration(Infinity));
    assert.throws(() => c.humanizeDuration(NaN));
    assert.equal(
      c.calculateAdvancedDuration('2025-01-01', '2025-01-02', { format: 'short', units: ['day'] }),
      '1 d',
    );
  });
  it('verifies recurring holidays against official recurring calendar fixtures', () => {
    const us = c.getHolidays(2026, 'US').map((d) => c.formatCustom(d, 'MM-DD'));
    assert.deepEqual(us, [
      '01-01',
      '01-19',
      '02-16',
      '05-25',
      '06-19',
      '07-04',
      '09-07',
      '10-12',
      '11-11',
      '11-26',
      '12-25',
    ]);
    const uk = c.getHolidays(2026, 'UK').map((d) => c.formatCustom(d, 'MM-DD'));
    assert.deepEqual(uk, ['01-01', '04-03', '04-06', '05-04', '05-25', '08-31', '12-25', '12-26']);
  });
});

describe('Recurring anchors and calendar timezone options', () => {
  afterEach(() => c.resetBusinessDayConfig());
  it('restores the original day after a short month', () =>
    assert.deepEqual(
      c.generateRecurringDates('2025-01-31', { pattern: 'monthly', maxOccurrences: 3 }).map(day),
      [
        [2025, 1, 31],
        [2025, 2, 28],
        [2025, 3, 31],
      ],
    ));
  it('honors weekend intervals and rejects calendars with no weekend', () => {
    assert.deepEqual(
      c
        .generateRecurringDates('2025-01-03', {
          pattern: 'weekends',
          interval: 2,
          maxOccurrences: 2,
        })
        .map(day),
      [
        [2025, 1, 3],
        [2025, 1, 5],
      ],
    );
    c.configureWorkingDays([0, 1, 2, 3, 4, 5, 6]);
    assert.throws(() => c.generateRecurringDates('2025-01-03', { pattern: 'weekends' }));
  });
  it('uses the requested calendar zone for returned dates and event membership', () => {
    const cal = c.generateBusinessCalendar(
      2025,
      1,
      [{ title: 'Event', startDate: new Date('2025-01-01T22:00:00Z') }],
      { ...config, timezone: 'Africa/Nairobi' },
    );
    assert.equal(cal[0].date.toISOString(), '2024-12-31T21:00:00.000Z');
    assert.equal(cal[1].events.length, 1);
    assert.equal(cal[0].events.length, 0);
  });
});

describe('Small-year calendar boundaries', () => {
  it('preserves four-digit years across month/quarter helpers and holidays', () => {
    const d = c.createDate(4, 1, 15);
    assert.equal(c.getMonthBoundaries(d).start.getFullYear(), 4);
    assert.equal(c.getQuarterDate(d, 'end').getFullYear(), 4);
    assert.equal(c.getMonthsInQuarter(1, 4).months[1].lastDay.getDate(), 29);
    assert.equal(c.formatCustom(d, 'YYYY YY'), '0004 04');
    c.configureHolidays([d]);
    assert(c.isBusinessDay(d) === false);
    c.resetBusinessDayConfig();
    assert.equal(c.formatCalendar(c.createDate(4, 2, 1), c.createDate(4, 1, 29)), 'Tomorrow');
  });
});
