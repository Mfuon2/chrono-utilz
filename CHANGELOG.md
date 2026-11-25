# Changelog

## 3.0.1

Smaller bundles with no API or behavior changes.

- Functions that do not take a timezone no longer bundle the Intl timezone resolver: most single-function imports are about 23% smaller (median 1.69 kB → 1.30 kB gzip).
- The timezone and locale catalogs are stored packed and decoded on first use; `getConfigs`, `listTimezones` and the timezone search helpers return identical data.
- Complete bundle (webpack 5 + terser, as Bundlephobia measures): 70.0 kB → 60.4 kB minified, 20.9 kB → 20.2 kB gzip.
- Timezone and locale lookups return copies, so callers can no longer mutate the bundled catalog.
- Removed date-fns, dayjs, luxon and moment from development dependencies, along with the comparison benchmark; contract tests use in-file reference implementations.

## 3.0.0

- Preserve ISO offsets and UTC instants; apply explicit timezone formatting.
- Separate elapsed arithmetic from calendar arithmetic and clamp month ends.
- Correct ISO week numbering, day-of-year calculations, fiscal periods and detailed durations.
- Support partial-day and overnight working intervals; unify custom/global holiday handling.
- Validate range, recurrence, shift, payroll and SLA configurations.
- Prevent configuration mutations through returned arrays and holiday rules.
- Add individual function entry points, explicit exports, minification and bundle budgets.
- Generate the API reference from actual exports and check executable examples.
- Test all public callable exports, multiple host timezones and packed consumers.
- Publish through a checked, versioned artifact pipeline.

See [migration guidance](docs/MIGRATION.md) for changed semantics and explicit limitations.
