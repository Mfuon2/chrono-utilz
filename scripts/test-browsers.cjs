const fs = require('node:fs'),
  { build } = require('esbuild'),
  { chromium, firefox, webkit } = require('@playwright/test');
(async () => {
  const tests = fs
    .readdirSync('tests')
    .filter((n) => n.endsWith('.test.ts'))
    .map((n) => `import './tests/${n}';`)
    .join('\n');
  const bundle = await build({
    stdin: { contents: tests, resolveDir: process.cwd() },
    bundle: true,
    write: false,
    platform: 'browser',
    format: 'iife',
    target: 'es2020',
    alias: { assert: 'assert/' },
    define: { global: 'globalThis' },
    logLevel: 'silent',
    ignoreAnnotations: true,
  });
  for (const [name, engine] of Object.entries({ chromium, firefox, webkit }).filter(
    ([name]) => !process.env.BROWSERS || process.env.BROWSERS.split(',').includes(name),
  )) {
    const browser = await engine.launch();
    try {
      const page = await browser.newPage({ timezoneId: 'Africa/Nairobi' });
      const loadErrors = [];
      page.on('pageerror', (error) => loadErrors.push(error.message));
      await page.setContent('<div id="mocha"></div>');
      await page.addScriptTag({ content: fs.readFileSync('node_modules/mocha/mocha.js', 'utf8') });
      await page.evaluate(() => {
        globalThis.process = {
          env: {},
          version: 'v22.0.0',
          platform: 'browser',
          nextTick: queueMicrotask,
        };
        mocha.setup({ ui: 'bdd', reporter: 'json', timeout: 10000 });
      });
      await page.addScriptTag({ content: bundle.outputFiles[0].text });
      if (loadErrors.length) throw Error(loadErrors.join('\n'));
      const result = await page.evaluate(
        () =>
          new Promise((resolve) => {
            const errors = [];
            const runner = mocha.run((failures) =>
              resolve({ failures, tests: runner.stats.tests, errors }),
            );
            runner.on('fail', (test, error) =>
              errors.push({ test: test.fullTitle(), message: error.message }),
            );
          }),
      );
      console.log(name, JSON.stringify(result));
      if (result.tests < 200) throw Error('Browser test discovery failed');
      if (result.failures) throw Error(`${name}: browser contracts failed`);
    } finally {
      await browser.close();
    }
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
