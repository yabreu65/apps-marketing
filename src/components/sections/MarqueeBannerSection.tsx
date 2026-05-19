import { Container } from '@/components/ui/Container';

const marqueeItems = [
  'A CONSEGUIR MÁS CONSULTAS',
  'A NO PERDER MENSAJES',
  'A TENER UNA WEB QUE CONVIERTE',
  'A RESPONDER MEJOR CON CHAT INTELIGENTE',
  'A ORDENAR EL SEGUIMIENTO',
  'A CONECTAR LANDING + WHATSAPP',
  'A VER TU NEGOCIO EN UN DASHBOARD',
];

export function MarqueeBannerSection() {
  const renderMarqueeGroup = (ariaHidden = false) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 px-6 sm:gap-24 sm:px-8"
    >
      {marqueeItems.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-1 text-xl font-semibold uppercase tracking-[0.04em] text-[var(--text-bright)] sm:text-2xl"
        >
          <span className="text-[var(--purple-soft)]">✦</span>
          <span>{item}</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden py-24">
      <p className="relative top-[-50px] text-xl sm:text-2xl text-center font-semibold uppercase tracking-[0.32em] text-[var(--purple-soft)]">
        En qué te ayudamos
      </p>
      <div
        className="spiderweb-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <Container>
        <div className="relative z-10 overflow-hidden rounded-2xl bg-[var(--bg-shell-2)]/75 shadow-[0_16px_50px_rgba(2,6,23,0.45)]">
          <div className="marquee-track flex w-max items-center py-3 sm:py-4">
            {renderMarqueeGroup()}
            {renderMarqueeGroup(true)}
          </div>
        </div>
      </Container>
    </section>
  );
}
