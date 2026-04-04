import { BlogSection } from "@/components/BlogSection";
import { Clients } from "@/components/Clients";
import { DemoForm } from "@/components/DemoForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { Platform } from "@/components/Platform";
import { Solutions } from "@/components/Solutions";
import { WhyAtlas } from "@/components/WhyAtlas";
import { getLatestPosts } from "@/lib/posts";

export default async function Home() {
  const latest = await getLatestPosts(3);

  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
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
