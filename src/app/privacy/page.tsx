import LegalPage from "@/components/LegalPage";
import { fullAddress, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Reohob Limited collects, uses and protects the personal data you share through our website, forms and training payments.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="18 November 2026"
      summary={
        <>
          <ul>
            <li>We collect only what you give us in our forms, plus payment details handled by Paystack for training.</li>
            <li>We use it to answer your enquiry, deliver your system or training, and meet legal obligations.</li>
            <li>We don&apos;t sell your data. We share it only with the service providers who help us run the site.</li>
            <li>You can ask to see, correct or delete your data at any time.</li>
          </ul>
        </>
      }
    >
      <h2>Who we are</h2>
      <p>
        {site.legalName}, {fullAddress()}, is the data controller for personal data collected through this website. Contact
        us about privacy at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Enquiry and quote form:</strong> name, email, phone, location, the service you need, details about your building and equipment, and your message.</li>
        <li><strong>Partnership form:</strong> company, contact person, email, phone, partnership type and message.</li>
        <li><strong>Training registration:</strong> name, email, phone, address, whether you have basic engineering knowledge, and the package you choose.</li>
        <li><strong>Payments:</strong> card and bank details are entered on Paystack&apos;s secure page; we never see or store them. Paystack tells us whether a payment succeeded and the amount.</li>
        <li><strong>Technical data:</strong> our hosting provider keeps standard server logs (such as IP address and browser type) for security.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and prepare a quotation (our legitimate interest, and steps before a contract).</li>
        <li>To deliver, install and support your system, or run your training (performing our contract with you).</li>
        <li>To assess payment-plan applications, with your consent and the documents you provide.</li>
        <li>To keep financial records we are required by law to keep.</li>
      </ul>

      <h2>Who we share it with</h2>
      <ul>
        <li>Paystack, to process training payments.</li>
        <li>Our email provider, to deliver form submissions to our team.</li>
        <li>Vercel, which hosts this website.</li>
        <li>Map provider (Google Maps) when you view the map on our contact page.</li>
      </ul>
      <p>Some of these providers may process data outside Nigeria, under their own safeguards.</p>

      <h2>Cookies and analytics</h2>
      <p>
        The site doesn&apos;t use advertising cookies. If we switch on analytics that uses cookies, we&apos;ll ask for your
        consent first, and you can say no without losing any functionality.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep personal data only as long as we need it for the purpose it was collected for, and as long as the law requires.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of your data, to correct or delete it, to stop or limit how we use it, or to withdraw
        consent. Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. If you&apos;re not satisfied with
        our answer, you can complain to the Nigeria Data Protection Commission.
      </p>
    </LegalPage>
  );
}
