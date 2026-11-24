import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import SunPathChart from "@/components/SunPathChart";
import LagosNow from "@/components/LagosNow";
import ProjectPlate from "@/components/ProjectPlate";
import Partners from "@/components/Partners";
import {
  Photo,
  PhotoHero,
  ButtonLink,
  CloseBand,
  SampleTag,
  SectionTitle,
  TextLink,
  WhatsAppButton,
} from "@/components/ui";
import { financePlan, naira, publishable, showPlaceholderFlags, site } from "@/config/site";
import { trainingPackages } from "@/config/training";
import { serviceGroups } from "@/content/services";
import { projects } from "@/content/projects";
import { testimonials } from "@/content/testimonials";
import { photos } from "@/content/photos";
import { partners } from "@/content/partners";
import { pageMetadata } from "@/lib/seo";

/** One photograph per service group in the "What we do" index. */
const servicePhotos: Record<string, { src: string; focus?: string }> = {
  "power-systems": photos.roofSky,
  "ev-charging": photos.evCharging,
  "security-screening": photos.securityCheck,
  "engineering-services": photos.engineersPlans,
};

export const metadata = pageMetadata({
  title: `${site.legalName} | Solar, inverter and battery systems in Lagos`,
  description:
    "Solar, inverter and battery systems designed and installed in Lagos, from 1 kVA homes to 100 kVA commercial sites. EV charging, security screening, EPC and engineering training. Free phone consultations.",
  path: "/",
});

const steps = [
  {
    title: "Site survey",
    body: "We look at what you need to run, your roof or ground space, cabling routes and existing equipment. Phone and online consultations are free.",
    gets: "Site survey and audit report",
    photo: photos.stepSurvey,
  },
  {
    title: "Design",
    body: "We size panels, inverter and batteries to your loads and hours of backup, and draw up the system and a bill of quantities.",
    gets: "System design, preliminary BOQ and quotation",
    photo: photos.stepDesign,
  },
  {
    title: "Installation",
    body: `In Lagos we install within ${site.installation.lagosHours} of payment being confirmed; elsewhere on a date we agree with you. Batteries get their first full charge before use.`,
    gets: "Installed, tested system and a handover walk-through",
    photo: photos.stepInstall,
  },
  {
    title: "Support",
    body: "Your warranty, maintenance visits and call-outs come from the same team that installed the system.",
    gets: "Warranty, maintenance and after-sales support",
    photo: photos.stepSupport,
  },
];

export default function HomePage() {
  const ex = financePlan(site.financing.exampleSystemPrice, site.financing.exampleMonths);
  const featured = projects.filter((p) => publishable(p)).slice(0, 3);
  const homePartners = partners.some((p) => p.confirmed);
  // Home shows confirmed facts only: no "To confirm" figures, whatever the placeholder setting.
  const trust = [
    ...site.trust.filter((t) => t.confirmed).map((t) => ({ value: t.value, label: t.label, sub: undefined as string | undefined })),
    { value: "1–100 kVA", label: "system sizes", sub: "homes to factories" },
    { value: "24–48 h", label: "install in Lagos", sub: "after payment is confirmed" },
  ];

  return (
    <>
      {/* ── Hero: one decisive photograph, the promise, two ways to act ── */}
      <PhotoHero photo={photos.crewRoof} tall as="section" labelledBy="hero-title">
            <h1 id="hero-title" className="font-wide max-w-[14ch] text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.03em] text-white">
              Power that stays on, day and night.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-white/90 sm:text-xl">
              {site.legalName} designs, supplies and installs solar, inverter and battery systems in Lagos, from
              1&nbsp;kVA homes to 100&nbsp;kVA commercial sites, and keeps them running.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="sun">Get a Quote</ButtonLink>
              <WhatsAppButton variant="night-outline" />
            </div>
            <div className="mt-6 space-y-1">
              <LagosNow tone="night" />
              <p className="pl-[1.375rem] text-sm text-white/75">Phone and online consultations are free.</p>
            </div>
      </PhotoHero>

      {/* ── Trust strip: a ruled data row. Unconfirmed figures only appear in placeholder mode. ── */}
      <section aria-label="Reohob in figures" className="chart-field-faint border-b border-grid">
        <dl className="container-x grid grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
          {trust.map((t, i) => (
            <div
              key={t.label}
              className={`flex flex-col border-grid py-6 ${i % 2 === 0 ? "border-r pr-4" : "pl-4"} ${i < trust.length - 1 ? "border-b lg:border-b-0" : ""} ${
                i === trust.length - 1 && trust.length % 2 === 1 ? "col-span-2 border-r-0 pl-0 lg:col-span-1" : ""
              } lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0`}
            >
              <dt className="chart-label text-ink-2">{t.label}</dt>
              <dd className="font-wide mt-1 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold">{t.value}</dd>
              {t.sub ? <dd className="text-sm text-ink-3">{t.sub}</dd> : null}
            </div>
          ))}
        </dl>
      </section>

      {/* ── Four service groups as a chart legend ── */}
      <section className="container-x py-16 sm:py-24" aria-labelledby="services-title">
        <SectionTitle id="services-title" lede="One engineering team for the whole job: survey, design, supply, installation and support.">
          What we do
        </SectionTitle>
        <ul className="mt-10 border-t border-grid">
          {serviceGroups.map((g) => (
            <li key={g.id} className="border-b border-grid">
              <Link
                href={`/products-and-services#${g.id}`}
                className="group grid gap-4 py-6 transition-colors hover:bg-chart sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[14rem_1fr_1.3fr_auto] lg:items-center lg:gap-8"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-chart sm:row-span-3 sm:aspect-[4/3] lg:row-span-1">
                  <Image
                    src={servicePhotos[g.id].src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 14rem, (min-width: 640px) 11rem, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: servicePhotos[g.id].focus }}
                  />
                </div>
                <h3 className="h-block sm:text-[1.75rem]">{g.title}</h3>
                <div className="sm:col-start-2 lg:col-start-auto">
                  <p className="text-ink-2">{g.summary}</p>
                  <p className="chart-label mt-2 text-ink-3">{g.spec}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-semibold sm:col-start-2 lg:col-start-auto">
                  Details<span className="sr-only">: {g.title}</span>{" "}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── The mechanism: today's sun over Lagos, kept small and honest ── */}
      <section className="chart-field-faint border-y border-grid py-16 sm:py-20" aria-labelledby="sun-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionTitle
              id="sun-title"
              lede="Panels harvest the sun while it's up and charge the batteries. After sunset, and whenever the grid fails, the batteries take over, so the power to your building never drops."
            >
              Solar by day, batteries by night
            </SectionTitle>
            <p className="mt-5 text-ink-2">
              The chart shows the sun&apos;s real path over Lagos today. Drag along it to see which part of the system is
              carrying your building at any hour.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-4">
            <SunPathChart />
          </div>
        </div>
      </section>

      {/* ── How it works: a real sequence with what you receive at each step ── */}
      <section className="border-b border-grid py-16 sm:py-24" aria-labelledby="how-title">
        <div className="container-x">
          <SectionTitle id="how-title" lede="Every system follows the same four steps, whether it's a flat in Yaba or a factory in Agbara.">
            How it works
          </SectionTitle>
          <ol className="mt-12 grid gap-0 border-t-2 border-ink lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative grid grid-rows-[auto_auto_auto_1fr_auto] border-b border-grid pt-8 pb-8 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <span aria-hidden className={`absolute -top-[9px] size-4 rounded-full border-2 border-ink bg-paper ${i === 0 ? "left-0" : "left-0 lg:left-6"}`} />
                <Photo photo={s.photo} className="mb-5" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 22vw, 100vw" />
                <p className="font-wide text-5xl font-semibold text-ink" aria-hidden>{i + 1}</p>
                <h3 className="h-block mt-3 text-xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 mb-5 text-ink-2">{s.body}</p>
                <p className="border-t border-grid pt-3 font-semibold">
                  <span className="font-normal text-ink-3">You receive: </span>
                  {s.gets}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Featured projects (hidden at launch until real projects exist) ── */}
      {featured.length ? (
        <section className="container-x py-16 sm:py-24" aria-labelledby="projects-title">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle id="projects-title" lede="Homes, offices, factories, estates and screening points.">
              Projects
            </SectionTitle>
            <ButtonLink href="/projects" variant="outline">All projects</ButtonLink>
          </div>
          {featured.some((p) => p.sample) ? (
            <p className="mt-6"><SampleTag>Sample projects: real work and photos will replace these</SampleTag></p>
          ) : null}
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}><ProjectPlate project={p} /></li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ── Financing teaser: night, worked example ── */}
      <section className="chart-field-faint border-b border-grid" aria-labelledby="finance-title">
        <div className="container-x grid gap-12 py-16 *:min-w-0 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle id="finance-title" lede="Salary earners, business owners and companies can spread the cost of a system over 1 to 12 months, subject to verification.">
              Pay over 12 months
            </SectionTitle>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/products-and-services#financing" variant="primary">How payment plans work</ButtonLink>
            </div>
          </div>
          <figure className="border-t-2 border-ink pt-5">
            <figcaption className="chart-label text-ink-2">
              Worked example · {site.financing.monthlyFlatRate * 100}% a month, flat
            </figcaption>
            <dl className="mt-5 divide-y divide-grid">
              <div className="flex flex-wrap justify-between gap-x-4 py-3"><dt className="text-ink-2">Example system price</dt><dd className="font-semibold">{naira(site.financing.exampleSystemPrice)}</dd></div>
              <div className="flex flex-wrap justify-between gap-x-4 py-3"><dt className="text-ink-2">Interest: 3% × {site.financing.exampleMonths} months</dt><dd className="font-semibold">{naira(ex.interest)}</dd></div>
              <div className="flex flex-wrap justify-between gap-x-4 py-3"><dt className="text-ink-2">Total repayable</dt><dd className="font-semibold">{naira(ex.total)}</dd></div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 pt-4">
                <dt className="font-semibold">Monthly payment</dt>
                <dd className="font-wide text-3xl font-semibold sm:text-4xl">{naira(Math.round(ex.monthly))}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-ink-3">Example only, not a quote. Your price depends on the system we design for you.</p>
          </figure>
        </div>
      </section>

      {/* ── Training teaser ── */}
      <section className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="training-title">
        <div>
          <SectionTitle id="training-title" lede="Learn to install solar and inverter systems with our engineers, online or on site. Business packages add strategy sessions and mentorship.">
            Train as an installer
          </SectionTitle>
          <div className="mt-8"><ButtonLink href="/training">See the programme</ButtonLink></div>
          <Photo photo={photos.soldering} className="mt-10" ratio="aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Training packages and prices</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="chart-label py-2 text-ink-2">Package</th>
              <th scope="col" className="chart-label hidden py-2 text-ink-2 sm:table-cell">Format</th>
              <th scope="col" className="chart-label py-2 text-right text-ink-2">Fee</th>
            </tr>
          </thead>
          <tbody>
            {trainingPackages.map((p) => (
              <tr key={p.id} className="border-b border-grid">
                <th scope="row" className="py-3 pr-3 text-left font-semibold">
                  {p.short}
                  <span className="block text-sm font-normal text-ink-3 sm:hidden">{p.duration}</span>
                </th>
                <td className="hidden py-3 pr-3 text-ink-2 sm:table-cell">{p.duration}</td>
                <td className="py-3 text-right font-semibold whitespace-nowrap">{naira(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── Partners: confirmed partners only on Home ── */}
      {homePartners ? (
        <section className="border-t border-grid py-14" aria-labelledby="partners-title">
          <div className="container-x grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <div>
              <h2 id="partners-title" className="h-sub">Partners</h2>
              <TextLink href="/partnership" className="mt-1">Partner with us</TextLink>
            </div>
            <Partners confirmedOnly />
          </div>
        </section>
      ) : null}

      {/* ── Testimonials: real quotes only. Labelled slots in placeholder mode; hidden at launch. ── */}
      {testimonials.length || showPlaceholderFlags ? (
        <section className="chart-field-faint border-y border-grid py-16 sm:py-20" aria-labelledby="testimonials-title">
          <div className="container-x">
            <h2 id="testimonials-title" className="h-section">What customers say</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {(testimonials.length
                ? testimonials
                : [1, 2].map((n) => ({
                    quote: "Customer quote goes here: one to three sentences about the system, the installation team or life after the switch.",
                    name: "Customer name",
                    detail: `area of Lagos ${n}`,
                    placeholder: true,
                  }))
              ).map((t, i) => (
                <li key={i}>
                  <figure className="h-full border border-ink bg-paper p-6 sm:p-8">
                    <Quote aria-hidden className="size-7 text-sun-deep" />
                    <blockquote className={`font-semiwide mt-4 text-xl leading-snug font-semibold ${"placeholder" in t ? "text-ink-3" : "text-ink"}`}>
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-5 flex flex-wrap items-center gap-3 text-ink-2">
                      <span>{t.name}, {"placeholder" in t ? "area of Lagos" : t.detail}</span>
                      {"placeholder" in t ? <SampleTag>Sample: replace with a real quote</SampleTag> : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CloseBand />
    </>
  );
}
