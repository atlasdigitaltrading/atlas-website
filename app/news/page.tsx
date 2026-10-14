import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { TickerStrip } from "@/components/TickerStrip";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionLabel } from "@/components/SectionLabel";
import { formatNewsDate, getNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "News | Atlas Digital Trading",
  description:
    "Press releases and company announcements from Atlas Digital Markets.",
  alternates: { canonical: "/news" },
};

export default async function NewsIndexPage() {
  const items = await getNews();
  return (
    <div className="min-h-screen bg-atlas-bg">
      <NavBar />
      <div className="mt-[68px] sticky top-[68px] z-[999]">
        <TickerStrip />
      </div>
      <main className="mx-auto max-w-[800px] px-[clamp(16px,4vw,56px)] pb-24 pt-10">
        <SectionLabel>News</SectionLabel>
        <SectionHeading>Press releases and announcements</SectionHeading>
        <p className="mt-4 text-atlas-gray">
          Company news from Atlas Digital Markets. For media enquiries, write to{" "}
          <a href="mailto:kiran@atlasdigitaltrading.com" className="text-atlas-accent no-underline hover:underline">
            kiran@atlasdigitaltrading.com
          </a>
          .
        </p>
        <ul className="mt-12 flex flex-col gap-8">
          {items.map((n) => (
            <li key={n.slug} className="border-b border-atlas-border pb-8">
              <Link href={`/news/${n.slug}`} className="group block no-underline">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="inline-block rounded bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-atlas-accent">
                    {n.kind}
                  </span>
                  <time dateTime={n.publishedDate} className="text-[11px] text-atlas-gray-darker">
                    {formatNewsDate(n.publishedDate)}
                  </time>
                </div>
                <h2 className="font-display text-xl font-bold leading-snug text-atlas-white group-hover:text-atlas-accent">
                  {n.title}
                </h2>
                {n.subtitle ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-atlas-offwhite">{n.subtitle}</p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-atlas-gray">{n.excerpt}</p>
                <span className="mt-3 inline-block text-[13px] font-semibold text-atlas-accent">
                  Read the release →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
