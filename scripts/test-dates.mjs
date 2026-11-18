import { spawnSync } from "node:child_process";

for (const timezone of ["UTC", "Europe/Madrid", "America/Los_Angeles"]) {
  console.log(`\nDate contract in ${timezone}\n`);
  const result = spawnSync(
    process.execPath,
    ["node_modules/vitest/vitest.mjs", "run", "src/lib/dates.test.ts"],
    {
      stdio: "inherit",
      env: { ...process.env, TZ: timezone },
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
