import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { financePlan, naira, site } from "@/config/site";
import { trainingPackages } from "@/config/training";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and conditions",
  description:
    "Terms for Reohob installations, payments, payment plans, call-out visits and training: plain-language summary first, full detail below.",
  path: "/terms",
});

export default function TermsPage() {
  const { financing } = site;
  const ex = financePlan(financing.exampleSystemPrice, financing.exampleMonths);
  return (
    <LegalPage
      title="Terms and conditions"
      updated="18 November 2026"
      summary={
        <ul>
          <li>Installation starts once payment is confirmed: full payment, or an approved payment plan.</li>
          <li>In Lagos we install within {site.installation.lagosHours} of confirmed payment; elsewhere on a date we agree.</li>
          <li>Payments are not refundable once an order is confirmed, so please check your quotation before paying.</li>
          <li>Payment plans run 1 to 12 months at {financing.monthlyFlatRate * 100}% a month, flat, subject to approval.</li>
          <li>Site visits and repairs carry a call-out fee. Phone and online consultations are free.</li>
        </ul>
      }
    >
      <p>
        These terms apply to products, installations and services supplied by {site.legalName}
        {site.rcNumber.value ? ` (RC ${site.rcNumber.value})` : ""} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). Our{" "}
        <Link href="/warranty">warranty</Link> and <Link href="/privacy">privacy policy</Link> form part of them.
      </p>

      <h2>Quotations and orders</h2>
      <p>
        Recommendations from our website, phone or online consultations are a guide. We confirm the system design and
        price in a written quotation, which may change after we inspect the site. An order is confirmed when you accept
        the quotation and your payment is confirmed.
      </p>

      <h2>Payment</h2>
      <ul>
        <li>Pay into our company account only. We issue a receipt once payment is confirmed. Never pay an engineer in person.</li>
        <li>Installation requires full payment, unless you have an approved payment plan.</li>
        <li>
          Once an order is confirmed and paid, payments are not refundable.
        </li>
      </ul>

      <h2>Installation</h2>
      <ul>
        <li>In Lagos we install within {site.installation.lagosHours} after your payment is confirmed by our accounts team.</li>
        <li>Outside Lagos State we install on a date agreed with you, at least 48 hours after payment is confirmed.</li>
        <li>If we have a backlog of installations, we tell you the revised date.</li>
        <li>If you aren&apos;t available for delivery, we reschedule to the earliest date that suits you.</li>
      </ul>

      <h2 id="call-out">Call-out visits</h2>
      <p>
        A call-out fee of at least {naira(site.callOutFee.value)}, depending on location and the nature of the request, applies to site visits after installation,
        inspections and repairs. A physical site inspection before a quotation carries a call-up charge of at least{" "}
        {naira(site.inspectionFee.value)}, depending on location and distance. Repair costs are separate and quoted first. Full detail is
        on the <Link href="/warranty#call-out">warranty page</Link>.
      </p>

      <h2 id="payment-plans">Payment plans</h2>
      <p>
        You can spread the cost of an inverter or solar-inverter system over {financing.minMonths} to {financing.maxMonths}{" "}
        months. Plans are open to salary earners, business owners and companies, and every application is verified and
        approved before supply.
      </p>
      <ul>
        <li>Salary earners: bank statements for at least the last {financing.statementMonths} months.</li>
        <li>Business owners and companies: bank statements for at least {financing.statementMonths} months, plus CAC registration documents.</li>
        <li>We compare your statements with the cost of the system you want; approval is at our discretion.</li>
        <li>Once approved and your repayment plan is set up, we supply and install the system.</li>
      </ul>
      <p>
        <strong>Interest:</strong> {financing.monthlyFlatRate * 100}% a month, flat. That means it is charged on the full system price for
        each month of the plan, not on the reducing balance. Over 12 months that is {financing.monthlyFlatRate * 100 * 12}% of the price.
      </p>
      <p>
        <strong>Example:</strong> a {naira(financing.exampleSystemPrice)} system over {financing.exampleMonths} months costs{" "}
        {naira(ex.interest)} in interest, {naira(ex.total)} in total, or {naira(Math.round(ex.monthly))} a month.
      </p>

      <h2 id="training">Training</h2>
      <p>
        Training fees ({trainingPackages.map((p) => `${p.short} ${naira(p.price)}`).join("; ")}) are paid online through
        Paystack. Your place is confirmed once we have verified the payment.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or{" "}
        {site.contact.phones[0].display}.
      </p>
    </LegalPage>
  );
}
