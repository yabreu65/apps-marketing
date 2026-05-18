import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const whatsappMessage =
  'Hola, quiero solicitar un diagnóstico para mi proyecto y definir el mejor próximo paso.';

const trustPoints = ['Webs comerciales', 'Sistemas a medida', 'Asistente comercial con IA'];

export function HeroSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', whatsappMessage);

  return (
    <section className="hero-cosmic-bg relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-18">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[var(--purple-primary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[var(--orange-cta)]/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-[var(--purple-soft)]/35 bg-[var(--purple-primary)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-accent)]">
              Apps Marketing
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Creamos webs, sistemas y soluciones con IA para captar, ordenar y convertir mejor tus consultas.
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Ideal para negocios que hoy venden por Instagram o WhatsApp y necesitan un canal digital más claro para crecer.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href="#project-diagnosis" variant="primary" className="rounded-xl px-5 py-3 shadow-[0_12px_30px_rgba(251,146,60,0.28)]">
                Solicitar diagnóstico
              </Button>
              <Button href="#soluciones" variant="secondary" className="rounded-xl px-5 py-3 opacity-90">
                Ver servicios
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {trustPoints.map((point) => (
                <span key={point} className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-ink)]/70 px-2.5 py-1 text-[11px] text-[var(--text-soft)]">
                  {point}
                </span>
              ))}
            </div>
          </div>

          <article className="glass-card rounded-3xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--warm-white)]">¿Qué resolvemos?</h2>
            <ul className="mt-4 space-y-2.5">
              {[
                'Mensaje claro para que te entiendan rápido.',
                'Seguimiento para no perder consultas importantes.',
                'Prioridades comerciales para avanzar con foco.',
              ].map((item) => (
                <li key={item} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 px-3 py-2 text-sm text-[var(--text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" className="rounded-xl px-4 py-2 text-xs">
                Continuar por WhatsApp
              </Button>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
