# Contributing

Use Node.js 22 or newer.

```bash
npm ci
npm run check
```

Functions live in individual TypeScript modules under `src`. Add public exports to `src/index.ts`, `scripts/entries.json` and the package export map. Every callable export must have a result-based test in `tests/contracts.test.ts`; the inventory assertion prevents untested public additions. Add invalid-input, boundary and mutation checks appropriate to the behavior. Run `npm run test:zones` for host-timezone regressions.

Update JSDoc and behavior notes in `docs/contracts.json`, then run `npm run docs`. Add runnable examples to `docs/examples.json`; CI checks their output. `npm run size` enforces gzip budgets; lower them when a change makes the package smaller.

`npm run build` generates minified CommonJS and ES modules plus declarations. `npm run test:package` installs the actual tarball in a clean temporary consumer and tests all subpaths and TypeScript imports. Release tags use `v<package version>`. CI checks the artifact before npm publication; do not rebuild it during publication.

Report reproducible issues with inputs, expected output, actual output, runtime version and timezone. Include a changelog entry for behavior changes.
