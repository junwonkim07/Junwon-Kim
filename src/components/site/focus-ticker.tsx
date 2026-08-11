"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLoop } from "@/components/ui/skiper-ui/skiper62";
import { accentsFor } from "@/lib/theme";

const FOCUS = [
  "machine learning",
  "computer vision",
  "image processing",
  "decentralized systems",
];

/** Skiper 62's useLoop ticks a key on an interval; the phrase is derived from it. */
export function FocusTicker() {
  const { resolvedTheme } = useTheme();
  const { key } = useLoop(2600);
  const word = FOCUS[key % FOCUS.length];

  return (
    <p className="t-lead flex flex-wrap items-baseline gap-x-2">
      {/* The label recedes, the subject carries the weight and the accent. */}
      <span className="font-normal opacity-50">Currently working on</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.35 }}
          className="font-semibold"
          style={{ color: accentsFor(resolvedTheme)[0] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
