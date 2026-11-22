import { site } from "@/config/site";

/**
 * Partners. Only Rapiscan is named on the old site, and it is behind a flag
 * because the partnership has not been confirmed as current.
 * Add real partners here with a logo in /public/partners/.
 */

export type Partner = {
  name: string;
  kind: string;
  logo?: string;
  confirmed: boolean;
};

const rapiscan: Partner = {
  name: "Rapiscan Systems",
  kind: "Security screening equipment",
  confirmed: site.flags.RAPISCAN_PARTNERSHIP_CONFIRMED,
};

export const partners: Partner[] = [
  ...(site.flags.RAPISCAN_PARTNERSHIP_CONFIRMED || site.flags.SHOW_UNCONFIRMED_RAPISCAN ? [rapiscan] : []),
  // TODO: add confirmed equipment, finance and installation partners.
];

/** Empty logo slots shown next to real partners until they are filled. */
export const partnerSlots = 4;

export const partnershipTypes = [
  {
    id: "equipment",
    name: "Equipment manufacturers and distributors",
    detail:
      "We install, commission and support your equipment in Nigeria to your standard, and give your products a qualified local route to market.",
  },
  {
    id: "finance",
    name: "Finance and development partners",
    detail:
      "Fund solar for homes, businesses and rural communities through our payment plans and the Reohob Initiative.",
  },
  {
    id: "installers",
    name: "Installers and dealers",
    detail:
      "Trained installers get engineering support and access to our dealership price list. Start with the Training programme.",
  },
  {
    id: "csr",
    name: "Corporate and CSR partners",
    detail: "Bring reliable power to schools, clinics and community buildings as part of your social investment.",
  },
  {
    id: "public",
    name: "Government and NGOs",
    detail: "Deliver rural electrification and public-building solar with a contractor that can survey, build and maintain.",
  },
] as const;
