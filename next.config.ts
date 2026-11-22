import type { NextConfig } from "next";

/**
 * Redirect plan
 * 1. www.reohobenergy.com → reohobenergy.com (also set the apex as primary domain in Vercel).
 * 2. Old Laravel URLs → their new homes, so existing links and search results keep working.
 */
const oldUrlRedirects: { source: string; destination: string }[] = [
  { source: "/solar-panels", destination: "/products-and-services#power-systems" },
  { source: "/inverters", destination: "/products-and-services#power-systems" },
  { source: "/batteries", destination: "/products-and-services#power-systems" },
  { source: "/charging-station", destination: "/products-and-services#ev-charging" },
  { source: "/security-systems", destination: "/products-and-services#security-screening" },
  { source: "/payment-plan", destination: "/products-and-services#financing" },
  { source: "/training-program", destination: "/training" },
  { source: "/reohob-initiative", destination: "/partnership#initiative" },
  { source: "/about", destination: "/management" },
  { source: "/get-quote", destination: "/contact" },
  { source: "/contact-reohob", destination: "/contact" },
  { source: "/modelx/:path*", destination: "/products-and-services#ev-charging" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.reohobenergy.com" }],
        destination: "https://reohobenergy.com/:path*",
        permanent: true,
      },
      ...oldUrlRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/styleguide",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
