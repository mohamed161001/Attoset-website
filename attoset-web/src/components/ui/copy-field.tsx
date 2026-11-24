"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the value stays selectable.
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-line bg-warm px-4 py-3">
      <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-ink select-all">{value}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-line-strong bg-white px-3 text-xs font-medium text-ink transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
      >
        {copied ? <Check className="size-3.5 text-orange" strokeWidth={1.75} /> : <Copy className="size-3.5" strokeWidth={1.75} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
