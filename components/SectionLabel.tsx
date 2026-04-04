type Props = { children: React.ReactNode };

export function SectionLabel({ children }: Props) {
  return (
    <div className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-atlas-accent">
      {children}
    </div>
  );
}
