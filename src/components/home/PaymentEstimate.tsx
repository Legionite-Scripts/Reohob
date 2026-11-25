"use client";

import { useId, useState } from "react";
import { financePlan, naira, site } from "@/config/site";

/** Slider estimate for a payment plan: flat monthly rate on the full price, as in the published example. */
export default function PaymentEstimate() {
  const id = useId();
  const { minMonths, maxMonths, monthlyFlatRate, exampleSystemPrice, exampleMonths } = site.financing;
  const [price, setPrice] = useState<number>(exampleSystemPrice);
  const [months, setMonths] = useState<number>(exampleMonths);
  const p = financePlan(price, months);
  const monthsText = `${months} month${months === 1 ? "" : "s"}`;

  return (
    <div className="payment-box reveal delay-1">
      <div className="calc-head">
        <strong>Plan your monthly estimate</strong>
        <span>ILLUSTRATIVE ONLY</span>
      </div>
      <label className="field-label" htmlFor={`${id}-price`}>
        <span>Example system price</span>
        <strong>{naira(price)}</strong>
      </label>
      <input
        id={`${id}-price`}
        type="range"
        min={500000}
        max={10000000}
        step={100000}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        aria-valuetext={naira(price)}
      />
      <label className="field-label" htmlFor={`${id}-months`}>
        <span>Repayment period</span>
        <strong>{monthsText}</strong>
      </label>
      <input
        id={`${id}-months`}
        type="range"
        min={minMonths}
        max={maxMonths}
        step={1}
        value={months}
        onChange={(e) => setMonths(Number(e.target.value))}
        aria-valuetext={monthsText}
      />
      <div className="calc-result" aria-live="polite">
        <div>
          <small>Illustrative monthly</small>
          <strong>{naira(Math.round(p.monthly))}</strong>
        </div>
        <div>
          <small>Illustrative total</small>
          <strong>{naira(Math.round(p.total))}</strong>
        </div>
      </div>
      <p className="calc-note">
        Worked example at a flat {monthlyFlatRate * 100}% a month on the full price. This is not a quotation or an offer
        of credit; terms, eligibility and repayments are subject to verification and written confirmation.
      </p>
    </div>
  );
}
