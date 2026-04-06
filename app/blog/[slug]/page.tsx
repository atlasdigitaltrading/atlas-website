import { DocumentRenderer } from "@keystatic/core/renderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { reader } from "@/lib/keystatic-reader";

type Props = { params: Promise<{ slug: string }> };
type BlogDocument = Parameters<typeof DocumentRenderer>[0]["document"];

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return { title: "Post" };
  return {
    title: `${post.title} | Atlas Digital Trading`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: Props) {
  const { slug } = await props.params;
  const post = await reader.collections.posts.read(slug, {
    resolveLinkedFiles: true,
  });
  if (!post) notFound();

  /** Keystatic stores Markdoc as a top-level `Element[]`; older snippets used `{ node: { children } }`. */
  const content = post.content as unknown;
  const documentBody: BlogDocument = Array.isArray(content)
    ? (content as BlogDocument)
    : content &&
        typeof content === "object" &&
        content !== null &&
        "node" in content &&
        Array.isArray((content as { node: { children: unknown[] } }).node.children)
      ? (content as { node: { children: BlogDocument } }).node.children
      : [];

  return (
    <div className="min-h-screen bg-atlas-bg">
      <NavBar />
      <article className="mx-auto max-w-[720px] px-[clamp(16px,4vw,56px)] pb-24 pt-28">
        <Link
          href="/blog"
          className="text-sm font-semibold text-atlas-accent no-underline hover:underline"
        >
          ← All posts
        </Link>
        <span className="mb-4 mt-6 inline-block rounded bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-atlas-accent">
          {post.tag}
        </span>
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-atlas-white">
          {post.title}
        </h1>
        <div className="mt-4 flex gap-4 text-sm text-atlas-gray-darker">
          <time dateTime={post.publishedDate ?? undefined}>
            {post.publishedDate}
          </time>
          <span>{post.readTime}</span>
        </div>
        <div
          className={[
            "prose prose-invert mt-12 max-w-[65ch]",
            "prose-lg font-body",
            "prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-balance",
            "prose-h2:mt-14 prose-h2:mb-4 prose-h2:border-b prose-h2:border-atlas-border prose-h2:pb-3 prose-h2:text-atlas-white prose-h2:text-[1.35rem] sm:prose-h2:text-[1.5rem]",
            "prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-atlas-offwhite prose-h3:text-[1.15rem]",
            "prose-p:leading-[1.75] prose-p:text-atlas-gray prose-p:my-5",
            "prose-a:font-medium prose-a:text-atlas-accent prose-a:no-underline hover:prose-a:underline",
            "prose-strong:font-semibold prose-strong:text-atlas-white",
            "prose-hr:my-12 prose-hr:border-atlas-border",
            "prose-blockquote:border-atlas-accent prose-blockquote:text-atlas-gray",
          ].join(" ")}
        >
          <DocumentRenderer document={documentBody} />
        </div>
      </article>
      <Footer />
    </div>
  );
}
