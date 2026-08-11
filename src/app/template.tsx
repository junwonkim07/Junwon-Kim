"use client";

import { motion } from "framer-motion";

/**
 * Page transition.
 *
 * template.tsx — not layout.tsx — is the App Router's per-navigation boundary:
 * it remounts on every route change, so the entrance animation replays. This is
 * enter-only by design. An exit animation would need AnimatePresence wrapping
 * both trees, and the router unmounts the outgoing page before the next one
 * renders, so the exit would never get a chance to play.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
