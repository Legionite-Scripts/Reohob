"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { trainingPackages, getPackage } from "@/config/training";
import Link from "next/link";
import { naira, site, whatsappHref } from "@/config/site";
import {
  FormError,
  Honeypot,
  SelectField,
  SubmitButton,
  TextField,
  firstError,
  postJson,
  type FieldErrors,
} from "@/components/forms";
import { buttonClass } from "@/components/ui";

const DRAFT_KEY = "reohob-training-draft";

type Details = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  basicKnowledge: string;
  packageId: string;
  address: string;
};

const empty: Details = { firstName: "", lastName: "", email: "", phone: "", basicKnowledge: "", packageId: "", address: "" };

/** Register → confirm → pay. The price shown comes from config; the server sets the charge itself. */
export default function TrainingFlow() {
  const [step, setStep] = useState<"details" | "confirm">("details");
  const [d, setD] = useState<Details>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Restore an unfinished registration (e.g. after switching to WhatsApp and back), then apply
    // a deep link like /training?package=onsite-gold#register on top of it.
    let draft: Partial<Details> = {};
    try {
      draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}");
    } catch {
      /* storage unavailable */
    }
    const p = new URLSearchParams(window.location.search).get("package");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read once after hydration
    setD((x) => ({ ...x, ...draft, ...(p && getPackage(p) ? { packageId: p } : {}) }));

    // "Register for …" links in the outline choose the package in place instead of reloading the page.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[data-register-package]");
      if (!a) return;
      e.preventDefault();
      const id = a.dataset.registerPackage!;
      setStep("details");
      setD((x) => ({ ...x, packageId: id }));
      setErrors((er) => ({ ...er, packageId: undefined }));
      const url = new URL(window.location.href);
      url.searchParams.set("package", id);
      url.hash = "register";
      window.history.replaceState(null, "", url);
      document.getElementById("register")?.scrollIntoView();
      requestAnimationFrame(() => document.querySelector<HTMLInputElement>(`#register input[value="${id}"]`)?.focus({ preventScroll: true }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch {
      /* storage unavailable */
    }
  }, [d]);

  useEffect(() => {
    if (step === "confirm") headingRef.current?.focus();
  }, [step]);
  useEffect(() => {
    if (error) alertRef.current?.focus();
  }, [error]);

  const set = (k: keyof Details) => (e: { target: { value: string } }) => {
    setD((x) => ({ ...x, [k]: e.target.value }));
    // Clear a field's error as soon as the user changes it.
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const pkg = getPackage(d.packageId);

  function toConfirm(e: FormEvent) {
    e.preventDefault();
    const fe: FieldErrors = {};
    if (!d.firstName.trim()) fe.firstName = ["Enter your first name"];
    if (!d.lastName.trim()) fe.lastName = ["Enter your last name"];
    if (!/^\S+@\S+\.\S+$/.test(d.email)) fe.email = ["Enter a valid email address"];
    if (d.phone.replace(/\D/g, "").length < 7) fe.phone = ["Enter a phone number we can call"];
    if (!d.basicKnowledge) fe.basicKnowledge = ["Choose yes or no"];
    if (!d.packageId) fe.packageId = ["Choose a package"];
    if (d.address.trim().length < 5) fe.address = ["Enter your address"];
    setErrors(fe);
    setError("");
    if (Object.keys(fe).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>("#register [aria-invalid=true]")?.focus());
      return;
    }
    setStep("confirm");
  }

  async function pay() {
    setBusy(true);
    setError("");
    const res = await postJson<{ ok: boolean; authorizationUrl?: string; error?: string; fieldErrors?: FieldErrors }>(
      "/api/training/initialize",
      { ...d, startedAt: startedAt.current },
    );
    if (res.ok && res.authorizationUrl) {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* storage unavailable */
      }
      window.location.assign(res.authorizationUrl);
      return;
    }
    setBusy(false);
    if (res.fieldErrors) {
      setErrors(res.fieldErrors);
      setStep("details");
    }
    setError(res.error ?? "We couldn't start the payment. Please try again.");
  }

  if (step === "confirm" && pkg) {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="h-block">
          Check your details, then pay
        </h3>
        <dl className="mt-5 border-t border-grid">
          {[
            ["Name", `${d.firstName} ${d.lastName}`],
            ["Email", d.email],
            ["Phone", d.phone],
            ["Basic engineering knowledge", d.basicKnowledge],
            ["Address", d.address],
            ["Package", pkg.name],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-grid py-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
              <dt className="text-ink-3">{k}</dt>
              <dd className="font-semibold break-words">{v}</dd>
            </div>
          ))}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
            <dt className="font-semibold">Amount to pay</dt>
            <dd className="font-wide text-3xl font-semibold">{naira(pkg.price)}</dd>
          </div>
        </dl>
        <div className="mt-2 border border-ink bg-chart p-4">
          <p className="font-semibold">Before you pay</p>
          <dl className="mt-2 grid gap-2 text-[0.9375rem]">
            <div className="grid gap-x-3 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]">
              <dt className="text-ink-3">Refunds and transfers</dt>
              <dd>
                See <Link href="/terms#training" className="underline">training terms</Link> before paying.
              </dd>
            </div>
            <div className="grid gap-x-3 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]">
              <dt className="text-ink-3">Questions first?</dt>
              <dd>
                Call <a className="underline" href={`tel:${site.contact.phones[0].tel}`}>{site.contact.phones[0].display}</a> or{" "}
                <a className="underline" href={whatsappHref("Hello Reohob, I have a question about the training programme.")} target="_blank" rel="noopener noreferrer">
                  message us on WhatsApp
                </a>.
              </dd>
            </div>
          </dl>
        </div>
        {error ? <div className="mt-4"><FormError ref={alertRef} message={error} /></div> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setStep("details")} className={buttonClass("outline")} disabled={busy}>
            Back
          </button>
          <button type="button" onClick={pay} disabled={busy} className={buttonClass("sun")}>
            {busy ? "Opening Paystack…" : `Pay ${naira(pkg.price)} with Paystack`}
          </button>
        </div>
        <p className="mt-4 text-sm text-ink-3">
          You&apos;ll be taken to Paystack&apos;s secure page to pay by card, bank transfer or USSD, then brought back
          here. Your registration is confirmed once we&apos;ve verified the payment.
        </p>
      </div>
    );
  }

  const err = (k: string) => firstError(errors, k);
  return (
    <form onSubmit={toConfirm} noValidate className="relative grid gap-5">
      <Honeypot />
      <fieldset>
        <legend className="text-[0.9375rem] font-semibold">
          Package <span className="font-normal text-ink-3">(required)</span>
        </legend>
        <div className="mt-2 grid gap-2">
          {trainingPackages.map((p) => {
            const on = d.packageId === p.id;
            return (
              <label
                key={p.id}
                className={`flex cursor-pointer items-center justify-between gap-4 border-2 px-4 py-3 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sun ${
                  on ? "border-ink bg-paper" : "border-rule hover:border-ink-3"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="packageId"
                    value={p.id}
                    checked={on}
                    onChange={set("packageId")}
                    className="size-4 accent-[var(--color-ink)]"
                    aria-describedby={err("packageId") ? "t-package-err" : undefined}
                  />
                  <span>
                    <span className="block font-semibold">{p.short}</span>
                    <span className="block text-sm text-ink-3">{p.mode} · {p.duration}</span>
                  </span>
                </span>
                <span className="font-semibold whitespace-nowrap">{naira(p.price)}</span>
              </label>
            );
          })}
        </div>
        {err("packageId") ? <p id="t-package-err" className="mt-1.5 text-sm font-medium text-error">{err("packageId")}</p> : null}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="t-first" label="First name" autoComplete="given-name" required value={d.firstName} onChange={set("firstName")} error={err("firstName")} />
        <TextField id="t-last" label="Last name" autoComplete="family-name" required value={d.lastName} onChange={set("lastName")} error={err("lastName")} />
        <TextField id="t-email" type="email" label="Email" autoComplete="email" required value={d.email} onChange={set("email")} error={err("email")} />
        <TextField id="t-phone" type="tel" label="Phone" autoComplete="tel" required value={d.phone} onChange={set("phone")} error={err("phone")} />
      </div>
      <SelectField
        id="t-knowledge"
        label="Do you have basic engineering knowledge?"
        options={["Yes", "No"]}
        required
        value={d.basicKnowledge}
        onChange={set("basicKnowledge")}
        error={err("basicKnowledge")}
      />
      <TextField id="t-address" label="Address" hint="For your registration record and certificate." autoComplete="street-address" required value={d.address} onChange={set("address")} error={err("address")} />
      {error ? <FormError ref={alertRef} message={error} /> : null}
      <div><SubmitButton busy={false}>Continue to confirm</SubmitButton></div>
    </form>
  );
}
