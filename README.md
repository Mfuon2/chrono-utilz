
<div align="center">
<h1>📅 ChronoUtilz</h1>

**A comprehensive date utility library with 135+ functions for serious date manipulation in JavaScript and TypeScript applications.**

[![npm version](https://img.shields.io/npm/v/@mfuon2/chrono-utilz.svg)](https://www.npmjs.com/package/@mfuon2/chrono-utilz)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@mfuon2/chrono-utilz)](https://bundlephobia.com/package/@mfuon2/chrono-utilz)
[![Downloads](https://img.shields.io/npm/dm/@mfuon2/chrono-utilz.svg)](https://www.npmjs.com/package/@mfuon2/chrono-utilz)
[![License](https://img.shields.io/npm/l/@mfuon2/chrono-utilz.svg)](https://github.com/mfuon2/chrono-utilz/blob/main/LICENSE.md)

#### [📖 Complete Documentation & Examples](https://chronoutilz.netlify.app/)
</div>

## 🚀 Main Features

### Core Date Operations
```typescript
import { parseNaturalLanguage, convertTimezone, generateRecurringDates, getRelativeTime } from '@mfuon2/chrono-utilz';

// Natural language parsing (assuming today is Jan 12, 2025)
parseNaturalLanguage('next Friday');     // → 2025-01-17
parseNaturalLanguage('in 2 weeks');      // → 2025-01-26  
parseNaturalLanguage('3 days ago');      // → 2025-01-09
parseNaturalLanguage('tomorrow');        // → 2025-01-13
parseNaturalLanguage('last Monday');     // → 2025-01-06

// Timezone conversion
convertTimezone(new Date('2025-01-12T15:00:00Z'), {
  from: 'UTC', 
  to: 'America/New_York'
});                                       // → 2025-01-12T10:00:00 (EST)

// Recurring dates
generateRecurringDates(new Date('2025-01-12'), {
  pattern: 'weekly',
  maxOccurrences: 3
});                                       // → [2025-01-12, 2025-01-19, 2025-01-26]

// Relative time 
getRelativeTime('2025-01-12T15:35:00Z');  // → "2 minutes ago"
getRelativeTime('2025-01-12T16:30:00Z');  // → "in 1 hour"
getRelativeTime('2025-01-10T15:30:00Z');  // → "2 days ago" 
getRelativeTime('2025-01-15T15:30:00Z');  // → "in 3 days"
```

### Business Logic
```typescript
import { getBusinessDays, getFiscalQuarter, generatePayrollPeriods } from '@mfuon2/chrono-utilz';

// Working days calculation
getBusinessDays(startDate, endDate);     // → Number of business days

// Fiscal periods
getFiscalQuarter(new Date());             // → Current fiscal quarter info

// Payroll periods
generatePayrollPeriods(2025, 'biweekly'); // → All payroll periods for 2025
```

### Advanced Formatting
```typescript
import { formatDate, formatDuration, formatLocalized } from '@mfuon2/chrono-utilz';

// Multiple date formats
formatDate(new Date(), 'YYYY-MM-DD');    // → "2025-01-15"
formatDate(new Date(), 'MMM DD, YYYY');  // → "Jan 15, 2025"

// Duration formatting
formatDuration(3661000, 'verbose');      // → "1 hour 1 minute 1 second"

// Localized formatting  
formatLocalized(new Date(), 'en-US');    // → US format
formatLocalized(new Date(), 'de-DE');    // → German format
```

## Installation

```bash
# Using npm
npm install @mfuon2/chrono-utilz

# Using yarn
yarn add @mfuon2/chrono-utilz

# Using pnpm
pnpm add @mfuon2/chrono-utilz
```

## Key Functions by Category

**📅 Core Operations (45+ functions)**
`parseDate`, `addTime`, `subtractTime`, `getDateDiff`, `isBetweenDates`, `startOf`, `endOf`, `convertTimezone`, `parseNaturalLanguage`, `generateRecurringDates`

**💼 Business Logic (55+ functions)**  
`getBusinessDays`, `getFiscalQuarter`, `generatePayrollPeriods`, `calculateWorkingHours`, `generateShiftSchedule`, `calculateSLACompliance`, `getHolidays`

**🎨 Formatting & Parsing (35+ functions)**
`formatDate`, `formatDuration`, `parseISO`, `smartParse`, `formatLocalized`, `humanizeDuration`

*For complete function list and examples, visit our [documentation site](https://chronoutilz.netlify.app/)*


## Environment Support

- **Node.js**: 14.0.0+
- **Browsers**: Modern browsers with ES2015 support  
- **TypeScript**: Full type safety included
- **Zero dependencies** - Lightweight and fast

## Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

## What's Next

See our [roadmap and upcoming features](https://chronoutilz.netlify.app/roadmap) on the documentation site.

## License

MIT
