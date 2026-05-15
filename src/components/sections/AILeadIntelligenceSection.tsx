import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const points = [
  {
    title: 'Resumen comercial local',
    description: 'Reglas claras y opción de IA local con Ollama para orientar seguimiento sin enviar datos a terceros.',
  },
  {
    title: 'Lead scoring explicable',
    description: 'Priorización 0-100 con señales visibles. Ayuda a decidir, no decide automáticamente.',
  },
  {
    title: 'Contexto operativo',
    description: 'Notas internas, timeline y estado del lead para mantener continuidad comercial con trazabilidad.',
  },
  {
    title: 'Fallback seguro',
    description: 'Si la IA local no responde, el sistema mantiene un resumen por reglas locales.',
  },
];

export function AILeadIntelligenceSection() {
  return (
    <section id="ia-local" className="section-product-depth relative overflow-hidden border-b border-[#26324A] py-20 sm:py-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-[#7C3AED]/20 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-[#F97316]/8 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="AI Lead Intelligence"
            title="Inteligencia comercial local para leads"
            description="Un módulo interno para resumir, priorizar y seguir oportunidades con criterio humano y control de datos."
          />
          <div className="glass-card rounded-3xl p-5">
            <p className="text-sm leading-6 text-[#CBD5E1]">
              IA local opcional con Ollama. Sin OpenAI, sin servicios externos, sin WhatsApp automático y sin decisiones automáticas sobre leads.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <article key={point.title} className="glass-card rounded-3xl p-5">
              <div className="mb-4 h-9 w-9 rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/16 shadow-[0_0_24px_rgba(124,58,237,0.25)]" />
              <h3 className="text-base font-semibold text-[#FFFBF5]">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">{point.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
