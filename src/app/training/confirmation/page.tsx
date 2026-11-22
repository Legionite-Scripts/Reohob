import { Suspense } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { ButtonLink, HourRule } from "@/components/ui";
import { naira, site } from "@/config/site";
import { paystackConfigured, verifyTraining } from "@/lib/paystack";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Training payment",
  description: "Confirmation of your Reohob training registration.",
  path: "/training/confirmation",
  noindex: true,
});

async function Result({ searchParams }: { searchParams: PageProps<"/training/confirmation">["searchParams"] }) {
  const sp = await searchParams;
  const reference = String(sp.reference ?? sp.trxref ?? "");

  if (!reference) {
    return (
      <Outcome ok={false} title="No payment to confirm">
        <p>This page confirms a training payment after Paystack. If you&apos;ve just paid, use the link in your Paystack receipt or contact us.</p>
      </Outcome>
    );
  }
  if (!paystackConfigured()) {
    return (
      <Outcome ok={false} title="We can't check this payment right now">
        <p>Payment verification isn&apos;t set up. Please contact us with your reference: <strong>{reference}</strong>.</p>
      </Outcome>
    );
  }

  const v = await verifyTraining(reference);
  if (!v.ok) {
    return (
      <Outcome ok={false} title="We couldn't confirm your payment">
        <p>{v.reason}</p>
        <p className="mt-3">
          If money has left your account, don&apos;t pay again. Contact us with your reference <strong>{reference}</strong> and we&apos;ll sort it out.
        </p>
      </Outcome>
    );
  }

  return (
    <Outcome ok title="Payment received. You're registered.">
      <dl className="mt-2 border-t border-grid">
        {[
          ["Package", v.pkg.name],
          ["Amount paid", naira(v.amountKobo / 100)],
          ["Reference", v.reference],
          ["Name", `${v.meta.firstName} ${v.meta.lastName}`],
          ["Email", v.email],
        ].map(([k, val]) => (
          <div key={k} className="grid gap-1 border-b border-grid py-3 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
            <dt className="text-ink-3">{k}</dt>
            <dd className="font-semibold break-words">{val}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5">We&apos;ve emailed you a confirmation. Our training team will contact you with dates and joining instructions.</p>
    </Outcome>
  );
}

function Outcome({ ok, title, children }: { ok: boolean; title: string; children: React.ReactNode }) {
  const Icon = ok ? CheckCircle2 : AlertTriangle;
  return (
    <div className={`border-2 p-6 sm:p-8 ${ok ? "border-ok" : "border-error"}`} role={ok ? "status" : "alert"}>
      <p className={`flex items-center gap-3 font-semiwide text-2xl font-semibold ${ok ? "text-ok" : "text-error"}`}>
        <Icon aria-hidden className="size-7 shrink-0" /> {title}
      </p>
      <div className="mt-4 text-ink">{children}</div>
    </div>
  );
}

export default function ConfirmationPage(props: PageProps<"/training/confirmation">) {
  return (
    <>
      <header className="chart-field-faint border-b border-grid">
        <div className="container-x pt-14 pb-10">
          <h1 className="h-chapter">Training registration</h1>
        </div>
        <HourRule />
      </header>
      <section className="container-x max-w-3xl py-12 sm:py-16">
        <Suspense
          fallback={
            <p role="status" className="border-2 border-dashed border-rule p-6 text-ink-2">Checking your payment with Paystack…</p>
          }
        >
          <Result searchParams={props.searchParams} />
        </Suspense>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/training" variant="outline">Back to Training</ButtonLink>
          <ButtonLink href={`tel:${site.contact.phones[0].tel}`} variant="outline" arrow={false}>
            Call {site.contact.phones[0].display}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
