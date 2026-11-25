const fs = require('node:fs');
const { gzipSync, brotliCompressSync } = require('node:zlib');
const { build } = require('esbuild');
const scenarios = {
  leapYear: {
    code: "import {isLeapYear} from '@mfuon2/chrono-utilz';console.log(isLeapYear(Number(globalThis.year)))",
    budget: 1300,
  },
  arithmetic: {
    code: "import {addTime,formatDate} from '@mfuon2/chrono-utilz';console.log(formatDate(addTime(new Date(),1,'day')))",
    budget: 2450,
  },
  timezone: {
    code: "import {formatDate} from '@mfuon2/chrono-utilz';console.log(formatDate(new Date(),'YYYY-MM-DD HH:mm:ss','Africa/Nairobi'))",
    budget: 1850,
  },
  business: {
    code: "import {addBusinessDays} from '@mfuon2/chrono-utilz';console.log(addBusinessDays(new Date(),3))",
    budget: 2800,
  },
  complete: { code: "import * as c from '@mfuon2/chrono-utilz';console.log(c)", budget: 21000 },
};
(async () => {
  const report = {
    version: require('../package.json').version,
    tool: `esbuild ${require('esbuild/package.json').version}`,
    metrics: {},
  };
  for (const [name, { code, budget }] of Object.entries(scenarios)) {
    const result = await build({
      stdin: { contents: code, resolveDir: process.cwd() },
      bundle: true,
      write: false,
      minify: true,
      platform: 'browser',
      format: 'esm',
      target: 'es2020',
      metafile: true,
      logLevel: 'silent',
    });
    const bytes = result.outputFiles[0].contents,
      gzip = gzipSync(bytes).length,
      brotli = brotliCompressSync(bytes).length;
    report.metrics[name] = { minified: bytes.length, gzip, brotli, budget };
    if (
      name !== 'complete' &&
      /Andorra|Commemoration Day|aa-ER|Pacific\/Fiji/.test(Buffer.from(bytes).toString())
    )
      throw Error(`${name} imports an unused catalog`);
    if (gzip > budget) throw Error(`${name}: ${gzip} gzip bytes exceeds ${budget}`);
  }
  fs.writeFileSync('docs/bundle-sizes.json', JSON.stringify(report, null, 2) + '\n');
  console.table(report.metrics);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
