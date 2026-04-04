import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionLabel } from "@/components/SectionLabel";
import { reader } from "@/lib/keystatic-reader";

export const metadata = {
  title: "Insights | Atlas Digital Trading",
  description: "News and perspectives from Atlas Digital Trading.",
};

export default async function BlogIndexPage() {
  const all = await reader.collections.posts.all();
  const sorted = [...all].sort((a, b) => {
    const da = new Date(a.entry.publishedDate as string).getTime();
    const db = new Date(b.entry.publishedDate as string).getTime();
    return db - da;
  });

  return (
    <div className="min-h-screen bg-atlas-bg">
      <NavBar />
      <main className="mx-auto max-w-[800px] px-[clamp(16px,4vw,56px)] pb-24 pt-28">
        <SectionLabel>Insights</SectionLabel>
        <SectionHeading>Blog</SectionHeading>
        <p className="mt-4 text-atlas-gray">
          Long-form notes on execution, market structure, and product.
        </p>
        <ul className="mt-12 flex flex-col gap-8">
          {sorted.map(({ slug, entry }) => (
            <li key={slug} className="border-b border-atlas-border pb-8">
              <Link
                href={`/blog/${slug}`}
                className="group block no-underline"
              >
                <span className="mb-2 inline-block rounded bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-atlas-accent">
                  {entry.tag as string}
                </span>
                <h2 className="font-display text-xl font-bold text-atlas-white group-hover:text-atlas-accent">
                  {entry.title as string}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-atlas-gray">
                  {entry.excerpt as string}
                </p>
                <div className="mt-3 flex gap-4 text-[11px] text-atlas-gray-darker">
                  <span>{entry.publishedDate as string}</span>
                  <span>{entry.readTime as string}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
