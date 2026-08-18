// Required by output: "export" — metadata routes are dynamic by default and
// cannot be emitted as files without this.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
