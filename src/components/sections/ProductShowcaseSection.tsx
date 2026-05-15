import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProductShowcaseSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#111827] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Product showcase"
          title="Diseñamos experiencias que ya podés visualizar como producto"
          description="Vista conceptual de capacidades internas: captura, seguimiento y priorización de leads en un entorno controlado (no producto público SaaS en esta fase)."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#26324A] bg-[#0B1020] p-4 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#FFFBF5]">Lead Intelligence Workspace (local)</p>
              <span className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-2 py-1 text-[10px] uppercase tracking-wider text-[#C4B5FD]">Demo conceptual</span>
            </div>
            <div className="space-y-3">
              {['Lead Score: 78/100 · Prioridad alta', 'Resumen comercial local + fallback IA', 'Notas internas y timeline de acciones'].map((item) => (
                <div key={item} className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2 text-sm text-[#CBD5E1]">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#26324A] bg-[#0B1020] p-4">
            <p className="text-sm font-semibold text-[#FFFBF5]">Project Diagnosis Flow</p>
            <ul className="mt-3 space-y-2 text-sm text-[#CBD5E1]">
              <li className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2">Objetivo del negocio</li>
              <li className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2">Etapa del proyecto</li>
              <li className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2">Urgencia y próximo paso</li>
            </ul>
          </article>
        </div>

        <p className="text-xs text-[#94A3B8]">Demostración visual de capacidades internas. No representa una promesa de producto público ni un dashboard externo en producción.</p>
      </Container>
    </section>
  );
}
