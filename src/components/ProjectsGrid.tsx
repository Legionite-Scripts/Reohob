"use client";

import { useEffect, useState } from "react";
import ProjectPlate from "@/components/ProjectPlate";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";

type Filter = ProjectCategory | "All";
const slug = (c: string) => c.toLowerCase();

/**
 * Filterable project grid. Filters are toggle buttons; the chosen filter lives in the URL
 * (?type=commercial) so it survives Back and can be shared. The result count is announced.
 */
export default function ProjectsGrid({ projects }: Readonly<{ projects: Project[] }>) {
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    const match = projectCategories.find((c) => slug(c) === t);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL state read once after hydration
    if (match) setFilter(match);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "All") url.searchParams.delete("type");
    else url.searchParams.set("type", slug(f));
    window.history.replaceState(null, "", url);
  };

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const options: Filter[] = ["All", ...projectCategories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const count = o === "All" ? projects.length : projects.filter((p) => p.category === o).length;
          const on = filter === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              disabled={!count && !on}
              onClick={() => choose(o)}
              className={`min-h-11 border px-4 py-2 text-[0.9375rem] transition-colors disabled:cursor-not-allowed disabled:border-dashed disabled:text-ink-3 ${
                on ? "border-ink bg-ink font-semibold text-white" : "border-rule text-ink-2 enabled:hover:border-ink enabled:hover:text-ink"
              }`}
            >
              {o} <span className={on ? "text-moon" : "text-ink-3"}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>
      {shown.length ? (
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}><ProjectPlate project={p} headingLevel={2} /></li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 border border-dashed border-rule p-8 text-ink-2">No projects in this category yet.</p>
      )}
    </div>
  );
}
