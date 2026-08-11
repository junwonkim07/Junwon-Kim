"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { LinePath } from "@/components/ui/skiper-ui/skiper19";
import { Socials } from "@/components/site/socials";
import { strokeFor } from "@/lib/theme";

export function ResumeIntro({
  name,
  tagline,
  descriptionHtml,
}: {
  name: string;
  tagline: string;
  descriptionHtml: string;
}) {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-20 sm:px-8">
      <div className="pointer-events-none absolute -top-60 -right-[40%] w-[110vw] opacity-25 sm:-right-[15%] sm:w-[65vw]">
        <LinePath
          className="h-auto w-full"
          scrollYProgress={scrollYProgress}
          stroke={strokeFor(resolvedTheme)}
          strokeWidth={14}
        />
      </div>

      <motion.div style={{ y }} className="relative mx-auto max-w-5xl">
        <p className="t-eyebrow opacity-40">{name}</p>
        <h1 className="t-display mt-4">
          <TextRoll>Resume.</TextRoll>
        </h1>
        {/* Full-strength colour and 600 weight: this is the second-most
            important line on the page and was reading as muted body copy. */}
        <p className="t-lead mt-8 max-w-2xl">{tagline}</p>
        <div
          className="t-body mt-6 space-y-4 opacity-60 [&_strong]:font-semibold [&_strong]:opacity-100"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
        <Socials className="mt-10" />
      </motion.div>
    </section>
  );
}
