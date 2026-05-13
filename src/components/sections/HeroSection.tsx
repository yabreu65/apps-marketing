import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const whatsappMessage =
  'Hola, vengo desde la landing de Apps Marketing / Yoryi AI Studio. Quiero mejorar la captación de clientes de mi negocio.';

export function HeroSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', whatsappMessage);

  return (
    <section className="relative overflow-hidden border-b border-[#26324A] bg-[radial-gradient(circle_at_top_right,#4C1D95_0%,#0B1020_45%,#0B1020_100%)] py-20 sm:py-28">
      <Container className="relative z-10">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex rounded-full border border-[#A78BFA]/35 bg-[#7C3AED]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">
            Desarrollo web profesional para crecer con tecnología
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl md:text-6xl">
            Desarrollo web, marketing e IA para llevar tu negocio al siguiente nivel
          </h1>

          <p className="max-w-2xl text-pretty text-base text-[#CBD5E1] sm:text-lg">
            Creamos desde landing pages comerciales hasta sistemas web, dashboards y productos SaaS a medida para negocios que quieren vender mejor, automatizar procesos y crecer con tecnología.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Solicitar diagnóstico de mi proyecto
            </Button>
            <Button href="#servicios" variant="secondary">
              Ver servicios
            </Button>
          </div>

          <p className="text-xs text-[#94A3B8]">Primero entendemos tu negocio. Después definimos si necesitás landing, web, sistema interno o SaaS.</p>
        </div>
      </Container>
    </section>
  );
}
