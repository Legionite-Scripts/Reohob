"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { checks, postJson, type FieldErrors } from "@/components/forms";
import { site, whatsappHref } from "@/config/site";

const projectTypes = [
  "Residential solar / inverter",
  "Commercial energy system",
  "EV charging",
  "Security screening",
  "Engineering / EPC",
  "Solar training",
  "Partnership",
  "Other",
];
const backupOptions = ["4–6 hours", "6–8 hours", "8–12 hours", "12–24 hours", "Continuous / commercial", "Not sure yet"];

type Errors = Record<string, string>;

/**
 * Homepage enquiry form. Sends through the same /api/contact endpoint (and SMTP) as the contact page,
 * as an "Other" enquiry with the project details written into the message.
 */
export default function HomeQuoteForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | { error: string }>("idle");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (typeof status === "object") formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Errors = {};
    const n = checks.name(d.name ?? "");
    if (n) errs.name = n;
    const ph = checks.phone(d.phone ?? "");
    if (ph) errs.phone = ph;
    const em = checks.email(d.email ?? "");
    if (em) errs.email = em;
    if (!d.project) errs.project = "Choose a project type";
    if (!d.location?.trim()) errs.location = "Enter the project location";
    setErrors(errs);
    if (Object.keys(errs).length) return setStatus({ error: "Please check the highlighted fields." });

    const message = [
      `Project type: ${d.project}`,
      d.backup ? `Preferred backup: ${d.backup}` : "",
      d.loads?.trim() ? `To power: ${d.loads.trim()}` : "",
      d.details?.trim() ? `Details: ${d.details.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("busy");
    const res = await postJson("/api/contact", {
      service: "other",
      name: d.name,
      phone: d.phone,
      email: d.email,
      location: d.location,
      message,
      website: d.website,
      startedAt: startedAt.current,
    });
    if (res.ok) return setStatus("sent");
    const fe: FieldErrors = res.fieldErrors ?? {};
    const mapped: Errors = {};
    for (const k of ["name", "phone", "email", "location"]) if (fe[k]?.[0]) mapped[k] = fe[k]![0];
    setErrors(mapped);
    setStatus({ error: res.error ?? "Something went wrong. Please try again, or message us on WhatsApp." });
  }

  if (status === "sent") {
    return (
      <div className="sent" ref={sentRef} tabIndex={-1} role="status">
        <h3>Enquiry sent. Thank you.</h3>
        <p>
          An engineer will come back to you with a recommendation. If it&apos;s urgent, call{" "}
          <a href={`tel:${site.contact.phones[0].tel}`} className="text-link">{site.contact.phones[0].display}</a>.
        </p>
      </div>
    );
  }

  const field = (name: string) => ({
    name,
    id: `hq-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `hq-${name}-err` : undefined,
    onInput: () => errors[name] && setErrors((er) => ({ ...er, [name]: "" })),
  });
  const err = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`hq-${name}-err`}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <form ref={formRef} className="quote-form reveal delay-1" onSubmit={onSubmit} noValidate aria-label="Project enquiry">
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-field">
        <label htmlFor="hq-name">Full name *</label>
        <input {...field("name")} autoComplete="name" placeholder="Your name" required />
        {err("name")}
      </div>
      <div className="form-field">
        <label htmlFor="hq-phone">Phone number *</label>
        <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+234" required />
        {err("phone")}
      </div>
      <div className="form-field">
        <label htmlFor="hq-email">Email address *</label>
        <input {...field("email")} type="email" autoComplete="email" placeholder="you@company.com" required />
        {err("email")}
      </div>
      <div className="form-field">
        <label htmlFor="hq-project">Project type *</label>
        <select {...field("project")} defaultValue="" required onChange={() => errors.project && setErrors((er) => ({ ...er, project: "" }))}>
          <option value="" disabled>Select a project</option>
          {projectTypes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {err("project")}
      </div>
      <div className="form-field">
        <label htmlFor="hq-location">Project location *</label>
        <input {...field("location")} autoComplete="address-level2" placeholder="City / state" required />
        {err("location")}
      </div>
      <div className="form-field">
        <label htmlFor="hq-backup">Preferred backup duration</label>
        <select {...field("backup")} defaultValue="">
          <option value="">Select duration</option>
          {backupOptions.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="form-field full">
        <label htmlFor="hq-loads">What do you need to power?</label>
        <textarea {...field("loads")} placeholder="List appliances, equipment, estimated load or project requirements" />
      </div>
      <div className="form-field full">
        <label htmlFor="hq-details">Additional project information</label>
        <textarea {...field("details")} placeholder="Tell us more about your site, timeline or requirements" />
        <span className="form-help">
          Have a load profile or project document? Email it to{" "}
          <a href={`mailto:${site.contact.email}`} className="text-link">{site.contact.email}</a> or send it on{" "}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="text-link">WhatsApp</a>.
        </span>
      </div>
      <button className="btn" type="submit" disabled={status === "busy"}>
        {status === "busy" ? "SENDING…" : "SEND PROJECT ENQUIRY"} <span aria-hidden>↗</span>
      </button>
      <div className={`form-status${typeof status === "object" ? " error" : ""}`} role="status" aria-live="polite">
        {typeof status === "object" ? status.error : ""}
      </div>
    </form>
  );
}
