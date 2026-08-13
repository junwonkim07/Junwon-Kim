"use client";

import { motion, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { accentsFor } from "@/lib/theme";

// Spring feel taken from Skiper 61. That component's exports are demo boxes with
// their own background and a fixed 500px frame, so the viewport-wide cursor is
// implemented here rather than reused from it.
const DOT = { mass: 0.1, damping: 14, stiffness: 900 };
const RING = { mass: 0.35, damping: 18, stiffness: 180 };

/**
 * Replaces the system cursor rather than decorating it: `cursor: none` goes on
 * the document only once this is actually running, and is removed on cleanup,
 * so a visitor is never left with no pointer at all. Skipped entirely on coarse
 * pointers and under reduced motion, where the native cursor stays.
 */
export function Cursor() {
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  const dotX = useSpring(0, DOT);
  const dotY = useSpring(0, DOT);
  const ringX = useSpring(0, RING);
  const ringY = useSpring(0, RING);
  const opacity = useSpring(0, { mass: 0.1, damping: 15, stiffness: 200 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
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
  }, [dotX, dotY, ringX, ringY, opacity]);

  if (!enabled) return null;

  const accent = accentsFor(resolvedTheme)[0];

  return (
    <>
      {/* Trailing ring: softer spring, so it lags and settles behind the dot. */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, opacity, borderColor: accent }}
        className="pointer-events-none fixed top-0 left-0 z-[60] -mt-4 -ml-4 size-8 rounded-full border"
      />
      {/* Leading dot: stiff spring, tracks the pointer almost exactly. */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, opacity, backgroundColor: accent }}
        className="pointer-events-none fixed top-0 left-0 z-[60] -mt-1 -ml-1 size-2 rounded-full"
      />
    </>
  );
}
