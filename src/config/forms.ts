/**
 * Contact funnel definition, shared by the form (browser) and the API (server).
 * Each service shows its own extra fields; the server only accepts fields listed here.
 */

export type ExtraField =
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean }
  | { name: string; label: string; type: "number"; min?: number; max?: number; required?: boolean }
  | { name: string; label: string; type: "text"; placeholder?: string; required?: boolean }
  | { name: string; label: string; type: "checkboxes"; options: string[] };

export type ServiceOption = {
  id: string;
  label: string;
  /** Short line shown under the dropdown once chosen */
  hint?: string;
  extra: ExtraField[];
};

export const contactServices: ServiceOption[] = [
  {
    id: "solar",
    label: "Solar and power systems",
    hint: "Tell us what you need to keep running. We use this to size your system.",
    extra: [
      { name: "systemType", label: "What are you looking for?", type: "select", required: true, options: ["Solar, inverter and batteries", "Inverter and batteries only", "Not sure yet"] },
      { name: "propertyType", label: "Property type", type: "select", required: true, options: ["Flat / apartment", "Bungalow", "Duplex", "Shop or office", "School, clinic or hospital", "Factory or industrial site", "Other"] },
      { name: "rooms", label: "Number of rooms", type: "number", min: 0, max: 200 },
      { name: "fans", label: "Fans", type: "number", min: 0, max: 500 },
      { name: "tvs", label: "TVs", type: "number", min: 0, max: 500 },
      { name: "acs", label: "Air conditioners", type: "number", min: 0, max: 500 },
      { name: "freezers", label: "Fridges and freezers", type: "number", min: 0, max: 500 },
      { name: "pumps", label: "Water pumps", type: "number", min: 0, max: 50 },
      { name: "paymentPlan", label: "Interested in a payment plan?", type: "select", options: ["No", "Yes", "Maybe"] },
    ],
  },
  {
    id: "existing",
    label: "Work on an existing system",
    hint: "Installation of equipment you already have, repairs, maintenance or metering.",
    extra: [
      { name: "need", label: "What do you need?", type: "select", required: true, options: ["Install equipment I already bought", "Repair or fault-finding", "Routine maintenance or servicing", "Metering", "Other"] },
      { name: "systemSize", label: "System size, if known", type: "text", placeholder: "e.g. 5 kVA inverter, 8 panels" },
    ],
  },
  {
    id: "survey",
    label: "Site survey, audit report or BOQ",
    hint: "A physical site visit before a quotation carries the call-out fee; phone and online consultations are free.",
    extra: [
      { name: "need", label: "What do you need?", type: "select", required: true, options: ["Site survey and audit report", "Preliminary bill of quantities (BOQ)", "Both"] },
      { name: "propertyType", label: "Property type", type: "select", options: ["Flat / apartment", "Bungalow", "Duplex", "Shop or office", "School, clinic or hospital", "Factory or industrial site", "Other"] },
    ],
  },
  {
    id: "ev",
    label: "EV charging",
    extra: [
      { name: "siteType", label: "Where will you charge?", type: "select", required: true, options: ["Home", "Office or workplace", "Residential estate", "Fleet depot", "Forecourt or public site", "Other"] },
      { name: "chargers", label: "Number of chargers", type: "number", min: 1, max: 500 },
      { name: "vehicles", label: "Vehicles to charge", type: "text", placeholder: "e.g. 2 cars, 10 delivery vans" },
    ],
  },
  {
    id: "security",
    label: "Security screening",
    extra: [
      { name: "facility", label: "Type of facility", type: "select", required: true, options: ["Airport or seaport", "Government building", "Bank or corporate office", "Hotel, mall or venue", "Oil and gas facility", "Other"] },
      { name: "equipment", label: "Equipment of interest", type: "checkboxes", options: ["X-ray baggage scanner", "Walk-through metal detector", "Explosive trace detector", "Vehicle screening", "Not sure"] },
      { name: "checkpoints", label: "Number of screening points", type: "number", min: 1, max: 200 },
    ],
  },
  ...(["epc", "owners-engineer", "project-management"] as const).map((id) => ({
    id,
    label: { epc: "EPC (Engineering, Procurement and Construction)", "owners-engineer": "Owner's Engineer", "project-management": "Project Management" }[id],
    extra: [
      { name: "organisation", label: "Organisation", type: "text", required: true } as ExtraField,
      { name: "projectLocation", label: "Project location", type: "text", required: true } as ExtraField,
      { name: "capacity", label: "Approximate size", type: "text", placeholder: "e.g. 250 kWp, 100 kVA, 3 sites" } as ExtraField,
      { name: "stage", label: "Project stage", type: "select", options: ["Idea / feasibility", "Design", "Procurement / tender", "Construction", "Operating plant"] } as ExtraField,
      { name: "timeline", label: "Target start", type: "select", options: ["Within 3 months", "3–6 months", "6–12 months", "Not decided"] } as ExtraField,
    ],
  })),
  {
    id: "oem",
    label: "OEM installation and support",
    extra: [
      { name: "organisation", label: "Company", type: "text", required: true },
      { name: "equipment", label: "Equipment type or brand", type: "text", required: true },
      { name: "need", label: "What do you need?", type: "select", options: ["Installation partner", "Service and maintenance partner", "Both", "Other"] },
    ],
  },
  {
    id: "training",
    label: "Training",
    hint: "To register and pay for a package now, use the Training page. Use this form for questions or group bookings.",
    extra: [
      { name: "package", label: "Package of interest", type: "select", options: ["Online Basic", "Online Business", "On-site Silver", "On-site Gold", "Group / company booking"] },
      { name: "trainees", label: "Number of trainees", type: "number", min: 1, max: 500 },
    ],
  },
  { id: "other", label: "Other", extra: [] },
];

export const getService = (id: string) => contactServices.find((s) => s.id === id);

export const partnershipTypeOptions = [
  "Equipment manufacturer or distributor",
  "Finance or development partner",
  "Installer or dealer",
  "Corporate / CSR",
  "Government or NGO",
  "Reohob Initiative (rural energy)",
  "Other",
];
