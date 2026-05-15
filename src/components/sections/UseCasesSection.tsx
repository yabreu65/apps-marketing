import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCases } from '@/data/use-cases';

export function UseCasesSection() {
  return (
    <section id="casos" className="section-violet-depth relative overflow-hidden border-b border-[#26324A] py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[#F97316]/8 blur-3xl" />
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Casos de uso"
          title="Casos de uso para cada tipo de proyecto digital"
          description="Desde captación comercial hasta sistemas internos y evolución tecnológica en etapas avanzadas."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.id}>
              <h3 className="text-base font-semibold text-[#FFFBF5]">{useCase.title}</h3>
              <p className="mt-2 text-sm text-[#A78BFA]">{useCase.audience}</p>
              <p className="mt-3 text-sm text-[#CBD5E1]">{useCase.outcome}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
