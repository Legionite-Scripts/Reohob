import Image from "next/image";
import Link from "next/link";
import "./home.css";
import HomeEffects from "@/components/home/HomeEffects";
import SolarDayDemo from "@/components/home/SolarDayDemo";
import PaymentEstimate from "@/components/home/PaymentEstimate";
import HomeQuoteForm from "@/components/home/HomeQuoteForm";
import { naira, site, whatsappHref } from "@/config/site";
import { trainingPackages } from "@/config/training";
import { partners } from "@/content/partners";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";

/**
 * Homepage, built to the designer's layout (index.html, Nov 2026). Styles live in ./home.css, scoped
 * under .hv. The site's own header and footer wrap it.
 */
export const metadata = pageMetadata({
  title: `${site.legalName} | Solar, inverter and battery systems in Lagos`,
  description:
    "Solar, inverter and battery systems designed and installed in Lagos, from 1 kVA homes to 100 kVA commercial sites. EV charging, security screening, EPC and engineering training. Free phone consultations.",
  path: "/",
});

const services = [
  {
    n: "02",
    title: "EV charging",
    body: "Charging infrastructure for homes, offices, estates and fleet depots: AC wall chargers, DC fast chargers and solar-paired options.",
    href: "/products-and-services#ev-charging",
  },
  {
    n: "03",
    title: "Security screening",
    body: "Equipment for facilities that screen people and baggage, including X-ray scanners, walk-through metal detectors and explosive trace detection.",
    href: "/products-and-services#security-screening",
  },
  {
    n: "04",
    title: "Engineering services",
    body: "Technical delivery for commercial and industrial projects: EPC, owner's engineering, OEM installation and project management.",
    href: "/products-and-services#engineering-services",
  },
];

const steps = [
  { num: "01 / DISCOVER", title: "Site survey", body: "We assess your power requirements, appliances, roof or ground space, existing equipment and installation conditions.", gets: "Site survey & audit report" },
  { num: "02 / DESIGN", title: "System design", body: "We determine the appropriate panels, inverter and battery capacity based on your load requirements and desired backup hours.", gets: "System design, preliminary BOQ & quotation" },
  { num: "03 / DELIVER", title: "Installation", body: `Our team handles setup, testing and commissioning. Lagos installations are typically completed within ${site.installation.lagosHours} after payment confirmation.`, gets: "Installed, tested system & handover" },
  { num: "04 / SUPPORT", title: "Ongoing support", body: "Our relationship doesn't end after installation. The same team provides warranty support, maintenance and technical assistance.", gets: "Warranty & after-sales support" },
];

const reasons = [
  { title: "Over a decade in business", body: "Experience supporting energy and technical projects across residential and commercial needs." },
  { title: "One team, end to end", body: "Consultation, assessment, system design, supply, installation and ongoing support coordinated by one engineering team." },
  { title: "From homes to commercial facilities", body: "Systems spanning 1 kVA home applications through to 100 kVA commercial requirements." },
  { title: "Professional installation and testing", body: "Installation, commissioning and handover designed to help you understand your system." },
  { title: "Warranty and after-sales support", body: "Technical assistance and maintenance support beyond the day your system is switched on." },
  { title: "Free phone and online consultations", body: "Start with a conversation about what you need to power, before deciding on a system." },
];

export default function HomePage() {
  const partner = partners.find((p) => p.confirmed);
  const { contact } = site;

  return (
    <div className="hv">
      <HomeEffects />

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-photo"
          style={{ objectPosition: photos.engineerCabling.focus }}
          src={photos.engineerCabling.src}
          alt={photos.engineerCabling.alt}
          fill
          priority
          sizes="100vw"
        />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Energy · Engineering · Infrastructure</p>
            <h1 id="hero-title">
              Power that stays on,
              <br />
              <em>day and night.</em>
            </h1>
            <p className="hero-lede">
              From homes and businesses to commercial facilities, we design, supply and install solar, inverter and
              battery systems built around the way you use power. One engineering team, from first consultation to
              ongoing support.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#contact">
                GET A QUOTE <span aria-hidden>↗</span>
              </a>
              <a className="btn btn-ghost" href="#services">
                EXPLORE OUR SOLUTIONS <span aria-hidden>↘</span>
              </a>
            </div>
            <p className="hero-note">Free phone and online consultations.</p>
          </div>
        </div>
        <div className="wrap hero-bottom">
          <div className="hero-stat">
            <strong>10+ yrs</strong>
            <span>In business<small>Engineering experience</small></span>
          </div>
          <div className="hero-stat">
            <strong>1–100 kVA</strong>
            <span>System range<small>Homes to commercial sites</small></span>
          </div>
          <div className="hero-stat">
            <strong>{site.installation.lagosHours.replace(" hours", " h").replace(/ to /, "–")}</strong>
            <span>Lagos installations<small>After payment confirmation</small></span>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="wrap intro reveal" aria-labelledby="intro-title">
        <div className="intro-media">
          <p className="intro-mark">01 / THE REOHOB APPROACH</p>
          <div className="intro-photo">
            <Image src={photos.fieldEngineer.src} alt={photos.fieldEngineer.alt} fill sizes="(min-width: 800px) 460px, 100vw" style={{ objectPosition: photos.fieldEngineer.focus }} />
          </div>
        </div>
        <div>
          <h2 id="intro-title">Power is essential. Engineering it properly makes all the difference.</h2>
          <p>
            Good energy systems start with understanding what you need to power. We bring the right expertise,
            equipment and installation support together to deliver solutions that work for your space and your
            operations.
          </p>
          <a className="text-link" href="#process">
            A considered process <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section services" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 id="services-title">
                One engineering team.
                <br />
                Every step covered.
              </h2>
            </div>
            <p>
              From the first site assessment to commissioning and ongoing technical support, our work is built around
              dependable outcomes, not equipment alone.
            </p>
          </div>
          <div className="service-grid">
            <Link className="service-feature reveal" href="/products-and-services#power-systems">
              <Image className="feature-img" src={photos.roofSky.src} alt="" fill sizes="(min-width: 800px) 55vw, 100vw" />
              <span className="service-number">01 / ENERGY SYSTEMS</span>
              <div>
                <h3>Solar, inverter &amp; battery systems.</h3>
                <p>
                  Power designed around your everyday needs. Integrated systems for homes, offices, businesses and
                  commercial facilities.
                </p>
                <div className="service-tags">
                  <span>RESIDENTIAL</span>
                  <span>COMMERCIAL</span>
                  <span>1–100 kVA</span>
                </div>
                <strong className="mono">
                  Explore energy solutions <span aria-hidden>↗</span>
                </strong>
              </div>
            </Link>
            <div className="service-stack">
              {services.map((s, i) => (
                <Link key={s.n} className={`service-row reveal ${i < 2 ? "delay-1" : "delay-2"}`} href={s.href}>
                  <span className="service-number">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                  <span className="arr" aria-hidden>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solar by day, batteries by night ── */}
      <section className="section solar" id="solar" aria-labelledby="solar-title">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Energy, explained</p>
              <h2 id="solar-title">
                Solar by day.
                <br />
                Batteries by night.
              </h2>
            </div>
            <p>
              A well-designed system works as one: capturing energy, storing what you need and helping keep essential
              loads running when the grid goes off.
            </p>
          </div>
          <div className="solar-layout">
            <div className="solar-copy reveal">
              <h3>The sun works during the day. Your batteries take over at night.</h3>
              <p>
                Solar panels capture sunlight and power your building while charging your batteries. When the sun goes
                down or the grid goes off, stored energy can help keep your essential appliances running.
              </p>
              <div className="solar-points">
                <div className="solar-point">
                  <b>01</b>
                  <span><strong>Daylight</strong>: panels generate electricity for your building and charge the battery.</span>
                </div>
                <div className="solar-point">
                  <b>02</b>
                  <span><strong>Evening</strong>: stored energy supports your selected loads after sunset.</span>
                </div>
                <div className="solar-point">
                  <b>03</b>
                  <span><strong>Overnight</strong>: the inverter manages the supply from your battery bank.</span>
                </div>
              </div>
            </div>
            <SolarDayDemo />
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section process" id="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Our process</p>
              <h2 id="process-title">
                From the first conversation
                <br />
                to power on.
              </h2>
            </div>
            <p>
              Every project starts with understanding what you need. Our engineers work with you through each stage to
              ensure your system is properly designed, installed and supported.
            </p>
          </div>
          <ol className="process-line">
            {steps.map((s, i) => (
              <li key={s.title} className={`process-step reveal ${i === 1 ? "delay-1" : i === 2 ? "delay-2" : ""}`}>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="deliver">
                  You receive
                  <br />
                  {s.gets}
                </p>
              </li>
            ))}
          </ol>
          <div className="process-cta">
            <a className="btn btn-dark" href="#contact">
              START YOUR PROJECT <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Payment plans ── */}
      <section className="section payment" id="payment" aria-labelledby="payment-title">
        <div className="wrap payment-layout">
          <div className="payment-copy reveal">
            <p className="eyebrow">Making power accessible</p>
            <h2 id="payment-title">A better way to plan your power investment.</h2>
            <p>
              A reliable power system is an investment in your comfort and productivity. Eligible salary earners,
              business owners and companies can spread the cost of a system over {site.financing.minMonths}–
              {site.financing.maxMonths} months, subject to verification.
            </p>
            <Link className="text-link" href="/products-and-services#financing">
              Understand our payment plans <span aria-hidden>↗</span>
            </Link>
          </div>
          <PaymentEstimate />
        </div>
      </section>

      {/* ── Training ── */}
      <section className="section training" id="training" aria-labelledby="training-title">
        <div className="wrap training-layout">
          <div className="training-photo reveal">
            <Image src={photos.trainingHandsOn.src} alt={photos.trainingHandsOn.alt} fill sizes="(min-width: 800px) 45vw, 100vw" style={{ objectPosition: photos.trainingHandsOn.focus }} />
            <p className="photo-caption">Learn by understanding the work</p>
          </div>
          <div className="training-copy reveal delay-1">
            <p className="eyebrow">Learn · Build · Install</p>
            <h2 id="training-title">Build practical skills in solar installation.</h2>
            <p>
              Learn how solar and inverter systems are designed and installed through practical training with
              experienced engineers. Whether you&apos;re starting out or building an installation business, our
              programmes help you develop relevant technical skills.
            </p>
            <ul className="training-list">
              {trainingPackages.map((p) => (
                <li key={p.id} className="training-item">
                  <div>
                    <b>{p.short}</b>
                    <small>{p.duration}</small>
                  </div>
                  <strong>{naira(p.price)}</strong>
                </li>
              ))}
            </ul>
            <div className="training-actions">
              <Link className="btn btn-dark" href="/training#register">
                ENROL FOR TRAINING <span aria-hidden>↗</span>
              </Link>
              <Link className="text-link" href="/training#outline">
                Ask about programmes <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partnership ── */}
      <section className="partner" id="partnership" aria-labelledby="partner-title">
        <div className="wrap partner-layout">
          <div className="reveal">
            <p className="eyebrow">Partnerships</p>
            <h2 id="partner-title">Stronger solutions through the right partnerships.</h2>
            <p>
              We work with technology providers and industry partners to bring dependable equipment and engineering
              solutions closer to the people and organisations that need them. Talk to us about distribution, project
              collaboration and business opportunities.
            </p>
            <Link className="btn" href="/partnership#enquiry">
              PARTNER WITH REOHOB <span aria-hidden>↗</span>
            </Link>
          </div>
          {partner ? (
            <div className="partner-proof reveal delay-1">
              <p className="mono">Technology partner</p>
              <strong className="partner-name">{partner.name}</strong>
              <small>{partner.kind}</small>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Why Reohob ── */}
      <section className="section why" id="why" aria-labelledby="why-title">
        <div className="wrap why-layout">
          <div className="why-title reveal">
            <p className="eyebrow">Why Reohob</p>
            <h2 id="why-title">More than equipment. Engineering you can count on.</h2>
            <p>Dependability comes from the decisions made before, during and after installation.</p>
          </div>
          <ol className="why-list">
            {reasons.map((r, i) => (
              <li key={r.title} className="why-item reveal">
                <span className="mono" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="quote" id="contact" aria-labelledby="quote-title" data-hide-quick-actions>
        <div className="wrap quote-layout">
          <div className="quote-copy reveal">
            <p className="eyebrow">Let&apos;s talk about your project</p>
            <h2 id="quote-title">Tell us what you need to keep running.</h2>
            <p>
              Whether you&apos;re powering a home, planning a commercial installation or exploring an engineering
              project, tell us what you have in mind. Our team will help you work out the right solution.
            </p>
            <div className="contact-lines">
              {contact.phones.map((ph) => (
                <a key={ph.tel} href={`tel:${ph.tel}`}>{ph.display}</a>
              ))}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                Talk to us on WhatsApp <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
          <HomeQuoteForm />
        </div>
      </section>
    </div>
  );
}
