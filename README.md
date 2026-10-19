# pai-website

The landing page for [Pi Agent Interface (PAI)](https://github.com/ncecere/pi-agent-interface), a self-hosted, open-source (MIT) chat app for [Pi Durable](https://github.com/ncecere/pi-durable-platform) agents: people sign in with single sign-on, connect their own platform account once so their agents live in their personal workspace beside their teams' agents, and one inbox follows the work they do. The site is served at https://pai.bitop.dev; the documentation lives in its own repository and site, https://docs.pai.bitop.dev.

It's one long page plus a 404 page, with no pricing, sign-up, forms, cookies, tracking or third-party requests. The text describes Pi Agent Interface **v0.5.0** (tag `v0.5.0`, commit `df32023`, released 2026-10-19) and is checked against its `README.md`, `ROADMAP.md`, `CHANGELOG.md` (`## 0.2.0`, `## 0.3.0`, `## 0.4.0`, `## 0.5.0`), `NOTICE.md`, `deploy/kubernetes/README.md`, `server/connect.ts`, `server/connect-agents.ts`, `server/features.ts`, the routes in `server/app.ts`, `server/config.ts`, `server/session.ts`, `server/agent-settings.ts`, the screens in `src/routes/**` and `src/components/connect/`, the `Dockerfile` and `.github/workflows/image.yml`. Nothing on the page describes a feature that isn't built in that release; the project status card lists what isn't built yet, without dates and as `ROADMAP.md` has it (needing the platform: files and images, steering a reply, approving tool calls, and editing or branching messages; and the platform's own paging for the conversation list and message search, which the app would use when they exist). Long conversation lists drawn a page at a time, Admin › Usage for connected people (optional, off by default) and search inside messages (optional, off by default; it keeps a searchable copy of the text of conversations opened in the app, deleted by turning the feature off) are built as of v0.5.0 and are in the Inbox and Optional features cards, linking to the docs pages `/docs/use/inbox`, `/docs/administer/features` and `/docs/administer/usage`. Access and the administrator role by identity-provider group, rotating the session secret, metrics, the rehearsed restore and the browser and accessibility tests are built as of v0.4.0 and are mentioned in the security card and the Deploy section, with links to the docs pages `/docs/operate/sign-in`, `/docs/operate/rotating-the-session-secret`, `/docs/operate/metrics`, `/docs/operate/upgrades-and-backups` and `/docs/use/accessibility`. Model and tokens under replies, message times, tool step durations and the length-limit note are described as shown when the platform records them.

**Connect** (people connect their own platform account once; their agents live in their personal workspace beside their teams' agents; the server keeps their tokens encrypted; service-account mode remains for platforms without Connect) is the headline: the first feature card, the "How it works" diagram with its Connect and Service account cards, and the Connect gallery in the screenshots.

`lib/site.ts` holds the version and its release day (the footer and sitemap show it), the release notes link (the GitHub Release page for the tag), the container image (`ghcr.io/ncecere/pi-agent-interface`, tag `v0.5.0`, the multi-arch index digest `sha256:0df3c305...668fa1` and the cosign keyless identity and issuer shown in the `cosign verify` command), the repository links (pinned at `blob/v0.5.0` or `tree/v0.5.0`: move the `tag` constant when a later release has been checked against the page), the docs URL and the example hosts (`chat.example.com` for the chat app, `agents.example.com` for the platform). The image is public (anonymous pull works) with linux/amd64 and linux/arm64 manifests; the v0.3.1 digest was read from the registry (`docker buildx imagetools inspect`) on 2026-10-18; the v0.5.0 digest is the one given for the release and has not been re-read from the registry from this repository. The `cosign verify` command has not been run from this repository (cosign isn't installed here); re-check it when the tag moves.

**Naming.** The page leads with "Pi Agent Interface" (title, hero, metadata) and uses "PAI" only as a short form after it. The text names no competing chat or agent products. Open Chat Interface (the sister product the web app is derived from) and Pi Durable (the platform it is for) are named on purpose. The inbox follows the design of another product's thread sidebar; that credit is in the product's `NOTICE.md`, not on this page. Examples use generic names (`chat.example.com`, Example Corp) and never a real installation. `scripts/postbuild.mjs` fails the build if a page uses a forbidden name, names a `bitop.dev` host other than this site and its docs, or uses "PAI" before "Pi Agent Interface".

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with `output: "export"`: `next build` writes plain static files to `out/`.
- React 19, TypeScript, [Tailwind CSS](https://tailwindcss.com) 4.
- Inter Variable, self-hosted from `@fontsource-variable/inter`.
- Node 22 and npm; every version is pinned in `package-lock.json` (the same versions as the Open MCP Portal website).
- nginx (alpine, pinned by digest) in the container.

## Brand tokens: `app/brand.css`

`app/brand.css` holds Pi Agent Interface's colours (dark by default, and light), radii, shadows and font stacks, and maps them to Tailwind v4 theme variables (`bg-brand-surface`, `text-brand-muted`, `bg-brand-primary`, `text-brand-link`, `bg-brand-highlight`, `rounded-card`, `shadow-brand-2` and so on). The values come from the app's own theme (`src/styles/tokens.css`, the neutral theme it inherits from Open Chat Interface), so the greys, radii and shadows equal Open Chat Interface's sites; buttons use the neutral accent, as the app does, and links and decorative marks use the logo's amber.

The **master copy** is `../pai-assets/brand/brand.css`. This file is a verbatim copy, and the docs site (pai-docs, `app/brand.css`) uses the same bytes. Never edit it here: change the master, copy it to both repositories, and check with

```sh
cmp app/brand.css ../pai-assets/brand/brand.css
cmp app/brand.css ../pai-docs/app/brand.css
```

Components and `app/globals.css` use only the Tailwind names (in CSS through `--theme(--color-brand-…)`), never the raw token variables, so a new `brand.css` drops in without other changes. The theme follows the system (`prefers-color-scheme`); `data-theme="dark|light"` or `class="dark|light"` can force one.

## Logo, favicon and Open Graph card

The logo is "Face": an amber face with two upright eyes on a near-black tile, the app's own Face avatar. Its source, exports and usage rules are in `../pai-assets/logo/` (`logo/face/`, `logo/README.md`). The tile is part of the mark, so it reads on light and dark pages; the bare face (`mark-bare.svg`) is for dark surfaces only and isn't used here.

- `components/logo.tsx` is the only place the site draws the logo (header and footer): the mark as inline SVG (`mark-small.svg`, 28 px, `aria-hidden`) beside the name as live text. pai-docs should draw it identically; change both together.
- `lib/mark.json` holds the mark as inner SVG markup on its 64 grid: `svg` is `mark-small.svg` (read by `components/logo.tsx`), `svgRegular` is `mark.svg` (read by `scripts/og-image.mjs`).
- `npm run og` (`scripts/og-image.mjs`) is the logo sync. It reads the logo folder (`LOGO_DIR`, else `../pai-assets/logo/<source>`, `source` in `lib/mark.json` being `face`), copies `favicon.ico` (16 px pixel drawing, 32 and 48), `favicon.svg`, `apple-touch-icon.png`, `icon-192.png` and `icon-512.png` unchanged into `public/`, and refreshes `lib/mark.json`. For `public/og.png` it copies the logo folder's own card (`png/og-card.png`: the mark, the name and the tagline "Your agents, and an inbox for the work they do") while the `chat-inbox` slot has no screenshot; once that slot is filled it draws a 1200x630 card with the mark, the name, the tagline and the screenshot in the brand's dark colours. Rerun it when the logo or that screenshot changes and commit the results.

## Screenshots

The page has 15 named screenshot slots (the hero and four galleries: chat and inbox, Connect, agents, administration), listed in `lib/slots.json` with their alt text, captions and, for the capture, the persona and what each should show. A slot without an image shows a clearly marked placeholder with the expected file name. **No screenshots exist yet**: every slot is a placeholder until the Example Corp demo capture.

`SCREENSHOTS.md` is the capture list, generated from `lib/slots.json` by `npm run manifest` (CI fails if it is out of date). It names the demo installation (Example Corp at `chat.example.com`; Priya Shah, member, and Alex Morgan, administrator; the provided agents Assistant and Research and Priya's own Release notes), the sizes, and per slot the file, persona and contents.

```sh
npm run images     # copy the screenshots that exist into public/images as WebP, record their sizes
npm run og         # rebuild the Open Graph card (drawn from chat-inbox once it exists) and icons
npm run manifest   # rewrite SCREENSHOTS.md (status column: placeholder, interim or filled)
```

Commit the results (`public/images/`, `lib/screenshots.json`, `public/og.png`, icons, `lib/mark.json`, `SCREENSHOTS.md`). Screenshots are read from `../pai-assets/screenshots/`; set `SCREENSHOTS_DIR` to read from another directory. For each slot the script looks for `file` (or the slot's own name) as `.png`, `.webp` or `.jpg` and, if that's missing, the slot's `interimFile`, recording `"interim": true` in `lib/screenshots.json`. After a capture, check each slot's alt text and caption against its image (they were written before any capture existed).

| Slot | Shows |
|---|---|
| `chat-inbox` | The hero: the inbox beside a conversation with reasoning and tool steps (also used by `public/og.png`) |
| `tool-steps` | A reply with its tool steps opened: `$ command`, inputs, JSON output, Copy, one failed step |
| `inbox-rows` | Inbox rows with Working (timer), Done, Failed, Woke, a pin, and the hover actions |
| `inbox-snooze` | A row's Snooze menu with wake times and Custom…; the Snoozed, Settled and Archived shelves |
| `phone-inbox` | The inbox on a phone (390x844 at 2x), row actions shown |
| `connect` | The "Connect your agents" screen after signing in, before the person has connected (needs a Connect-mode deployment) |
| `account-connection` | Settings › Account, Agent platform: the connected account and Disconnect (Connect mode, after connecting) |
| `agent-picker` | The agent picker: provided agents above the person's own, with avatars |
| `my-agents` | Settings › My agents, with the dialog to make an agent |
| `avatar-styles` | Settings › Customization with the avatar styles Face, Signal and Pixel |
| `admin-agents` | Admin › Agents: default model, limits, model choice, templates, provided agents |
| `admin-people` | Admin › People |
| `admin-features` | Admin › Features: Usage and Personal usage (service-account mode: Connect locks Usage off) |
| `admin-usage` | Admin › Usage per person, last 30 days (service-account mode only) |
| `admin-audit` | Admin › Audit log |

## Local development

```sh
npm ci
npm run dev      # http://localhost:3000
```

## Build

```sh
npm run typecheck
npm run build    # static export to out/, then scripts/postbuild.mjs
```

`scripts/postbuild.mjs` hashes the inline scripts Next.js writes into the HTML and puts them in the Content-Security-Policy (`build/security-headers.conf`), so `script-src` needs no `'unsafe-inline'`. It fails the build if the output loads a script, style sheet, font, image or frame from another origin, if the page text uses a forbidden name or another `bitop.dev` host, or if "PAI" appears before "Pi Agent Interface".

To run the production image locally, read-only like in a cluster:

```sh
npm run docker   # builds the image and serves it on http://127.0.0.1:8080
```

## Container image and deployment

`.github/workflows/publish.yaml` builds the site on every pull request and push. On `main` it also builds and pushes a multi-arch (linux/amd64, linux/arm64) image, with every action pinned by commit SHA:

- `ghcr.io/ncecere/pai-website:<full commit SHA>`
- `ghcr.io/ncecere/pai-website:latest`

The image is nginx serving `out/`:

- runs as user 101, listens on port **8080**, and answers `GET /healthz` with `ok`;
- works with a read-only root filesystem: the pid file and temp paths are under `/tmp`, so mount an `emptyDir` (or tmpfs) there;
- sends security headers (CSP, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP);
- caches hashed assets under `/_next/static/` for a year (`immutable`), other assets for an hour, and revalidates pages on every request.

Deployment lives outside this repository. New GHCR packages start private; make the package public, or pull it with a registry credential.

Dependabot opens one grouped pull request a week each for npm, GitHub Actions and the Docker base images.

## Licence

- **Code:** MIT, see [`LICENSE`](LICENSE).
- **Website text:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), see [`LICENSE-CONTENT`](LICENSE-CONTENT).
- The logo is Pi Agent Interface's, from `pai-assets`. Inter is under the SIL Open Font License 1.1.
