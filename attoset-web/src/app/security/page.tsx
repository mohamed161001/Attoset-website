import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { CTA } from "@/components/sections/cta";
import { TrustStatus } from "@/components/sections/trust-status";
import { security } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Security",
  description:
    "Role-based access control, granular permissions, every action traced, human or AI, and data hosted in Europe for EU and UK customers, with no training on customer data.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title={
          <>
            Built for organizational{" "}
            <span className="grad-text">scale &amp; trust</span>
          </>
        }
        description="Attoset is designed for enterprise-level security, so your most sensitive operations stay protected and compliant."
      />

      <section className="pb-6 sm:pb-8">
        <Container>
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-white">
                <ShieldCheck className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Secure by design
                </p>
                <p className="text-[13px] text-muted">
                  RBAC · Permissions · Full traceability · EU hosting
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {security.map((s, i) => (
              <Reveal key={s.title} delay={0.05 + i * 0.06}>
                <div className="flex h-full flex-col gap-3 bg-white p-7">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-peach-soft text-orange">
                    <s.icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <h2 className="font-display text-[15px] font-semibold text-ink">
                    {s.title}
                  </h2>
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <TrustStatus />

      <CTA />
    </>
  );
}
