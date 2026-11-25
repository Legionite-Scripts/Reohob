"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { CallButton, buttonClass, WhatsAppButton } from "@/components/ui";

export default function Header() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenOn(next ? pathname : null);
  };
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Lock scroll, close on Escape, keep focus inside the open menu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Everything behind the menu is inert while it is open (screen readers and Tab stay in the menu).
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter(Boolean) as HTMLElement[];
    behind.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="@container/header sticky top-0 z-40 border-b border-grid bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-sun focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[var(--header-h)] items-center gap-4">
        <Link href="/" prefetch className="flex min-h-11 min-w-0 shrink items-center" aria-label={`${site.name} home`}>
          <Image
            src="/brand/logo-black.png"
            alt={`${site.name} Energy`}
            width={1391}
            height={423}
            priority
            className="h-9 w-auto max-w-full object-contain object-left sm:h-10"
          />
        </Link>

        {/* Container queries in rem: larger text settings switch to the compact header automatically. */}
        <nav aria-label="Main" className="ml-auto hidden @min-[62rem]/header:block">
          <ul className="flex items-center gap-4 xl:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative block py-2 text-[0.9375rem] font-medium whitespace-nowrap text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-px aria-[current=page]:after:h-[3px] aria-[current=page]:after:bg-sun"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          prefetch
          className={buttonClass("sun", "ml-auto min-h-11 shrink-0 px-3.5 py-2 text-sm whitespace-nowrap sm:px-4 @min-[62rem]/header:ml-2")}
        >
          <span>
            <span className="hidden @min-[23rem]/header:inline">Get a </span>Quote
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center @min-[62rem]/header:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-grid bg-paper @min-[62rem]/header:hidden"
        >
          <nav aria-label="Main" className="container-x py-4">
            <ul>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-grid">
                  <Link
                    href={item.href}
                  prefetch
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="font-semiwide flex items-center justify-between py-4 text-xl font-bold aria-[current=page]:text-ink aria-[current=page]:before:mr-3 aria-[current=page]:before:inline-block aria-[current=page]:before:size-2.5 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-sun"
                  >
                    <span className="mr-auto">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3">
              <Link href="/contact" prefetch className={buttonClass("sun", "w-full")}>
                Get a Quote
              </Link>
              <WhatsAppButton className="w-full" />
              <CallButton className="w-full" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
