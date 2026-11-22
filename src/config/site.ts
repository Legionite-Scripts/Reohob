/**
 * Reohob — single source of truth for company facts.
 *
 * Every page, form, email, footer, policy and JSON-LD block reads from here,
 * so a fact changed here changes everywhere. Values marked `confirmed: false`
 * (or with a `TODO: confirm` note) are placeholders: the old site contradicted
 * itself or had no value. Search this file for "TODO" to find them all.
 */

export type Placeholder<T> = {
  value: T;
  /** false = placeholder that must be confirmed before launch */
  confirmed: boolean;
  note?: string;
};

export const site = {
  /** Brand name used in running copy */
  name: "Reohob",
  /** Legal name. TODO: confirm the registered name (old site used Reohob Limited, Reohob Ltd, Reohob Nigeria Limited and Reohob Group). */
  legalName: "Reohob Limited",
  /** TODO: confirm CAC RC number */
  rcNumber: { value: "", confirmed: false, note: "CAC registration number" } as Placeholder<string>,

  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://reohobenergy.com",

  tagline: "Solar, inverter and battery systems engineered in Lagos",
  motto: "Clean, affordable energy for Africa",
  mission:
    "We are in the business of creating comfort by supplying uninterrupted power from renewable energy.",
  vision: "Clean, affordable energy for every Nigerian and African community.",

  description:
    "Reohob Limited designs, supplies and installs solar, inverter and battery systems from 1 kVA to 100 kVA, EV chargers and security screening equipment, with EPC and engineering services across Nigeria.",

  /** From the old About page: "over a decade in existence and experience". */
  yearsInBusiness: { value: "Over a decade", confirmed: true } as Placeholder<string>,

  contact: {
    email: "info@reohobenergy.com",
    phones: [
      {
        label: "Main line",
        display: "+234 803 807 9483",
        tel: "+2348038079483",
        confirmed: true,
      },
      {
        // Label as on the old contact page ("Shop Number").
        label: "Shop number",
        display: "+234 818 598 2675",
        tel: "+2348185982675",
        confirmed: true,
      },
    ],
    /** WhatsApp number in international format without "+". TODO: confirm (defaults to the main line). */
    whatsapp: { value: "2348038079483", confirmed: false } as Placeholder<string>,
    whatsappMessage: "Hello Reohob, I'd like to talk about a power system.",
    address: {
      street: "Block 113, Plot 14, Lekki–Epe Expressway",
      city: "Lagos",
      region: "Lagos",
      country: "Nigeria",
      countryCode: "NG",
      /** Approximate, for map + schema. TODO: confirm exact pin for the head office. */
      geo: { lat: 6.4474, lng: 3.4737 },
    },
    /** Not on the old site, so not published until confirmed (`confirmed: true`). */
    hours: {
      value: [
        { days: "Monday – Friday", time: "8:00 – 17:00" },
        { days: "Saturday", time: "9:00 – 14:00" },
      ],
      confirmed: false,
    } as Placeholder<{ days: string; time: string }[]>,
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/reohob" },
    { label: "Facebook", href: "https://www.facebook.com/Reohob.Ltd/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/reohob-nigeria-limited/" },
    { label: "X (Twitter)", href: "https://twitter.com/reohob" },
  ],
  trainingSocial: [
    { label: "Instagram", href: "https://instagram.com/reohob.pv.engineering.training" },
    { label: "Facebook", href: "https://www.facebook.com/reohob.pv.engineering.training" },
  ],
  initiativeSocial: [
    { label: "Instagram", href: "https://instagram.com/the.reohob.initiative" },
    // Handle is misspelled on Facebook itself ("initaitive"); this is the live URL.
    { label: "Facebook", href: "https://www.facebook.com/the.reohob.initaitive/" },
  ],

  /** Trust strip on Home. Only facts stated on the old site. */
  trust: [{ value: "Over a decade", label: "in business", confirmed: true }],

  /** Warranty terms exactly as stated on the old site (Solar, Inverters, Batteries and Warranty pages). */
  warranty: [
    { item: "Solar panels", term: "25 years", covers: "Guaranty on the solar panels", confirmed: true },
    { item: "Inverters", term: "1 year", covers: "Warranty on the inverter", confirmed: true },
    {
      item: "Batteries",
      term: "12 months (1 year) to 60 months (5 years)",
      covers: "Depending on the battery's specifications",
      confirmed: true,
    },
    {
      item: "Complete installations",
      term: "1 year",
      covers: "Complete installations by Reohob: inverter system packages and solar-inverter system packages",
      confirmed: true,
    },
  ],

  /** Call-up charge fee (old Terms page): minimum ₦15,000, depending on location and nature of request. */
  callOutFee: { value: 15000, confirmed: true } as Placeholder<number>,
  /** Physical site inspection before a quotation (old Warranty page): minimum ₦20,000, depending on location and distance. */
  inspectionFee: { value: 20000, confirmed: true } as Placeholder<number>,
  /** Optional check-up within the warranty period (old Warranty page). */
  checkupFee: { value: 30000, confirmed: true } as Placeholder<number>,

  installation: {
    lagosHours: "24 to 48 hours",
    firstChargeHours: { min: 12, max: 24 },
  },

  financing: {
    /** 3% per month, flat, on the system price */
    monthlyFlatRate: 0.03,
    minMonths: 1,
    maxMonths: 12,
    statementMonths: 6,
    exampleSystemPrice: 2_000_000,
    exampleMonths: 12,
  },

  /** Feature flags for content that is not yet confirmed. */
  flags: {
    /** Rapiscan listed as a partner. TODO: confirm the partnership is current. */
    RAPISCAN_PARTNERSHIP_CONFIRMED: true,
    /** Show Rapiscan on the site even while unconfirmed (labelled as such). */
    SHOW_UNCONFIRMED_RAPISCAN: true,
    /** Shop link. Kept out of the navigation until a shop exists. */
    SHOP_ENABLED: false,
    /** TODO: confirm these service lines are active */
    EV_ACTIVE: { value: true, confirmed: true } as Placeholder<boolean>,
    SECURITY_ACTIVE: { value: true, confirmed: true } as Placeholder<boolean>,
    TRAINING_ACTIVE: { value: true, confirmed: true } as Placeholder<boolean>,
  },

  /** TODO: paste the YouTube URL of the old About-page video ("Reliable Solar Power Day & Night With Reohob") */
  aboutVideoUrl: "",

  /**
   * Company profile PDF at /public/downloads/reohob-company-profile.pdf.
   * The file there now is a placeholder. When the real profile is in place, set
   * `available: true` and the size label (e.g. "2.4 MB") so buttons show it.
   */
  companyProfile: {
    href: "/downloads/reohob-company-profile.pdf",
    available: false,
    sizeLabel: "",
  },

  /** Lagos, for the sun-path chart */
  solarSite: { lat: 6.4541, lng: 3.3947, utcOffsetHours: 1, label: "Lagos, 6.5° N" },
} as const;

/**
 * Placeholder mode. Off by default: only confirmed facts (the old site's own data) are published.
 * Set NEXT_PUBLIC_SHOW_PLACEHOLDER_FLAGS=true to preview unconfirmed and sample content, tagged.
 * - ON: unconfirmed and sample content is shown, each piece tagged "To confirm" / "Sample".
 * - OFF (launch): unconfirmed and sample content is NOT rendered at all. Hiding the tag
 *   alone would publish fake content, so every placeholder goes through `publishable()`.
 */
export const showPlaceholderFlags =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_FLAGS === "true";

/** Should this item appear on the page? Confirmed items always; placeholders only in placeholder mode. */
export const publishable = (item: { confirmed?: boolean; sample?: boolean } | boolean) => {
  const confirmed = typeof item === "boolean" ? item : item.confirmed !== false && !item.sample;
  return confirmed || showPlaceholderFlags;
};

export const whatsappHref = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp.value}?text=${encodeURIComponent(message)}`;

export const naira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const fullAddress = () => {
  const a = site.contact.address;
  return `${a.street}, ${a.city}, ${a.country}`;
};

/** Financing maths: flat rate on the full price, spread evenly. */
export function financePlan(price: number, months: number) {
  const { monthlyFlatRate } = site.financing;
  const interest = price * monthlyFlatRate * months;
  const total = price + interest;
  return { interest, total, monthly: total / months, ratePct: monthlyFlatRate * 100 * months };
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products-and-services", label: "Products & Services" },
  // Projects is hidden until the first real project is added (src/content/projects.ts).
  { href: "/training", label: "Training" },
  { href: "/partnership", label: "Partnership" },
  { href: "/management", label: "Management" },
  { href: "/contact", label: "Contact Us" },
] as const;
