import { NextResponse } from "next/server";
import { looksLikeBot, partnershipSchema } from "@/lib/validation";
import { MailNotConfiguredError, renderRows, sendMail } from "@/lib/mail";
import { site } from "@/config/site";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read the form. Please try again." }, { status: 400 });
  }
  const parsed = partnershipSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const d = parsed.data;
  if (looksLikeBot(d)) return NextResponse.json({ ok: true });

  const { text, html } = renderRows("New partnership enquiry", [
    ["Company", d.company],
    ["Contact person", d.contactName],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Partnership type", d.partnershipType],
    ["Message", d.message],
  ]);

  try {
    await sendMail({
      subject: `Partnership enquiry: ${d.partnershipType} (${d.company})`,
      text,
      html,
      replyTo: d.email,
      to: process.env.MAIL_TO_PARTNERSHIPS || undefined,
    });
  } catch (err) {
    console.error("[partnership] send failed", err);
    const notConfigured = err instanceof MailNotConfiguredError;
    return NextResponse.json(
      {
        ok: false,
        error: notConfigured
          ? `Our form isn't connected yet. Please email ${site.contact.email}.`
          : `We couldn't send your enquiry just now. Please try again, or email ${site.contact.email}.`,
      },
      { status: notConfigured ? 503 : 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
