import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { benefits } from '@/data/benefits';

export function BenefitsSection() {
  return (
    <section id="beneficios" className="section-aurora-grid relative overflow-hidden border-b border-[#26324A] py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#7C3AED]/16 blur-3xl" />
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Beneficios"
          title="Beneficios concretos para vender mejor y crecer con orden"
          description="Sin promesas irreales: foco en claridad comercial, captación y base tecnológica para evolucionar por etapas."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
