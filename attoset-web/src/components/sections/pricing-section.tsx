"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  platformPlans,
  platformIncludes,
  useCaseLabels,
  seatTypes,
  showPrices,
  pricesProvisional,
  quoteEndpoint,
  quoteEmail,
  monthlyRate,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

const plural = (n: number, name: string) =>
  `${n} ${name.toLowerCase()}${n === 1 ? "" : "s"}`;

/** Stands in for a plan whose price is not set yet. */
const PENDING = "In the works";

/** Figures are hidden entirely when showPrices is off. */
function Price({
  amount,
  cadence,
  suffix,
  small,
}: {
  amount: number | null;
  cadence?: string;
  suffix?: string;
  small?: boolean;
}) {
  const size = small ? "text-[21px]" : "text-[26px]";
  if (!showPrices) return null;
  if (amount === null) {
    return (
      <p className="mt-1.5 flex items-end">
        <span
          className={cn(
            "font-display font-bold leading-none tracking-display text-ink",
            size,
          )}
        >
          {PENDING}
        </span>
      </p>
    );
  }
  return (
    <p className="mt-1.5 flex items-end gap-1.5">
      <span
        className={cn(
          "font-display font-bold leading-none tracking-display text-ink",
          size,
        )}
      >
        {money(amount)}
      </span>
      {cadence && (
        <span className="text-[12.5px] text-faint">
          {cadence}
          {suffix}
        </span>
      )}
    </p>
  );
}

/** One of the two things you pay for, numbered so the pairing reads at a glance. */
function StepHeading({
  step,
  title,
  note,
  children,
  aside,
}: {
  step: number;
  title: string;
  note: string;
  children?: string;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[12px] font-bold text-white">
          {step}
        </span>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        <span className="text-[13px] text-muted">{note}</span>
        {aside && <div className="ml-auto">{aside}</div>}
      </div>
      {children && (
        <p className="mt-1 max-w-3xl pl-9 text-[14px] leading-relaxed text-muted">
          {children}
        </p>
      )}
    </Reveal>
  );
}

function Stepper({
  label,
  value,
  step,
  min,
  onChange,
}: {
  label: string;
  value: number;
  step: number;
  min: number;
  onChange: (n: number) => void;
}) {
  const clamp = (n: number) => Math.max(min, Math.min(5000, n));
  const btn =
    "flex size-7 items-center justify-center rounded-md border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white";
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        aria-label={`Fewer: ${label}`}
        className={btn}
      >
        <Minus className="size-3.5" />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={5000}
        aria-label={label}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10) || min))}
        className="w-12 rounded-md border border-white/20 bg-transparent py-1 text-center font-display text-[14px] font-semibold text-white [appearance:textfield] focus:border-white/50 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        aria-label={`More: ${label}`}
        className={btn}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

/** Field keys the receiving table gets, derived from the seat names. */
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "_");

type QuotePayload = {
  email: string;
  plan: string;
  term: string;
  currency: string;
  /** null when the selected plan's price is still in the works. */
  platform: number | null;
  total: number;
  seats: Record<string, number>;
  summary: string[];
  submittedAt: string;
};

/**
 * Email capture for a formal quote. Posts to the Attoset form when an endpoint
 * is configured; falls back to a prefilled mail so a request is never lost.
 */
function QuoteRequest({ build }: { build: (email: string) => QuotePayload }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  if (sent) {
    return (
      <p className="flex items-center gap-2 text-[13px] text-white/70">
        <Check className="size-4 shrink-0 text-orange" strokeWidth={2.5} />
        We&apos;ll send the official quote to {email}.
      </p>
    );
  }

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = build(email);

    if (quoteEndpoint) {
      setBusy(true);
      try {
        const res = await fetch(quoteEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSent(true);
          return;
        }
      } catch {
        // fall through to mail so the request still reaches us
      } finally {
        setBusy(false);
      }
    }

    const body = [`Quote request from ${email}`, "", ...payload.summary].join(
      "\n",
    );
    window.location.href = `mailto:${quoteEmail}?subject=${encodeURIComponent(
      "Official quote request",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={send} className="flex w-full flex-wrap gap-2 sm:w-auto">
      <label htmlFor="quote-email" className="sr-only">
        Email for an official quote
      </label>
      <div className="flex w-full flex-wrap gap-2 sm:w-auto">
        <input
          id="quote-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for an official quote"
          className="h-9 min-w-[220px] flex-1 rounded-lg border border-white/20 bg-transparent px-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-white px-4 text-[13px] font-semibold text-ink transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          {busy ? "Sending…" : "Request official quote"}
          {!busy && (
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </form>
  );
}

export function PricingSection() {
  const [planIndex, setPlanIndex] = useState(() => {
    const featured = platformPlans.findIndex((b) => b.featured);
    return featured === -1 ? 0 : featured;
  });
  const [counts, setCounts] = useState<number[]>(() =>
    seatTypes.map((s) => s.defaultCount),
  );
  const [term, setTerm] = useState<"yearly" | "monthly">("yearly");
  const [showLimits, setShowLimits] = useState(false);

  const yearly = term === "yearly";
  const rate = (a: number) => (yearly ? a : monthlyRate(a));

  const plan = platformPlans[planIndex];
  const planRate = plan.amount === null ? null : rate(plan.amount);
  // Free seats have no input on the quote, so only paid seats are counted.
  const lines = seatTypes
    .map((seat, i) => ({
      seat,
      count: counts[i],
      subtotal: counts[i] * rate(seat.amount),
    }))
    .filter((l) => !l.seat.free);
  const total = (planRate ?? 0) + lines.reduce((sum, l) => sum + l.subtotal, 0);

  const freeSeatNames = seatTypes
    .filter((s) => s.free)
    .map((s, i) => (i === 0 ? `${s.name}s` : `${s.name.toLowerCase()}s`))
    .join(" and ");

  const setCount = (i: number, n: number) =>
    setCounts((prev) => prev.map((c, j) => (j === i ? n : c)));

  const summary = [
    `${plan.name} platform: ${
      planRate === null ? PENDING.toLowerCase() : `${money(planRate)} / month`
    }`,
    ...lines.map(
      (l) =>
        `${plural(l.count, l.seat.name)}: ${l.seat.free ? "free" : money(l.subtotal)}`,
    ),
    `Total: ${money(total)} per month${
      planRate === null ? " plus platform fee" : ""
    }, USD excluding VAT, ${
      yearly ? "yearly rate billed yearly" : "monthly rate"
    }`,
  ];

  const buildPayload = (email: string): QuotePayload => ({
    email,
    plan: plan.name,
    term,
    currency: "USD",
    platform: planRate,
    total,
    seats: Object.fromEntries(lines.map((l) => [slug(l.seat.name), l.count])),
    summary,
    submittedAt: new Date().toISOString(),
  });

  return (
    <section className="pb-4">
      <Container className="max-w-5xl">
        <StepHeading
          step={1}
          title="Seats"
          note="How many people you need"
          aside={
            showPrices ? (
              <div className="flex rounded-full border border-line bg-white p-0.5 text-[12.5px]">
                {(["yearly", "monthly"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTerm(t)}
                    aria-pressed={term === t}
                    className={cn(
                      "rounded-full px-3 py-1 font-medium capitalize transition-colors",
                      term === t
                        ? "bg-ink text-white"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : null
          }
        />

        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {seatTypes.map((seat, i) => (
            <Reveal key={seat.name} delay={(i % 4) * 0.05}>
              <div className="flex h-full flex-col rounded-xl border border-line bg-white p-3.5">
                <h3 className="font-display text-[14px] font-semibold text-ink">
                  {seat.name}
                </h3>
                {seat.free ? (
                  <p className="mt-1.5 font-display text-[21px] font-bold leading-none tracking-display text-orange">
                    Free
                  </p>
                ) : (
                  <Price
                    amount={rate(seat.amount)}
                    cadence={seat.cadence}
                    small
                  />
                )}
                <p className="mt-1.5 text-[12px] leading-snug text-muted">
                  {seat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <StepHeading
            step={2}
            title="Platform"
            note="How much machine you need"
          />
        </div>

        {/* Compact cards in one row; scrolls sideways when it does not fit. */}
        <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:px-0">
          {platformPlans.map((band, i) => {
            const selected = i === planIndex;
            return (
              <Reveal
                key={band.name}
                delay={i * 0.05}
                className="w-[200px] shrink-0 snap-start xl:w-auto xl:flex-1"
              >
                <button
                  type="button"
                  onClick={() => setPlanIndex(i)}
                  aria-pressed={selected}
                  className={cn(
                    "flex h-full w-full flex-col rounded-xl border bg-white p-3.5 text-left transition-colors",
                    selected
                      ? "border-orange shadow-card"
                      : "border-line hover:border-line-strong",
                  )}
                >
                  <div className="flex w-full items-center gap-1.5">
                    <h3 className="font-display text-[14px] font-semibold text-ink">
                      {band.name}
                    </h3>
                    {band.tags
                      ?.filter((_, j) => !(band.featured && j === 0))
                      .map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    {selected && (
                      <Check
                        className="ml-auto size-3.5 shrink-0 text-orange"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>

                  <Price
                    amount={band.amount === null ? null : rate(band.amount)}
                    cadence={band.cadence}
                    small
                  />

                  <p className="mt-1.5 line-clamp-2 min-h-[2lh] text-[12px] leading-snug text-muted">
                    {band.blurb}
                  </p>

                  <div className="mt-2.5 flex flex-col text-[11px] font-medium leading-snug text-ink-soft">
                    {band.useCases.map((u) => (
                      <span
                        key={u}
                        className={cn(u === "ppm" && "text-orange")}
                      >
                        {useCaseLabels[u]}
                      </span>
                    ))}
                  </div>

                  {showLimits && (
                    <dl className="mt-2.5 w-full text-[11.5px]">
                      {[
                        ...band.limits,
                        { label: "API calls", value: band.apiCalls ?? PENDING },
                      ].map((l) => (
                        <div
                          key={l.label}
                          className="flex items-baseline justify-between gap-2 border-b border-line/60 py-[2px] last:border-0"
                        >
                          <dt className="text-muted">{l.label}</dt>
                          <dd className="font-medium text-ink">{l.value}</dd>
                        </div>
                      ))}
                      <div className="mt-1 flex items-baseline justify-between gap-2 border-t border-line-strong pt-1">
                        <dt className="font-medium text-ink">AttoForge</dt>
                        <dd
                          className={cn(
                            "font-semibold",
                            band.attoForge === "No"
                              ? "font-medium text-faint"
                              : "text-orange",
                          )}
                        >
                          {band.attoForge}
                        </dd>
                      </div>
                    </dl>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-muted">
            <span>{platformIncludes}</span>
            <button
              type="button"
              onClick={() => setShowLimits((v) => !v)}
              aria-expanded={showLimits}
              className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {showLimits ? "Hide limits" : "Compare limits"}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  showLimits && "rotate-180",
                )}
              />
            </button>
          </div>
        </Reveal>

        {/* The quote: paid seats plus the platform, live. Free seats need no input. */}
        {showPrices && (
          <Reveal delay={0.1}>
            <div
              id="quote"
              className="mt-6 scroll-mt-24 rounded-xl bg-ink px-5 py-5 text-white sm:px-6"
            >
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                {seatTypes.map((seat, i) =>
                  seat.free ? null : (
                    <div key={seat.name}>
                      <p className="mb-1.5 text-[12px] text-white/60">
                        {seat.name}s · {money(rate(seat.amount))}
                      </p>
                      <Stepper
                        label={`${seat.name}s`}
                        value={counts[i]}
                        step={seat.stepBy}
                        min={seat.minCount}
                        onChange={(n) => setCount(i, n)}
                      />
                    </div>
                  ),
                )}
                <div className="pb-1.5 text-[12px] text-white/60">
                  + {plan.name} platform
                  <span className="block text-white">
                    {planRate === null ? PENDING : money(planRate)}
                  </span>
                </div>

                <div aria-live="polite" className="ml-auto text-right">
                  <p className="text-[12px] text-white/60">
                    {planRate === null ? "Seats per month" : "Per month"}
                  </p>
                  <p className="font-display text-[30px] font-bold leading-none tracking-display">
                    {money(total)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-4">
                <p className="text-[11.5px] leading-relaxed text-white/45">
                  {freeSeatNames} are free. {yearly ? "Yearly" : "Monthly"}{" "}
                  rates, USD excl. VAT
                  {pricesProvisional && ", provisional until January 2027"}.
                </p>
                <QuoteRequest build={buildPayload} />
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
