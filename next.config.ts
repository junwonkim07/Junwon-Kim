import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is prerendered end to end, so it ships as plain
  // files. The origin already runs a VPN panel and its proxy on ~500MB of free
  // memory; a Node server there would compete with paying traffic, and nginx
  // serving files costs effectively nothing.
  output: "export",

  // next/image's optimiser needs a server. Nothing here uses next/image — the
  // remote post images are plain <img> — but this keeps the export honest.
  images: { unoptimized: true },

  // Emit /blog/x/index.html rather than /blog/x.html so nginx resolves paths
  // without extra rewrite rules.
  trailingSlash: true,

  devIndicators: false,
};

export default nextConfig;
