"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

/**
 * Sticky section menu: a rail on desktop, a scrollable strip pinned under the header on phones.
 * Highlights the section in view and keeps the active item scrolled into view on the strip.
 */
export default function SectionNav({ items, label = "On this page" }: Readonly<{ items: Item[]; label?: string }>) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active item visible on the horizontal strip (phones). No effect on the desktop rail.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[var(--header-h)] z-30 -mx-4 border-b border-grid bg-paper px-4 sm:-mx-6 sm:px-6 lg:top-[calc(var(--header-h)+2rem)] lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:px-0"
    >
      <p className="chart-label hidden pb-3 text-ink-3 lg:block">{label}</p>
      <ul
        ref={listRef}
        className="flex gap-1 overflow-x-auto py-1.5 [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-ink lg:py-0 lg:[mask-image:none]"
      >
        {items.map((i) => (
          <li key={i.id} className="shrink-0 last:pr-10 lg:last:pr-0">
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className="relative flex min-h-11 items-center px-3 text-[0.9375rem] whitespace-nowrap text-ink-2 hover:text-ink aria-[current=true]:bg-sun aria-[current=true]:font-semibold aria-[current=true]:text-ink lg:pl-5 lg:aria-[current=true]:bg-transparent lg:aria-[current=true]:before:absolute lg:aria-[current=true]:before:top-1/2 lg:aria-[current=true]:before:-left-[7px] lg:aria-[current=true]:before:size-3 lg:aria-[current=true]:before:-translate-y-1/2 lg:aria-[current=true]:before:rounded-full lg:aria-[current=true]:before:border-2 lg:aria-[current=true]:before:border-ink lg:aria-[current=true]:before:bg-sun"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
