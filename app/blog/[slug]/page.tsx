import { DocumentRenderer } from "@keystatic/core/renderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { reader } from "@/lib/keystatic-reader";

type Props = { params: Promise<{ slug: string }> };

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

  const root = post.content.node as unknown as {
    children?: Parameters<typeof DocumentRenderer>[0]["document"];
  };
  const documentBody = root.children ?? [];

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
        <div className="prose prose-invert prose-headings:font-display mt-10 max-w-none prose-p:text-atlas-gray prose-a:text-atlas-accent prose-strong:text-atlas-white">
          <DocumentRenderer document={documentBody} />
        </div>
      </article>
      <Footer />
    </div>
  );
}
