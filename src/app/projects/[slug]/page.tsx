import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PhotoSlot } from "@/components/ProjectPlate";
import ProjectPlate from "@/components/ProjectPlate";
import { ButtonLink, CloseBand, HourRule, SampleTag, WhatsAppButton } from "@/components/ui";
import { publishable } from "@/config/site";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title}, ${p.location}`,
    description: `${p.summary} ${p.systemSize}.`,
    path: `/projects/${p.slug}`,
    // Sample projects stay out of search results until they are replaced with real work.
    noindex: p.sample,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !publishable(p)) notFound();
  const others = projects.filter((x) => x.slug !== p.slug && publishable(x));
  const more = [...others.filter((x) => x.category === p.category), ...others.filter((x) => x.category !== p.category)].slice(0, 3);

  const photos = p.photos.length ? p.photos : [{ src: "", alt: "" }, { src: "", alt: "" }, { src: "", alt: "" }];

  return (
    <article>
      <header className="chart-field-faint border-b border-grid">
        <div className="container-x pt-10 pb-12 sm:pt-14">
          <Link href="/projects" className="-my-2 inline-flex min-h-11 items-center gap-2 text-ink-2 hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" /> All projects
          </Link>
          <h1 className="h-page mt-6 max-w-[20ch]">{p.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-2">
            <span className="chart-label">{p.category}</span>
            <span aria-hidden>·</span>
            <span>{p.location}</span>
            <span aria-hidden>·</span>
            <span>{p.year}</span>
            {p.sample ? <SampleTag>Sample project: not real Reohob work</SampleTag> : null}
          </p>
          <p className="mt-4 max-w-[60ch] text-xl text-ink-2">{p.summary}</p>
        </div>
        <HourRule />
      </header>

      <div className="container-x grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_22rem]">
        <div>
          <PhotoSlot src={photos[0].src} alt={photos[0].alt} label="Main project photo to come" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {photos.slice(1, 3).map((ph, i) => (
              <PhotoSlot key={i} src={ph.src} alt={ph.alt} label="Photo to come" />
            ))}
          </div>

          <h2 className="h-sub mt-12">Scope</h2>
          <ol className="mt-4 border-t border-grid">
            {p.scope.map((s, i) => (
              <li key={s} className="grid grid-cols-[minmax(0,2.5rem)_minmax(0,1fr)] border-b border-grid py-3">
                <span className="font-wide font-semibold text-ink-3">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>

          <h2 className="h-sub mt-12">Outcome</h2>
          <p className="mt-4 max-w-[65ch] text-lg">{p.outcome}</p>
        </div>

        <aside aria-label="Project details" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <dl className="border-2 border-ink bg-paper">
            {[
              ["Location", p.location],
              ["Year", p.year],
              ["System", p.systemSize],
              ["Category", p.category],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-grid px-5 py-4 last:border-b-0">
                <dt className="chart-label text-ink-3">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/contact">Get a Quote</ButtonLink>
            <WhatsAppButton />
          </div>
        </aside>
      </div>
      {more.length ? (
        <section className="border-t border-grid" aria-labelledby="more-title">
          <div className="container-x py-14 sm:py-20">
            <h2 id="more-title" className="h-section">More projects</h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}><ProjectPlate project={m} /></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CloseBand title="Planning something similar?" lede="Tell us about the site and what it needs to run. An engineer will come back to you with a recommendation." />
    </article>
  );
}
