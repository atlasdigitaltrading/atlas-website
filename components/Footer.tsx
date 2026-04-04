import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      className="border-t border-atlas-border px-[clamp(16px,4vw,56px)] pb-7 pt-10"
      style={{ background: "#050507" }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5">
        <div>
          <Logo size={20} />
          <p className="mt-2.5 text-xs text-atlas-gray-darker">
            Atlas Digital Markets LLC · Jersey City, NJ
          </p>
        </div>
        <div className="flex gap-7">
          <a
            href="https://www.linkedin.com/in/kiran-pingali/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-atlas-gray-darker no-underline transition-colors hover:text-atlas-accent"
          >
            LinkedIn
          </a>
          <a
            href="mailto:kiran@atlasdigitaltrading.com"
            className="text-xs text-atlas-gray-darker no-underline transition-colors hover:text-atlas-accent"
          >
            Contact
          </a>
        </div>
        <div className="text-[11px] text-atlas-gray-darker">
          © 2026 Atlas Digital Markets LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
