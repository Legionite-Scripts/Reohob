import Link from "next/link";
import { photos } from "@/content/photos";
import { ArrowRight } from "lucide-react";
import SectionNav from "@/components/SectionNav";
import SizingTiers from "@/components/SizingTiers";
import SystemDiagram from "@/components/SystemDiagram";
import FinanceCalculator from "@/components/FinanceCalculator";
import { ButtonLink, CloseBand, PageHeader, Photo, WhatsAppButton, buttonClass } from "@/components/ui";
import { financePlan, naira, site } from "@/config/site";
import {
  engineeringServices,
  evOfferings,
  powerComponents,
  securityAudiences,
  securityEquipment,
  supportServices,
} from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products and services",
  description:
    "Solar panels, inverters and batteries designed as one system (1–100 kVA), EV charger installation, security screening equipment, EPC, owner's engineer, OEM and project management services, and payment plans over 12 months.",
  path: "/products-and-services",
});

const sections = [
  { id: "power-systems", label: "Power systems" },
  { id: "ev-charging", label: "EV charging" },
  { id: "security-screening", label: "Security screening" },
  { id: "engineering-services", label: "Engineering services" },
  { id: "financing", label: "Payment plans" },
];

/** A photograph for each part of a power system. */
const componentPhotos: Record<string, (typeof photos)[keyof typeof photos]> = {
  panels: photos.panelCells,
  inverters: photos.inverterRow,
  batteries: photos.batteryBank,
};

const showRapiscan = site.flags.RAPISCAN_PARTNERSHIP_CONFIRMED || site.flags.SHOW_UNCONFIRMED_RAPISCAN;

export default function ProductsPage() {
  const { financing } = site;
  return (
    <>
      <PageHeader
        title="Products and services"
        photo={photos.redRoof}
        lede="Complete power systems for homes and businesses, EV charging, security screening, and the engineering services to deliver larger projects."
      >
        <ButtonLink href="/contact" variant="sun">Get a Quote</ButtonLink>
        <WhatsAppButton variant="night-outline" />
      </PageHeader>

      <div className="container-x lg:grid lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-14">
        {/* display:contents on phones lets the menu stick for the whole page, not just its own box */}
        <aside className="contents lg:block lg:py-16">
          <SectionNav items={sections} />
        </aside>

        <div className="min-w-0">
          {/* ── a. Power systems ── */}
          <section id="power-systems" aria-labelledby="power-title" className="scroll-mt-32 border-b border-grid py-14 sm:py-20">
            <h2 id="power-title" className="h-chapter">
              Home and business power systems
            </h2>
            <p className="prose-chart mt-5 text-lg text-ink-2">
              Solar panels, an inverter and a battery bank work as one system. The panels generate electricity from
              sunlight during the day, the inverter supplies your building and charges the batteries, and the batteries
              carry you through the night and through grid outages. We size all three together, so each part suits the
              others and your loads.
            </p>

            <div className="mt-10">
              <SystemDiagram />
            </div>

            <div className="mt-12 grid gap-10 xl:grid-cols-3 xl:gap-8">
              {powerComponents.map((c) => (
                <div key={c.id} className="border-t-2 border-ink pt-5">
                  <Photo photo={componentPhotos[c.id]} className="mb-5" ratio="aspect-[3/2]" sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 60vw, 100vw" />
                  <h3 className="font-semiwide text-2xl font-semibold">{c.name}</h3>
                  <p className="mt-2 text-ink-2">{c.role}</p>
                  <dl className="mt-4">
                    {c.specs.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-3 border-b border-grid py-2.5 text-[0.9375rem]">
                        <dt className="chart-label pt-0.5 text-ink-3">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="h-sub">What size do you need?</h3>
              <p className="mt-3 max-w-[62ch] text-ink-2">
                Pick the size closest to your building to see what it typically runs. Air conditioners, pumps and freezers
                decide the size more than anything else, so tell us about them when you ask for a quote.
              </p>
              <div className="mt-6">
                <SizingTiers />
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h3 className="h-sub">Already have equipment?</h3>
                <p className="mt-3 text-ink-2">Our engineers also work on systems we didn&apos;t supply.</p>
                <Photo photo={photos.roofSky} className="mt-6" ratio="aspect-[16/10]" sizes="(min-width: 1024px) 30vw, 100vw" />
              </div>
              <ul className="border-t border-grid">
                {supportServices.map((s) => (
                  <li key={s.label} className="border-b border-grid">
                    <Link
                      href={`/contact?service=${s.service}`}
                      className="group flex min-h-12 items-center justify-between gap-4 py-3 hover:bg-chart"
                    >
                      <span>{s.label}</span>
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── b. EV charging ── */}
          <section id="ev-charging" aria-labelledby="ev-title" className="scroll-mt-32 border-b border-grid py-14 sm:py-20">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="ev-title" className="h-chapter">EV charging</h2>
            </div>
            <p className="prose-chart mt-5 text-lg text-ink-2">
              We supply and install electric vehicle chargers for homes, offices, estates and fleet depots, along with the
              electrical work behind them: checking the building&apos;s supply, running a dedicated circuit with the right
              protection, and commissioning the charger. Installation and maintenance follow international standards.
            </p>
            <Photo photo={photos.evCharging} className="mt-10" ratio="aspect-[21/9]" sizes="(min-width: 1024px) 60vw, 100vw" />
            <div className="mt-10 grid gap-0 border-t border-grid md:grid-cols-3">
              {evOfferings.map((o) => (
                <div key={o.name} className="border-b border-grid py-6 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0">
                  <h3 className="font-semiwide text-xl font-semibold">{o.name}</h3>
                  <p className="mt-2 text-ink-2">{o.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact?service=ev" className={buttonClass("primary")}>Request EV charging</Link>
            </div>
          </section>

          {/* ── c. Security screening ── */}
          <section id="security-screening" aria-labelledby="sec-title" className="scroll-mt-32 border-b border-grid py-14 sm:py-20">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="sec-title" className="h-chapter">Security screening</h2>
            </div>
            <p className="prose-chart mt-5 text-lg text-ink-2">
              For organisations that need to screen people and bags at an entrance or checkpoint, we supply and install
              screening equipment and provide after-sales support.
              {showRapiscan ? (
                <>
                  {" "}We work mainly with equipment from Rapiscan Systems.{" "}
                </>
              ) : null}
            </p>

            <Photo photo={photos.securityCheck} className="mt-10" ratio="aspect-[21/9]" sizes="(min-width: 1024px) 60vw, 100vw" />
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h3 className="font-semiwide text-xl font-semibold">Who it&apos;s for</h3>
                <ul className="mt-4 border-t border-grid">
                  {securityAudiences.map((a) => (
                    <li key={a} className="border-b border-grid py-2.5">{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semiwide text-xl font-semibold">Equipment we supply and install</h3>
                <dl className="mt-4 border-t border-grid">
                  {securityEquipment.map((e) => (
                    <div key={e.name} className="border-b border-grid py-4">
                      <dt className="font-semibold">{e.name}</dt>
                      <dd className="mt-1 text-ink-2">{e.detail}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-ink-3">
                  Screening for people, baggage and vehicles. Tell us what you need to screen and we&apos;ll recommend
                  the equipment.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/contact?service=security" className={buttonClass("primary")}>Request security screening</Link>
            </div>
          </section>

          {/* ── d. Engineering services ── */}
          <section id="engineering-services" aria-labelledby="eng-title" className="scroll-mt-32 border-b border-grid py-14 sm:py-20">
            <h2 id="eng-title" className="h-chapter">Engineering services</h2>
            <p className="prose-chart mt-5 text-lg text-ink-2">
              For commercial and industrial projects, estates and investors: the same engineers who install our systems,
              on contract to deliver, oversee or manage yours.
            </p>
            <Photo photo={photos.engineersPlans} className="mt-10" ratio="aspect-[21/9]" sizes="(min-width: 1024px) 60vw, 100vw" />
            <div className="mt-10 space-y-0 border-t-2 border-ink">
              {engineeringServices.map((s) => (
                <article
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className="grid scroll-mt-32 gap-6 border-b border-grid py-10 last:border-b-0 lg:grid-cols-[10.5rem_1fr_1fr] lg:gap-8"
                >
                  <p aria-hidden className="font-wide text-5xl leading-none font-semibold text-ink">{s.code}</p>
                  <div>
                    <h3 id={`${s.id}-title`} className="font-semiwide text-2xl font-semibold">{s.name}</h3>
                    <p className="mt-3 text-ink-2">{s.description}</p>
                    <p className="mt-4"><span className="chart-label text-ink-3">For </span>{s.for}</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="chart-label text-ink-3">Typical deliverables</h4>
                    <ul className="mt-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="border-b border-grid py-2 text-[0.9375rem]">{d}</li>
                      ))}
                    </ul>
                    <Link href={`/contact?service=${s.id}`} className={buttonClass("outline", "mt-5 self-start")}>
                      Request this service<span className="sr-only">: {s.name}</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 grid gap-8 border-t-2 border-ink pt-8 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h3 className="h-sub">For engineers and procurement</h3>
                <p className="mt-3 text-ink-2">
                  The documents you can expect from a Reohob engineering job, so you can check the work as it goes.
                </p>
              </div>
              <div>
                <ul className="grid gap-x-6 sm:grid-cols-2">
                  {["Site survey and audit report", "Single-line diagram", "Preliminary and final BOQ", "Equipment datasheets", "Commissioning and test records", "As-built drawings and handover pack"].map((d) => (
                    <li key={d} className="flex items-center gap-3 border-b border-grid py-2.5">
                      <span aria-hidden className="size-2 shrink-0 bg-ink" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── e. Payment plans ── */}
          <section id="financing" aria-labelledby="fin-title" className="scroll-mt-32 py-14 sm:py-20">
            <h2 id="fin-title" className="h-chapter">Payment plans</h2>
            <div className="mt-8 grid gap-10 *:min-w-0 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-lg text-ink-2">
                  Spread the cost of an inverter or solar system over {financing.minMonths} to {financing.maxMonths} months.
                  Plans are open to salary earners, business owners and companies, subject to verification.
                </p>
                <dl className="mt-6 border-t border-grid">
                  {[
                    ["Rate", `${financing.monthlyFlatRate * 100}% a month, flat, on the system price (${financing.monthlyFlatRate * 100 * 12}% over 12 months)`],
                    ["Term", `${financing.minMonths} to ${financing.maxMonths} months`],
                    ["Salary earners", `Bank statements for at least the last ${financing.statementMonths} months`],
                    ["Businesses", `Bank statements for at least ${financing.statementMonths} months, plus CAC registration documents`],
                    ["After approval", "We set up your repayment plan, then supply and install the system"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-3 border-b border-grid py-3">
                      <dt className="chart-label pt-0.5 text-ink-3">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-ink-3">
                  &ldquo;Flat&rdquo; means interest is charged on the full price for every month of the plan, not on the
                  reducing balance. Full terms are in our <Link href="/terms#payment-plans" className="underline">terms and conditions</Link>.
                </p>
                <div className="mt-8 overflow-x-auto" role="region" aria-label="Worked example table" tabIndex={0}>
                <table className="w-full min-w-[20rem] border-collapse text-left">
                  <caption className="chart-label pb-2 text-left text-ink-3">
                    Worked example: {naira(financing.exampleSystemPrice)} system
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th scope="col" className="py-2 text-sm font-semibold">Months</th>
                      <th scope="col" className="py-2 text-right text-sm font-semibold">Interest</th>
                      <th scope="col" className="py-2 text-right text-sm font-semibold">Total</th>
                      <th scope="col" className="py-2 text-right text-sm font-semibold">Per month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[3, 6, 12].map((m) => {
                      const p = financePlan(financing.exampleSystemPrice, m);
                      return (
                        <tr key={m} className="border-b border-grid">
                          <th scope="row" className="py-2.5 text-left font-semibold">{m}</th>
                          <td className="py-2.5 text-right">{naira(p.interest)}</td>
                          <td className="py-2.5 text-right">{naira(p.total)}</td>
                          <td className="py-2.5 text-right font-semibold">{naira(Math.round(p.monthly))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
              <div>
                <FinanceCalculator />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact?service=solar&plan=yes" className={buttonClass("primary")}>Apply for a payment plan</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CloseBand />
    </>
  );
}
