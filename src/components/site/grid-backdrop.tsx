"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { useId } from "react";

/**
 * Hero backdrop: a fine SVG grid that dissolves toward the edges.
 *
 * Replaces Skiper 19's hand-drawn squiggle. This is the pattern most current
 * product sites reach for, and it earns that: it sits behind type without
 * competing, reads at any viewport because it tiles, and costs one <svg> with
 * no canvas and no animation loop.
 *
 * `currentColor` means it inherits the text colour, so it follows the theme
 * with no JS. The radial mask is what keeps it from looking like graph paper —
 * the grid is only ever fully visible in the middle and fades out before it
 * reaches an edge, so it never terminates on a hard line.
 */
export function GridBackdrop({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Pattern ids are document-global; two instances would otherwise collide.
  const id = useId().replace(/:/g, "");

  // Drifts slightly slower than the page, so the hero has depth on scroll.
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div
      aria-hidden
      style={{
        y,
        opacity,
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #000 25%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #000 25%, transparent 78%)",
      }}
      className="text-foreground pointer-events-none absolute inset-0 -z-10"
    >
      <svg className="h-full w-full" aria-hidden>
        <defs>
          <pattern
            id={`grid-${id}`}
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            {/* One L per tile draws the whole lattice: each cell contributes its
                own top and left edge. */}
            <path
              d="M72 0H0V72"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.13"
              strokeWidth="1"
            />
          </pattern>

          <pattern
            id={`dots-${id}`}
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            {/* A dot on every intersection: picks out the lattice without
                needing heavier lines. */}
            <circle
              cx="0"
              cy="0"
              r="1.4"
              fill="currentColor"
              fillOpacity="0.22"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
        <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
      </svg>
    </motion.div>
  );
}
