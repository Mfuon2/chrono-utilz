import { HolidayRule } from './HolidayRule';
/** Built-in recurring presets: US federal and UK England/Wales. Actual dates only. */
export const holidayRules: Record<string, HolidayRule[]> = {
  US: [
    { name: "New Year's Day", date: '01-01', type: 'fixed' },
    { name: 'Martin Luther King Jr. Day', date: (year) => nth(year, 0, 1, 3) },
    { name: "Washington's Birthday", date: (year) => nth(year, 1, 1, 3) },
    { name: 'Memorial Day', date: (year) => nth(year, 4, 1, -1) },
    { name: 'Juneteenth', date: '06-19', type: 'fixed' },
    { name: 'Independence Day', date: '07-04', type: 'fixed' },
    { name: 'Labor Day', date: (year) => nth(year, 8, 1, 1) },
    { name: 'Columbus Day', date: (year) => nth(year, 9, 1, 2) },
    { name: 'Veterans Day', date: '11-11', type: 'fixed' },
    { name: 'Thanksgiving Day', date: (year) => nth(year, 10, 4, 4) },
    { name: 'Christmas Day', date: '12-25', type: 'fixed' },
  ],
  UK: [
    { name: "New Year's Day", date: '01-01', type: 'fixed' },
    { name: 'Good Friday', date: (year) => easter(year, -2) },
    { name: 'Easter Monday', date: (year) => easter(year, 1) },
    { name: 'Early May bank holiday', date: (year) => nth(year, 4, 1, 1) },
    { name: 'Spring bank holiday', date: (year) => nth(year, 4, 1, -1) },
    { name: 'Summer bank holiday', date: (year) => nth(year, 7, 1, -1) },
    { name: 'Christmas Day', date: '12-25', type: 'fixed' },
    { name: 'Boxing Day', date: '12-26', type: 'fixed' },
  ],
};
function nth(year: number, month: number, weekday: number, n: number): Date {
  const date = new Date(year, month, n < 0 ? 1 : 1);
  if (n < 0) {
    date.setMonth(month + 1, 0);
    date.setDate(date.getDate() - ((date.getDay() - weekday + 7) % 7));
  } else date.setDate(1 + ((weekday - date.getDay() + 7) % 7) + (n - 1) * 7);
  return date;
}
/** Gregorian computus, valid for Gregorian years. */
function easter(year: number, delta: number): Date {
  const a = year % 19,
    b = Math.floor(year / 100),
    c = year % 100,
    d = Math.floor(b / 4),
    e = b % 4,
    f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4),
    k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7,
    m = Math.floor((a + 11 * h + 22 * l) / 451);
  const v = h + l - 7 * m + 114;
  return new Date(year, Math.floor(v / 31) - 1, (v % 31) + 1 + delta);
}
