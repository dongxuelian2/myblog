import { chmodSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const hookPath = resolve(repoRoot, ".githooks");
const preCommitHook = resolve(hookPath, "pre-commit");

if (!existsSync(resolve(repoRoot, ".git"))) {
  process.exit(0);
}

chmodSync(preCommitHook, 0o755);
try {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], {
    cwd: repoRoot,
    stdio: "inherit",
  });
} catch {
  console.warn("Warning: unable to update git hooksPath automatically. Run `npm run setup:hooks` in a writable repo.");
}
