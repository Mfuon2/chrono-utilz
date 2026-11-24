# ChronoUtilz

Precise date utilities for JavaScript and TypeScript, from everyday calculations to business scheduling.

- Import individual functions with tree-shakeable ES modules and TypeScript declarations.
- Work with calendar arithmetic, timezones, recurring dates, working hours, and fiscal periods.
- Keep runtime dependencies at zero, with behavior checked across multiple timezones.

```bash
npm install @mfuon2/chrono-utilz
```

```typescript
import { addBusinessDays, formatDate } from '@mfuon2/chrono-utilz';

const deadline = addBusinessDays('2025-01-03', 3);
console.log(formatDate(deadline)); // 2025-01-08
```

[Documentation](https://chronoutilz.netlify.app/documentation) · [API reference](https://chronoutilz.netlify.app/api-docs) · [Playground](https://chronoutilz.netlify.app/playground)

Supports Node.js 22+ and modern browsers with `Intl`. [Upgrading from v2](docs/MIGRATION.md) · [Contributing](CONTRIBUTING.md) · [MIT license](LICENSE.md)
