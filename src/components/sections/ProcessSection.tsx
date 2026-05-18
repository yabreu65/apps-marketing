import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  { step: '01', title: 'Descubrimos', description: 'Entendemos tu negocio, objetivos y restricciones reales.' },
  { step: '02', title: 'Diseñamos', description: 'Definimos arquitectura, experiencia y camino de implementación.' },
  { step: '03', title: 'Construimos', description: 'Desarrollamos MVP, sistema o web con foco en valor concreto.' },
  { step: '04', title: 'Optimizamos', description: 'Mejoramos con señales, feedback y evolución responsable.' },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="section-aurora-grid relative overflow-hidden border-b border-[var(--border-subtle)] py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--purple-primary)]/16 blur-3xl" />
      <Container className="relative z-10 space-y-12">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <SectionHeading
            eyebrow="Nuestro proceso"
            title="Un camino claro para construir sin improvisar"
            description="Menos ruido, más dirección: entendemos, diseñamos, construimos y optimizamos según evidencia real."
          />
          <div className="hidden h-px bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-soft)]/50 to-transparent lg:block" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ol className="relative grid gap-4 md:grid-cols-2" aria-label="Proceso de trabajo">
            {steps.map((step) => (
              <li key={step.step} className="glass-card relative rounded-3xl p-6">
                <p className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--purple-soft)]/35 bg-[var(--purple-primary)]/16 text-lg font-semibold tracking-tight text-[var(--text-accent)] shadow-[0_0_30px_rgba(124,58,237,0.28)]">
                  {step.step}
                </p>
                <h3 className="mt-7 text-lg font-semibold text-[var(--warm-white)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{step.description}</p>
              </li>
            ))}
          </ol>

          <aside className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--purple-primary)]/26 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-accent)]">Bloque destacado</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-[var(--warm-white)]">Caso conceptual de operación comercial asistida</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Combinamos web, proceso y lectura de señales para priorizar oportunidades con criterio humano.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ['Pipeline claro', 'flujo visual'],
                ['Priorización', 'score local'],
                ['Seguimiento', 'notas + timeline'],
              ].map(([title, value]) => (
                <div key={title} className="mock-panel rounded-xl p-3">
                  <p className="text-[11px] text-[var(--text-soft)]">{title}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--warm-white)]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mock-panel mt-5 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--purple-soft)]">Vista conceptual</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
                <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-1.5">Priorización local</span>
                <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-1.5">Resumen IA opcional</span>
                <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-1.5">Sin decisiones automáticas</span>
                <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-1.5">Sin envío a terceros</span>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
