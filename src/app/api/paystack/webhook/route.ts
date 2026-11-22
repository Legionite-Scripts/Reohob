import { NextResponse } from "next/server";
import { validWebhookSignature, verifyTraining } from "@/lib/paystack";
import { renderRows, sendMail } from "@/lib/mail";
import { naira, site } from "@/config/site";

/**
 * Paystack webhook (set this URL in the Paystack dashboard: https://reohobenergy.com/api/paystack/webhook).
 * On charge.success it re-verifies the transaction with Paystack and checks the amount against our
 * price list before emailing the team and the trainee. The webhook body alone is never trusted.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  if (!validWebhookSignature(raw, req.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let event: { event?: string; data?: { reference?: string; metadata?: { kind?: string } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (event.event !== "charge.success" || !event.data?.reference) return NextResponse.json({ ok: true });

  const v = await verifyTraining(event.data.reference);
  if (!v.ok) {
    console.warn("[paystack] verification failed", v.reference, v.reason);
    // Tell the team so they can follow up; acknowledge so Paystack does not retry forever.
    await sendMail({
      subject: `Training payment needs attention: ${v.reference}`,
      ...renderRows("Training payment could not be confirmed", [
        ["Reference", v.reference],
        ["Reason", v.reason],
      ]),
    }).catch((e) => console.error("[paystack] alert email failed", e));
    return NextResponse.json({ ok: true });
  }

  const { meta, pkg } = v;
  const rows: [string, string | undefined][] = [
    ["Reference", v.reference],
    ["Package", pkg.name],
    ["Amount paid", naira(v.amountKobo / 100)],
    ["Paid at", v.paidAt],
    ["Name", `${meta.firstName} ${meta.lastName}`],
    ["Email", v.email],
    ["Phone", meta.phone],
    ["Address", meta.address],
    ["Basic engineering knowledge", meta.basicKnowledge],
  ];

  try {
    const team = renderRows("New paid training registration", rows);
    await sendMail({
      subject: `Training registration: ${pkg.short} (${meta.firstName} ${meta.lastName})`,
      ...team,
      replyTo: v.email,
      to: process.env.MAIL_TO_TRAINING || undefined,
    });
    const trainee = renderRows(`Your ${site.name} training registration is confirmed`, [
      ["Package", pkg.name],
      ["Amount paid", naira(v.amountKobo / 100)],
      ["Payment reference", v.reference],
      ["What happens next", "Our training team will contact you with dates and joining instructions."],
      ["Questions", `${site.contact.email} · ${site.contact.phones[0].display}`],
    ]);
    await sendMail({ subject: `Training registration confirmed: ${pkg.short}`, ...trainee, to: v.email });
  } catch (err) {
    console.error("[paystack] email failed", err);
    // Non-2xx makes Paystack retry later, which is what we want if email is briefly down.
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
