"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { nav, ctaHref } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-line/50 bg-white/55 shadow-[0_1px_12px_rgba(10,10,10,0.04)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-6">
            <Logo withWordmark={false} />

            <div className="hidden items-center gap-1 md:flex">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-4 -bottom-px h-px bg-orange" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Button href={ctaHref} variant="primary" size="sm">
                Join our waitlist
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </nav>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-line bg-white md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-warm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Button href={ctaHref} variant="primary" size="md">
                  Join our waitlist
                </Button>
              </div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
