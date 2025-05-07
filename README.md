
<div align="center">
<h1>📅 DateWise</h1>

**DateWise is a lightweight, high-performance date utility library for JavaScript and TypeScript. Designed with minimal bundle size and developer productivity in mind, it provides essential date operations without the bloat of full-featured date libraries.**

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/19bff778386b42779ffa07b61171420e)](https://app.codacy.com/gh/Fintector/date-wise?utm_source=github.com&utm_medium=referral&utm_content=Fintector/date-wise&utm_campaign=Badge_Grade)
[![npm version](https://img.shields.io/npm/v/datewise.svg)](https://www.npmjs.com/package/datewise)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/datewise)](https://bundlephobia.com/package/datewise)
[![Downloads](https://img.shields.io/npm/dm/datewise.svg)](https://www.npmjs.com/package/datewise)
[![License](https://img.shields.io/npm/l/datewise.svg)](https://github.com/username/datewise/blob/main/LICENSE)

> 🌍 Designed for Node.js, modern browsers, and TypeScript-first projects.
</div>

## Why DateWise?

Working with dates in JavaScript doesn't have to be complicated. DateWise provides a comprehensive set of utilities to make date manipulation simple, reliable, and lightweight.

- **🪶 Lightweight** - Only ~3KB gzipped, no dependencies
- **⚡ Fast** - Optimized for performance
- **🔧 Versatile** - Works in browsers, Node.js, and with TypeScript
- **🌍 Timezone aware** - Proper handling of timezones
- **📚 Well documented** - Comprehensive documentation with examples

## Installation

```bash
# Using npm
npm install datewise

# Using yarn
yarn add datewise

# Using pnpm
pnpm add datewise
```

## Example Usage

```javascript
import DateWise from 'datewise';

// Parse a date string
const date = DateWise.parseDate('2025-05-07');

// Format a date
const formatted = DateWise.formatDate(new Date(), 'DD MMM YYYY'); // "07 May 2025"

// Add time to a date
const nextWeek = DateWise.addTime(new Date(), 1, 'week');

// Check if a date is valid
if (DateWise.isValidDate('2025-02-30')) {
  console.log('Valid date');
} else {
  console.log('Invalid date'); // This will run
}

// Get relative time
const relativeTime = DateWise.getRelativeTime(
  DateWise.subtractTime(new Date(), 2, 'day')
); // "2 days ago"
```

## Features

### Core Functions

- **parseDate** - Parse strings into Date objects with flexible format detection
- **formatDate** - Format dates into strings with various format options
- **addTime/subtractTime** - Add or subtract time units from dates
- **getDateDiff** - Get difference between dates in various units
- **isValidDate** - Check if a date is valid
- **isBetweenDates** - Check if a date is between two other dates

### Advanced Functions

- **startOf/endOf** - Get the start or end of a time unit (day, month, year)
- **getDayOfYear/getWeekOfYear** - Get the day or week number of the year
- **isLeapYear** - Check if a year is a leap year
- **getDaysInMonth** - Get the number of days in a month
- **getRelativeTime** - Get human-readable relative time description
- **getTimezoneOffset** - Get timezone offset in minutes or formatted string
- **toUTC** - Convert a local date to UTC

### Calendar Date Class

```javascript
// Create a CalendarDate instance (timezone-independent)
const birthday = new DateWise.CalendarDate(2000, 0, 1); // January 1, 2000
console.log(birthday.format('DD MMM YYYY')); // "01 Jan 2000"
```

## Supported Date Formats
```typescript
type DateFormat =
  | 'YYYY-MM-DD'           // 2025-05-07
  | 'MM/DD/YYYY'           // 05/07/2025
  | 'DD/MM/YYYY'           // 07/05/2025
  | 'YYYY-MM-DD HH:mm:ss'  // 2025-05-07 14:30:00
  | 'DD MMM YYYY'          // 07 May 2025
  | 'MMM DD, YYYY'         // May 07, 2025
  | 'HH:mm:ss'             // 14:30:00
  | 'hh:mm A';             // 02:30 PM
```

## Browser Support

DateWise supports all modern browsers (Chrome, Firefox, Safari, Edge) and IE11 with appropriate polyfills.

## Comparison with other libraries

| Feature | DateWise | 
|---------|----------|
| Bundle size | ~3KB |
| Dependencies | None |
| Immutable | ✅ |
| Tree-shaking | ✅ |
| TypeScript | ✅ |
| Timezone support | ✅ |
| Modern focus | ✅ |

## Contributing

We welcome contributions of all kinds! See our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

Some ways you can help:
- Reporting bugs
- Suggesting features
- Improving documentation
- Adding tests
- Adding new functionality
- Optimizing existing code

## Roadmap

- [ ] Add i18n support for month and day names
- [ ] Support more date formats
- [ ] Add calendar calculation utilities
- [ ] Create date range functionality
- [ ] Add date validation with custom rules
- [ ] Add more test cases for accuracy

## License

MIT