import { Container } from '@/components/ui/Container';

const segments = ['Soluciones para negocios digitales', 'Equipos de servicios profesionales', 'Operaciones internas en crecimiento', 'Proyectos SaaS y producto digital'];

export function CredibilityStripSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0E1528] py-8">
      <Container>
        <p className="mb-4 text-center text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Partner tecnológico para crecimiento comercial y operativo</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((item) => (
            <div key={item} className="rounded-xl border border-[#26324A] bg-[#111827] px-4 py-3 text-center text-xs font-medium text-[#CBD5E1]">
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
