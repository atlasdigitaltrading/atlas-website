type Props = { children: React.ReactNode; center?: boolean };

export function SectionHeading({ children, center }: Props) {
  return (
    <h2
      className={`font-display m-0 text-[clamp(28px,3.5vw,48px)] font-extrabold leading-tight tracking-tight text-atlas-white ${
        center ? "text-center" : "text-left"
      }`}
    >
      {children}
    </h2>
  );
}
