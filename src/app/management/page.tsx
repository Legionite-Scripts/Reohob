import Image from "next/image";
import { Download } from "lucide-react";
import { PageHeader, Photo, buttonClass } from "@/components/ui";
import { photos } from "@/content/photos";
import { site } from "@/config/site";
import { people } from "@/content/people";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Management and company profile",
  description:
    "Reohob Limited's leadership and executive advisory board, company history, mission and vision, certifications, and a downloadable company profile.",
  path: "/management",
});

const profile = site.companyProfile;

/** Company profile download: shown only once the real PDF is in place (`site.companyProfile.available`). */
function ProfileButton({ variant }: { variant: "primary" | "outline" }) {
  if (!profile.available) return null;
  return (
    <a href={profile.href} download className={buttonClass(variant, "self-start lg:self-end")}>
      <Download aria-hidden className="size-4" /> Download company profile
      <span className="font-normal">(PDF{profile.sizeLabel ? `, ${profile.sizeLabel}` : ""})</span>
    </a>
  );
}

export default function ManagementPage() {
  const leaders = people.filter((p) => p.group === "leadership");
  const board = people.filter((p) => p.group === "board");

  return (
    <>
      <PageHeader
        title="Management"
        photo={photos.lagosNight}
        lede={`${site.legalName} is a Lagos-based renewable energy and power engineering company. These are the people who lead it and advise it.`}
        aside={profile.available ? <ProfileButton variant="outline" /> : undefined}
      />

      <section className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="story-title">
        <div>
          <h2 id="story-title" className="h-section">Our story</h2>
          <Photo photo={photos.lagosTower} className="mt-8 max-w-sm" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 24rem, 100vw" />
        </div>
        <div className="prose-chart text-lg text-ink-2">
          <p>
            Reohob Nigeria is a renewable energy and power consultation company with over a decade in existence and
            experience. We are a fully registered and licensed company providing premium-quality products and services:
            we design, supply, install and maintain solar, inverter and battery systems for homes and businesses across
            Lagos and Nigeria. With us, unlimited and uninterrupted power supply is possible.
          </p>
          <p>
            Today our work also covers EV charging, security screening equipment, engineering services for commercial and
            industrial projects, and an installer training programme. Through the Reohob Initiative we work towards
            affordable renewable power for rural communities.
          </p>
        </div>
      </section>

      <section className="chart-field-faint border-y border-grid" aria-label="Mission and vision">
        <div className="container-x grid gap-10 py-14 sm:py-20 md:grid-cols-2">
          <h2 className="h-sub">
            <span className="text-ink-3">Our mission.</span> {site.mission}
          </h2>
          <h2 className="h-sub">
            <span className="text-ink-3">Our vision.</span> {site.vision}
          </h2>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20" aria-labelledby="people-title">
        <h2 id="people-title" className="h-section">Leadership</h2>
        <div className="mt-8 grid gap-10">
          {leaders.map((p) => (
            <article key={p.name} className="grid gap-6 border-t-2 border-ink pt-8 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
              <Image src={p.photo} alt={`Portrait of ${p.name}`} width={320} height={320} className="size-44 border border-ink bg-chart object-cover lg:size-52" />
              <div>
                <h3 className="h-section text-3xl">{p.name}</h3>
                <p className="mt-1 text-lg font-semibold text-ink-2">{p.role}{p.affiliation ? `, ${p.affiliation}` : ""}</p>
                {p.bioConfirmed ? <p className="mt-4 max-w-[62ch] text-ink-2">{p.bio}</p> : null}
              </div>
            </article>
          ))}
        </div>

        <h2 className="h-section mt-20">Executive advisory board</h2>
        <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((p) => (
            <li key={p.name} className="border-t-2 border-ink pt-6">
              <Image src={p.photo} alt={`Portrait of ${p.name}`} width={320} height={320} className="size-32 border border-ink bg-chart object-cover" />
              <h3 className="h-block mt-5 text-xl">{p.name}</h3>
              <p className="mt-1 text-ink-2">{p.affiliation}</p>
              {p.bioConfirmed ? <p className="mt-3 text-ink-2">{p.bio}</p> : null}
            </li>
          ))}
        </ul>
      </section>


      {site.aboutVideoUrl ? (
        <section className="container-x py-14" aria-label="Company video">
          <div className="aspect-video border border-ink">
            <iframe
              src={site.aboutVideoUrl}
              title="Reohob: reliable solar power day and night"
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </section>
      ) : null}

      {profile.available ? (
      <section className="container-x flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between" aria-label="Company profile">
        <h2 className="h-sub max-w-[26ch]">
          Need our profile for a tender or vendor registration?
        </h2>
        <ProfileButton variant="primary" />
      </section>
      ) : null}
    </>
  );
}
