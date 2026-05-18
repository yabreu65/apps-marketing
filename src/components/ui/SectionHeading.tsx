type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-[var(--purple-primary)]/40 bg-[var(--purple-deep)]/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--purple-soft)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-[var(--text-secondary)] sm:text-base">{description}</p> : null}
    </header>
  );
}
