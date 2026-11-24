const { spawnSync } = require('node:child_process');
for (const TZ of [
  'UTC',
  'Africa/Nairobi',
  'America/New_York',
  'Australia/Sydney',
  'Asia/Kathmandu',
]) {
  console.log(`\nTesting host timezone: ${TZ}`);
  const result = spawnSync(process.execPath, ['scripts/test.cjs'], {
    stdio: 'inherit',
    env: { ...process.env, TZ, CI: 'true' },
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
