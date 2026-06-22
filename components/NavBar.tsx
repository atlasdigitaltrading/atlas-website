"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";

const LINKS: [string, string][] = [
  ["Map", "market-map"],
  ["Platform", "platform"],
  ["Solutions", "solutions"],
  ["Clients", "clients"],
  ["Why Atlas", "why-atlas"],
  ["Insights", "blog"],
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  function goToSection(id: string) {
    if (id === "blog" && pathname.startsWith("/blog")) {
      router.push("/blog");
      return;
    }
    if (isHome) {
      scrollToId(id);
      return;
    }
    router.push(`/#${id}`);
  }

  function goHomeOrTop() {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? "border-b border-atlas-border bg-atlas-bg/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ padding: "0 clamp(16px, 4vw, 56px)" }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1260px] items-center justify-between">
        <Logo
          onClickTop={goHomeOrTop}
          aria-label={isHome ? "Scroll to top" : "Back to home"}
        />
        <div className="hidden items-center gap-7 min-[900px]:flex">
          {LINKS.map(([label, id]) => (
            <button
              key={id}
              type="button"
              className="cursor-pointer border-none bg-transparent text-[13px] font-medium tracking-wide text-atlas-gray-dark transition-colors hover:text-atlas-accent"
              onClick={() => goToSection(id)}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="cursor-pointer rounded-md border-none bg-atlas-accent px-[22px] py-2 text-[13px] font-bold tracking-wide text-white transition-all hover:-translate-y-px hover:bg-atlas-accent-light"
            onClick={() => goToSection("demo")}
          >
            Book a Demo
          </button>
        </div>
        <button
          type="button"
          className="min-[900px]:hidden rounded-md border border-atlas-border bg-atlas-card px-3 py-2 text-sm text-atlas-offwhite"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div className="flex min-[900px]:hidden flex-col gap-2 border-t border-atlas-border bg-atlas-bg/98 px-4 py-4 backdrop-blur-xl">
          {LINKS.map(([label, id]) => (
            <button
              key={id}
              type="button"
              className="w-full py-2 text-left text-sm text-atlas-offwhite"
              onClick={() => {
                goToSection(id);
                setOpen(false);
              }}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="mt-2 w-full rounded-md bg-atlas-accent py-3 text-sm font-bold text-white"
            onClick={() => {
              goToSection("demo");
              setOpen(false);
            }}
          >
            Book a Demo
          </button>
        </div>
      ) : null}
    </nav>
  );
}
