import Image from "next/image";
import Link from "next/link";
import { fullAddress, nav, site, whatsappHref } from "@/config/site";
import { serviceGroups } from "@/content/services";
import Year from "@/components/Year";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/warranty", label: "Warranty" },
];

/** Site footer, to the designer's layout (styles in globals.css under .site-footer). */
export default function Footer() {
  const { contact } = site;
  return (
    <footer className="site-footer">
      <div className="f-wrap">
        <div className="f-top">
          <div className="f-brand">
            <Image src="/brand/logo-white.png" alt={`${site.name} Nigeria`} width={894} height={270} sizes="140px" className="h-10 w-auto" />
            <p>Engineering dependable energy, charging and technical solutions for homes, businesses and industries.</p>
            <address>
              <strong>{site.legalName}</strong>
              {fullAddress()}
            </address>
          </div>

          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>Our services</h2>
            <ul>
              {serviceGroups.map((g) => (
                <li key={g.id}><Link href={`/products-and-services#${g.id}`}>{g.title}</Link></li>
              ))}
              <li><Link href="/products-and-services#financing">Payment plans</Link></li>
            </ul>
          </div>

          <div>
            <h2>Contact</h2>
            <ul>
              {contact.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                  <small>{p.label}</small>
                </li>
              ))}
              <li><a href={`mailto:${contact.email}`} className="break-all">{contact.email}</a></li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  WhatsApp <span aria-hidden>&nbsp;↗</span>
                </a>
              </li>
            </ul>
            {contact.hours.confirmed ? (
              <>
                <h2>Hours</h2>
                <ul>
                  {contact.hours.value.map((h) => (
                    <li key={h.days}><span>{h.days}: {h.time}</span></li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div>
            <h2>Follow</h2>
            <ul>
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="f-bottom">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
            {site.rcNumber.value ? ` RC ${site.rcNumber.value}.` : null}
          </p>
          <p>
            {legal.map((l, i) => (
              <span key={l.href}>
                {i ? " · " : ""}
                <Link href={l.href}>{l.label}</Link>
              </span>
            ))}
          </p>
          <p><strong>{site.motto}.</strong></p>
        </div>
      </div>
    </footer>
  );
}
