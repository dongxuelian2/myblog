import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const localDir = resolve(repoRoot, "public/images-local");
const outputDir = resolve(repoRoot, "public/images/auto");
const LOCAL_URL_PREFIX = "/images-local/";
const OUTPUT_URL_PREFIX = "/images/auto/";
const TEXT_FILE_PATTERN = /\.(md|mdc|vue|json|ya?ml|ts|js|tsx|jsx)$/i;
const RASTER_FORMATS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const COPY_ONLY_FORMATS = new Set([".svg", ".gif"]);

function getStagedFiles() {
  const output = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  return output
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
}

function replaceImageLinks(content) {
  const replacements = [];
  const nextContent = content.replace(/\/images-local\/[^\s)"']+/g, (url) => {
    const sourceRelativePath = url.slice(LOCAL_URL_PREFIX.length);
    const outputRelativePath = toOutputRelativePath(sourceRelativePath);

    replacements.push({
      inputUrl: url,
      outputUrl: `${OUTPUT_URL_PREFIX}${outputRelativePath}`,
      sourceRelativePath,
      outputRelativePath,
    });

    return `${OUTPUT_URL_PREFIX}${outputRelativePath}`;
  });

  return { nextContent, replacements };
}

function toOutputRelativePath(sourceRelativePath) {
  const sourceExt = extname(sourceRelativePath).toLowerCase();
  if (RASTER_FORMATS.has(sourceExt)) {
    return sourceRelativePath.replace(/\.[^.]+$/, ".webp");
  }

  return sourceRelativePath;
}

async function materializeImage(sourceRelativePath, outputRelativePath) {
  const sourcePath = resolve(localDir, sourceRelativePath);
  const outputPath = resolve(outputDir, outputRelativePath);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing local image: ${relative(repoRoot, sourcePath)}`);
  }

  mkdirSync(dirname(outputPath), { recursive: true });

  const sourceExt = extname(sourceRelativePath).toLowerCase();
  if (COPY_ONLY_FORMATS.has(sourceExt)) {
    copyFileSync(sourcePath, outputPath);
    return outputPath;
  }

  if (!RASTER_FORMATS.has(sourceExt)) {
    throw new Error(`Unsupported image format: ${sourceRelativePath}`);
  }

  const { default: sharp } = await import("sharp");

  await sharp(sourcePath)
    .rotate()
    .webp({
      quality: 82,
      effort: 5,
    })
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  const stagedFiles = getStagedFiles();
  const textFiles = stagedFiles.filter(
    (file) => TEXT_FILE_PATTERN.test(file) && file.startsWith("content/"),
  );

  if (textFiles.length === 0) {
    return;
  }

  const rewrittenFiles = [];
  const materializedImages = new Map();

  for (const stagedFile of textFiles) {
    const absolutePath = resolve(repoRoot, stagedFile);
    const originalContent = readFileSync(absolutePath, "utf8");
    const { nextContent, replacements } = replaceImageLinks(originalContent);

    if (replacements.length === 0) {
      continue;
    }

    writeFileSync(absolutePath, nextContent);
    rewrittenFiles.push(stagedFile);

    for (const replacement of replacements) {
      materializedImages.set(replacement.sourceRelativePath, replacement.outputRelativePath);
    }
  }

  for (const [sourceRelativePath, outputRelativePath] of materializedImages) {
    await materializeImage(sourceRelativePath, outputRelativePath);
  }

  if (rewrittenFiles.length === 0) {
    return;
  }

  execFileSync(
    "git",
    ["add", "--", ...rewrittenFiles, ...Array.from(materializedImages.values(), (file) => join("public/images/auto", file))],
    {
      cwd: repoRoot,
      stdio: "inherit",
    },
  );

  for (const sourceRelativePath of materializedImages.keys()) {
    rmSync(resolve(localDir, sourceRelativePath), { force: true });
  }

  console.log(
    `Synced ${materializedImages.size} image(s) from ${relative(repoRoot, localDir)} to ${relative(repoRoot, outputDir)} and removed the local originals.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
