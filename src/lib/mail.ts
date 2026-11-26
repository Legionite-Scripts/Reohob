import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/config/site";

export class MailNotConfiguredError extends Error {
  constructor() {
    super("SMTP is not configured");
  }
}

const env = (k: string) => process.env[k]?.trim() || "";

export const mailConfigured = () => Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS"));

let transporter: Transporter | null = null;
function getTransporter() {
  if (!transporter) {
    const port = Number(env("SMTP_PORT") || 465);
    transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: env("SMTP_SECURE") ? env("SMTP_SECURE") === "true" : port === 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    });
  }
  return transporter;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Render label/value rows as plain text and a simple HTML table. */
export function renderRows(title: string, rows: [string, string | undefined][]) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== "");
  const text = `${title}\n\n` + filled.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2 style="font-family:Arial,sans-serif;color:#14261d">${esc(title)}</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
    filled
      .map(
        ([k, v]) =>
          `<tr><th align="left" valign="top" style="border-bottom:1px solid #dde1ec;color:#444b78">${esc(k)}</th>` +
          `<td style="border-bottom:1px solid #dde1ec;white-space:pre-wrap">${esc(String(v))}</td></tr>`,
      )
      .join("") +
    `</table>`;
  return { text, html };
}

/** Where form emails go when MAIL_TO is not set: the installation inbox. */
const formInbox = site.contact.emails[0].email;

export async function sendMail(opts: { subject: string; text: string; html: string; replyTo?: string; to?: string }) {
  if (!mailConfigured()) {
    if (env("MAIL_DRY_RUN") === "true") {
      console.info(`[mail:dry-run] to=${opts.to || env("MAIL_TO") || formInbox} subject=${opts.subject}\n${opts.text}`);
      return { dryRun: true };
    }
    throw new MailNotConfiguredError();
  }
  await getTransporter().sendMail({
    from: env("MAIL_FROM") || `${site.legalName} website <${env("SMTP_USER")}>`,
    to: opts.to || env("MAIL_TO") || formInbox,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
  return { dryRun: false };
}
