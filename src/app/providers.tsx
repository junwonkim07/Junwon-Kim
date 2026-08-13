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
    // disableTransitionOnChange is back on. It was removed because its global
    // `transition: none` rule and forced reflow flashed mid-way through the
    // View Transition wipe; that wipe is gone, so the conflict is gone with it.
    // Without this, every element carrying a colour transition animates between
    // the two palettes on each toggle — a flicker of its own.
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
