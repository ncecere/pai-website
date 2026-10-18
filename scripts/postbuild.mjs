// Runs after `next build`:
//  1. Hashes every inline <script> in out/**/*.html (Next.js inlines its page
//     payload) and writes build/security-headers.conf with those hashes in the
//     Content-Security-Policy, so script-src needs no 'unsafe-inline'.
//  2. Fails if the output references another origin for scripts, styles,
//     fonts, images or frames (the site must load nothing from third parties
//     at runtime).
//  3. Fails if the page text uses a name it must not (a named competing chat
//     or agent product, or a bitop.dev host other than this site and its
//     docs), or uses the short form "PAI" before the full name
//     "Pi Agent Interface".
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const ownHost = "pai.bitop.dev";
// bitop.dev hosts the page may name: this site and its docs. Examples use
// chat.example.com and agents.example.com, never a real installation.
const allowedBitopHosts = new Set(["pai.bitop.dev", "docs.pai.bitop.dev"]);
// No competing chat or agent products. Open Chat Interface (the sister product
// the UI comes from) and Pi Durable (the platform it is for) are named on
// purpose. t3code, whose thread sidebar the inbox follows (NOTICE.md), is
// credited in the repository, not on this page.
const forbidden = [
  /chat\s*gpt/i,
  /open\s*ai\b/i,
  /\bclaude\b/i,
  /\bgemini\b/i,
  /\bcopilot\b/i,
  /open\s*webui/i,
  /librechat/i,
  /lobe\s*chat/i,
  /anything\s*llm/i,
  /\bchatbox\b/i,
  /typing\s*mind/i,
  /\bt3\s*(code|chat)\b/i,
  // Not the CSS property (class names such as cursor-zoom-in).
  /\bcursor\b(?![-:])/i,
  /\bdevin\b/i,
  /\bmanus\b/i,
];
const fullName = "Pi Agent Interface";
const shortName = /\bPAI\b/;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const files = walk(out);
const hashes = new Set();
const problems = [];

for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    if (m[1].length === 0) continue;
    hashes.add(`'sha256-${createHash("sha256").update(m[1], "utf8").digest("base64")}'`);
  }
  for (const m of html.matchAll(/<(script|link|img|iframe|source|video|audio)\b[^>]*\b(?:src|href|srcset)="(https?:)?\/\/([^"/]+)[^"]*"[^>]*>/g)) {
    const tag = m[0];
    const isCanonicalOrAlternate = m[1] === "link" && /rel="(canonical|alternate)"/.test(tag);
    if (!isCanonicalOrAlternate && m[3] !== ownHost) {
      problems.push(`${relative(root, file)}: third-party resource ${tag.slice(0, 120)}`);
    }
  }
  // Visible text and attributes only: drop scripts (the RSC payload repeats the text) and tags' JS.
  const text = html.replace(/<script[\s\S]*?<\/script>/g, " ");
  for (const re of forbidden) {
    const hit = text.match(re);
    if (hit) problems.push(`${relative(root, file)}: forbidden name "${hit[0]}"`);
  }
  for (const m of text.matchAll(/\b[a-z0-9.-]*\bbitop\.dev\b/gi)) {
    if (!allowedBitopHosts.has(m[0].toLowerCase())) problems.push(`${relative(root, file)}: names the host "${m[0]}"`);
  }
  // The short form only after the full name, in document order (head included).
  const shortAt = text.search(shortName);
  const fullAt = text.indexOf(fullName);
  if (shortAt !== -1 && (fullAt === -1 || shortAt < fullAt)) {
    problems.push(`${relative(root, file)}: "PAI" appears before "${fullName}"`);
  }
}
for (const file of files.filter((f) => f.endsWith(".css"))) {
  const css = readFileSync(file, "utf8");
  for (const m of css.matchAll(/url\(\s*["']?(https?:)?\/\/[^)]*\)|@import\s+["']?(https?:)?\/\//g)) {
    problems.push(`${relative(root, file)}: third-party url ${m[0].slice(0, 120)}`);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const template = readFileSync(join(root, "nginx", "security-headers.conf"), "utf8");
const conf = template.replace("__CSP_SCRIPT_HASHES__", [...hashes].sort().join(" "));
mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(join(root, "build", "security-headers.conf"), conf);
console.log(
  `postbuild: ${hashes.size} inline script hashes in build/security-headers.conf; no third-party resources; no forbidden names or hosts; "${fullName}" before "PAI"`,
);
