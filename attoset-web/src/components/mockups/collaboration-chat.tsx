"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Msg = {
  name: string;
  avatar: string;
  text: React.ReactNode;
  time: string;
  align?: "left" | "right";
};

const thread: Msg[] = [
  {
    name: "Maya H.",
    avatar: "/images/avatars/p1.jpg",
    text: "Can you review the Q3 onboarding flow before we ship it?",
    time: "9:41",
  },
  {
    name: "David O.",
    avatar: "/images/avatars/p2.jpg",
    align: "right",
    text: (
      <>
        On it. <span className="font-medium text-orange">@Lena</span> can you add the
        compliance step?
      </>
    ),
    time: "9:42",
  },
  {
    name: "Lena P.",
    avatar: "/images/avatars/p3.jpg",
    text: "Added it ✓ and assigned the follow-up to an agent.",
    time: "9:43",
  },
];

/** Bare, floating collaboration messages — no chrome, just the conversation. */
export function CollaborationChat() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? thread.length : 1);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCount((c) => (c >= thread.length ? 1 : c + 1));
    }, 1900);
    return () => clearInterval(id);
  }, [reduce]);

  const typing = !reduce && count < thread.length;

  return (
    <div className="flex flex-col gap-4 px-1 py-2">
      <AnimatePresence initial={false}>
        {thread.slice(0, count).map((msg) => {
          const right = msg.align === "right";
          return (
            <m.div
              key={msg.name}
              layout
              initial={reduce ? false : { opacity: 0, x: right ? 24 : -24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease }}
              className={`flex items-end gap-2.5 ${right ? "flex-row-reverse" : ""}`}
            >
              <Image
                src={msg.avatar}
                alt=""
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full object-cover shadow-card"
              />
              <div className={`max-w-[78%] ${right ? "items-end text-right" : ""}`}>
                <div className={`mb-1 flex items-baseline gap-2 ${right ? "justify-end" : ""}`}>
                  <span className="text-[12px] font-semibold text-ink">{msg.name}</span>
                  <span className="font-mono text-[10px] text-faint">{msg.time}</span>
                </div>
                <div
                  className={
                    "inline-block rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-card " +
                    (right
                      ? "rounded-br-sm bg-ink text-white"
                      : "rounded-bl-sm bg-white text-ink-soft")
                  }
                >
                  {msg.text}
                </div>
              </div>
            </m.div>
          );
        })}
      </AnimatePresence>

      {/* Typing */}
      <AnimatePresence>
        {typing && (
          <m.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-2.5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warm-2 text-[11px] font-semibold text-faint">
              …
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-card">
              {[0, 1, 2].map((d) => (
                <m.span
                  key={d}
                  className="size-1.5 rounded-full bg-faint"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                />
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
