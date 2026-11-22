import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments (VERCEL_ENV=preview) are kept out of search engines.
  const isProd = (process.env.VERCEL_ENV ?? "production") === "production";
  return {
    rules: isProd
      ? [{ userAgent: "*", allow: "/", disallow: ["/api/", "/styleguide", "/training/confirmation"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
