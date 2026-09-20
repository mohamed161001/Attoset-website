"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  capacityBands,
  seatTypes,
  pricingRules,
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

/** Figures are hidden entirely when showPrices is off. */
function Price({
  amount,
  cadence,
  suffix,
}: {
  amount: number;
  cadence?: string;
  suffix?: string;
}) {
  if (!showPrices) return null;
  return (
    <p className="mt-1.5 flex items-end gap-1.5">
      <span className="font-display text-[26px] font-bold leading-none tracking-display text-ink">
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
  children: string;
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
      <p className="mt-1 max-w-3xl pl-9 text-[14px] leading-relaxed text-muted">
        {children}
      </p>
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
    "flex size-8 items-center justify-center rounded-lg border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white";
  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
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
        className="w-16 rounded-lg border border-white/20 bg-transparent py-1.5 text-center font-display text-[15px] font-semibold text-white [appearance:textfield] focus:border-white/50 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
  capacity: number;
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
      <p className="mt-5 flex items-center gap-2 border-t border-white/15 pt-4 text-[13px] text-white/70">
        <Check className="size-4 shrink-0 text-orange" strokeWidth={2.5} />
        On its way. We&apos;ll send the official quote to {email}.
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
    <form onSubmit={send} className="mt-5 border-t border-white/15 pt-4">
      <label htmlFor="quote-email" className="text-[12.5px] text-white/60">
        Add your email for an official quote.
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        <input
          id="quote-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-9 min-w-[200px] flex-1 rounded-lg border border-white/20 bg-transparent px-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-white px-4 text-[13px] font-semibold text-ink transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          {busy ? "Sending" : "Send it"}
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
    const featured = capacityBands.findIndex((b) => b.featured);
    return featured === -1 ? 0 : featured;
  });
  const [counts, setCounts] = useState<number[]>(() =>
    seatTypes.map((s) => s.defaultCount),
  );
  const [term, setTerm] = useState<"yearly" | "monthly">("yearly");
  const [showLimits, setShowLimits] = useState(false);

  const yearly = term === "yearly";
  const rate = (a: number) => (yearly ? a : monthlyRate(a));
  const suffix = yearly ? ", billed yearly" : "";

  const plan = capacityBands[planIndex];
  const planRate = rate(plan.amount);
  const lines = seatTypes.map((seat, i) => ({
    seat,
    count: counts[i],
    subtotal: counts[i] * rate(seat.amount),
  }));
  const total = planRate + lines.reduce((sum, l) => sum + l.subtotal, 0);

  const setCount = (i: number, n: number) =>
    setCounts((prev) => prev.map((c, j) => (j === i ? n : c)));

  const summary = [
    `${plan.name} capacity: ${money(planRate)} / month`,
    ...lines.map(
      (l) =>
        `${plural(l.count, l.seat.name)}: ${l.seat.free ? "free" : money(l.subtotal)}`,
    ),
    `Total: ${money(total)} per month, USD excluding VAT, ${
      yearly ? "yearly rate billed yearly" : "monthly rate"
    }`,
  ];

  const buildPayload = (email: string): QuotePayload => ({
    email,
    plan: plan.name,
    term,
    currency: "USD",
    capacity: planRate,
    total,
    seats: Object.fromEntries(lines.map((l) => [slug(l.seat.name), l.count])),
    summary,
    submittedAt: new Date().toISOString(),
  });

  return (
    <section className="pb-4">
      <Container>
        <StepHeading
          step={1}
          title="Capacity"
          note="How much machine you get"
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
        >
          What the platform covers. Adding people never moves it, and limits
          never cost seats.
        </StepHeading>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capacityBands.map((band, i) => {
            const selected = i === planIndex;
            return (
              <Reveal key={band.name} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setPlanIndex(i)}
                  aria-pressed={selected}
                  className={cn(
                    "flex h-full w-full flex-col rounded-xl border bg-white p-4 text-left transition-colors",
                    selected
                      ? "border-orange shadow-card"
                      : "border-line hover:border-line-strong",
                  )}
                >
                  <div className="flex w-full items-center gap-2">
                    <h3 className="font-display text-[14.5px] font-semibold text-ink">
                      {band.name}
                    </h3>
                    {band.tags?.map((t, j) => (
                      <span
                        key={t}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          band.featured && j === 0
                            ? "bg-peach text-orange"
                            : "bg-warm text-muted",
                        )}
                      >
                        {t}
                      </span>
                    ))}
                    {selected && (
                      <Check
                        className="ml-auto size-4 text-orange"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>

                  <Price
                    amount={rate(band.amount)}
                    cadence={band.cadence}
                    suffix={band.amount === 0 ? "" : suffix}
                  />

                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {band.blurb}
                  </p>

                  {showLimits && (
                    <dl className="mt-3 w-full text-[12.5px]">
                      {band.limits.map((l) => (
                        <div
                          key={l.label}
                          className="flex items-baseline justify-between gap-3 border-b border-line/60 py-[2.5px] last:border-0"
                        >
                          <dt className="text-muted">{l.label}</dt>
                          <dd className="font-medium text-ink">{l.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <button
            type="button"
            onClick={() => setShowLimits((v) => !v)}
            aria-expanded={showLimits}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[12.5px] font-medium text-faint transition-colors hover:bg-warm hover:text-ink"
          >
            {showLimits ? "Hide limits" : "Compare limits"}
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform",
                showLimits && "rotate-180",
              )}
            />
          </button>
        </Reveal>

        <div className="mt-6">
          <StepHeading step={2} title="Seats" note="How many people you need">
            Full rate for anyone who changes how the system works, reduced for
            operators, free for the rest.
          </StepHeading>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {seatTypes.map((seat, i) => (
            <Reveal key={seat.name} delay={(i % 4) * 0.05}>
              <div className="flex h-full flex-col rounded-xl border border-line bg-white p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className="font-display text-[14.5px] font-semibold text-ink">
                    {seat.name}
                  </h3>
                  {seat.free && (
                    <span className="font-display text-[14.5px] font-bold text-orange">
                      Free
                    </span>
                  )}
                </div>
                {!seat.free && (
                  <Price
                    amount={rate(seat.amount)}
                    cadence={seat.cadence}
                    suffix={suffix}
                  />
                )}
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {seat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The quote: the arithmetic of the two steps above, live. */}
        {showPrices && (
          <Reveal delay={0.1}>
            <div
              id="quote"
              className="mt-6 grid scroll-mt-24 gap-6 rounded-xl bg-ink px-6 py-6 text-white sm:px-7 lg:grid-cols-[1fr_auto] lg:gap-10"
            >
              <div>
                <h2 className="font-display text-[14.5px] font-semibold">
                  Your quote
                </h2>
                <p className="mt-1 text-[13px] text-white/60">
                  {plan.name} selected. Set your people and the total updates.
                </p>

                <div className="mt-4 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {[false, true].map((isFree) => (
                    <div key={String(isFree)} className="flex flex-col gap-4">
                      {seatTypes.map((seat, i) =>
                        Boolean(seat.free) !== isFree ? null : (
                          <div key={seat.name}>
                            <p className="mb-2 text-[12.5px] text-white/60">
                              {seat.name}s,{" "}
                              {seat.free ? (
                                <span className="text-orange">free</span>
                              ) : (
                                `${money(rate(seat.amount))} each`
                              )}
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
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:min-w-[300px]">
                <dl className="text-[13px]">
                  <div className="flex justify-between gap-4 py-1">
                    <dt className="text-white/60">{plan.name} capacity</dt>
                    <dd>{money(planRate)}</dd>
                  </div>
                  {lines.map((l) => (
                    <div
                      key={l.seat.name}
                      className="flex justify-between gap-4 py-1"
                    >
                      <dt className="text-white/60">
                        {plural(l.count, l.seat.name)}
                      </dt>
                      <dd className={cn(l.seat.free && "text-orange")}>
                        {l.seat.free ? "Free" : money(l.subtotal)}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div
                  aria-live="polite"
                  className="mt-3 flex items-baseline justify-between gap-4 border-t border-white/15 pt-3"
                >
                  <span className="text-[13px] text-white/60">Per month</span>
                  <span className="font-display text-[30px] font-bold leading-none tracking-display">
                    {money(total)}
                  </span>
                </div>
                <p className="mt-2 text-[11.5px] text-white/40">
                  USD, excluding VAT.
                </p>

                <QuoteRequest build={buildPayload} />
              </div>

              <p className="text-[11.5px] leading-relaxed text-white/40 lg:col-span-2">
                {yearly
                  ? "Yearly rates, two months free against monthly."
                  : "Monthly rates. Yearly saves two months."}{" "}
                USD, excluding VAT. Regional pricing for developing markets and
                a startup program may apply.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-xl border border-line bg-warm px-6 py-5">
            <h2 className="font-display text-[14.5px] font-semibold text-ink">
              Our approach
            </h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {pricingRules.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-orange"
                    strokeWidth={2.5}
                  />
                  <span className="text-[13px] leading-relaxed text-ink-soft">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {pricesProvisional && (
          <Reveal>
            <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-line bg-peach-soft px-4 py-3 text-[13.5px] leading-relaxed text-ink-soft">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-orange" />
              <span>
                Prices are provisional while Attoset is in closed beta. They are
                confirmed with the public beta in January 2027, along with
                add-ons, Atto allowances and a full feature comparison.
              </span>
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
