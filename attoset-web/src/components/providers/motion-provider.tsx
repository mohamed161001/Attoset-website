"use client";

import { LazyMotion } from "framer-motion";

// Lazily fetch framer-motion's feature set as a separate chunk after hydration.
const loadFeatures = () =>
  import("./motion-features").then((mod) => mod.default);

/**
 * Wraps the app so all `m.*` components share one lazily-loaded feature
 * bundle. `strict` forbids the heavyweight `motion.*` API — every animated
 * component must use `m.*`, which keeps the critical bundle small.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
