/**
 * Low-precision solar geometry (NOAA-style approximations, good to ~1°),
 * used to draw the sun's real path over Lagos for a given day.
 */

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

export type SolarDay = {
  /** declination in degrees */
  declination: number;
  /** equation of time in minutes */
  eot: number;
  /** clock minutes after local midnight */
  sunrise: number;
  sunset: number;
  solarNoon: number;
  maxAltitude: number;
};

export function dayOfYear(d: Date, utcOffsetHours: number) {
  // Use the site's local calendar date, independent of the viewer's timezone.
  const local = new Date(d.getTime() + utcOffsetHours * 3600_000);
  const start = Date.UTC(local.getUTCFullYear(), 0, 0);
  const now = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  return Math.round((now - start) / 86_400_000);
}

export function localMinutes(d: Date, utcOffsetHours: number) {
  const local = new Date(d.getTime() + utcOffsetHours * 3600_000);
  return local.getUTCHours() * 60 + local.getUTCMinutes();
}

export function solarDay(n: number, lat: number, lng: number, utcOffsetHours: number): SolarDay {
  const declination = 23.44 * Math.sin(rad((360 / 365) * (284 + n)));
  const B = rad((360 / 364) * (n - 81));
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const solarNoon = 12 * 60 - 4 * (lng - 15 * utcOffsetHours) - eot;
  // -0.833° accounts for refraction and the sun's radius
  const cosH0 =
    (Math.sin(rad(-0.833)) - Math.sin(rad(lat)) * Math.sin(rad(declination))) /
    (Math.cos(rad(lat)) * Math.cos(rad(declination)));
  const H0 = deg(Math.acos(Math.max(-1, Math.min(1, cosH0))));
  return {
    declination,
    eot,
    solarNoon,
    sunrise: solarNoon - 4 * H0,
    sunset: solarNoon + 4 * H0,
    maxAltitude: 90 - Math.abs(lat - declination),
  };
}

/** Solar altitude in degrees at a clock time (minutes after local midnight). */
export function altitudeAt(minutes: number, day: SolarDay, lat: number) {
  const H = (minutes - day.solarNoon) / 4; // degrees
  const s =
    Math.sin(rad(lat)) * Math.sin(rad(day.declination)) +
    Math.cos(rad(lat)) * Math.cos(rad(day.declination)) * Math.cos(rad(H));
  return deg(Math.asin(Math.max(-1, Math.min(1, s))));
}

/** Clear-sky relative PV output, 0..1 (simple air-mass falloff). */
export function relativeOutput(altitude: number, maxAltitude: number) {
  if (altitude <= 0) return 0;
  const f = (a: number) => Math.pow(Math.sin(rad(a)), 1.25);
  return Math.min(1, f(altitude) / f(maxAltitude));
}

export type SupplyState = "battery" | "shared" | "solar";

/** Which source carries the load, for the illustration. */
export function supplyState(altitude: number): SupplyState {
  if (altitude <= 0) return "battery";
  if (altitude < 15) return "shared";
  return "solar";
}

export const fmtClock = (minutes: number) => {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
