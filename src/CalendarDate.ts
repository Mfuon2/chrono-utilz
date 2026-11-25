import { TimeUnit } from './TimeUnit';
import { addTime } from './addTime';
import { createDate } from './createDate';
import { readDate } from './readDate';

/**
 * A calendar date without time information
 */
export class CalendarDate {
  private _year: number;
  private _month: number;
  private _day: number;

  /**
   * Creates a new CalendarDate
   * @param year - The year
   * @param month - The month (1-12)
   * @param day - The day (1-31)
   */
  constructor(year: number, month: number, day: number) {
    // Convert month from 1-based to 0-based for internal storage
    const internalMonth = month - 1;

    // Validate inputs through createDate (will throw if invalid)
    const date = createDate(year, internalMonth, day);

    this._year = date.getFullYear();
    this._month = date.getMonth();
    this._day = date.getDate();
  }

  /**
   * Creates a CalendarDate from a Date object
   * @param date - The Date object
   * @returns A new CalendarDate
   */
  static fromDate(date: Date): CalendarDate {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  /**
   * Creates a CalendarDate from a string or timestamp
   * @param input - The input to parse
   * @returns A new CalendarDate
   */
  static fromString(input: string | number): CalendarDate {
    const date = readDate(input);

    return CalendarDate.fromDate(date);
  }

  /**
   * Gets the year
   */
  get year(): number {
    return this._year;
  }

  /**
   * Gets the month (1-12)
   */
  get month(): number {
    return this._month + 1;
  }

  /**
   * Gets the day (1-31)
   */
  get day(): number {
    return this._day;
  }

  /**
   * Converts to a JavaScript Date object (at midnight local time)
   * @returns A new Date object
   */
  toDate(): Date {
    return createDate(this._year, this._month, this._day);
  }

  /**
   * Returns an ISO date string (YYYY-MM-DD)
   * @returns ISO date string
   */
  toString(): string {
    return [
      String(this._year).padStart(4, '0'),
      String(this._month + 1).padStart(2, '0'),
      String(this._day).padStart(2, '0'),
    ].join('-');
  }

  /**
   * Adds time to this calendar date
   * @param amount - The amount to add
   * @param unit - The time unit (limited to day, week, month, year)
   * @returns A new CalendarDate
   */
  add(amount: number, unit: Extract<TimeUnit, 'day' | 'week' | 'month' | 'year'>): CalendarDate {
    const newDate = addTime(this.toDate(), amount, unit);
    return CalendarDate.fromDate(newDate);
  }

  /**
   * Checks if this calendar date is equal to another
   * @param other - The other calendar date
   * @returns True if the dates are equal
   */
  equals(other: CalendarDate): boolean {
    return this._year === other._year && this._month === other._month && this._day === other._day;
  }

  /**
   * Compares this calendar date with another
   * @param other - The other calendar date
   * @returns Negative if this < other, 0 if equal, positive if this > other
   */
  compare(other: CalendarDate): number {
    if (this._year !== other._year) {
      return this._year - other._year;
    }
    if (this._month !== other._month) {
      return this._month - other._month;
    }
    return this._day - other._day;
  }

  /**
   * Checks if this calendar date is before another
   * @param other - The other calendar date
   * @returns True if this date is before the other
   */
  isBefore(other: CalendarDate): boolean {
    return this.compare(other) < 0;
  }

  /**
   * Checks if this calendar date is after another
   * @param other - The other calendar date
   * @returns True if this date is after the other
   */
  isAfter(other: CalendarDate): boolean {
    return this.compare(other) > 0;
  }
}
