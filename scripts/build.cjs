const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const { build } = require('tsup');
const names = require('./entries.json');
const entry = { index: 'src/index.ts' };
for (const name of names) entry[name] = `src/${name}.ts`;
entry['holiday-data'] = 'src/holidays.ts';
build({
  entry,
  format: ['cjs', 'esm'],
  splitting: true,
  minify: true,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  silent: true,
})
  .then(() =>
    execFileSync(
      process.execPath,
      ['node_modules/typescript/bin/tsc', '--emitDeclarationOnly', '--declaration'],
      { stdio: 'inherit' },
    ),
  )
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
