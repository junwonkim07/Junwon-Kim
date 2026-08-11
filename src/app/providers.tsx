"use client";

import { ThemeProvider } from "next-themes";

/**
 * attribute="class" is required: Tailwind v4 declares
 * `@custom-variant dark (&:is(.dark *))`, so every `dark:` utility keys off a
 * `.dark` class. next-themes defaults to writing `data-theme`, which silently
 * left every `dark:` utility dead on the 3.0 site.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // No disableTransitionOnChange: it injects a global `transition: none` rule
    // and forces a reflow to drop it again, which flashes in the middle of the
    // View Transition wipe that Skiper 26 runs. The wipe already covers the swap.
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
