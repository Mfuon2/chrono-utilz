/**
 * ChronoUtilz - A comprehensive date utility library built on Three Pillars Architecture
 * 
 * Three Pillars Architecture:
 * - Core Operations (45+ functions): Date manipulation & comparison
 * - Business Utilities (55+ functions): Real-world business logic
 * - Formatting & Parsing (35+ functions): Advanced presentation
 * 
 * 🚀 Business-Ready Features:
 * - Working days with holiday support
 * - Fiscal quarters and periods
 * - Natural language parsing ("next Friday")
 * - Timezone conversion between IANA zones
 * - Recurring date patterns
 * - Advanced duration calculations
 * 
 * Compatible with TypeScript, JavaScript and Node.js
 * @module ChronoUtilz
 * @version 2.0.0
 */

// Import holiday configuration
import { holidays } from './holidays';

// Import locale configuration
import { STANDARD_LOCALES, POPULAR_LOCALES, LOCALES_BY_REGION } from './locales';

// Import timezone utilities
import { 
    TIMEZONE_IDS, 
    getUserTimezone, 
    getTimezoneInfo as getTimezoneInfoFromDB, 
    getTimezoneOffset as getTzOffset
} from './timezones';

// Global configuration for ChronoUtilz
const globalTimezoneConfig = {
    defaultTimezone: getUserTimezone(),
    autoDetect: true
};

/**
 * Get the effective timezone to use (either auto-detected or manually set default)
 */
function getEffectiveTimezone(providedTimezone?: IANATimezone): string {
    if (providedTimezone) return providedTimezone;
    return globalTimezoneConfig.autoDetect ? getUserTimezone() : globalTimezoneConfig.defaultTimezone;
}

/**
 * Configure global timezone behavior for ChronoUtilz
 * @param config - Timezone configuration
 */
export function configureTimezone(config: {
    defaultTimezone?: IANATimezone;
    autoDetect?: boolean;
}): void {
    if (config.defaultTimezone !== undefined) {
        globalTimezoneConfig.defaultTimezone = config.defaultTimezone;
    }
    if (config.autoDetect !== undefined) {
        globalTimezoneConfig.autoDetect = config.autoDetect;
    }
}

/**
 * Get current timezone configuration
 * @returns Current configuration
 */
export function getTimezoneConfig(): {
    defaultTimezone: string;
    autoDetect: boolean;
    currentEffectiveTimezone: string;
} {
    return {
        defaultTimezone: globalTimezoneConfig.defaultTimezone,
        autoDetect: globalTimezoneConfig.autoDetect,
        currentEffectiveTimezone: getEffectiveTimezone()
    };
}

/**
 * DateFormat options for formatting dates
 */
export type DateFormat =
    | 'YYYY-MM-DD'           // 2025-05-07
    | 'MM/DD/YYYY'           // 05/07/2025
    | 'DD/MM/YYYY'           // 07/05/2025
    | 'YYYY-MM-DD HH:mm:ss'  // 2025-05-07 14:30:00
    | 'DD MMM YYYY'          // 07 May 2025
    | 'MMM DD, YYYY'         // May 07, 2025
    | 'HH:mm:ss'             // 14:30:00
    | 'hh:mm A';             // 02:30 PM

/**
 * TimeUnit for duration calculations
 */
export type TimeUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

/**
 * IANA Timezone identifiers - Complete standardized list
 */
export type IANATimezone = typeof TIMEZONE_IDS[number] | string;

/**
 * Natural language time expressions
 */
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
    | 'next monday' | 'next tuesday' | 'next wednesday' | 'next thursday' 
    | 'next friday' | 'next saturday' | 'next sunday'
    | 'last monday' | 'last tuesday' | 'last wednesday' | 'last thursday'
    | 'last friday' | 'last saturday' | 'last sunday'
    | 'beginning of week' | 'end of week'
    | 'beginning of month' | 'end of month'
    | 'beginning of year' | 'end of year'
    | string; // Allow custom expressions

/**
 * Recurring pattern types
 */
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

/**
 * Fiscal year configuration
 */
export interface FiscalYearConfig {
    startMonth: number; // 1-12
    startDay: number;   // 1-31
}

/**
 * ChronoUtilz options for parsing dates
 */
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

/**
 * Timezone conversion options
 */
export interface TimezoneConversionOptions {
    from?: IANATimezone;
    to: IANATimezone;
    preserveTime?: boolean;
}

/**
 * Advanced formatting options
 */
export interface AdvancedFormatOptions {
    locale?: string;
    timezone?: IANATimezone;
    includeTime?: boolean;
    includeSeconds?: boolean;
    use24Hour?: boolean;
    includeDayOfWeek?: boolean;
    includeTimezone?: boolean;
}

/**
 * Recurring date configuration
 */
export interface RecurringConfig {
    pattern: RecurringPattern;
    interval?: number; // e.g., every 2 weeks
    daysOfWeek?: number[]; // 0-6, Sunday is 0
    daysOfMonth?: number[]; // 1-31
    monthsOfYear?: number[]; // 1-12
    endDate?: Date;
    maxOccurrences?: number;
}

/**
 * Natural language parsing options
 */
export interface NaturalLanguageOptions {
    baseDate?: Date;
    timezone?: IANATimezone;
    strictParsing?: boolean;
}

/**
 * Duration display options
 */
export interface DurationDisplayOptions {
    precision?: number;
    units?: TimeUnit[];
    format?: 'long' | 'short' | 'narrow';
    separator?: string;
    includeZeroValues?: boolean;
}

/**
 * Holiday configuration
 */
export interface HolidayConfig {
    country?: string;
    region?: string;
    includeObserved?: boolean;
    customHolidays?: Date[];
}

/**
 * Working time configuration
 */
export interface WorkingTimeConfig {
    startHour: number;
    endHour: number;
    workingDays: number[]; // 0-6, Sunday is 0
    timezone?: IANATimezone;
    excludeHolidays?: boolean;
    holidayConfig?: HolidayConfig;
}

/**
 * Date comparison result
 */
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

/**
 * Fiscal period information
 */
export interface FiscalPeriod {
    quarter: number;
    year: number;
    startDate: Date;
    endDate: Date;
    isCurrentPeriod: boolean;
}

/**
 * Calendar event interface
 */
export interface CalendarEvent {
    id?: string;
    title: string;
    startDate: Date;
    endDate?: Date;
    isAllDay?: boolean;
    recurring?: RecurringConfig;
    timezone?: IANATimezone;
}

/**
 * Timezone conversion options
 */
export interface TimezoneConversionOptions {
    from?: IANATimezone;
    to: IANATimezone;
    preserveTime?: boolean;
}

/**
 * Advanced formatting options
 */
export interface AdvancedFormatOptions {
    locale?: string;
    timezone?: IANATimezone;
    includeTime?: boolean;
    includeSeconds?: boolean;
    use24Hour?: boolean;
    includeDayOfWeek?: boolean;
    includeTimezone?: boolean;
}

/**
 * Recurring date configuration
 */
export interface RecurringConfig {
    pattern: RecurringPattern;
    interval?: number; // e.g., every 2 weeks
    daysOfWeek?: number[]; // 0-6, Sunday is 0
    daysOfMonth?: number[]; // 1-31
    monthsOfYear?: number[]; // 1-12
    endDate?: Date;
    maxOccurrences?: number;
}

/**
 * Natural language parsing options
 */
export interface NaturalLanguageOptions {
    baseDate?: Date;
    timezone?: IANATimezone;
    strictParsing?: boolean;
}

/**
 * Duration display options
 */
export interface DurationDisplayOptions {
    precision?: number;
    units?: TimeUnit[];
    format?: 'long' | 'short' | 'narrow';
    separator?: string;
    includeZeroValues?: boolean;
}

/**
 * Holiday configuration
 */
export interface HolidayConfig {
    country?: string;
    region?: string;
    includeObserved?: boolean;
    customHolidays?: Date[];
}

/**
 * Working time configuration
 */
export interface WorkingTimeConfig {
    startHour: number;
    endHour: number;
    workingDays: number[]; // 0-6, Sunday is 0
    timezone?: IANATimezone;
    excludeHolidays?: boolean;
    holidayConfig?: HolidayConfig;
}

/**
 * Date comparison result
 */
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

/**
 * Fiscal period information
 */
export interface FiscalPeriod {
    quarter: number;
    year: number;
    startDate: Date;
    endDate: Date;
    isCurrentPeriod: boolean;
}

/**
 * Calendar event interface
 */
export interface CalendarEvent {
    id?: string;
    title: string;
    startDate: Date;
    endDate?: Date;
    isAllDay?: boolean;
    recurring?: RecurringConfig;
    timezone?: IANATimezone;
}

/**
 * ChronoUtilz error class
 */
export class ChronoUtilzError extends Error {
    constructor(message: string) {
        super(`ChronoUtilz Error: ${message}`);
        this.name = 'ChronoUtilzError';

        // Support proper stack traces in modern environments
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ChronoUtilzError);
        }
    }
}

/**
 * Safely parses a date string or timestamp into a Date object
 * @param input - The input to parse as a date
 * @param options - Parsing options
 * @returns A Date object or null if invalid and throwError is false
 * @throws {ChronoUtilzError} If the date is invalid and throwError is true
 */
export function parseDate(input: string | number | Date, options: DateParseOptions = {}): Date | null {
    const { throwError = false, fallback = null } = options;

    try {
        if (input instanceof Date) {
            const date = new Date(input.getTime());
            if (isNaN(date.getTime())) throw new ChronoUtilzError('Invalid Date object');
            return date;
        }

        if (typeof input === 'number') {
            const date = new Date(input);
            if (isNaN(date.getTime())) throw new ChronoUtilzError(`Invalid timestamp: ${input}`);
            return date;
        }

        if (typeof input !== 'string') {
            throw new ChronoUtilzError('Invalid input type for date');
        }

        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        // MM/DD/YYYY or DD/MM/YYYY with optional time
        const slashFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/;
        const slashMatch = input.match(slashFormat);
        if (slashMatch) {
            const [, first, second, yearStr, hourStr, minuteStr, secondStr] = slashMatch;
            const year = parseInt(yearStr, 10);
            const hour = hourStr ? parseInt(hourStr, 10) : 0;
            const minute = minuteStr ? parseInt(minuteStr, 10) : 0;
            const seconds = secondStr ? parseInt(secondStr, 10) : 0;

            // Try MM/DD/YYYY first
            const month = parseInt(first, 10);
            const day = parseInt(second, 10);
            const date = new Date(year, month - 1, day, hour, minute, seconds);
            if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                return date;
            }

            // Try DD/MM/YYYY fallback
            const altDay = month;
            const altMonth = day;
            const altDate = new Date(year, altMonth - 1, altDay, hour, minute, seconds);
            if (altDate.getFullYear() === year && altDate.getMonth() === altMonth - 1 && altDate.getDate() === altDay) {
                return altDate;
            }
        }

        // DD MMM YYYY with optional time
        const ddMmmYyyy = /^(\d{1,2})\s+([a-zA-Z]{3,})\s+(\d{4})(?:,?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/;
        const match1 = input.match(ddMmmYyyy);
        if (match1) {
            const [, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match1;
            const day = parseInt(dayStr, 10);
            const year = parseInt(yearStr, 10);
            const hour = hourStr ? parseInt(hourStr, 10) : 0;
            const minute = minuteStr ? parseInt(minuteStr, 10) : 0;
            const seconds = secondStr ? parseInt(secondStr, 10) : 0;
            const monthIndex = months.findIndex(m => m.startsWith(monthStr.toLowerCase().slice(0, 3)));

            if (monthIndex !== -1) {
                const date = new Date(year, monthIndex, day, hour, minute, seconds);
                if (date.getFullYear() === year && date.getMonth() === monthIndex && date.getDate() === day) {
                    return date;
                }
            }
        }

        // MMM DD, YYYY with optional time
        const mmmDdYyyy = /^([a-zA-Z]{3,})\s+(\d{1,2})(?:,)?\s+(\d{4})(?:,?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/;
        const match2 = input.match(mmmDdYyyy);
        if (match2) {
            const [, monthStr, dayStr, yearStr, hourStr, minuteStr, secondStr] = match2;
            const day = parseInt(dayStr, 10);
            const year = parseInt(yearStr, 10);
            const hour = hourStr ? parseInt(hourStr, 10) : 0;
            const minute = minuteStr ? parseInt(minuteStr, 10) : 0;
            const seconds = secondStr ? parseInt(secondStr, 10) : 0;
            const monthIndex = months.findIndex(m => m.startsWith(monthStr.toLowerCase().slice(0, 3)));

            if (monthIndex !== -1) {
                const date = new Date(year, monthIndex, day, hour, minute, seconds);
                if (date.getFullYear() === year && date.getMonth() === monthIndex && date.getDate() === day) {
                    return date;
                }
            }
        }

        // Handle ISO string patterns but interpret as local time
        const isoPattern = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?)?(?:Z|[+-]\d{2}:\d{2})?$/;
        const isoMatch = input.match(isoPattern);
        if (isoMatch) {
            const [, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr, msStr] = isoMatch;
            const year = parseInt(yearStr, 10);
            const month = parseInt(monthStr, 10) - 1; // Month is 0-based
            const day = parseInt(dayStr, 10);
            const hour = hourStr ? parseInt(hourStr, 10) : 0;
            const minute = minuteStr ? parseInt(minuteStr, 10) : 0;
            const second = secondStr ? parseInt(secondStr, 10) : 0;
            const ms = msStr ? parseInt(msStr, 10) : 0;
            
            // Create date in local timezone
            return new Date(year, month, day, hour, minute, second, ms);
        }
        
        // Fallback to native Date constructor
        const fallbackDate = new Date(input);
        if (!isNaN(fallbackDate.getTime())) {
            return fallbackDate;
        }

        throw new ChronoUtilzError(`Unable to parse date: ${input}`);
    } catch (error) {
        if (throwError) {
            throw error instanceof ChronoUtilzError ? error : new ChronoUtilzError(`Failed to parse date: ${input}`);
        }
        return fallback;
    }
}

/**
 * Formats a date according to the specified format
 * @param date - The date to format
 * @param format - The format pattern
 * @returns Formatted date string
 * @throws {ChronoUtilzError} If the date is invalid
 */
export function formatDate(date: Date | string | number, format: DateFormat = 'YYYY-MM-DD', timezone?: IANATimezone): string {
    const targetTimezone = getEffectiveTimezone(timezone);
    const safeDate = parseDate(date, { throwError: true, timezone: targetTimezone });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatDate');
    }

    const year = safeDate.getFullYear();
    const month = safeDate.getMonth() + 1;
    const day = safeDate.getDate();
    const hours24 = safeDate.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = safeDate.getMinutes();
    const seconds = safeDate.getSeconds();
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    const pad = (num: number): string => num.toString().padStart(2, '0');

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${pad(month)}-${pad(day)}`;
        case 'MM/DD/YYYY':
            return `${pad(month)}/${pad(day)}/${year}`;
        case 'DD/MM/YYYY':
            return `${pad(day)}/${pad(month)}/${year}`;
        case 'YYYY-MM-DD HH:mm:ss':
            return `${year}-${pad(month)}-${pad(day)} ${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
        case 'DD MMM YYYY':
            return `${pad(day)} ${monthNames[safeDate.getMonth()]} ${year}`;
        case 'MMM DD, YYYY':
            return `${monthNames[safeDate.getMonth()]} ${pad(day)}, ${year}`;
        case 'HH:mm:ss':
            return `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
        case 'hh:mm A':
            return `${pad(hours12)}:${pad(minutes)} ${ampm}`;
        default:
            throw new ChronoUtilzError(`Unsupported date format: ${format}`);
    }
}

/**
 * Adds time to a date
 * @param date - The base date
 * @param amount - The amount to add
 * @param unit - The time unit
 * @returns A new Date with the added time
 */
export function addTime(
    date: Date | string | number,
    amount: number,
    unit: TimeUnit,
    timezone?: IANATimezone
): Date {
    let safeDate: Date | null;
    const targetTimezone = getEffectiveTimezone(timezone);
    
    if (date instanceof Date) {
        // Always reinterpret Date objects to ensure consistent local timezone handling
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ms = date.getMilliseconds();
        
        // Create new date ensuring local timezone interpretation
        safeDate = new Date(year, month, day, hours, minutes, seconds, ms);
    } else {
        safeDate = parseDate(date, { throwError: true });
    }
    
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to addTime');
    }

    const result = new Date(safeDate.getTime());

    switch (unit) {
        case 'millisecond':
            return new Date(result.getTime() + amount);
        case 'second':
            return new Date(result.getTime() + (amount * 1000));
        case 'minute':
            return new Date(result.getTime() + (amount * 60 * 1000));
        case 'hour': {
            // Factor in timezone offset for accurate hour calculations
            const newTime = result.getTime() + (amount * 60 * 60 * 1000);
            const newDate = new Date(newTime);
            
            // Check if DST boundary was crossed and adjust if needed
            const originalOffset = getTzOffset(targetTimezone, result);
            const newOffset = getTzOffset(targetTimezone, newDate);
            
            if (originalOffset !== newOffset) {
                const offsetDiff = (newOffset - originalOffset) * 60 * 60 * 1000;
                return new Date(newTime - offsetDiff);
            }
            
            return newDate;
        }
        case 'day': {
            // For day calculations, maintain the same time but account for DST
            const targetDate = new Date(result.getTime());
            targetDate.setDate(targetDate.getDate() + amount);
            
            // Check for DST changes and adjust
            const originalOffset = getTzOffset(targetTimezone, result);
            const newOffset = getTzOffset(targetTimezone, targetDate);
            
            if (originalOffset !== newOffset) {
                const offsetDiff = (newOffset - originalOffset) * 60 * 60 * 1000;
                return new Date(targetDate.getTime() - offsetDiff);
            }
            
            return targetDate;
        }
        case 'week': {
            // Similar to day but multiply by 7
            const targetDate = new Date(result.getTime());
            targetDate.setDate(targetDate.getDate() + (amount * 7));
            
            const originalOffset = getTzOffset(targetTimezone, result);
            const newOffset = getTzOffset(targetTimezone, targetDate);
            
            if (originalOffset !== newOffset) {
                const offsetDiff = (newOffset - originalOffset) * 60 * 60 * 1000;
                return new Date(targetDate.getTime() - offsetDiff);
            }
            
            return targetDate;
        }
        case 'month': {
            // For months, we need to use setMonth to handle varying month lengths
            const tempResult = new Date(result.getTime());
            const targetMonth = tempResult.getMonth() + amount;
            const targetYear = tempResult.getFullYear() + Math.floor(targetMonth / 12);
            const normalizedMonth = ((targetMonth % 12) + 12) % 12;
            
            tempResult.setFullYear(targetYear, normalizedMonth, tempResult.getDate());
            
            // Handle edge case where target month doesn't have enough days (e.g., Jan 31 + 1 month)
            if (tempResult.getMonth() !== normalizedMonth) {
                tempResult.setDate(0); // Go to last day of previous month
            }
            
            return tempResult;
        }
        case 'year': {
            // For years, preserve the date and time but handle leap year edge cases
            const tempResult = new Date(result.getTime());
            const targetYear = tempResult.getFullYear() + amount;
            
            tempResult.setFullYear(targetYear);
            
            // Handle Feb 29 on non-leap years
            if (tempResult.getMonth() !== result.getMonth()) {
                tempResult.setDate(0); // Go to last day of previous month (Feb 28)
            }
            
            return tempResult;
        }
        default:
            throw new ChronoUtilzError(`Invalid time unit: ${unit}`);
    }
}

/**
 * Subtracts time from a date
 * @param date - The base date
 * @param amount - The amount to subtract
 * @param unit - The time unit
 * @param timezone - Optional timezone (defaults to user's timezone)
 * @returns A new Date with the subtracted time
 */
export function subtractTime(
    date: Date | string | number,
    amount: number,
    unit: TimeUnit,
    timezone?: IANATimezone
): Date {
    return addTime(date, -amount, unit, timezone);
}

/**
 * Gets the difference between two dates in the specified unit
 * @param date1 - The first date
 * @param date2 - The second date
 * @param unit - The time unit
 * @returns The difference in the specified unit
 */
export function getDateDiff(
    date1: Date | string | number,
    date2: Date | string | number,
    unit: TimeUnit,
    timezone?: IANATimezone
): number {
    const targetTimezone = getEffectiveTimezone(timezone);
    const safeDate1 = parseDate(date1, { throwError: true, timezone: targetTimezone });
    const safeDate2 = parseDate(date2, { throwError: true, timezone: targetTimezone });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to getDateDiff');
    }

    const diffMs = safeDate1.getTime() - safeDate2.getTime();

    switch (unit) {
        case 'millisecond':
            return diffMs;
        case 'second':
            return Math.floor(diffMs / 1000);
        case 'minute':
            return Math.floor(diffMs / (1000 * 60));
        case 'hour':
            return Math.floor(diffMs / (1000 * 60 * 60));
        case 'day':
            return Math.floor(diffMs / (1000 * 60 * 60 * 24));
        case 'week':
            return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        case 'month': {
            // More accurate month and year calculations
            const d1Year = safeDate1.getFullYear();
            const d2Year = safeDate2.getFullYear();
            const d1Month = safeDate1.getMonth();
            const d2Month = safeDate2.getMonth();

            return (d1Year - d2Year) * 12 + (d1Month - d2Month);
        }
        case 'year': {
            const d1Year = safeDate1.getFullYear();
            const d2Year = safeDate2.getFullYear();
            const monthAdjustment = (safeDate1.getMonth() - safeDate2.getMonth()) / 12;
            return d1Year - d2Year + monthAdjustment;
        }
        default:
            throw new ChronoUtilzError(`Invalid time unit: ${unit}`);
    }
}

/**
 * Calculates remaining time until a target date, or elapsed time if past
 * @param targetDate - The target date to calculate time to/from
 * @param unit - The time unit to return (default: 'millisecond')
 * @param referenceDate - Optional reference date (default: now)
 * @param timezone - Optional timezone (defaults to user's timezone)
 * @returns Positive number if target is in future (remaining time), negative if past (elapsed time)
 */
export function remainingTime(
    targetDate: Date | string | number,
    unit: TimeUnit = 'millisecond',
    referenceDate: Date | string | number = new Date(),
    timezone?: IANATimezone
): number {
    const targetTimezone = getEffectiveTimezone(timezone);
    const safeTargetDate = parseDate(targetDate, { throwError: true, timezone: targetTimezone });
    const safeReferenceDate = parseDate(referenceDate, { throwError: true, timezone: targetTimezone });

    if (!safeTargetDate || !safeReferenceDate) {
        throw new ChronoUtilzError('Invalid date(s) provided to remainingTime');
    }

    // Calculate difference: target - reference
    // Positive = time remaining, Negative = time elapsed
    const diffMs = safeTargetDate.getTime() - safeReferenceDate.getTime();

    switch (unit) {
        case 'millisecond':
            return diffMs;
        case 'second':
            return Math.floor(diffMs / 1000);
        case 'minute':
            return Math.floor(diffMs / (1000 * 60));
        case 'hour':
            return Math.floor(diffMs / (1000 * 60 * 60));
        case 'day':
            return Math.floor(diffMs / (1000 * 60 * 60 * 24));
        case 'week':
            return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        case 'month': {
            // More accurate month calculations
            const targetYear = safeTargetDate.getFullYear();
            const refYear = safeReferenceDate.getFullYear();
            const targetMonth = safeTargetDate.getMonth();
            const refMonth = safeReferenceDate.getMonth();

            return (targetYear - refYear) * 12 + (targetMonth - refMonth);
        }
        case 'quarter': {
            const targetYear = safeTargetDate.getFullYear();
            const refYear = safeReferenceDate.getFullYear();
            const targetQuarter = Math.floor(safeTargetDate.getMonth() / 3);
            const refQuarter = Math.floor(safeReferenceDate.getMonth() / 3);

            return (targetYear - refYear) * 4 + (targetQuarter - refQuarter);
        }
        case 'year': {
            const targetYear = safeTargetDate.getFullYear();
            const refYear = safeReferenceDate.getFullYear();
            const monthAdjustment = (safeTargetDate.getMonth() - safeReferenceDate.getMonth()) / 12;
            return targetYear - refYear + monthAdjustment;
        }
        default:
            throw new ChronoUtilzError(`Invalid time unit: ${unit}`);
    }
}

/**
 * Checks if a date is between two other dates
 * @param date - The date to check
 * @param startDate - The start date
 * @param endDate - The end date
 * @param inclusive - Whether to include the boundaries
 * @returns True if the date is between the start and end dates
 */
export function isBetweenDates(
    date: Date | string | number,
    startDate: Date | string | number,
    endDate: Date | string | number,
    inclusive = true
): boolean {
    const safeDate = parseDate(date, { throwError: true });
    const safeStartDate = parseDate(startDate, { throwError: true });
    const safeEndDate = parseDate(endDate, { throwError: true });

    if (!safeDate || !safeStartDate || !safeEndDate) {
        throw new ChronoUtilzError('Invalid date(s) provided to isBetweenDates');
    }

    const dateTime = safeDate.getTime();
    const startTime = safeStartDate.getTime();
    const endTime = safeEndDate.getTime();

    if (inclusive) {
        return dateTime >= startTime && dateTime <= endTime;
    } else {
        return dateTime > startTime && dateTime < endTime;
    }
}

/**
 * Validates whether a given input is a valid date in supported formats.
 * Checks if a date is valid
 * @param date - The date to check
 * @returns True if the date is valid
 */
export function isValidDate(date: any): boolean {
    const parsedDate = parseDate(date, { throwError: false });
    return parsedDate !== null;
}

/**
 * Gets the start of a time unit (e.g., start of day, start of month)
 * @param date - The reference date
 * @param unit - The time unit
 * @returns A new Date representing the start of the specified unit
 */
export function startOf(
    date: Date | string | number,
    unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute'>
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to startOf');
    }

    const result = new Date(safeDate.getTime());

    switch (unit) {
        case 'hour':
            result.setMinutes(0, 0, 0);
            break;
        case 'day':
            result.setHours(0, 0, 0, 0);
            break;
        case 'week': {
            // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
            const dayOfWeek = result.getDay();
            // Subtract days to get to Sunday (start of week)
            result.setDate(result.getDate() - dayOfWeek);
            result.setHours(0, 0, 0, 0);
            break;
        }
        case 'month':
            result.setDate(1);
            result.setHours(0, 0, 0, 0);
            break;
        case 'year':
            result.setMonth(0, 1);
            result.setHours(0, 0, 0, 0);
            break;
        default:
            throw new ChronoUtilzError(`Invalid time unit for startOf: ${unit}`);
    }

    return result;
}

/**
 * Gets the end of a time unit (e.g., end of day, end of month)
 * @param date - The reference date
 * @param unit - The time unit
 * @returns A new Date representing the end of the specified unit
 */
export function endOf(
    date: Date | string | number,
    unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute'>
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to endOf');
    }

    const result = new Date(safeDate.getTime());

    switch (unit) {
        case 'hour':
            result.setMinutes(59, 59, 999);
            break;
        case 'day':
            result.setHours(23, 59, 59, 999);
            break;
        case 'week': {
            // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
            const dayOfWeek = result.getDay();
            // Add days to get to Saturday (end of week)
            result.setDate(result.getDate() + (6 - dayOfWeek));
            result.setHours(23, 59, 59, 999);
            break;
        }
        case 'month': {
            // Go to the first day of the next month, then subtract 1 millisecond
            result.setMonth(result.getMonth() + 1, 0);
            result.setHours(23, 59, 59, 999);
            break;
        }
        case 'year':
            result.setMonth(11, 31);
            result.setHours(23, 59, 59, 999);
            break;
        default:
            throw new ChronoUtilzError(`Invalid time unit for endOf: ${unit}`);
    }

    return result;
}

/**
 * Gets the day of the year (1-366)
 * @param date - The date
 * @returns The day of the year
 */
export function getDayOfYear(date: Date | string | number): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getDayOfYear');
    }

    const startOfYear = new Date(safeDate.getFullYear(), 0, 0);
    const diff = safeDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

/**
 * Gets the week of the year (1-53)
 * @param date - The date
 * @returns The week of the year
 */
export function getWeekOfYear(date: Date | string | number): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getWeekOfYear');
    }

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    const target = new Date(safeDate.valueOf());
    const dayNr = (safeDate.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);

    // Get first day of year
    const firstThursday = new Date(target.getFullYear(), 0, 1);
    // First Thursday of the year
    if (firstThursday.getDay() !== 4) {
        firstThursday.setMonth(0, 1 + ((4 - firstThursday.getDay()) + 7) % 7);
    }

    // Get the week number: 1 + number of weeks
    const weekDiff = (target.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000);
    return 1 + Math.floor(weekDiff);
}

/**
 * Checks if a year is a leap year
 * @param year - The year to check or a date
 * @returns True if the year is a leap year
 */
export function isLeapYear(year: number | Date | string): boolean {
    let yearToCheck: number;

    if (typeof year === 'number') {
        yearToCheck = year;
    } else {
        const safeDate = parseDate(year, { throwError: true });
        if (!safeDate) {
            throw new ChronoUtilzError('Invalid date provided to isLeapYear');
        }
        yearToCheck = safeDate.getFullYear();
    }

    return (yearToCheck % 4 === 0 && yearToCheck % 100 !== 0) || (yearToCheck % 400 === 0);
}

/**
 * Gets the number of days in a month
 * @param date - The reference date
 * @returns The number of days in the month
 */
export function getDaysInMonth(date: Date | string | number): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getDaysInMonth');
    }

    return new Date(safeDate.getFullYear(), safeDate.getMonth() + 1, 0).getDate();
}

/**
 * Returns a relative time string (e.g., "5 minutes ago", "in 2 days")
 * @param date - The date to get relative time for
 * @param baseDate - The base date (defaults to now)
 * @returns A human-readable relative time string
 */
export function getRelativeTime(
    date: Date | string | number,
    baseDate: Date | string | number = new Date()
): string {
    const safeDate = parseDate(date, { throwError: true });
    const safeBaseDate = parseDate(baseDate, { throwError: true });

    if (!safeDate || !safeBaseDate) {
        throw new ChronoUtilzError('Invalid date(s) provided to getRelativeTime');
    }

    const deltaMs = safeDate.getTime() - safeBaseDate.getTime();
    const isPast = deltaMs < 0;
    const absDelta = Math.abs(deltaMs);
    const deltaSeconds = Math.round(absDelta / 1000);

    // Helper for string formatting
    const format = (value: number, unit: string): string => {
        const plural = value !== 1 ? 's' : '';
        return isPast ? `${value} ${unit}${plural} ago` : `in ${value} ${unit}${plural}`;
    };

    // Tiny ranges
    if (deltaSeconds < 5) return 'just now';
    if (deltaSeconds < 60) return format(deltaSeconds, 'second');
    if (deltaSeconds < 3600) return format(Math.floor(deltaSeconds / 60), 'minute');
    if (deltaSeconds < 86400) return format(Math.floor(deltaSeconds / 3600), 'hour');
    if (deltaSeconds < 604800) return format(Math.floor(deltaSeconds / 86400), 'day');
    if (deltaSeconds < 2629800) return format(Math.floor(deltaSeconds / 604800), 'week');

    // Months and years: use calendar-aware difference
    const from = new Date(safeBaseDate.getFullYear(), safeBaseDate.getMonth(), safeBaseDate.getDate());
    const to = new Date(safeDate.getFullYear(), safeDate.getMonth(), safeDate.getDate());

    const years = to.getFullYear() - from.getFullYear();
    const months = to.getMonth() - from.getMonth();
    let totalMonths = years * 12 + months;

    // Adjust if the day of the month isn't reached yet
    if (to.getDate() < from.getDate()) {
        totalMonths -= 1;
    }

    if (Math.abs(totalMonths) >= 12) {
        return format(Math.floor(Math.abs(totalMonths) / 12), 'year');
    }

    return format(Math.abs(totalMonths), 'month');
}

/**
 * Gets the timezone offset in minutes
 * @param date - The date to get timezone offset for
 * @returns Timezone offset in minutes
 */
export function getTimezoneOffset(date: Date | string | number = new Date()): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getTimezoneOffset');
    }

    return safeDate.getTimezoneOffset();
}

/**
 * Creates a date from components
 * @param year - The year
 * @param month - The month (0-11)
 * @param day - The day (1-31)
 * @param hours - The hours (0-23)
 * @param minutes - The minutes (0-59)
 * @param seconds - The seconds (0-59)
 * @param milliseconds - The milliseconds (0-999)
 * @returns A new Date object
 */
export function createDate(
    year: number,
    month: number,
    day: number,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
): Date {
    // Validate inputs
    if (month < 0 || month > 11) {
        throw new ChronoUtilzError(`Month must be between 0 and 11, got ${month}`);
    }

    const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new ChronoUtilzError('Invalid date components provided to createDate');
    }

    // Verify that the day didn't roll over (e.g., April 31 -> May 1)
    if (date.getMonth() !== month) {
        throw new ChronoUtilzError(`Invalid day ${day} for month ${month}`);
    }

    return date;
}

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
        return new CalendarDate(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
    }

    /**
     * Creates a CalendarDate from a string or timestamp
     * @param input - The input to parse
     * @returns A new CalendarDate
     */
    static fromString(input: string | number): CalendarDate {
        const date = parseDate(input, { throwError: true });
        if (!date) {
            throw new ChronoUtilzError('Invalid date provided to CalendarDate.fromString');
        }
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
        return new Date(this._year, this._month, this._day, 0, 0, 0, 0);
    }

    /**
     * Returns an ISO date string (YYYY-MM-DD)
     * @returns ISO date string
     */
    toString(): string {
        return formatDate(this.toDate(), 'YYYY-MM-DD');
    }

    /**
     * Adds time to this calendar date
     * @param amount - The amount to add
     * @param unit - The time unit (limited to day, week, month, year)
     * @returns A new CalendarDate
     */
    add(
        amount: number,
        unit: Extract<TimeUnit, 'day' | 'week' | 'month' | 'year'>
    ): CalendarDate {
        const newDate = addTime(this.toDate(), amount, unit);
        return CalendarDate.fromDate(newDate);
    }

    /**
     * Checks if this calendar date is equal to another
     * @param other - The other calendar date
     * @returns True if the dates are equal
     */
    equals(other: CalendarDate): boolean {
        return (
            this._year === other._year &&
            this._month === other._month &&
            this._day === other._day
        );
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

/**
 * Gets the current UTC date and time
 * @returns The current UTC date and time
 */
export function utcNow(): Date {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
}

/**
 * Converts a date to UTC
 * @param date - The date to convert
 * @returns A new Date in UTC
 */
export function toUTC(date: Date | string | number): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to toUTC');
    }

    return new Date(
        safeDate.getTime() + safeDate.getTimezoneOffset() * 60000
    );
}

/**
 * Gets a string representation of the current timezone
 * @returns Timezone string (e.g., "UTC+2")
 */
export function getTimezoneString(): string {
    const offset = new Date().getTimezoneOffset();
    const sign = offset <= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;

    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Validates if a date string matches a specific format
 * @param dateStr - The date string to validate
 * @param format - The expected format
 * @returns True if the date string matches the format and is valid
 */
export function validateDateFormat(dateStr: string, format: DateFormat): boolean {

    let match: RegExpMatchArray | null;

    switch (format) {
        case 'YYYY-MM-DD':
            match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (!match) return false;
            break;
        case 'MM/DD/YYYY':{
            match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (!match) return false;
            const [ , mm1, dd1, yyyy1 ] = match.map(Number);
            if (mm1 < 1 || mm1 > 12 || dd1 < 1 || dd1 > 31) return false;
            return new Date(`${yyyy1}-${String(mm1).padStart(2, '0')}-${String(dd1).padStart(2, '0')}`).getMonth() === mm1 - 1;
        }
        case 'DD/MM/YYYY': {
            match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (!match) return false;
            const [, dd2, mm2, yyyy2] = match.map(Number);
            if (mm2 < 1 || mm2 > 12 || dd2 < 1 || dd2 > 31) return false;
            return new Date(`${yyyy2}-${String(mm2).padStart(2, '0')}-${String(dd2).padStart(2, '0')}`).getDate() === dd2;
        }
        case 'YYYY-MM-DD HH:mm:ss':
            match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
            if (!match) return false;
            break;
        case 'DD MMM YYYY':
            match = dateStr.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
            if (!match) return false;
            break;
        case 'MMM DD, YYYY':
            match = dateStr.match(/^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/);
            if (!match) return false;
            break;
        case 'HH:mm:ss': {
            match = dateStr.match(/^(\d{2}):(\d{2}):(\d{2})$/);
            if (!match) return false;
            const [, h1, m1, s1] = match.map(Number);
            return h1 < 24 && m1 < 60 && s1 < 60;
        }
        case 'hh:mm A': {
            match = dateStr.match(/^(\d{1,2}):(\d{2}) ([AP]M)$/);
            if (!match) return false;
            const hour = parseInt(match[1], 10);
            const minute = parseInt(match[2], 10);
            return hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59;
        }
        default:
            return false;
    }

    // Optional: Try parsing to be doubly sure
    try {
        const date = parseDate(dateStr);
        return date !== null && !isNaN(date.getTime());
    } catch {
        return false;
    }
}

/**
 * Options for date range generation
 */
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

/**
 * Generates an array of dates between a start and end date
 *
 * @example
 * ```
 * // Generate dates for each day in May 2025
 * const datesInMay = ChronoUtilzHelper.generateDateRange({
 *   start: '2025-05-01',
 *   end: '2025-05-31'
 * });
 * ```
 *
 * @param options - Configuration options for the date range
 * @returns An array of Date objects
 */
export function generateDateRange(options: DateRangeOptions): Date[] {
    const {
        start,
        end,
        unit = 'day',
        step = 1,
        inclusive = true
    } = options;

    const startDate = ChronoUtilz.parseDate(start);
    const endDate = ChronoUtilz.parseDate(end);

    if (!startDate || !endDate) {
        throw new Error('Invalid start or end date provided');
    }

    if (startDate > endDate) {
        throw new Error('Start date must be before or equal to end date');
    }

    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (
        currentDate < endDate ||
        (inclusive && currentDate.getTime() === endDate.getTime())
        ) {
        dates.push(new Date(currentDate));
        currentDate = ChronoUtilz.addTime(currentDate, step, unit);
    }

    return dates;
}

/**
 * Gets a human-readable duration string from milliseconds
 *
 * @example
 * ```
 * // "2 days, 4 hours, 30 minutes"
 * const duration = ChronoUtilzHelper.formatDuration(189000000);
 * ```
 *
 * @param milliseconds - The duration in milliseconds
 * @param options - Formatting options
 * @returns A formatted duration string
 */
export function formatDuration(
    milliseconds: number,
    options: { longFormat?: boolean, maxUnits?: number } = {}
): string {
    const { longFormat = true, maxUnits = 3 } = options;

    if (milliseconds === 0) {
        return longFormat ? '0 milliseconds' : '0ms';
    }

    const units: [string, string, number][] = [
        ['year', 'y', 31536000000],
        ['month', 'mo', 2592000000],
        ['day', 'd', 86400000],
        ['hour', 'h', 3600000],
        ['minute', 'm', 60000],
        ['second', 's', 1000],
        ['millisecond', 'ms', 1]
    ];

    const parts: string[] = [];
    let remaining = Math.abs(milliseconds);

    for (const [longName, shortName, value] of units) {
        if (parts.length >= maxUnits) break;

        const count = Math.floor(remaining / value);
        remaining %= value;

        if (count === 0) continue;

        if (longFormat) {
            parts.push(`${count} ${longName}${count !== 1 ? 's' : ''}`);
        } else {
            parts.push(`${count}${shortName}`);
        }
    }

    return parts.join(longFormat ? ', ' : ' ');
}

/**
 * Returns the quarter number (1-4) for a given date
 *
 * @example
 * ```
 * const quarter = ChronoUtilzHelper.getQuarter(new Date(2025, 4, 15)); // 2 (Q2)
 * ```
 *
 * @param date - The date to get the quarter for
 * @returns The quarter number (1-4)
 */
export function getQuarter(date: Date | string): number {
    const parsedDate = ChronoUtilz.parseDate(date);
    if (!parsedDate) {
        throw new Error('Invalid date provided');
    }

    const month = parsedDate.getMonth();
    return Math.floor(month / 3) + 1;
}

/**
 * Returns the first or last date of a quarter
 *
 * @example
 * ```
 * // Get the first day of the current quarter
 * const startOfQuarter = ChronoUtilzHelper.getQuarterDate(new Date(), 'start');
 *
 * // Get the last day of Q3 2025
 * const endOfQ3 = ChronoUtilzHelper.getQuarterDate(new Date(2025, 8, 15), 'end');
 * ```
 *
 * @param date - The reference date
 * @param type - Either 'start' or 'end' of the quarter
 * @returns Date object representing the start or end of the quarter
 */
export function getQuarterDate(
    date: Date | string,
    type: 'start' | 'end'
): Date {
    const parsedDate = ChronoUtilz.parseDate(date);
    if (!parsedDate) {
        throw new Error('Invalid date provided');
    }

    const quarter = getQuarter(parsedDate);
    const year = parsedDate.getFullYear();

    if (type === 'start') {
        // First day of the quarter (months are 0-indexed)
        return new Date(year, (quarter - 1) * 3, 1);
    } else {
        // Last day of the quarter
        return new Date(year, quarter * 3, 0);
    }
}


/**
 * Calculates business days between two dates (excluding weekends and optionally holidays)
 *
 * @example
 * ```
 * // Calculate business days between two dates
 * const workDays = ChronoUtilzHelper.getBusinessDays(
 *   '2025-05-01',
 *   '2025-05-15',
 *   ['2025-05-05'] // Optional holidays to exclude
 * );
 * ```
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @param holidays - Optional array of holiday dates to exclude
 * @returns Number of business days between dates
 */
export function getBusinessDays(
    startDate: Date | string,
    endDate: Date | string,
    holidays: (Date | string)[] = []
): number {
    const start = ChronoUtilz.parseDate(startDate);
    const end = ChronoUtilz.parseDate(endDate);

    if (!start || !end) {
        throw new Error('Invalid start or end date');
    }

    // Convert holidays to timestamp set for O(1) lookup
    const holidaySet = new Set(
        holidays
            .map(h => {
                const date = ChronoUtilz.parseDate(h);
                return date ? ChronoUtilz.formatDate(date, 'YYYY-MM-DD') : null;
            })
            .filter((date): date is string => date !== null)
    );

    let count = 0;
    const dayMilliseconds = 24 * 60 * 60 * 1000;

    // Loop through each day
    for (
        let current = ChronoUtilz.startOf(start, 'day');
        current <= end;
        current = new Date(current.getTime() + dayMilliseconds)
    ) {
        // Skip weekends (0 = Sunday, 6 = Saturday)
        const day = current.getDay();
        if (day === 0 || day === 6) {
            continue;
        }

        // Skip holidays
        const dateStr = ChronoUtilz.formatDate(current, 'YYYY-MM-DD');
        if (holidaySet.has(dateStr)) {
            continue;
        }

        count++;
    }

    return count;
}

/**
 * Age calculator that handles leap years and different formats
 *
 * @example
 * ```
 * // Calculate age in years
 * const age = ChronoUtilzHelper.calculateAge('1990-05-15');  // 35 (in 2025)
 *
 * // Calculate age in multiple units
 * const detailedAge = ChronoUtilzHelper.calculateAge('1990-05-15', {
 *   units: ['year', 'month', 'day']
 * });  // { years: 35, months: 0, days: 23 } (if today is May 7, 2025)
 * ```
 *
 * @param birthDate - The birth date
 * @param options - Calculation options
 * @returns Age in years or detailed object with multiple units
 */
export function calculateAge(
    birthDate: Date | string,
    options: {
        referenceDate?: Date | string;
        units?: ('year' | 'month' | 'day')[];
    } = {}
): number | { years: number; months: number; days: number } {
    const birth = ChronoUtilz.parseDate(birthDate);
    if (!birth) {
        throw new Error('Invalid birth date');
    }

    const reference = options.referenceDate
        ? ChronoUtilz.parseDate(options.referenceDate)
        : new Date();

    if (!reference) {
        throw new Error('Invalid reference date');
    }

    if (birth > reference) {
        throw new Error('Birth date cannot be in the future');
    }

    // Simple case: just years
    if (!options.units || options.units.length === 0 ||
        (options.units.length === 1 && options.units[0] === 'year')) {
        let age = reference.getFullYear() - birth.getFullYear();

        // Adjust if birthday hasn't occurred yet this year
        if (
            reference.getMonth() < birth.getMonth() ||
            (reference.getMonth() === birth.getMonth() &&
                reference.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    }

    // Detailed calculation with years, months, days
    let years = reference.getFullYear() - birth.getFullYear();
    let months = reference.getMonth() - birth.getMonth();
    let days = reference.getDate() - birth.getDate();

    // Adjust days
    if (days < 0) {
        months--;
        // Days in the previous month
        const prevMonth = new Date(reference.getFullYear(), reference.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust months
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

/**
 * Creates a deep copy of a Date object
 * @param date - The date to clone
 * @returns A new Date object with the same time value
 */
export function cloneDate(date: Date | string | number): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to cloneDate');
    }
    return new Date(safeDate.getTime());
}

/**
 * Returns the earliest date from an array of dates
 * @param dates - Array of dates to compare
 * @returns The earliest date
 */
export function minDate(...dates: (Date | string | number)[]): Date {
    if (dates.length === 0) {
        throw new ChronoUtilzError('At least one date must be provided to minDate');
    }

    const parsedDates = dates.map(date => {
        const parsed = parseDate(date, { throwError: true });
        if (!parsed) {
            throw new ChronoUtilzError('Invalid date provided to minDate');
        }
        return parsed;
    });

    return new Date(Math.min(...parsedDates.map(d => d.getTime())));
}

/**
 * Returns the latest date from an array of dates
 * @param dates - Array of dates to compare
 * @returns The latest date
 */
export function maxDate(...dates: (Date | string | number)[]): Date {
    if (dates.length === 0) {
        throw new ChronoUtilzError('At least one date must be provided to maxDate');
    }

    const parsedDates = dates.map(date => {
        const parsed = parseDate(date, { throwError: true });
        if (!parsed) {
            throw new ChronoUtilzError('Invalid date provided to maxDate');
        }
        return parsed;
    });

    return new Date(Math.max(...parsedDates.map(d => d.getTime())));
}

/**
 * Rounds a date to the nearest specified unit
 * @param date - The date to round
 * @param unit - The time unit to round to
 * @returns A new Date rounded to the nearest unit
 */
export function roundToNearest(
    date: Date | string | number,
    unit: Extract<TimeUnit, 'minute' | 'hour' | 'day'>
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to roundToNearest');
    }

    const result = new Date(safeDate.getTime());

    switch (unit) {
        case 'minute': {
            const seconds = result.getSeconds();
            if (seconds >= 30) {
                result.setMinutes(result.getMinutes() + 1);
            }
            result.setSeconds(0, 0);
            break;
        }
        case 'hour': {
            const minutes = result.getMinutes();
            if (minutes >= 30) {
                result.setHours(result.getHours() + 1);
            }
            result.setMinutes(0, 0, 0);
            break;
        }
        case 'day': {
            const hours = result.getHours();
            if (hours >= 12) {
                result.setDate(result.getDate() + 1);
            }
            result.setHours(0, 0, 0, 0);
            break;
        }
        default:
            throw new ChronoUtilzError(`Unsupported unit for roundToNearest: ${unit}`);
    }

    return result;
}

/**
 * Compares two dates and returns -1, 0, or 1
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Optional time unit for comparison precision
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareDates(
    date1: Date | string | number,
    date2: Date | string | number,
    unit?: TimeUnit
): -1 | 0 | 1 {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to compareDates');
    }

    let time1 = safeDate1.getTime();
    let time2 = safeDate2.getTime();

    // If unit is specified, truncate both dates to that unit for comparison
    if (unit) {
        const truncated1 = truncateToUnit(safeDate1, unit);
        const truncated2 = truncateToUnit(safeDate2, unit);
        time1 = truncated1.getTime();
        time2 = truncated2.getTime();
    }

    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
}

/**
 * Gets the Unix timestamp for a date
 * @param date - The date to convert
 * @param inSeconds - Whether to return timestamp in seconds (default: false, returns milliseconds)
 * @returns Unix timestamp
 */
export function getTimestamp(date: Date | string | number, inSeconds = false): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getTimestamp');
    }

    const timestamp = safeDate.getTime();
    return inSeconds ? Math.floor(timestamp / 1000) : timestamp;
}

/**
 * Creates a Date from a Unix timestamp
 * @param timestamp - Unix timestamp in milliseconds or seconds
 * @returns A new Date object
 */
export function fromTimestamp(timestamp: number): Date {
    if (typeof timestamp !== 'number' || !isFinite(timestamp)) {
        throw new ChronoUtilzError('Invalid timestamp provided to fromTimestamp');
    }

    // Auto-detect if timestamp is in seconds (likely if < year 2100 in milliseconds)
    const timestampMs = timestamp < 4102444800000 ? timestamp * 1000 : timestamp;
    
    const date = new Date(timestampMs);
    if (isNaN(date.getTime())) {
        throw new ChronoUtilzError(`Invalid timestamp: ${timestamp}`);
    }

    return date;
}

/**
 * Generates a random date between two dates
 * @param startDate - The start of the range
 * @param endDate - The end of the range
 * @returns A random Date within the specified range
 */
export function randomDate(
    startDate: Date | string | number,
    endDate: Date | string | number
): Date {
    const safeStartDate = parseDate(startDate, { throwError: true });
    const safeEndDate = parseDate(endDate, { throwError: true });

    if (!safeStartDate || !safeEndDate) {
        throw new ChronoUtilzError('Invalid date(s) provided to randomDate');
    }

    if (safeStartDate >= safeEndDate) {
        throw new ChronoUtilzError('Start date must be before end date');
    }

    const startTime = safeStartDate.getTime();
    const endTime = safeEndDate.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);

    return new Date(randomTime);
}

/**
 * Copies the time portion (hours, minutes, seconds, milliseconds) from one date to another
 * @param fromDate - The date to copy time from
 * @param toDate - The date to copy time to
 * @returns A new Date with the date from toDate and time from fromDate
 */
export function copyTime(
    fromDate: Date | string | number,
    toDate: Date | string | number
): Date {
    const safeFromDate = parseDate(fromDate, { throwError: true });
    const safeToDate = parseDate(toDate, { throwError: true });

    if (!safeFromDate || !safeToDate) {
        throw new ChronoUtilzError('Invalid date(s) provided to copyTime');
    }

    const result = new Date(safeToDate.getTime());
    result.setHours(
        safeFromDate.getHours(),
        safeFromDate.getMinutes(),
        safeFromDate.getSeconds(),
        safeFromDate.getMilliseconds()
    );

    return result;
}

/**
 * Truncates a date to the specified unit (sets smaller units to their minimum values)
 * @param date - The date to truncate
 * @param unit - The time unit to truncate to
 * @returns A new Date truncated to the specified unit
 */
export function truncateToUnit(
    date: Date | string | number,
    unit: TimeUnit
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to truncateToUnit');
    }

    const result = new Date(safeDate.getTime());

    switch (unit) {
        case 'millisecond':
            // No truncation needed
            break;
        case 'second':
            result.setMilliseconds(0);
            break;
        case 'minute':
            result.setSeconds(0, 0);
            break;
        case 'hour':
            result.setMinutes(0, 0, 0);
            break;
        case 'day':
            result.setHours(0, 0, 0, 0);
            break;
        case 'week': {
            const dayOfWeek = result.getDay();
            result.setDate(result.getDate() - dayOfWeek);
            result.setHours(0, 0, 0, 0);
            break;
        }
        case 'month':
            result.setDate(1);
            result.setHours(0, 0, 0, 0);
            break;
        case 'year':
            result.setMonth(0, 1);
            result.setHours(0, 0, 0, 0);
            break;
        default:
            throw new ChronoUtilzError(`Invalid time unit for truncateToUnit: ${unit}`);
    }

    return result;
}

/**
 * Sets the time components of a date
 * @param date - The base date
 * @param hours - Hours (0-23)
 * @param minutes - Minutes (0-59), optional
 * @param seconds - Seconds (0-59), optional
 * @param milliseconds - Milliseconds (0-999), optional
 * @returns A new Date with the specified time components
 */
export function setTime(
    date: Date | string | number,
    hours: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to setTime');
    }

    // Validate hours
    if (hours < 0 || hours > 23 || !Number.isInteger(hours)) {
        throw new ChronoUtilzError('Hours must be an integer between 0 and 23');
    }

    // Validate minutes if provided
    if (minutes !== undefined && (minutes < 0 || minutes > 59 || !Number.isInteger(minutes))) {
        throw new ChronoUtilzError('Minutes must be an integer between 0 and 59');
    }

    // Validate seconds if provided
    if (seconds !== undefined && (seconds < 0 || seconds > 59 || !Number.isInteger(seconds))) {
        throw new ChronoUtilzError('Seconds must be an integer between 0 and 59');
    }

    // Validate milliseconds if provided
    if (milliseconds !== undefined && (milliseconds < 0 || milliseconds > 999 || !Number.isInteger(milliseconds))) {
        throw new ChronoUtilzError('Milliseconds must be an integer between 0 and 999');
    }

    const result = new Date(safeDate.getTime());
    result.setHours(
        hours,
        minutes ?? result.getMinutes(),
        seconds ?? result.getSeconds(),
        milliseconds ?? result.getMilliseconds()
    );

    return result;
}

// ========================================
// NEW COMPARISON FUNCTIONS
// ========================================

/**
 * Checks if two dates fall on the same day
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are on the same day
 */
export function isSameDay(
    date1: Date | string | number,
    date2: Date | string | number
): boolean {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to isSameDay');
    }

    return (
        safeDate1.getFullYear() === safeDate2.getFullYear() &&
        safeDate1.getMonth() === safeDate2.getMonth() &&
        safeDate1.getDate() === safeDate2.getDate()
    );
}

/**
 * Checks if two dates fall in the same week (Sunday-Saturday)
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are in the same week
 */
export function isSameWeek(
    date1: Date | string | number,
    date2: Date | string | number
): boolean {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to isSameWeek');
    }

    const startOfWeek1 = startOf(safeDate1, 'week');
    const startOfWeek2 = startOf(safeDate2, 'week');

    return startOfWeek1.getTime() === startOfWeek2.getTime();
}

/**
 * Checks if two dates fall in the same month and year
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are in the same month and year
 */
export function isSameMonth(
    date1: Date | string | number,
    date2: Date | string | number
): boolean {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to isSameMonth');
    }

    return (
        safeDate1.getFullYear() === safeDate2.getFullYear() &&
        safeDate1.getMonth() === safeDate2.getMonth()
    );
}

/**
 * Checks if two dates fall in the same year
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if both dates are in the same year
 */
export function isSameYear(
    date1: Date | string | number,
    date2: Date | string | number
): boolean {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to isSameYear');
    }

    return safeDate1.getFullYear() === safeDate2.getFullYear();
}

/**
 * Checks if the first date is after the second date
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @param unit - Optional time unit for comparison precision
 * @returns True if date1 is after date2
 */
export function isAfter(
    date1: Date | string | number,
    date2: Date | string | number,
    unit?: TimeUnit
): boolean {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to isAfter');
    }

    if (unit) {
        const truncated1 = truncateToUnit(safeDate1, unit);
        const truncated2 = truncateToUnit(safeDate2, unit);
        return truncated1.getTime() > truncated2.getTime();
    }

    return safeDate1.getTime() > safeDate2.getTime();
}

/**
 * Checks if the first date is before the second date
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @param unit - Optional time unit for comparison precision
 * @returns True if date1 is before date2
 */
export function isBefore(
    date1: Date | string | number,
    date2: Date | string | number,
    unit?: TimeUnit
): boolean {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });

    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid date(s) provided to isBefore');
    }

    if (unit) {
        const truncated1 = truncateToUnit(safeDate1, unit);
        const truncated2 = truncateToUnit(safeDate2, unit);
        return truncated1.getTime() < truncated2.getTime();
    }

    return safeDate1.getTime() < safeDate2.getTime();
}

/**
 * Checks if a date falls within a specified range
 * @param date - The date to check
 * @param startDate - The start of the range
 * @param endDate - The end of the range
 * @param inclusive - Whether to include the boundaries (default: true)
 * @returns True if the date is within the specified range
 */
export function isWithinRange(
    date: Date | string | number,
    startDate: Date | string | number,
    endDate: Date | string | number,
    inclusive = true
): boolean {
    return isBetweenDates(date, startDate, endDate, inclusive);
}

/**
 * Validates if a date range is valid (start date is before or equal to end date)
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @returns True if the range is valid
 */
export function isValidRange(
    startDate: Date | string | number,
    endDate: Date | string | number
): boolean {
    const safeStartDate = parseDate(startDate, { throwError: false });
    const safeEndDate = parseDate(endDate, { throwError: false });

    if (!safeStartDate || !safeEndDate) {
        return false;
    }

    return safeStartDate.getTime() <= safeEndDate.getTime();
}

/**
 * Sort order for date arrays
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Sorts an array of dates in ascending or descending order
 * @param dateArray - Array of dates to sort
 * @param order - Sort order ('asc' for ascending, 'desc' for descending)
 * @returns A new sorted array of Date objects
 */
export function sortDates(
    dateArray: (Date | string | number)[],
    order: SortOrder = 'asc'
): Date[] {
    if (!Array.isArray(dateArray)) {
        throw new ChronoUtilzError('First argument must be an array');
    }

    if (dateArray.length === 0) {
        return [];
    }

    // Parse all dates and filter out invalid ones
    const parsedDates = dateArray
        .map(date => parseDate(date, { throwError: false }))
        .filter((date): date is Date => date !== null);

    // Sort based on order
    const sortedDates = parsedDates.sort((a, b) => {
        const comparison = a.getTime() - b.getTime();
        return order === 'asc' ? comparison : -comparison;
    });

    // Return new Date objects to maintain immutability
    return sortedDates.map(date => new Date(date.getTime()));
}

/**
 * Gets the earliest date from an array of dates
 * @param dateArray - Array of dates to compare
 * @returns The earliest date as a new Date object
 */
export function getEarliestDate(dateArray: (Date | string | number)[]): Date {
    if (!Array.isArray(dateArray)) {
        throw new ChronoUtilzError('Argument must be an array');
    }

    if (dateArray.length === 0) {
        throw new ChronoUtilzError('Array cannot be empty');
    }

    return minDate(...dateArray);
}

/**
 * Gets the latest date from an array of dates
 * @param dateArray - Array of dates to compare
 * @returns The latest date as a new Date object
 */
export function getLatestDate(dateArray: (Date | string | number)[]): Date {
    if (!Array.isArray(dateArray)) {
        throw new ChronoUtilzError('Argument must be an array');
    }

    if (dateArray.length === 0) {
        throw new ChronoUtilzError('Array cannot be empty');
    }

    return maxDate(...dateArray);
}

/**
 * Removes duplicate dates from an array (based on day precision)
 * @param dateArray - Array of dates that may contain duplicates
 * @param unit - Time unit for comparison precision (default: 'day')
 * @returns A new array with duplicate dates removed
 */
export function removeDuplicateDates(
    dateArray: (Date | string | number)[],
    unit: TimeUnit = 'day'
): Date[] {
    if (!Array.isArray(dateArray)) {
        throw new ChronoUtilzError('First argument must be an array');
    }

    if (dateArray.length === 0) {
        return [];
    }

    // Parse all dates and filter out invalid ones
    const parsedDates = dateArray
        .map(date => parseDate(date, { throwError: false }))
        .filter((date): date is Date => date !== null);

    // Use a Set to track unique timestamps at the specified unit precision
    const seenTimestamps = new Set<number>();
    const uniqueDates: Date[] = [];

    for (const date of parsedDates) {
        const truncatedDate = truncateToUnit(date, unit);
        const timestamp = truncatedDate.getTime();

        if (!seenTimestamps.has(timestamp)) {
            seenTimestamps.add(timestamp);
            uniqueDates.push(new Date(date.getTime())); // Keep original precision
        }
    }

    return uniqueDates;
}

/**
 * Checks if the given date is the first day of the month
 * @param date - The date to check
 * @returns True if it's the first day of the month
 * 
 * @example
 * ```typescript
 * isFirstDayOfMonth(new Date('2024-01-01')) // true
 * isFirstDayOfMonth(new Date('2024-01-15')) // false
 * ```
 */
export function isFirstDayOfMonth(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isFirstDayOfMonth');
    }
    return safeDate.getDate() === 1;
}

/**
 * Checks if the given date is the last day of the month
 * @param date - The date to check
 * @returns True if it's the last day of the month
 * 
 * @example
 * ```typescript
 * isLastDayOfMonth(new Date('2024-01-31')) // true
 * isLastDayOfMonth(new Date('2024-02-29')) // true (leap year)
 * isLastDayOfMonth(new Date('2024-01-15')) // false
 * ```
 */
export function isLastDayOfMonth(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isLastDayOfMonth');
    }
    
    const nextDay = new Date(safeDate);
    nextDay.setDate(safeDate.getDate() + 1);
    return nextDay.getMonth() !== safeDate.getMonth();
}

/**
 * Checks if the given date is the first day of the year (January 1st)
 * @param date - The date to check
 * @returns True if it's January 1st
 * 
 * @example
 * ```typescript
 * isFirstDayOfYear(new Date('2024-01-01')) // true
 * isFirstDayOfYear(new Date('2024-12-31')) // false
 * ```
 */
export function isFirstDayOfYear(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isFirstDayOfYear');
    }
    return safeDate.getMonth() === 0 && safeDate.getDate() === 1;
}

/**
 * Checks if the given date is the last day of the year (December 31st)
 * @param date - The date to check
 * @returns True if it's December 31st
 * 
 * @example
 * ```typescript
 * isLastDayOfYear(new Date('2024-12-31')) // true
 * isLastDayOfYear(new Date('2024-01-01')) // false
 * ```
 */
export function isLastDayOfYear(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isLastDayOfYear');
    }
    return safeDate.getMonth() === 11 && safeDate.getDate() === 31;
}

/**
 * Week boundaries result interface
 */
export interface WeekBoundaries {
    /** Start of the week */
    start: Date;
    /** End of the week */
    end: Date;
}

/**
 * Gets the start and end dates of the week containing the given date
 * @param date - The date to find week boundaries for
 * @param weekStartsOn - Day of week that starts the week (0=Sunday, 1=Monday, etc.)
 * @returns Object with 'start' and 'end' Date properties
 * 
 * @example
 * ```typescript
 * // For a date in mid-week (Monday start)
 * getWeekBoundaries(new Date('2024-01-15'))
 * // Returns: { start: Monday date, end: Sunday date }
 * 
 * // Sunday start week
 * getWeekBoundaries(new Date('2024-01-15'), 0)
 * // Returns: { start: Sunday date, end: Saturday date }
 * ```
 */
export function getWeekBoundaries(
    date: Date | string | number,
    weekStartsOn = 1  // Remove `: number` here
): WeekBoundaries {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getWeekBoundaries');
    }

    if (weekStartsOn < 0 || weekStartsOn > 6 || !Number.isInteger(weekStartsOn)) {
        throw new ChronoUtilzError('weekStartsOn must be an integer between 0 and 6');
    }
    
    const day = safeDate.getDay();
    const diff = day < weekStartsOn ? day + 7 - weekStartsOn : day - weekStartsOn;
    
    const start = new Date(safeDate);
    start.setDate(safeDate.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
}

/**
 * Month boundaries result interface
 */
export interface MonthBoundaries {
    /** Start of the month */
    start: Date;
    /** End of the month */
    end: Date;
}

/**
 * Gets the start and end dates of the month containing the given date
 * @param date - The date to find month boundaries for
 * @returns Object with 'start' and 'end' Date properties
 * 
 * @example
 * ```typescript
 * getMonthBoundaries(new Date('2024-01-15'))
 * // Returns: { start: 2024-01-01 00:00:00, end: 2024-01-31 23:59:59 }
 * 
 * getMonthBoundaries(new Date('2024-02-15'))
 * // Returns: { start: 2024-02-01 00:00:00, end: 2024-02-29 23:59:59 } (leap year)
 * ```
 */
export function getMonthBoundaries(date: Date | string | number): MonthBoundaries {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getMonthBoundaries');
    }
    
    const start = new Date(safeDate.getFullYear(), safeDate.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(safeDate.getFullYear(), safeDate.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
}

/**
 * Year boundaries result interface
 */
export interface YearBoundaries {
    /** Start of the year */
    start: Date;
    /** End of the year */
    end: Date;
}

/**
 * Gets the start and end dates of the specified year
 * @param year - The year to get boundaries for
 * @returns Object with 'start' and 'end' Date properties
 * 
 * @example
 * ```typescript
 * getYearBoundaries(2024)
 * // Returns: { start: 2024-01-01 00:00:00, end: 2024-12-31 23:59:59 }
 * ```
 */
export function getYearBoundaries(year: number): YearBoundaries {
    if (!Number.isInteger(year) || year < 1000 || year > 9999) {
        throw new ChronoUtilzError('Year must be a 4-digit integer');
    }
    
    const start = new Date(year, 0, 1);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(year, 11, 31);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
}

/**
 * Quarter boundaries result interface
 */
export interface QuarterBoundaries {
    /** Start of the quarter */
    start: Date;
    /** End of the quarter */
    end: Date;
}

/**
 * Gets the start and end dates of the specified quarter in the given year
 * @param year - The year
 * @param quarter - The quarter (1, 2, 3, or 4)
 * @returns Object with 'start' and 'end' Date properties
 * 
 * @example
 * ```typescript
 * getQuarterBoundaries(2024, 1)
 * // Returns: { start: 2024-01-01 00:00:00, end: 2024-03-31 23:59:59 }
 * 
 * getQuarterBoundaries(2024, 4)
 * // Returns: { start: 2024-10-01 00:00:00, end: 2024-12-31 23:59:59 }
 * ```
 */
export function getQuarterBoundaries(year: number, quarter: number): QuarterBoundaries {
    if (!Number.isInteger(year) || year < 1000 || year > 9999) {
        throw new ChronoUtilzError('Year must be a 4-digit integer');
    }
    
    if (!Number.isInteger(quarter) || quarter < 1 || quarter > 4) {
        throw new ChronoUtilzError('Quarter must be between 1 and 4');
    }
    
    const startMonth = (quarter - 1) * 3;
    const endMonth = startMonth + 2;
    
    const start = new Date(year, startMonth, 1);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(year, endMonth + 1, 0);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
}

/**
 * Returns a new date with time set to midnight (00:00:00.000)
 * @param date - The date to strip time from
 * @returns New date at midnight
 * 
 * @example
 * ```typescript
 * stripTime(new Date('2024-01-15 14:30:45'))
 * // Returns: 2024-01-15 00:00:00.000
 * ```
 */
export function stripTime(date: Date | string | number): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to stripTime');
    }
    
    const result = new Date(safeDate);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Returns a new date set to midnight (00:00:00.000) of the given date
 * Alias for stripTime() for semantic clarity
 * @param date - The date to set to midnight
 * @returns New date at midnight
 * 
 * @example
 * ```typescript
 * getMidnight(new Date('2024-01-15 14:30:45'))
 * // Returns: 2024-01-15 00:00:00.000
 * ```
 */
export function getMidnight(date: Date | string | number): Date {
    return stripTime(date);
}

/**
 * Returns a new date set to noon (12:00:00.000) of the given date
 * @param date - The date to set to noon
 * @returns New date at noon
 * 
 * @example
 * ```typescript
 * getNoon(new Date('2024-01-15 14:30:45'))
 * // Returns: 2024-01-15 12:00:00.000
 * ```
 */
export function getNoon(date: Date | string | number): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getNoon');
    }
    
    const result = new Date(safeDate);
    result.setHours(12, 0, 0, 0);
    return result;
}

/**
 * Global configuration for working days and holidays
 */
interface BusinessDayConfig {
    /** Working days (0=Sunday, 1=Monday, ..., 6=Saturday) */
    workingDays: number[];
    /** Array of holiday dates (ISO strings or Date objects) */
    holidays: Set<string>;
}

/**
 * Default business day configuration
 * Monday through Friday (1-5) as working days
 */
const defaultConfig: BusinessDayConfig = {
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    holidays: new Set<string>()
};

/**
 * Current business day configuration
 */
let currentConfig: BusinessDayConfig = { ...defaultConfig, holidays: new Set(defaultConfig.holidays) };

/**
 * Configures which days of the week are considered working days
 * @param dayArray - Array of day numbers (0=Sunday, 1=Monday, ..., 6=Saturday)
 * @returns The updated configuration for method chaining
 * 
 * @example
 * ```typescript
 * // Standard Monday-Friday
 * configureWorkingDays([1, 2, 3, 4, 5])
 * 
 * // Sunday-Thursday (Middle East style)
 * configureWorkingDays([0, 1, 2, 3, 4])
 * 
 * // Monday-Saturday
 * configureWorkingDays([1, 2, 3, 4, 5, 6])
 * ```
 */
export function configureWorkingDays(dayArray: number[]): BusinessDayConfig {
    if (!Array.isArray(dayArray)) {
        throw new ChronoUtilzError('dayArray must be an array');
    }

    if (dayArray.length === 0) {
        throw new ChronoUtilzError('dayArray cannot be empty');
    }

    // Validate day numbers
    for (const day of dayArray) {
        if (!Number.isInteger(day) || day < 0 || day > 6) {
            throw new ChronoUtilzError('Day numbers must be integers between 0 and 6');
        }
    }

    // Remove duplicates and sort
    const uniqueDays = [...new Set(dayArray)].sort((a, b) => a - b);
    
    currentConfig.workingDays = uniqueDays;
    return { ...currentConfig, holidays: new Set(currentConfig.holidays) };
}

/**
 * Adds holidays to the business day configuration
 * @param holidays - Array of holiday dates
 * @returns The updated configuration for method chaining
 * 
 * @example
 * ```typescript
 * configureHolidays([
 *   '2024-01-01', // New Year's Day
 *   '2024-07-04', // Independence Day
 *   '2024-12-25'  // Christmas Day
 * ])
 * ```
 */
export function configureHolidays(holidays: (Date | string | number)[]): BusinessDayConfig {
    if (!Array.isArray(holidays)) {
        throw new ChronoUtilzError('holidays must be an array');
    }

    const holidaySet = new Set<string>();
    
    for (const holiday of holidays) {
        const parsedHoliday = parseDate(holiday, { throwError: true });
        if (!parsedHoliday) {
            throw new ChronoUtilzError(`Invalid holiday date: ${holiday}`);
        }
        
        // Store as YYYY-MM-DD format for consistent comparison (timezone neutral)
        const year = parsedHoliday.getFullYear();
        const month = String(parsedHoliday.getMonth() + 1).padStart(2, '0');
        const day = String(parsedHoliday.getDate()).padStart(2, '0');
        const holidayStr = `${year}-${month}-${day}`;
        holidaySet.add(holidayStr);
    }
    
    currentConfig.holidays = holidaySet;
    return { ...currentConfig, holidays: new Set(currentConfig.holidays) };
}

/**
 * Gets the current business day configuration
 * @returns A copy of the current configuration
 */
export function getBusinessDayConfig(): BusinessDayConfig {
    return {
        workingDays: [...currentConfig.workingDays],
        holidays: new Set(currentConfig.holidays)
    };
}

/**
 * Resets business day configuration to defaults
 * @returns The reset configuration
 */
export function resetBusinessDayConfig(): BusinessDayConfig {
    currentConfig = { ...defaultConfig, holidays: new Set() };
    return getBusinessDayConfig();
}

/**
 * Converts a date to YYYY-MM-DD format for holiday comparison
 * @param date - The date to format
 * @returns Date string in YYYY-MM-DD format
 */
function formatDateForComparison(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Checks if a date falls on a weekend
 * @param date - The date to check
 * @returns True if the date is a weekend
 * 
 * @example
 * ```typescript
 * isWeekend(new Date('2024-01-06')) // true (Saturday)
 * isWeekend(new Date('2024-01-08')) // false (Monday)
 * ```
 */
export function isWeekend(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isWeekend');
    }

    const dayOfWeek = safeDate.getDay();
    return !currentConfig.workingDays.includes(dayOfWeek);
}

/**
 * Checks if a date falls on a weekday (according to current working day configuration)
 * @param date - The date to check
 * @returns True if the date is a weekday
 * 
 * @example
 * ```typescript
 * isWeekday(new Date('2024-01-08')) // true (Monday)
 * isWeekday(new Date('2024-01-06')) // false (Saturday)
 * ```
 */
export function isWeekday(date: Date | string | number): boolean {
    return !isWeekend(date);
}

/**
 * Checks if a date is a business day (weekday and not a holiday)
 * @param date - The date to check
 * @returns True if the date is a business day
 * 
 * @example
 * ```typescript
 * isBusinessDay(new Date('2024-01-08')) // true (Monday, not holiday)
 * isBusinessDay(new Date('2024-01-01')) // false (New Year's Day)
 * isBusinessDay(new Date('2024-01-06')) // false (Saturday)
 * ```
 */
export function isBusinessDay(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isBusinessDay');
    }

    // First check if it's a weekday
    if (isWeekend(safeDate)) {
        return false;
    }

    // Then check if it's a holiday
    const dateStr = formatDateForComparison(safeDate);
    return !currentConfig.holidays.has(dateStr);
}

/**
 * Adds the specified number of business days to a date
 * @param date - The starting date
 * @param businessDays - Number of business days to add
 * @returns A new date with business days added
 * 
 * @example
 * ```typescript
 * // Add 5 business days to Friday, Jan 5, 2024
 * addBusinessDays(new Date('2024-01-05'), 5)
 * // Returns: Friday, Jan 12, 2024 (skips weekends)
 * ```
 */
export function addBusinessDays(
    date: Date | string | number,
    businessDays: number,
    timezone?: IANATimezone
): Date {
    const targetTimezone = getEffectiveTimezone(timezone);
    const safeDate = parseDate(date, { throwError: true, timezone: targetTimezone });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to addBusinessDays');
    }

    if (!Number.isInteger(businessDays)) {
        throw new ChronoUtilzError('businessDays must be an integer');
    }

    if (businessDays === 0) {
        return new Date(safeDate);
    }

    const result = new Date(safeDate);
    const increment = businessDays > 0 ? 1 : -1;
    let remaining = Math.abs(businessDays);

    while (remaining > 0) {
        result.setDate(result.getDate() + increment);
        
        if (isBusinessDay(result)) {
            remaining--;
        }
    }

    return result;
}

/**
 * Subtracts the specified number of business days from a date
 * @param date - The starting date
 * @param businessDays - Number of business days to subtract
 * @returns A new date with business days subtracted
 * 
 * @example
 * ```typescript
 * // Subtract 3 business days from Wednesday, Jan 10, 2024
 * subtractBusinessDays(new Date('2024-01-10'), 3)
 * // Returns: Friday, Jan 5, 2024 (skips weekend)
 * ```
 */
export function subtractBusinessDays(
    date: Date | string | number,
    businessDays: number
): Date {
    return addBusinessDays(date, -businessDays);
}

/**
 * Gets the next business day from the given date
 * @param date - The starting date
 * @returns The next business day
 * 
 * @example
 * ```typescript
 * // From Friday, Jan 5, 2024
 * getNextBusinessDay(new Date('2024-01-05'))
 * // Returns: Monday, Jan 8, 2024
 * ```
 */
export function getNextBusinessDay(date: Date | string | number): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getNextBusinessDay');
    }

    const result = new Date(safeDate);
    
    do {
        result.setDate(result.getDate() + 1);
    } while (!isBusinessDay(result));

    return result;
}

/**
 * Gets the previous business day from the given date
 * @param date - The starting date
 * @returns The previous business day
 * 
 * @example
 * ```typescript
 * // From Monday, Jan 8, 2024
 * getPreviousBusinessDay(new Date('2024-01-08'))
 * // Returns: Friday, Jan 5, 2024
 * ```
 */
export function getPreviousBusinessDay(date: Date | string | number): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getPreviousBusinessDay');
    }

    const result = new Date(safeDate);
    
    do {
        result.setDate(result.getDate() - 1);
    } while (!isBusinessDay(result));

    return result;
}

/**
 * Counts the number of business days in a given month
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Number of business days in the month
 * 
 * @example
 * ```typescript
 * businessDaysInMonth(2024, 1) // Returns: 23 (January 2024)
 * businessDaysInMonth(2024, 12) // Returns: 22 (December 2024)
 * ```
 */
export function businessDaysInMonth(year: number, month: number): number {
    if (!Number.isInteger(year) || year < 1000 || year > 9999) {
        throw new ChronoUtilzError('Year must be a 4-digit integer');
    }

    if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new ChronoUtilzError('Month must be between 1 and 12');
    }

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    let count = 0;
    const current = new Date(firstDay);

    while (current <= lastDay) {
        if (isBusinessDay(current)) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }

    return count;
}

/**
 * Calculates the difference in business days between two dates
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns Number of business days between the dates (positive if endDate > startDate)
 * 
 * @example
 * ```typescript
 * // From Monday to Friday (same week)
 * differenceInBusinessDays(
 *   new Date('2024-01-08'), 
 *   new Date('2024-01-12')
 * ) // Returns: 4
 * 
 * // Across weekends
 * differenceInBusinessDays(
 *   new Date('2024-01-05'), // Friday
 *   new Date('2024-01-09')  // Tuesday
 * ) // Returns: 2 (excludes weekend)
 * ```
 */
export function differenceInBusinessDays(
    startDate: Date | string | number,
    endDate: Date | string | number
): number {
    const safeStartDate = parseDate(startDate, { throwError: true });
    const safeEndDate = parseDate(endDate, { throwError: true });

    if (!safeStartDate || !safeEndDate) {
        throw new ChronoUtilzError('Invalid date(s) provided to differenceInBusinessDays');
    }

    // Normalize to start of day for accurate counting
    const start = new Date(safeStartDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(safeEndDate);
    end.setHours(0, 0, 0, 0);

    // Determine direction
    const isForward = end >= start;
    const fromDate = isForward ? start : end;
    const toDate = isForward ? end : start;

    let count = 0;
    const current = new Date(fromDate);

    // Don't include the start date, only count days between
    current.setDate(current.getDate() + 1);

    while (current <= toDate) {
        if (isBusinessDay(current)) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }

    return isForward ? count : -count;
}

/**
 * Checks if a date is the last business day of the month
 * @param date - The date to check
 * @returns True if it's the last business day of the month
 * 
 * @example
 * ```typescript
 * isLastBusinessDayOfMonth(new Date('2024-01-31')) // true if Jan 31 is a business day
 * isLastBusinessDayOfMonth(new Date('2024-01-30')) // true if Jan 31 is weekend/holiday
 * ```
 */
export function isLastBusinessDayOfMonth(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isLastBusinessDayOfMonth');
    }

    // Must be a business day first
    if (!isBusinessDay(safeDate)) {
        return false;
    }

    // Check if there are any business days after this date in the same month
    const nextDay = new Date(safeDate);
    nextDay.setDate(safeDate.getDate() + 1);

    // If we moved to next month, this was the last day of the month
    if (nextDay.getMonth() !== safeDate.getMonth()) {
        return true;
    }

    // Check if there are any business days remaining in the month
    const lastDayOfMonth = new Date(safeDate.getFullYear(), safeDate.getMonth() + 1, 0);
    const current = new Date(nextDay);

    while (current <= lastDayOfMonth) {
        if (isBusinessDay(current)) {
            return false; // Found another business day
        }
        current.setDate(current.getDate() + 1);
    }

    return true;
}

/**
 * Checks if a date is the first business day of the month
 * @param date - The date to check
 * @returns True if it's the first business day of the month
 * 
 * @example
 * ```typescript
 * isFirstBusinessDayOfMonth(new Date('2024-01-01')) // true if Jan 1 is a business day
 * isFirstBusinessDayOfMonth(new Date('2024-01-02')) // true if Jan 1 is weekend/holiday
 * ```
 */
export function isFirstBusinessDayOfMonth(date: Date | string | number): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isFirstBusinessDayOfMonth');
    }

    // Must be a business day first
    if (!isBusinessDay(safeDate)) {
        return false;
    }

    // Check if there are any business days before this date in the same month
    const firstDayOfMonth = new Date(safeDate.getFullYear(), safeDate.getMonth(), 1);
    const current = new Date(firstDayOfMonth);

    while (current < safeDate) {
        if (isBusinessDay(current)) {
            return false; // Found an earlier business day
        }
        current.setDate(current.getDate() + 1);
    }

    return true;
}

/**
 * Gets an array of all business days in a given month
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Array of Date objects representing business days
 * 
 * @example
 * ```typescript
 * getBusinessDaysInMonth(2024, 1)
 * // Returns: Array of Date objects for all business days in January 2024
 * ```
 */
export function getBusinessDaysInMonth(year: number, month: number): Date[] {
    if (!Number.isInteger(year) || year < 1000 || year > 9999) {
        throw new ChronoUtilzError('Year must be a 4-digit integer');
    }

    if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new ChronoUtilzError('Month must be between 1 and 12');
    }

    const businessDays: Date[] = [];
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    const current = new Date(firstDay);

    while (current <= lastDay) {
        if (isBusinessDay(current)) {
            businessDays.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }

    return businessDays;
}

// Additional functions to add to the ChronoUtilz library

/**
 * Holiday configuration interface
 */
export interface HolidayRule {
    name: string;
    date: string | ((year: number) => Date);
    type?: 'fixed' | 'floating';
}

/**
 * Country holiday configurations
 */
const holidayRules: Record<string, HolidayRule[]> = {
    'US': [
        { name: 'New Year\'s Day', date: '01-01', type: 'fixed' },
        { name: 'Independence Day', date: '07-04', type: 'fixed' },
        { name: 'Christmas Day', date: '12-25', type: 'fixed' },
        // Add more US holidays as needed
    ],
    'UK': [
        { name: 'New Year\'s Day', date: '01-01', type: 'fixed' },
        { name: 'Christmas Day', date: '12-25', type: 'fixed' },
        { name: 'Boxing Day', date: '12-26', type: 'fixed' },
        // Add more UK holidays as needed
    ]
    // Add more countries as needed
};

/**
 * Custom holidays storage
 */
const customHolidays: Set<string> = new Set();

/**
 * Checks if a date is a holiday
 * @param date - The date to check
 * @param holidaysList - Optional custom list of holidays
 * @returns True if the date is a holiday
 */
export function isHoliday(
    date: Date | string | number,
    holidaysList?: (Date | string)[],
    timezone?: IANATimezone
): boolean {
    const targetTimezone = getEffectiveTimezone(timezone);
    const safeDate = parseDate(date, { throwError: true, timezone: targetTimezone });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isHoliday');
    }

    const dateStr = formatDate(safeDate, 'YYYY-MM-DD');

    // Check custom holidays first
    if (customHolidays.has(dateStr)) {
        return true;
    }

    // Check provided holidays list
    if (holidaysList && Array.isArray(holidaysList)) {
        for (const holiday of holidaysList) {
            const holidayDate = parseDate(holiday, { throwError: false });
            if (holidayDate && formatDate(holidayDate, 'YYYY-MM-DD') === dateStr) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Gets holidays for a specific year and country
 * @param year - The year to get holidays for
 * @param country - Optional country code (default: 'US')
 * @returns Array of holiday dates
 */
export function getHolidays(year: number, country = 'US'): Date[] {
    if (!Number.isInteger(year) || year < 1000 || year > 9999) {
        throw new ChronoUtilzError('Year must be a 4-digit integer');
    }

    const countryRules = holidayRules[country.toUpperCase()];
    if (!countryRules) {
        throw new ChronoUtilzError(`No holiday rules found for country: ${country}`);
    }

    const holidays: Date[] = [];

    for (const rule of countryRules) {
        if (typeof rule.date === 'string') {
            // Fixed date format: MM-DD
            const [month, day] = rule.date.split('-').map(Number);
            holidays.push(new Date(year, month - 1, day));
        } else if (typeof rule.date === 'function') {
            // Floating date calculation
            holidays.push(rule.date(year));
        }
    }

    return holidays;
}

/**
 * Adds holiday rules for a country
 * @param country - The country code
 * @param rules - Array of holiday rules
 */
export function addHolidayRules(country: string, rules: HolidayRule[]): void {
    if (!Array.isArray(rules)) {
        throw new ChronoUtilzError('Rules must be an array');
    }

    holidayRules[country.toUpperCase()] = rules;
}

/**
 * Gets the next holiday from a given date
 * @param date - The starting date
 * @param country - Optional country code (default: 'US')
 * @returns The next holiday date
 */
export function getNextHoliday(
    date: Date | string | number,
    country = 'US'
): Date | null {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getNextHoliday');
    }

    const currentYear = safeDate.getFullYear();
    
    // Get holidays for current and next year
    const thisYearHolidays = getHolidays(currentYear, country);
    const nextYearHolidays = getHolidays(currentYear + 1, country);
    
    const allHolidays = [...thisYearHolidays, ...nextYearHolidays];
    
    // Find the next holiday after the given date
    const futureHolidays = allHolidays
        .filter(holiday => holiday > safeDate)
        .sort((a, b) => a.getTime() - b.getTime());

    return futureHolidays.length > 0 ? futureHolidays[0] : null;
}

/**
 * Adds custom holidays
 * @param holidayArray - Array of custom holiday dates
 */
export function addCustomHolidays(holidayArray: (Date | string | number)[]): void {
    if (!Array.isArray(holidayArray)) {
        throw new ChronoUtilzError('holidayArray must be an array');
    }

    for (const holiday of holidayArray) {
        const holidayDate = parseDate(holiday, { throwError: true });
        if (!holidayDate) {
            throw new ChronoUtilzError(`Invalid holiday date: ${holiday}`);
        }
        
        const holidayStr = formatDate(holidayDate, 'YYYY-MM-DD');
        customHolidays.add(holidayStr);
    }
}

/**
 * Custom business day rules interface
 */
export interface BusinessDayRules {
    workingDays: number[];
    holidays: (Date | string)[];
    workingHours?: { start: string; end: string };
}

/**
 * Calculates business days with custom rules
 * @param start - Start date
 * @param end - End date
 * @param rules - Custom business day rules
 * @returns Number of business days
 */
export function calculateBusinessDaysCustom(
    start: Date | string | number,
    end: Date | string | number,
    rules: BusinessDayRules
): number {
    const startDate = parseDate(start, { throwError: true });
    const endDate = parseDate(end, { throwError: true });

    if (!startDate || !endDate) {
        throw new ChronoUtilzError('Invalid start or end date');
    }

    const { workingDays, holidays } = rules;
    
    // Create holiday set for fast lookup
    const holidaySet = new Set(
        holidays.map(h => {
            const date = parseDate(h, { throwError: false });
            return date ? formatDate(date, 'YYYY-MM-DD') : null;
        }).filter((date): date is string => date !== null)
    );

    let count = 0;
    const current = new Date(startDate);
    current.setDate(current.getDate() + 1); // Start from next day

    while (current <= endDate) {
        const dayOfWeek = current.getDay();
        const dateStr = formatDate(current, 'YYYY-MM-DD');
        
        if (workingDays.includes(dayOfWeek) && !holidaySet.has(dateStr)) {
            count++;
        }
        
        current.setDate(current.getDate() + 1);
    }

    return count;
}

/**
 * Working hours schedule interface
 */
export interface WorkingSchedule {
    start: string; // HH:mm format
    end: string;   // HH:mm format
    days?: number[]; // Optional specific days
}

/**
 * Gets working hours between two dates
 * @param start - Start date/time
 * @param end - End date/time
 * @param workingHours - Working hours schedule
 * @returns Number of working hours
 */
export function getWorkingHoursBetween(
    start: Date | string | number,
    end: Date | string | number,
    workingHours: WorkingSchedule
): number {
    const startDate = parseDate(start, { throwError: true });
    const endDate = parseDate(end, { throwError: true });

    if (!startDate || !endDate) {
        throw new ChronoUtilzError('Invalid start or end date');
    }

    const { start: workStart, end: workEnd, days } = workingHours;
    
    // Parse working hours
    const [startHour, startMin] = workStart.split(':').map(Number);
    const [endHour, endMin] = workEnd.split(':').map(Number);
    
    let totalMinutes = 0;
    const current = new Date(startDate);
    
    while (current < endDate) {
        const dayOfWeek = current.getDay();
        
        // Check if this day is a working day
        if (!days || days.includes(dayOfWeek)) {
            const dayStart = new Date(current);
            dayStart.setHours(startHour, startMin, 0, 0);
            
            const dayEnd = new Date(current);
            dayEnd.setHours(endHour, endMin, 0, 0);
            
            // Calculate overlap for this day
            const overlapStart = new Date(Math.max(current.getTime(), dayStart.getTime()));
            const overlapEnd = new Date(Math.min(endDate.getTime(), dayEnd.getTime()));
            
            if (overlapStart < overlapEnd) {
                totalMinutes += (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60);
            }
        }
        
        // Move to next day
        current.setDate(current.getDate() + 1);
        current.setHours(0, 0, 0, 0);
    }

    return totalMinutes / 60; // Convert to hours
}

/**
 * Adds working hours to a date
 * @param date - Starting date
 * @param hours - Hours to add
 * @param schedule - Optional working schedule
 * @returns New date with working hours added
 */
export function addWorkingHours(
    date: Date | string | number,
    hours: number,
    schedule?: WorkingSchedule
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to addWorkingHours');
    }

    const defaultSchedule: WorkingSchedule = {
        start: '09:00',
        end: '17:00',
        days: [1, 2, 3, 4, 5] // Monday to Friday
    };

    const workSchedule = schedule || defaultSchedule;
    const { start: workStart, end: workEnd, days } = workSchedule;
    
    const [startHour, startMin] = workStart.split(':').map(Number);
    const [endHour, endMin] = workEnd.split(':').map(Number);
    
    const dailyWorkingHours = (endHour - startHour) + (endMin - startMin) / 60;
    let remainingHours = hours;
    const result = new Date(safeDate);
    
    while (remainingHours > 0) {
        const dayOfWeek = result.getDay();
        
        if (!days || days.includes(dayOfWeek)) {
            const hoursToAdd = Math.min(remainingHours, dailyWorkingHours);
            result.setTime(result.getTime() + hoursToAdd * 60 * 60 * 1000);
            remainingHours -= hoursToAdd;
        }
        
        if (remainingHours > 0) {
            // Move to next working day
            do {
                result.setDate(result.getDate() + 1);
            } while (!days || !days.includes(result.getDay()));
            
            result.setHours(startHour, startMin, 0, 0);
        }
    }

    return result;
}

/**
 * Checks if a date/time is within working hours
 * @param date - The date/time to check
 * @param schedule - Optional working schedule
 * @returns True if within working hours
 */
export function isWorkingHours(
    date: Date | string | number,
    schedule?: WorkingSchedule
): boolean {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to isWorkingHours');
    }

    const defaultSchedule: WorkingSchedule = {
        start: '09:00',
        end: '17:00',
        days: [1, 2, 3, 4, 5]
    };

    const workSchedule = schedule || defaultSchedule;
    const { start: workStart, end: workEnd, days } = workSchedule;
    
    const dayOfWeek = safeDate.getDay();
    
    // Check if it's a working day
    if (days && !days.includes(dayOfWeek)) {
        return false;
    }

    // Check time
    const [startHour, startMin] = workStart.split(':').map(Number);
    const [endHour, endMin] = workEnd.split(':').map(Number);
    
    const currentHour = safeDate.getHours();
    const currentMin = safeDate.getMinutes();
    
    const currentTime = currentHour * 60 + currentMin;
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    return currentTime >= startTime && currentTime <= endTime;
}

/**
 * Gets the next working hour from a given date
 * @param date - Starting date
 * @param schedule - Optional working schedule
 * @returns Next working hour date
 */
export function getNextWorkingHour(
    date: Date | string | number,
    schedule?: WorkingSchedule
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getNextWorkingHour');
    }

    const defaultSchedule: WorkingSchedule = {
        start: '09:00',
        end: '17:00',
        days: [1, 2, 3, 4, 5]
    };

    const workSchedule = schedule || defaultSchedule;
    const { start: workStart, days } = workSchedule;
    
    const [startHour, startMin] = workStart.split(':').map(Number);
    const result = new Date(safeDate);
    
    // If already in working hours, return next hour
    if (isWorkingHours(result, workSchedule)) {
        result.setHours(result.getHours() + 1, 0, 0, 0);
        if (isWorkingHours(result, workSchedule)) {
            return result;
        }
    }
    
    // Find next working day and set to start hour
    do {
        result.setDate(result.getDate() + 1);
    } while (!days || !days.includes(result.getDay()));
    
    result.setHours(startHour, startMin, 0, 0);
    return result;
}

/**
 * Merges a date part with a time part
 * @param datePart - The date component
 * @param timePart - The time component
 * @returns New date with merged date and time
 */
export function mergeDateTime(
    datePart: Date | string | number,
    timePart: Date | string | number
): Date {
    const safeDate = parseDate(datePart, { throwError: true });
    const safeTime = parseDate(timePart, { throwError: true });

    if (!safeDate || !safeTime) {
        throw new ChronoUtilzError('Invalid date or time provided to mergeDateTime');
    }

    const result = new Date(safeDate);
    result.setHours(
        safeTime.getHours(),
        safeTime.getMinutes(),
        safeTime.getSeconds(),
        safeTime.getMilliseconds()
    );

    return result;
}

/**
 * Time of day categories
 */
export type TimeOfDay = 'Night' | 'Morning' | 'Afternoon' | 'Evening';

/**
 * Gets the time of day category
 * @param date - The date to categorize
 * @returns Time of day category
 */
export function timeOfDay(date: Date | string | number): TimeOfDay {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to timeOfDay');
    }

    const hour = safeDate.getHours();

    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
}

/**
 * Gets ISO week number (ISO-8601 standard)
 * @param date - The date
 * @returns ISO week number
 */
export function getISOWeek(date: Date | string | number): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getISOWeek');
    }

    const target = new Date(safeDate);
    const dayNr = (safeDate.getDay() + 6) % 7; // Make Monday = 0
    target.setDate(target.getDate() - dayNr + 3); // Thursday of this week

    const jan4 = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target.getTime() - jan4.getTime()) / 86400000;
    return 1 + Math.floor(dayDiff / 7);
}

/**
 * Gets the week number within a month
 * @param date - The date
 * @returns Week number within the month (1-6)
 */
export function getWeekOfMonth(date: Date | string | number): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getWeekOfMonth');
    }

    const firstDay = new Date(safeDate.getFullYear(), safeDate.getMonth(), 1);
    const firstDayWeek = firstDay.getDay();
    const offsetDate = safeDate.getDate() + firstDayWeek - 1;
    
    return Math.ceil(offsetDate / 7);
}

/**
 * Gets fiscal quarter
 * @param date - The date
 * @param fiscalYearStart - Fiscal year start month (1-12, default: 1 for January)
 * @returns Fiscal quarter (1-4)
 */
export function getFiscalQuarter(
    date: Date | string | number,
    fiscalYearStart = 1
): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getFiscalQuarter');
    }

    if (fiscalYearStart < 1 || fiscalYearStart > 12) {
        throw new ChronoUtilzError('fiscalYearStart must be between 1 and 12');
    }

    const month = safeDate.getMonth() + 1; // Convert to 1-12
    const adjustedMonth = ((month - fiscalYearStart + 12) % 12) + 1;
    
    return Math.ceil(adjustedMonth / 3);
}

/**
 * Gets fiscal year
 * @param date - The date
 * @param fiscalYearStart - Fiscal year start month (1-12, default: 1 for January)
 * @returns Fiscal year
 */
export function getFiscalYear(
    date: Date | string | number,
    fiscalYearStart = 1
): number {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getFiscalYear');
    }

    if (fiscalYearStart < 1 || fiscalYearStart > 12) {
        throw new ChronoUtilzError('fiscalYearStart must be between 1 and 12');
    }

    const year = safeDate.getFullYear();
    const month = safeDate.getMonth() + 1;

    return month >= fiscalYearStart ? year : year - 1;
}

/**
 * Pay period frequencies
 */
export type PayPeriodFrequency = 'weekly' | 'bi-weekly' | 'semi-monthly' | 'monthly';

/**
 * Gets pay periods between dates
 * @param startDate - Start date
 * @param endDate - End date
 * @param frequency - Pay period frequency
 * @returns Array of pay period start dates
 */
export function getPayPeriods(
    startDate: Date | string | number,
    endDate: Date | string | number,
    frequency: PayPeriodFrequency
): Date[] {
    const start = parseDate(startDate, { throwError: true });
    const end = parseDate(endDate, { throwError: true });

    if (!start || !end) {
        throw new ChronoUtilzError('Invalid start or end date');
    }

    const periods: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
        periods.push(new Date(current));

        switch (frequency) {
            case 'weekly':
                current.setDate(current.getDate() + 7);
                break;
            case 'bi-weekly':
                current.setDate(current.getDate() + 14);
                break;
            case 'semi-monthly':
                // 1st and 15th of each month
                if (current.getDate() === 1) {
                    current.setDate(15);
                } else {
                    current.setMonth(current.getMonth() + 1, 1);
                }
                break;
            case 'monthly':
                current.setMonth(current.getMonth() + 1);
                break;
        }
    }

    return periods;
}

/**
 * Hemispheres for season calculation
 */
export type Hemisphere = 'northern' | 'southern';

/**
 * Season types
 */
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

/**
 * Gets the season for a date
 * @param date - The date
 * @param hemisphere - Northern or southern hemisphere (default: 'northern')
 * @returns Season name
 */
export function getSeason(
    date: Date | string | number,
    hemisphere: Hemisphere = 'northern'
): Season {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getSeason');
    }

    const month = safeDate.getMonth() + 1; // 1-12
    const day = safeDate.getDate();

    let season: Season;

    // Northern hemisphere seasons
    if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
        season = 'Spring';
    } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 22)) {
        season = 'Summer';
    } else if ((month === 9 && day >= 22) || month === 10 || month === 11 || (month === 12 && day < 21)) {
        season = 'Autumn';
    } else {
        season = 'Winter';
    }

    // Flip seasons for southern hemisphere
    if (hemisphere === 'southern') {
        const seasonMap: Record<Season, Season> = {
            'Spring': 'Autumn',
            'Summer': 'Winter',
            'Autumn': 'Spring',
            'Winter': 'Summer'
        };
        season = seasonMap[season];
    }

    return season;
}

/**
 * Month name formats
 */
export type MonthNameFormat = 'long' | 'short' | 'narrow';

/**
 * Gets month name
 * @param monthNumber - Month number (1-12)
 * @param locale - Locale string (default: 'en-US')
 * @param format - Format type (default: 'long')
 * @returns Month name
 */
export function getMonthName(
    monthNumber: number,
    locale = 'en-US',
    format: MonthNameFormat = 'long'
): string {
    if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        throw new ChronoUtilzError('monthNumber must be between 1 and 12');
    }

    const date = new Date(2000, monthNumber - 1, 1);
    
    return date.toLocaleDateString(locale, { month: format });
}

/**
 * Gets detailed information about months in a quarter
 * @param quarter - Quarter number (1-4)
 * @param year - Year
 * @returns Object containing quarter info and months
 */
export function getMonthsInQuarter(quarter: number, year: number) {
    if (!Number.isInteger(quarter) || quarter < 1 || quarter > 4) {
        throw new ChronoUtilzError('Quarter must be between 1 and 4');
    }

    if (!Number.isInteger(year) || year < 1) {
        throw new ChronoUtilzError('Year must be a positive integer');
    }

    const startMonth = (quarter - 1) * 3 + 1;
    const months = [];

    for (let i = 0; i < 3; i++) {
        const monthNumber = startMonth + i;
        months.push({
            name: getMonthName(monthNumber),
            number: monthNumber,
            firstDay: new Date(year, monthNumber - 1, 1),
            lastDay: new Date(year, monthNumber, 0) // 0th day of next month = last day of current month
        });
    }

    return {
        quarter,
        year,
        months,
        startDate: new Date(year, (quarter - 1) * 3, 1),
        endDate: new Date(year, quarter * 3, 0)
    };
}

/**
 * Gets the next occurrence of a specific day of week
 * @param date - Starting date
 * @param dayOfWeek - Day of week (0=Sunday, 1=Monday, etc.)
 * @returns Next occurrence date
 */
export function nextOccurrence(
    date: Date | string | number,
    dayOfWeek: number
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to nextOccurrence');
    }

    if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
        throw new ChronoUtilzError('dayOfWeek must be between 0 and 6');
    }

    const result = new Date(safeDate);
    const currentDay = result.getDay();
    const daysToAdd = ((dayOfWeek - currentDay) + 7) % 7 || 7;
    
    result.setDate(result.getDate() + daysToAdd);
    return result;
}

/**
 * Gets the previous occurrence of a specific day of week
 * @param date - Starting date
 * @param dayOfWeek - Day of week (0=Sunday, 1=Monday, etc.)
 * @returns Previous occurrence date
 */
export function previousOccurrence(
    date: Date | string | number,
    dayOfWeek: number
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to previousOccurrence');
    }

    if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
        throw new ChronoUtilzError('dayOfWeek must be between 0 and 6');
    }

    const result = new Date(safeDate);
    const currentDay = result.getDay();
    const daysToSubtract = ((currentDay - dayOfWeek) + 7) % 7 || 7;
    
    result.setDate(result.getDate() - daysToSubtract);
    return result;
}

// =====================================================================
// PILLAR 1: CORE OPERATIONS (45+ Functions)
// Date manipulation & comparison
// =====================================================================

/**
 * Converts a date to a different timezone using IANA timezone identifiers
 * @param date - The date to convert
 * @param options - Timezone conversion options
 * @returns Date object in the target timezone
 * @example
 * ```javascript
 * const utcDate = new Date('2025-01-15T12:00:00Z');
 * const nyTime = convertTimezone(utcDate, { 
 *   from: 'UTC', 
 *   to: 'America/New_York' 
 * });
 * // Returns: 2025-01-15T07:00:00-05:00 (EST)
 * ```
 */
export function convertTimezone(
    date: Date | string | number,
    options: TimezoneConversionOptions
): Date {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to convertTimezone');
    }

    try {
        const fromTz = options.from || 'UTC';
        const toTz = options.to;
        
        const fromOffset = getTimezoneOffsetForZone(safeDate, fromTz);
        const toOffset = getTimezoneOffsetForZone(safeDate, toTz);
        
        const offsetDiff = fromOffset - toOffset;
        const result = new Date(safeDate.getTime() + (offsetDiff * 60 * 1000));
        
        return result;
    } catch (error) {
        throw new ChronoUtilzError(`Failed to convert timezone: ${error}`);
    }
}

/**
 * Gets timezone offset in minutes for a specific IANA zone
 */
function getTimezoneOffsetForZone(date: Date, timezone: string): number {
    try {
        const utc1 = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const utc2 = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        return (utc2.getTime() - utc1.getTime()) / (1000 * 60);
    } catch {
        return 0; // Fallback for unsupported timezones
    }
}

/**
 * Parses natural language time expressions into dates
 * @param expression - Natural language expression
 * @param options - Parsing options
 * @returns Parsed date or null if invalid
 * @example
 * ```javascript
 * const tomorrow = parseNaturalLanguage('tomorrow');
 * // Returns: Date object for tomorrow at 00:00:00
 * 
 * const nextFriday = parseNaturalLanguage('next friday');
 * // Returns: Date object for next Friday at 00:00:00
 * 
 * const inTwoWeeks = parseNaturalLanguage('in 2 weeks');
 * // Returns: Date object 14 days from now
 * 
 * const threeDaysAgo = parseNaturalLanguage('3 days ago');
 * // Returns: Date object 3 days before now
 * ```
 */
export function parseNaturalLanguage(
    expression: NaturalTimeExpression,
    options: NaturalLanguageOptions = {}
): Date | null {
    const baseDate = options.baseDate || new Date();
    const expr = expression.toLowerCase().trim();

    try {
        const now = new Date(baseDate);

        switch (expr) {
            case 'now':
                return now;
            case 'today':
                return startOf(now, 'day');
            case 'tomorrow':
                return addTime(startOf(now, 'day'), 1, 'day');
            case 'yesterday':
                return subtractTime(startOf(now, 'day'), 1, 'day');
            case 'next week':
                return addTime(startOf(now, 'week'), 1, 'week');
            case 'last week':
                return subtractTime(startOf(now, 'week'), 1, 'week');
            case 'next month':
                return addTime(startOf(now, 'month'), 1, 'month');
            case 'last month':
                return subtractTime(startOf(now, 'month'), 1, 'month');
            case 'next year':
                return addTime(startOf(now, 'year'), 1, 'year');
            case 'last year':
                return subtractTime(startOf(now, 'year'), 1, 'year');
            case 'beginning of week':
                return startOf(now, 'week');
            case 'end of week':
                return endOf(now, 'week');
            case 'beginning of month':
                return startOf(now, 'month');
            case 'end of month':
                return endOf(now, 'month');
            case 'beginning of year':
                return startOf(now, 'year');
            case 'end of year':
                return endOf(now, 'year');
        }

        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const nextDayMatch = expr.match(/^next\s+(\w+)$/);
        const lastDayMatch = expr.match(/^last\s+(\w+)$/);

        if (nextDayMatch) {
            const dayIndex = dayNames.indexOf(nextDayMatch[1]);
            if (dayIndex !== -1) {
                return nextOccurrence(now, dayIndex);
            }
        }

        if (lastDayMatch) {
            const dayIndex = dayNames.indexOf(lastDayMatch[1]);
            if (dayIndex !== -1) {
                return previousOccurrence(now, dayIndex);
            }
        }

        const inMatch = expr.match(/^in\s+(\d+)\s+(day|days|week|weeks|month|months|year|years)$/);
        if (inMatch) {
            const amount = parseInt(inMatch[1], 10);
            const unit = inMatch[2].replace(/s$/, '') as TimeUnit;
            return addTime(now, amount, unit);
        }

        const agoMatch = expr.match(/^(\d+)\s+(day|days|week|weeks|month|months|year|years)\s+ago$/);
        if (agoMatch) {
            const amount = parseInt(agoMatch[1], 10);
            const unit = agoMatch[2].replace(/s$/, '') as TimeUnit;
            return subtractTime(now, amount, unit);
        }

        if (options.strictParsing) {
            throw new ChronoUtilzError(`Failed to parse natural language: ${expr}`);
        }
        return null;
    } catch (error) {
        if (options.strictParsing) {
            throw new ChronoUtilzError(`Failed to parse natural language: ${error}`);
        }
        return null;
    }
}

/**
 * Generates recurring dates based on a pattern
 * @param startDate - Starting date
 * @param config - Recurring configuration
 * @returns Array of dates matching the pattern
 * @example
 * ```javascript
 * const weeklyMeetings = generateRecurringDates('2025-01-06', {
 *   pattern: 'weekly',
 *   maxOccurrences: 10
 * });
 * // Returns: [2025-01-06, 2025-01-13, 2025-01-20, ...]
 * 
 * const monthlyReports = generateRecurringDates('2025-01-01', {
 *   pattern: 'monthly',
 *   maxOccurrences: 12,
 *   endDate: new Date('2025-12-31')
 * });
 * // Returns: First day of each month for 2025
 * ```
 */
export function generateRecurringDates(
    startDate: Date | string | number,
    config: RecurringConfig
): Date[] {
    const safeStartDate = parseDate(startDate, { throwError: true });
    if (!safeStartDate) {
        throw new ChronoUtilzError('Invalid start date provided to generateRecurringDates');
    }

    const dates: Date[] = [new Date(safeStartDate)];
    const interval = config.interval || 1;
    const maxOccurrences = config.maxOccurrences || 100;
    const endDate = config.endDate;

    let currentDate = new Date(safeStartDate);
    let count = 1;

    while (count < maxOccurrences && (!endDate || currentDate <= endDate)) {
        let nextDate: Date;

        switch (config.pattern) {
            case 'daily':
                nextDate = addTime(currentDate, interval, 'day');
                break;
            case 'weekly':
                nextDate = addTime(currentDate, interval * 7, 'day');
                break;
            case 'biweekly':
                nextDate = addTime(currentDate, interval * 14, 'day');
                break;
            case 'monthly':
                nextDate = addTime(currentDate, interval, 'month');
                break;
            case 'quarterly':
                nextDate = addTime(currentDate, interval * 3, 'month');
                break;
            case 'yearly':
                nextDate = addTime(currentDate, interval, 'year');
                break;
            case 'weekdays':
                nextDate = getNextBusinessDay(currentDate);
                if (interval > 1) {
                    for (let i = 1; i < interval; i++) {
                        nextDate = getNextBusinessDay(nextDate);
                    }
                }
                break;
            case 'weekends':
                nextDate = new Date(currentDate);
                do {
                    nextDate = addTime(nextDate, 1, 'day');
                } while (!isWeekend(nextDate));
                break;
            case 'custom':
                // Handle custom patterns based on configuration
                nextDate = handleCustomRecurrence(currentDate, config);
                break;
            default:
                throw new ChronoUtilzError(`Unsupported recurring pattern: ${config.pattern}`);
        }

        if (endDate && nextDate > endDate) break;

        currentDate = nextDate;
        dates.push(new Date(currentDate));
        count++;
    }

    return dates;
}

/**
 * Handles custom recurring patterns
 */
function handleCustomRecurrence(currentDate: Date, config: RecurringConfig): Date {
    const { daysOfWeek, daysOfMonth, monthsOfYear } = config;
    let nextDate = addTime(currentDate, 1, 'day');

    let attempts = 0;
    const maxAttempts = 366;

    while (attempts < maxAttempts) {
        let matches = true;

        if (daysOfWeek && !daysOfWeek.includes(nextDate.getDay())) {
            matches = false;
        }

        if (daysOfMonth && !daysOfMonth.includes(nextDate.getDate())) {
            matches = false;
        }

        if (monthsOfYear && !monthsOfYear.includes(nextDate.getMonth() + 1)) {
            matches = false;
        }

        if (matches) break;

        nextDate = addTime(nextDate, 1, 'day');
        attempts++;
    }

    return nextDate;
}

/**
 * Performs comprehensive date comparison
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Detailed comparison result
 */
export function compareDetailed(
    date1: Date | string | number,
    date2: Date | string | number
): DateComparison {
    const safeDate1 = parseDate(date1, { throwError: true });
    const safeDate2 = parseDate(date2, { throwError: true });
    
    if (!safeDate1 || !safeDate2) {
        throw new ChronoUtilzError('Invalid dates provided to compareDetailed');
    }

    const time1 = safeDate1.getTime();
    const time2 = safeDate2.getTime();

    const isBefore = time1 < time2;
    const isAfter = time1 > time2;
    const isSame = time1 === time2;

    const diffMs = Math.abs(time2 - time1);
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    const milliseconds = diffMs % 1000;

    return {
        isBefore,
        isAfter,
        isSame,
        difference: {
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        }
    };
}

/**
 * Calculates the duration between two dates with advanced options
 * @param startDate - Start date
 * @param endDate - End date
 * @param options - Display options
 * @returns Formatted duration string
 */
export function calculateAdvancedDuration(
    startDate: Date | string | number,
    endDate: Date | string | number,
    options: DurationDisplayOptions = {}
): string {
    const safeStartDate = parseDate(startDate, { throwError: true });
    const safeEndDate = parseDate(endDate, { throwError: true });
    
    if (!safeStartDate || !safeEndDate) {
        throw new ChronoUtilzError('Invalid dates provided to calculateAdvancedDuration');
    }

    const comparison = compareDetailed(safeStartDate, safeEndDate);
    const { difference } = comparison;
    
    const {
        precision = 2,
        units = ['year', 'month', 'day', 'hour', 'minute'],
        format = 'long',
        separator = ', ',
        includeZeroValues = false
    } = options;

    const parts: string[] = [];
    let count = 0;

    const unitLabels = {
        long: {
            year: ['year', 'years'],
            month: ['month', 'months'],
            day: ['day', 'days'],
            hour: ['hour', 'hours'],
            minute: ['minute', 'minutes'],
            second: ['second', 'seconds']
        },
        short: {
            year: ['yr', 'yrs'],
            month: ['mo', 'mos'],
            day: ['d', 'd'],
            hour: ['h', 'h'],
            minute: ['m', 'm'],
            second: ['s', 's']
        },
        narrow: {
            year: ['y', 'y'],
            month: ['M', 'M'],
            day: ['d', 'd'],
            hour: ['h', 'h'],
            minute: ['m', 'm'],
            second: ['s', 's']
        }
    };

    for (const unit of units) {
        if (count >= precision) break;

        const value = difference[unit as keyof typeof difference] as number;
        if (value > 0 || includeZeroValues) {
            const labels = unitLabels[format][unit as keyof typeof unitLabels[typeof format]];
            const label = value === 1 ? labels[0] : labels[1];
            parts.push(`${value} ${label}`);
            count++;
        }
    }

    return parts.length > 0 ? parts.join(separator) : '0';
}

/**
 * Gets the nth occurrence of a weekday in a month
 * @param year - Year
 * @param month - Month (1-12)
 * @param dayOfWeek - Day of week (0-6, Sunday is 0)
 * @param occurrence - Which occurrence (1-5, or -1 for last)
 * @returns Date of the nth occurrence
 */
export function getNthWeekdayOfMonth(
    year: number,
    month: number,
    dayOfWeek: number,
    occurrence: number
): Date | null {
    if (month < 1 || month > 12) {
        throw new ChronoUtilzError('Month must be between 1 and 12');
    }
    if (dayOfWeek < 0 || dayOfWeek > 6) {
        throw new ChronoUtilzError('dayOfWeek must be between 0 and 6');
    }
    if (occurrence < -1 || occurrence === 0 || occurrence > 5) {
        throw new ChronoUtilzError('Occurrence must be between 1-5 or -1 for last');
    }
    const lastDay = new Date(year, month, 0);

    if (occurrence === -1) {
        // Find last occurrence
        for (let day = lastDay.getDate(); day >= 1; day--) {
            const date = new Date(year, month - 1, day);
            if (date.getDay() === dayOfWeek) {
                return date;
            }
        }
    } else {
        // Find nth occurrence
        let count = 0;
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month - 1, day);
            if (date.getDay() === dayOfWeek) {
                count++;
                if (count === occurrence) {
                    return date;
                }
            }
        }
    }

    return null;
}

/**
 * Calculates business days between two dates with advanced options
 * @param startDate - Start date
 * @param endDate - End date
 * @param config - Working time configuration
 * @returns Number of business days
 */
export function calculateBusinessDaysAdvanced(
    startDate: Date | string | number,
    endDate: Date | string | number,
    config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] }
): number {
    const safeStartDate = parseDate(startDate, { throwError: true });
    const safeEndDate = parseDate(endDate, { throwError: true });
    
    if (!safeStartDate || !safeEndDate) {
        throw new ChronoUtilzError('Invalid dates provided to calculateBusinessDaysAdvanced');
    }

    let count = 0;
    const current = new Date(safeStartDate);
    
    while (current <= safeEndDate) {
        if (config.workingDays.includes(current.getDay())) {
            if (!config.excludeHolidays || !isHoliday(current)) {
                count++;
            }
        }
        current.setDate(current.getDate() + 1);
    }

    return count;
}

/**
 * Finds the closest date to a target from an array of dates
 * @param targetDate - Target date
 * @param dates - Array of dates to search
 * @returns Closest date or null if array is empty
 */
export function findClosestDate(
    targetDate: Date | string | number,
    dates: (Date | string | number)[]
): Date | null {
    if (dates.length === 0) return null;

    const safeTargetDate = parseDate(targetDate, { throwError: true });
    if (!safeTargetDate) {
        throw new ChronoUtilzError('Invalid target date provided to findClosestDate');
    }

    let closest: Date | null = null;
    let minDifference = Infinity;

    for (const date of dates) {
        const safeDate = parseDate(date);
        if (!safeDate) continue;

        const difference = Math.abs(safeDate.getTime() - safeTargetDate.getTime());
        if (difference < minDifference) {
            minDifference = difference;
            closest = safeDate;
        }
    }

    return closest;
}

// =====================================================================
// PILLAR 2: BUSINESS UTILITIES (55+ Functions)
// Real-world business logic
// =====================================================================

/**
 * Advanced fiscal period calculations with custom fiscal year configurations
 * @param date - Date to analyze
 * @param config - Fiscal year configuration
 * @returns Comprehensive fiscal period information
 * @example
 * ```javascript
 * // Standard calendar year fiscal year
 * const standardFiscal = getFiscalPeriodAdvanced('2025-06-15');
 * // Returns: { quarter: 2, year: 2025, startDate: Date, endDate: Date }
 * 
 * // Custom fiscal year starting April 1st
 * const customFiscal = getFiscalPeriodAdvanced('2025-06-15', {
 *   startMonth: 4,  // April
 *   startDay: 1
 * });
 * // Returns: { quarter: 1, year: 2025, startDate: 2025-04-01, endDate: 2025-06-30 }
 * ```
 */
export function getFiscalPeriodAdvanced(
    date: Date | string | number,
    config: FiscalYearConfig = { startMonth: 1, startDay: 1 }
): FiscalPeriod {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to getFiscalPeriodAdvanced');
    }

    const year = safeDate.getFullYear();
    const month = safeDate.getMonth() + 1;
    const day = safeDate.getDate();

    // Determine fiscal year
    let fiscalYear = year;
    if (month < config.startMonth || (month === config.startMonth && day < config.startDay)) {
        fiscalYear = year - 1;
    }

    // Calculate fiscal quarter
    const fiscalStartDate = new Date(fiscalYear, config.startMonth - 1, config.startDay);
    const monthsFromStart = getDateDiff(fiscalStartDate, safeDate, 'month');
    const quarter = Math.floor(monthsFromStart / 3) + 1;

    // Quarter boundaries
    const quarterStartMonth = config.startMonth + (quarter - 1) * 3 - 1;
    const startDate = new Date(fiscalYear, quarterStartMonth, config.startDay);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, startDate.getDate() - 1);

    return {
        quarter: Math.max(1, Math.min(4, quarter)),
        year: fiscalYear,
        startDate,
        endDate,
        isCurrentPeriod: isBetweenDates(new Date(), startDate, endDate)
    };
}

/**
 * Calculates working hours between two dates with timezone support
 * @param startDate - Start date/time
 * @param endDate - End date/time
 * @param config - Working time configuration
 * @returns Total working hours
 */
export function calculateWorkingHours(
    startDate: Date | string | number,
    endDate: Date | string | number,
    config: WorkingTimeConfig
): number {
    const safeStartDate = parseDate(startDate, { throwError: true });
    const safeEndDate = parseDate(endDate, { throwError: true });
    
    if (!safeStartDate || !safeEndDate) {
        throw new ChronoUtilzError('Invalid dates provided to calculateWorkingHours');
    }

    if (safeStartDate > safeEndDate) {
        return 0;
    }

    let totalHours = 0;
    const current = new Date(safeStartDate);

    while (current < safeEndDate) {
        // Check if current day is a working day
        if (config.workingDays.includes(current.getDay())) {
            // Skip if holiday and excludeHolidays is true
            if (config.excludeHolidays && isHoliday(current)) {
                current.setDate(current.getDate() + 1);
                continue;
            }

            const dayStart = new Date(current);
            dayStart.setHours(config.startHour, 0, 0, 0);
            
            const dayEnd = new Date(current);
            dayEnd.setHours(config.endHour, 0, 0, 0);

            // Find overlapping period
            const periodStart = new Date(Math.max(dayStart.getTime(), safeStartDate.getTime()));
            const periodEnd = new Date(Math.min(dayEnd.getTime(), safeEndDate.getTime()));

            if (periodStart < periodEnd) {
                const hoursThisDay = (periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60);
                totalHours += hoursThisDay;
            }
        }

        current.setDate(current.getDate() + 1);
    }

    return Math.max(0, totalHours);
}

/**
 * Generates payroll periods for a given year
 * @param year - Year to generate periods for
 * @param frequency - Pay frequency
 * @param startDate - Optional start date override
 * @returns Array of pay periods
 */
export function generatePayrollPeriods(
    year: number,
    frequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly',
    startDate?: Date
): Array<{ startDate: Date; endDate: Date; payDate: Date }> {
    const periods: Array<{ startDate: Date; endDate: Date; payDate: Date }> = [];
    
    let current = startDate || new Date(year, 0, 1);
    const yearEnd = new Date(year + 1, 0, 0); // Last day of year

    while (current.getFullYear() === year) {
        let periodEnd: Date;
        let payDate: Date;

        switch (frequency) {
            case 'weekly':
                periodEnd = addTime(current, 6, 'day');
                payDate = addTime(periodEnd, 3, 'day'); // Pay 3 days after period end
                break;
            case 'biweekly':
                periodEnd = addTime(current, 13, 'day');
                payDate = addTime(periodEnd, 3, 'day');
                break;
            case 'semimonthly':
                if (current.getDate() <= 15) {
                    periodEnd = new Date(current.getFullYear(), current.getMonth(), 15);
                    payDate = new Date(current.getFullYear(), current.getMonth(), 20);
                } else {
                    periodEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
                    payDate = new Date(current.getFullYear(), current.getMonth() + 1, 5);
                }
                break;
            case 'monthly':
                periodEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
                payDate = new Date(current.getFullYear(), current.getMonth() + 1, 5);
                break;
        }

        periods.push({
            startDate: new Date(current),
            endDate: periodEnd,
            payDate: payDate
        });

        // Move to next period
        switch (frequency) {
            case 'weekly':
                current = addTime(current, 7, 'day');
                break;
            case 'biweekly':
                current = addTime(current, 14, 'day');
                break;
            case 'semimonthly':
                if (current.getDate() <= 15) {
                    current = new Date(current.getFullYear(), current.getMonth(), 16);
                } else {
                    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
                }
                break;
            case 'monthly':
                current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
                break;
        }

        if (current > yearEnd) break;
    }

    return periods;
}

/**
 * Calculates project milestones based on working days
 * @param startDate - Project start date
 * @param tasks - Array of task durations in working days
 * @param config - Working time configuration
 * @returns Array of milestone dates
 */
export function calculateProjectMilestones(
    startDate: Date | string | number,
    tasks: number[],
    config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] }
): Date[] {
    const safeStartDate = parseDate(startDate, { throwError: true });
    if (!safeStartDate) {
        throw new ChronoUtilzError('Invalid start date provided to calculateProjectMilestones');
    }

    const milestones: Date[] = [new Date(safeStartDate)];
    let currentDate = new Date(safeStartDate);

    for (const taskDuration of tasks) {
        let daysAdded = 0;
        
        while (daysAdded < taskDuration) {
            currentDate = addTime(currentDate, 1, 'day');
            
            // Check if it's a working day
            if (config.workingDays.includes(currentDate.getDay())) {
                // Skip if it's a holiday and excludeHolidays is enabled
                if (!config.excludeHolidays || !isHoliday(currentDate)) {
                    daysAdded++;
                }
            }
        }

        milestones.push(new Date(currentDate));
    }

    return milestones;
}

/**
 * Generates a calendar with events and business logic
 * @param year - Year
 * @param month - Month (1-12)
 * @param events - Array of calendar events
 * @param config - Working time configuration
 * @returns Calendar object with detailed day information
 */
export function generateBusinessCalendar(
    year: number,
    month: number,
    events: CalendarEvent[] = [],
    config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] }
): Array<{
    date: Date;
    isWorkingDay: boolean;
    isHoliday: boolean;
    isWeekend: boolean;
    events: CalendarEvent[];
    workingHours: number;
}> {
    if (month < 1 || month > 12) {
        throw new ChronoUtilzError('Month must be between 1 and 12');
    }

    const calendar: Array<{
        date: Date;
        isWorkingDay: boolean;
        isHoliday: boolean;
        isWeekend: boolean;
        events: CalendarEvent[];
        workingHours: number;
    }> = [];

    const daysInMonth = getDaysInMonth(new Date(year, month - 1, 1));

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const isWeekendDay = isWeekend(date);
        const isHolidayDay = isHoliday(date);
        const isWorkingDay = config.workingDays.includes(date.getDay()) && !isHolidayDay;
        
        // Calculate working hours for the day
        const workingHours = isWorkingDay ? config.endHour - config.startHour : 0;

        // Find events for this day
        const dayEvents = events.filter(event => {
            const eventStart = event.startDate;
            const eventEnd = event.endDate || event.startDate;
            return date >= startOf(eventStart, 'day') && date <= startOf(eventEnd, 'day');
        });

        calendar.push({
            date: new Date(date),
            isWorkingDay,
            isHoliday: isHolidayDay,
            isWeekend: isWeekendDay,
            events: dayEvents,
            workingHours
        });
    }

    return calendar;
}

/**
 * Calculates overtime hours based on business rules
 * @param hoursWorked - Total hours worked
 * @param regularHours - Regular hours per period (default: 40 for weekly)
 * @param overtimeMultiplier - Overtime multiplier (default: 1.5)
 * @param doubleTimeThreshold - Hours threshold for double time
 * @returns Overtime calculation breakdown
 */
export function calculateOvertime(
    hoursWorked: number,
    regularHours = 40,
    overtimeMultiplier = 1.5,
    doubleTimeThreshold?: number
): {
    regularHours: number;
    overtimeHours: number;
    doubleTimeHours: number;
    totalRegularPay: number;
    totalOvertimePay: number;
    totalDoubleTimePay: number;
} {
    if (hoursWorked < 0 || regularHours < 0) {
        throw new ChronoUtilzError('Hours cannot be negative');
    }

    const regular = Math.min(hoursWorked, regularHours);
    let overtime = 0;
    let doubleTime = 0;

    if (hoursWorked > regularHours) {
        const excessHours = hoursWorked - regularHours;
        
        if (doubleTimeThreshold && hoursWorked > doubleTimeThreshold) {
            doubleTime = hoursWorked - doubleTimeThreshold;
            overtime = doubleTimeThreshold - regularHours;
        } else {
            overtime = excessHours;
        }
    }

    // Calculate pay (assuming hourly rate of 1 for proportional calculation)
    const regularPay = regular;
    const overtimePay = overtime * overtimeMultiplier;
    const doubleTimePay = doubleTime * 2;

    return {
        regularHours: regular,
        overtimeHours: overtime,
        doubleTimeHours: doubleTime,
        totalRegularPay: regularPay,
        totalOvertimePay: overtimePay,
        totalDoubleTimePay: doubleTimePay
    };
}

/**
 * Manages shift schedules and rotations
 * @param startDate - Schedule start date
 * @param patterns - Array of shift patterns
 * @param duration - Duration in days to generate
 * @returns Array of scheduled shifts
 */
export function generateShiftSchedule(
    startDate: Date | string | number,
    patterns: Array<{ name: string; startHour: number; duration: number; daysOn: number; daysOff: number }>,
    duration = 30
): Array<{
    date: Date;
    shiftName: string;
    startTime: Date;
    endTime: Date;
    isWorkDay: boolean;
}> {
    const safeStartDate = parseDate(startDate, { throwError: true });
    if (!safeStartDate) {
        throw new ChronoUtilzError('Invalid start date provided to generateShiftSchedule');
    }

    const schedule: Array<{
        date: Date;
        shiftName: string;
        startTime: Date;
        endTime: Date;
        isWorkDay: boolean;
    }> = [];

    for (let day = 0; day < duration; day++) {
        const currentDate = addTime(safeStartDate, day, 'day');
        
        for (const pattern of patterns) {
            const cycleLength = pattern.daysOn + pattern.daysOff;
            const dayInCycle = day % cycleLength;
            const isWorkDay = dayInCycle < pattern.daysOn;

            if (isWorkDay) {
                const startTime = new Date(currentDate);
                startTime.setHours(pattern.startHour, 0, 0, 0);
                
                const endTime = new Date(startTime);
                endTime.setHours(startTime.getHours() + pattern.duration);

                schedule.push({
                    date: new Date(currentDate),
                    shiftName: pattern.name,
                    startTime,
                    endTime,
                    isWorkDay: true
                });
            } else {
                schedule.push({
                    date: new Date(currentDate),
                    shiftName: pattern.name,
                    startTime: new Date(currentDate),
                    endTime: new Date(currentDate),
                    isWorkDay: false
                });
            }
        }
    }

    return schedule;
}

/**
 * Calculates service level agreement (SLA) compliance
 * @param incidentDate - When the incident was reported
 * @param resolvedDate - When the incident was resolved
 * @param slaHours - SLA requirement in hours
 * @param config - Working time configuration
 * @returns SLA compliance information
 */
export function calculateSLACompliance(
    incidentDate: Date | string | number,
    resolvedDate: Date | string | number,
    slaHours: number,
    config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] }
): {
    actualHours: number;
    slaHours: number;
    isCompliant: boolean;
    breachHours: number;
    percentageOfSLA: number;
} {
    const actualHours = calculateWorkingHours(incidentDate, resolvedDate, config);
    const isCompliant = actualHours <= slaHours;
    const breachHours = Math.max(0, actualHours - slaHours);
    const percentageOfSLA = (actualHours / slaHours) * 100;

    return {
        actualHours,
        slaHours,
        isCompliant,
        breachHours,
        percentageOfSLA
    };
}

// =====================================================================
// PILLAR 3: FORMATTING & PARSING (35+ Functions)
// Advanced presentation & input handling
// =====================================================================

/**
 * Formats a date to ISO string with flexible options
 * @param date - Date to format
 * @param options - Formatting options
 * @returns ISO formatted string
 * @example
 * ```javascript
 * const date = new Date('2025-01-15T14:30:45.123Z');
 * 
 * formatISO(date);
 * // Returns: "2025-01-15T14:30:45.123Z"
 * 
 * formatISO(date, { includeTime: false });
 * // Returns: "2025-01-15"
 * 
 * formatISO(date, { includeMilliseconds: false });
 * // Returns: "2025-01-15T14:30:45Z"
 * ```
 */
export function formatISO(
    date: Date | string | number,
    options: { includeTime?: boolean; includeTimezone?: boolean; includeMilliseconds?: boolean } = {}
): string {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatISO');
    }

    const { includeTime = true, includeTimezone = true, includeMilliseconds = false } = options;

    let iso = safeDate.toISOString();
    
    if (!includeTime) {
        iso = iso.split('T')[0];
    } else {
        if (!includeMilliseconds) {
            iso = iso.replace(/\.\d{3}Z$/, 'Z');
        }
        if (!includeTimezone) {
            iso = iso.replace(/Z$/, '');
        }
    }

    return iso;
}

/**
 * Advanced custom formatting with pattern support
 * @param date - Date to format
 * @param pattern - Format pattern with tokens
 * @returns Formatted date string
 */
export function formatCustom(
    date: Date | string | number,
    pattern: string
): string {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatCustom');
    }

    // Define tokens in order of length (longest first to avoid conflicts)
    const tokens: Array<{ token: string; fn: () => string }> = [
        { token: 'YYYY', fn: () => safeDate.getFullYear().toString() },
        { token: 'MMMM', fn: () => safeDate.toLocaleString('en', { month: 'long' }) },
        { token: 'dddd', fn: () => safeDate.toLocaleString('en', { weekday: 'long' }) },
        { token: 'MMM', fn: () => safeDate.toLocaleString('en', { month: 'short' }) },
        { token: 'ddd', fn: () => safeDate.toLocaleString('en', { weekday: 'short' }) },
        { token: 'SSS', fn: () => safeDate.getMilliseconds().toString().padStart(3, '0') },
        { token: 'YY', fn: () => safeDate.getFullYear().toString().slice(-2) },
        { token: 'MM', fn: () => (safeDate.getMonth() + 1).toString().padStart(2, '0') },
        { token: 'DD', fn: () => safeDate.getDate().toString().padStart(2, '0') },
        { token: 'Do', fn: () => getOrdinalSuffix(safeDate.getDate()) },
        { token: 'dd', fn: () => safeDate.toLocaleString('en', { weekday: 'narrow' }) },
        { token: 'HH', fn: () => safeDate.getHours().toString().padStart(2, '0') },
        { token: 'hh', fn: () => (safeDate.getHours() % 12 || 12).toString().padStart(2, '0') },
        { token: 'mm', fn: () => safeDate.getMinutes().toString().padStart(2, '0') },
        { token: 'ss', fn: () => safeDate.getSeconds().toString().padStart(2, '0') },
        { token: 'M', fn: () => (safeDate.getMonth() + 1).toString() },
        { token: 'D', fn: () => safeDate.getDate().toString() },
        { token: 'd', fn: () => safeDate.getDay().toString() },
        { token: 'H', fn: () => safeDate.getHours().toString() },
        { token: 'h', fn: () => (safeDate.getHours() % 12 || 12).toString() },
        { token: 'm', fn: () => safeDate.getMinutes().toString() },
        { token: 's', fn: () => safeDate.getSeconds().toString() },
        { token: 'A', fn: () => safeDate.getHours() >= 12 ? 'PM' : 'AM' },
        { token: 'a', fn: () => safeDate.getHours() >= 12 ? 'pm' : 'am' }
    ];

    let result = pattern;
    
    const escapedParts: string[] = [];
    result = result.replace(/\[([^\]]*)\]/g, (match, content) => {
        escapedParts.push(content);
        return `__ESCAPED_${escapedParts.length - 1}__`;
    });

    tokens.forEach(({ token, fn }) => {
        const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        result = result.replace(new RegExp(escaped, 'g'), fn());
    });

    escapedParts.forEach((content, index) => {
        result = result.replace(`__ESCAPED_${index}__`, content);
    });

    return result;
}

/**
 * Gets ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(n: number): string {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const value = n % 100;
    return n + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
}

/**
 * Formats date with localization support
 * @param date - Date to format
 * @param locale - Locale identifier
 * @param options - Intl.DateTimeFormat options
 * @returns Localized date string
 */
export function formatLocalized(
    date: Date | string | number,
    locale = 'en-US',
    options: Intl.DateTimeFormatOptions = {}
): string {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatLocalized');
    }

    try {
        return safeDate.toLocaleDateString(locale, options);
    } catch (error) {
        throw new ChronoUtilzError(`Failed to format date with locale ${locale}: ${error}`);
    }
}

/**
 * Formats relative time with localization
 * @param date - Date to format
 * @param locale - Locale identifier
 * @param baseDate - Base date for comparison
 * @returns Localized relative time string
 */
export function formatRelativeLocalized(
    date: Date | string | number,
    locale = 'en-US',
    baseDate?: Date
): string {
    const safeDate = parseDate(date, { throwError: true });
    const base = baseDate || new Date();
    
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatRelativeLocalized');
    }

    try {
        const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
        const diffInSeconds = (safeDate.getTime() - base.getTime()) / 1000;

        if (Math.abs(diffInSeconds) < 60) {
            return formatter.format(Math.round(diffInSeconds), 'second');
        } else if (Math.abs(diffInSeconds) < 3600) {
            return formatter.format(Math.round(diffInSeconds / 60), 'minute');
        } else if (Math.abs(diffInSeconds) < 86400) {
            return formatter.format(Math.round(diffInSeconds / 3600), 'hour');
        } else if (Math.abs(diffInSeconds) < 2592000) {
            return formatter.format(Math.round(diffInSeconds / 86400), 'day');
        } else if (Math.abs(diffInSeconds) < 31536000) {
            return formatter.format(Math.round(diffInSeconds / 2592000), 'month');
        } else {
            return formatter.format(Math.round(diffInSeconds / 31536000), 'year');
        }
    } catch (error) {
        // Fallback to English if locale not supported
        return getRelativeTime(safeDate, base);
    }
}

/**
 * Formats date as calendar format (Today, Tomorrow, etc.)
 * @param date - Date to format
 * @param baseDate - Base date for comparison
 * @returns Calendar format string
 */
export function formatCalendar(
    date: Date | string | number,
    baseDate?: Date
): string {
    const safeDate = parseDate(date, { throwError: true });
    const base = baseDate || new Date();
    
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatCalendar');
    }

    const diffInDays = getDateDiff(base, safeDate, 'day');

    if (diffInDays === 0) {
        return 'Today';
    } else if (diffInDays === 1) {
        return 'Tomorrow';
    } else if (diffInDays === -1) {
        return 'Yesterday';
    } else if (diffInDays > 1 && diffInDays <= 7) {
        return safeDate.toLocaleDateString('en', { weekday: 'long' });
    } else if (diffInDays < -1 && diffInDays >= -7) {
        return `Last ${safeDate.toLocaleDateString('en', { weekday: 'long' })}`;
    } else {
        return formatDate(safeDate, 'MMM DD, YYYY');
    }
}

/**
 * Formats date in a specific timezone
 * @param date - Date to format
 * @param timezone - IANA timezone identifier
 * @param options - Formatting options
 * @returns Formatted date in specified timezone
 */
export function formatTimezone(
    date: Date | string | number,
    timezone: IANATimezone,
    options: AdvancedFormatOptions = {}
): string {
    const safeDate = parseDate(date, { throwError: true });
    if (!safeDate) {
        throw new ChronoUtilzError('Invalid date provided to formatTimezone');
    }

    try {
        const formatOptions: Intl.DateTimeFormatOptions = {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        if (options.includeTime !== false) {
            formatOptions.hour = '2-digit';
            formatOptions.minute = '2-digit';
            
            if (options.includeSeconds) {
                formatOptions.second = '2-digit';
            }
            
            formatOptions.hour12 = !options.use24Hour;
        }

        if (options.includeDayOfWeek) {
            formatOptions.weekday = 'long';
        }

        if (options.includeTimezone) {
            formatOptions.timeZoneName = 'short';
        }

        return safeDate.toLocaleString(options.locale || 'en-US', formatOptions);
    } catch (error) {
        throw new ChronoUtilzError(`Failed to format date in timezone ${timezone}: ${error}`);
    }
}

/**
 * Humanizes duration with flexible options
 * @param milliseconds - Duration in milliseconds
 * @param options - Display options
 * @returns Human readable duration string
 */
export function humanizeDuration(
    milliseconds: number,
    options: DurationDisplayOptions = {}
): string {
    if (milliseconds < 0) {
        return `${humanizeDuration(Math.abs(milliseconds), options)} ago`;
    }

    const {
        precision = 2,
        format = 'long',
        separator = ', ',
        includeZeroValues = false
    } = options;

    const units = [
        { name: 'year', value: 1000 * 60 * 60 * 24 * 365 },
        { name: 'month', value: 1000 * 60 * 60 * 24 * 30 },
        { name: 'week', value: 1000 * 60 * 60 * 24 * 7 },
        { name: 'day', value: 1000 * 60 * 60 * 24 },
        { name: 'hour', value: 1000 * 60 * 60 },
        { name: 'minute', value: 1000 * 60 },
        { name: 'second', value: 1000 }
    ];

    const parts: string[] = [];
    let remaining = milliseconds;
    let count = 0;

    for (const unit of units) {
        if (count >= precision) break;

        const value = Math.floor(remaining / unit.value);
        if (value > 0 || includeZeroValues) {
            const labelMap = {
                long: { singular: unit.name, plural: `${unit.name}s` },
                short: { 
                    singular: unit.name.charAt(0),
                    plural: unit.name.charAt(0)
                },
                narrow: {
                    singular: unit.name.charAt(0),
                    plural: unit.name.charAt(0)
                }
            };
            
            const label = value === 1 
                ? labelMap[format].singular 
                : labelMap[format].plural;
            
            parts.push(`${value} ${label}`);
            count++;
        }
        
        remaining %= unit.value;
    }

    return parts.length > 0 ? parts.join(separator) : '0 seconds';
}

/**
 * Parses ISO date string strictly
 * @param isoString - ISO date string
 * @returns Date object or null if invalid
 */
export function parseISO(isoString: string): Date | null {
    if (typeof isoString !== 'string') {
        return null;
    }

    // Validate ISO format
    const isoRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?)?$/;
    if (!isoRegex.test(isoString)) {
        return null;
    }

    try {
        const date = new Date(isoString);
        return isValidDate(date) ? date : null;
    } catch {
        return null;
    }
}

/**
 * Tries multiple date formats for parsing
 * @param dateString - Date string to parse
 * @param formats - Array of formats to try
 * @returns First successfully parsed date or null
 */
export function parseMultipleFormats(
    dateString: string,
    formats: string[]
): Date | null {
    for (const format of formats) {
        try {
            const result = parseDate(dateString);
            if (result && validateDateFormat(dateString, format as DateFormat)) {
                return result;
            }
        } catch {
            continue;
        }
    }
    return null;
}

/**
 * Smart parsing with multiple fallback strategies
 * @param dateString - Date string to parse
 * @returns Parsed date or null
 */
export function smartParse(
    dateString: string
): Date | null {
    if (!dateString || typeof dateString !== 'string') {
        return null;
    }

    const trimmed = dateString.trim();
    
    // Try natural language first
    const naturalResult = parseNaturalLanguage(trimmed);
    if (naturalResult) {
        return naturalResult;
    }

    // Try ISO format
    const isoResult = parseISO(trimmed);
    if (isoResult) {
        return isoResult;
    }

    // Try common formats
    const commonFormats = [
        'YYYY-MM-DD',
        'MM/DD/YYYY',
        'DD/MM/YYYY',
        'MMM DD, YYYY',
        'DD MMM YYYY'
    ];
    
    const multiFormatResult = parseMultipleFormats(trimmed, commonFormats);
    if (multiFormatResult) {
        return multiFormatResult;
    }

    // Last resort: native Date parsing
    try {
        const nativeResult = new Date(trimmed);
        return isValidDate(nativeResult) ? nativeResult : null;
    } catch {
        return null;
    }
}

/**
 * Gets comprehensive timezone information
 * @param timezone - IANA timezone identifier
 * @param date - Date for DST calculation
 * @returns Timezone information object
 */
export function getTimezoneInfo(
    timezone: IANATimezone,
    date: Date = new Date()
): {
    name: string;
    abbreviation: string;
    offset: number;
    isDST: boolean;
    offsetString: string;
    description?: string;
} {
    try {
        // Use our standardized timezone database
        const tzInfo = getTimezoneInfoFromDB(timezone);
        const formatter = new Intl.DateTimeFormat('en', {
            timeZone: timezone,
            timeZoneName: 'short'
        });

        const parts = formatter.formatToParts(date);
        const abbreviation = parts.find(part => part.type === 'timeZoneName')?.value || '';

        // Calculate offset
        const utc1 = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const utc2 = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        const offset = (utc2.getTime() - utc1.getTime()) / (1000 * 60);

        // Format offset string
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset >= 0 ? '+' : '-';
        const offsetString = `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        // Check if DST is active (simplified check)
        const jan1 = new Date(date.getFullYear(), 0, 1);
        const jul1 = new Date(date.getFullYear(), 6, 1);
        const janOffset = getTimezoneOffsetForZone(jan1, timezone);
        const julOffset = getTimezoneOffsetForZone(jul1, timezone);
        const isDST = offset !== Math.max(janOffset, julOffset);

        return {
            name: timezone,
            abbreviation,
            offset: offset / 60, // Convert to hours
            isDST,
            offsetString,
            description: tzInfo?.description
        };
    } catch (error) {
        throw new ChronoUtilzError(`Failed to get timezone info for ${timezone}: ${error}`);
    }
}

/**
 * Lists all available IANA timezone identifiers
 * @returns Array of timezone names
 */
export function listTimezones(): string[] {
    // Return our comprehensive standardized timezone list
    return TIMEZONE_IDS;
}

/**
 * Get timezones by region
 * @param region - Region to filter by (e.g., 'America', 'Europe', 'Asia')
 * @returns Array of timezone objects in the specified region
 */
export { getTimezonesByRegion } from './timezones';

/**
 * Search timezones by description or ID
 * @param query - Search query
 * @returns Array of matching timezone objects
 */
export { searchTimezones } from './timezones';

/**
 * Get timezones by GMT offset
 * @param offset - GMT offset in hours
 * @returns Array of timezone objects with the specified offset
 */
export { getTimezonesByOffset } from './timezones';

/**
 * Get user's current timezone
 * @returns The user's IANA timezone identifier
 */
export { getUserTimezone } from './timezones';

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
        availableHolidayRules: Record<string, Array<{name: string, date: string, type: string}>>;
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

/**
 * Gets comprehensive configuration information for ChronoUtilz library
 * This function provides all available options, defaults, and supported values
 * to help users configure the library without struggling with documentation
 * 
 * @example
 * ```typescript
 * const config = getConfigs();
 * 
 * // Get all supported timezones
 * console.log(config.timezones);
 * 
 * // Get current business day configuration
 * console.log(config.businessDayConfig.currentWorkingDays);
 * 
 * // Get all available date formats
 * console.log(config.dateFormats);
 * 
 * // Get format tokens for custom formatting
 * console.log(config.formatTokens);
 * ```
 * 
 * @returns Complete configuration object with all available options
 */
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
            'MM-DD',
            'HH:mm',
            'dddd',
            'MMM',
            'MMMM'
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
            'year'
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
            '1 month ago'
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
            'custom'
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
                6: 'Saturday'
            }
        },
        
        holidayConfig: {
            supportedCountries: Object.keys(holidays),
            availableHolidayRules: (() => {
                const rules: Record<string, Array<{name: string, date: string, type: string}>> = {};
                for (const countryCode in holidays) {
                    if (Object.prototype.hasOwnProperty.call(holidays, countryCode)) {
                        rules[countryCode] = holidays[countryCode].holidays.map((holiday: any) => ({
                            name: holiday.name,
                            date: holiday.date,
                            type: holiday.type
                        }));
                    }
                }
                return rules;
            })()
        },
        
        locales: {
            standard: STANDARD_LOCALES,
            popular: POPULAR_LOCALES,
            regions: LOCALES_BY_REGION
        },
        
        workingTimeDefaults: {
            startHour: 9,
            endHour: 17,
            workingDays: [1, 2, 3, 4, 5],
            timezone: 'UTC'
        },
        
        payrollFrequencies: [
            'weekly',
            'bi-weekly',
            'biweekly',
            'semi-monthly',
            'monthly',
            'quarterly',
            'yearly'
        ],
        
        seasonalConfig: {
            hemispheres: ['northern', 'southern'],
            seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
            timeOfDay: ['Night', 'Morning', 'Afternoon', 'Evening']
        },
        
        formatTokens: {
            'YYYY': '4-digit year (2024)',
            'YY': '2-digit year (24)',
            'MMMM': 'Full month name (January)',
            'MMM': 'Short month name (Jan)',
            'MM': '2-digit month (01-12)',
            'M': 'Month number (1-12)',
            'DD': '2-digit day (01-31)',
            'D': 'Day number (1-31)',
            'Do': 'Day with ordinal suffix (1st, 2nd, 3rd)',
            'dddd': 'Full weekday name (Monday)',
            'ddd': 'Short weekday name (Mon)',
            'dd': 'Narrow weekday (M)',
            'HH': '24-hour format hours (00-23)',
            'hh': '12-hour format hours (01-12)',
            'H': '24-hour format hours (0-23)',
            'h': '12-hour format hours (1-12)',
            'mm': 'Minutes (00-59)',
            'm': 'Minutes (0-59)',
            'ss': 'Seconds (00-59)',
            's': 'Seconds (0-59)',
            'SSS': 'Milliseconds (000-999)',
            'A': 'AM/PM (uppercase)',
            'a': 'am/pm (lowercase)',
            'Z': 'Timezone offset (+05:00)',
            'ZZ': 'Timezone offset (+0500)',
            'X': 'Unix timestamp (seconds)',
            'x': 'Unix timestamp (milliseconds)'
        },
        
        fiscalYearDefaults: {
            startMonth: 1,  // January
            startDay: 1     // 1st day
        },
        
        overtime: {
            defaultRegularHours: 40,
            defaultOvertimeMultiplier: 1.5,
            defaultDoubleTimeThreshold: 60
        }
    };
}

/**
 * ChronoUtilz namespace - contains all ChronoUtilz exports for easy access
 */
export const ChronoUtilz = {
    parseDate,
    formatDate,
    addTime,
    subtractTime,
    getDateDiff,
    isBetweenDates,
    isValidDate,
    startOf,
    endOf,
    getDayOfYear,
    getWeekOfYear,
    isLeapYear,
    getDaysInMonth,
    getRelativeTime,
    getTimezoneOffset,
    createDate,
    CalendarDate,
    utcNow,
    toUTC,
    getTimezoneString,
    validateDateFormat,
    generateDateRange,
    formatDuration,
    getQuarter,
    getBusinessDays,
    calculateAge,
    // Business Day Configuration
    configureWorkingDays,
    configureHolidays,
    getBusinessDayConfig,
    resetBusinessDayConfig,

    // Core Business Day Functions
    isWeekend,
    isWeekday,
    isBusinessDay,
    addBusinessDays,
    subtractBusinessDays,
    getNextBusinessDay,
    getPreviousBusinessDay,

    // Advanced Business Logic
    businessDaysInMonth,
    differenceInBusinessDays,
    isFirstBusinessDayOfMonth,
    isLastBusinessDayOfMonth,
    getBusinessDaysInMonth,
    
    cloneDate,
    minDate,
    maxDate,
    roundToNearest,
    compareDates,
    getTimestamp,
    fromTimestamp,
    randomDate,
    copyTime,
    truncateToUnit,
    setTime,
    isSameDay,
    isSameWeek,
    isSameMonth,
    isSameYear,
    isAfter,
    isBefore,
    isWithinRange,
    isValidRange,
    sortDates,
    getEarliestDate,
    getLatestDate,
    removeDuplicateDates,
    isFirstDayOfMonth,
    isLastDayOfMonth,
    isFirstDayOfYear,
    isLastDayOfYear,
    getWeekBoundaries,
    getMonthBoundaries,
    getYearBoundaries,
    getQuarterBoundaries,
    stripTime,
    getMidnight,
    getNoon,

    // Holiday & Calendar Support
    isHoliday,
    getHolidays,
    addHolidayRules,
    getNextHoliday,
    addCustomHolidays,
    calculateBusinessDaysCustom,

    // Working Hours & Time Calculations
    getWorkingHoursBetween,
    addWorkingHours,
    isWorkingHours,
    getNextWorkingHour,

    // Date/Time Utilities
    mergeDateTime,
    timeOfDay,

    // Week & Period Utilities
    getISOWeek,
    getWeekOfMonth,
    getFiscalQuarter,
    getFiscalYear,
    getPayPeriods,
    getSeason,
    getMonthName,
    getMonthsInQuarter,

    // Occurrence & Pattern Functions
    nextOccurrence,
    previousOccurrence,

    // PILLAR 1: Core Operations - New Functions
    convertTimezone,
    parseNaturalLanguage,
    generateRecurringDates,
    compareDetailed,
    calculateAdvancedDuration,
    getNthWeekdayOfMonth,
    calculateBusinessDaysAdvanced,
    findClosestDate,

    // PILLAR 2: Business Utilities - New Functions
    getFiscalPeriodAdvanced,
    calculateWorkingHours,
    generatePayrollPeriods,
    calculateProjectMilestones,
    generateBusinessCalendar,
    calculateOvertime,
    generateShiftSchedule,
    calculateSLACompliance,

    // PILLAR 3: Formatting & Parsing - New Functions
    formatISO,
    formatCustom,
    formatLocalized,
    formatRelativeLocalized,
    formatCalendar,
    formatTimezone,
    humanizeDuration,
    parseISO,
    parseMultipleFormats,
    smartParse,
    getTimezoneInfo,
    listTimezones,
    
    // Configuration Functions
    getConfigs
};

export default ChronoUtilz;