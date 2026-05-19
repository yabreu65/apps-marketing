import { Container } from '@/components/ui/Container';

export function DiagnosisCtaSection() {
  return (
    <section className="section-cta-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-18">
      <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <Container className="relative z-10">
        <div className="glass-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/visual/arc-flow.svg')] bg-cover bg-center opacity-70" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-accent)]">
                Próximo paso
              </p>
              <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[var(--warm-white)] sm:text-4xl">
                ¿Querés una recomendación concreta para tu negocio?
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-[var(--text-bright)] sm:text-base">
                Te orientamos el primer paso según tu etapa: web, sistema, marketing o IA aplicada.
              </p>
            </div>
            <div>
              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center rounded-full bg-[var(--orange-cta)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(79,70,229,0.3)] transition hover:bg-[var(--orange-hover)]"
              >
                Solicitar diagnóstico
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
