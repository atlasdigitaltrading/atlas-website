import { reader } from "@/lib/keystatic-reader";

export type NewsTeaser = {
  slug: string;
  title: string;
  subtitle: string;
  kind: string;
  excerpt: string;
  publishedDate: string;
};

export async function getNews(limit?: number): Promise<NewsTeaser[]> {
  const all = await reader.collections.news.all();
  const sorted = [...all].sort(
    (a, b) =>
      new Date(b.entry.publishedDate as string).getTime() -
      new Date(a.entry.publishedDate as string).getTime(),
  );
  const items = sorted.map(({ slug, entry }) => ({
    slug,
    title: entry.title as string,
    subtitle: (entry.subtitle as string) ?? "",
    kind: (entry.kind as string) || "Press release",
    excerpt: (entry.excerpt as string) ?? "",
    publishedDate: entry.publishedDate as string,
  }));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function formatNewsDate(iso: string) {
  try {
    return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
