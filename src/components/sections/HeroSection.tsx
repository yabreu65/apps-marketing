import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="hero-cosmic-bg relative overflow-hidden border-b border-[var(--border-subtle)] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="pointer-events-none absolute -left-28 top-4 h-80 w-80 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-0 h-72 w-72 rounded-full bg-[var(--cyan-accent)]/8 blur-3xl" />

      <Container className="relative z-10 max-w-[1440px]">
        <div className="mx-auto space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--purple-soft)] sm:text-sm">
            PAW Tech
          </p>

          <h1 className="mx-auto font-semibold leading-[1.12] text-[var(--text-primary)] text-2xl sm:text-5xl lg:text-7xl">
            <span className="block motion-fade-up motion-delay-100" style={{ animationDuration: '1200ms' }}>
              Web, marketing, sistemas e IA
            </span>{' '}
            <span className="block motion-fade-up motion-delay-300" style={{ animationDuration: '1200ms' }}>
              para captar clientes,
            </span>{' '}
            <span className="block motion-fade-up motion-delay-400" style={{ animationDuration: '1200ms' }}>
              convertir mejor y escalar con{' '}
              <span className="bg-gradient-to-r from-[var(--purple-soft)] via-[var(--purple-primary)] to-[var(--cyan-accent)] bg-clip-text text-transparent">
                tecnología.
              </span>
            </span>
          </h1>

          <p
            className="mx-auto text-base leading-7 text-[var(--text-secondary)] motion-fade-in motion-delay-400 sm:text-2xl lg:text-[2rem] lg:leading-[1.35]"
            style={{ animationDuration: '1300ms' }}
          >
            Optimizamos la presencia digital de los negocios que venden por WhatsApp, redes o formularios. Los ayudamos a captar mejores oportunidades, dar un seguimiento comercial efectivo y consolidar una base de clientes sostenible
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Button
              href="#diagnostico"
              className="rounded-full bg-[var(--orange-cta)] px-7 py-3 text-sm font-semibold text-[var(--warm-white)] shadow-[0_14px_40px_rgba(249,115,22,0.28)] transition hover:bg-[var(--orange-hover)]"
            >
              Solicitar diagnóstico
            </Button>
            <Button
              href="#contacto"
              variant="secondary"
              className="rounded-full px-7 py-3 text-sm"
            >
              Completar formulario
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[var(--text-soft)]">
            <span>Diagnóstico orientativo</span>
            <span>Estrategia a medida</span>
            <span>Respuesta humana</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
