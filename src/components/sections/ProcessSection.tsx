import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/data/process';

export function ProcessSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo trabajamos tu proyecto digital"
          description="Un proceso simple para entender tu negocio, definir la solución correcta y construir una base web lista para evolucionar."
        />

        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Proceso de trabajo">
          {processSteps.map((step) => (
            <li key={step.step} className="rounded-2xl border border-[#26324A] bg-[#151B2E] p-5 shadow-[0_10px_30px_rgba(11,16,32,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">Paso {step.step}</p>
              <h3 className="mt-2 text-base font-semibold text-[#FFFBF5]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
