"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Spring feel taken from Skiper 61. That component's exports are demo boxes with
// their own background and a fixed 500px frame, so the viewport-wide cursor is
// implemented here rather than reused from it.
const SPRING = { mass: 0.1, damping: 10, stiffness: 131 };

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, opacity]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y, opacity }}
      className="pointer-events-none fixed top-0 left-0 z-[60] -ml-2 -mt-2 size-4 rounded-full bg-fuchsia-400/70 mix-blend-difference"
    />
  );
}
