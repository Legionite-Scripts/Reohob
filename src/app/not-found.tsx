import { ButtonLink, HourRule, TextLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="chart-field-faint">
      <div className="container-x py-20 sm:py-28">
        <h1 className="h-page max-w-[18ch]">This page is below the horizon.</h1>
        <p className="mt-4 chart-label text-ink-3">Error 404 · page not found</p>
        <p className="mt-5 max-w-[52ch] text-lg text-ink-2">
          It may have moved when we rebuilt the site. These are the pages most people are looking for:
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8">
          <li><TextLink href="/products-and-services">Products and services</TextLink></li>
          <li><TextLink href="/training">Training</TextLink></li>
          <li><TextLink href="/">Home</TextLink></li>
        </ul>
        <div className="mt-8"><ButtonLink href="/contact">Get a Quote</ButtonLink></div>
      </div>
      <HourRule />
    </section>
  );
}
