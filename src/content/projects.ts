/**
 * Projects. ALL SIX ARE SAMPLES written to show the layout.
 * They are not real Reohob projects and are labelled "Sample" on screen.
 * Replace each with a real project (or delete it) before launch.
 */

export const projectCategories = [
  "Residential",
  "Commercial",
  "Industrial",
  "EV",
  "Security",
  "Training",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  systemSize: string;
  summary: string;
  scope: string[];
  outcome: string;
  /** Photo slots. Empty until real photos are supplied. */
  photos: { src: string; alt: string }[];
  sample: true;
};

export const projects: Project[] = [
  {
    slug: "lekki-duplex-hybrid-system",
    title: "Duplex hybrid solar system",
    category: "Residential",
    location: "Lekki, Lagos",
    year: "2025",
    systemSize: "7.5 kVA inverter · 5.4 kWp solar · 15 kWh lithium-ion",
    summary:
      "A four-bedroom duplex moving off a petrol generator for everything except the heaviest loads.",
    scope: ["Load audit", "System design", "Supply and installation", "Changeover integration", "Handover"],
    outcome:
      "Lighting, fans, refrigeration and two inverter air conditioners run through grid outages; the generator is now a rarely used backup.",
    photos: [],
    sample: true,
  },
  {
    slug: "ikeja-office-solar",
    title: "Office solar and backup",
    category: "Commercial",
    location: "Ikeja, Lagos",
    year: "2025",
    systemSize: "30 kVA three-phase · 24 kWp solar · 60 kWh storage",
    summary: "A three-floor office that needed working hours covered without diesel.",
    scope: ["Site survey", "Single-line diagram", "EPC delivery", "Remote monitoring", "Maintenance plan"],
    outcome:
      "Office loads run on solar through the working day, with storage covering early mornings and outages.",
    photos: [],
    sample: true,
  },
  {
    slug: "ogun-factory-hybrid",
    title: "Factory hybrid plant",
    category: "Industrial",
    location: "Agbara, Ogun State",
    year: "2024",
    systemSize: "100 kVA hybrid · generator integration",
    summary: "A light-manufacturing site cutting generator run-hours on its daytime shift.",
    scope: ["Load audit", "Owner's engineer review", "Procurement", "Installation", "Commissioning"],
    outcome:
      "Daytime production loads shifted to solar, with the generator synchronised for peak demand.",
    photos: [],
    sample: true,
  },
  {
    slug: "estate-ev-charging",
    title: "Residential estate EV charging",
    category: "EV",
    location: "Victoria Island, Lagos",
    year: "2025",
    systemSize: "4 × 7 kW AC chargers · solar-paired",
    summary: "Shared charging bays for residents of a gated estate.",
    scope: ["Supply capacity assessment", "Charger supply", "Installation", "Commissioning"],
    outcome: "Residents charge overnight in allocated bays, with daytime top-ups running on the estate's solar.",
    photos: [],
    sample: true,
  },
  {
    slug: "corporate-hq-screening",
    title: "Head-office screening point",
    category: "Security",
    location: "Victoria Island, Lagos",
    year: "2024",
    systemSize: "1 X-ray baggage scanner · 2 walk-through metal detectors",
    summary: "A visitor screening point at a corporate head office.",
    scope: ["Site walk-through", "Equipment supply", "Installation", "Operator handover"],
    outcome: "Visitors and bags are screened at one controlled entrance.",
    photos: [],
    sample: true,
  },
  {
    slug: "gold-cohort-onsite-training",
    title: "On-site Gold installer cohort",
    category: "Training",
    location: "Lagos",
    year: "2025",
    systemSize: "5-day on-site programme",
    summary: "A cohort of new installers trained on live solar and inverter installations.",
    scope: ["Classroom sessions", "Hands-on practicals", "Business strategy sessions", "Mentorship"],
    outcome: "Trainees completed hands-on installations and joined the six-month mentorship programme.",
    photos: [],
    sample: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
