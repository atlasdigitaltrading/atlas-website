"use client";

import { useEffect } from "react";

/** After client navigations to `/#id`, scroll target into view (Next may not do this by default). */
export function HashScroll() {
  useEffect(() => {
    const run = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  return null;
}
