import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { offerPackages } from '@/data/offer-packages';

const STATUS_STYLES = {
  'Disponible ahora': 'bg-[var(--orange-cta)]/15 text-[var(--orange-soft)]',
  'Proyecto a medida': 'bg-[var(--purple-primary)]/20 text-[var(--text-accent)]',
  'Fase avanzada': 'bg-[var(--bg-hover)] text-[var(--text-muted)]',
} as const;

export function OfferPackagesSection() {
  return (
    <section id="paquetes" className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20">
      <div className="pointer-events-none absolute right-[-5rem] top-10 h-72 w-72 rounded-full bg-[var(--purple-primary)]/18 blur-3xl" />
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Paquetes"
          title="Caminos comerciales para contratar"
          description="Elegí el punto de partida según tu objetivo actual. Después escalamos por etapas con una hoja de ruta clara."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offerPackages.map((pkg) => (
            <Card key={pkg.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--purple-soft)]">{pkg.subtitle}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[pkg.statusLabel]}`}>
                  {pkg.statusLabel}
                </span>
              </div>

              <h3 className="mt-2 text-base font-semibold text-[var(--warm-white)]">{pkg.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-bright)]">Ideal para:</span> {pkg.idealFor}
              </p>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--purple-soft)]">Incluye</p>
                <ul className="mt-2 space-y-1 text-xs text-[var(--text-secondary)]">
                  {pkg.includes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-secondary)]">Resultado esperado:</span> {pkg.outcome}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
