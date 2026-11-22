import type { ReactNode } from "react";
import { HourRule } from "@/components/ui";
import LegalToc from "@/components/LegalToc";

/** Shared shell for policy pages: plain-language summary first, then the detail. */
export default function LegalPage({
  title,
  updated,
  summary,
  children,
}: {
  title: string;
  updated: string;
  summary: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <header className="chart-field-faint border-b border-grid">
        <div className="container-x pt-14 pb-10 sm:pt-20">
          <h1 className="h-page">{title}</h1>
          <p className="mt-3 text-ink-3">Last updated {updated}</p>
        </div>
        <HourRule />
      </header>
      <div className="container-x grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div className="min-w-0">
          <section aria-labelledby="summary-title" className="max-w-[72ch] border-t-2 border-ink bg-chart p-5 sm:p-7">
            <h2 id="summary-title" className="h-block text-xl">In short</h2>
            <div className="prose-chart mt-3">{summary}</div>
          </section>
          <div id="legal-body" className="prose-chart mt-6">{children}</div>
        </div>
        <aside className="lg:order-none">
          <LegalToc containerId="legal-body" />
        </aside>
      </div>
    </>
  );
}
