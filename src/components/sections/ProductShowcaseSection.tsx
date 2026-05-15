import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProductShowcaseSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#111827] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Product showcase"
          title="Visualizá cómo se ve una operación comercial bien instrumentada"
          description="Vista conceptual de capacidades internas: captura, seguimiento y priorización de leads en un entorno controlado (no producto público SaaS en esta fase)."
        />

        <article className="rounded-3xl border border-[#26324A] bg-[#0B1020] p-5 shadow-[0_22px_60px_rgba(2,6,23,0.6)] sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#FFFBF5]">Lead Intelligence Workspace (local)</p>
            <span className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-2 py-1 text-[10px] uppercase tracking-wider text-[#C4B5FD]">Demo conceptual</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#E2E8F0]">Lead Score: 78/100 · Prioridad alta · Señales: urgencia, contexto y canal de contacto</div>
              <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Resumen comercial local + IA opcional con fallback seguro por reglas</div>
              <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Siguiente acción recomendada: contacto de calificación y propuesta inicial</div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Timeline de status</div>
              <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Notas internas de seguimiento</div>
              <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Diagnóstico orientativo del proyecto</div>
            </div>
          </div>
        </article>

        <p className="text-xs text-[#94A3B8]">Demostración visual de capacidades internas. No representa una promesa de producto público ni un dashboard externo en producción.</p>
      </Container>
    </section>
  );
}
