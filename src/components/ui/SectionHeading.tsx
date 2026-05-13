type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-[#7C3AED]/40 bg-[#4C1D95]/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#A78BFA]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-[#CBD5E1] sm:text-base">{description}</p> : null}
    </header>
  );
}
