import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating dev badge in the corner. It is development-only and
  // never shipped, but it sits over the page while working on layout.
  devIndicators: false,
};

export default nextConfig;
