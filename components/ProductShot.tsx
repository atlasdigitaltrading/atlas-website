import Image from "next/image";

// Framed product screenshot with the standing honesty caption. Every product
// image on the site shows the Atlas demo environment: real market data,
// simulated fills — and says so.
export function ProductShot({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-[14px] border border-atlas-border p-2 shadow-[0_16px_50px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.18)]"
        style={{ background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)" }}
      >
        <Image
          src={src}
          alt={alt}
          width={1680}
          height={966}
          unoptimized
          priority={priority}
          className="h-auto w-full rounded-lg"
        />
      </div>
      <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
        <span className="text-xs text-atlas-gray">{caption}</span>
        <span className="text-[10px] text-atlas-gray-darker">
          Shown: Atlas demo environment · live market data
        </span>
      </figcaption>
    </figure>
  );
}
