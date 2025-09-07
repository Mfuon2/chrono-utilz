
<div align="center">
<h1>📅 ChronoUtilz</h1>

**ChronoUtilz v2.0 is a comprehensive date utility library built on Three Pillars Architecture. With 135+ functions spanning Core Operations, Business Utilities, and Formatting & Parsing, it's designed for serious date manipulation needs in JavaScript and TypeScript applications.**

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/19bff778386b42779ffa07b61171420e)](https://app.codacy.com/gh/Fintector/date-wise?utm_source=github.com&utm_medium=referral&utm_content=Fintector/date-wise&utm_campaign=Badge_Grade)
[![npm version](https://img.shields.io/npm/v/@mfuon2/chrono-utilz.svg)](https://www.npmjs.com/package/chrono-utilz)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@mfuon2/chrono-utilz)](https://bundlephobia.com/package/@mfuon2/chrono-utilz)
[![Downloads](https://img.shields.io/npm/dm/@mfuon2/chrono-utilz.svg)](https://www.npmjs.com/package/@mfuon2/chrono-utilz)
[![License](https://img.shields.io/npm/l/@mfuon2/chrono-utilz.svg)](https://github.com/mfuon2/chrono-utilz/blob/main/LICENSE.md)

> 🌍 Enterprise-ready for Node.js, modern browsers, and TypeScript-first projects.
</div>

## 🏗️ Three Pillars Architecture

ChronoUtilz v2.0 is built on three comprehensive pillars:

### 🔹 PILLAR 1: Core Operations (45+ Functions)
**Date manipulation & comparison**
- Advanced date arithmetic and comparison
- Timezone conversion between IANA zones
- Natural language parsing ("next Friday", "in 2 weeks")
- Recurring date pattern generation
- Smart date validation and cloning

### 🔹 PILLAR 2: Business Utilities (55+ Functions) 
**Real-world business logic**
- Working days with holiday support
- Fiscal quarters and periods with custom configurations
- Payroll period calculations
- Project milestone tracking
- SLA compliance monitoring
- Overtime and shift scheduling
- Business calendar generation

### 🔹 PILLAR 3: Formatting & Parsing (35+ Functions)
**Advanced presentation & input handling**
- Multi-locale formatting with Intl support
- Advanced custom formatting patterns
- Smart parsing with multiple fallback strategies
- Timezone-aware formatting
- Human-readable duration formatting
- ISO 8601 compliance

## 🚀 Business-Ready Features

- **Working Days**: Sophisticated business day calculations with holiday support
- **Fiscal Quarters**: Custom fiscal year configurations for any business cycle
- **Natural Language**: Parse expressions like "next Friday" or "in 2 weeks"
- **IANA Timezones**: Full support for timezone conversion and formatting
- **Recurring Patterns**: Generate complex recurring date sequences
- **Advanced Durations**: Precise duration calculations with multiple units

## Why Choose ChronoUtilz v2.0?

- **🏢 Enterprise-Ready** - Built for real-world business applications
- **🎯 Comprehensive** - 135+ functions covering every date scenario
- **⚡ Performance-First** - Optimized for speed and efficiency
- **🔧 TypeScript Native** - Full type safety throughout
- **🌍 Zero Dependencies** - Lightweight with no external requirements
- **📚 Business Logic Built-in** - Payroll, scheduling, and compliance features included

## Installation

```bash
# Using npm
npm install @mfuon2/chrono-utilz

# Using yarn
yarn add @mfuon2/chrono-utilz

# Using pnpm
pnpm add @mfuon2/chrono-utilz
```

## 🚀 Quick Examples

### Core Operations
```javascript
import { ChronoUtilz } from '@mfuon2/chrono-utilz';

// Natural language parsing
const nextFriday = ChronoUtilz.parseNaturalLanguage('next Friday');
const inTwoWeeks = ChronoUtilz.parseNaturalLanguage('in 2 weeks');

// Timezone conversion
const nyTime = ChronoUtilz.convertTimezone(new Date(), {
    from: 'UTC',
    to: 'America/New_York'
});

// Recurring patterns
const weeklyMeetings = ChronoUtilz.generateRecurringDates(
    new Date('2025-01-06'),
    { pattern: 'weekly', maxOccurrences: 10 }
);
```

### Business Utilities
```javascript
// Calculate working days excluding holidays
const workingDays = ChronoUtilz.calculateBusinessDaysAdvanced(
    '2025-01-01',
    '2025-01-31',
    { workingDays: [1, 2, 3, 4, 5], excludeHolidays: true }
);

// Generate payroll periods
const payPeriods = ChronoUtilz.generatePayrollPeriods(2025, 'biweekly');

// SLA compliance tracking
const slaResult = ChronoUtilz.calculateSLACompliance(
    '2025-01-01 09:00',
    '2025-01-01 15:30',
    8 // 8 hour SLA
);

// Advanced fiscal period calculation
const fiscalInfo = ChronoUtilz.getFiscalPeriodAdvanced(
    new Date(),
    { startMonth: 4, startDay: 1 } // April 1st fiscal year start
);
```

### Formatting & Parsing
```javascript
// Advanced formatting with custom patterns
const formatted = ChronoUtilz.formatCustom(
    new Date(),
    'Do MMMM YYYY [at] HH:mm'
); // "7th January 2025 at 14:30"

// Smart parsing with multiple fallback strategies
const smartParsed = ChronoUtilz.smartParse('next month');

// Timezone-aware formatting
const tzFormatted = ChronoUtilz.formatTimezone(
    new Date(),
    'Europe/London',
    { includeDayOfWeek: true, includeTimezone: true }
);

// Human-readable durations
const duration = ChronoUtilz.humanizeDuration(
    7890000, // milliseconds
    { precision: 3, format: 'long' }
); // "2 hours, 11 minutes, 30 seconds"
```

## 📖 Complete Function Reference

### [View Full Documentation](DOCS.md)

## Browser & Environment Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Node.js**: 14.0.0+ (with full Intl support)
- **TypeScript**: 4.0+ (full type safety)
- **Bundle Size**: Tree-shakeable, use only what you need

## Web UI

This project now includes a comprehensive web interface to showcase all ChronoUtilz functions with interactive examples.

To use the web UI:

1. Build the library:
   ```bash
   npm run build
   ```

2. Build the browser version:
   ```bash
   npm run build:browser
   ```

3. Start the web server:
   ```bash
   cd web
   node server.js
   ```

4. Open your browser to `http://localhost:3000`

The web UI provides:
- Interactive demonstrations of all 135+ functions
- Live code playground
- Function categorization and search
- Responsive design for all devices

## Comparison with Other Libraries

| Feature | ChronoUtilz v2.0 | date-fns | moment.js | luxon |
|---------|------------------|----------|-----------|-------|
| Bundle size | Tree-shakeable | Tree-shakeable | Large | Medium |
| Dependencies | **Zero** | Zero | Zero | Zero |
| Business Logic | **✅ Built-in** | Limited | Limited | Limited |
| Natural Language | **✅ Advanced** | ❌ | ❌ | ❌ |
| IANA Timezones | **✅ Full Support** | Limited | ❌ | ✅ |
| Fiscal Periods | **✅ Custom Config** | ❌ | ❌ | ❌ |
| TypeScript | **✅ Native** | ✅ | ✅ | ✅ |
| Function Count | **135+** | 200+ | 100+ | 150+ |
| Immutable | **✅** | ✅ | ❌ | ✅ |

## Contributing

We welcome contributions of all kinds! See our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

Some ways you can help:
- Reporting bugs
- Suggesting features
- Improving documentation
- Adding tests
- Adding new functionality
- Optimizing existing code

## 🗺️ Roadmap

### v2.1 (Next Release)
- [ ] Method chaining support (ChronoWrapper class)
- [ ] Additional IANA timezone database integration
- [ ] More natural language expressions
- [ ] Calendar event management utilities

### v2.2 (Future)
- [ ] Plugin system for custom business rules
- [ ] Advanced recurring pattern builder
- [ ] Database integration helpers
- [ ] Performance optimizations and caching

### v3.0 (Long-term)
- [ ] Full i18n support for all locales
- [ ] Machine learning-based date parsing
- [ ] Advanced analytics and reporting features
- [ ] Integration with popular calendar systems

## License

MIT
