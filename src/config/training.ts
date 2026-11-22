/**
 * Training packages and prices — the only place prices live.
 * The server reads the amount from here when it starts a Paystack payment
 * and checks the paid amount against it before confirming a registration.
 * Prices and inclusions are from the old /training-program page.
 */

export type TrainingPackage = {
  id: "online-basic" | "online-business" | "onsite-silver" | "onsite-gold";
  name: string;
  short: string;
  mode: "Online" | "On-site";
  /** Price in naira (whole naira, not kobo) */
  price: number;
  duration: string;
  includes: string[];
};

export const trainingPackages: TrainingPackage[] = [
  {
    id: "online-basic",
    name: "Online Basic Engineering and Installation Training",
    short: "Online Basic",
    mode: "Online",
    price: 50_000,
    duration: "4 sessions, 1 to 1½ hours each",
    includes: [
      "Online classes following the course outline",
      "PDF certificate of attendance",
    ],
  },
  {
    id: "online-business",
    name: "Online Business-Improved Engineering and Installation Training",
    short: "Online Business",
    mode: "Online",
    price: 70_000,
    duration: "4 sessions, 1 to 1½ hours each",
    includes: [
      "Online classes following the course outline",
      "2 online business class and strategy sessions",
      "PDF certificate of attendance",
    ],
  },
  {
    id: "onsite-silver",
    name: "On-site Silver Engineering and Installation Training",
    short: "On-site Silver",
    mode: "On-site",
    price: 150_000,
    duration: "5 days, 6 hours a day",
    includes: [
      "On-site classes following the course outline",
      "Hands-on practical work",
      "PDF certificate of attendance",
      "Welfare during the training period",
    ],
  },
  {
    id: "onsite-gold",
    name: "On-site Gold Business-Optimised Engineering and Installation Package",
    short: "On-site Gold",
    mode: "On-site",
    price: 250_000,
    duration: "5 days, 6 hours a day",
    includes: [
      "On-site classes following the course outline",
      "Hands-on practical work",
      "Printed and PDF certificates of attendance",
      "Welfare during the training period",
      "Business class and strategy sessions",
      "6 months' free mentorship",
      "6 months' access to company engineering support",
      "Access to the company dealership price list",
      "Engineering equipment",
      "Job access opportunities",
    ],
  },
];

export const getPackage = (id: string) => trainingPackages.find((p) => p.id === id);

/** TODO: supply the course outline document(s) — the old site said "course outline attached" but none was published. */
export const courseOutlineUrl = "";
