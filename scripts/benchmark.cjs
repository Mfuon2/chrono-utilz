const fs = require('node:fs'),
  { gzipSync } = require('node:zlib'),
  { build } = require('esbuild');
const cases = {
  leapYear: {
    chrono:
      "import {isLeapYear} from '@mfuon2/chrono-utilz';console.log(isLeapYear(new Date(globalThis.input)))",
    dateFns:
      "import {isLeapYear} from 'date-fns';console.log(isLeapYear(new Date(globalThis.input)))",
    dayjs:
      "import d from 'dayjs';import p from 'dayjs/plugin/isLeapYear';d.extend(p);console.log(d(globalThis.input).isLeapYear())",
    luxon:
      "import {DateTime} from 'luxon';console.log(DateTime.fromJSDate(new Date(globalThis.input)).isInLeapYear)",
    moment: "import m from 'moment';console.log(m(globalThis.input).isLeapYear())",
  },
  arithmetic: {
    chrono:
      "import {addTime,formatDate} from '@mfuon2/chrono-utilz';console.log(formatDate(addTime(new Date(),1,'day')))",
    dateFns:
      "import {addDays,format} from 'date-fns';console.log(format(addDays(new Date(),1),'yyyy-MM-dd'))",
    dayjs: "import d from 'dayjs';console.log(d().add(1,'day').format('YYYY-MM-DD'))",
    luxon:
      "import {DateTime} from 'luxon';console.log(DateTime.now().plus({days:1}).toFormat('yyyy-MM-dd'))",
    moment: "import m from 'moment';console.log(m().add(1,'day').format('YYYY-MM-DD'))",
  },
};
(async () => {
  const report = {
    tool: `esbuild ${require('esbuild/package.json').version}`,
    versions: {
      chrono: require('../package.json').version,
      dateFns: require('date-fns/package.json').version,
      dayjs: require('dayjs/package.json').version,
      luxon: require('luxon/package.json').version,
      moment: require('moment/package.json').version,
    },
    note: 'Minified browser ESM, ES2020, gzip bytes. Representative equivalent tasks; accepted inputs and edge semantics differ. Not a full-feature equivalence claim.',
    scenarios: {},
  };
  for (const [scenario, variants] of Object.entries(cases)) {
    const sizes = {};
    for (const [name, code] of Object.entries(variants)) {
      const r = await build({
        stdin: { contents: code, resolveDir: process.cwd() },
        bundle: true,
        write: false,
        minify: true,
        platform: 'browser',
        format: 'esm',
        target: 'es2020',
        logLevel: 'silent',
      });
      sizes[name] = gzipSync(r.outputFiles[0].contents).length;
    }
    report.scenarios[scenario] = sizes;
  }
  fs.writeFileSync('docs/benchmarks.json', JSON.stringify(report, null, 2) + '\n');
  console.table(report.scenarios);
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
