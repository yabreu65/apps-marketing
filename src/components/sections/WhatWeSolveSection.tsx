import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const whatsappMessage =
  'Hola, quiero solicitar un diagnóstico para mi proyecto y definir el mejor próximo paso.';

const valueItems = [
  'Más consultas',
  'Mejor seguimiento',
  'Web que convierte',
  'IA comercial',
  'Landing + WhatsApp',
  'Dashboard para tu negocio',
];

export function WhatWeSolveSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', whatsappMessage);
  const marqueeText = valueItems.join(' ✦ ');

  return (
    <section className="hero-cosmic-bg relative overflow-hidden border-b border-[var(--border-subtle)] pb-10">
      <Container className="relative z-10 max-w-[1440px]">
        <article className="glass-card mx-auto w-[90%] max-w-[1200px] rounded-3xl p-4 text-center sm:py-6">
          <h2 className="text-lg font-semibold text-[var(--warm-white)]">¿Qué resolvemos?</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/55">
            <div className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-bright)] md:hidden">
              Más consultas • Mejor seguimiento • Web que convierte
            </div>
            <div className="hidden px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-bright)] md:block lg:hidden">
              Más consultas • Mejor seguimiento • Web que convierte • IA comercial
            </div>
            <div className="marquee-track hidden w-max items-center py-3 lg:flex">
              <p className="whitespace-nowrap px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-bright)] sm:px-8 sm:text-sm">
                {marqueeText}
              </p>
              <p
                aria-hidden="true"
                className="whitespace-nowrap px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-bright)] sm:px-8 sm:text-sm"
              >
                {marqueeText}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="w-full rounded-xl px-4 py-2 text-xs sm:w-auto"
            >
              Continuar por WhatsApp
            </Button>
          </div>
        </article>
      </Container>
    </section>
  );
}
