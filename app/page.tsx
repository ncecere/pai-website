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
 * Every claim here is checked against Pi Agent Interface v0.5.1
 * (github.com/ncecere/pi-agent-interface, tag v0.5.1, commit b28fdc5,
 * 2026-10-19): README.md, ROADMAP.md, CHANGELOG.md ("0.2.0", "0.3.0",
 * "0.4.0", "0.5.0", "0.5.1"), NOTICE.md, deploy/kubernetes/README.md, server/connect.ts,
 * server/connect-agents.ts, server/features.ts, the routes in server/app.ts,
 * server/config.ts, server/session.ts, server/agent-settings.ts, the screens
 * in src/routes/** and src/components/connect/, the Dockerfile and
 * .github/workflows/image.yml (the last two unchanged since v0.3.1).
 * Keep it that way: nothing on this page may describe a feature that isn't
 * built in the released version. What isn't built yet is said in the project
 * status card.
 */

const appUrl = `https://${site.exampleHost}`;

// A page of the documentation site.
const docs = (path: string) => `${site.docsUrl}${path}`;

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
            <TextLink href={site.platformUrl}>Pi Durable</TextLink> agents. People sign in with your single sign-on and
            connect their own platform account once. Their agents live in their personal workspace beside their
            teams&apos; agents, and one inbox shows which of them are working, which are done and which failed.
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
    title: "Sign in here, connect once",
    body: "People sign in to the chat app with OpenID Connect, then connect their own account on the agent platform, once. The server keeps their tokens encrypted and calls the platform as them; the browser never sees a token.",
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
            your organization a place to use them: their own agents next to their teams&apos;, a familiar chat
            interface, and an inbox to keep track of work that takes minutes rather than seconds.
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

// README "How it works", server/connect.ts, server/connect-agents.ts and server/app.ts:
// what the chat server does for each person in Connect mode (the default).
const serverSteps: { title: string; body: string }[] = [
  { title: "Sign in", body: "Single sign-on with your OpenID Connect provider; the session is an encrypted cookie." },
  { title: "Connect", body: "Once, the person connects their own platform account. The server keeps the tokens encrypted and refreshes them; the browser never sees them." },
  { title: "Make the agents", body: "The person's provided agents, in their personal workspace, the first time they open the app: one private copy each, from the templates and models you chose." },
  { title: "Relay", body: "Conversations, messages, Stop and the live stream of each reply, to the platform with the person's own token. The platform decides what they may use." },
  { title: "Follow", body: "The platform's event stream, one per person with their own token, so the inbox updates on every device." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow="How it works" title="People in front, the platform behind, one small server in between">
          <p>
            The chat app has its own server. It signs people in, connects each person to the platform, finds and makes
            their agents there, and calls the platform as them. Tokens and keys stay on the server.
          </p>
        </SectionHeading>

        <figure className="mt-12">
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.5fr_auto_1fr]">
            <div className="rounded-card border border-brand-border bg-brand-surface p-5">
              <p className="text-sm font-semibold text-brand-subtle">People</p>
              <ul className="mt-4 space-y-2">
                <Chip>A browser, on any device</Chip>
                <Chip>Signed in with your SSO</Chip>
                <Chip>Connected to their own platform account</Chip>
                <Chip>Their agents and inbox</Chip>
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
                Its own PostgreSQL: people, roles, settings, preferences, inbox state, the audit log, the encrypted
                connection tokens and, only if message search is turned on, a searchable copy of message text
              </p>
            </div>

            <FlowArrow />

            <div className="rounded-card border border-brand-border bg-brand-surface p-5">
              <p className="text-sm font-semibold text-brand-subtle">Pi Durable platform</p>
              <ul className="mt-4 space-y-2">
                <Chip>Each person&apos;s personal workspace</Chip>
                <Chip>Their teams&apos; agents</Chip>
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
            Conversations stay on the platform; the chat app keeps no copy unless an administrator turns on message search. The diagram shows Connect, the default.
          </figcaption>
        </figure>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-brand-border bg-brand-surface p-6">
            <h3 className="text-base font-semibold text-brand-text">Connect (the default)</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              Each person connects their own platform account. It needs a platform with OAuth Connect and personal
              workspaces turned on. The server calls the platform with the person&apos;s token, and the platform decides
              what they may use.
            </p>
          </div>
          <div className="rounded-card border border-brand-border bg-brand-surface p-6">
            <h3 className="text-base font-semibold text-brand-text">Service account</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              For a platform without Connect (<code>PLATFORM_AUTH=service</code>, and the mode when a service key is
              set). One team service account holds an agent for each person, and the server checks on every request
              that the agent is the signed-in person&apos;s own. The key never reaches a browser.
            </p>
          </div>
        </div>
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
            Everyone who signs in connects their own platform account once, gets the same provided agents to start
            with, can make their own, and sees their work in one inbox. Administrators decide which agents people
            have, what they run on and which optional parts of the app are on.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* CHANGELOG 0.2.0 "Connecting to the platform"; server/connect.ts, server/connect-agents.ts, README "What you need" */}
          <FeatureCard
            id="feature-connect"
            icon={<Plug className="size-5" />}
            eyebrow="Connect"
            title="Your own platform account, your own workspace"
            wide
            lead={
              <p>
                After signing in, each person connects their own account on the agent platform, once. Their agents live in
                their personal workspace there, beside the agents of the teams they belong to, and the server calls the
                platform with their token. The platform decides what they may use.
              </p>
            }
            bullets={[
              <>
                <Strong>Connect once:</Strong> a &ldquo;Connect your agents&rdquo; screen sends the person to the platform to
                sign in and allow the app, then brings them back. Until they have, it is all they see.
              </>,
              <>
                <Strong>Personal workspace and teams:</Strong> the agent picker lists the provided agents, the person&apos;s
                own, and each team&apos;s agents.
              </>,
              <>
                <Strong>Tokens stay on the server:</Strong> they are encrypted in the app&apos;s database with a key derived
                from <code>SESSION_SECRET</code>, refreshed one at a time per person, and never sent to a browser.
              </>,
              <>
                <Strong>Asked again when it ends:</Strong> if the person disconnects the app on the platform, or an
                administrator of the platform revokes it, the next request asks them to connect again.
              </>,
              <>
                <Strong>The same person on both sides:</Strong> a platform account whose email differs from the person&apos;s
                account here is refused and its tokens revoked, unless <code>CONNECT_EMAIL_MATCH=off</code>.
              </>,
              <>
                <Strong>Disconnect any time</Strong> under Settings › Account, or in the platform&apos;s Connected apps.
                Agents and conversations stay on the platform.
              </>,
            ]}
            note={
              <>
                Connect needs a platform with OAuth Connect and personal workspaces turned on. The app identifies itself
                with a Client ID Metadata Document at <code>{appUrl}/oauth/client-metadata.json</code>, which the platform
                fetches, so that address must be reachable from the platform and must not redirect. On a local{" "}
                <code>http://localhost</code> address the app registers itself instead. For a platform without Connect,
                service-account mode remains: one team service account, <code>PLATFORM_AUTH=service</code>.
              </>
            }
          />

          {/* CHANGELOG 0.3.0 (time, model, tokens, step durations, length limit), 0.2.0 "Chat" and 0.1.0 "Chat": tool steps, readable errors, "No reply", rename */}
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
              <>
                <Strong>When, which model, how long:</Strong> hover a message to see when it was sent. Under a
                finished reply: the model and the tokens it used. Each tool step shows how long it ran, and a reply cut
                off at the model&apos;s length limit says so. All of it is shown when the platform records it.
              </>,
            ]}
          />

          {/* src/lib/inbox.ts, src/components/layout/sidebar-inbox.tsx; CHANGELOG 0.2.0 "Inbox" */}
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
                <Strong>Long lists stay fast:</Strong> each shelf is drawn 40 conversations at a time, with{" "}
                <Strong>Show more</Strong> for the next 40, and a search looks through all of them (see{" "}
                <TextLink href={docs("/docs/use/inbox")}>the inbox docs</TextLink>).
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

          {/* server/agent-settings.ts, server/connect-agents.ts; /api/agents in server/app.ts; src/routes/settings/agents.tsx; avatars */}
          <FeatureCard
            id="feature-agents"
            icon={<Bot className="size-5" />}
            eyebrow="Agents"
            title="Provided agents, and your own"
            wide
            lead={
              <p>
                Agents live on the platform, in each person&apos;s personal workspace beside the agents of their teams.
                Some are provided by your administrators; the rest people make themselves, within the limits you set.
              </p>
            }
            bullets={[
              <>
                <Strong>Provided agents:</Strong> administrators add agents everyone gets. Every person gets a private
                copy of each, made once in their workspace the first time they open the app (a copy already there under
                that name is adopted, not duplicated). The built-in assistant is the first.
              </>,
              <>
                <Strong>My agents</Strong> (Settings): make agents from the templates your administrators allow, rename
                them, move them to another model, or delete them with their conversations. Agents made in the
                platform&apos;s own console, in the personal workspace, show up as yours.
              </>,
              <>
                <Strong>One picker</Strong> for a new conversation: Provided, Yours, then each team&apos;s agents. A
                conversation with a team&apos;s agent starts private to you, which works with a platform that has private
                and shared threads.
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
                <Strong>Only offered models:</Strong> agents are only put on a model the platform currently offers the
                person&apos;s workspace (in service-account mode, the team), so none is left on a model that would not
                start.
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
                <Strong>Features</Strong>, <Strong>Usage</Strong> (service-account mode, or for connected people) and
                the <Strong>Audit log</Strong>.
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
            title="Usage, and search inside messages"
            lead={
              <p>
                Optional features are parts of the app an instance can do without. Administrators turn them on and off
                under Admin › Features; the server refuses their routes while they are off, and the browser hides them (<TextLink href={docs("/docs/administer/features")}>features docs</TextLink>).
              </p>
            }
            bullets={[
              <>
                <Strong>Usage</Strong> (on by default, service-account mode only): Admin › Usage shows requests, tokens
                and an estimated cost per person over 7, 30 or 90 days, with tokens per day, from the platform&apos;s
                usage report.
              </>,
              <>
                <Strong>Personal usage</Strong> (off by default): Settings › Usage shows each person their own
                agents&apos; requests, tokens and estimated cost, per agent and per day. Nobody sees anyone else&apos;s.
              </>,
              <>
                <Strong>Usage of connected people</Strong> (off by default, Connect): Admin › Usage shows each connected
                person&apos;s personal-workspace agents, and lists apart the people who haven&apos;t connected rather
                than counting them as zero (<TextLink href={docs("/docs/administer/usage")}>usage docs</TextLink>).
              </>,
              <>
                <Strong>Search message text</Strong> (off by default): the sidebar&apos;s search also looks inside
                messages. To do that the app keeps a searchable copy of the text of conversations opened in it, in its
                own database; each person searches only their own, and turning the feature off deletes every copy.
              </>,
            ]}
            note={
              <>
                Costs appear once the platform has prices for the models. With Connect, people&apos;s agents are in their
                own workspaces, which the app&apos;s administrators don&apos;t see, so the team-wide Usage is locked off; Usage
                of connected people and Personal usage still work. A deployment can turn a feature off for good with <code>DISABLED_FEATURES</code>.
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
                <Strong>Sign-in by group:</Strong> limit sign-in to the identity-provider groups you list, and let a
                group decide who is an administrator, checked on every sign-in (<TextLink href={docs("/docs/operate/sign-in")}>sign-in docs</TextLink>).
              </>,
              <>
                <Strong>Rotating the session secret</Strong> keeps people signed in and connected: the old secret is still
                accepted while the new one takes over (<TextLink href={docs("/docs/operate/rotating-the-session-secret")}>how</TextLink>).
              </>,
              <>
                <Strong>CSRF protection:</Strong> every write needs the session&apos;s token and must come from the
                app&apos;s own origin.
              </>,
              <>
                <Strong>Nothing secret in the browser:</Strong> Connect tokens and the service key stay on the server. In
                service-account mode an agent that isn&apos;t yours answers 404; with Connect the platform checks every
                request against the person&apos;s own token.
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
                <Strong>A non-root container:</Strong> the image runs as the <code>node</code> user with a health check,
                and has no npm, corepack or yarn in it. Release images are multi-arch, scanned for vulnerabilities, carry
                an SBOM and provenance, and are signed with cosign.
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
  { title: "Connect", slots: ["connect", "account-connection"] },
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

// README "Running it": the signed image, pinned by tag and digest.
const dockerRun = `docker run -d -p 8080:8080 --env-file .env \\
  ${site.image}:${site.imageTag}@${site.imageDigest}`;

// The image workflow signs the multi-arch index with cosign keyless signing.
const cosignVerify = `cosign verify ${site.image}@${site.imageDigest} \\
  --certificate-identity ${site.cosignIdentity} \\
  --certificate-oidc-issuer ${site.cosignIssuer}`;

const buildFromSource = `git clone --branch ${site.version} https://github.com/ncecere/pi-agent-interface.git
cd pi-agent-interface
docker build -t pi-agent-interface .`;

// README "Configuration", .env.example and deploy/kubernetes/README.md: the variables every deployment sets.
const envEssentials = `APP_URL=${appUrl}

# The platform, and how people reach their agents on it:
#   connect  each person connects their own platform account (the default)
#   service  one team service account; also set PLATFORM_TEAM and
#            PLATFORM_SERVICE_KEY=pdp_sa_...
PLATFORM_URL=https://${site.examplePlatformHost}
PLATFORM_AUTH=connect

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

// deploy/kubernetes/README.md: what an overlay of the Kustomize base adds (its image pin).
const k8sImagePin = `images:
  - name: ${site.image}
    newTag: ${site.imageTag}
    digest: ${site.imageDigest}`;

const requirements: ReactNode[] = [
  <>
    A <Strong>Pi Durable platform</Strong>. For Connect, the default: OAuth Connect and personal workspaces turned
    on, and the platform able to reach <code>{appUrl}/oauth/client-metadata.json</code>. Without Connect: a team for
    the chat app, an <Strong>editor</Strong> service account and its key (<code>pdp_sa_…</code>), and a model
    published to the team
  </>,
  <>
    An <Strong>OpenID Connect provider</Strong>, reached over https: a confidential client with the redirect URI{" "}
    <code>{appUrl}/auth/callback</code> and the <code>openid profile email</code> scopes
  </>,
  <>
    <Strong>PostgreSQL</Strong> for the app&apos;s own data: people, roles, settings, preferences, the audit log and
    the encrypted connection tokens
  </>,
  <>
    <Strong>TLS in front</Strong>, with a reverse proxy that passes <code>Host</code> and <code>X-Forwarded-*</code>{" "}
    and doesn&apos;t buffer or time out the event streams
  </>,
];

// README "Metrics", "Backing up and restoring" and "Accessibility"; CHANGELOG 0.4.0.
const operating: ReactNode[] = [
  <>
    <Strong>Metrics</Strong> for Prometheus, off until you turn them on, on a port of their own so exposing the app
    doesn&apos;t expose them. The Kubernetes base has an optional component with eight example alerts (
    <TextLink href={docs("/docs/operate/metrics")}>metrics docs</TextLink>).
  </>,
  <>
    <Strong>A rehearsed restore:</Strong> what the database holds, what a restore needs, and how to rehearse one on
    CloudNativePG (<TextLink href={docs("/docs/operate/upgrades-and-backups")}>backups docs</TextLink>).
  </>,
  <>
    <Strong>Accessibility checks</Strong> (axe) run in CI in both themes, next to browser tests; what isn&apos;t
    checked is listed (<TextLink href={docs("/docs/use/accessibility")}>accessibility docs</TextLink>).
  </>,
];

function Deploy() {
  return (
    <section id="deploy" aria-labelledby="deploy-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="deploy-title" eyebrow="Deploy" title="Run it next to your platform">
          <p>
            {site.name} is one Node process that serves the web app and its API, in a signed container image that runs
            as a non-root user. Its configuration is a handful of environment variables, and it migrates its own
            database on start, waiting up to three minutes for the database to answer.
            
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0 space-y-6">
            <CodeBlock label={`Run the signed image, ${site.version}`}>{dockerRun}</CodeBlock>
            <CodeBlock label="Verify its cosign signature first">{cosignVerify}</CodeBlock>
            <CodeBlock label="Or build it from the source">{buildFromSource}</CodeBlock>
            <CodeBlock label=".env: the essentials (the full list is in .env.example)">{envEssentials}</CodeBlock>
            <CodeBlock label="Kubernetes: pin the image in your overlay of the base">{k8sImagePin}</CodeBlock>
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
              <code>{site.image}</code> is public, for linux/amd64 and linux/arm64, tagged{" "}
              <code>{site.imageTag}</code> (and <code>latest</code>), and signed with cosign keyless signing by the
              release workflow. Pin the digest <code className="break-all">{site.imageDigest}</code>, which is the
              one for {site.version}.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-brand-text">On Kubernetes</h3>
            <p className="mt-2 text-sm text-brand-muted">
              <code>deploy/kubernetes/</code> in the repository is a Kustomize base: two replicas spread over nodes, a
              PodDisruptionBudget, a service account with no API token, and default-deny NetworkPolicies (DNS,
              PostgreSQL and https out; your ingress controller in). It holds no secret values and no namespace. Your
              overlay pins the image, sets <code>APP_URL</code>, <code>PLATFORM_URL</code>, <code>OIDC_ISSUER</code>{" "}
              and <code>OIDC_CLIENT_ID</code>, and supplies a Secret with <code>DATABASE_URL</code>,{" "}
              <code>SESSION_SECRET</code> and <code>OIDC_CLIENT_SECRET</code>, a PostgreSQL database and an Ingress.
              The server answers <code>/healthz</code> and <code>/readyz</code> on port 8080, and <code>APP_URL</code>{" "}
              must equal the public address.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-brand-text">Running it for other people</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              {operating.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-highlight" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <Note>
              Conversation streams stay open: turn off proxy buffering for them and allow at least an hour of idle
              read time (nginx: <code>proxy_buffering off; proxy_read_timeout 1h;</code>). The platform sends a
              keep-alive every 15 seconds.
            </Note>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.docsUrl}>
                Deployment docs
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.kubernetesUrl} variant="secondary">
                Kubernetes base
              </ButtonLink>
              <ButtonLink href={site.readmeUrl} variant="ghost">
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

// CHANGELOG 0.2.0 ("Connecting to the platform", "Usage"), server/app.ts (the usage lock in Connect mode),
// ROADMAP.md at v0.5.1 ("Waiting on the Pi Durable platform", "Could be better, whenever the platform allows").
// The roadmap is complete as of v0.5.1; the items are in its order.
const notBuilt: ReactNode[] = [
  <>
    <Strong>Files and images in a message, steering a reply in progress, approving tool calls, and editing or
    branching messages.</Strong> Each needs the platform to offer something first; a message sent while an agent is
    working waits for the reply to end.
  </>,
  <>
    Paging in the platform&apos;s conversation list and searching messages on the platform, which the app would
    use when they exist. For now the whole list still comes from the platform, and message search uses the app&apos;s
    own copy of the conversations opened in it.
  </>,
];

function OpenSource() {
  return (
    <section id="status" aria-labelledby="open-source-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <h2 id="open-source-title" className="sr-only">
          Open source and project status
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <article aria-labelledby="oss-title" className="min-w-0 self-start rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
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
              {site.version} is released, and some things are not built yet
            </h3>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold text-brand-text">
                  <span className="rounded-full bg-brand-success-subtle px-2 py-0.5 text-xs text-brand-success-text">Released</span>
                  {site.version}, October 19, 2026
                </dt>
                <dd className="mt-2 text-brand-muted">
                  People connect their own platform account, and their agents live in their personal workspace beside
                  their teams&apos;. Also in it: provided agents and your own with Admin › Agents, the inbox
                  driven live by the platform&apos;s event stream and synced between devices, with shortcuts, tool steps
                  and readable errors, when, which model and how many tokens under each reply when the platform records them, the admin area and settings, the optional usage features, the Face logo, sign-in limited, and administrators
                  set, by identity-provider group, rotating the session secret without anyone reconnecting, Prometheus
                  metrics with example alerts, a rehearsed database restore, browser and accessibility tests in CI, and
                  a signed image with a Kubernetes base. New in v0.5.0: long conversation lists that stay fast,
                  usage with Connect (optional), and search inside messages (optional). This release fixes two things
                  on phones: text fields no longer make the page zoom in, and the greeting&apos;s comma stays on the
                  first line.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold text-brand-text">
                  <span className="rounded-full bg-brand-warning-subtle px-2 py-0.5 text-xs text-brand-warning-text">Not built yet</span>
                </dt>
                <dd className="mt-2 text-brand-muted">
                  <ul className="space-y-2">
                    {notBuilt.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-border-strong" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-text">Pre-1.0</dt>
                <dd className="mt-2 text-brand-muted">
                  Expect changes between minor releases, and read the changelog before you upgrade. Single sign-on is
                  tested against an in-process provider, not a particular identity provider.
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-brand-muted">
              Read the <TextLink href={site.changelogUrl}>changelog</TextLink> and the{" "}
              <TextLink href={site.roadmapUrl}>roadmap</TextLink>, and report problems in the{" "}
              <TextLink href={site.issuesUrl}>issue tracker</TextLink>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
