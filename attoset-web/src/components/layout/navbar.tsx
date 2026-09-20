"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { nav, ctaHref, loginHref } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menu]);

  const linkCls = (active: boolean) =>
    cn(
      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
      active ? "text-ink" : "text-muted hover:text-ink",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-line/50 bg-white/55 shadow-[0_1px_12px_rgba(10,10,10,0.04)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-6">
            <Logo withWordmark={false} />

            <div ref={menuRef} className="hidden items-center gap-1 md:flex">
              {nav.map((item) => {
                const active = pathname === item.href;
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={linkCls(active)}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute inset-x-4 -bottom-px h-px bg-orange" />
                      )}
                    </Link>
                  );
                }
                const expanded = menu === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setMenu(item.label)}
                    onMouseLeave={() => setMenu(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setMenu(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      className={cn(
                        linkCls(pathname.startsWith(item.href)),
                        "inline-flex items-center gap-1",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <m.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full w-56 pt-2"
                        >
                          <div className="flex flex-col gap-0.5 rounded-2xl border border-line bg-white p-2 shadow-float">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setMenu(null)}
                                className="rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-warm hover:text-ink"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {loginHref && (
                <a
                  href={loginHref}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  Log in
                </a>
              )}
              <Link
                href="/contact"
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                Talk to sales
              </Link>
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
                <div key={item.label} className="flex flex-col">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-warm"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col border-l border-line pl-3 ml-4">
                      {item.children.slice(1).map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-4 py-2.5 text-[15px] text-muted hover:bg-warm hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-warm"
              >
                Talk to sales
              </Link>
              {loginHref && (
                <a
                  href={loginHref}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-warm"
                >
                  Log in
                </a>
              )}
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
