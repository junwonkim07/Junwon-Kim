"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Plain class swap, no View Transition.
 *
 * This used Skiper 26's useThemeToggle, which runs the swap inside
 * document.startViewTransition with a circular mask wipe. That wipe snapshots
 * the whole page and composites an old and a new layer, and it flashed the
 * entire screen on every toggle. Three attempts at tuning it — the branch
 * condition, next-themes' disableTransitionOnChange, and the blend mode on the
 * transition pseudo-elements — each failed, and none could be observed here
 * because the animation runs on a rAF loop this environment throttles.
 *
 * Swapping the class outright cannot flash: there is no snapshot, no second
 * layer and no animation. Only the icon animates, which is local to this button.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
