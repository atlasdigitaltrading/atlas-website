import { BlogSection } from "@/components/BlogSection";
import { Clients } from "@/components/Clients";
import { DemoForm } from "@/components/DemoForm";
import { Footer } from "@/components/Footer";
import { HashScroll } from "@/components/HashScroll";
import { Hero } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { TickerStrip } from "@/components/TickerStrip";
import { Platform } from "@/components/Platform";
import { Solutions } from "@/components/Solutions";
import { WhyAtlas } from "@/components/WhyAtlas";
import { getLatestPosts } from "@/lib/posts";

export default async function Home() {
  const latest = await getLatestPosts(3);

  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <HashScroll />
      <NavBar />
      <div className="mt-[68px] sticky top-[68px] z-[999]">
        <TickerStrip />
      </div>
      <Hero />
      <Platform />
      <Solutions />
      <Clients />
      <WhyAtlas />
      <BlogSection latest={latest} />
      <DemoForm />
      <Footer />
    </div>
  );
}
