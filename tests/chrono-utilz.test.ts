import { expect } from 'chai';
import {
    ChronoUtilz,
    convertTimezone,
    parseNaturalLanguage,
    generateRecurringDates,
    compareDetailed,
    calculateAdvancedDuration,
    getNthWeekdayOfMonth,
    calculateBusinessDaysAdvanced,
    findClosestDate,
    getFiscalPeriodAdvanced,
    calculateWorkingHours,
    generatePayrollPeriods,
    calculateProjectMilestones,
    generateBusinessCalendar,
    calculateOvertime,
    generateShiftSchedule,
    calculateSLACompliance,
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
    listTimezones
} from '../src/index';

describe('ChronoUtilz v2.0 - New Functions', () => {

    describe('Core Operations - Timezone Conversion', () => {
        it('should convert timezone from UTC to New York', () => {
            const utcDate = new Date('2025-01-01T12:00:00Z');
            const result = convertTimezone(utcDate, {
                from: 'UTC',
                to: 'America/New_York'
            });
            expect(result).to.be.instanceOf(Date);
        });

        it('should convert timezone with preserveTime option', () => {
            const utcDate = new Date('2025-01-01T12:00:00Z');
            const result = convertTimezone(utcDate, {
                from: 'UTC',
                to: 'Europe/London',
                preserveTime: true
            });
            expect(result).to.be.instanceOf(Date);
        });

        it('should throw error for invalid date', () => {
            expect(() => {
                convertTimezone('invalid-date', {
                    to: 'America/New_York'
                });
            }).to.throw();
        });
    });

    describe('Core Operations - Natural Language Parsing', () => {
        it('should parse "today"', () => {
            const result = parseNaturalLanguage('today');
            expect(result).to.be.instanceOf(Date);
        });

        it('should parse "tomorrow"', () => {
            const result = parseNaturalLanguage('tomorrow');
            expect(result).to.be.instanceOf(Date);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            expect(result?.getDate()).to.equal(tomorrow.getDate());
        });

        it('should parse "next friday"', () => {
            const result = parseNaturalLanguage('next friday');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDay()).to.equal(5); // Friday
        });

        it('should parse "in 2 weeks"', () => {
            const result = parseNaturalLanguage('in 2 weeks');
            expect(result).to.be.instanceOf(Date);
        });

        it('should parse "3 days ago"', () => {
            const result = parseNaturalLanguage('3 days ago');
            expect(result).to.be.instanceOf(Date);
        });

        it('should return null for invalid expressions', () => {
            const result = parseNaturalLanguage('invalid expression');
            expect(result).to.be.null;
        });

        it('should throw error in strict parsing mode', () => {
            expect(() => {
                parseNaturalLanguage('completely invalid expression xyz123', { strictParsing: true });
            }).to.throw();
        });
    });

    describe('Core Operations - Recurring Date Generation', () => {
        it('should generate daily recurring dates', () => {
            const startDate = new Date('2025-01-01');
            const result = generateRecurringDates(startDate, {
                pattern: 'daily',
                maxOccurrences: 5
            });
            expect(result).to.have.lengthOf(5);
            expect(result[0]).to.deep.equal(startDate);
        });

        it('should generate weekly recurring dates', () => {
            const startDate = new Date('2025-01-01');
            const result = generateRecurringDates(startDate, {
                pattern: 'weekly',
                maxOccurrences: 3
            });
            expect(result).to.have.lengthOf(3);
            expect(result[1].getTime() - result[0].getTime()).to.equal(7 * 24 * 60 * 60 * 1000);
        });

        it('should generate monthly recurring dates', () => {
            const startDate = new Date('2025-01-01');
            const result = generateRecurringDates(startDate, {
                pattern: 'monthly',
                maxOccurrences: 3
            });
            expect(result).to.have.lengthOf(3);
        });

        it('should generate quarterly recurring dates', () => {
            const startDate = new Date('2025-01-01');
            const result = generateRecurringDates(startDate, {
                pattern: 'quarterly',
                maxOccurrences: 2
            });
            expect(result).to.have.lengthOf(2);
        });

        it('should respect end date constraint', () => {
            const startDate = new Date('2025-01-01');
            const endDate = new Date('2025-01-10');
            const result = generateRecurringDates(startDate, {
                pattern: 'daily',
                maxOccurrences: 20,
                endDate: endDate
            });
            expect(result.every(date => date <= endDate)).to.be.true;
        });

        it('should generate weekdays only', () => {
            const startDate = new Date('2025-01-01'); // Wednesday
            const result = generateRecurringDates(startDate, {
                pattern: 'weekdays',
                maxOccurrences: 5
            });
            expect(result).to.have.lengthOf(5);
            result.forEach(date => {
                const day = date.getDay();
                expect(day).to.be.at.least(1).and.at.most(5);
            });
        });

        it('should throw error for invalid start date', () => {
            expect(() => {
                generateRecurringDates('invalid-date', {
                    pattern: 'daily',
                    maxOccurrences: 3
                });
            }).to.throw();
        });
    });

    describe('Core Operations - Detailed Comparison', () => {
        it('should compare dates with detailed breakdown', () => {
            const date1 = new Date('2025-01-01');
            const date2 = new Date('2025-01-15');
            const result = compareDetailed(date1, date2);
            
            expect(result).to.have.property('isBefore', true);
            expect(result).to.have.property('isAfter', false);
            expect(result).to.have.property('isSame', false);
            expect(result).to.have.property('difference');
            expect(result.difference).to.have.property('days');
        });

        it('should handle same dates', () => {
            const date = new Date('2025-01-01');
            const result = compareDetailed(date, date);
            
            expect(result.isSame).to.be.true;
            expect(result.isBefore).to.be.false;
            expect(result.isAfter).to.be.false;
        });
    });

    describe('Core Operations - Advanced Duration', () => {
        it('should calculate advanced duration with default options', () => {
            const start = new Date('2025-01-01');
            const end = new Date('2025-01-15');
            const result = calculateAdvancedDuration(start, end);
            
            expect(result).to.be.a('string');
            expect(result.length).to.be.greaterThan(0);
        });

        it('should calculate duration with custom precision', () => {
            const start = new Date('2025-01-01');
            const end = new Date('2025-01-15');
            const result = calculateAdvancedDuration(start, end, {
                precision: 3,
                format: 'short'
            });
            
            expect(result).to.be.a('string');
        });

        it('should include zero values when requested', () => {
            const start = new Date('2025-01-01T10:00:00');
            const end = new Date('2025-01-01T10:01:00'); // 1 minute difference
            const result = calculateAdvancedDuration(start, end, {
                includeZeroValues: true,
                precision: 3,
                units: ['year', 'month', 'minute']
            });
            
            expect(result).to.be.a('string');
            expect(result.length).to.be.greaterThan(0);
        });
    });

    describe('Business Utilities - Fiscal Periods', () => {
        it('should calculate fiscal period with default config', () => {
            const date = new Date('2025-06-15');
            const result = getFiscalPeriodAdvanced(date);
            
            expect(result).to.have.property('quarter');
            expect(result).to.have.property('year');
            expect(result).to.have.property('startDate');
            expect(result).to.have.property('endDate');
            expect(result.quarter).to.be.at.least(1).and.at.most(4);
        });

        it('should calculate fiscal period with custom config', () => {
            const date = new Date('2025-06-15');
            const result = getFiscalPeriodAdvanced(date, {
                startMonth: 4, // April
                startDay: 1
            });
            
            expect(result).to.have.property('quarter');
            expect(result).to.have.property('year');
            expect(result.startDate).to.be.instanceOf(Date);
            expect(result.endDate).to.be.instanceOf(Date);
        });
    });

    describe('Business Utilities - Working Hours', () => {
        it('should calculate working hours between dates', () => {
            const start = new Date('2025-01-01T09:00:00');
            const end = new Date('2025-01-01T17:00:00');
            const result = calculateWorkingHours(start, end, {
                startHour: 9,
                endHour: 17,
                workingDays: [1, 2, 3, 4, 5]
            });
            
            expect(result).to.be.a('number');
            expect(result).to.be.at.least(0);
        });

        it('should return 0 for end date before start date', () => {
            const start = new Date('2025-01-02T09:00:00');
            const end = new Date('2025-01-01T17:00:00');
            const result = calculateWorkingHours(start, end, {
                startHour: 9,
                endHour: 17,
                workingDays: [1, 2, 3, 4, 5]
            });
            
            expect(result).to.equal(0);
        });
    });

    describe('Business Utilities - Payroll Periods', () => {
        it('should generate weekly payroll periods', () => {
            const result = generatePayrollPeriods(2025, 'weekly');
            
            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(50); // ~52 weeks
            expect(result[0]).to.have.property('startDate');
            expect(result[0]).to.have.property('endDate');
            expect(result[0]).to.have.property('payDate');
        });

        it('should generate biweekly payroll periods', () => {
            const result = generatePayrollPeriods(2025, 'biweekly');
            
            expect(result).to.be.an('array');
            expect(result.length).to.be.approximately(26, 2); // ~26 bi-weekly periods
        });

        it('should generate monthly payroll periods', () => {
            const result = generatePayrollPeriods(2025, 'monthly');
            
            expect(result).to.be.an('array');
            expect(result.length).to.equal(12);
        });

        it('should generate semimonthly payroll periods', () => {
            const result = generatePayrollPeriods(2025, 'semimonthly');
            
            expect(result).to.be.an('array');
            expect(result.length).to.equal(24); // 2 per month
        });
    });

    describe('Business Utilities - Overtime Calculation', () => {
        it('should calculate overtime for standard week', () => {
            const result = calculateOvertime(50, 40, 1.5);
            
            expect(result).to.have.property('regularHours', 40);
            expect(result).to.have.property('overtimeHours', 10);
            expect(result).to.have.property('doubleTimeHours', 0);
        });

        it('should calculate double time when applicable', () => {
            const result = calculateOvertime(65, 40, 1.5, 50);
            
            expect(result).to.have.property('regularHours', 40);
            expect(result).to.have.property('overtimeHours', 10);
            expect(result).to.have.property('doubleTimeHours', 15);
        });

        it('should throw error for negative hours', () => {
            expect(() => {
                calculateOvertime(-5, 40);
            }).to.throw();
        });
    });

    describe('Business Utilities - SLA Compliance', () => {
        it('should calculate SLA compliance', () => {
            const incident = new Date('2025-01-01T09:00:00');
            const resolved = new Date('2025-01-01T15:00:00');
            const result = calculateSLACompliance(incident, resolved, 8);
            
            expect(result).to.have.property('actualHours');
            expect(result).to.have.property('slaHours', 8);
            expect(result).to.have.property('isCompliant');
            expect(result).to.have.property('breachHours');
            expect(result).to.have.property('percentageOfSLA');
        });
    });

    describe('Formatting & Parsing - ISO Formatting', () => {
        it('should format ISO with default options', () => {
            const date = new Date('2025-01-01T12:00:00.000Z');
            const result = formatISO(date);
            
            expect(result).to.be.a('string');
            expect(result).to.include('2025-01-01');
            expect(result).to.include('T');
        });

        it('should format ISO date only', () => {
            const date = new Date('2025-01-01T12:00:00.000Z');
            const result = formatISO(date, { includeTime: false });
            
            expect(result).to.be.a('string');
            expect(result).to.equal('2025-01-01');
        });

        it('should format ISO without timezone', () => {
            const date = new Date('2025-01-01T12:00:00.000Z');
            const result = formatISO(date, { includeTimezone: false });
            
            expect(result).to.be.a('string');
            expect(result).to.not.include('Z');
        });
    });

    describe('Formatting & Parsing - Smart Parsing', () => {
        it('should parse ISO dates', () => {
            const result = smartParse('2025-01-01T12:00:00Z');
            expect(result).to.be.instanceOf(Date);
        });

        it('should parse natural language', () => {
            const result = smartParse('tomorrow');
            expect(result).to.be.instanceOf(Date);
        });

        it('should return null for invalid input', () => {
            const result = smartParse('invalid date string');
            expect(result).to.be.null;
        });

        it('should handle empty input', () => {
            const result = smartParse('');
            expect(result).to.be.null;
        });
    });

    describe('Formatting & Parsing - Timezone Info', () => {
        it('should get timezone information', () => {
            const result = getTimezoneInfo('America/New_York');
            
            expect(result).to.have.property('name', 'America/New_York');
            expect(result).to.have.property('abbreviation');
            expect(result).to.have.property('offset');
            expect(result).to.have.property('isDST');
            expect(result).to.have.property('offsetString');
        });

        it('should handle UTC timezone', () => {
            const result = getTimezoneInfo('UTC');
            
            expect(result.name).to.equal('UTC');
            expect(result.offset).to.equal(0);
        });
    });

    describe('Formatting & Parsing - Timezone List', () => {
        it('should return array of timezones', () => {
            const result = listTimezones();
            
            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            expect(result).to.include('UTC');
            expect(result).to.include('America/New_York');
        });
    });

    describe('Formatting & Parsing - Human Duration', () => {
        it('should humanize duration with default options', () => {
            const result = humanizeDuration(7200000); // 2 hours
            
            expect(result).to.be.a('string');
            expect(result).to.include('hour');
        });

        it('should handle negative durations', () => {
            const result = humanizeDuration(-3600000); // -1 hour
            
            expect(result).to.be.a('string');
            expect(result).to.include('ago');
        });

        it('should format with short format', () => {
            const result = humanizeDuration(3661000, { format: 'short' }); // 1 hour 1 minute 1 second
            
            expect(result).to.be.a('string');
        });
    });

    describe('Error Handling', () => {
        it('should handle invalid dates gracefully', () => {
            expect(() => {
                convertTimezone('not-a-date', { to: 'UTC' });
            }).to.throw();
        });

        it('should handle invalid timezone', () => {
            expect(() => {
                getTimezoneInfo('Invalid/Timezone');
            }).to.throw();
        });

        it('should validate fiscal year config', () => {
            expect(() => {
                getFiscalPeriodAdvanced('invalid-date');
            }).to.throw();
        });
    });

    describe('Edge Cases', () => {
        it('should handle leap year dates', () => {
            const leapDate = new Date('2024-02-29');
            const result = parseNaturalLanguage('today', { baseDate: leapDate });
            expect(result).to.be.instanceOf(Date);
        });

        it('should handle year boundaries', () => {
            const newYear = new Date('2024-12-31T23:59:59');
            const result = parseNaturalLanguage('tomorrow', { baseDate: newYear });
            expect(result?.getFullYear()).to.equal(2025);
        });

        it('should handle month boundaries', () => {
            const endOfMonth = new Date('2025-01-31');
            const result = parseNaturalLanguage('tomorrow', { baseDate: endOfMonth });
            expect(result?.getMonth()).to.equal(1); // February
        });
    });
});

// Configuration Tests
describe('Configuration Functions', () => {
    describe('getConfigs', () => {
        let config: any;
        
        beforeEach(() => {
            const { getConfigs } = require('../src/index.ts');
            config = getConfigs();
        });
        
        it('should return a complete configuration object', () => {
            expect(config).to.be.an('object');
            expect(config).to.have.all.keys([
                'dateFormats',
                'timeUnits', 
                'timezones',
                'naturalLanguageExpressions',
                'recurringPatterns',
                'businessDayConfig',
                'holidayConfig',
                'locales',
                'workingTimeDefaults',
                'payrollFrequencies',
                'seasonalConfig',
                'formatTokens',
                'fiscalYearDefaults',
                'overtime'
            ]);
        });
        
        it('should have correct date formats', () => {
            expect(config.dateFormats).to.be.an('array');
            expect(config.dateFormats).to.include.members([
                'YYYY-MM-DD',
                'MM/DD/YYYY',
                'DD/MM/YYYY',
                'YYYY-MM-DD HH:mm:ss'
            ]);
            expect(config.dateFormats.length).to.be.greaterThan(10);
        });
        
        it('should have correct time units', () => {
            expect(config.timeUnits).to.be.an('array');
            expect(config.timeUnits).to.include.members([
                'millisecond', 'second', 'minute', 'hour', 
                'day', 'week', 'month', 'quarter', 'year'
            ]);
            expect(config.timeUnits).to.have.lengthOf(9);
        });
        
        it('should have comprehensive timezone list', () => {
            expect(config.timezones).to.be.an('array');
            expect(config.timezones).to.include.members([
                'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'
            ]);
            expect(config.timezones.length).to.be.greaterThan(30);
        });
        
        it('should have natural language expressions', () => {
            expect(config.naturalLanguageExpressions).to.be.an('array');
            expect(config.naturalLanguageExpressions).to.include.members([
                'now', 'today', 'tomorrow', 'yesterday',
                'next week', 'last week', 'next month', 'last month'
            ]);
            expect(config.naturalLanguageExpressions.length).to.be.greaterThan(30);
        });
        
        it('should have recurring patterns', () => {
            expect(config.recurringPatterns).to.be.an('array');
            expect(config.recurringPatterns).to.include.members([
                'daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom'
            ]);
        });
        
        it('should have business day configuration', () => {
            expect(config.businessDayConfig).to.be.an('object');
            expect(config.businessDayConfig.defaultWorkingDays).to.deep.equal([1, 2, 3, 4, 5]);
            expect(config.businessDayConfig.workingDayNames).to.have.property('0', 'Sunday');
            expect(config.businessDayConfig.workingDayNames).to.have.property('1', 'Monday');
        });
        
        it('should have holiday configuration', () => {
            expect(config.holidayConfig).to.be.an('object');
            expect(config.holidayConfig.supportedCountries).to.include.members(['US', 'UK']);
            expect(config.holidayConfig.availableHolidayRules.US).to.be.an('array');
            expect(config.holidayConfig.availableHolidayRules.UK).to.be.an('array');
        });
        
        it('should have locale configuration', () => {
            expect(config.locales).to.be.an('object');
            expect(config.locales.popular).to.include.members([
                'en-US', 'en-GB', 'fr-FR', 'de-DE', 'ja-JP'
            ]);
            expect(config.locales.regions).to.have.property('North America');
            expect(config.locales.regions).to.have.property('Europe');
        });
        
        it('should have working time defaults', () => {
            expect(config.workingTimeDefaults).to.deep.include({
                startHour: 9,
                endHour: 17,
                workingDays: [1, 2, 3, 4, 5],
                timezone: 'UTC'
            });
        });
        
        it('should have payroll frequencies', () => {
            expect(config.payrollFrequencies).to.include.members([
                'weekly', 'bi-weekly', 'monthly', 'quarterly'
            ]);
        });
        
        it('should have seasonal configuration', () => {
            expect(config.seasonalConfig.hemispheres).to.deep.equal(['northern', 'southern']);
            expect(config.seasonalConfig.seasons).to.include.members([
                'Spring', 'Summer', 'Autumn', 'Winter'
            ]);
            expect(config.seasonalConfig.timeOfDay).to.include.members([
                'Night', 'Morning', 'Afternoon', 'Evening'
            ]);
        });
        
        it('should have format tokens with descriptions', () => {
            expect(config.formatTokens).to.be.an('object');
            expect(config.formatTokens.YYYY).to.equal('4-digit year (2024)');
            expect(config.formatTokens.MM).to.equal('2-digit month (01-12)');
            expect(config.formatTokens.DD).to.equal('2-digit day (01-31)');
            expect(Object.keys(config.formatTokens).length).to.be.greaterThan(25);
        });
        
        it('should have fiscal year defaults', () => {
            expect(config.fiscalYearDefaults).to.deep.equal({
                startMonth: 1,
                startDay: 1
            });
        });
        
        it('should have overtime configuration', () => {
            expect(config.overtime).to.deep.include({
                defaultRegularHours: 40,
                defaultOvertimeMultiplier: 1.5,
                defaultDoubleTimeThreshold: 60
            });
        });
        
        it('should reflect dynamic business day configuration changes', () => {
            const { configureWorkingDays, getConfigs } = require('../src/index.ts');
            
            // Change working days configuration
            configureWorkingDays([1, 2, 3, 4, 5, 6]); // Add Saturday
            
            const updatedConfig = getConfigs();
            expect(updatedConfig.businessDayConfig.currentWorkingDays).to.deep.equal([1, 2, 3, 4, 5, 6]);
            
            // Reset to default
            configureWorkingDays([1, 2, 3, 4, 5]);
        });
        
        it('should reflect dynamic holiday configuration changes', () => {
            const { configureHolidays, getConfigs } = require('../src/index.ts');
            
            // Add holidays
            configureHolidays(['2024-12-25', '2024-01-01']);
            
            const updatedConfig = getConfigs();
            expect(updatedConfig.businessDayConfig.currentHolidays).to.have.lengthOf(2);
            expect(updatedConfig.businessDayConfig.currentHolidays).to.include('2024-12-25');
            expect(updatedConfig.businessDayConfig.currentHolidays).to.include('2024-01-01');
        });
    });
});