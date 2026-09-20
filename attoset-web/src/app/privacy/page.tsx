import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Attoset collects, uses, and protects your data across our intelligent Work Platform.",
  path: "/privacy",
});

const LAST_UPDATED = "September 7, 2026";

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <p>
        This Privacy Policy explains how Attoset (&ldquo;Attoset,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
        uses, discloses, and safeguards information when you visit
        attoset.com or use the Attoset Work Platform, including Atto
        and any AI agents built on the platform (together, the
        &ldquo;Service&rdquo;). By using the Service, you agree to the
        collection and use of information as described here.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information we collect",
    body: (
      <>
        <p>We collect a few categories of information:</p>
        <ul className="mt-4 flex flex-col gap-2.5 list-disc pl-5 marker:text-orange">
          <li>
            <span className="font-semibold text-ink">Account information</span> —
            name, work email, company, and password when you sign up or join
            the waitlist.
          </li>
          <li>
            <span className="font-semibold text-ink">Workspace content</span> —
            the databases, records, forms, workflows, and automations you or
            your organization create and store in Attoset.
          </li>
          <li>
            <span className="font-semibold text-ink">Usage data</span> — pages
            visited, features used, and general interaction data collected
            through cookies and analytics tools.
          </li>
          <li>
            <span className="font-semibold text-ink">AI interactions</span> —
            prompts and instructions you send to Atto or to custom AI agents,
            used to generate and execute the requested workflow or response.
          </li>
          <li>
            <span className="font-semibold text-ink">Device information</span> —
            IP address, browser type, and operating system for security and
            diagnostics.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "3. How we use information",
    body: (
      <ul className="flex flex-col gap-2.5 list-disc pl-5 marker:text-orange">
        <li>Provide, operate, and maintain the Service.</li>
        <li>
          Power Atto and AI agent features, including generating suggestions,
          automations, and executed actions you request.
        </li>
        <li>Authenticate accounts and enforce workspace permissions.</li>
        <li>Monitor, secure, and improve platform performance and reliability.</li>
        <li>Communicate product updates, security notices, and support responses.</li>
        <li>Comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "ai-features",
    title: "4. Atto and AI agents",
    body: (
      <p>
        Atto and custom AI agents process the workspace content and
        instructions needed to complete the tasks you assign them. This
        processing happens within your organization&apos;s permission
        boundaries — an agent only acts on data your workspace already grants
        it access to. We do not use customer workspace content to train
        foundation models shared across other customers.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "5. How we share information",
    body: (
      <>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul className="mt-4 flex flex-col gap-2.5 list-disc pl-5 marker:text-orange">
          <li>
            Infrastructure and sub-processors (hosting, email delivery,
            analytics) bound by confidentiality and data-processing
            agreements.
          </li>
          <li>Other members of your workspace, per the roles and permissions your organization configures.</li>
          <li>Authorities, where required by law or to protect Attoset&apos;s rights and users.</li>
          <li>A successor entity in the event of a merger, acquisition, or asset sale.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "6. Security",
    body: (
      <p>
        We apply enterprise-grade safeguards — encryption in transit and at
        rest, role-based access control, strict permission scoping, and audit
        trails — to protect data across the platform. No method of
        transmission or storage is completely secure, so we continually
        review and improve these controls.
      </p>
    ),
  },
  {
    id: "retention",
    title: "7. Data retention",
    body: (
      <p>
        We retain account and workspace data for as long as your account is
        active or as needed to provide the Service. If you close your
        account, we delete or anonymize your data within a reasonable period,
        except where retention is required for legal, security, or legitimate
        business purposes.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your rights and choices",
    body: (
      <p>
        Depending on your location, you may have the right to access,
        correct, export, or delete your personal information, or to object to
        or restrict certain processing. To exercise any of these rights,
        contact us at{" "}
        <a href="mailto:privacy@attoset.com" className="font-medium text-ink underline underline-offset-4 hover:text-orange">
          privacy@attoset.com
        </a>
        .
      </p>
    ),
  },
  {
    id: "cookies",
    title: "9. Cookies",
    body: (
      <p>
        We use essential and analytics cookies to operate the Service and
        understand how it&apos;s used. You can control cookies through your
        browser settings; disabling them may limit some functionality.
      </p>
    ),
  },
  {
    id: "children",
    title: "10. Children's privacy",
    body: (
      <p>
        The Service is intended for business use and is not directed at
        children. We do not knowingly collect personal information from
        children under 16.
      </p>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be reflected by an updated &ldquo;Last updated&rdquo; date above,
        and where appropriate, by additional notice.
      </p>
    ),
  },
  {
    id: "contact",
    title: "12. Contact us",
    body: (
      <p>
        Questions about this policy or your data? Reach us at{" "}
        <a href="mailto:privacy@attoset.com" className="font-medium text-ink underline underline-offset-4 hover:text-orange">
          privacy@attoset.com
        </a>{" "}
        or through our{" "}
        <a href="/contact" className="font-medium text-ink underline underline-offset-4 hover:text-orange">
          contact page
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 sm:pt-44">
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[460px] opacity-40" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Legal</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.03] tracking-display text-balance">
              Privacy <span className="grad-text">Policy</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted">
              Last updated: {LAST_UPDATED}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-white p-8 shadow-card sm:p-12">
            <div className="flex flex-col gap-10 text-[15px] leading-relaxed text-ink-soft">
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="font-display text-xl font-semibold tracking-display text-ink">
                    {s.title}
                  </h2>
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
