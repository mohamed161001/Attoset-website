"use client";

import { m, useReducedMotion } from "framer-motion";
import { AppWindow } from "./app-window";
import { TableView } from "./table-view";
import { AttoPanel } from "./atto-panel";
import { MiniAreaChart } from "./charts";

/** Hero centerpiece: product window + floating Atto panel + chart card. */
export function HeroProduct() {
  const reduce = useReducedMotion();

  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <m.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <AppWindow title="Operations" tab="Table">
          <TableView />
        </AppWindow>
      </m.div>

      {/* Floating chart — top right */}
      <m.div
        className="absolute -right-4 -top-10 hidden w-56 lg:block"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <m.div {...float(0.4)}>
          <MiniAreaChart title="Throughput" value="1,284" delta="+18%" />
        </m.div>
      </m.div>

      {/* Floating Atto panel — bottom left */}
      <m.div
        className="absolute -bottom-14 -left-6 hidden w-72 lg:block"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <m.div {...float(0)}>
          <AttoPanel />
        </m.div>
      </m.div>
    </div>
  );
}
