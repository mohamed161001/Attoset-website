"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function CursorPointer({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 2.5 L19 11.5 L12.2 12.8 L8.7 19.5 Z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A live multiplayer cursor that drifts along a looped path. */
function LiveCursor({
  name,
  color,
  from,
  to,
  delay,
}: {
  name: string;
  color: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
}) {
  return (
    <m.div
      className="absolute z-30 origin-top-left scale-75 sm:scale-100"
      initial={{ left: `${from.x}%`, top: `${from.y}%`, opacity: 0 }}
      animate={{
        left: [`${from.x}%`, `${to.x}%`, `${from.x}%`],
        top: [`${from.y}%`, `${to.y}%`, `${from.y}%`],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <CursorPointer color={color} />
      <span
        className="ml-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-card"
        style={{ background: color }}
      >
        {name}
      </span>
    </m.div>
  );
}

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
  avatar,
  name,
  text,
}: {
  avatar: string;
  name: string;
  text: React.ReactNode;
}) {
  return (
    <div className="flex max-w-[230px] items-start gap-2 rounded-2xl border border-line bg-white/95 p-2.5 shadow-float backdrop-blur">
      <Image
        src={avatar}
        alt=""
        width={28}
        height={28}
        className="size-7 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-ink">{name}</p>
        <p className="text-[11.5px] leading-snug text-ink-soft">{text}</p>
      </div>
    </div>
  );
}

/** Modern, collaborative hero stage: the product with live activity around it. */
export function HeroStage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl">
      {/* Centerpiece product screenshot — LCP element. CSS-only entrance at
          full opacity so the largest paint isn't gated behind JS. */}
      <div className="anim-rise-solid relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-float lg:max-w-4xl xl:max-w-5xl">
        <Image
          src="/images/app-table.webp"
          alt="An Attoset workspace — a data table beside live insight charts"
          width={1705}
          height={928}
          priority
          sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 896px, (min-width: 640px) 768px, 100vw"
          className="block h-auto w-full"
        />
        {/* Live cursors moving across the product */}
        {!reduce && (
          <>
            <LiveCursor name="Maya" color="#FF512A" from={{ x: 20, y: 30 }} to={{ x: 62, y: 64 }} delay={0.5} />
            <LiveCursor name="David" color="#0A0A0A" from={{ x: 72, y: 22 }} to={{ x: 38, y: 70 }} delay={2.4} />
          </>
        )}
      </div>

      {/* Floating dashboard card — top right (scaled down on mobile) */}
      <FloatCard className="-right-1 -top-3 sm:-right-8 sm:-top-8 lg:-right-10" delay={0.6} float={10}>
        <div className="origin-top-right scale-[0.58] sm:scale-100">
        <div className="w-52 rounded-2xl border border-line bg-white p-3.5 shadow-float">
          <p className="text-[10px] font-bold tracking-wide text-ink">Throughput</p>
          <p className="mt-1 text-xl font-bold text-ink">1,284</p>
          <svg viewBox="0 0 120 36" className="mt-1.5 h-9 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 30 C 16 26, 26 14, 40 16 C 56 18, 64 6, 82 7 C 98 8, 108 14, 120 4 L120 36 L0 36 Z" fill="url(#heroArea)" />
            <path d="M0 30 C 16 26, 26 14, 40 16 C 56 18, 64 6, 82 7 C 98 8, 108 14, 120 4" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        </div>
      </FloatCard>

      {/* Message from the left */}
      <FloatCard className="hidden top-16 -left-3 sm:block sm:-left-10 lg:-left-14" delay={1}>
        <ChatBubble
          avatar="/images/avatars/p1.jpg"
          name="Maya H."
          text="Approvals are automated now 🎉"
        />
      </FloatCard>

      {/* Message from the right */}
      <FloatCard className="hidden bottom-20 -right-3 sm:block sm:-right-12 lg:-right-16" delay={1.4}>
        <ChatBubble
          avatar="/images/avatars/p2.jpg"
          name="David O."
          text="Dashboard's looking great."
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
