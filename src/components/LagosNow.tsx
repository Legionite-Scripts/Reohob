"use client";

import { useEffect, useState } from "react";
import { altitudeAt, dayOfYear, fmtClock, localMinutes, solarDay } from "@/lib/solar";
import { site } from "@/config/site";

const { lat, lng, utcOffsetHours } = site.solarSite;

/**
 * One quiet line under the hero that follows Lagos time: by day the panels carry the load,
 * after sunset the batteries do. Rendered after hydration only (the time is only known in the browser).
 */
export default function LagosNow({ tone = "paper" }: { tone?: "paper" | "night" }) {
  const night = tone === "night";
  const [line, setLine] = useState<{ time: string; day: boolean } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const m = localMinutes(now, utcOffsetHours);
      const d = solarDay(dayOfYear(now, utcOffsetHours), lat, lng, utcOffsetHours);
      setLine({ time: fmtClock(m), day: altitudeAt(m, d, lat) > 0 });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={`flex min-h-6 items-center gap-2.5 text-[0.9375rem] ${night ? "text-white/90" : "text-ink-2"}`} aria-live="off">
      <span
        aria-hidden
        className={`inline-block size-3 shrink-0 rounded-full border-2 ${night ? "border-white" : "border-ink"} ${line ? (line.day ? "bg-flare" : night ? "bg-night" : "bg-ink") : "bg-chart"}`}
      />
      {line ? (
        <span>
          {line.time} in Lagos:{" "}
          {line.day ? "panels would be powering your building now." : "your batteries would be carrying the load now."}
        </span>
      ) : (
        <span>Solar by day, batteries by night.</span>
      )}
    </p>
  );
}
