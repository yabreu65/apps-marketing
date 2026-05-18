import { Container } from '@/components/ui/Container';

const segments = [
  'Webs comerciales',
  'Sistemas a medida',
  'Paneles de seguimiento',
  'Marketing y SEO',
  'Asistente comercial con IA',
  'Diagnóstico para decidir mejor',
];

export function CredibilityStripSection() {
  return (
    <section className="tech-strip-glow relative overflow-hidden border-b border-[var(--border-subtle)] py-6 sm:py-8">
      <Container>
        <div className="glass-card rounded-[1.65rem] border border-[var(--purple-soft)]/20 px-4 py-4 sm:px-5">
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Soluciones para negocio real
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {segments.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-ink)]/75 px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-soft)] shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
