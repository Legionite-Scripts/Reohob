/**
 * Photography. Professional stock from Pexels (Pexels License: free for commercial use, no
 * attribution required) plus one public-domain U.S. Department of Energy photo from Wikimedia
 * Commons. Neither needs a credit on the page; sources are recorded here. The photos illustrate the work; none is presented as a Reohob project. Replace any
 * of them with Reohob's own photos by changing `src` (and `credit`, for the record).
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: { author?: string; site: string; source: string; license: string; licenseUrl?: string };
  focus?: string;
};

const pexels = (slug: string, author?: string) => ({
  author,
  site: "Pexels",
  source: `https://www.pexels.com/photo/${slug}/`,
  license: "Pexels License",
  licenseUrl: "https://www.pexels.com/license/",
});

export const photos = {
  electronicsBench: {
    src: "/photos/engineer-electronics-bench.jpg",
    width: 2600,
    height: 1734,
    alt: "An engineer in safety glasses soldering a circuit board at an electronics workbench",
    credit: pexels("woman-soldering-pcb-in-school-19895844", "ThisIsEngineering"),
    focus: "68% 40%",
  },
  partnershipMeeting: {
    src: "/photos/lagos-partnership-meeting.jpg",
    width: 2600,
    height: 1733,
    alt: "Business partners shaking hands at a meeting in Lagos",
    credit: pexels("business-team-meeting-with-handshakes-in-lagos-cafe-30677598"),
    focus: "62% 40%",
  },
  lagosNight: {
    src: "/photos/lagos-bridge-night.jpg",
    width: 2600,
    height: 1950,
    alt: "A curving illuminated bridge in Lagos at night",
    credit: pexels("scenic-night-view-of-illuminated-city-bridge-30668319"),
    focus: "70% 50%",
  },
  lagosTower: {
    src: "/photos/lagos-waterfront-tower.jpg",
    width: 1400,
    height: 2006,
    alt: "A tall green glass tower on the Lagos waterfront",
    credit: pexels("modern-skyscraper-by-lagos-waterfront-35329736", "Justbeingblythe"),
    focus: "50% 40%",
  },
  roofSky: {
    src: "/photos/roof-array-sky.jpg",
    width: 1800,
    height: 1200,
    alt: "A neat array of solar panels on a pitched roof against a clear sky",
    credit: pexels("solar-panels-on-house-roof-17762230"),
    focus: "60% 50%",
  },
  evCharging: {
    src: "/photos/ev-charging.jpg",
    width: 1600,
    height: 1067,
    alt: "An electric car plugged into a wall-mounted charger showing its charge level",
    credit: pexels("electric-car-charging-at-station-with-display-34800675"),
    focus: "60% 50%",
  },
  securityCheck: {
    src: "/photos/security-luggage-check.jpg",
    width: 1600,
    height: 1067,
    alt: "A security officer in gloves inspecting a bag at a screening checkpoint",
    credit: pexels("security-checkpoint-with-luggage-inspection-29152262", "Sergei Starostin"),
    focus: "50% 45%",
  },
  panelCells: {
    src: "/photos/panel-cells-closeup.jpg", width: 1600, height: 1069,
    alt: "Close-up of the cells and frame of a monocrystalline solar panel",
    credit: pexels("close-up-photo-of-a-solar-panel-8853509"), focus: "50% 50%",
  },
  inverterRow: {
    src: "/photos/inverters-wall-row.jpg", width: 1920, height: 1289,
    alt: "A row of wall-mounted solar inverters with their isolators and conduit",
    credit: { author: "Scott Ely, U.S. Department of Energy", site: "Wikimedia Commons", source: "https://commons.wikimedia.org/wiki/File:Ely_000233_166402_510764_4578_(36775932636).jpg", license: "Public domain" },
    focus: "50% 55%",
  },
  trainingHandsOn: {
    src: "/photos/training-hands-on-accra.jpg", width: 1600, height: 1067,
    alt: "Two trainees assembling electronics together in a hands-on workshop",
    credit: pexels("young-students-engaged-in-robotics-workshop-33920046", "Zeal Creative Studios"), focus: "50% 45%",
  },
  engineerCabling: {
    src: "/photos/engineer-cabling.jpg", width: 2600, height: 1733,
    alt: "A Black engineer testing cables in an equipment rack",
    credit: pexels("crop-focused-ethnic-engineer-using-electric-screwdriver-442151"), focus: "74% 40%",
  },
  engineerCity: {
    src: "/photos/engineer-hardhat-city.jpg", width: 2600, height: 1950,
    alt: "A Black woman engineer in a hi-vis vest on a site call, holding her hard hat",
    credit: pexels("woman-engineer-using-phone-8487722"), focus: "55% 18%",
  },
  electricianWiring: {
    src: "/photos/electrician-wiring.jpg", width: 2600, height: 1733,
    alt: "A Black woman electrician in overalls stripping cable for a new installation",
    credit: pexels("a-female-electrician-standing-on-a-ladder-and-holding-cables-20500461"), focus: "50% 35%",
  },
  fieldEngineer: {
    src: "/photos/field-engineer-sockets.jpg", width: 2600, height: 1733,
    alt: "A field engineer in a hard hat testing wall sockets",
    credit: pexels("an-electrician-repairing-the-ac-power-plugs-and-sockets-442160"), focus: "40% 45%",
  },
  engineerKaduna: {
    src: "/photos/engineer-substation-kaduna.jpg", width: 1600, height: 2126,
    alt: "A young Nigerian engineer in a hard hat at an electrical substation in Kaduna",
    credit: pexels("young-engineer-at-electrical-substation-in-nigeria-33915172"), focus: "50% 30%",
  },
  engineerFieldPlans: {
    src: "/photos/engineer-field-plans.jpg", width: 1400, height: 2100,
    alt: "An African woman engineer in a hard hat reviewing plans in an open field",
    credit: pexels("a-civil-engineer-using-a-tape-measure-11174202"), focus: "50% 35%",
  },
  engineerPortrait: {
    src: "/photos/engineer-hardhat-portrait.jpg", width: 1200, height: 1600,
    alt: "A Black woman engineer in a hi-vis vest holding her hard hat",
    credit: pexels("female-engineer-in-reflective-vest-8487402"), focus: "50% 35%",
  },
  batteryBank: {
    src: "/photos/battery-bank.jpg", width: 860, height: 560,
    alt: "Rows of large batteries in a battery bank",
    credit: pexels("industrial-worker-inspecting-batteries-in-warehouse-36594160", "Heru Dharma"), focus: "50% 50%",
  },
} satisfies Record<string, Photo>;
