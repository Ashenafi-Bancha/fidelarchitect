import type { MetadataRoute } from "next";
import { isLive, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Preview: keep every page out of search engines until the site goes live.
  if (!isLive) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
