import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const finalMessage =
  'Hola, quiero una landing comercial para mejorar la captación de clientes de mi negocio. ¿Podemos hablar?';

export function FinalCtaSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', finalMessage);

  return (
    <section id="contacto" className="border-b border-[#26324A] bg-gradient-to-br from-[#4C1D95] via-[#2E1065] to-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">CTA final</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#FFFBF5] sm:text-4xl">¿Querés una landing que trabaje para tu negocio desde el día uno?</h2>
        <p className="mx-auto max-w-2xl text-sm text-[#E2E8F0] sm:text-base">
          Arrancamos con una base comercial clara, medible y profesional. Luego, sobre resultados reales, podemos evolucionar a automatización e IA.
        </p>
        <div className="pt-2">
          <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
            Quiero mi diagnóstico comercial
          </Button>
        </div>
      </Container>
    </section>
  );
}
