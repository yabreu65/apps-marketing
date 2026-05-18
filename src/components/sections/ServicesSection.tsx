import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const serviceGroups = [
  {
    title: 'Presencia digital y captación',
    items: ['Landing y webs comerciales', 'Web catálogo conectada a WhatsApp'],
  },
  {
    title: 'Sistemas y operación',
    items: ['Sistemas web a medida', 'Seguimiento simple de consultas y tareas'],
  },
  {
    title: 'Marketing / SEO',
    items: ['SEO inicial para posicionarte', 'Contenido para atraer consultas de calidad'],
  },
  {
    title: 'Automatización e IA aplicada',
    items: ['Asistente comercial con IA', 'Automatización por fases con control humano'],
  },
];

export function ServicesSection() {
  return (
    <section id="soluciones" className="section-product-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16">
      <Container className="relative z-10 space-y-7">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones para captar, ordenar y crecer"
          description="Elegimos el camino según tu etapa y tu objetivo comercial."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <article key={group.title} className="glass-card rounded-3xl p-5">
              <h3 className="text-base font-semibold text-[var(--warm-white)]">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-2 text-sm text-[var(--text-secondary)]">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="text-sm text-[var(--text-soft)]">
          Si querés, te orientamos el próximo paso con un diagnóstico breve.
        </p>
      </Container>
    </section>
  );
}
