"use client";

import { forwardRef, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AlertTriangle, CheckCircle2, LoaderCircle } from "lucide-react";

export const inputCls =
  "mt-1.5 block w-full border border-rule bg-paper px-3 py-3 text-base text-ink placeholder:text-ink-3 transition-colors hover:border-ink-3 focus:border-ink aria-[invalid=true]:border-error aria-[invalid=true]:bg-error-wash";

type FieldShell = { id: string; label: ReactNode; error?: string; hint?: ReactNode; required?: boolean; className?: string };

function Shell({ id, label, error, hint, required, className = "", children }: FieldShell & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9375rem] font-semibold">
        {label}
        {required ? <span className="text-ink-3 font-normal"> (required)</span> : null}
      </label>
      {hint ? <p id={`${id}-hint`} className="mt-0.5 text-sm text-ink-3">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-error">
          <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" /> {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: ReactNode) =>
  [hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;

export const TextField = forwardRef<HTMLInputElement, FieldShell & InputHTMLAttributes<HTMLInputElement>>(
  function TextField({ id, label, error, hint, required, className, ...rest }, ref) {
    return (
      <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={inputCls}
          {...rest}
        />
      </Shell>
    );
  },
);

export const SelectField = forwardRef<
  HTMLSelectElement,
  FieldShell & SelectHTMLAttributes<HTMLSelectElement> & { options: string[] | { value: string; label: string }[]; placeholder?: string }
>(function SelectField({ id, label, error, hint, required, className, options, placeholder = "Choose…", ...rest }, ref) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <select
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputCls} appearance-none bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pr-9`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%2314261d' stroke-width='2'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>{o}</option>
          ) : (
            <option key={o.value} value={o.value}>{o.label}</option>
          ),
        )}
      </select>
    </Shell>
  );
});

export const TextAreaField = forwardRef<HTMLTextAreaElement, FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextAreaField({ id, label, error, hint, required, className, ...rest }, ref) {
    return (
      <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
        <textarea
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={`${inputCls} min-h-36 resize-y`}
          {...rest}
        />
      </Shell>
    );
  },
);

/** Hidden from people, tempting to bots. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ busy, children, busyLabel = "Sending…" }: { busy: boolean; children: ReactNode; busyLabel?: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      aria-disabled={busy}
      className="inline-flex min-h-12 items-center justify-center gap-2.5 bg-ink px-6 py-3 font-semiwide text-[0.9375rem] font-semibold text-white transition-colors hover:bg-night-2 disabled:cursor-wait disabled:opacity-70"
    >
      {busy ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
      {busy ? busyLabel : children}
    </button>
  );
}

export const FormError = forwardRef<HTMLDivElement, { message: string; children?: ReactNode }>(function FormError(
  { message, children },
  ref,
) {
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="flex items-start gap-3 border-2 border-error bg-error-wash p-4 text-error">
      <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-medium">{message}</p>
        {children ? <div className="mt-2 text-ink">{children}</div> : null}
      </div>
    </div>
  );
});

/** Inline field error, shared by every field type so all errors look and read the same. */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-error">
      <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" /> {children}
    </p>
  );
}

export const FormSuccess = forwardRef<HTMLDivElement, { title: string; children?: ReactNode }>(function FormSuccess(
  { title, children },
  ref,
) {
  return (
    <div ref={ref} tabIndex={-1} role="status" className="border-2 border-ok bg-ok-wash p-6">
      <p className="flex items-center gap-2.5 font-semiwide text-xl font-semibold text-ok">
        <CheckCircle2 aria-hidden className="size-6" /> {title}
      </p>
      {children ? <div className="mt-3 text-ink">{children}</div> : null}
    </div>
  );
});

export type FieldErrors = Record<string, string[] | undefined>;
export const firstError = (e: FieldErrors | undefined, k: string) => e?.[k]?.[0];

/**
 * POST JSON with a timeout, so a stalled mobile connection never leaves a form on "Sending…" forever.
 * Returns `timedOut: true` so the form can offer WhatsApp as a fallback.
 */
export async function postJson<T = { ok: boolean; error?: string; fieldErrors?: FieldErrors; timedOut?: boolean }>(
  url: string,
  body: unknown,
  timeoutMs = 20000,
) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const json = (await res.json().catch(() => ({ ok: false, error: "Unexpected response from the server." }))) as T;
    return json;
  } catch (e) {
    if ((e as Error).name === "AbortError") {
      return { ok: false, timedOut: true, error: "This is taking longer than usual, so your connection may be slow. Your details are kept: try again, or message us on WhatsApp." } as T;
    }
    return { ok: false, timedOut: true, error: "No connection. Your details are kept: check your internet and try again, or message us on WhatsApp." } as T;
  } finally {
    clearTimeout(timer);
  }
}

/** Client-side checks that mirror the server's rules, so most mistakes show without a round trip. */
export const checks = {
  name: (v: string) => (v.trim().length >= 2 ? "" : "Enter your name"),
  email: (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address"),
  phone: (v: string) =>
    /^[+\d][\d\s()-]{6,}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7 ? "" : "Enter a phone number we can call",
};
