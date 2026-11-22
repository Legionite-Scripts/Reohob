"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { partnershipTypeOptions } from "@/config/forms";
import {
  FormError,
  FormSuccess,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  firstError,
  postJson,
  type FieldErrors,
} from "@/components/forms";
import { partnershipSchema } from "@/lib/validation";

export default function PartnershipForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | { error: string }>("idle");
  const startedAt = useRef(0);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (typeof status === "object") (formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]") ?? alertRef.current)?.focus();
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Same rules as the server: catch missing or invalid fields instantly, without a round trip.
    const payload = { ...Object.fromEntries(fd), startedAt: startedAt.current };
    const check = partnershipSchema.omit({ website: true, startedAt: true }).safeParse(payload);
    if (!check.success) {
      setErrors(check.error.flatten().fieldErrors as FieldErrors);
      return setStatus({ error: "Please check the highlighted fields." });
    }
    setStatus("busy");
    setErrors({});
    const res = await postJson("/api/partnership", payload);
    if (res.ok) return setStatus("sent");
    setErrors(res.fieldErrors ?? {});
    setStatus({ error: res.error ?? "Something went wrong. Please try again." });
  }

  if (status === "sent") {
    return (
      <FormSuccess ref={successRef} title="Enquiry sent. Thank you.">
        <p>We&apos;ll review your enquiry and get back to you.</p>
      </FormSuccess>
    );
  }

  const err = (k: string) => firstError(errors, k);
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInput={(e) => {
        // Clear a field's error as soon as it's edited.
        const name = (e.target as HTMLInputElement).name;
        if (name && errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
      }}
      noValidate
      className="relative grid gap-5"
    >
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="p-company" name="company" label="Company or organisation" autoComplete="organization" required error={err("company")} />
        <TextField id="p-contact" name="contactName" label="Contact person" autoComplete="name" required error={err("contactName")} />
        <TextField id="p-email" name="email" type="email" label="Email" autoComplete="email" required error={err("email")} />
        <TextField id="p-phone" name="phone" type="tel" label="Phone" autoComplete="tel" required error={err("phone")} />
      </div>
      <SelectField id="p-type" name="partnershipType" label="Partnership type" options={partnershipTypeOptions} required error={err("partnershipType")} />
      <TextAreaField id="p-message" name="message" label="Message" required error={err("message")} hint="What you have in mind, and what you would bring and need." />
      {typeof status === "object" ? <FormError ref={alertRef} message={status.error} /> : null}
      <div><SubmitButton busy={status === "busy"}>Send partnership enquiry</SubmitButton></div>
    </form>
  );
}
