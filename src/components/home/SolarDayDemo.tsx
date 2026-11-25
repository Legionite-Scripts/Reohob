"use client";

import { useState } from "react";

/** Illustrative day/night model: drag through the day to see what powers the building. Not a yield forecast. */
export default function SolarDayDemo() {
  const [h, setH] = useState<number>(12);
  const night = h < 6 || h >= 18;
  const mode = night
    ? "Battery supplies selected building loads"
    : h < 10
      ? "Panels generating · battery charging"
      : h < 16
        ? "Panels power the building · battery charging"
        : "Panels generating · evening reserve";
  const clock = `${String(h).padStart(2, "0")}:00`;
  const left = 8 + (h / 24) * 84;
  const top = night ? 42 : 28 + Math.abs(12 - h) * 2.1;

  return (
    <div className="solar-demo reveal delay-1">
      <div className="demo-top">
        <span>Illustrative system model · Lagos</span>
        <strong className="demo-clock" aria-hidden>{clock}</strong>
      </div>
      <div className={`sky${night ? " night" : ""}`} aria-hidden>
        <div className="sun-orb" style={{ left: `${left}%`, top: `${top}%` }} />
        <div className="demo-label label-panel">SOLAR ARRAY</div>
        <div className="demo-label label-house">YOUR BUILDING</div>
        <div className="panel-art" />
        <div className="house" />
        <div className="sky-line" />
      </div>
      <div className="energy-status" aria-live="polite">
        <span>{mode}</span>
        <strong>{night ? "BATTERY" : "SOLAR + BATTERY"}</strong>
      </div>
      <div className="range-wrap">
        <input
          type="range"
          min={0}
          max={24}
          step={1}
          value={h}
          onChange={(e) => setH(Number(e.target.value))}
          aria-label="Time of day"
          aria-valuetext={`${clock}: ${mode}`}
        />
        <div className="range-labels" aria-hidden>
          <span>06:00 SUNRISE</span>
          <span>12:00 MIDDAY</span>
          <span>18:00 SUNSET</span>
          <span>24:00</span>
        </div>
      </div>
      <p className="demo-foot">
        Illustrative only. Actual solar output and battery runtime depend on weather, shading, system size, battery
        capacity and usage. Use the slider to move through the day.
      </p>
    </div>
  );
}
