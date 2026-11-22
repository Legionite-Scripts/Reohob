"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { contactServices, getService, type ExtraField } from "@/config/forms";
import { sizingTiers } from "@/content/services";
import { site, whatsappHref } from "@/config/site";
import {
  FieldError,
  FormError,
  FormSuccess,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  checks,
  firstError,
  postJson,
  type FieldErrors,
} from "@/components/forms";

type Status =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "error"; message: string; offerWhatsApp?: boolean }
  | { kind: "sent"; service: string };

type Fields = { name: string; email: string; phone: string; location: string; message: string };
const emptyFields: Fields = { name: "", email: "", phone: "", location: "", message: "" };
const DRAFT_KEY = "reohob-contact-draft";

/** Small, wide-ish fields sit two to a row on phones; everything else takes the full width. */
const isCompact = (f: ExtraField) => f.type === "number";

function ExtraInput({ f, error, value, onChange }: { f: ExtraField; error?: string; value: unknown; onChange: (v: unknown) => void }) {
  const id = `extra-${f.name}`;
  const span = isCompact(f) ? "" : "col-span-2";
  if (f.type === "select") {
    return (
      <SelectField className={span} id={id} label={f.label} options={f.options} required={f.required} error={error} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
    );
  }
  if (f.type === "number") {
    return (
      <TextField className={span} id={id} type="number" inputMode="numeric" min={f.min} max={f.max} label={f.label} required={f.required} error={error} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
    );
  }
  if (f.type === "text") {
    return (
      <TextField className={span} id={id} label={f.label} placeholder={f.placeholder} required={f.required} error={error} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
    );
  }
  const arr = (value as string[]) ?? [];
  return (
    <fieldset className="col-span-2">
      <legend className="text-[0.9375rem] font-semibold">{f.label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {f.options.map((o) => {
          const on = arr.includes(o);
          return (
            <label key={o} className={`flex min-h-11 cursor-pointer items-center gap-2 border px-3 py-2 text-[0.9375rem] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sun ${on ? "border-ink bg-sun-soft" : "border-rule"}`}>
              <input
                type="checkbox"
                className="size-4 accent-[var(--color-ink)]"
                checked={on}
                onChange={() => onChange(on ? arr.filter((x) => x !== o) : [...arr, o])}
              />
              {o}
            </label>
          );
        })}
      </div>
      {error ? <FieldError id={`${id}-err`}>{error}</FieldError> : null}
    </fieldset>
  );
}

/** Mirror of the server rules for the chosen service, so most errors appear without a round trip. */
function validate(service: string, f: Fields, extra: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {};
  const svc = getService(service);
  if (!svc) e.service = ["Choose a service"];
  for (const k of ["name", "email", "phone"] as const) {
    const m = checks[k](f[k]);
    if (m) e[k] = [m];
  }
  if ((!svc || !svc.extra.length) && f.message.trim().length < 10) {
    e.message = ["Tell us a little about what you need (at least 10 characters)"];
  }
  for (const x of svc?.extra ?? []) {
    const v = extra[x.name];
    if ("required" in x && x.required && (v === undefined || v === "" || (Array.isArray(v) && !v.length))) {
      e[`extra.${x.name}`] = [x.type === "select" ? "Choose an option" : `Enter ${x.label.toLowerCase()}`];
    }
    if (x.type === "number" && v !== undefined && v !== "") {
      const n = Number(v);
      if (!Number.isInteger(n)) e[`extra.${x.name}`] = ["Whole numbers only"];
      else if (n < (x.min ?? 0)) e[`extra.${x.name}`] = [`Enter ${x.min ?? 0} or more`];
      else if (x.max !== undefined && n > x.max) e[`extra.${x.name}`] = [`Enter ${x.max} or fewer`];
    }
  }
  return e;
}

export default function ContactForm() {
  const [service, setService] = useState("");
  const [tierId, setTierId] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>(emptyFields);
  // Answers are kept per service, so switching service and back doesn't wipe what was typed.
  const [extras, setExtras] = useState<Record<string, Record<string, unknown>>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [restored, setRestored] = useState(false);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const tier = sizingTiers.find((t) => t.id === tierId);
  const svc = getService(service);
  const extra = extras[service] ?? {};

  // After hydration: restore an unfinished draft, then apply prefill links like
  // /contact?service=epc or ?service=solar&tier=home&plan=yes on top of it.
  useEffect(() => {
    startedAt.current = Date.now();
    let draft: { service?: string; fields?: Partial<Fields>; extras?: Record<string, Record<string, unknown>> } = {};
    try {
      draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}");
    } catch {
      /* storage unavailable */
    }
    const q = new URLSearchParams(window.location.search);
    const fromUrl = getService(q.get("service") ?? "");
    const chosen = fromUrl?.id ?? (draft.service && getService(draft.service) ? draft.service : "");
    const nextExtras = { ...(draft.extras ?? {}) };
    if (q.get("plan") === "yes") nextExtras.solar = { ...(nextExtras.solar ?? {}), paymentPlan: "Yes" };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state (URL, sessionStorage) read once after hydration
    setService(chosen);
    setTierId(q.get("tier"));
    setFields({ ...emptyFields, ...(draft.fields ?? {}) });
    setExtras(nextExtras);
    setRestored(Boolean(draft.fields && Object.values(draft.fields).some(Boolean)));
  }, []);

  // Save the draft as the visitor types (cleared once sent).
  useEffect(() => {
    if (status.kind === "sent") return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ service, fields, extras }));
    } catch {
      /* storage unavailable */
    }
  }, [service, fields, extras, status.kind]);

  useEffect(() => {
    if (status.kind === "error") {
      // Field errors: go straight to the first one. Otherwise focus the message.
      const bad = formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]");
      (bad ?? alertRef.current)?.focus();
    }
    if (status.kind === "sent") successRef.current?.focus();
  }, [status]);

  const clearError = (k: string) => {
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const setField = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    clearError(k);
  };
  const setExtra = (name: string, v: unknown) => {
    setExtras((x) => ({ ...x, [service]: { ...(x[service] ?? {}), [name]: v } }));
    clearError(`extra.${name}`);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const local = validate(service, fields, extra);
    if (Object.keys(local).length) {
      setErrors(local);
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      return;
    }
    const fd = new FormData(e.currentTarget);
    setStatus({ kind: "busy" });
    setErrors({});
    const res = await postJson("/api/contact", {
      service,
      ...fields,
      website: fd.get("website"),
      startedAt: startedAt.current,
      extra,
    });
    if (res.ok) {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* storage unavailable */
      }
      setStatus({ kind: "sent", service: svc?.label ?? "your enquiry" });
      return;
    }
    setErrors(res.fieldErrors ?? {});
    setStatus({ kind: "error", message: res.error ?? "Something went wrong. Please try again.", offerWhatsApp: Boolean(res.timedOut) || !res.fieldErrors });
  }

  if (status.kind === "sent") {
    return (
      <FormSuccess ref={successRef} title="Message sent. Thank you.">
        <p>
          We&apos;ve received your {status.service.toLowerCase()} enquiry and an engineer will get back to you. If
          it&apos;s urgent, call{" "}
          <a className="underline" href={`tel:${site.contact.phones[0].tel}`}>{site.contact.phones[0].display}</a> or{" "}
          <a className="underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
        </p>
      </FormSuccess>
    );
  }

  const busy = status.kind === "busy";
  const err = (k: string) => firstError(errors, k);
  const messageRequired = !svc || !svc.extra.length;
  const waText = `Hello Reohob, I'd like a quote${svc ? ` for ${svc.label.toLowerCase()}` : ""}.${fields.name ? ` My name is ${fields.name}.` : ""}`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-6" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-ink-3">
        Fields marked required must be filled in. We use your details only to reply to this enquiry.
        {restored ? " We've kept what you typed last time." : ""}
      </p>
      <Honeypot />

      <SelectField
        id="service"
        name="service"
        label="What do you need?"
        required
        placeholder="Choose a service…"
        options={contactServices.map((s) => ({ value: s.id, label: s.label }))}
        value={service}
        onChange={(e) => {
          setService(e.target.value);
          clearError("service");
        }}
        error={err("service")}
      />
      {svc?.hint || (tier && service === "solar") ? (
        <div className="-mt-3 space-y-1 text-sm text-ink-2" aria-live="polite">
          {svc?.hint ? (
            <p>
              {svc.hint}
              {svc.id === "training" ? <> <Link href="/training" className="underline">Go to Training</Link>.</> : null}
            </p>
          ) : null}
          {tier && service === "solar" ? (
            <p>You picked the {tier.name} size ({tier.range}). We&apos;ll confirm it after the survey.</p>
          ) : null}
        </div>
      ) : null}

      {svc && svc.extra.length ? (
        <fieldset className="border-l-2 border-sun pl-4 sm:pl-5">
          <legend className="chart-label mb-3 text-ink-3">About your {svc.label.split(" (")[0].toLowerCase()} needs</legend>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-5">
            {svc.extra.map((f) => (
              <ExtraInput key={f.name} f={f} error={err(`extra.${f.name}`)} value={extra[f.name]} onChange={(v) => setExtra(f.name, v)} />
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" name="name" label="Full name" autoComplete="name" required value={fields.name} onChange={setField("name")} error={err("name")} />
        <TextField id="phone" name="phone" type="tel" label="Phone or WhatsApp number" autoComplete="tel" inputMode="tel" required value={fields.phone} onChange={setField("phone")} error={err("phone")} />
        <TextField id="email" name="email" type="email" label="Email" autoComplete="email" required value={fields.email} onChange={setField("email")} error={err("email")} />
        <TextField id="location" name="location" label="Location or address" autoComplete="street-address" value={fields.location} onChange={setField("location")} error={err("location")} />
      </div>
      <TextAreaField
        id="message"
        name="message"
        label={messageRequired ? "Message" : "Anything else? (optional)"}
        required={messageRequired}
        value={fields.message}
        onChange={setField("message")}
        error={err("message")}
        hint={
          messageRequired
            ? "What you want to run or build, how many hours of backup you need, and anything else we should know."
            : "Hours of backup you need, timing, or anything else we should know."
        }
      />

      {status.kind === "error" ? (
        <FormError ref={alertRef} message={status.message}>
          {status.offerWhatsApp ? (
            <a className="font-semibold underline" href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer">
              Send this enquiry on WhatsApp instead
            </a>
          ) : null}
        </FormError>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton busy={busy}>Send enquiry</SubmitButton>
        <p className="text-sm text-ink-3">Phone and online consultations are free.</p>
      </div>
    </form>
  );
}
