import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCases } from '@/data/use-cases';

export function UseCasesSection() {
  return (
    <section id="casos" className="section-violet-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[var(--orange-cta)]/8 blur-3xl" />
      <Container className="relative z-10 space-y-6">
        <SectionHeading
          eyebrow="Casos de uso"
          title="Ejemplos de caminos según objetivo comercial"
          description="Una guía rápida para ver cómo se traducen los pilares en soluciones concretas."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.id} className="p-4 sm:p-5">
              <h3 className="text-sm font-semibold leading-6 text-[var(--warm-white)] sm:text-base">{useCase.title}</h3>
              <p className="mt-1 text-xs text-[var(--purple-soft)] sm:text-sm">{useCase.audience}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{useCase.outcome}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
