import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCases } from '@/data/use-cases';

export function UseCasesSection() {
  return (
    <section id="casos" className="section-violet-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[var(--orange-cta)]/8 blur-3xl" />
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Casos de uso"
          title="Casos de uso para cada tipo de proyecto digital"
          description="Desde captación comercial hasta sistemas internos y evolución tecnológica en etapas avanzadas."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.id}>
              <h3 className="text-base font-semibold text-[var(--warm-white)]">{useCase.title}</h3>
              <p className="mt-2 text-sm text-[var(--purple-soft)]">{useCase.audience}</p>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{useCase.outcome}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
