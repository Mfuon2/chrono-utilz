# Behavior and migration to version 3

Version 3 corrects date behavior and introduces explicit subpath exports. Review results when upgrading.

## Instants, calendar dates and timezones

A JavaScript Date stores an instant, not a timezone. Offset-bearing ISO strings retain their instant. Offset-free supported strings are local calendar values; an explicit parse timezone interprets those fields in that zone. Date-only strings use local midnight. Unsupported native-parser formats and rollover dates are rejected.

`toUTC`, `utcNow` and default `convertTimezone` preserve the instant. Use `formatDate(date, pattern, zone)` or `formatTimezone` to display another zone. `convertTimezone(..., {preserveTime:true, from, to})` explicitly reinterprets source clock fields in the target zone. Invalid zones throw. Parsing and reinterpretation in an explicit zone reject ambiguous or nonexistent local times; supply an ISO offset to select an instant.

Hours, minutes, seconds and milliseconds are elapsed arithmetic. Days and larger units are calendar arithmetic. Months, quarters and years clamp month ends. Explicit zoned calendar arithmetic preserves local clock time and rejects ambiguous/nonexistent results. Host-local Date arithmetic follows the host's built-in transition disambiguation.

Global timezone configuration affects formatting and calendar arithmetic. It does not change parsing of offset-free strings. APIs without timezone options operate in the host timezone. Pass explicit timezones where supported; do not change process timezone while an application is running.

## Differences and boundaries

`getDateDiff(a,b,unit)` means a minus b. Elapsed differences truncate toward zero. Months count month boundaries; quarters truncate that count divided by 3; years divide it by 12. For absolute calendar decomposition, use `compareDetailed`.

`startOf`, `endOf`, `isSameWeek` and `truncateToUnit` use Sunday-start weeks. `getWeekBoundaries` defaults to Monday and accepts weekStartsOn. `getISOWeek` and `getWeekOfYear` use ISO 8601 week numbers; use care at year boundaries because the week-year can differ from the calendar year.

`getBusinessDays` and `calculateBusinessDaysAdvanced` include both calendar dates. `differenceInBusinessDays` excludes the first ordered date and includes the last; reversed ranges negate that count. `calculateBusinessDaysCustom` excludes start and returns zero for reversed ranges. Range generation requires a positive integer step.

## Business configuration and holidays

Working days default to Monday-Friday. Global configured and custom holiday dates are used consistently by business-day helpers. Returned configuration is copied; changing it does not change library state. `resetBusinessDayConfig` clears both holiday stores. Configuration is shared within one loaded module format; separately loaded CJS and ESM graphs have separate state. Server applications should prefer explicit per-call configuration when calendars differ between requests.

The built-in holiday presets calculate recurring US federal actual dates and UK England/Wales actual dates. They do not implement historical rule changes, substituted observance, extraordinary proclamations or worldwide jurisdiction coverage. The separate legacy country catalog is reference data only and is not used by calculations. Supply custom holiday dates or floating functions for a verified calendar. Explicit unsupported regional/observed policies throw rather than being ignored.

Sources for recurring presets: [US Office of Personnel Management](https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/) and [UK bank holidays](https://www.gov.uk/bank-holidays). Verify exceptional and year-specific dates with the relevant authority. No network requests occur at runtime.

Working intervals are start-inclusive/end-exclusive. An end hour below the start hour represents an overnight shift, assigned to its starting day. Working-hour addition supports nonnegative hours; invalid and empty schedules throw. Advanced schedules can exclude global, custom and supplied country holidays.

Fiscal years are named by their starting year. Advanced fiscal start days are 1-28. Quarter ends include the final millisecond. Payroll period ends are clipped to the requested year; scheduled pay dates may fall in the next year. Pay and overtime results are arithmetic factors, with no jurisdiction-specific payroll policy.

## Parsing and formatting

Ambiguous slash dates default to month/day/year. To require day/month/year, use `parseMultipleFormats(value, ['DD/MM/YYYY'])`. Natural-language parsing supports a finite documented English grammar, not arbitrary prose.

`fromTimestamp` accepts milliseconds by default. Pass true as the second argument for seconds; magnitude guessing is removed. `getTimestamp(date, true)` returns seconds.

Custom format tokens are replaced once; square brackets escape literal text. Duration approximation uses 365-day years and 30-day months; detailed calendar decomposition is available separately. `formatISO` always produces UTC fields, even when the trailing timezone marker is omitted.

`getTimezoneInfo().isDST` remains a seasonal-offset heuristic because Intl has no authoritative DST flag. Use the date-specific offset for arithmetic. Bundled timezone offset filtering uses static reference offsets; the runtime supports additional IANA identifiers beyond the bundled catalog.

## Imports and runtime support

Named imports and imports such as `@mfuon2/chrono-utilz/addTime` are supported. The default namespace remains available but includes every helper. Internal files are not public import paths. Node.js 22+ and modern browsers with Intl are supported. No runtime polyfills or bundled timezone transition database are installed.
