import "server-only";
import crypto from "node:crypto";
import { getPackage, type TrainingPackage } from "@/config/training";

const API = "https://api.paystack.co";
const secret = () => process.env.PAYSTACK_SECRET_KEY?.trim() || "";

export const paystackConfigured = () => Boolean(secret());

export type TrainingMetadata = {
  kind: "training";
  packageId: TrainingPackage["id"];
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  basicKnowledge: "Yes" | "No";
};

/** Start a payment. The amount comes from the server's price list, never from the browser. */
export async function initializeTraining(email: string, meta: TrainingMetadata, callbackUrl: string) {
  const pkg = getPackage(meta.packageId);
  if (!pkg) throw new Error("Unknown package");
  const reference = `RH-TRN-${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}`.toUpperCase();
  const res = await fetch(`${API}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      amount: pkg.price * 100, // kobo
      currency: "NGN",
      reference,
      callback_url: callbackUrl,
      metadata: {
        ...meta,
        custom_fields: [
          { display_name: "Package", variable_name: "package", value: pkg.name },
          { display_name: "Name", variable_name: "name", value: `${meta.firstName} ${meta.lastName}` },
          { display_name: "Phone", variable_name: "phone", value: meta.phone },
        ],
      },
    }),
    cache: "no-store",
  });
  const json = (await res.json()) as { status: boolean; message: string; data?: { authorization_url: string; reference: string } };
  if (!res.ok || !json.status || !json.data) throw new Error(json.message || "Paystack initialisation failed");
  return { authorizationUrl: json.data.authorization_url, reference: json.data.reference };
}

export type VerifiedTraining =
  | {
      ok: true;
      reference: string;
      pkg: TrainingPackage;
      amountKobo: number;
      paidAt: string;
      email: string;
      meta: TrainingMetadata;
    }
  | { ok: false; reason: string; reference: string };

/**
 * Verify with Paystack, then check that the amount paid matches the package price
 * on our own list. Registration is confirmed only if every check passes.
 */
export async function verifyTraining(reference: string): Promise<VerifiedTraining> {
  if (!/^[A-Za-z0-9_-]{6,100}$/.test(reference)) return { ok: false, reason: "Invalid payment reference.", reference };
  const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret()}` },
    cache: "no-store",
  });
  const json = (await res.json()) as {
    status: boolean;
    message: string;
    data?: {
      status: string;
      amount: number;
      currency: string;
      reference: string;
      paid_at: string;
      customer: { email: string };
      metadata: TrainingMetadata | string | null;
    };
  };
  if (!res.ok || !json.status || !json.data) return { ok: false, reason: json.message || "Could not verify payment.", reference };
  const d = json.data;
  if (d.status !== "success") return { ok: false, reason: `Payment status is "${d.status}".`, reference };
  if (d.currency !== "NGN") return { ok: false, reason: "Payment was not made in naira.", reference };
  const meta = (typeof d.metadata === "string" ? JSON.parse(d.metadata) : d.metadata) as TrainingMetadata | null;
  if (!meta || meta.kind !== "training") return { ok: false, reason: "Payment is not a training registration.", reference };
  const pkg = getPackage(meta.packageId);
  if (!pkg) return { ok: false, reason: "Unknown training package.", reference };
  if (d.amount !== pkg.price * 100) {
    return { ok: false, reason: "The amount paid does not match the package price. Please contact us.", reference };
  }
  return { ok: true, reference: d.reference, pkg, amountKobo: d.amount, paidAt: d.paid_at, email: d.customer.email, meta };
}

/** Check a webhook really came from Paystack. */
export function validWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature || !secret()) return false;
  const hash = crypto.createHmac("sha512", secret()).update(rawBody).digest("hex");
  const a = Buffer.from(hash);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
