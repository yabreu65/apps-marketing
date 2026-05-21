import { Container } from '@/components/ui/Container';
import { ScatteredTextReveal } from '@/components/ui/ScatteredTextReveal';
import { ScrambleText } from '@/components/ui/ScrambleText';

const heroTitleLines = [
  ['Creamos', 'webs', 'y', 'sistemas'],
  ['con', 'IA', 'para', 'captar,', 'ordenar', 'y'],
  ['convertir', 'mejor', 'tus', 'consultas.'],
];

export function HeroSection() {
  return (
    <section className="hero-cosmic-bg relative sm:min-h-[90vh] overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-36">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[var(--orange-cta)]/10 blur-3xl" />

      <Container className="relative z-10 max-w-[1440px] top-16 sm:top-32">
        <div className="grid place-items-center gap-6">
          <div className="space-y-4 text-center sm:space-y-5">
            <h1 className="mx-auto max-w-[800px] text-2xl font-semibold leading-[1.35] tracking-normal text-[var(--text-primary)] sm:text-4xl md:text-5xl lg:text-6xl">
              <ScatteredTextReveal
                lines={heroTitleLines}
                durationMs={1800}
                startDelayMs={1000}
              />
            </h1>

            <ScrambleText
              text="Para negocios que hoy venden por Instagram o WhatsApp y necesitan un canal digital más claro para crecer."
              durationMs={800}
              spreadDuringScramble
              className="mx-auto block max-w-2xl text-base leading-6 text-[var(--text-secondary)] sm:text-xl"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
