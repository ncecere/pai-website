const repoUrl = "https://github.com/ncecere/pi-agent-interface";
// The page describes the main branch of the repository (what is built at
// HEAD), so links into it point at main. The released version is `version`;
// its notes are the "## 0.1.0" section of CHANGELOG.md at the tag.
const main = `${repoUrl}/blob/main`;

export const site = {
  name: "Pi Agent Interface",
  // The short form, used only after the full name has been given.
  // scripts/postbuild.mjs fails the build if "PAI" appears before it.
  shortName: "PAI",
  url: "https://pai.bitop.dev",
  title: "Pi Agent Interface: your agents, and an inbox for the work they do",
  description:
    "Pi Agent Interface (PAI) is a self-hosted, open-source (MIT) chat app for Pi Durable agents. People sign in with your single sign-on, each gets their own agents on the platform, and one inbox follows the work they do.",
  // The tagline of the Open Graph card (pai-assets logo/face/og-card.svg).
  tagline: "Your agents, and an inbox for the work they do",
  docsUrl: "https://docs.pai.bitop.dev",
  repoUrl,
  // The latest release. The page describes main, which has moved on since
  // (CHANGELOG.md "Unreleased"); the project status card says so.
  version: "v0.1.0",
  // The release day of `version` (the footer and the sitemap show it): the v0.1.0 tag.
  releaseDate: "2026-10-18" as string | null,
  releaseNotesUrl: `${repoUrl}/blob/v0.1.0/CHANGELOG.md`,
  // The release being built now; named only in the project status card.
  nextVersion: "v0.2.0",
  // The container image the repository's image workflow publishes for each
  // release tag (vX.Y.Z and latest; multi-arch, cosign keyless signature).
  // v0.1.0 was tagged before that workflow existed, so the first published
  // image comes with the next release; until then, build it from the source.
  image: "ghcr.io/ncecere/pi-agent-interface",
  imageWorkflowUrl: `${main}/.github/workflows/image.yml`,
  changelogUrl: `${main}/CHANGELOG.md`,
  readmeUrl: `${main}/README.md`,
  noticeUrl: `${main}/NOTICE.md`,
  envExampleUrl: `${main}/.env.example`,
  licenseUrl: `${main}/LICENSE`,
  featuresUrl: `${main}/server/features.ts`,
  issuesUrl: `${repoUrl}/issues`,
  securityUrl: `${repoUrl}/security`,
  platformUrl: "https://github.com/ncecere/pi-durable-platform",
  ociUrl: "https://github.com/ncecere/open-chat-interface",
  websiteRepoUrl: "https://github.com/ncecere/pai-website",
  // The example installation used in every snippet on the page (and by the
  // Example Corp demo capture): the chat app and the platform it talks to.
  exampleHost: "chat.example.com",
  examplePlatformHost: "agents.example.com",
} as const;
