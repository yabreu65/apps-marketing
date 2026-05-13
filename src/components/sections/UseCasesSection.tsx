import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCases } from '@/data/use-cases';

export function UseCasesSection() {
  return (
    <section id="casos" className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Casos de uso"
          title="Pensado para negocios que venden por conversación"
          description="Enfocado en perfiles que necesitan más claridad comercial y un flujo simple para convertir interés en contacto."
        />

        <div className="grid gap-4 md:grid-cols-3">
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
