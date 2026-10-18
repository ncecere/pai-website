import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Box,
  Github,
  Inbox,
  Layers,
  MessageSquare,
  Plug,
  Shield,
  Toggle,
  Users,
} from "@/components/icons";
import { Screenshot, type SlotName } from "@/components/Screenshot";
import { ButtonLink, CheckList, CodeBlock, Eyebrow, Note, SectionHeading, Strong, TextLink } from "@/components/ui";
import { site } from "@/lib/site";

/*
 * Every claim here is checked against Pi Agent Interface at the head of main
 * (github.com/ncecere/pi-agent-interface, commit 3ae3d9e, 2026-10-18):
 * README.md, CHANGELOG.md ("Unreleased" and "0.1.0"), NOTICE.md,
 * server/features.ts, the routes in server/app.ts, server/config.ts,
 * server/session.ts, server/main.ts, server/agent-settings.ts, the screens in
 * src/routes/**, the Dockerfile and .github/workflows/image.yml.
 * Keep it that way: nothing on this page may describe a feature that isn't
 * built at HEAD. The release being built now (OAuth Connect and personal
 * workspaces) is named as next, in the project status card only.
 */

const appUrl = `https://${site.exampleHost}`;

export default function Home() {
  return (
    <>
      <Hero />
      <WhatItIs />
      <HowItWorks />
      <Features />
      <Screenshots />
      <Deploy />
      <OpenSource />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-glow relative overflow-hidden border-b border-brand-border">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:py-24">
        <div className="min-w-0">
          <a
            href={site.releaseNotesUrl}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-border-emphasis bg-brand-surface px-3 py-1 text-xs font-medium text-brand-muted hover:text-brand-text"
          >
            <span className="rounded-full bg-brand-primary-subtle px-2 py-0.5 text-brand-primary-subtle-text">{site.version}</span>
            <span>Open source, MIT licensed</span>
            <ArrowRight className="size-3.5 shrink-0" />
          </a>
          <p className="mt-6 text-base font-semibold text-brand-text">{site.name}</p>
          <h1 id="hero-title" className="mt-2 text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Your agents, and an inbox for the work they do
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">
            Pi Agent Interface ({site.shortName}) is a self-hosted chat app for{" "}
            <TextLink href={site.platformUrl}>Pi Durable</TextLink> agents. People sign in with your single sign-on,
            each gets their own agents on the platform, and one inbox shows which of them are working, which are done
            and which failed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.docsUrl}>
              <BookOpen className="size-4" />
              Read the docs
            </ButtonLink>
            <ButtonLink href={site.repoUrl} variant="secondary">
              <Github className="size-4" />
              View on GitHub
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-xl text-sm text-brand-subtle">
            Self-hosted: one Node process and PostgreSQL, next to your Pi Durable platform. The chat interface comes
            from Open Chat Interface.
          </p>
        </div>
        <Screenshot slot="chat-inbox" priority caption={false} />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- What it is */

const pillars: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Shield className="size-5" />,
    title: "Sign in to the chat app, not the platform",
    body: "People sign in with OpenID Connect and never get platform credentials. The chat server talks to the platform with one team service account, and checks on every request that the agent is the signed-in person's own.",
  },
  {
    icon: <Bot className="size-5" />,
    title: "Agents that keep working",
    body: "Agents and conversations live on the Pi Durable platform, so a reply keeps going when you close the tab. Replies that finish while the app is closed show as Done when you come back.",
  },
  {
    icon: <Inbox className="size-5" />,
    title: "One inbox for all of it",
    body: "Every conversation with every one of your agents in one list: pinned, working, waiting for you, snoozed or settled. It updates live, and follows you between devices.",
  },
];

function WhatItIs() {
  return (
    <section aria-labelledby="what-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="what-title" eyebrow="What it is" title="A chat app in front of your agent platform">
          <p>
            Pi Durable runs agents that keep their own conversations, tools and state. {site.name} gives the people in
            your organization a place to use them: their own agents, a familiar chat interface, and an inbox to keep
            track of work that takes minutes rather than seconds.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.title} className="rounded-card border border-brand-border bg-brand-surface p-6">
              <span className="flex size-9 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-link">
                {p.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- How it works */

function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-control border border-brand-border-emphasis bg-brand-surface px-3 py-2 text-sm font-medium text-brand-text">
      {children}
    </li>
  );
}

/** Points right on wide screens, down when the diagram stacks. Decorative. */
function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-brand-subtle">
      <svg viewBox="0 0 24 24" className="size-6 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </div>
  );
}

// README "How it works" and server/app.ts: what the chat server does for each person.
const serverSteps: { title: string; body: string }[] = [
  { title: "Sign in", body: "Single sign-on with your OpenID Connect provider; the session is an encrypted cookie." },
  { title: "Make the agents", body: "The person's provided agents, the first time they open the app, from the templates and models you chose." },
  { title: "Check", body: "Every agent request is for one of the signed-in person's own agents, or it is refused." },
  { title: "Relay", body: "Conversations, messages, Stop and the live stream of each reply, to the platform with the team's service key." },
  { title: "Follow", body: "One connection to the platform's event stream, each event passed only to the person whose agent it is." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow="How it works" title="People in front, the platform behind, one small server in between">
          <p>
            The chat app has its own server. It signs people in, makes and finds their agents on the platform, and
            relays only their own agents&apos; routes. The platform key never reaches a browser.
          </p>
        </SectionHeading>

        <figure className="mt-12">
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.5fr_auto_1fr]">
            <div className="rounded-card border border-brand-border bg-brand-surface p-5">
              <p className="text-sm font-semibold text-brand-subtle">People</p>
              <ul className="mt-4 space-y-2">
                <Chip>A browser, on any device</Chip>
                <Chip>Signed in with your SSO</Chip>
                <Chip>Their own agents and inbox</Chip>
              </ul>
              <p className="mt-4 text-xs text-brand-subtle">
                at <code className="font-mono">{appUrl}</code>
              </p>
            </div>

            <FlowArrow />

            <div className="rounded-card border-2 border-brand-highlight bg-brand-surface p-5 shadow-brand-2">
              <p className="text-sm font-semibold text-brand-text">{site.name}</p>
              <ol className="mt-4 space-y-3">
                {serverSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary-subtle text-xs font-semibold text-brand-link">
                      {i + 1}
                    </span>
                    <span className="text-sm text-brand-muted">
                      <Strong>{s.title}.</Strong> {s.body}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-brand-border pt-3 text-xs text-brand-subtle">
                Its own PostgreSQL: people, roles, settings, preferences, inbox state and the audit log
              </p>
            </div>

            <FlowArrow />

            <div className="rounded-card border border-brand-border bg-brand-surface p-5">
              <p className="text-sm font-semibold text-brand-subtle">Pi Durable platform</p>
              <ul className="mt-4 space-y-2">
                <Chip>A team for the chat app</Chip>
                <Chip>Each person&apos;s agents</Chip>
                <Chip>Conversations and tool runs</Chip>
                <Chip>Models and templates</Chip>
                <Chip>Usage reports</Chip>
              </ul>
              <p className="mt-4 text-xs text-brand-subtle">
                at <code className="font-mono">https://{site.examplePlatformHost}</code>
              </p>
            </div>
          </div>
          <figcaption className="mt-4 text-sm text-brand-muted">
            Conversations stay on the platform; the chat app keeps no copy. The team&apos;s owners see every
            person&apos;s agents in the platform console, but not their conversations.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Features */

function FeatureCard({
  id,
  icon,
  eyebrow,
  title,
  lead,
  bullets,
  note,
  wide = false,
}: {
  id: string;
  icon?: ReactNode;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  bullets: ReactNode[];
  note?: ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      aria-labelledby={id}
      className={`flex min-w-0 flex-col rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8 ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-link">
            {icon}
          </span>
        ) : null}
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h3 id={id} className="mt-3 text-xl font-semibold tracking-tight text-brand-text sm:text-2xl">
        {title}
      </h3>
      <div className="mt-3 space-y-3 leading-relaxed text-brand-muted">{lead}</div>
      <CheckList items={bullets} columns={wide} />
      {note ? <Note>{note}</Note> : null}
    </article>
  );
}

/** A keyboard shortcut, as the app lists it (Option on a Mac, Alt elsewhere). */
function Keys({ children }: { children: string }) {
  return (
    <kbd className="rounded-xs border border-brand-border-strong bg-brand-surface-sunken px-1.5 py-0.5 font-mono text-[0.8125rem] whitespace-nowrap text-brand-text">
      {children}
    </kbd>
  );
}

function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="features-title" eyebrow="Features" title="Chat with your agents, and keep track of what they are doing">
          <p>
            Everyone who signs in gets the same agents to start with, can make their own, and sees their work in one
            inbox. Administrators decide which agents people have, what they run on and which optional parts of the
            app are on.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* CHANGELOG 0.1.0 "Chat"; Unreleased: tool steps, readable errors, "No reply", folding, rename */}
          <FeatureCard
            id="feature-chat"
            icon={<MessageSquare className="size-5" />}
            eyebrow="Chat, tools and reasoning"
            title="See what the agent is doing, step by step"
            lead={
              <p>
                Replies stream in as the agent writes them, with its reasoning and every tool step above the answer.
                The interface and its Markdown rendering come from{" "}
                <TextLink href={site.ociUrl}>Open Chat Interface</TextLink>.
              </p>
            }
            bullets={[
              <>
                <Strong>Tool steps</Strong> with an icon for the kind of tool, a spinner while it runs and red when it
                fails, and what it acted on. While the agent works, its latest steps show under the header.
              </>,
              <>
                <Strong>Opened, a step shows</Strong> a command as <code>$ command</code>, simple inputs as name and
                value, JSON output indented, and Copy.
              </>,
              <>
                <Strong>Markdown</Strong> with syntax highlighting, tables, math and diagrams.
              </>,
              <>
                <Strong>Send while it works:</Strong> messages queue behind the current reply, Stop works, and sends are
                safe to retry.
              </>,
              <>
                <Strong>Failures in plain words,</Strong> with the provider&apos;s raw error under Details, and a
                &ldquo;No reply&rdquo; note with Try again when the agent stopped without answering.
              </>,
              <>
                <Strong>Rename</Strong> a conversation from its menu; the new name shows at once, on every device.
              </>,
            ]}
          />

          {/* src/lib/inbox.ts, src/components/layout/sidebar-inbox.tsx; CHANGELOG Unreleased */}
          <FeatureCard
            id="feature-inbox"
            icon={<Inbox className="size-5" />}
            eyebrow="Inbox"
            title="Working, Done, Failed: one list for every conversation"
            lead={
              <p>
                The inbox lists every conversation with every one of your agents: <Strong>Pinned</Strong>,{" "}
                <Strong>Working</Strong> and <Strong>Inbox</Strong>, with <Strong>Snoozed</Strong>,{" "}
                <Strong>Settled</Strong> and <Strong>Archived</Strong> shelves. The platform says whether an agent is
                busy and how its last reply ended; what you did with a conversation is yours.
              </p>
            }
            bullets={[
              <>
                <Strong>Status in the corner:</Strong> Working with a timer, Done for a finished reply you haven&apos;t
                seen, Failed, and Woke when a snooze ends. The tab title counts what needs you.
              </>,
              <>
                <Strong>Live from the platform:</Strong> one event stream updates conversation lists as they change on
                any device. It polls only while the stream is down.
              </>,
              <>
                <Strong>Pin, Snooze and Settle</Strong> on hover, everything else in the right-click menu, and Undo for
                every change but Delete. Snoozing shows each wake time and offers Custom…
              </>,
              <>
                <Strong>Nothing gets lost:</Strong> a snooze ends early when the agent finishes or fails, and a settled
                conversation comes back when something new happens.
              </>,
              <>
                <Strong>Synced to your account:</Strong> pinned, snoozed, settled, archived and read state follow you
                between devices; for each conversation the latest change wins.
              </>,
              <>
                <Strong>Keyboard shortcuts:</Strong> <Keys>⌥↑</Keys> <Keys>⌥↓</Keys> previous and next,{" "}
                <Keys>⌥⇧↓</Keys> next that needs you, <Keys>⌥⇧S</Keys> settle and move on, <Keys>⌥⇧P</Keys> pin,{" "}
                <Keys>⌥⇧U</Keys> mark unread (Alt on Windows and Linux).
              </>,
            ]}
          />

          {/* server/agent-settings.ts; /api/agents in server/app.ts; src/routes/settings/agents.tsx; avatars */}
          <FeatureCard
            id="feature-agents"
            icon={<Bot className="size-5" />}
            eyebrow="Agents"
            title="Provided agents, and your own"
            wide
            lead={
              <p>
                Every person has their own agents on the platform, with private conversations. Some are provided by your
                administrators; the rest people make themselves, within the limits you set.
              </p>
            }
            bullets={[
              <>
                <Strong>Provided agents:</Strong> administrators add agents everyone gets, and every person gets a
                private copy of each, made the first time they open the app. The built-in assistant is the first.
              </>,
              <>
                <Strong>My agents</Strong> (Settings): make agents from the templates your administrators allow, rename
                them, move them to another model, or delete them with their conversations.
              </>,
              <>
                <Strong>One picker</Strong> for a new conversation, with the provided agents grouped above your own.
              </>,
              <>
                <Strong>Within limits:</Strong> five agents of their own per person by default (0 turns making agents
                off), and the model chosen by people or fixed by administrators.
              </>,
              <>
                <Strong>Animated avatars</Strong> in three styles, Face, Signal and Pixel, that show what the agent is
                doing: idle, thinking, working, waiting, needs you, done, error or asleep.
              </>,
              <>
                <Strong>Only published models:</Strong> agents are only ever put on a model the platform currently
                publishes to the team, so none is left on a model that would not start.
              </>,
            ]}
          />

          {/* /api/admin/* in server/app.ts; src/routes/admin/* */}
          <FeatureCard
            id="feature-admin"
            icon={<Users className="size-5" />}
            eyebrow="Administration"
            title="An admin dashboard for people, agents and branding"
            lead={
              <p>
                Administrators get <code>/admin</code>. Every change takes effect at once and is recorded in the audit
                log.
              </p>
            }
            bullets={[
              <>
                <Strong>Overview:</Strong> people, activity today and this week, and recent changes.
              </>,
              <>
                <Strong>People:</Strong> search, make administrator or member, suspend or restore. A suspension, or a
                person&apos;s &ldquo;sign out everywhere&rdquo;, ends their sessions within seconds, and there is always at
                least one active administrator.
              </>,
              <>
                <Strong>Agents:</Strong> the default model, how many agents each person may make, whether people choose
                the model, the allowed templates, and the provided agents.
              </>,
              <>
                <Strong>Branding:</Strong> the name, the logo, and the default accent and appearance, on every page
                including the sign-in page.
              </>,
              <>
                <Strong>Features</Strong> and the <Strong>Audit log</Strong>.
              </>,
            ]}
            note={
              <>
                <code>INITIAL_ADMIN_EMAIL</code> makes the first administrator. Locked out? Promote someone from the
                server with <code className="whitespace-nowrap">admin:promote</code> (in the container,{" "}
                <code>node dist-server/cli.js promote &lt;email&gt;</code>).
              </>
            }
          />

          {/* server/features.ts */}
          <FeatureCard
            id="feature-optional"
            icon={<Toggle className="size-5" />}
            eyebrow="Optional features"
            title="Usage per person, and for each person"
            lead={
              <p>
                Optional features are parts of the app an instance can do without. Administrators turn them on and off
                under Admin › Features; the server refuses their routes while they are off, and the browser hides them.
              </p>
            }
            bullets={[
              <>
                <Strong>Usage</Strong> (on by default): Admin › Usage shows requests, tokens and an estimated cost per
                person over 7, 30 or 90 days, with tokens per day, from the platform&apos;s usage report.
              </>,
              <>
                <Strong>Personal usage</Strong> (off by default): Settings › Usage shows each person their own
                agents&apos; requests, tokens and estimated cost, per agent and per day. Nobody sees anyone else&apos;s.
              </>,
            ]}
            note={
              <>
                Costs appear once the platform has prices for the models. A deployment whose platform can&apos;t support
                a feature turns it off for good with <code>DISABLED_FEATURES</code>.
              </>
            }
          />

          {/* server/session.ts, server/app.ts, server/config.ts, server/main.ts, Dockerfile, image.yml */}
          <FeatureCard
            id="feature-security"
            icon={<Shield className="size-5" />}
            eyebrow="Self-hosting and security"
            title="Your sign-in, your servers, no tracking"
            wide
            lead={
              <p>
                {site.name} runs where you run it. It sends conversations only to your Pi Durable platform, and loads no
                analytics, telemetry or third-party scripts.
              </p>
            }
            bullets={[
              <>
                <Strong>Sessions</Strong> are AES-256-GCM encrypted, HttpOnly cookies (<code>__Host-</code> over https),
                seven days by default. &ldquo;Sign out everywhere&rdquo; ends them all.
              </>,
              <>
                <Strong>CSRF protection:</Strong> every write needs the session&apos;s token and must come from the
                app&apos;s own origin.
              </>,
              <>
                <Strong>Ownership on every request:</Strong> an agent that isn&apos;t yours answers 404. The service key
                is never sent to browsers.
              </>,
              <>
                <Strong>Strict headers:</Strong> a Content-Security-Policy that allows scripts only from the app itself,
                HSTS over https, <code>X-Frame-Options: DENY</code> and <code>nosniff</code>; a cap on open streams per
                person.
              </>,
              <>
                <Strong>Safe by default:</Strong> the server refuses to start, naming every problem, with a platform or
                identity provider that isn&apos;t https, development accounts on a public address, or a short session
                secret.
              </>,
              <>
                <Strong>A non-root container:</Strong> the image runs as the <code>node</code> user with a health check.
                Release images are multi-arch, scanned for vulnerabilities, carry an SBOM and provenance, and are signed
                with cosign.
              </>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Screenshots */

const galleries: { title: string; slots: SlotName[] }[] = [
  { title: "Chat and inbox", slots: ["tool-steps", "inbox-rows", "inbox-snooze", "phone-inbox"] },
  { title: "Agents", slots: ["agent-picker", "my-agents", "avatar-styles", "admin-agents"] },
  { title: "Administration", slots: ["admin-people", "admin-features", "admin-usage", "admin-audit"] },
];

function Screenshots() {
  return (
    <section id="screenshots" aria-labelledby="screenshots-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="screenshots-title" eyebrow="The app" title="For the people who use the agents, and the people who run them">
          <p>
            Everyone sees their agents, their conversations and their settings. Administrators also get the admin
            dashboard. The screenshots are of a fictional installation, Example Corp.
          </p>
        </SectionHeading>
        {galleries.map((g) => (
          <div key={g.title} className="mt-14">
            <h3 className="text-lg font-semibold text-brand-text">{g.title}</h3>
            <div className="mt-6 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {g.slots.map((slot) => (
                <Screenshot key={slot} slot={slot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Deploy */

// README "Running it".
const dockerRun = `git clone https://github.com/ncecere/pi-agent-interface.git
cd pi-agent-interface
docker build -t pi-agent-interface .
docker run -d -p 8080:8080 --env-file .env pi-agent-interface`;

// README "Configuration" and .env.example: the variables every deployment sets.
const envEssentials = `APP_URL=${appUrl}

# The platform, the app's team, its service account key (editor)
PLATFORM_URL=https://${site.examplePlatformHost}
PLATFORM_TEAM=pi-agent-interface
PLATFORM_SERVICE_KEY=pdp_sa_...

# The app's own PostgreSQL; migrated on start
DATABASE_URL=postgres://pai:<password>@db.example.com:5432/pai

# At least 32 characters: openssl rand -base64 48
SESSION_SECRET=...

# Single sign-on; redirect URI ${appUrl}/auth/callback
OIDC_ISSUER=https://sso.example.com/
OIDC_CLIENT_ID=pi-agent-interface
OIDC_CLIENT_SECRET=...

# Becomes an administrator on first sign-in, while there is none
INITIAL_ADMIN_EMAIL=alex.morgan@example.com`;

// The image's runtime contract (Dockerfile): port 8080, user node (uid 1000),
// /healthz and /readyz (server/app.ts). The repository has no manifests.
const k8sContainer = `containers:
  - name: pi-agent-interface
    image: ${site.image}@sha256:<digest>
    ports:
      - containerPort: 8080
    envFrom:
      - secretRef:
          name: pi-agent-interface   # the variables above
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000                # the image's node user
      allowPrivilegeEscalation: false
    livenessProbe:
      httpGet: { path: /healthz, port: 8080 }
    readinessProbe:
      httpGet: { path: /readyz, port: 8080 }   # the database answers`;

const requirements: ReactNode[] = [
  <>
    A <Strong>Pi Durable platform</Strong> with a team for the chat app, an <Strong>editor</Strong> service account
    and its key (<code>pdp_sa_…</code>), and a model published to the team
  </>,
  <>
    An <Strong>OpenID Connect provider</Strong>, reached over https: a confidential client with the redirect URI{" "}
    <code>{appUrl}/auth/callback</code> and the <code>openid profile email</code> scopes
  </>,
  <>
    <Strong>PostgreSQL</Strong> for the app&apos;s own data: people, roles, settings, preferences and the audit log
  </>,
  <>
    <Strong>TLS in front</Strong>, with a reverse proxy that passes <code>Host</code> and <code>X-Forwarded-*</code>{" "}
    and doesn&apos;t buffer or time out the event streams
  </>,
];

function Deploy() {
  return (
    <section id="deploy" aria-labelledby="deploy-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="deploy-title" eyebrow="Deploy" title="Run it next to your platform">
          <p>
            {site.name} is one Node process that serves the web app and its API, in a container that runs as a
            non-root user. Its configuration is a handful of environment variables, and it migrates its own database
            on start.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0 space-y-6">
            <CodeBlock label="Build and run the container">{dockerRun}</CodeBlock>
            <CodeBlock label=".env: the essentials (the full list is in .env.example)">{envEssentials}</CodeBlock>
            <CodeBlock label="Kubernetes: the container, its user and probes">{k8sContainer}</CodeBlock>
          </div>
          <div className="self-start rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-brand-text">What you need</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              {requirements.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-highlight" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-semibold text-brand-text">The container image</h3>
            <p className="mt-2 text-sm text-brand-muted">
              Release tags publish <code>{site.image}</code> for linux/amd64 and linux/arm64, tagged with the version
              and <code>latest</code>, and signed with cosign keyless signing. The first published image comes with{" "}
              {site.nextVersion}; until then, build it from the source as shown.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-brand-text">On Kubernetes</h3>
            <p className="mt-2 text-sm text-brand-muted">
              Listen on port 8080, use <code>/healthz</code> for liveness and <code>/readyz</code> for readiness, and
              keep <code>APP_URL</code> equal to the public address. The server closes cleanly on SIGTERM.
            </p>
            <Note>
              Conversation streams stay open: turn off proxy buffering for them and allow at least an hour of idle
              read time (nginx: <code>proxy_buffering off; proxy_read_timeout 1h;</code>). The platform sends a
              keep-alive every 15 seconds. The repository has no manifests or Helm chart.
            </Note>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.docsUrl}>
                Deployment docs
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.readmeUrl} variant="secondary">
                README on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Open source */

function OpenSource() {
  return (
    <section id="status" aria-labelledby="open-source-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <h2 id="open-source-title" className="sr-only">
          Open source and project status
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <article aria-labelledby="oss-title" className="min-w-0 rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-link">
                <Plug className="size-5" />
              </span>
              <Eyebrow>Open source</Eyebrow>
            </div>
            <h3 id="oss-title" className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">
              MIT licensed, built in the open
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">
              <p>
                {site.name} is released under the MIT licence. Run it for as many people as you like, and change the
                code if you need to.
              </p>
              <p>
                The web app is derived from <TextLink href={site.ociUrl}>Open Chat Interface</TextLink>: its layout,
                components, styles and its Markdown and tool-step rendering. The server is TypeScript on Node with
                PostgreSQL. Its tests cover the inbox&apos;s rules, the ownership checks and the database store against a
                real PostgreSQL.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.repoUrl} variant="secondary">
                <Github className="size-4" />
                Source on GitHub
              </ButtonLink>
              <ButtonLink href={site.noticeUrl} variant="ghost">
                Notices and credits
              </ButtonLink>
            </div>
          </article>
          <article aria-labelledby="status-title" className="min-w-0 rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-link">
                <Layers className="size-5" />
              </span>
              <Eyebrow>Project status</Eyebrow>
            </div>
            <h3 id="status-title" className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">
              {site.version} is released; {site.nextVersion} is in progress
            </h3>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold text-brand-text">
                  <span className="rounded-full bg-brand-success-subtle px-2 py-0.5 text-xs text-brand-success-text">Released</span>
                  {site.version}, October 18, 2026
                </dt>
                <dd className="mt-2 text-brand-muted">
                  The first release: chat with your own assistant, the inbox, the animated avatars and single sign-on.
                  Since then the main branch has gained the rest of this page: provided agents and your own, the admin
                  dashboard and settings, the inbox synced between devices and driven by the platform&apos;s event
                  stream, and the optional features. They are in the changelog&apos;s Unreleased section and ship with{" "}
                  {site.nextVersion}.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold text-brand-text">
                  <span className="rounded-full bg-brand-warning-subtle px-2 py-0.5 text-xs text-brand-warning-text">Next</span>
                  {site.nextVersion}
                </dt>
                <dd className="mt-2 text-brand-muted">
                  Being built now: people connect their own platform account through the platform&apos;s OAuth Connect,
                  so their agents live in their personal workspace on the platform.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-text">Not yet</dt>
                <dd className="mt-2 text-brand-muted">
                  Attachments, tool approvals, editing or branching messages, and searching message text. Access by
                  identity-provider group. Single sign-on is tested against an in-process provider, not a particular
                  identity provider. Pre-1.0: expect changes between minor releases.
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-brand-muted">
              Read the <TextLink href={site.changelogUrl}>changelog</TextLink>, and report problems in the{" "}
              <TextLink href={site.issuesUrl}>issue tracker</TextLink>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
