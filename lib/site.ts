const repoUrl = "https://github.com/ncecere/pi-agent-interface";
// The page describes the released version, so links into the repository are
// pinned at its tag (blob/ for files, tree/ for folders). Move the tag when a
// new release is checked against the page.
const tag = "v0.5.1";
const pinned = `${repoUrl}/blob/${tag}`;

export const site = {
  name: "Pi Agent Interface",
  // The short form, used only after the full name has been given.
  // scripts/postbuild.mjs fails the build if "PAI" appears before it.
  shortName: "PAI",
  url: "https://pai.bitop.dev",
  title: "Pi Agent Interface: your agents, and an inbox for the work they do",
  description:
    "Pi Agent Interface (PAI) is a self-hosted, open-source (MIT) chat app for Pi Durable agents. People sign in with your single sign-on and connect their own agent platform account once; their agents live in their personal workspace beside their teams' agents, and one inbox follows the work they do.",
  // The tagline of the Open Graph card (pai-assets logo/face/og-card.svg).
  tagline: "Your agents, and an inbox for the work they do",
  docsUrl: "https://docs.pai.bitop.dev",
  repoUrl,
  // The latest release, and the release day of `version` (the footer and the
  // sitemap show it): the v0.5.1 tag (commit b28fdc5).
  version: tag,
  releaseDate: "2026-10-19" as string | null,
  releaseNotesUrl: `${repoUrl}/releases/tag/${tag}`,
  // The container image the repository's image workflow publishes for each
  // release tag: multi-arch (linux/amd64, linux/arm64), public, signed with
  // cosign keyless. The digest is the v0.5.1 multi-arch index (the
  // digest of the v0.5.1 release; linux/amd64 and linux/arm64). The
  // previous release, v0.5.0, was sha256:0df3c305...668fa1.
  image: "ghcr.io/ncecere/pi-agent-interface",
  imageTag: tag,
  imageDigest: "sha256:cb1720a0cdb6a9231bc7cdd99fe43c1ed031e257f4d6ec9367d388e96c35fd51",
  // The signing identity: the image workflow at the release tag, and GitHub's OIDC issuer.
  cosignIdentity: `${repoUrl}/.github/workflows/image.yml@refs/tags/${tag}`,
  cosignIssuer: "https://token.actions.githubusercontent.com",
  imageWorkflowUrl: `${pinned}/.github/workflows/image.yml`,
  kubernetesUrl: `${repoUrl}/tree/${tag}/deploy/kubernetes`,
  changelogUrl: `${pinned}/CHANGELOG.md`,
  readmeUrl: `${pinned}/README.md`,
  noticeUrl: `${pinned}/NOTICE.md`,
  envExampleUrl: `${pinned}/.env.example`,
  licenseUrl: `${pinned}/LICENSE`,
  featuresUrl: `${pinned}/server/features.ts`,
  issuesUrl: `${repoUrl}/issues`,
  // The plan changes between releases, so this points at main, not at the tag.
  roadmapUrl: `${repoUrl}/blob/main/ROADMAP.md`,
  securityUrl: `${repoUrl}/security`,
  platformUrl: "https://github.com/ncecere/pi-durable-platform",
  ociUrl: "https://github.com/ncecere/open-chat-interface",
  websiteRepoUrl: "https://github.com/ncecere/pai-website",
  // The example installation used in every snippet on the page (and by the
  // Example Corp demo capture): the chat app and the platform it talks to.
  exampleHost: "chat.example.com",
  examplePlatformHost: "agents.example.com",
} as const;
