import Image from "next/image";
import Link from "next/link";
import { fullAddress, nav, site, whatsappHref } from "@/config/site";
import { HourRule } from "@/components/ui";
import Year from "@/components/Year";

const legal = [
  { href: "/warranty", label: "Warranty" },
  { href: "/terms", label: "Terms and conditions" },
  { href: "/privacy", label: "Privacy policy" },
];

export default function Footer() {
  const { contact } = site;
  return (
    <footer className="on-night bg-night text-white">
      <HourRule night />
      <div className="container-x grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Image src="/brand/logo-white.png" alt={`${site.name} Nigeria`} width={894} height={270} sizes="140px" className="h-10 w-auto" />
          <p className="mt-5 max-w-[34ch] text-moon">{site.tagline}, from 1 kVA homes to 100 kVA commercial sites.</p>
          <address className="mt-6 not-italic text-moon">
            <span className="block text-white">{site.legalName}</span>
            {fullAddress()}
          </address>
        </div>

        <div>
          <h2 className="chart-label text-moon">Contact</h2>
          <ul className="mt-4 space-y-2">
            {contact.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="hover:underline">{p.display}</a>
                <span className="block text-sm text-moon">{p.label}</span>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:underline">{contact.email}</a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:underline">
                WhatsApp
              </a>
            </li>
          </ul>
          {contact.hours.confirmed ? (
            <>
              <h2 className="chart-label mt-6 text-moon">Hours</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {contact.hours.value.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.time}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <nav aria-label="Footer">
          <h2 className="chart-label text-moon">Pages</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:underline">{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="chart-label text-moon">Policies</h2>
          <ul className="mt-4 space-y-2">
            {legal.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:underline">{n.label}</Link></li>
            ))}
          </ul>
          <h2 className="chart-label mt-6 text-moon">Follow</h2>
          <ul className="mt-4 space-y-2">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-night-rule">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-moon sm:flex-row sm:justify-between">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
            {site.rcNumber.value ? ` RC ${site.rcNumber.value}.` : null}
          </p>
          <p>{site.motto}.</p>
        </div>
      </div>
    </footer>
  );
}
