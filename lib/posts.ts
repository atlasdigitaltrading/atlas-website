import type { BlogTeaser } from "@/components/BlogSection";
import { reader } from "@/lib/keystatic-reader";

export async function getLatestPosts(limit = 3): Promise<BlogTeaser[]> {
  const all = await reader.collections.posts.all();
  const sorted = [...all].sort((a, b) => {
    const da = new Date(a.entry.publishedDate as string).getTime();
    const db = new Date(b.entry.publishedDate as string).getTime();
    return db - da;
  });
  return sorted.slice(0, limit).map(({ slug, entry }) => ({
    slug,
    title: entry.title as string,
    tag: entry.tag as string,
    excerpt: entry.excerpt as string,
    publishedDate: entry.publishedDate as string,
    readTime: entry.readTime as string,
  }));
}
