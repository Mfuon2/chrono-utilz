const fs = require('node:fs');
require('ts-node/register');
const Mocha = require('mocha');
const mocha = new Mocha({ reporter: process.env.CI ? 'dot' : 'spec', timeout: 10000 });
for (const name of fs.readdirSync('tests').filter((name) => name.endsWith('.test.ts')))
  mocha.addFile(`tests/${name}`);
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
