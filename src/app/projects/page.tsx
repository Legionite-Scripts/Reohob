import { notFound } from "next/navigation";
import ProjectsGrid from "@/components/ProjectsGrid";
import { CloseBand, PageHeader, SampleTag } from "@/components/ui";
import { publishable } from "@/config/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Solar, inverter and battery installations, EV charging, security screening and training projects delivered by Reohob Limited across Lagos and Nigeria.",
  path: "/projects",
});

export default function ProjectsPage() {
  const shown = projects.filter((p) => publishable(p));
  // Hidden until a real project exists (no sample content is published).
  if (!shown.length) notFound();
  return (
    <>
      <PageHeader
        title="Projects"
        lede="Homes, offices, factories, estates and screening points: what we built, where, at what size, and what changed for the client."
      />
      <section className="container-x py-12 sm:py-16" aria-label="Project list">
        {shown.some((p) => p.sample) ? (
          <p className="mb-8 max-w-[70ch] border border-dashed border-sun-deep bg-sun-soft p-4 text-sm">
            <SampleTag>Sample content</SampleTag>{" "}
            These six projects are examples that show how project pages will look. They are not real Reohob
            projects, and real work and photos will replace them.
          </p>
        ) : null}
        {shown.length ? (
          <ProjectsGrid projects={shown} />
        ) : (
          <div className="max-w-[62ch] border-t-2 border-ink pt-6">
            <h2 className="h-sub">Project write-ups are on the way</h2>
            <p className="mt-3 text-ink-2">
              We&apos;re preparing case studies of recent installations. In the meantime, ask us about work similar to
              yours and we&apos;ll share details and references.
            </p>
          </div>
        )}
      </section>
      <CloseBand title="Planning something similar?" lede="Tell us about the site and what it needs to run. An engineer will come back to you with a recommendation." />
    </>
  );
}
