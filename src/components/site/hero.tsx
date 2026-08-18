"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FocusTicker } from "@/components/site/focus-ticker";
import { GridBackdrop } from "@/components/site/grid-backdrop";
import { Socials } from "@/components/site/socials";
import { portfolio } from "@/lib/portfolio";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Weight is the whole composition here: the name sits at 700 and every other
  // line falls away below it. Archivo carries the full 100–900 axis, so Thin and
  // Light are real weights rather than faked with opacity.
  const lines = [
    { text: portfolio.headerTaglineOne, weight: "font-thin" }, // 100
    { text: portfolio.headerTaglineTwo, weight: "font-bold" }, // 700
    { text: portfolio.headerTaglineThree, weight: "font-extralight" }, // 200
    { text: portfolio.headerTaglineFour, weight: "font-light" }, // 300
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-5 sm:px-8"
    >
      <GridBackdrop scrollYProgress={scrollYProgress} />

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative mx-auto w-full max-w-7xl"
      >
        <h1 className="t-display text-balance">
          {lines.map((line, i) => (
            <motion.span
              key={line.text}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.08 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`block ${line.weight}`}
            >
              {line.text}
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
