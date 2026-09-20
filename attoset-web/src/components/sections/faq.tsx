"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { makeFaqSchema } from "@/lib/schema";

type FAQProps = {
  /** Question set to render. Defaults to the general site FAQ. */
  items?: { q: string; a: string }[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function FAQ({
  items = faqs,
  eyebrow = "FAQ",
  title = "Questions, answered",
  description = "The questions teams ask before they commit to a platform.",
}: FAQProps = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-warm py-24 sm:py-28">
      <JsonLd data={makeFaqSchema(items)} />
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={(i % 4) * 0.04}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[17px] font-medium text-ink">
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-all",
                        isOpen && "rotate-45 border-orange bg-orange text-white"
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-5 text-pretty text-[15px] leading-relaxed text-muted">
                          {f.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
