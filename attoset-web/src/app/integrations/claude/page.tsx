import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CopyField } from "@/components/ui/copy-field";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Attoset connector for Claude",
  description:
    "Connect Claude to Attoset to read, build and update your workspaces, tables, records, forms, automations and dashboards, with your own permissions.",
  path: "/integrations/claude",
});

const LAST_UPDATED = "November 24, 2026";
const SERVER_URL = "https://mcp.attoset.com/mcp";

const link = "font-medium text-ink underline underline-offset-4 hover:text-orange";
const list = "flex flex-col gap-2.5 list-disc pl-5 marker:text-orange";
const steps = "flex flex-col gap-2.5 list-decimal pl-5 marker:font-mono marker:text-muted";
const term = "font-semibold text-ink";

const examplePrompts = [
  {
    title: "Find records",
    prompt: "In my Sales workspace, list the deals in the Deals table whose Stage is Negotiation, with their owner.",
  },
  {
    title: "Build a table",
    prompt:
      "Create a table called Hiring Pipeline in my HR workspace with Candidate, Role, Stage (Applied, Interview, Offer, Hired) and Interview date, then add three sample candidates.",
  },
  {
    title: "Make a dashboard",
    prompt: "Build a dashboard for my Support Tickets table showing the number of open tickets and a bar chart of tickets by priority.",
  },
  {
    title: "Collect data with a form",
    prompt: "Add a form to my Event Registrations table that asks for name, email and session, publish it and give me the link.",
  },
  {
    title: "Automate a step",
    prompt: "Create an automation on my Tasks table that emails the task owner when Status changes to Blocked.",
  },
  {
    title: "Turn a photo into a record",
    prompt: "Here is a photo of a business card. Add this person to my Contacts table.",
  },
];

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "overview",
    title: "What the connector does",
    body: (
      <>
        <p>
          The Attoset connector lets Claude work in your Attoset workspaces as you. Ask in plain language and Claude can look
          things up, build new tables and dashboards, and update your data, in the Claude apps on the web, desktop and mobile,
          and in Claude Code.
        </p>
        <ul className={list}>
          <li>
            <span className={term}>Workspaces and folders</span>: browse the full workspace tree, create and organise folders,
            invite members.
          </li>
          <li>
            <span className={term}>Tables and columns</span>: create, rename, duplicate and import tables; add any column type,
            including links, lookups, rollups and formulas; manage choices.
          </li>
          <li>
            <span className={term}>Records</span>: query with filters, search, create, update and bulk-edit records, link
            records, read a cell&apos;s history, comment with @mentions and attach files and images.
          </li>
          <li>
            <span className={term}>Views</span>: saved filters, sorting and grouping.
          </li>
          <li>
            <span className={term}>Forms and automations</span>: design forms with show / hide rules, publish them, and build
            automations triggered by record changes, form submissions, schedules or dates.
          </li>
          <li>
            <span className={term}>Dashboards and insights</span>: metrics, charts, pivots, lookups and other widgets across
            one or more tables.
          </li>
          <li>
            <span className={term}>Files, links and trash</span>: workspace files and links, and restoring deleted tables and
            dashboards.
          </li>
        </ul>
        <p>
          Account and security settings (sign-in, sessions, API tokens, company users, roles and permissions) are not
          available through the connector.
        </p>
      </>
    ),
  },
  {
    id: "requirements",
    title: "Before you start",
    body: (
      <ul className={list}>
        <li>An Attoset account. The connector can reach exactly what that account can reach in Attoset.</li>
        <li>
          A Claude account. Which Claude plans can use connectors, and who can add them in a Team or Enterprise organization,
          is set by Anthropic.
        </li>
      </ul>
    ),
  },
  {
    id: "connect",
    title: "Connect Attoset to Claude",
    body: (
      <>
        <p className={term}>In the Claude apps (web, desktop, mobile)</p>
        <ol className={steps}>
          <li>
            In Claude, open <span className={term}>Customize → Connectors</span>.
          </li>
          <li>
            Find <span className={term}>Attoset</span>{" "}in the connectors directory, or choose{" "}
            <span className={term}>Add custom connector</span>{" "}and enter the server URL below. Leave the client ID and secret
            empty.
          </li>
          <li>
            Select <span className={term}>Connect</span>. The Attoset sign-in page opens: sign in with your email and password,
            two-factor code or your company&apos;s single sign-on. If you are already signed in to Attoset, that session is
            used.
          </li>
          <li>The window closes and the connector shows as connected. Turn it on in a chat from the tools menu.</li>
        </ol>
        <p>
          On Team and Enterprise plans an Owner adds the connector for the organization first; each member then connects with
          their own Attoset account. Connectors added on the web are also available in the desktop and mobile apps.
        </p>
        <div className="mt-1">
          <CopyField value={SERVER_URL} label="server URL" />
        </div>
        <p className={`${term} mt-3`}>In Claude Code</p>
        <div className="rounded-2xl border border-line bg-warm px-4 py-3 font-mono text-[13px] text-ink">
          claude mcp add --transport http attoset {SERVER_URL}
        </div>
        <p>
          Then run <code className="font-mono text-[13px] text-ink">/mcp</code> in Claude Code and choose{" "}
          <span className={term}>Authenticate</span>{" "}to sign in.
        </p>
      </>
    ),
  },
  {
    id: "examples",
    title: "Things to ask",
    body: (
      <>
        <p>Name the workspace and table when you can; Claude finds the rest.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {examplePrompts.map((e) => (
            <div key={e.title} className="rounded-2xl border border-line bg-white p-4">
              <p className="text-[14px] font-semibold text-ink">{e.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink">&ldquo;{e.prompt}&rdquo;</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Permissions and safety",
    body: (
      <ul className={list}>
        <li>
          <span className={term}>Your access, nothing more.</span>{" "}Claude acts as the person who connected, with that
          person&apos;s workspace roles. The connector checks the same role permissions as the Attoset app.
        </li>
        <li>
          <span className={term}>Reads and changes are separate tools.</span>{" "}Every tool is labelled read, create, update or
          delete. Claude asks your permission before using a tool that changes data, unless you choose to always allow it.
        </li>
        <li>
          <span className={term}>Two steps for anything that can lose data.</span>{" "}Deletes, column type changes, bulk edits
          and removing members first return a summary of exactly what will change. Nothing happens until that change is
          confirmed, and the confirmation expires after 30 minutes.
        </li>
        <li>
          <span className={term}>Undo.</span>{" "}Records deleted through the connector can be restored for about 24 hours.
          Deleted tables and dashboards stay in the trash for 30 days. Column changes return an undo id.
        </li>
        <li>
          <span className={term}>Values are checked first.</span>{" "}Every value is checked against the column before anything
          is written, and a batch is saved in full or not at all.
        </li>
      </ul>
    ),
  },
  {
    id: "limits",
    title: "Limits",
    body: (
      <ul className={list}>
        <li>Up to 120 requests per minute per person.</li>
        <li>Bulk edits and deletes cover up to 5,000 records at a time; imports up to 5,000 rows.</li>
        <li>Up to 100 records per create or update request.</li>
        <li>A form with a required file or image question can only be submitted from its public link.</li>
      </ul>
    ),
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    body: (
      <ul className={list}>
        <li>
          <span className={term}>The connector shows Connect or Reconnect.</span>{" "}Select it and sign in again. This happens
          after you sign out of all sessions in Attoset, or when your organization removes your access.
        </li>
        <li>
          <span className={term}>&ldquo;You do not have permission to do this in Attoset.&rdquo;</span>{" "}Your role in that
          workspace does not allow the action. Ask a workspace owner or admin.
        </li>
        <li>
          <span className={term}>Claude cannot find a table or workspace.</span>{" "}Check that your account is a member of the
          workspace, and give Claude the exact workspace and table names.
        </li>
        <li>
          <span className={term}>A value is refused.</span>{" "}Select choices, linked records and contacts have to exist first.
          The message says which value was refused; ask Claude to add the choice or contact, then try again.
        </li>
        <li>
          <span className={term}>&ldquo;Too many requests.&rdquo;</span>{" "}You reached the per-minute limit. Wait a minute and
          try again.
        </li>
        <li>
          <span className={term}>Still stuck?</span>{" "}Contact us at{" "}
          <a href="mailto:contact@attoset.com" className={link}>
            contact@attoset.com
          </a>{" "}
          with the time it happened and what you asked Claude.
        </li>
      </ul>
    ),
  },
  {
    id: "disconnect",
    title: "Disconnect",
    body: (
      <p>
        Remove or disconnect Attoset under <span className={term}>Customize → Connectors</span>{" "}in Claude. To cut access from
        the Attoset side, sign out of all sessions in your Attoset account settings; the connector stops working within a
        minute. Deactivating an account or removing a company&apos;s access has the same effect.
      </p>
    ),
  },
  {
    id: "data",
    title: "Data and privacy",
    body: (
      <>
        <p>
          The connector passes Claude&apos;s requests to Attoset and returns the results to Claude. It does not read your
          Claude conversations, memory or uploaded files. The only thing it keeps is a change waiting for confirmation, for
          up to 30 minutes. Its logs record the tool, the action, your user id, the outcome and timing, never the values you
          send or your sign-in tokens.
        </p>
        <p>
          Content Claude reads through the connector is handled by Anthropic under your agreement with Anthropic. How
          Attoset handles your data is described in our{" "}
          <a href="/privacy" className={link}>
            Privacy Policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "support",
    title: "Support",
    body: (
      <p>
        Questions or problems with the connector: email{" "}
        <a href="mailto:contact@attoset.com" className={link}>
          contact@attoset.com
        </a>{" "}
        or use our{" "}
        <a href="/contact" className={link}>
          contact page
        </a>
        . Claude is a product of Anthropic.
      </p>
    ),
  },
];

export default function ClaudeConnectorPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 sm:pt-44">
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[460px] opacity-40" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Integrations</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.03] tracking-display text-balance">
              Attoset for <span className="grad-text">Claude</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted">
              Ask Claude to read, build and update your Attoset workspaces, with your own permissions.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Last updated: {LAST_UPDATED}</p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <nav aria-label="On this page" className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-line bg-white p-8 shadow-card sm:p-12">
            <div className="flex flex-col gap-10 text-[15px] leading-relaxed text-ink-soft">
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="font-display text-xl font-semibold tracking-display text-ink">{s.title}</h2>
                  <div className="mt-3 flex flex-col gap-3">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
