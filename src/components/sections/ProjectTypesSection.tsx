import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projectTypes } from '@/data/project-types';

const STATUS_STYLES = {
  'Disponible ahora': 'bg-[#F97316]/15 text-[#FDBA74]',
  'Proyecto a medida': 'bg-[#7C3AED]/20 text-[#C4B5FD]',
  'Fase avanzada': 'bg-[#1E293B] text-[#A8B6CC]',
} as const;

export function ProjectTypesSection() {
  return (
    <section id="tipos-de-proyecto" className="section-cosmic relative overflow-hidden border-b border-[#26324A] py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[#7C3AED]/18 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[#F97316]/8 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Tipos de proyecto"
          title="Tipos de proyectos que podemos construir"
          description="Estos son ejemplos de soluciones que diseñamos según la etapa, necesidad y objetivo de cada negocio."
        />
        <p className="glass-card rounded-2xl p-4 text-xs text-[#A8B6CC]">
          <span className="font-semibold text-[#FDBA74]">Disponible ahora:</span> iniciativas que podés empezar hoy.{' '}
          <span className="font-semibold text-[#C4B5FD]">Proyecto a medida / Fase avanzada:</span> soluciones evolutivas según roadmap.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectTypes.map((project) => (
            <Card key={project.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">{project.category}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[project.statusLabel]}`}>
                  {project.statusLabel}
                </span>
              </div>

              <h3 className="mt-2 text-base font-semibold text-[#FFFBF5]">{project.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{project.description}</p>
              <p className="mt-3 text-xs text-[#A8B6CC]">
                <span className="font-semibold text-[#CBD5E1]">Ideal para:</span> {project.idealFor}
              </p>
              <p className="mt-2 text-xs text-[#A8B6CC]">
                <span className="font-semibold text-[#CBD5E1]">Resultado esperado:</span> {project.outcome}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
