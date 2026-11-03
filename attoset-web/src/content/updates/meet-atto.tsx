import Link from "next/link";
import type { UpdateMeta } from "@/lib/updates";

export const meta: UpdateMeta = {
  slug: "meet-atto",
  title: "Meet Atto, the AI assistant built into every Attoset workspace",
  summary:
    "Describe the system you need in plain language. Atto drafts the tables, views and workflows, then helps you refine them as your process changes.",
  category: "Product",
  date: "2026-09-23",
  author: "Attoset Team",
  minutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        Most work tools hand you a blank board and a list of templates, and
        leave the hard part to you: turning the way your team actually works
        into a system. Atto was built to do that part with you.
      </p>
      <p>
        Atto is the AI assistant inside every Attoset workspace. It is live
        today for everyone in the beta, and it sits next to your data, not in a
        separate chat window that knows nothing about how you operate.
      </p>

      <h2>Describe it, and Atto builds the first draft</h2>
      <p>
        Tell Atto what you are trying to run, for example &ldquo;a client
        onboarding tracker with a form for new clients, a kanban by stage and
        a weekly summary.&rdquo; Atto drafts the workspace for you:
      </p>
      <ul>
        <li>
          <strong>Tables</strong> with the right fields, types and linked
          records.
        </li>
        <li>
          <strong>Views</strong> — grid, kanban, calendar or Gantt — set up for
          how each role works.
        </li>
        <li>
          <strong>Forms</strong> that feed straight into your tables.
        </li>
        <li>
          <strong>Automations</strong> for the repetitive steps between them.
        </li>
      </ul>
      <p>
        You stay in control. Everything Atto creates is a normal Attoset
        building block you can inspect, edit or delete.
      </p>

      <h2>Refine it as your process changes</h2>
      <p>
        Operations never stand still. Ask Atto to add an approval step, split a
        status into two, or build a dashboard for leadership, and it updates
        the system in place instead of sending you instructions to follow.
      </p>

      <h2>Built on enterprise permissions</h2>
      <p>
        Atto works inside the same role-based access controls as the rest of
        the platform. It only sees and changes what the person asking is
        allowed to, and its changes are recorded in the audit trail. You can
        read more on our <Link href="/security">security page</Link>.
      </p>

      <h2>What comes next</h2>
      <p>
        Atto is the first step. We are now building custom AI agents: agents
        that monitor your systems and carry out tasks on your team&apos;s
        behalf. They are not available yet, and we will announce them here
        first.
      </p>
      <p>
        Want to try Atto on your own process?{" "}
        <Link href="/contact">Talk to our team</Link> or join the beta.
      </p>
    </>
  );
}
