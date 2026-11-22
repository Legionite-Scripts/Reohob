"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui";

const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const GA = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "reohob-analytics-consent";

/**
 * Analytics slot.
 * - NEXT_PUBLIC_PLAUSIBLE_DOMAIN: cookieless analytics, loads with no notice.
 * - NEXT_PUBLIC_GA_ID: Google Analytics sets cookies, so it only loads after consent,
 *   and only then is a cookie notice shown.
 * With neither set, nothing loads and no notice appears.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in localStorage, readable only in the browser
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {
      /* storage blocked: ask again next visit */
    }
    setReady(true);
  }, []);

  const decide = (v: "granted" | "denied") => {
    setConsent(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  };

  return (
    <>
      {PLAUSIBLE ? (
        <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      ) : null}

      {GA && consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {GA && ready && consent === null ? (
        <div
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-20 lg:bottom-3 z-50 border border-ink bg-paper p-4 shadow-[0_8px_24px_color-mix(in_oklab,var(--color-ink)_18%,transparent)] sm:left-auto sm:max-w-md"
        >
          <p className="text-sm">
            We&apos;d like to use analytics cookies to understand how the site is used. You can say no; the site works the
            same. <Link href="/privacy" className="underline">Privacy policy</Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => decide("granted")} className={buttonClass("primary", "min-h-10 py-2")}>
              Allow
            </button>
            <button type="button" onClick={() => decide("denied")} className={buttonClass("outline", "min-h-10 py-2")}>
              No thanks
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
