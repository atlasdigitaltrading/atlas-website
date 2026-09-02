import type { MetadataRoute } from "next";
import { reader } from "@/lib/keystatic-reader";

const BASE = "https://atlasdigitaltrading.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await reader.collections.posts.all();
  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, entry }) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(entry.publishedDate as string),
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/atlasx`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/atlas-desk`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/intelligence`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/pro`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...postEntries,
  ];
}
