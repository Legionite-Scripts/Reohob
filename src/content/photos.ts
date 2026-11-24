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
  crewRoof: {
    src: "/photos/crew-commercial-roof.jpg",
    width: 2400,
    height: 1600,
    alt: "An installation crew in full safety gear fixing panels on a large commercial roof",
    credit: pexels("solar-technicians-installing-solar-panels-6961085"),
    focus: "62% 55%",
  },
  redRoof: {
    src: "/photos/technician-red-roof.jpg",
    width: 2400,
    height: 1800,
    alt: "A technician in safety gear wiring solar panels on a red metal roof, with tropical trees behind",
    credit: pexels("a-male-solar-technician-installing-a-solar-panel-14613940"),
    focus: "72% 55%",
  },
  technicians: {
    src: "/photos/technicians-hard-hats.jpg",
    width: 1600,
    height: 1069,
    alt: "Two technicians in hard hats and hi-vis vests working together on a solar array",
    credit: pexels("solar-technicians-installing-solar-panels-8853536"),
    focus: "60% 50%",
  },
  electronicsBench: {
    src: "/photos/engineer-electronics-bench.jpg",
    width: 2600,
    height: 1734,
    alt: "An engineer in safety glasses soldering a circuit board at an electronics workbench",
    credit: pexels("woman-soldering-pcb-in-school-19895844", "ThisIsEngineering"),
    focus: "68% 40%",
  },
  soldering: {
    src: "/photos/engineer-soldering.jpg",
    width: 1600,
    height: 1067,
    alt: "Close-up of an engineer soldering components with a magnifier",
    credit: pexels("engineer-using-a-soldering-iron-to-fix-an-electronic-equpiment-19895705", "ThisIsEngineering"),
    focus: "55% 45%",
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
  engineersPlans: {
    src: "/photos/engineers-plans-solar-field.jpg",
    width: 1600,
    height: 1067,
    alt: "An engineer and a site manager reviewing plans beside a solar array",
    credit: pexels("two-electricians-standing-near-the-solar-panels-4254157"),
    focus: "50% 40%",
  },
  solarField: {
    src: "/photos/solar-field-engineers.jpg",
    width: 1600,
    height: 1067,
    alt: "Two engineers walking between rows of ground-mounted solar panels",
    credit: pexels("two-electricians-standing-near-the-solar-panels-4254172"),
    focus: "70% 60%",
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
  batteryBank: {
    src: "/photos/battery-bank-check.jpg", width: 1600, height: 1036,
    alt: "A technician checking a large bank of batteries",
    credit: pexels("industrial-worker-inspecting-batteries-in-warehouse-36594160", "Heru Dharma"), focus: "55% 50%",
  },
  stepSurvey: {
    src: "/photos/step-survey-roof.jpg", width: 1400, height: 933,
    alt: "An engineer in safety gear surveying a commercial roof",
    credit: pexels("solar-technician-installing-solar-panels-6961110"), focus: "45% 50%",
  },
  stepDesign: {
    src: "/photos/step-design-team.jpg", width: 1400, height: 934,
    alt: "Engineers discussing a design around a workshop desk",
    credit: pexels("people-sitting-at-desk-in-workshop-and-talking-19895721", "ThisIsEngineering"), focus: "60% 45%",
  },
  stepInstall: {
    src: "/photos/step-install-panels.jpg", width: 1400, height: 935,
    alt: "An installer in a hard hat and gloves fixing solar panels in place",
    credit: pexels("solar-technician-installing-solar-panel-8853502"), focus: "40% 45%",
  },
  stepSupport: {
    src: "/photos/step-support-check.jpg", width: 1400, height: 933,
    alt: "A technician with a clipboard checking a solar array",
    credit: pexels("solar-technician-inspecting-solar-panel-4254171"), focus: "65% 45%",
  },
  trainingHandsOn: {
    src: "/photos/training-hands-on-accra.jpg", width: 1600, height: 1067,
    alt: "Two trainees assembling electronics together in a hands-on workshop",
    credit: pexels("young-students-engaged-in-robotics-workshop-33920046", "Zeal Creative Studios"), focus: "50% 45%",
  },
  installerPanel: {
    src: "/photos/installer-carrying-panel.jpg", width: 1400, height: 2096,
    alt: "An installer in a hard hat carrying a solar panel across a roof",
    credit: pexels("solar-technician-installing-solar-panel-8853507"), focus: "50% 40%",
  },
} satisfies Record<string, Photo>;
