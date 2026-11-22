"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  altitudeAt,
  dayOfYear,
  fmtClock,
  localMinutes,
  relativeOutput,
  solarDay,
  supplyState,
  type SupplyState,
} from "@/lib/solar";
import { site } from "@/config/site";

const { lat, lng, utcOffsetHours, label: siteLabel } = site.solarSite;

// Geometry (viewBox units)
const W = 640;
const PL = 44; // plot left
const PR = 12;
const PW = W - PL - PR;
const HORIZON = 186;
const DEG = 1.9; // px per degree of altitude
const LOAD_Y = 224; // the uninterrupted-power line: its own stroke, clear of the horizon above and the strip below
const STRIP_Y = 240;
const STRIP_H = 22;
const H = 292;

const X = (m: number) => PL + (m / 1440) * PW;
const Y = (a: number) => HORIZON - a * DEG;

const stateCopy: Record<SupplyState, string> = {
  solar: "Panels power the building and charge the battery",
  shared: "Low sun: panels and battery share the load",
  battery: "Sun below the horizon: the battery powers the building",
};

const stateFill: Record<SupplyState, string> = {
  solar: "var(--color-sun)",
  shared: "var(--color-sun-soft)",
  battery: "var(--color-ink)",
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

type Props = Readonly<{ className?: string }>;

export default function SunPathChart({ className = "" }: Props) {
  const id = useId();
  // Deterministic first render (equinox, solar noon); the browser swaps in today's Lagos time.
  const [n, setN] = useState(80);
  const [minutes, setMinutes] = useState(12 * 60 + 46);
  const [live, setLive] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const sunRef = useRef<SVGCircleElement>(null);
  const cursorRef = useRef<SVGLineElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const dragging = useRef(false);
  // The opening animation stops the moment the visitor touches the chart, and never overrides them.
  const anim = useRef(0);
  const interacted = useRef(false);
  const today = useRef<number | null>(null);

  const day = useMemo(() => solarDay(n, lat, lng, utcOffsetHours), [n]);

  // On mount: move to "now" in Lagos. The sun rises along its real arc to the current time, once.
  // The animation writes to the DOM directly (sun, cursor, clock) and commits React state once at the
  // end, so it costs a few attribute writes per frame instead of a full re-render.
  useEffect(() => {
    const now = new Date();
    const todayN = dayOfYear(now, utcOffsetHours);
    const target = localMinutes(now, utcOffsetHours);
    const d = solarDay(todayN, lat, lng, utcOffsetHours);
    today.current = todayN;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const daytime = target > d.sunrise && target < d.sunset;
    if (reduce || !daytime) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the current Lagos time is only known in the browser
      setN(todayN);
      setMinutes(target);
      setLive(true);
      return;
    }
    let idle = 0;
    const start = () => {
      const t0 = performance.now();
      const dur = 1800;
      const from = d.sunrise;
      const tick = (t: number) => {
        if (interacted.current) return;
        const p = Math.min(1, (t - t0) / dur);
        const m = from + (target - from) * easeOutExpo(p);
        const a = Math.max(altitudeAt(m, d, lat), 0);
        sunRef.current?.setAttribute("cx", X(m).toFixed(1));
        sunRef.current?.setAttribute("cy", Y(a).toFixed(1));
        cursorRef.current?.setAttribute("x1", X(m).toFixed(1));
        cursorRef.current?.setAttribute("x2", X(m).toFixed(1));
        if (clockRef.current) clockRef.current.textContent = fmtClock(m);
        if (p < 1) anim.current = requestAnimationFrame(tick);
        else {
          setN(todayN);
          setMinutes(target);
          setLive(true);
        }
      };
      if (interacted.current) return;
      // Place the sun at sunrise on today's arc before it moves.
      setN(todayN);
      anim.current = requestAnimationFrame(tick);
    };
    // Wait until the page is idle so the animation never competes with loading.
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) idle = ric(start, { timeout: 1500 });
    else idle = window.setTimeout(start, 400);
    return () => {
      cancelAnimationFrame(anim.current);
      const cic = (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (cic) cic(idle);
      else clearTimeout(idle);
    };
  }, []);

  const samples = useMemo(() => {
    const pts: { m: number; a: number; o: number }[] = [];
    for (let m = 0; m <= 1440; m += 5) {
      const a = altitudeAt(m, day, lat);
      pts.push({ m, a, o: relativeOutput(a, day.maxAltitude) });
    }
    return pts;
  }, [day]);

  const arcPath = useMemo(() => {
    const above = samples.filter((p) => p.a > -1.5);
    return above.map((p, i) => `${i ? "L" : "M"}${X(p.m).toFixed(1)},${Y(Math.max(p.a, 0)).toFixed(1)}`).join("");
  }, [samples]);

  const outputPath = useMemo(() => {
    const top = HORIZON - 150;
    return samples
      .map((p, i) => `${i ? "L" : "M"}${X(p.m).toFixed(1)},${(HORIZON - p.o * (HORIZON - top)).toFixed(1)}`)
      .join("");
  }, [samples]);

  const runs = useMemo(() => {
    const out: { start: number; end: number; s: SupplyState }[] = [];
    for (let m = 0; m < 1440; m += 5) {
      const s = supplyState(altitudeAt(m + 2.5, day, lat));
      const last = out[out.length - 1];
      if (last && last.s === s) last.end = m + 5;
      else out.push({ start: m, end: m + 5, s });
    }
    return out;
  }, [day]);

  const alt = altitudeAt(minutes, day, lat);
  const state = supplyState(alt);
  const sunX = X(minutes);
  const sunY = Y(Math.max(alt, 0));
  const output = Math.round(relativeOutput(alt, day.maxAltitude) * 100);

  const userSet = (m: number) => {
    if (!interacted.current) {
      interacted.current = true;
      cancelAnimationFrame(anim.current);
      if (today.current !== null) setN(today.current);
      setLive(true);
    }
    setMinutes(m);
  };

  const setFromPointer = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * W;
    const m = Math.round(((x - PL) / PW) * 1440);
    userSet(Math.max(0, Math.min(1439, m)));
  };

  return (
    <figure className={`select-none ${className}`} aria-labelledby={`${id}-cap`}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b border-grid pb-2">
        <p ref={clockRef} className="font-wide text-[2rem] leading-none font-semibold sm:text-[2.5rem]" aria-hidden="true">
          {fmtClock(minutes)}
        </p>
        <p className="chart-label text-ink-2">
          {siteLabel}
          {live ? " · today" : ""}
        </p>
      </div>

      <div className="relative mt-2">
      {/* Axis labels in HTML so they stay legible at any chart width */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[30, 60].map((a) => (
          <span
            key={a}
            className="chart-label absolute -translate-y-1/2 text-[0.75rem] text-ink-3"
            style={{ left: 0, top: `${(Y(a) / H) * 100}%` }}
          >
            {a}°
          </span>
        ))}
        <span
          className="chart-label absolute hidden -translate-x-full -translate-y-full text-[0.75rem] whitespace-nowrap text-ink sm:block"
          style={{ left: `${((W - PR - 8) / W) * 100}%`, top: `${((LOAD_Y - 4) / H) * 100}%` }}
        >
          Power on · 24 h
        </span>
        {[0, 6, 12, 18, 24].map((h) => (
          <span
            key={h}
            className={`chart-label absolute text-[0.75rem] text-ink-2 ${h === 0 ? "" : h === 24 ? "-translate-x-full" : "-translate-x-1/2"}`}
            style={{ left: `${(X(h * 60) / W) * 100}%`, top: `${((STRIP_Y + STRIP_H + 6) / H) * 100}%` }}
          >
            {String(h).padStart(2, "0")}:00
          </span>
        ))}
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-pan-y"
        role="img"
        aria-labelledby={`${id}-title`}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setFromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <title id={`${id}-title`}>
          {`Sun path over Lagos. Sunrise ${fmtClock(day.sunrise)}, sunset ${fmtClock(day.sunset)}, highest ${Math.round(day.maxAltitude)} degrees.`}
        </title>

        {/* Altitude grid */}
        {[15, 30, 45, 60, 75].map((a) => (
          <line key={a} x1={PL} x2={W - PR} y1={Y(a)} y2={Y(a)} stroke="var(--color-grid)" strokeWidth="1" />
        ))}
        {/* Hour grid */}
        {Array.from({ length: 25 }, (_, h) => (
          <line
            key={h}
            x1={X(h * 60)}
            x2={X(h * 60)}
            y1={h % 3 === 0 ? Y(80) : HORIZON - 4}
            y2={HORIZON}
            stroke="var(--color-grid)"
            strokeWidth="1"
          />
        ))}

        {/* Clear-sky output curve (trend) */}
        <path d={outputPath} fill="none" stroke="var(--color-flare)" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Sun's path */}
        <path d={arcPath} fill="none" stroke="var(--color-ink)" strokeWidth="2" />

        {/* Horizon */}
        <line x1={PL} x2={W - PR} y1={HORIZON} y2={HORIZON} stroke="var(--color-ink)" strokeWidth="1.5" />

        {/* Supply strip: which source carries the load */}
        {runs.map((r) => (
          <rect
            key={r.start}
            x={X(r.start)}
            y={STRIP_Y}
            width={X(r.end) - X(r.start)}
            height={STRIP_H}
            fill={stateFill[r.s]}
          />
        ))}
        {/* The load line: the thesis. Unbroken across day and night, the heaviest stroke in the figure. */}
        <line x1={PL} x2={W - PR} y1={LOAD_Y} y2={LOAD_Y} stroke="var(--color-ink)" strokeWidth="4" />
        <circle cx={PL} cy={LOAD_Y} r="4" fill="var(--color-ink)" />
        <circle cx={W - PR} cy={LOAD_Y} r="4" fill="var(--color-ink)" />

        {/* Cursor + sun */}
        <line ref={cursorRef} x1={sunX} x2={sunX} y1={Y(82)} y2={STRIP_Y + STRIP_H} stroke="var(--color-ink)" strokeWidth="1" strokeDasharray="2 3" />
        {alt > 0 ? (
          <circle ref={sunRef} cx={sunX} cy={sunY} r="10" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="1.5" />
        ) : (
          <circle ref={sunRef} cx={sunX} cy={HORIZON} r="8" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.5" />
        )}
      </svg>
      </div>

      <label htmlFor={`${id}-range`} className="sr-only">
        Time of day in Lagos
      </label>
      <input
        id={`${id}-range`}
        type="range"
        min={0}
        max={1439}
        step={10}
        value={Math.round(minutes)}
        onChange={(e) => userSet(Number(e.target.value))}
        aria-valuetext={`${fmtClock(minutes)}. ${stateCopy[state]}.`}
        className="sun-range mt-1 block"
        style={{ marginLeft: `${(PL / W) * 100}%`, width: `${(PW / W) * 100}%` }}
      />

      <figcaption id={`${id}-cap`} className="mt-3">
        <p className="font-semibold">
          {stateCopy[state]}
          <span className="font-normal text-ink-2">
            {alt > 0 ? ` · sun ${Math.round(alt)}° up · output ${output}%` : ""}
          </span>
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2" aria-label="Legend">
          <li className="flex items-center gap-2"><span className="inline-block h-3 w-5 bg-sun" />Panels</li>
          <li className="flex items-center gap-2"><span className="inline-block h-3 w-5 border border-sun-deep bg-sun-soft" />Panels + battery</li>
          <li className="flex items-center gap-2"><span className="inline-block h-3 w-5 bg-ink" />Battery</li>
          <li className="flex items-center gap-2"><span className="inline-block h-0 w-5 border-t-4 border-ink" />Power to the building: on, 24 hours</li>
          <li className="flex items-center gap-2"><span className="inline-block h-0 w-5 border-t-2 border-dashed border-flare" />Clear-sky panel output</li>
        </ul>
        <p className="mt-3 text-sm text-ink-3">
          Illustration: the sun&apos;s real path over Lagos and a clear-day model of a solar, inverter and battery system. Real output depends on weather, shading and system size. Drag or use the arrow keys to move through the day.
        </p>
      </figcaption>
    </figure>
  );
}
