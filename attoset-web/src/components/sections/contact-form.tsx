"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { quoteEmail } from "@/lib/content";

const inputCls =
  "w-full rounded-xl border border-line bg-warm px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition-colors focus:border-orange/50 focus:bg-white focus:ring-4 focus:ring-orange/10";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-white p-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-orange/10 text-orange">
          <Check className="size-7" strokeWidth={2.5} />
        </span>
        <h3 className="font-display text-2xl font-semibold text-ink">
          Thanks — we&apos;ll be in touch
        </h3>
        <p className="max-w-sm text-pretty text-muted">
          A member of our team will reach out shortly. In the meantime, feel free
          to explore the product.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">First name</label>
          <input required name="firstName" autoComplete="given-name" className={inputCls} placeholder="Jane" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">Last name</label>
          <input required name="lastName" autoComplete="family-name" className={inputCls} placeholder="Doe" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-ink-soft">Work email</label>
        <input required type="email" name="email" autoComplete="email" className={inputCls} placeholder="jane@company.com" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">Company</label>
          <input name="company" autoComplete="organization" className={inputCls} placeholder="Acme Inc." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">Team size</label>
          <select name="teamSize" className={cn(inputCls, "appearance-none")} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>1–10</option>
            <option>11–50</option>
            <option>51–200</option>
            <option>200+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-ink-soft">
          What would you like to build?
        </label>
        <textarea
          name="message"
          rows={4}
          maxLength={5000}
          className={cn(inputCls, "resize-none")}
          placeholder="Tell us about your operations and what you're hoping to streamline…"
        />
      </div>

      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="group disabled:opacity-60  mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange px-7 text-[15px] font-semibold text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600"
      >
        {busy ? "Sending…" : "Send message"}
        {!busy && (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
      {failed && (
        <p role="alert" className="text-center text-[13px] text-orange-600">
          Your message couldn&apos;t be sent. Please try again or email{" "}
          <a href={`mailto:${quoteEmail}`} className="underline underline-offset-2">
            {quoteEmail}
          </a>
          .
        </p>
      )}
      <p className="text-center text-[12px] text-faint">
        By submitting, you agree to be contacted about Attoset.
      </p>
    </form>
  );
}
