"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Map facade: the Google Maps embed (~400 KB) loads only when the visitor asks for it,
 * which saves data on mobile connections. The address and a direct link are always shown.
 */
export default function MapEmbed({ query, label }: Readonly<{ query: string; label: string }>) {
  const [show, setShow] = useState(false);
  return (
    <div className="chart-field relative aspect-[4/3] w-full sm:aspect-[21/9]">
      {show ? (
        <iframe
          title={`Map: ${label}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-full border-2 border-ink bg-sun">
            <MapPin aria-hidden className="size-6" />
          </span>
          <p className="max-w-[36ch] bg-paper px-2 font-semibold">{label}</p>
          <button
            type="button"
            onClick={() => setShow(true)}
            className="min-h-12 border border-ink bg-paper px-5 py-3 font-semiwide text-[0.9375rem] font-semibold hover:bg-ink hover:text-white"
          >
            Show map
          </button>
        </div>
      )}
    </div>
  );
}
