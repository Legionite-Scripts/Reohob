"use client";

import { useId, useState } from "react";
import { financePlan, naira, site } from "@/config/site";

/** Payment-plan calculator: 3% a month, flat, on the full price. */
export default function FinanceCalculator() {
  const id = useId();
  const { minMonths, maxMonths, monthlyFlatRate, exampleSystemPrice, exampleMonths } = site.financing;
  const [price, setPrice] = useState<number>(exampleSystemPrice);
  const [months, setMonths] = useState<number>(exampleMonths);
  const p = financePlan(price || 0, months);

  return (
    <div className="border-t-2 border-ink pt-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-price`} className="chart-label text-ink-2">System price (₦)</label>
          <input
            id={`${id}-price`}
            inputMode="numeric"
            className="mt-2 block w-full border border-rule bg-paper px-3 py-3 text-lg font-semibold text-ink"
            value={price ? price.toLocaleString("en-NG") : ""}
            onChange={(e) => setPrice(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
          />
        </div>
        <div>
          <label htmlFor={`${id}-months`} className="chart-label text-ink-2">
            Spread over: <span className="text-ink">{months} {months === 1 ? "month" : "months"}</span>
          </label>
          <input
            id={`${id}-months`}
            type="range"
            min={minMonths}
            max={maxMonths}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="sun-range mt-1 block w-full"
          />
        </div>
      </div>
      <dl className="mt-6 divide-y divide-grid" aria-live="polite">
        <div className="flex flex-wrap justify-between gap-x-4 py-3">
          <dt className="text-ink-2">Interest: {monthlyFlatRate * 100}% × {months} = {Math.round(p.ratePct)}%</dt>
          <dd className="font-semibold">{naira(Math.round(p.interest))}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4 py-3">
          <dt className="text-ink-2">Total repayable</dt>
          <dd className="font-semibold">{naira(Math.round(p.total))}</dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 pt-4">
          <dt className="font-semibold">Monthly payment</dt>
          <dd className="font-wide text-3xl font-semibold sm:text-4xl">{naira(Math.round(p.monthly))}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-ink-3">
        Illustration only. A payment plan is subject to verification and approval.
      </p>
    </div>
  );
}
