import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LinkedInIcon } from "@/components/ui/social-icons";
import { ctaHref } from "@/lib/content";
import { Logo } from "./logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Atto AI", href: "/product#atto" },
      { label: "AI Agents", href: "/product#agents" },
      { label: "AttoForge", href: "/#autoforge" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-warm">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted">
              Intelligent work, from data to done. Build, manage, automate, and
              scale your operations in one unified platform.
            </p>
            <div className="flex items-center gap-2">
              {[
                {
                  icon: LinkedInIcon,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/attoset",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-line-strong bg-white text-muted transition-colors hover:border-ink/20 hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Waitlist / CTA strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-white p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-display">
              Bring your operations into one system.
            </h3>
            <p className="mt-1 text-sm text-muted">
              Start free — describe what you need and let Atto build it.
            </p>
          </div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Get started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-sm text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Attoset. All rights reserved.</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-orange" />
            </span>
            <span className="text-ink">Intelligent work,</span>{" "}
            <span className="grad-text">from data to done.</span>
          </span>
        </div>
      </Container>
    </footer>
  );
}
