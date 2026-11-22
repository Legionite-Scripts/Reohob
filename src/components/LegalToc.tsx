"use client";

import { useEffect, useState } from "react";

const slug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * "On this page" list for long policy pages, built from the page's own H2s
 * (ids are added where missing). Desktop only; the page reads top to bottom on phones.
 */
export default function LegalToc({ containerId }: Readonly<{ containerId: string }>) {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;
    const hs = [...root.querySelectorAll<HTMLHeadingElement>("h2")];
    hs.forEach((h) => {
      if (!h.id) h.id = slug(h.textContent ?? "");
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- built from rendered headings after hydration
    setItems(hs.map((h) => ({ id: h.id, text: h.textContent ?? "" })));
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [containerId]);

  if (!items.length) return null;
  return (
    <nav aria-label="On this page" className="sticky top-[calc(var(--header-h)+2rem)] hidden lg:block">
      <p className="chart-label pb-3 text-ink-3">On this page</p>
      <ul className="border-l border-grid">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className="relative flex min-h-10 items-center py-1.5 pl-5 text-[0.9375rem] text-ink-2 hover:text-ink aria-[current=true]:font-semibold aria-[current=true]:text-ink aria-[current=true]:before:absolute aria-[current=true]:before:top-1/2 aria-[current=true]:before:-left-[7px] aria-[current=true]:before:size-3 aria-[current=true]:before:-translate-y-1/2 aria-[current=true]:before:rounded-full aria-[current=true]:before:border-2 aria-[current=true]:before:border-ink aria-[current=true]:before:bg-sun"
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
