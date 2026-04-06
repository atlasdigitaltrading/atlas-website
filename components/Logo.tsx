"use client";

type LogoProps = {
  size?: number;
  onClickTop?: () => void;
  /** @default "Scroll to top" */
  "aria-label"?: string;
};

export function Logo({
  size = 24,
  onClickTop,
  "aria-label": ariaLabel = "Scroll to top",
}: LogoProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 border-none bg-transparent p-0"
      onClick={() =>
        onClickTop ? onClickTop() : window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label={ariaLabel}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <polygon
          points="20,2 38,34 2,34"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <polygon
          points="20,12 30,30 10,30"
          fill="#3b82f6"
          fillOpacity="0.2"
        />
        <line
          x1="20"
          y1="2"
          x2="20"
          y2="30"
          stroke="#3b82f6"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <line
          x1="10"
          y1="30"
          x2="30"
          y2="30"
          stroke="#3b82f6"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
      <span
        className="font-display font-bold uppercase tracking-[0.12em] text-atlas-white"
        style={{ fontSize: size * 0.68 }}
      >
        Atlas
      </span>
    </button>
  );
}
