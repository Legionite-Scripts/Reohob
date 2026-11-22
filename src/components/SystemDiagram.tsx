/**
 * One combined system, drawn as a simple single-line diagram:
 * panels and grid/generator feed the inverter; the inverter charges the battery and supplies the building.
 */
export default function SystemDiagram() {
  const box = "fill-paper stroke-ink";
  const lbl = { font: "700 15px var(--font-display)", fontVariationSettings: '"wdth" 100' } as const;
  const sub = { font: "500 12.5px var(--font-sans)" } as const;
  return (
    <figure className="border border-ink bg-paper p-4 sm:p-6">
      {/* Phones: the same flow as a vertical sequence, legible at 390px */}
      <ol className="grid gap-0 sm:hidden" aria-label="How a Reohob power system fits together">
        {[
          ["Solar panels", "250–445 W each · generate power by day", "bg-sun"],
          ["Grid or generator", "optional backup input", "bg-paper border-dashed"],
          ["Inverter", "1–100 kVA · supplies the building, charges the batteries", "bg-ink"],
          ["Batteries", "100–210 Ah · carry the building at night and in outages", "bg-ink"],
          ["Your building", "AC supply, day and night", "bg-paper"],
        ].map(([t, d, sw], i, arr) => (
          <li key={t} className="relative grid grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)] gap-3 pb-5 last:pb-0">
            {i < arr.length - 1 ? <span aria-hidden className="absolute top-6 bottom-0 left-[0.8rem] w-0.5 bg-ink" /> : null}
            <span aria-hidden className={`relative mt-0.5 size-6 border-2 border-ink ${sw}`} />
            <span><span className="block font-semibold">{t}</span><span className="block text-sm text-ink-2">{d}</span></span>
          </li>
        ))}
      </ol>
      <svg viewBox="0 0 720 300" className="hidden h-auto w-full sm:block" role="img" aria-labelledby="sysdiag-t sysdiag-d">
        <title id="sysdiag-t">How a Reohob power system fits together</title>
        <desc id="sysdiag-d">
          Solar panels and the grid or a generator feed the inverter. The inverter charges the battery bank and supplies
          the building. At night the battery feeds the inverter.
        </desc>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-ink)" />
          </marker>
        </defs>

        {/* Sources */}
        <g>
          <rect x="10" y="30" width="170" height="80" className={box} strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={24 + i * 37} y="44" width="30" height="20" fill="var(--color-sun)" stroke="var(--color-ink)" />
          ))}
          <text x="24" y="86" style={lbl} className="fill-ink">Solar panels</text>
          <text x="24" y="102" style={sub} className="fill-ink-3">250–445 W each</text>
        </g>
        <g>
          <rect x="10" y="190" width="170" height="80" className={box} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="24" y="226" style={lbl} className="fill-ink">Grid / generator</text>
          <text x="24" y="244" style={sub} className="fill-ink-3">backup input</text>
        </g>

        {/* Inverter */}
        <rect x="280" y="100" width="170" height="100" fill="var(--color-ink)" />
        <text x="296" y="144" style={lbl} fill="#fff">Inverter</text>
        <text x="296" y="164" style={sub} fill="var(--color-moon)">1–100 kVA</text>

        {/* Battery */}
        <rect x="280" y="232" width="170" height="58" className={box} strokeWidth="1.5" />
        <rect x="294" y="246" width="22" height="30" fill="var(--color-ink)" />
        <rect x="320" y="246" width="22" height="30" fill="var(--color-ink)" />
        <text x="352" y="260" style={lbl} className="fill-ink">Batteries</text>
        <text x="352" y="276" style={sub} className="fill-ink-3">100–210 Ah</text>

        {/* Load */}
        <rect x="550" y="100" width="160" height="100" className={box} strokeWidth="1.5" />
        <path d="M600 170 L630 140 L660 170 Z M610 170 V190 H650 V170" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
        <text x="566" y="128" style={lbl} className="fill-ink">Your building</text>

        {/* Lines */}
        <path d="M180 70 H230 V130 H276" fill="none" stroke="var(--color-sun-deep)" strokeWidth="2.5" markerEnd="url(#arr)" />
        <path d="M180 230 H230 V172 H276" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arr)" />
        <path d="M450 150 H546" fill="none" stroke="var(--color-ink)" strokeWidth="3" markerEnd="url(#arr)" />
        <path d="M352 200 V228" fill="none" stroke="var(--color-ink)" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M378 228 V204" fill="none" stroke="var(--color-ink)" strokeWidth="2" markerEnd="url(#arr)" />
        <text x="458" y="140" style={sub} className="fill-ink-2">AC supply</text>
        <text x="390" y="222" style={sub} className="fill-ink-2">charge / discharge</text>
      </svg>
      <figcaption className="mt-3 text-sm text-ink-3">
        Panels feed the inverter by day; the batteries carry the building through the night and outages. The grid or a
        generator can top up the batteries when the sun can&apos;t.
      </figcaption>
    </figure>
  );
}
