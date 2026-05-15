import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const whatsappMessage = 'Hola, quiero solicitar un diagnóstico para mi proyecto digital y definir el mejor camino de implementación.';

const heroHighlights = ['Web + sistemas a medida', 'MVP SaaS y dashboards internos', 'Inteligencia comercial local (Ollama opcional)'];

export function HeroSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', whatsappMessage);

  return (
    <section className="relative overflow-hidden border-b border-[#26324A] bg-[radial-gradient(circle_at_top_right,#4C1D95_0%,#0B1020_48%,#0B1020_100%)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(249,115,22,0.08)_45%,transparent_100%)]" />
      <Container className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-[#A78BFA]/35 bg-[#7C3AED]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">
            AI-first studio para producto digital
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl md:text-6xl">
            Construimos productos web, sistemas e IA aplicada para negocios que quieren escalar
          </h1>

          <p className="max-w-2xl text-pretty text-base text-[#CBD5E1] sm:text-lg">
            Diseñamos landing pages, sitios profesionales, dashboards, MVP SaaS y herramientas internas con inteligencia comercial local.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Solicitar diagnóstico
            </Button>
            <Button href="#soluciones" variant="secondary">
              Ver soluciones
            </Button>
          </div>

          <ul className="space-y-2 text-sm text-[#94A3B8]">
            {heroHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <article className="rounded-3xl border border-[#26324A] bg-[#0E1528] p-5 shadow-[0_20px_55px_rgba(2,6,23,0.55)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#FFFBF5]">Lead Intelligence Workspace</p>
            <span className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-2 py-1 text-[10px] uppercase tracking-wider text-[#C4B5FD]">Concept Demo</span>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#E2E8F0]">Lead score: 78/100 · Prioridad alta</div>
            <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Resumen comercial local + fallback por reglas</div>
            <div className="rounded-xl border border-[#26324A] bg-[#151B2E] p-3 text-sm text-[#CBD5E1]">Timeline + notas internas para seguimiento</div>
          </div>
        </article>
      </Container>
    </section>
  );
}
