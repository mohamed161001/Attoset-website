import { Check, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CollaborationChat } from "@/components/mockups/collaboration-chat";

const points = [
  "Comment and @mention teammates right on any record",
  "Assign work, set owners, and track who's doing what",
  "Discuss in context — no more scattered chat threads",
  "Everyone works from one shared source of truth",
];

export function Collaboration() {
  return (
    <section
      id="collaboration"
      className="scroll-mt-24 border-y border-line bg-warm py-24 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Visual — bare, floating collaboration messages */}
          <Reveal>
            <div className="order-last lg:order-first">
              <CollaborationChat />
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>Collaboration</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-display text-balance sm:text-[2.75rem] sm:leading-[1.05]">
                Your whole team, working{" "}
                <span className="grad-text">in one place</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                Comments, mentions, assignments, and messages live right next to
                the work itself. Attoset keeps every conversation, decision, and
                hand-off connected to the record it belongs to — so context is
                never lost in another tool.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3.5">
              {points.map((p, i) => (
                <Reveal as="li" key={p} delay={0.12 + i * 0.06}>
                  <span className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-orange/10 text-orange">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] text-ink-soft">{p}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <div className="mt-9">
                <Button href="/product#collaboration" variant="primary">
                  See collaboration
                  <MessageSquare className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
