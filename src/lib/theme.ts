/**
 * The accent ramp, mirrored from the CSS custom properties in globals.css.
 *
 * Canvas and SVG stroke colours are read by JavaScript (PixelCanvas parses hex
 * into RGB to interpolate), so they cannot come from a CSS variable. These two
 * lists are the JS-side source of truth and must stay in step with the
 * `--accent-*` values in globals.css.
 */
export const ACCENTS = {
  light: ["#4f46e5", "#9333ea", "#0891b2"],
  dark: ["#818cf8", "#c084fc", "#22d3ee"],
} as const;

/** Muted stroke for the scroll-driven line, one step back from the accents. */
export const STROKE = {
  light: "#6366f1",
  dark: "#8b8ff5",
} as const;

export type Mode = keyof typeof ACCENTS;

/*
 * One array instance per mode, created once.
 *
 * PixelCanvas keys its setup effect on a useCallback that depends on `colors`.
 * Returning a fresh array on every render gave that callback a new identity
 * each time, so the effect tore down and re-ran: the canvas cleared and refilled
 * from scratch. On a theme toggle that landed just as the View Transition
 * released its snapshot — the flash about a second after pressing the button.
 */
const LIGHT_ACCENTS: string[] = [...ACCENTS.light];
const DARK_ACCENTS: string[] = [...ACCENTS.dark];

export function accentsFor(mode: string | undefined): string[] {
  return mode === "light" ? LIGHT_ACCENTS : DARK_ACCENTS;
}

export function strokeFor(mode: string | undefined): string {
  return STROKE[mode === "light" ? "light" : "dark"];
}
