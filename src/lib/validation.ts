import { z } from "zod";
import { getService, partnershipTypeOptions, type ExtraField } from "@/config/forms";
import { trainingPackages } from "@/config/training";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a phone number we can call")
  .max(20, "That phone number is too long")
  .regex(/^[+\d][\d\s()-]{6,}$/, "Use digits, spaces and an optional + only");

const name = z.string().trim().min(2, "Enter your name").max(100);
const email = z.string().trim().max(160).email("Enter a valid email address");

/** Anti-spam: a hidden field bots fill in, and a minimum time on the form. */
export const antiSpam = {
  // Any value here marks a bot; checked in looksLikeBot so bots get a quiet "ok", not a hint.
  website: z.string().max(2000).optional(),
  startedAt: z.coerce.number().optional(),
};

export function looksLikeBot(data: { website?: string; startedAt?: number }) {
  if (data.website) return true;
  if (data.startedAt && Date.now() - data.startedAt < 2500) return true;
  return false;
}

function extraValidator(f: ExtraField) {
  switch (f.type) {
    case "number": {
      const n = z.coerce.number({ message: "Enter a number" }).int("Whole numbers only").min(f.min ?? 0, `Enter ${f.min ?? 0} or more`).max(f.max ?? 100000, `Enter ${f.max ?? 100000} or fewer`);
      return f.required ? n : z.union([z.literal(""), n]).optional();
    }
    case "select": {
      const s = z.enum(f.options as [string, ...string[]], { message: "Choose an option" });
      return f.required ? s : z.union([z.literal(""), s]).optional();
    }
    case "checkboxes":
      return z.array(z.enum(f.options as [string, ...string[]])).max(f.options.length).optional();
    case "text": {
      const t = z.string().trim().max(200);
      return f.required ? t.min(1, `Enter ${f.label.toLowerCase()}`) : t.optional();
    }
  }
}

export const contactBase = z.object({
  service: z.string().refine((s) => Boolean(getService(s)), "Choose a service"),
  name,
  email,
  phone,
  location: z.string().trim().max(200).optional(),
  // Optional when the chosen service asks its own questions; required for "Other" (checked below).
  message: z.string().trim().max(5000).optional(),
  extra: z.record(z.string(), z.unknown()).optional(),
  ...antiSpam,
});

export function validateContact(input: unknown) {
  const base = contactBase.safeParse(input);
  // Validate the service-specific fields too, so every error comes back in one round trip.
  const raw = (input ?? {}) as { service?: string; extra?: unknown };
  const svc = getService(String(raw.service ?? ""));
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of svc?.extra ?? []) shape[f.name] = extraValidator(f);
  const extra = z.object(shape).strip().safeParse(raw.extra ?? {});

  const errors: Record<string, string[]> = {};
  if (!base.success) Object.assign(errors, base.error.flatten().fieldErrors);
  const msg = String((input as { message?: unknown })?.message ?? "").trim();
  if (svc && !svc.extra.length && msg.length < 10) {
    errors.message = ["Tell us a little about what you need (at least 10 characters)"];
  }
  if (!extra.success) {
    for (const [k, v] of Object.entries(extra.error.flatten().fieldErrors as Record<string, string[]>)) errors[`extra.${k}`] = v;
  }
  if (!base.success || !extra.success || !svc || errors.message) return { ok: false as const, errors };
  return { ok: true as const, data: { ...base.data, extra: extra.data as Record<string, unknown> }, service: svc };
}

export const partnershipSchema = z.object({
  company: z.string().trim().min(2, "Enter your company or organisation").max(160),
  contactName: name,
  email,
  phone,
  partnershipType: z.enum(partnershipTypeOptions as [string, ...string[]], { message: "Choose a partnership type" }),
  message: z.string().trim().min(10, "Tell us a little about the partnership (at least 10 characters)").max(5000),
  ...antiSpam,
});

export const trainingSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(60),
  lastName: z.string().trim().min(1, "Enter your last name").max(60),
  email,
  phone,
  basicKnowledge: z.enum(["Yes", "No"], { message: "Choose yes or no" }),
  packageId: z.enum(trainingPackages.map((p) => p.id) as [string, ...string[]], { message: "Choose a package" }),
  address: z.string().trim().min(5, "Enter your address").max(300),
  ...antiSpam,
});
