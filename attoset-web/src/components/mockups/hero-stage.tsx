"use client";

import { m, useReducedMotion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Avatar } from "./avatar";
import { HeroVideo } from "./hero-video";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatCard({
  className,
  delay = 0,
  float = 8,
  children,
}: {
  className?: string;
  delay?: number;
  float?: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={`absolute z-20 ${className ?? ""}`}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease }}
    >
      <m.div
        animate={reduce ? undefined : { y: [0, -float, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

function ChatBubble({
  color,
  name,
  text,
}: {
  color: string;
  name: string;
  text: React.ReactNode;
}) {
  return (
    <div className="flex max-w-[230px] items-start gap-2 rounded-2xl border border-line bg-white/95 p-2.5 shadow-float backdrop-blur">
      <Avatar name={name} color={color} size={28} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-ink">{name}</p>
        <p className="text-[11.5px] leading-snug text-ink-soft">{text}</p>
      </div>
    </div>
  );
}

/** Modern, collaborative hero stage: the product with live activity around it. */
export function HeroStage() {
  return (
    <div className="relative mx-auto w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl">
      {/* Centerpiece product demo — clips played back to back.
          CSS-only entrance at full opacity so it isn't gated behind JS. */}
      <div className="anim-rise-solid relative mx-auto aspect-[1920/1080] w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-float lg:max-w-4xl xl:max-w-5xl">
        <HeroVideo />
      </div>

      {/* Celebration from the left — rides above the video's top-left corner
          so it covers none of the workspace chrome underneath */}
      <FloatCard className="hidden -top-16 -left-6 sm:block sm:-left-16 lg:-left-24" delay={1}>
        <ChatBubble
          color="#FF512A"
          name="Maya H."
          text="Exceptions get flagged automatically now 🎉"
        />
      </FloatCard>

      {/* Message from the right — same height as the automation card on the
          left, pointing at the Average Chargeable Weight by Carrier chart */}
      <FloatCard className="hidden -bottom-3 -right-6 sm:block sm:-bottom-6 sm:-right-16 lg:-right-24" delay={1.4}>
        <ChatBubble
          color="#3B82F6"
          name="Sami K."
          text="Average Chargeable Weight by Carrier — exactly the breakdown we needed."
        />
      </FloatCard>

      {/* Mini automation — bottom left (scaled down on mobile) */}
      <FloatCard className="-bottom-3 -left-1 sm:-bottom-6 sm:-left-8 lg:-left-12" delay={1.7} float={6}>
        <div className="origin-bottom-left scale-[0.58] sm:scale-100">
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-white/95 px-3 py-2.5 shadow-float backdrop-blur">
          <span className="flex size-6 items-center justify-center rounded-lg bg-peach text-orange">
            <Zap className="size-3.5" strokeWidth={1.9} />
          </span>
          <span className="text-[11px] font-medium text-ink">On submit</span>
          <ArrowRight className="size-3 text-faint" />
          <span className="rounded-md bg-warm-2 px-1.5 py-0.5 text-[11px] font-medium text-ink-soft">Send update request</span>
        </div>
        </div>
      </FloatCard>
    </div>
  );
}
