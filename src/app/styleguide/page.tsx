import SunPathChart from "@/components/SunPathChart";
import { ButtonLink, HourRule, SampleTag, Todo, WhatsAppButton, buttonClass } from "@/components/ui";
import { inputCls } from "@/components/forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Styleguide",
  description: "Internal design system reference.",
  path: "/styleguide",
  noindex: true,
});

const colours = [
  { token: "ink", hex: "#14261D", use: "Green-black text, dark rules, primary buttons", on: "15.9:1 on paper · 13.1:1 on concrete" },
  { token: "ink-2", hex: "#3F5248", use: "Secondary text", on: "8.4:1 on paper · 6.9:1 on concrete" },
  { token: "ink-3", hex: "#56665D", use: "Captions, meta, small caps labels", on: "6.1:1 on paper · 5.0:1 on concrete" },
  { token: "paper", hex: "#FFFFFF", use: "Reading ground", on: "—" },
  { token: "chart (concrete)", hex: "#ECE9E3", use: "Warm concrete bands, page headers, photo plates", on: "—" },
  { token: "chart-deep", hex: "#E2DED5", use: "Breeze-block screen on concrete and paper", on: "decorative" },
  { token: "grid", hex: "#DBD6CC", use: "Hairlines between rows and bands", on: "decorative" },
  { token: "rule", hex: "#7D786D", use: "Input borders, unselected/dashed outlines", on: "4.4:1 on paper · 3.6:1 on concrete" },
  { token: "night (tropical green)", hex: "#1C3B2E", use: "The one conversion band per page, footer", on: "white on it 12.3:1" },
  { token: "night-2", hex: "#24493A", use: "Raised panel on green", on: "—" },
  { token: "moon", hex: "#D3E2D8", use: "Secondary text on green", on: "9.1:1 on green" },
  { token: "sun (marigold)", hex: "#F5A300", use: "Main action and active state only. Never text on paper.", on: "ink on sun 7.6:1" },
  { token: "sun-deep", hex: "#8A5400", use: "Sun-family text", on: "6.3:1 on paper" },
  { token: "flare (laterite)", hex: "#B4532F", use: "Small accents, list bullets, chart output curve", on: "5.0:1 on paper; large only on concrete" },
  { token: "leaf", hex: "#2F6B4F", use: "Links in long-form text", on: "6.3:1 on paper" },
  { token: "ok / error", hex: "#1D6B45 / #B3261E", use: "Form outcomes", on: "6.5:1 / 6.5:1 on paper" },
];

const typeScale = [
  { name: "Display (H1 home)", cls: "font-wide text-[clamp(2.6rem,5.4vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em]", spec: "Jost · 500 · clamp(2.6rem, 5.4vw, 4.75rem) · -0.03em" },
  { name: "Page title (H1)", cls: "h-page", spec: "Jost · 500 · clamp(2.25rem, 4.6vw, 4rem)" },
  { name: "Chapter", cls: "h-chapter", spec: "Jost · 500 · clamp(1.9rem, 3.6vw, 3rem)" },
  { name: "Section (H2)", cls: "h-section", spec: "Jost · 500 · clamp(1.75rem, 3vw, 2.5rem)" },
  { name: "Sub-section", cls: "h-sub", spec: "Jost · 600 · clamp(1.375rem, 2.2vw, 1.75rem)" },
  { name: "Block (H3)", cls: "h-block", spec: "Jost · 600 · 1.375rem" },
  { name: "Body", cls: "text-[1.0625rem]", spec: "Public Sans · 400 · 1.0625rem / 1.65 · max 68ch · tabular figures" },
  { name: "Lede", cls: "text-xl text-ink-2", spec: "Public Sans · 400 · 1.25rem · ink-2" },
  { name: "Small caps label", cls: "chart-label", spec: "Jost · 500 · 0.8125rem · caps +0.09em. Units, spec lines, table heads. Never an eyebrow above a heading." },
];

export default function StyleguidePage() {
  return (
    <>
      <header className="chart-field-faint border-b border-grid">
        <div className="container-x py-14">
          <p className="chart-label text-ink-3">Internal · not indexed · not in navigation</p>
          <h1 className="h-page mt-2">Reohob design system</h1>
          <p className="mt-4 max-w-[64ch] text-lg text-ink-2">
            Lagos tropical modernism: the language of the city&apos;s 1960s–70s sun-shading architecture. White reading
            ground, warm concrete bands, deep tropical green, marigold for action, laterite accents. Jost at medium
            weights, never black.
          </p>
        </div>
        <HourRule />
      </header>

      <div className="container-x space-y-20 py-14">
        <section aria-labelledby="sg-colour">
          <h2 id="sg-colour" className="font-semiwide text-3xl font-semibold">Colour</h2>
          <p className="mt-2 text-ink-2">Strategy: warm restraint. Green-black carries text; deep green owns one conversion band per page and the footer; marigold marks the main action and active state only.</p>
          <ul className="mt-6 grid gap-0 border-t border-grid sm:grid-cols-2 lg:grid-cols-3">
            {colours.map((c) => (
              <li key={c.token} className="flex gap-4 border-b border-grid py-4 sm:pr-6">
                <span className="size-14 shrink-0 border border-ink" style={{ background: c.hex.split(" ")[0] }} />
                <div>
                  <p className="font-semibold">{c.token} <span className="font-normal text-ink-3">{c.hex}</span></p>
                  <p className="text-sm text-ink-2">{c.use}</p>
                  <p className="chart-label mt-1 text-ink-3">{c.on}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sg-type">
          <h2 id="sg-type" className="font-semiwide text-3xl font-semibold">Type</h2>
          <p className="mt-2 text-ink-2">
            Jost (a geometric modernist sans in the spirit of mid-century signage) for headings and small caps labels,
            at 500–600 only; Public Sans for body. Both self-hosted from /public/fonts. The brand speaks calmly: size and
            space carry hierarchy, not heavy weight.
          </p>
          <div className="mt-6 border-t border-grid">
            {typeScale.map((t) => (
              <div key={t.name} className="grid gap-2 border-b border-grid py-5 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
                <p className="chart-label pt-2 text-ink-3">{t.name}</p>
                <div>
                  <p className={t.cls}>Power that stays on</p>
                  <p className="mt-1 text-sm text-ink-3">{t.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="sg-space">
          <h2 id="sg-space" className="font-semiwide text-3xl font-semibold">Space and layout</h2>
          <ul className="prose-chart mt-4">
            <li>Container: max 84rem; gutters 1rem (phone), 1.5rem (≥640px), 2.5rem (≥1024px).</li>
            <li>Section rhythm: 4rem padding on phones, 6rem from 640px. More space above a heading than below it.</li>
            <li>Bands alternate paper and warm concrete; one deep-green band per page carries the conversion.</li>
            <li>Rules: warm 1px hairlines between rows and bands; 2px ink only for the start of a list or a selected item.</li>
            <li>Corners are square. Photographs are clean crops with no frame or pattern. Circles belong to the sun family only.</li>
            <li>Lists, tables and ruled rows instead of card grids. A box (border ink, paper fill) marks something you act on.</li>
          </ul>
          <div className="mt-6 flex flex-wrap items-end gap-2">
            {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((s) => (
              <div key={s} className="text-center">
                <div className="bg-ink" style={{ width: s, height: s }} />
                <p className="chart-label mt-1 text-ink-3">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="sg-comp">
          <h2 id="sg-comp" className="font-semiwide text-3xl font-semibold">Components</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="#">Primary</ButtonLink>
            <ButtonLink href="#" variant="sun">Sun (Get a Quote)</ButtonLink>
            <ButtonLink href="#" variant="outline">Outline</ButtonLink>
            <WhatsAppButton />
            <button type="button" disabled className={buttonClass("primary")}>Disabled</button>
          </div>
          <div className="on-night mt-6 flex flex-wrap gap-3 bg-night p-6">
            <ButtonLink href="#" variant="sun">Sun on night</ButtonLink>
            <ButtonLink href="#" variant="night-outline">Night outline</ButtonLink>
          </div>
          <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="sg-in" className="block text-[0.9375rem] font-semibold">Text field</label>
              <input id="sg-in" className={inputCls} placeholder="Placeholder" />
            </div>
            <div>
              <label htmlFor="sg-err" className="block text-[0.9375rem] font-semibold">Invalid field</label>
              <input id="sg-err" className={inputCls} aria-invalid defaultValue="not-an-email" />
              <p className="mt-1.5 text-sm font-medium text-error">Enter a valid email address</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Todo>To confirm</Todo> <SampleTag /> <span className="text-sm text-ink-3">Placeholder flags: hidden with NEXT_PUBLIC_SHOW_PLACEHOLDER_FLAGS=false.</span>
          </div>
          <div className="mt-8"><p className="chart-label mb-2 text-ink-3">Hour rule (section divider)</p><HourRule /></div>
          <div className="mt-8 max-w-xl border border-ink p-5"><SunPathChart /></div>
        </section>

        <section aria-labelledby="sg-motion">
          <h2 id="sg-motion" className="font-semiwide text-3xl font-semibold">Motion</h2>
          <ul className="prose-chart mt-4">
            <li>One authored moment: on the home page, the sun rises along its real arc to the current Lagos time in the &ldquo;Solar by day, batteries by night&rdquo; chart (1.8s, exponential ease-out).</li>
            <li>Everything else is state feedback only: colour and border changes at 200ms, arrows nudge 2–4px on hover.</li>
            <li>No scroll-triggered entrances. Content is visible by default.</li>
            <li>Reduced motion: the sun appears at the current time with no travel; all transitions collapse to near-instant.</li>
            <li>Easing token: --ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1).</li>
          </ul>
        </section>
      </div>
    </>
  );
}
