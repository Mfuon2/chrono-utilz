const assert = require('node:assert/strict');
const vm = require('node:vm');
const esbuild = require('esbuild');
const library = require('../dist/index.js');
for (const example of require('../docs/examples.json')) {
  library.resetBusinessDayConfig();
  library.configureTimezone({ autoDetect: true });
  const output = [];
  const js = esbuild.transformSync(example.code, {
    loader: 'ts',
    format: 'cjs',
    target: 'es2020',
  }).code;
  vm.runInNewContext(
    js,
    {
      require: (name) => {
        assert.equal(name, '@mfuon2/chrono-utilz');
        return library;
      },
      console: { log: (...values) => output.push(values.join(' ')) },
    },
    { timeout: 2000 },
  );
  assert.equal(output.join('\n'), example.output, example.id);
}
console.log(
  `Verified ${require('../docs/examples.json').length} executable documentation examples.`,
);
