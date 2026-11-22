/**
 * Photography. Professional stock from Pexels (Pexels License: free for commercial use, no
 * attribution required, so no credit is shown on the page; it is recorded here and embedded in
 * each file). The photos illustrate the work; none is presented as a Reohob project. Replace any
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
    width: 1800,
    height: 1200,
    alt: "An installation crew in full safety gear fixing panels on a large commercial roof",
    credit: pexels("solar-technicians-installing-solar-panels-6961085"),
    focus: "60% 60%",
  },
  technicians: {
    src: "/photos/technicians-hard-hats.jpg",
    width: 1800,
    height: 1202,
    alt: "Two technicians in hard hats and hi-vis vests working together on a solar array",
    credit: pexels("solar-technicians-installing-solar-panels-8853536"),
    focus: "35% 50%",
  },
  lagosNight: {
    src: "/photos/lagos-bridge-night.jpg",
    width: 1800,
    height: 1350,
    alt: "A curving illuminated bridge in Lagos at night",
    credit: pexels("scenic-night-view-of-illuminated-city-bridge-30668319"),
    focus: "70% 50%",
  },
  roofSky: {
    src: "/photos/roof-array-sky.jpg",
    width: 1800,
    height: 1200,
    alt: "A neat array of solar panels on a pitched roof against a clear sky",
    credit: pexels("solar-panels-on-house-roof-17762230"),
    focus: "60% 50%",
  },
} satisfies Record<string, Photo>;
