import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { benefits } from '@/data/benefits';

export function BenefitsSection() {
  return (
    <section id="beneficios" className="border-b border-[#26324A] bg-[#111827] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Beneficios"
          title="Resultados esperados en esta fase"
          description="Sin promesas irreales: foco en claridad, contacto y señales tempranas de conversión para decidir próximos pasos."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.id}>
              <h3 className="text-base font-semibold text-[#FFFBF5]">{benefit.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
