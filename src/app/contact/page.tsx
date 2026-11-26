import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { CallButton, JsonLd, PageHeader, WhatsAppButton } from "@/components/ui";
import { photos } from "@/content/photos";
import { fullAddress, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact us and get a quote",
  description: `Get a quote for a solar, inverter or battery system, EV charging, security screening, EPC or training. Call ${site.contact.phones[0].display}, WhatsApp us, or email ${site.contact.emails[0].email}. Head office on the Lekki–Epe Expressway, Lagos.`,
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = site;
  const mapQuery = encodeURIComponent(fullAddress());
  return (
    <>
      <PageHeader
        title="Contact us"
        photo={photos.electricianWiring}
        lede={`One form for every enquiry: a home system, a commercial project, EV charging, screening equipment or training. Phone and online consultations are free.`}
      />

      <div className="container-x grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <section aria-labelledby="form-title" data-hide-quick-actions>
          <h2 id="form-title" className="h-sub">Get a quote</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>

        <aside aria-labelledby="details-title" className="lg:border-l lg:border-ink lg:pl-10">
          <h2 id="details-title" className="h-sub">Talk to us</h2>
          <ul className="mt-6 divide-y divide-grid border-y border-grid">
            {contact.phones.map((p) => (
              <li key={p.tel} className="flex gap-4 py-4">
                <Phone aria-hidden className="mt-1 size-5 shrink-0 text-ink-3" />
                <div>
                  <a href={`tel:${p.tel}`} className="font-wide text-xl font-semibold hover:underline">{p.display}</a>
                  <p className="text-sm text-ink-3">{p.label}</p>
                </div>
              </li>
            ))}
            {contact.emails.map((e) => (
              <li key={e.email} className="flex gap-4 py-4">
                <Mail aria-hidden className="mt-1 size-5 shrink-0 text-ink-3" />
                <div className="min-w-0">
                  <a href={`mailto:${e.email}`} className="-my-2 inline-flex min-h-11 items-center font-semibold break-all hover:underline">{e.email}</a>
                  <p className="text-sm text-ink-3">{e.label}</p>
                </div>
              </li>
            ))}
            <li className="flex gap-4 py-4">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-ink-3" />
              <address className="not-italic">
                <span className="font-semibold">Head office</span>
                <br />
                {fullAddress()}
              </address>
            </li>
            {contact.hours.confirmed ? (
            <li className="flex gap-4 py-4">
              <Clock aria-hidden className="mt-1 size-5 shrink-0 text-ink-3" />
              <div>
                <p className="font-semibold">Working hours</p>
                <ul className="mt-1 text-ink-2">
                  {contact.hours.value.map((h) => (
                    <li key={h.days}>{h.days}: {h.time}</li>
                  ))}
                </ul>
              </div>
            </li>
            ) : null}
          </ul>

          <div className="mt-6 grid gap-3">
            <WhatsAppButton className="w-full" />
            <CallButton className="w-full" />
          </div>

          <h3 className="chart-label mt-8 text-ink-3">Follow us</h3>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section aria-label="Map" className="border-t border-grid">
        <MapEmbed query={mapQuery} label={fullAddress()} />
        <p className="container-x py-3 text-sm">
          <a className="inline-flex min-h-11 items-center underline" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </p>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.url}/contact`,
          about: { "@id": `${site.url}/#business` },
        }}
      />
    </>
  );
}
