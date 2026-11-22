"use client";

import Link from "next/link";
import { useState } from "react";
import { sizingTiers } from "@/content/services";
import { buttonClass } from "@/components/ui";

/**
 * Sizing tiers as a ruled row: the chosen tier carries a marigold top rule (the active state). A radio group, so it works with keyboard and screen readers.
 */
export default function SizingTiers() {
  const [chosen, setChosen] = useState<string>("home");
  const tier = sizingTiers.find((t) => t.id === chosen)!;

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Choose the size closest to your building</legend>
        <div className="grid border-t border-grid sm:grid-cols-2 xl:grid-cols-4">
          {sizingTiers.map((t) => {
            const on = t.id === chosen;
            return (
              <label
                key={t.id}
                className={`relative flex cursor-pointer flex-col p-4 transition-[background-color,border-color] duration-200 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sun ${
                  `-mt-px border-t-4 border-b border-b-grid ${on ? "border-t-sun bg-paper" : "border-t-transparent hover:bg-chart"}`
                }`}
              >
                <input
                  type="radio"
                  name="tier"
                  value={t.id}
                  checked={on}
                  onChange={() => setChosen(t.id)}
                  className="sr-only"
                />
                <span className="chart-label text-ink-3">{t.name}</span>
                <span className="font-wide mt-1 text-2xl font-semibold">{t.range}</span>
                <span className="mt-1 text-sm text-ink-2">{t.for}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 border-b-2 border-ink py-6 sm:grid-cols-[1fr_auto] sm:items-end" aria-live="polite">
        <div>
          <p className="font-semibold">
            {tier.name}, {tier.range}: typically runs
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tier.runs.map((r) => (
              <li key={r} className="border border-grid bg-chart px-2.5 py-1 text-sm">{r}</li>
            ))}
          </ul>
          <p className="mt-4 max-w-[60ch] text-sm text-ink-3">
            Indicative only. We confirm the size after a site survey; the recommendation can change once we have seen
            your building and loads.
          </p>
        </div>
        <Link href={`/contact?service=solar&tier=${tier.id}`} className={buttonClass("primary")}>
          Quote for {tier.range}
        </Link>
      </div>
    </div>
  );
}
