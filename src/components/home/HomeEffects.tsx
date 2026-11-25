"use client";

import { useEffect } from "react";

/**
 * Scroll reveals for the homepage. Content is visible by default; the `hv-js` class (added here)
 * is what enables the fade-in, so nothing stays hidden if JavaScript fails or motion is reduced.
 */
export default function HomeEffects() {
  useEffect(() => {
    const root = document.querySelector(".hv");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...root.querySelectorAll<HTMLElement>(".reveal")];
    // Anything already on screen shows at once, so the first view never flashes empty.
    const fold = window.innerHeight;
    for (const el of items) if (el.getBoundingClientRect().top < fold) el.classList.add("visible");
    root.classList.add("hv-js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const el of items) if (!el.classList.contains("visible")) io.observe(el);
    return () => io.disconnect();
  }, []);
  return null;
}
