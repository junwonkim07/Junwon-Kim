"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useRef } from "react";

/**
 * Theme toggle with the browser's default View Transition cross-fade.
 *
 * This deliberately does NOT reproduce Skiper 26's wipe. That one masked the
 * incoming layer out to 350vmax and pushed the outgoing one to z-index -1, and
 * the two layers composited into a full-screen flash on every toggle. The
 * default cross-fade has no custom CSS at all: the browser fades one snapshot
 * into the other, which is the part that was never the problem.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const running = useRef(false);

  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";

    // Starting a transition while one is in flight aborts the first, and every
    // promise it owns rejects. Skip the animation instead.
    if (running.current || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    running.current = true;
    const transition = document.startViewTransition(() => setTheme(next));

    // ready, updateCallbackDone and finished are all created up front; any one
    // left without a handler surfaces as an unhandled rejection if aborted.
    transition.ready?.catch(() => {});
    transition.updateCallbackDone?.catch(() => {});
    transition.finished
      .catch(() => {})
      .finally(() => {
        running.current = false;
      });
  }, [isDark, setTheme]);

  return (
    <button
      type="button"
      onClick={toggle}
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
