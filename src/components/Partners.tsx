import { publishable, showPlaceholderFlags } from "@/config/site";
import { partners } from "@/content/partners";
import { Todo } from "@/components/ui";

/**
 * Partner list. With fewer than three partners a logo grid looks empty, so it
 * renders as a ruled list of names instead; the grid appears once there are enough.
 */
export default function Partners({ withKind = false, confirmedOnly = false }: Readonly<{ withKind?: boolean; confirmedOnly?: boolean }>) {
  const shown = partners.filter((p) => (confirmedOnly ? p.confirmed : publishable(p)));
  if (!shown.length && (confirmedOnly || !showPlaceholderFlags)) return null;

  if (shown.length < 3) {
    return (
      <div>
        <ul className="border-t border-grid">
          {shown.map((p) => (
            <li key={p.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-grid py-4">
              <span className="font-semiwide text-xl font-semibold">{p.name}</span>
              <span className="text-ink-2">{p.kind}</span>
              {!p.confirmed ? <Todo>Partnership to confirm</Todo> : null}
            </li>
          ))}
        </ul>
        {showPlaceholderFlags && !confirmedOnly ? <p className="mt-3"><Todo>More partners and logos to come</Todo></p> : null}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 border-t border-l border-grid sm:grid-cols-3 lg:grid-cols-5">
      {shown.map((p) => (
        <li key={p.name} className="flex min-h-28 flex-col items-center justify-center gap-2 border-r border-b border-grid p-4 text-center">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={p.name} className="max-h-12 w-auto" loading="lazy" />
          ) : (
            <span className="font-semiwide text-lg font-bold">{p.name}</span>
          )}
          {withKind ? <span className="text-sm text-ink-3">{p.kind}</span> : null}
          {!p.confirmed ? <Todo>Partnership to confirm</Todo> : null}
        </li>
      ))}
    </ul>
  );
}
