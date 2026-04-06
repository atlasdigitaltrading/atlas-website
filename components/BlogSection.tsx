import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

export type BlogTeaser = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
};

type Props = { latest: BlogTeaser[] };

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BlogSection({ latest }: Props) {
  return (
    <section id="blog" className="bg-atlas-bg px-[clamp(16px,4vw,56px)] py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>Insights</SectionLabel>
        <SectionHeading>From the founder&apos;s desk</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-[14px] border border-atlas-border bg-atlas-card no-underline transition-all hover:-translate-y-1 hover:border-[rgba(59,130,246,0.35)]"
            >
              <div className="flex h-[140px] items-center justify-center bg-gradient-to-br from-[rgba(59,130,246,0.12)] to-[rgba(167,139,250,0.08)]">
                <svg width={36} height={36} viewBox="0 0 40 40" fill="none" aria-hidden>
                  <polygon points="20,2 38,34 2,34" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  <polygon points="20,12 30,30 10,30" fill="#3b82f6" fillOpacity="0.2" />
                </svg>
              </div>
              <div className="p-[22px]">
                <span className="mb-2.5 inline-block rounded bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold tracking-wider text-atlas-accent">
                  {post.tag}
                </span>
                <h3 className="font-display mb-2 text-lg font-bold leading-snug text-atlas-white">
                  {post.title}
                </h3>
                <p className="mb-3.5 text-[13px] leading-relaxed text-atlas-gray">
                  {post.excerpt}
                </p>
                <div className="flex justify-between text-[11px] text-atlas-gray-darker">
                  <span>{formatDate(post.publishedDate)}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="text-sm font-semibold text-atlas-accent no-underline hover:underline"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
