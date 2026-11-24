import PartnershipForm from "@/components/PartnershipForm";
import { photos } from "@/content/photos";
import Partners from "@/components/Partners";
import { ButtonLink, PageHeader, Photo } from "@/components/ui";
import { publishable, showPlaceholderFlags, site } from "@/config/site";
import { partners, partnershipTypes } from "@/content/partners";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partnership",
  description:
    "Partner with Reohob Limited: equipment manufacturers, finance and development partners, installers, CSR programmes and government. Clean, affordable energy for Africa through the Reohob Initiative.",
  path: "/partnership",
});

export default function PartnershipPage() {
  return (
    <>
      <PageHeader
        title="Partnership"
        photo={photos.partnershipMeeting}
        lede="We work with manufacturers, financiers, installers and public bodies to get reliable, affordable power to more homes, businesses and communities."
      >
        <ButtonLink href="#enquiry" variant="sun">Send a partnership enquiry</ButtonLink>
      </PageHeader>

      <section className="container-x py-14 sm:py-20" aria-labelledby="types-title">
        <h2 id="types-title" className="h-section">Who we partner with</h2>
        <dl className="mt-8 border-t-2 border-ink">
          {partnershipTypes.map((t) => (
            <div key={t.id} className="grid gap-2 border-b border-grid py-6 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <dt className="h-block text-xl">{t.name}</dt>
              <dd className="text-ink-2">{t.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {showPlaceholderFlags || partners.some((p) => publishable(p)) ? (
        <section className="border-y border-grid py-14" aria-labelledby="partners-title">
          <div className="container-x grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <h2 id="partners-title" className="h-sub">Current partners</h2>
            <Partners withKind />
          </div>
        </section>
      ) : null}

      <section id="initiative" className="chart-field-faint scroll-mt-24 border-y border-grid" aria-labelledby="initiative-title">
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="initiative-title" className="h-chapter">
              The Reohob Initiative
            </h2>
            <p className="font-semiwide mt-4 text-xl text-ink-2">{site.motto}.</p>
            <div className="prose-chart mt-6 text-lg text-ink-2">
              <p>
                The Initiative brings alternative power from renewable energy to rural communities in Nigeria and across
                Africa. Affordability is the point: we believe clean energy can reach communities that the grid
                doesn&apos;t.
              </p>
              <p>We&apos;re looking for funding and delivery partners. Use the form to start a conversation.</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <Photo photo={photos.solarField} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div>
            <p className="chart-label text-ink-2">Follow the Initiative</p>
            <ul className="mt-3 space-y-2">
              {site.initiativeSocial.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-lg underline">{s.label}</a>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" data-hide-quick-actions className="container-x scroll-mt-24 grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="enquiry-title">
        <div>
          <h2 id="enquiry-title" className="h-section">Partnership enquiry</h2>
          <p className="mt-4 text-ink-2">Tell us who you are and what you have in mind. For partnerships and funding, this goes straight to our team.</p>
        </div>
        <div className="border-2 border-ink p-5 sm:p-8">
          <PartnershipForm />
        </div>
      </section>
    </>
  );
}
