import { NextResponse } from "next/server";
import { looksLikeBot, trainingSchema } from "@/lib/validation";
import { initializeTraining, paystackConfigured, type TrainingMetadata } from "@/lib/paystack";
import { site } from "@/config/site";

/**
 * Starts a Paystack payment for a training package.
 * The browser sends the package id only; the price comes from src/config/training.ts.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read the form. Please try again." }, { status: 400 });
  }
  const parsed = trainingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const d = parsed.data;
  if (looksLikeBot(d)) return NextResponse.json({ ok: false, error: "Please try again." }, { status: 400 });

  if (!paystackConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: `Online payment isn't switched on yet. Please call ${site.contact.phones[0].display} or email ${site.contact.email} to register.`,
      },
      { status: 503 },
    );
  }

  const meta: TrainingMetadata = {
    kind: "training",
    packageId: d.packageId as TrainingMetadata["packageId"],
    firstName: d.firstName,
    lastName: d.lastName,
    phone: d.phone,
    address: d.address,
    basicKnowledge: d.basicKnowledge,
  };

  const origin = site.url.startsWith("http://localhost") ? new URL(req.url).origin : site.url;
  try {
    const { authorizationUrl } = await initializeTraining(d.email, meta, `${origin}/training/confirmation`);
    return NextResponse.json({ ok: true, authorizationUrl });
  } catch (err) {
    console.error("[training] initialise failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't start the payment. Please try again in a moment." },
      { status: 502 },
    );
  }
}
