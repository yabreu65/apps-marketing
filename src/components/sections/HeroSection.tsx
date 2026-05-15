import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const whatsappMessage = 'Hola, quiero solicitar un diagnóstico para mi proyecto digital y definir el mejor camino de implementación.';

export function HeroSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', whatsappMessage);

  return (
    <section className="relative overflow-hidden border-b border-[#26324A] bg-[radial-gradient(circle_at_top_right,#4C1D95_0%,#0B1020_45%,#0B1020_100%)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(249,115,22,0.08)_45%,transparent_100%)]" />
      <Container className="relative z-10">
        <div className="max-w-4xl space-y-6">
          <p className="inline-flex rounded-full border border-[#A78BFA]/35 bg-[#7C3AED]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">
            AI-first studio para productos y operaciones digitales
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl md:text-6xl">
            Desarrollo web, sistemas e IA aplicada para negocios que quieren crecer con tecnología
          </h1>

          <p className="max-w-3xl text-pretty text-base text-[#CBD5E1] sm:text-lg">
            Creamos landing pages, sitios profesionales, dashboards, MVP SaaS y soluciones internas con IA para convertir ideas en productos funcionales.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Solicitar diagnóstico de mi proyecto
            </Button>
            <Button href="#soluciones" variant="secondary">
              Ver soluciones
            </Button>
          </div>

          <p className="text-xs text-[#94A3B8]">Primero entendemos tu negocio y tu etapa. Después definimos si conviene landing, sitio web, sistema interno o producto SaaS.</p>
        </div>
      </Container>
    </section>
  );
}
