import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { divisions } from "@/content/divisions";
import { getProjects } from "@/content/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/about", "/divisions", "/projects", "/services", "/contact", "/privacy"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const divisionRoutes = divisions.map((d) => ({ url: `${site.url}/divisions/${d.slug}`, lastModified: now, priority: 0.8 }));
  // Only verified projects are listed for search engines.
  const projectRoutes = (await getProjects())
    .filter((p) => p.verified)
    .map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.6 }));
  return [...staticRoutes, ...divisionRoutes, ...projectRoutes];
}
