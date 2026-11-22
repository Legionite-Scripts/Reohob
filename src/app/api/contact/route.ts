import { NextResponse } from "next/server";
import { looksLikeBot, validateContact } from "@/lib/validation";
import { MailNotConfiguredError, renderRows, sendMail } from "@/lib/mail";
import { site } from "@/config/site";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read the form. Please try again." }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors: result.errors }, { status: 422 });
  }
  const { data, service } = result;

  // Quietly accept bot submissions without sending anything.
  if (looksLikeBot(data)) return NextResponse.json({ ok: true });

  const extraRows: [string, string | undefined][] = service.extra.map((f) => {
    const v = data.extra[f.name];
    return [f.label, Array.isArray(v) ? v.join(", ") : v === undefined || v === "" ? undefined : String(v)];
  });

  const { text, html } = renderRows(`New enquiry: ${service.label}`, [
    ["Service", service.label],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Location", data.location],
    ...extraRows,
    ["Message", data.message],
  ]);

  try {
    await sendMail({
      subject: `Website enquiry: ${service.label} (${data.name})`,
      text,
      html,
      replyTo: data.email,
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    const notConfigured = err instanceof MailNotConfiguredError;
    return NextResponse.json(
      {
        ok: false,
        error: notConfigured
          ? `Our form isn't connected yet. Please email ${site.contact.email} or call ${site.contact.phones[0].display}.`
          : `We couldn't send your message just now. Please try again, or email ${site.contact.email}.`,
      },
      { status: notConfigured ? 503 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
