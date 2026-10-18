// Syncs the logo and builds the brand images:
//   public/favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png,
//   icon-512.png              copied unchanged from the logo folder in
//                             pai-assets (logo/face/)
//   lib/mark.json             `svg` and `svgRegular` refreshed from the logo
//                             folder's mark-small.svg and mark.svg (the header
//                             and footer draw `svg`; the card below `svgRegular`)
//   public/og.png             the Open Graph card (1200x630). While the
//                             `chat-inbox` slot has no screenshot it is the
//                             logo folder's own card (png/og-card.png: the
//                             mark, the name and the tagline), byte for byte.
//                             Once that slot is filled it is drawn here: the
//                             mark and name, the tagline as the headline, and
//                             the screenshot, in app/brand.css's dark colours.
//
// The logo folder is LOGO_DIR, or ../pai-assets/logo/<source> (`source` in
// lib/mark.json, "face"). Run locally (`npm run og`) after `npm run images` or
// a logo change, and commit the results; CI never reads pai-assets.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const markPath = join(root, "lib", "mark.json");
const mark = JSON.parse(readFileSync(markPath, "utf8"));

// Colours come from the shared brand file: the first (default, dark) value of
// each token, so the card follows brand.css without copying it.
const brand = readFileSync(join(root, "app", "brand.css"), "utf8");
function token(name, fallback) {
  const m = brand.match(new RegExp(`--[a-z]+-${name}:\\s*(#[0-9a-fA-F]{3,8})\\b`));
  return m ? m[1] : fallback;
}
const bg = token("bg", "#0f0f0f");
const text = token("text", "#fafafa");
const muted = token("text-muted", "#bebebe");
const glow = token("highlight", "#fe9a00");

const font = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const name = "Pi Agent Interface";
const tagline = "Your agents, and an inbox for the work they do";

// ---------------------------------------------------------------- the logo
const logoDir = resolve(process.env.LOGO_DIR ?? join(root, "..", "pai-assets", "logo", mark.source ?? "face"));
const icons = [
  ["favicon.ico", "favicon.ico"],
  ["favicon.svg", "favicon.svg"],
  ["png/apple-touch-icon.png", "apple-touch-icon.png"],
  ["png/icon-192.png", "icon-192.png"],
  ["png/icon-512.png", "icon-512.png"],
];
const required = ["mark.svg", "mark-small.svg", "png/og-card.png", ...icons.map(([from]) => from)];
const missing = required.filter((f) => !existsSync(join(logoDir, f)));
if (missing.length > 0) {
  console.error(`${logoDir} lacks ${missing.join(", ")}. Set LOGO_DIR to the logo folder (pai-assets logo/face).`);
  process.exit(1);
}

/** The inner markup and viewBox of a standalone SVG file. */
function inner(file) {
  const svg = readFileSync(file, "utf8");
  const open = svg.match(/<svg\b[^>]*>/);
  if (!open) throw new Error(`no <svg> in ${file}`);
  const viewBox = open[0].match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 64 64";
  const body = svg
    .slice(open.index + open[0].length, svg.lastIndexOf("</svg>"))
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/>\s+</g, "><")
    .trim();
  return { viewBox, body };
}

for (const [from, to] of icons) copyFileSync(join(logoDir, from), join(pub, to));
const small = inner(join(logoDir, "mark-small.svg"));
const regular = inner(join(logoDir, "mark.svg"));
if (small.viewBox !== regular.viewBox) throw new Error("mark.svg and mark-small.svg have different viewBoxes");
const next = {
  _comment:
    "The Pi Agent Interface mark, \"Face\" (inner SVG markup on the 64 grid), written by `npm run og` from ../pai-assets/logo/<source>/: `svg` is mark-small.svg, the drawing for 20 to 47 px, used by components/logo.tsx (28 px, header and footer); `svgRegular` is mark.svg, the drawing for 48 px and up, used by scripts/og-image.mjs for the Open Graph card. If the logo changes, run `npm run og` again and commit.",
  source: mark.source ?? "face",
  viewBox: small.viewBox,
  svg: small.body,
  svgRegular: regular.body,
};
writeFileSync(markPath, JSON.stringify(next, null, 2) + "\n");

// ------------------------------------------------------- Open Graph card
const W = 1200;
const H = 630;
const shot = join(pub, "images", "chat-inbox.webp");
const hasShot = existsSync(shot);

if (!hasShot) {
  copyFileSync(join(logoDir, "png", "og-card.png"), join(pub, "og.png"));
} else {
  const headline = ["Your agents, and", "an inbox for the", "work they do."];
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.15" cy="0" r="1">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.16"/>
      <stop offset="0.6" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <svg x="80" y="86" width="56" height="56" viewBox="${next.viewBox}">${next.svgRegular}</svg>
  <text x="152" y="128" font-family="${font}" font-size="40" font-weight="600" fill="${text}" letter-spacing="-0.5">${name}</text>
  <text font-family="${font}" font-weight="600" fill="${text}" font-size="50" letter-spacing="-1.5">
    ${headline.map((line, i) => `<tspan x="80" y="${280 + i * 62}">${line}</tspan>`).join("")}
  </text>
  <text x="80" y="${H - 70}" font-family="${font}" font-size="26" fill="${muted}">Open source (MIT) · Self-hosted · For Pi Durable agents</text>
</svg>`;

  const shotWidth = 520;
  const { data, info } = await sharp(shot).resize({ width: shotWidth }).png().toBuffer({ resolveWithObject: true });
  const height = Math.min(info.height, H - 160);
  const cropped = await sharp(data).extract({ left: 0, top: 0, width: info.width, height }).toBuffer();
  const mask = Buffer.from(
    `<svg width="${info.width}" height="${height}"><rect width="${info.width}" height="${height}" rx="16" fill="#fff"/></svg>`,
  );
  const rounded = await sharp(cropped).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: rounded, left: W - shotWidth - 60, top: 60 }])
    .png({ compressionLevel: 9, palette: false })
    .toFile(join(pub, "og.png"));
}

console.log(
  `copied ${icons.map(([, to]) => to).join(", ")} and the mark from ${logoDir}; ${
    hasShot ? "drew public/og.png with the chat-inbox screenshot" : `copied its Open Graph card (${tagline}) to public/og.png`
  }`,
);
