import type { Metadata } from "next";
import { fullAddress, site } from "@/config/site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  // One shared social card (src/app/opengraph-image.tsx); child pages must list it explicitly
  // because defining openGraph on a page replaces the inherited images.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.legalName}: power that stays on, day and night` };
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: site.legalName,
      url,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export function organizationJsonLd() {
  const a = site.contact.address;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: `${site.url}/brand/logo-black.png`,
        email: site.contact.email,
        telephone: site.contact.phones[0].tel,
        sameAs: site.social.map((s) => s.href),
      },
      {
        "@type": ["LocalBusiness", "Electrician"],
        "@id": `${site.url}/#business`,
        name: site.legalName,
        description: site.description,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        logo: `${site.url}/brand/logo-black.png`,
        email: site.contact.email,
        telephone: site.contact.phones.map((p) => p.tel),
        parentOrganization: { "@id": `${site.url}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: a.street,
          addressLocality: a.city,
          addressRegion: a.region,
          addressCountry: a.countryCode,
        },
        geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
        areaServed: { "@type": "Country", name: "Nigeria" },
        // Hours are unconfirmed; only published once confirmed.
        ...(site.contact.hours.confirmed
          ? {
              openingHours: site.contact.hours.value.map((h) => `${h.days} ${h.time}`),
            }
          : {}),
        sameAs: site.social.map((s) => s.href),
        knowsAbout: [
          "Solar power systems",
          "Inverters",
          "Battery storage",
          "EV charging",
          "Security screening equipment",
          "EPC",
        ],
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
      },
    ],
  };
}
