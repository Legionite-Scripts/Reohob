import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/products-and-services", 0.9],
    ["/contact", 0.9],
    ["/training", 0.8],
    ["/partnership", 0.6],
    ["/management", 0.6],
    ["/warranty", 0.4],
    ["/terms", 0.3],
    ["/privacy", 0.3],
  ];
  const realProjects = projects.filter((p) => !p.sample);
  // /projects is listed only once a real project exists (the page is hidden until then).
  if (realProjects.length) pages.push(["/projects", 0.7]);
  return [
    ...pages.map(([path, priority]) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...realProjects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
