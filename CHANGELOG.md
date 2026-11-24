# Changelog

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
