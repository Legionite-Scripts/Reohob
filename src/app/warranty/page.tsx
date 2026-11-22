import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { naira, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Warranty",
  description:
    "Warranty terms for Reohob solar panels, inverters, batteries and installation workmanship: what is covered, for how long, what is excluded, and how to make a claim.",
  path: "/warranty",
});

export default function WarrantyPage() {
  const fee = site.callOutFee;
  return (
    <LegalPage
      title="Warranty"
      updated="18 November 2026"
      summary={
        <ul>
          <li>Every warranty runs from the date of purchase or installation, not the calendar year.</li>
          <li>Terms differ by product. The table below shows each one; your invoice states the exact term for your equipment.</li>
          <li>Fire or electrical burn damage, overloads, power surges, and removal or repair by anyone else without telling us are not covered.</li>
          <li>To claim, contact us. A call-out fee applies to site visits, and you arrange transport of equipment to our repair centre.</li>
        </ul>
      }
    >
      <h2>What is covered, and for how long</h2>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="region" aria-label="Warranty terms table (scrolls sideways)" tabIndex={0}>
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">Warranty terms by product</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="chart-label py-2 pr-4 text-ink-2">Item</th>
              <th scope="col" className="chart-label py-2 pr-4 text-ink-2">Term</th>
              <th scope="col" className="chart-label py-2 text-ink-2">Covers</th>
            </tr>
          </thead>
          <tbody>
            {site.warranty.map((w) => (
              <tr key={w.item} className="border-b border-grid align-top">
                <th scope="row" className="py-3 pr-4 font-semibold">{w.item}</th>
                <td className="py-3 pr-4 font-semibold whitespace-nowrap">
                  {w.term}
                </td>
                <td className="py-3 text-ink-2">{w.covers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Product warranties are the manufacturer&apos;s; we handle the claim for you. The workmanship warranty covers
        complete systems installed by us (inverter packages and solar-inverter packages). Where an installation includes
        equipment from another supplier, we agree the warranty with you in writing before work starts.
      </p>

      <h2>What is not covered</h2>
      <ul>
        <li>Fire or electrical burn damage, overloads and power surges.</li>
        <li>Systems moved, uninstalled or repaired by anyone other than us without telling us first.</li>
        <li>Batteries that were not given their first full charge before use (see &ldquo;Looking after your system&rdquo;).</li>
      </ul>
      <p>
        Where a fault is covered, we repair or replace the faulty part free of charge. Where it is not, we tell you the
        cost before doing any work.
      </p>
      <p>
        Only one warranty claim is available during the warranty period.
      </p>

      <h2 id="call-out">Call-out fee</h2>
      <p>
        A call-out fee of {naira(fee.value)} (minimum, depending on location and the nature of the request)
        applies when you ask our engineers to:
      </p>
      <ul>
        <li>visit a site after an installation has been completed and signed off as working;</li>
        <li>inspect an existing installation or a new installation;</li>
        <li>carry out a repair.</li>
      </ul>
      <p>
        A physical site inspection before we give a quotation carries a call-up charge of at least{" "}
        {naira(site.inspectionFee.value)}, depending on location and distance.
      </p>
      <p>
        The fee covers the visit and troubleshooting of problems that don&apos;t need major repair. Parts and repair work
        outside warranty are charged separately, and we quote them first. Pay the fee to the company account, never to an
        engineer in person. During the warranty period you also cover the cost of transporting equipment between your site
        and our office or repair centre.
      </p>

      <h2>Looking after your system</h2>
      <ul>
        <li>
          After installation, charge the batteries for at least {site.installation.firstChargeHours.min} hours (up to{" "}
          {site.installation.firstChargeHours.max}) before using the system.
        </li>
        <li>Don&apos;t move, open or rewire the system yourself. Call us.</li>
        <li>
          Optional check-up: you can book one check-up of your batteries, inverter or panels during the warranty period for{" "}
          {naira(site.checkupFee.value)}. We schedule it
          for the 6th or 10th month after purchase.
        </li>
      </ul>

      <h2>How to make a claim</h2>
      <p>
        Call {site.contact.phones[0].display}, email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or{" "}
        <Link href="/contact">use our contact form</Link>. Have your invoice or receipt ready. Phone and online
        consultations are free.
      </p>
    </LegalPage>
  );
}
