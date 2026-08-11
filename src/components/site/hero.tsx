"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { LinePath } from "@/components/ui/skiper-ui/skiper19";
import { FocusTicker } from "@/components/site/focus-ticker";
import { Socials } from "@/components/site/socials";
import { portfolio } from "@/lib/portfolio";
import { strokeFor } from "@/lib/theme";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lines = [
    portfolio.headerTaglineOne,
    portfolio.headerTaglineTwo,
    portfolio.headerTaglineThree,
    portfolio.headerTaglineFour,
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-5 sm:px-8"
    >
      {/* Skiper 19's stroke, scaled down and pushed behind the type. Its native
          size is 1278×2319, so it is clipped by the section rather than sized. */}
      <div className="pointer-events-none absolute -top-40 -right-[35%] w-[120vw] opacity-30 sm:-right-[10%] sm:w-[70vw]">
        <LinePath
          className="h-auto w-full"
          scrollYProgress={scrollYProgress}
          stroke={strokeFor(resolvedTheme)}
          strokeWidth={14}
        />
      </div>

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative mx-auto w-full max-w-7xl"
      >
        <h1 className="t-display text-balance">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.08 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              // Only the name carries the bold weight; the surrounding lines
              // drop to 400 so the emphasis lands on one line instead of four.
              // Instrument Sans bottoms out at 400 — the family has no Light.
              className={`block ${
                i === 1 ? "font-bold" : "font-normal opacity-55"
              }`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8"
        >
          <FocusTicker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Socials />
          <span className="text-xs tracking-[0.2em] uppercase opacity-30">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
