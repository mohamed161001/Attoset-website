"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-xl border border-line bg-warm px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition-colors focus:border-orange/50 focus:bg-white focus:ring-4 focus:ring-orange/10";

export function ContactForm() {
  const [sent, setSent] = useState(false);

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
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">First name</label>
          <input required className={inputCls} placeholder="Jane" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">Last name</label>
          <input required className={inputCls} placeholder="Doe" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-ink-soft">Work email</label>
        <input required type="email" className={inputCls} placeholder="jane@company.com" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">Company</label>
          <input className={inputCls} placeholder="Acme Inc." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-soft">Team size</label>
          <select className={cn(inputCls, "appearance-none")} defaultValue="">
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
          rows={4}
          className={cn(inputCls, "resize-none")}
          placeholder="Tell us about your operations and what you're hoping to streamline…"
        />
      </div>

      <button
        type="submit"
        className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange px-7 text-[15px] font-semibold text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600"
      >
        Send message
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      <p className="text-center text-[12px] text-faint">
        By submitting, you agree to be contacted about Attoset.
      </p>
    </form>
  );
}
