import Image from "next/image";

// Diagrams from the platform overview are light-background artwork. Rather
// than recolouring them, they sit on a deliberate light panel, framed like a
// spec sheet set into the dark page.
export function DiagramPanel({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-[14px] border border-atlas-border bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.4)] sm:p-6">
        {/* Below ~820px the artwork's own labels stop being legible if it is
            scaled to fit, so it keeps a readable minimum and the panel scrolls. */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          className="h-auto w-full min-w-[760px]"
        />
      </div>
      <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
        <span className="text-xs text-atlas-gray">{caption}</span>
        <span className="text-[10px] text-atlas-gray-darker sm:hidden">
          Scroll the panel to see the full diagram
        </span>
      </figcaption>
    </figure>
  );
}
