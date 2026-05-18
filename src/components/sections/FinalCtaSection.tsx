import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const finalMessage =
  'Hola, quiero solicitar un diagnóstico para mi proyecto digital. ¿Podemos hablar?';

export function FinalCtaSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', finalMessage);

  return (
    <section id="contacto" className="final-cta-orb-bg relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-18">
      <div className="pointer-events-none absolute -right-32 -bottom-24 h-[33rem] w-[33rem] bg-[url('/visual/planet-orb.svg')] bg-contain bg-no-repeat opacity-95" />
      <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <Container className="relative z-10">
        <div className="glass-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/visual/arc-flow.svg')] bg-cover bg-center opacity-70" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-accent)]">Próximo paso</p>
              <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[var(--warm-white)] sm:text-4xl">
                ¿Querés una recomendación concreta para tu negocio?
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-[var(--text-bright)] sm:text-base">
                Te orientamos el primer paso según tu etapa: web, sistema, marketing o IA aplicada.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="#contact-form" variant="primary" className="rounded-xl px-5 py-3">
                Solicitar diagnóstico
              </Button>
              <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" className="rounded-xl px-5 py-3">
                Continuar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
