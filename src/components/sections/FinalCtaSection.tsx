import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const finalMessage =
  'Hola, quiero solicitar un diagnóstico para mi proyecto digital. ¿Podemos hablar?';

export function FinalCtaSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', finalMessage);

  return (
    <section id="contacto" className="final-cta-orb-bg relative overflow-hidden border-b border-[#26324A] py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-32 -bottom-24 h-[33rem] w-[33rem] bg-[url('/visual/planet-orb.svg')] bg-contain bg-no-repeat opacity-95" />
      <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <Container className="relative z-10">
        <div className="glass-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/visual/arc-flow.svg')] bg-cover bg-center opacity-70" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">Próximo paso</p>
              <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[#FFFBF5] sm:text-5xl">
                ¿Listo para construir una solución digital con dirección real?
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-[#E2E8F0] sm:text-base">
                Contanos tu contexto y te orientamos el primer paso: landing, sitio web, sistema interno, SaaS o evolución con IA local según la etapa de tu negocio.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['IA local opcional', 'Sin envío a terceros', 'Decisión humana'].map((item) => (
                  <span key={item} className="rounded-full border border-[#26324A] bg-[#0B1020]/70 px-3 py-1 text-[11px] text-[#A8B6CC]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="#contact-form" variant="primary" className="rounded-xl px-5 py-3">
                Solicitar diagnóstico ↗
              </Button>
              <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" className="rounded-xl px-5 py-3">
                Hablemos por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
