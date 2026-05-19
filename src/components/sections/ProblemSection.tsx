import { Container } from '@/components/ui/Container';

const problems = [
  {
    title: 'Captación dispersa',
    description:
      'Las consultas llegan por Instagram, WhatsApp o marketplaces, pero no siempre entran en un recorrido claro.',
  },
  {
    title: 'Seguimiento manual',
    description:
      'Responder, recordar interesados y retomar conversaciones depende demasiado de memoria, notas o procesos improvisados.',
  },
  {
    title: 'Poca visibilidad comercial',
    description:
      'Cuesta saber qué consultas tienen más valor, qué oportunidades priorizar y dónde se están frenando las ventas.',
  },
];

export function ProblemSection() {
  return (
    <section className="section-aurora-grid relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-24">
      <p className="relative top-[-30px] mb-4 text-xl text-center sm:text-2xl font-semibold uppercase tracking-[0.32em] text-[var(--purple-soft)]">
        El problema real
      </p>
      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Muchos negocios no fallan por falta de trabajo,
            <span className="block bg-gradient-to-r from-[var(--purple-soft)] via-[var(--purple-primary)] to-[var(--cyan-accent)] bg-clip-text text-transparent">
              fallan por falta de sistema.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            Cuando la captación, la atención y el seguimiento no están conectados,
            se pierden oportunidades aunque haya interés real.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <article
              key={problem.title}
              className="group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--purple-soft)]/50 hover:shadow-[0_18px_70px_rgba(124,58,237,0.16)] sm:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-soft)] to-[var(--cyan-accent)] opacity-80" />

              <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-shell)] text-sm font-semibold text-[var(--text-bright)]">
                0{index + 1}
              </div>

              <h3 className="text-xl font-semibold text-[var(--text-bright)]">
                {problem.title}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[var(--purple-soft)] shadow-[0_0_18px_rgba(167,139,250,0.95)]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[var(--purple-primary)] shadow-[0_0_18px_rgba(124,58,237,0.9)]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[var(--text-accent)] shadow-[0_0_18px_rgba(147,197,253,0.9)]" />
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
