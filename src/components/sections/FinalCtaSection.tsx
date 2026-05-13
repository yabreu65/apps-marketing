import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const finalMessage =
  'Hola, quiero solicitar un diagnóstico para mi proyecto digital. ¿Podemos hablar?';

export function FinalCtaSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', finalMessage);

  return (
    <section id="contacto" className="border-b border-[#26324A] bg-gradient-to-br from-[#4C1D95] via-[#2E1065] to-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">CTA final</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#FFFBF5] sm:text-4xl">¿Tenés una idea, servicio o proceso que querés llevar a la web?</h2>
        <p className="mx-auto max-w-2xl text-sm text-[#E2E8F0] sm:text-base">
          Podemos ayudarte a definir el camino correcto: landing, sitio web, sistema interno, SaaS o automatización según la etapa de tu negocio.
        </p>
        <p className="mx-auto max-w-2xl text-sm text-[#CBD5E1]">Contanos tu proyecto y te orientamos el primer paso.</p>
        <div className="pt-2">
          <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
            Solicitar diagnóstico de mi proyecto
          </Button>
        </div>
      </Container>
    </section>
  );
}
