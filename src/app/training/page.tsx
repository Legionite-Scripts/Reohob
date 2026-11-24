import { ChevronDown } from "lucide-react";
import { photos } from "@/content/photos";
import TrainingFlow from "@/components/TrainingFlow";
import { ButtonLink, PageHeader, Photo } from "@/components/ui";
import { naira, site } from "@/config/site";
import { courseOutlineUrl, trainingPackages } from "@/config/training";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solar and inverter installer training",
  description: `Train to install solar and inverter systems with Reohob's engineers. Online from ${naira(trainingPackages[0].price)}, on-site from ${naira(trainingPackages[2].price)}, with certificates, hands-on practicals and business coaching. Register and pay online.`,
  path: "/training",
});

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        title="Engineering training programme"
        photo={photos.electronicsBench}
        lede="Learn to install solar and inverter systems with our engineers, online or on site. Business packages add strategy sessions and mentorship to help you run installations as a business."
      >
        <ButtonLink href="#register" variant="sun">Register now</ButtonLink>
        <ButtonLink href="#outline" variant="night-outline" arrow={false}>See what&apos;s included</ButtonLink>
      </PageHeader>

      <section className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="about-title">
        <div>
          <h2 id="about-title" className="h-section">
            Learn to install, and get a certificate of attendance
          </h2>
          <Photo photo={photos.trainingHandsOn} className="mt-8" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 38vw, 100vw" />
        </div>
        <div className="prose-chart text-lg text-ink-2">
          <p>
            The programme trains you to install solar and inverter systems and covers the wider practice of renewable
            energy installation. Online packages teach the theory in four live sessions; on-site packages add five days
            of hands-on work with our engineering team.
          </p>
          <p>
            The business packages add strategy sessions, and the Gold package adds six months of mentorship, engineering
            support, access to our dealership price list and job opportunities.
          </p>
          <p className="text-base">
            Follow the programme:{" "}
            {site.trainingSocial.map((s, i) => (
              <span key={s.href}>
                {i ? " · " : ""}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section id="outline" className="chart-field-faint scroll-mt-24 border-y border-grid py-14 sm:py-20" aria-labelledby="outline-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="outline-title" className="h-section">
              Course outline and packages
            </h2>
            {courseOutlineUrl ? (
              <a href={courseOutlineUrl} className="font-semibold underline">Download the full course outline (PDF)</a>
            ) : null}
          </div>
          <div className="mt-8 border-t-2 border-ink bg-paper">
            {trainingPackages.map((p, i) => (
              <details key={p.id} className="group border-b border-grid" open={i === 0}>
                <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-5 hover:bg-chart sm:grid-cols-[1fr_9rem_8rem_auto] sm:px-6">
                  <span className="font-semiwide text-lg font-semibold sm:text-xl">{p.short}</span>
                  <span className="chart-label order-3 text-ink-3 sm:order-none">{p.mode}</span>
                  <span className="order-4 font-semibold sm:order-none sm:text-right">{naira(p.price)}</span>
                  <ChevronDown aria-hidden className="row-span-1 size-5 transition-transform duration-200 group-open:rotate-180 sm:row-span-1" />
                </summary>
                <div className="grid gap-6 px-4 pb-6 sm:grid-cols-[1fr_16rem] sm:px-6">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <ul className="prose-chart">
                      {p.includes.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="self-start border border-grid p-4">
                    <p className="chart-label text-ink-3">Duration</p>
                    <p className="mt-1 font-semibold">{p.duration}</p>
                    <a
                      href={`?package=${p.id}#register`}
                      data-register-package={p.id}
                      className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
                    >
                      Register for {p.short}
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="register" data-hide-quick-actions className="container-x scroll-mt-24 grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="register-title">
        <div>
          <h2 id="register-title" className="h-section">Register and pay</h2>
          <ol className="mt-6 space-y-3 text-ink-2">
            <li><span className="font-wide mr-2 font-semibold text-ink">1</span> Choose a package and enter your details.</li>
            <li><span className="font-wide mr-2 font-semibold text-ink">2</span> Check everything is correct.</li>
            <li><span className="font-wide mr-2 font-semibold text-ink">3</span> Pay securely with Paystack.</li>
            <li><span className="font-wide mr-2 font-semibold text-ink">4</span> We confirm by email and send your joining details.</li>
          </ol>
          <p className="mt-6 text-sm text-ink-3">
            Booking for a group or company? <a href="/contact?service=training" className="underline">Contact us</a> instead.
          </p>
          <Photo photo={photos.installerPanel} className="mt-10 hidden max-w-sm lg:block" ratio="aspect-[3/4]" sizes="24rem" />
        </div>
        <div className="border-2 border-ink bg-paper p-5 sm:p-8">
          <TrainingFlow />
        </div>
      </section>
    </>
  );
}
