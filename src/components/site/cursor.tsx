"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { SPRING as SKIPER_SPRING } from "@/components/ui/skiper-ui/skiper61";

// Skiper 61's spring, imported rather than restated. Its own exports are fixed
// 500px demo boxes with their own background, so the viewport-wide cursor is
// built here — but the tuning comes from the source. Stiffer, so the disc
// tracks the pointer closely instead of trailing behind it.
const SPRING = { ...SKIPER_SPRING, damping: 16, stiffness: 500 };

/**
 * Replaces the system cursor rather than decorating it: `cursor: none` goes on
 * the document only once this is actually running, and is removed on cleanup,
 * so a visitor is never left with no pointer at all. Skipped entirely on coarse
 * pointers and under reduced motion, where the native cursor stays.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, { mass: 0.1, damping: 15, stiffness: 200 });

  useEffect(() => {
    // any-pointer, not pointer. `pointer` describes only the *primary* input,
    // so a touchscreen laptop reports coarse even with a mouse plugged in and
    // the cursor never appeared. `any-pointer: fine` is true whenever some
    // precise input exists, which is the actual condition for wanting this.
    const finePointer = window.matchMedia("(any-pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, opacity]);

  if (!enabled) return null;

  return (
    /*
     * One solid disc. `difference` against a white fill inverts whatever sits
     * underneath, so the cursor reads on both themes and over images without
     * needing a colour of its own — and the partial alpha keeps the inversion
     * from being a hard punch-out.
     */
    <motion.div
      aria-hidden
      style={{ x, y, opacity }}
      className="pointer-events-none fixed top-0 left-0 z-[60] -mt-3 -ml-3 size-6 rounded-full bg-white/85 mix-blend-difference"
    />
  );
}
