const repoUrl = "https://github.com/ncecere/pi-agent-interface";
// The page describes the released version, so links into the repository are
// pinned at its tag (blob/ for files, tree/ for folders). Move the tag when a
// new release is checked against the page.
const tag = "v0.2.0";
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
  // sitemap show it): the v0.2.0 tag.
  version: tag,
  releaseDate: "2026-10-18" as string | null,
  releaseNotesUrl: `${repoUrl}/releases/tag/${tag}`,
  // The container image the repository's image workflow publishes for each
  // release tag: multi-arch (linux/amd64, linux/arm64), public, signed with
  // cosign keyless. The digest is the v0.2.0 multi-arch index (the
  // registry's Docker-Content-Digest for the tag, checked 2026-10-18).
  image: "ghcr.io/ncecere/pi-agent-interface",
  imageTag: tag,
  imageDigest: "sha256:b3d6103ff6a4b0149c301d78aa7a8995c6424b505b5e9a9245d2ccf5e15fb41c",
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
  securityUrl: `${repoUrl}/security`,
  platformUrl: "https://github.com/ncecere/pi-durable-platform",
  ociUrl: "https://github.com/ncecere/open-chat-interface",
  websiteRepoUrl: "https://github.com/ncecere/pai-website",
  // The example installation used in every snippet on the page (and by the
  // Example Corp demo capture): the chat app and the platform it talks to.
  exampleHost: "chat.example.com",
  examplePlatformHost: "agents.example.com",
} as const;
