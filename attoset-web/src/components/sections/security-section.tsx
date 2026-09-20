import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { security } from "@/lib/content";

export function SecuritySection() {
  return (
    <section id="security" className="scroll-mt-24 py-24 sm:py-28">
      <Container>
        <div className="rounded-[2.5rem] border border-line bg-warm p-8 sm:p-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <Reveal>
                <Eyebrow>Enterprise security</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-display text-balance sm:text-[2.6rem] sm:leading-[1.05]">
                  Built for organizational scale & trust
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted">
                  Attoset is designed for enterprise-level security, so your most
                  sensitive operations stay protected and compliant.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-white">
                    <ShieldCheck className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Secure by design</p>
                    <p className="text-[13px] text-muted">RBAC · Permissions · Audit · Encryption</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <Link
                  href="/security"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange"
                >
                  How Attoset secures your data
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {security.map((s, i) => (
                <Reveal key={s.title} delay={0.1 + i * 0.06}>
                  <div className="flex h-full flex-col gap-3 bg-white p-6">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-peach-soft text-orange">
                      <s.icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-[15px] font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-muted">
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
