import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const products = [
  {
    name: 'BuildingOS',
    description: 'Base operativa para digitalizar procesos, centralizar tareas y construir sistemas internos escalables.',
    href: '#',
  },
  {
    name: 'CocinaCore',
    description: 'Producto orientado a operaciones gastronómicas con foco en orden, seguimiento y visibilidad del negocio.',
    href: '#',
  },
  {
    name: 'PawTech Studio',
    description: 'Estudio que conecta páginas web, sistemas, automatización e IA aplicada según la etapa real de cada negocio.',
    href: '#',
  },
] as const;

export function AuthorityProductsSection() {
  return (
    <section id="autoridad" className="section-violet-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20">
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Autoridad"
          title="Productos que respaldan cómo construimos"
          description="Mostramos referencias concretas para que la conversación empiece desde experiencia real y no desde promesas genéricas."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product.name} className="flex h-full flex-col justify-between rounded-3xl p-6">
              <div>
                <p className="text-lg font-semibold text-[var(--warm-white)]">{product.name}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{product.description}</p>
              </div>
              <a href={product.href} className="mt-5 inline-flex text-sm font-semibold text-[var(--purple-soft)] transition hover:text-[var(--text-accent)]">
                Ver referencia
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
