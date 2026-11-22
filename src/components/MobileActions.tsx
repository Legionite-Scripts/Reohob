"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { site, whatsappHref } from "@/config/site";

/**
 * Phones only: once the visitor scrolls past the first screen, a slim bar keeps WhatsApp, Call and
 * Get a Quote one tap away. It hides again near the footer (which repeats all three) and while a
 * form field has focus, so it never covers what someone is typing.
 */
export default function MobileActions() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [typing, setTyping] = useState(false);
  const [inForm, setInForm] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 40 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearFooter);
    };
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      setTyping(t.matches?.("input:not([type=range]):not([type=radio]):not([type=checkbox]), textarea, select") ?? false);
    };
    // Hide over forms and the pay step: they have their own actions, and the bar must never cover them.
    const zones = [...document.querySelectorAll("[data-hide-quick-actions]")];
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setInForm(seen.size > 0);
    });
    zones.forEach((z) => io.observe(z));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("focusin", onFocus);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  const visible = show && !typing && !inForm;
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-semibold";

  return (
    <nav
      aria-label="Quick contact"
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-grid bg-paper pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-[var(--ease-out-expo)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ul className="flex divide-x divide-grid">
        <li className="flex flex-1">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={item}>
            <span className="relative">
              <MessageCircle aria-hidden className="size-5" />
              <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-sun ring-1 ring-ink" />
            </span>
            WhatsApp
          </a>
        </li>
        <li className="flex flex-1">
          <a href={`tel:${site.contact.phones[0].tel}`} className={item}>
            <Phone aria-hidden className="size-5" />
            Call
          </a>
        </li>
        {pathname !== "/contact" ? (
          <li className="flex flex-1">
            <Link href="/contact" className={`${item} bg-sun text-ink`}>
              <FileText aria-hidden className="size-5" />
              Get a Quote
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
