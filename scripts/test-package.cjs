const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = process.cwd(),
  temp = fs.mkdtempSync(path.join(os.tmpdir(), 'chrono-package-'));
try {
  const [packed] = JSON.parse(
    execFileSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', temp], {
      encoding: 'utf8',
    }),
  );
  for (const file of packed.files)
    assert(!/^(src|tests|scripts|report|node_modules)\//.test(file.path), file.path);
  fs.writeFileSync(path.join(temp, 'package.json'), '{"private":true}');
  execFileSync(
    'npm',
    ['install', '--ignore-scripts', '--no-audit', '--no-fund', path.join(temp, packed.filename)],
    { cwd: temp, stdio: 'pipe' },
  );
  const pkg = require('./../package.json');
  const consumer = `const assert=require('node:assert/strict');const c=require('@mfuon2/chrono-utilz');
      assert.equal(c.parseDate('2025-01-01T12:00:00Z').toISOString(),'2025-01-01T12:00:00.000Z');
      for(const name of ${JSON.stringify(require('./entries.json'))}) {assert.equal(typeof require('@mfuon2/chrono-utilz/'+name)[name],'function');}
      c.configureHolidays(['2025-01-01']);assert(!require('@mfuon2/chrono-utilz/isBusinessDay').isBusinessDay('2025-01-01'));`;
  execFileSync(process.execPath, ['-e', consumer], { cwd: temp, stdio: 'inherit' });
  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import assert from 'node:assert/strict';import c,{parseDate} from '@mfuon2/chrono-utilz';assert.equal(parseDate,c.parseDate);for(const name of ${JSON.stringify(require('./entries.json'))}) {assert.equal(typeof (await import('@mfuon2/chrono-utilz/'+name))[name],'function');}`,
    ],
    { cwd: temp, stdio: 'inherit' },
  );
  fs.writeFileSync(
    path.join(temp, 'consumer.mts'),
    `import {addTime, CalendarDate, type DateFormat} from '@mfuon2/chrono-utilz';\nimport {parseDate} from '@mfuon2/chrono-utilz/parseDate';\nconst format:DateFormat='YYYY-MM-DD';console.log(addTime(new Date(),1,'day'),new CalendarDate(2025,1,1),parseDate(format));\n// @ts-expect-error unsupported unit\naddTime(new Date(),1,'century');\n`,
  );
  execFileSync(
    process.execPath,
    [
      path.join(root, 'node_modules/typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target',
      'es2020',
      '--module',
      'nodenext',
      '--moduleResolution',
      'nodenext',
      path.join(temp, 'consumer.mts'),
    ],
    { cwd: temp, stdio: 'inherit' },
  );
  console.log(
    `Verified ${pkg.version} tarball: ${packed.size} bytes; CJS, ESM, ${require('./entries.json').length} subpaths and TypeScript consumers.`,
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
