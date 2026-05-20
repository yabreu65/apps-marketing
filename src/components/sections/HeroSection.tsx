import { Container } from '@/components/ui/Container';

const trustPoints = ['Webs comerciales', 'Sistemas a medida', 'Asistente comercial con IA'];

export function HeroSection() {
  return (
    <section className="hero-cosmic-bg relative sm:min-h-[90vh] overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-36">
      <div className="hero-float pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <div className="hero-float pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[var(--orange-cta)]/10 blur-3xl motion-delay-200" />

      <Container className="relative z-10 max-w-[1440px] top-16 sm:top-32">
        <div className="grid place-items-center gap-6">
          <div className="space-y-4 text-center sm:space-y-5">
            <h1 className="motion-fade-up mx-auto max-w-[800px]  text-3xl font-semibold leading-[1.35] tracking-normal text-[var(--text-primary)] sm:text-4xl md:text-5xl  lg:text-6xl">
              Creamos webs y sistemas con IA para captar, ordenar y convertir mejor tus consultas.
            </h1>

            <p className="motion-fade-up motion-delay-100 mx-auto max-w-2xl text-base leading-6 text-[var(--text-secondary)] sm:text-2xl">
              Para negocios que hoy venden por Instagram o WhatsApp y necesitan un canal digital más claro para crecer.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
