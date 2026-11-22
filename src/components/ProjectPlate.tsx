import Link from "next/link";
import { ArrowRight, ImageOff } from "lucide-react";
import type { Project } from "@/content/projects";
import { SampleTag } from "@/components/ui";

/** Photo slot: shows the real photo when supplied, otherwise a labelled chart-grid frame. */
export function PhotoSlot({ src, alt, label = "Photo to come" }: { src?: string; alt?: string; label?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? ""} className="aspect-[4/3] w-full object-cover" loading="lazy" />;
  }
  return (
    // Decorative stand-in: hidden from screen readers so repeated "photo to come" isn't read out.
    <div className="chart-field flex aspect-[16/9] w-full items-center justify-center border border-grid" aria-hidden="true">
      <span className="inline-flex items-center gap-2 bg-paper px-3 py-1.5 text-sm text-ink-3">
        <ImageOff aria-hidden className="size-4" /> {label}
      </span>
    </div>
  );
}

export default function ProjectPlate({ project: p, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col border-t-2 border-ink pt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="chart-label text-ink-2">{p.category}</span>
        {p.sample ? <SampleTag /> : null}
      </div>
      <div className="mt-3">
        <PhotoSlot src={p.photos[0]?.src} alt={p.photos[0]?.alt} />
      </div>
      <H className="font-semiwide mt-4 text-xl font-semibold">
        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 group-hover:underline">
          {p.title}
        </Link>
      </H>
      <p className="mt-1 text-ink-2">{p.location} · {p.year}</p>
      <p className="chart-label mt-3 text-ink-3">{p.systemSize}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-4 font-semibold" aria-hidden>
        View project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}
