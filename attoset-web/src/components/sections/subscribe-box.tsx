"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { quoteEmail } from "@/lib/content";
import { cn } from "@/lib/utils";

type State = "idle" | "sending" | "done" | "error";

/** "Get product updates" signup. Posts to /api/subscribe → Zoho Campaigns. */
export function SubscribeBox({ className }: { className?: string }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    // Lays out by its own width (container query), so it stacks in the narrow
    // article column and sits in one row on the wider Updates index.
    <div className={cn("@container", className)}>
      <div className="flex flex-col gap-6 rounded-3xl border border-line bg-warm p-7 sm:p-9 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-ink ring-1 ring-line">
            <Mail className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-display text-ink">
              Get product updates by email
            </h2>
            <p className="mt-1 max-w-sm text-pretty text-[15px] leading-relaxed text-muted">
              New releases and articles, about once a month. Unsubscribe anytime.
            </p>
          </div>
        </div>
  
        {state === "done" ? (
          <p className="flex items-center gap-2 text-[15px] font-medium text-ink">
            <span className="flex size-6 items-center justify-center rounded-full bg-orange/10 text-orange">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            You&apos;re subscribed.
          </p>
        ) : (
          <div className="w-full @3xl:max-w-sm">
            <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="subscribe-email" className="sr-only">
                Work email
              </label>
              <input
                id="subscribe-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="h-11 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-[15px] text-ink placeholder:text-faint outline-none transition-colors focus:border-orange/50 focus:ring-4 focus:ring-orange/10"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-black disabled:opacity-60"
              >
                {state === "sending" ? "Subscribing…" : "Subscribe"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            {state === "error" && (
              <p className="mt-2 px-2 text-[13px] text-muted">
                Signup isn&apos;t available right now. Email{" "}
                <a href={`mailto:${quoteEmail}`} className="text-ink underline underline-offset-2">
                  {quoteEmail}
                </a>{" "}
                and we&apos;ll add you.
              </p>
            )}
          </div>
        )}
      </div>
      </div>
    );
}
