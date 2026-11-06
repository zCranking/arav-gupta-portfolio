import type { MetadataRoute } from "next";
import activity from "@/data/activity.json";
import { detailed, site } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = activity.generated;
  return ["", "/about", "/log", "/tools", "/resume", ...detailed.map((p) => `/work/${p.slug}`)].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
