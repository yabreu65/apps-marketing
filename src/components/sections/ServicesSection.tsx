import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

type ServicePillar = {
  title: string;
  description: string;
  chips: string[];
  status: 'Disponible hoy' | 'Escalable por etapas' | 'Activación guiada';
  marker: string;
};

const servicePillars: ServicePillar[] = [
  {
    title: 'Presencia comercial que convierte',
    description:
      'Diseñamos la base digital para explicar tu propuesta con claridad, generar confianza y facilitar el primer contacto.',
    chips: ['Landing pages', 'Websites profesionales'],
    status: 'Disponible hoy',
    marker: '01',
  },
  {
    title: 'Operación interna con visibilidad',
    description:
      'Construimos herramientas para ordenar procesos, visualizar datos clave y tomar decisiones con menos fricción.',
    chips: ['Sistemas internos y dashboards'],
    status: 'Escalable por etapas',
    marker: '02',
  },
  {
    title: 'Automatización con criterio',
    description:
      'Detectamos cuellos de botella y automatizamos lo repetitivo sin perder control humano sobre el seguimiento comercial.',
    chips: ['Automatización'],
    status: 'Escalable por etapas',
    marker: '03',
  },
  {
    title: 'Productos y evolución digital',
    description:
      'Acompañamos validaciones de producto con MVP SaaS y asistentes con IA cuando el negocio ya tiene una base clara para escalar.',
    chips: ['Asistentes y chatbots con IA', 'MVP SaaS'],
    status: 'Activación guiada',
    marker: '04',
  },
];

export function ServicesSection() {
  return (
    <section
      id="soluciones"
      className="section-product-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20"
    >
      <Container className="relative z-10 space-y-10 sm:space-y-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--purple-soft)] sm:text-sm">
            Servicios principales
          </p>
          <SectionHeading
            title="Servicios claros para cada etapa del negocio"
            description="Desde landing pages hasta sistemas internos, automatización, asistentes con IA y MVP SaaS: priorizamos lo que más impacto genera hoy."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {servicePillars.map((pillar, index) => (
            <MotionReveal
              key={pillar.title}
              className={`hover-lift group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--card-bg)_80%,#ffffff_6%)] p-6 shadow-[0_18px_56px_rgba(2,6,23,0.35)] sm:p-7 ${
                index === 1 ? 'motion-delay-100' : index === 2 ? 'motion-delay-200' : index === 3 ? 'motion-delay-300' : ''
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--purple-primary)]/10 blur-2xl transition group-hover:bg-[var(--cyan-accent)]/12" />
              <div className="relative flex items-start justify-between gap-4">
                <p className="inline-flex rounded-full border border-[var(--purple-soft)]/40 bg-[var(--purple-primary)]/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--purple-soft)]">
                  {pillar.status}
                </p>
                <span className="text-4xl font-semibold leading-none text-[var(--text-bright)]/10 sm:text-5xl">
                  {pillar.marker}
                </span>
              </div>

              <h3 className="relative mt-4 text-xl font-semibold leading-tight text-[var(--text-bright)] sm:text-2xl">
                {pillar.title}
              </h3>

              <p className="relative mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {pillar.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {pillar.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-1.5 text-xs font-medium text-[var(--text-soft)] sm:text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </MotionReveal>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-shell-2)]/65 px-6 py-6 text-center sm:px-8">
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            Si no tienes claro por dónde empezar, hacemos un diagnóstico breve y te recomendamos el siguiente paso con criterio comercial.
          </p>
          <Button href="#diagnostico" className="rounded-full px-6 py-3 text-sm sm:text-base">
            Ver mi siguiente paso
          </Button>
        </div>
      </Container>
    </section>
  );
}
