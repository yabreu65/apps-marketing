import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';

const problems = [
  {
    title: 'Captación dispersa',
    description:
      'Las consultas llegan por Instagram, WhatsApp o marketplaces, pero no siempre entran en un recorrido claro.',
    motion: 'up',
  },
  {
    title: 'Seguimiento manual',
    description:
      'Responder, recordar interesados y retomar conversaciones depende demasiado de memoria, notas o procesos improvisados.',
    motion: 'down',
  },
  {
    title: 'Poca visibilidad comercial',
    description:
      'Cuesta saber qué consultas tienen más valor, qué oportunidades priorizar y dónde se están frenando las ventas.',
    motion: 'up',
  },
  {
    title: 'Procesos desconectados',
    description:
      'La captación, el seguimiento y la operación no siempre están conectados, y eso hace que se pierdan oportunidades reales.',
    motion: 'down',
  },
];

const cardStyles = [
  {
    bg: 'bg-[linear-gradient(180deg,rgba(168,85,247,0.34)_0%,rgba(88,28,135,0.18)_48%,rgba(8,13,31,0.96)_100%)]',
    accent: 'bg-fuchsia-300',
    glow: 'bg-fuchsia-400/20',
  },
  {
    bg: 'bg-[linear-gradient(180deg,rgba(45,212,191,0.26)_0%,rgba(14,116,144,0.16)_48%,rgba(8,13,31,0.96)_100%)]',
    accent: 'bg-cyan-300',
    glow: 'bg-cyan-400/20',
  },
  {
    bg: 'bg-[linear-gradient(180deg,rgba(251,191,36,0.24)_0%,rgba(180,83,9,0.13)_48%,rgba(8,13,31,0.96)_100%)]',
    accent: 'bg-amber-200',
    glow: 'bg-amber-300/20',
  },
  {
    bg: 'bg-[linear-gradient(180deg,rgba(99,102,241,0.32)_0%,rgba(79,70,229,0.18)_48%,rgba(8,13,31,0.96)_100%)]',
    accent: 'bg-violet-300',
    glow: 'bg-violet-400/20',
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

        <MotionReveal className="mt-12 grid gap-4 lg:grid-cols-4">
          {problems.map((problem, index) => {
            const style = cardStyles[index % cardStyles.length];

            return (
              <article
                key={problem.title}
                className={`motion-fade-up hover-lift group relative flex flex-col items-center justify-center overflow-hidden rounded-b-3xl rounded-t-[4.8rem] border border-white/10 ${style.bg} p-5 pt-8 text-center hover:border-[var(--purple-soft)]/50 hover:shadow-[0_18px_70px_rgba(124,58,237,0.16)] sm:p-6 sm:pt-10 lg:min-h-[26rem] ${problem.motion === 'up'
                    ? 'lg:problem-card-float-up'
                    : 'lg:problem-card-float-down'
                  }`}
              >
                <div className={`absolute inset-x-0 top-0 h-24 ${style.glow} blur-2xl`} />

                <div className="relative z-10">
                  <div className="mx-auto mb-5 flex items-center justify-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${style.accent}`} />
                    <span className={`h-2.5 w-2.5 rounded-full ${style.accent} opacity-70`} />
                    <span className={`h-2.5 w-2.5 rounded-full ${style.accent} opacity-45`} />
                  </div>

                  <h3 className="text-xl font-semibold uppercase text-[var(--text-bright)]">
                    {problem.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-xl">
                    {problem.description}
                  </p>
                </div>
              </article>
            );
          })}
        </MotionReveal>
      </Container>
    </section>
  );
}
