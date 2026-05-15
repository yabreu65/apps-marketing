import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const pillars = [
  { title: 'Desarrollo Web & SaaS', description: 'Landing, sitio profesional o MVP con foco en validación, conversión y evolución técnica.' },
  { title: 'Sistemas internos', description: 'Herramientas a medida para ordenar procesos, seguimiento comercial y operación.' },
  { title: 'Dashboards', description: 'Paneles claros para leer oportunidades, estado de leads y señales accionables.' },
  { title: 'IA local/controlada', description: 'Inteligencia comercial opcional con Ollama local y soporte a decisión humana.' },
];

export function WhyUsSection() {
  return (
    <section className="section-cosmic relative overflow-hidden border-b border-[#26324A] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-16 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[#7C3AED]/18 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-[#F97316]/8 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Why us"
            title="Por qué trabajar con Yoryi AI Studio"
            description="Un enfoque de estudio AI/tech: estrategia, producto, desarrollo y operación trabajando juntos desde el primer diagnóstico."
          />
          <p className="max-w-xl text-sm leading-6 text-[#A8B6CC] lg:justify-self-end">
            No vendemos una pantalla suelta: diseñamos el camino digital que tiene más sentido para tu etapa, tu operación y tu objetivo comercial.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="glass-card group rounded-3xl p-5 transition hover:-translate-y-1 hover:border-[#A78BFA]/40">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7C3AED]/45 bg-[#7C3AED]/15 text-xs font-semibold text-[#C4B5FD] shadow-[0_0_26px_rgba(124,58,237,0.24)]">0{index + 1}</span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#FFFBF5]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">{pillar.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
