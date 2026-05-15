import { Container } from '@/components/ui/Container';

const segments = [
  'Soluciones para negocios digitales',
  'Equipos de servicios profesionales',
  'Operaciones internas en crecimiento',
  'Proyectos SaaS y producto digital',
];

export function CredibilityStripSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0E1528] py-6">
      <Container>
        <p className="mb-3 text-center text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Construimos para equipos que quieren escalar con foco comercial</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((item) => (
            <div key={item} className="rounded-lg border border-[#26324A] bg-[#111827] px-3 py-2 text-center text-xs font-medium text-[#CBD5E1]">
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
