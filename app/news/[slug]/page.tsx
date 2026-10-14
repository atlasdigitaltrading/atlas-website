import { DocumentRenderer } from "@keystatic/core/renderer";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { TickerStrip } from "@/components/TickerStrip";
import { reader } from "@/lib/keystatic-reader";
import { formatNewsDate } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };
type Doc = Parameters<typeof DocumentRenderer>[0]["document"];

export async function generateStaticParams() {
  const slugs = await reader.collections.news.list();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const item = await reader.collections.news.read(slug);
  if (!item) return { title: "News | Atlas Digital Trading" };
  const title = `${item.title} | Atlas Digital Trading`;
  const image = item.ogImage || "/og/og-home-v3.png";
  return {
    title,
    description: item.excerpt,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt,
      publishedTime: item.publishedDate ?? undefined,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: item.title, description: item.excerpt, images: [image] },
  };
}

export default async function NewsItemPage(props: Props) {
  const { slug } = await props.params;
  const item = await reader.collections.news.read(slug, { resolveLinkedFiles: true });
  if (!item) notFound();

  const content = item.content as unknown;
  const body: Doc = Array.isArray(content)
    ? (content as Doc)
    : content && typeof content === "object" && "node" in content
      ? ((content as { node: { children: Doc } }).node.children ?? [])
      : [];

  return (
    <div className="min-h-screen bg-atlas-bg">
      <NavBar />
      <div className="mt-[68px] sticky top-[68px] z-[999]">
        <TickerStrip />
      </div>
      <article className="mx-auto max-w-[760px] px-[clamp(16px,4vw,56px)] pb-24 pt-10">
        <Link href="/news" className="text-sm font-semibold text-atlas-accent no-underline hover:underline">
          ← All news
        </Link>
        <div className="mb-4 mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-block rounded bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-atlas-accent">
            {item.kind || "Press release"}
          </span>
          <time dateTime={item.publishedDate ?? undefined} className="text-sm text-atlas-gray-darker">
            {item.publishedDate ? formatNewsDate(item.publishedDate) : null}
          </time>
        </div>
        <h1 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold leading-tight tracking-tight text-atlas-white">
          {item.title}
        </h1>
        {item.subtitle ? (
          <p className="mt-4 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-atlas-offwhite">
            {item.subtitle}
          </p>
        ) : null}
        <div
          className={[
            "prose prose-invert mt-10 max-w-none",
            "font-body",
            "prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight",
            "prose-h2:mt-12 prose-h2:mb-3 prose-h2:border-t prose-h2:border-atlas-border prose-h2:pt-8 prose-h2:text-atlas-white prose-h2:text-[1.1rem]",
            "prose-p:leading-[1.75] prose-p:text-atlas-gray prose-p:my-5 prose-p:text-[16px]",
            "prose-a:font-medium prose-a:text-atlas-accent prose-a:no-underline hover:prose-a:underline",
            "prose-strong:font-semibold prose-strong:text-atlas-white",
          ].join(" ")}
        >
          <DocumentRenderer document={body} />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-atlas-border bg-atlas-card px-6 py-5">
          <div>
            <div className="font-display text-[15px] font-bold text-atlas-white">Atlas TCA</div>
            <div className="mt-0.5 text-[13px] text-atlas-gray">
              Standalone execution measurement, deployed inside your environment.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/atlas-tca" className="rounded-lg border border-atlas-border px-4 py-2 text-sm font-semibold text-atlas-offwhite no-underline transition-all hover:border-atlas-accent/40">
              About Atlas TCA →
            </Link>
            <Link href="/#demo" className="rounded-lg bg-atlas-accent px-4 py-2 text-sm font-bold text-white no-underline transition-all hover:bg-atlas-accent-light">
              Book a demo
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
