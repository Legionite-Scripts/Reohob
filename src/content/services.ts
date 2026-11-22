/**
 * Products and Services content.
 * Specs come from the old Solar Panels, Inverters and Batteries pages.
 * Items marked `draft: true` are new copy written for this rebuild and need review.
 */

export const serviceGroups = [
  {
    id: "power-systems",
    title: "Home and business power systems",
    summary:
      "Solar panels, inverters and batteries, designed and installed as one system, from 1 kVA flats to 100 kVA commercial sites.",
    spec: "1–100 kVA · 250–445 W panels · lithium-ion, lead-acid, carbon-lead",
  },
  {
    id: "ev-charging",
    title: "EV charging",
    summary:
      "Charger supply and installation for homes, offices, estates and fleet depots, with the electrical work to support them.",
    spec: "AC wall chargers · DC fast chargers · solar-paired options",
  },
  {
    id: "security-screening",
    title: "Security screening",
    summary:
      "X-ray baggage scanners, walk-through metal detectors and explosive trace detectors for sites that screen people and bags.",
    spec: "People · baggage · vehicle screening",
  },
  {
    id: "engineering-services",
    title: "Engineering services",
    summary:
      "EPC delivery, owner's engineer, OEM installation and project management for commercial and industrial energy projects.",
    spec: "EPC · Owner's Engineer · OEM · Project Management",
  },
] as const;

export const powerComponents = [
  {
    id: "panels",
    name: "Solar panels",
    role: "Convert sunlight directly into electricity during the day.",
    specs: [
      ["Output", "250 W to 445 W per panel"],
      ["Construction", "60-cell to 72-cell bifacial mono PERC, double glass, 30 mm frame"],
      ["Built for", "Harsh environments and extreme weather; strong low-light performance"],
      ["Maintenance", "Low: periodic cleaning and an annual check"],
    ],
  },
  {
    id: "inverters",
    name: "Inverters",
    role: "Convert stored and solar power into the AC electricity your building uses, and manage charging.",
    specs: [
      ["Capacity", "1 kVA to 100 kVA"],
      ["Works with", "Deep-cycle lead-acid, carbon-lead and lithium-ion batteries"],
      ["Sources", "Solar, grid and generator"],
    ],
  },
  {
    id: "batteries",
    name: "Batteries",
    role: "Store energy from the panels or the grid so the inverter can supply it when needed, including through the night.",
    specs: [
      ["Chemistries", "Lead-acid, carbon-lead and lithium-ion"],
      ["Capacity", "100 Ah, 150 Ah, 175 Ah, 200 Ah and 210 Ah"],
      ["Voltage", "Mostly 12 V for lead-acid and carbon-lead"],
    ],
  },
] as const;

/** DRAFT: sizing tiers. Indicative ranges only; no prices. Confirmed after a site survey. */
export const sizingTiers = [
  {
    id: "essentials",
    name: "Essentials",
    range: "1 – 3 kVA",
    for: "Flats, small shops and kiosks",
    runs: ["Lighting", "Fans", "TV and decoder", "Laptops and phones", "A small fridge"],
  },
  {
    id: "home",
    name: "Home",
    range: "3.5 – 5 kVA",
    for: "Bungalows and family flats",
    runs: ["Everything in Essentials", "A chest freezer", "One 1 HP inverter air conditioner", "Water pump (short runs)"],
  },
  {
    id: "large-home",
    name: "Large home and office",
    range: "7.5 – 10 kVA",
    for: "Duplexes, offices and clinics",
    runs: ["Several inverter air conditioners", "Multiple freezers", "Borehole pump", "Office equipment"],
  },
  {
    id: "commercial",
    name: "Commercial and industrial",
    range: "15 – 100 kVA",
    for: "Businesses, schools, hospitals, estates, factories",
    runs: ["Designed from a load audit", "Three-phase systems", "Generator and grid integration", "Monitoring and maintenance plans"],
  },
] as const;

export const engineeringServices = [
  {
    id: "epc",
    code: "EPC",
    name: "Engineering, Procurement and Construction",
    description:
      "We take a solar, hybrid or power project from design to handover under one contract: engineering, equipment procurement, installation, testing and commissioning.",
    deliverables: [
      "Site survey and audit report",
      "System design, single-line diagram and preliminary BOQ",
      "Procurement and logistics",
      "Installation, testing and commissioning",
      "As-built documentation and handover training",
    ],
    for: "Businesses, estates, schools, hospitals and investors who want one accountable contractor.",
    draft: true,
  },
  {
    id: "owners-engineer",
    code: "OE",
    name: "Owner's Engineer",
    description:
      "We act for you, the project owner, checking another contractor's design, equipment and workmanship so you get the plant you are paying for.",
    deliverables: [
      "Design and specification review",
      "Bid evaluation support",
      "Factory and site inspection",
      "Construction monitoring and progress reports",
      "Commissioning witness and punch list",
    ],
    for: "Owners, developers and financiers commissioning a plant built by someone else.",
    draft: true,
  },
  {
    id: "oem",
    code: "OEM",
    name: "Original Equipment Manufacturer installation and support",
    description:
      "We work with equipment manufacturers as an installation and service partner in Nigeria, installing, commissioning and maintaining their equipment to the manufacturer's standard.",
    deliverables: [
      "Installation to manufacturer specification",
      "Commissioning and warranty registration",
      "Local after-sales service and maintenance",
      "Spares coordination",
    ],
    for: "Manufacturers and distributors that need a qualified local partner; buyers of their equipment.",
    draft: true,
    note: "TODO: confirm what OEM means for Reohob (installation partner, own-brand equipment, or both).",
  },
  {
    id: "project-management",
    code: "PM",
    name: "Project Management",
    description:
      "We plan and run energy projects for clients: scope, schedule, budget, contractors and reporting, from kick-off to closeout.",
    deliverables: [
      "Project plan, schedule and budget",
      "Contractor and supplier coordination",
      "Quality, health and safety oversight",
      "Progress and cost reporting",
      "Closeout and handover",
    ],
    for: "Organisations running multi-site rollouts or projects with several contractors.",
    draft: true,
  },
] as const;

/** From the old Consultation form's service list. Each row opens the contact form on the right service. */
export const supportServices = [
  { label: "Installation of solar and inverter systems you have already bought", service: "existing" },
  { label: "Site survey and audit report for a proposed installation", service: "survey" },
  { label: "Maintenance, servicing and metering of existing renewable energy plants", service: "existing" },
  { label: "Preliminary bill of quantities (BOQ)", service: "survey" },
  { label: "Hire an engineering team", service: "project-management" },
] as const;

export const securityEquipment = [
  {
    name: "X-ray baggage scanners",
    detail: "Screen bags, parcels and luggage at entrances, mailrooms and check-in points.",
  },
  {
    name: "Walk-through metal detectors",
    detail: "Screen people at entrances and controlled zones.",
  },
  {
    name: "Explosive trace detectors",
    detail: "Detect explosive residue on bags, surfaces and documents.",
  },
] as const;

export const securityAudiences = [
  "Airports and seaports",
  "Government buildings",
  "Banks and corporate head offices",
  "Hotels, malls and event venues",
  "Oil and gas facilities",
] as const;

/** DRAFT: EV charging copy (replaces the old template copy entirely) */
export const evOfferings = [
  {
    name: "AC wall chargers",
    detail:
      "For homes, offices and estates where cars park for hours. We check your supply, install the charger on a dedicated circuit and commission it.",
  },
  {
    name: "DC fast chargers",
    detail:
      "For fleets, depots and forecourts that need vehicles back on the road quickly. Designed around your site's supply capacity.",
  },
  {
    name: "Solar-paired charging",
    detail:
      "Pair chargers with a solar and battery system so daytime charging runs on your own generation, not the grid or a generator.",
  },
] as const;
