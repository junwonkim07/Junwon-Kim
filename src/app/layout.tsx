import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Cursor } from "@/components/site/cursor";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { portfolio } from "@/lib/portfolio";
import { ADSENSE_CLIENT, GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

// One typeface for the whole site. Archivo replaced Instrument Sans because its
// variable axis covers the full 100–900 range: Instrument Sans bottoms out at
// 400, so Thin and Light were simply unavailable. Same grotesque genre, so the
// switch costs little in feel. No `weight` is passed, which keeps the whole axis
// rather than pinning single instances.
const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

// No monospace face anywhere: JetBrains Mono and Space Mono both read as
// developer-default. Dates and numbers use the body sans with tabular figures,
// which keeps digits aligned without a second typeface.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${portfolio.name} — ${portfolio.headerTaglineOne}`,
    template: `%s — ${portfolio.name}`,
  },
  description: portfolio.aboutpara.slice(0, 160),
  keywords: [
    "Junwon Kim",
    "portfolio",
    "competitive programming",
    "machine learning",
    "computer vision",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: portfolio.name,
    images: ["/images/logo.svg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // No h-full on <html>: it pins the root box to the viewport while the body
      // overflows it, and Lenis derives its scroll limit from those dimensions —
      // the last screen, including the footer, became unreachable.
      className={`${archivo.variable} antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        {/*
          next/script rather than raw <head> tags: AdSense rewrites its own
          script element on load, which React counts as a hydration mismatch
          when the tag is part of the rendered tree. Next injects these outside
          it. afterInteractive keeps them off the critical path.
        */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        <Script
          id="adsbygoogle"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Providers>
          <SmoothScroll />
          {portfolio.showCursor && <Cursor />}
          <Header />
          {/* Header is fixed, so content clears it here rather than in each page. */}
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
