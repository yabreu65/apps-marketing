import { Container } from '@/components/ui/Container';
import { ScatteredTextReveal } from '@/components/ui/ScatteredTextReveal';
import { ScrambleText } from '@/components/ui/ScrambleText';
import { Button } from '@/components/ui/Button';

const heroTitleLines = [
  ['Web,', 'marketing,', 'sistemas', 'e', 'IA'],
  ['para', 'captar', 'clientes,', 'convertir', 'mejor'],
  ['y', 'escalar', 'con', 'tecnología.'],
];

export function HeroSection() {
  return (
    <section className="hero-cosmic-bg relative overflow-hidden pb-14 pt-28 sm:min-h-[90vh] sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[var(--orange-cta)]/10 blur-3xl" />

      <Container className="relative top-16 z-10 max-w-[1440px] sm:top-28">
        <div className="grid gap-10">
          <div className="space-y-5 text-center sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--purple-soft)] sm:text-sm">
              Yoryi AI Studio · Apps Marketing
            </p>
            <h1 className="mx-auto max-w-[800px] text-2xl font-semibold leading-[1.35] tracking-normal text-[var(--text-primary)] sm:text-4xl md:text-5xl lg:text-6xl">
              <ScatteredTextReveal
                lines={heroTitleLines}
                durationMs={1800}
                startDelayMs={1000}
              />
            </h1>

            <ScrambleText
              text="Ayudamos a negocios que venden por conversaciones a ordenar su presencia digital, mejorar captación y sostener seguimiento comercial con procesos más claros."
              durationMs={800}
              spreadDuringScramble
              className="mx-auto block max-w-2xl text-base leading-6 text-[var(--text-secondary)] sm:text-xl"
            />

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                href="#diagnostico"
                className="rounded-full bg-[var(--orange-cta)] px-6 py-3 text-sm font-semibold text-[var(--warm-white)] shadow-[0_14px_40px_rgba(249,115,22,0.28)] transition hover:bg-[var(--orange-hover)]"
              >
                Solicitar diagnóstico
              </Button>
              <Button
                href="#contacto"
                variant="secondary"
                className="rounded-full px-6 py-3 text-sm"
              >
                Completar formulario
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[var(--border-subtle)]/90 bg-[color-mix(in_srgb,var(--bg-elevated)_76%,#ffffff_8%)] p-4 shadow-[0_24px_90px_rgba(2,6,23,0.5)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--purple-soft)]">
              Flujo conceptual
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Web', 'Oferta clara y presencia confiable'],
                ['Marketing', 'Captación y mensajes con intención'],
                ['Sistema', 'Seguimiento y operación más ordenada'],
                ['IA aplicada', 'Priorización gradual con control humano'],
              ].map(([title, description], index) => (
                <article
                  key={title}
                  className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/72 px-4 py-4 text-left ${
                    index % 2 === 0 ? 'motion-fade-up' : 'motion-fade-up motion-delay-100'
                  }`}
                >
                  <p className="text-sm font-semibold text-[var(--text-bright)]">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
                    {description}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--text-soft)] sm:text-sm">
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-1.5">
                Visita calificada
              </span>
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-1.5">
                Diagnóstico orientativo
              </span>
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-1.5">
                Lead con contexto
              </span>
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-1.5">
                Siguiente paso claro
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
