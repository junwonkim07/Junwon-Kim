"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";

/**
 * Skiper 26's own ThemeToggleButton is a fixed black disc with a hardcoded
 * white/black SVG, so it reads as a foreign object on a dark page and cannot be
 * restyled. Only the hook is reused here — it still drives the View Transition
 * wipe — wrapped in a pill that inherits the site's colours.
 */
export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle({
    variant: "circle-blur",
    start: "top-right",
    blur: true,
  });

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="border-foreground/15 hover:border-foreground/40 hover:bg-foreground/5 relative grid size-9 place-items-center rounded-full border transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
