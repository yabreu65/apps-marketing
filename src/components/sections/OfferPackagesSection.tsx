import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { offerPackages } from '@/data/offer-packages';

const STATUS_STYLES = {
  'Disponible ahora': 'bg-[#F97316]/15 text-[#FDBA74]',
  'Proyecto a medida': 'bg-[#7C3AED]/20 text-[#C4B5FD]',
  'Fase avanzada': 'bg-[#1E293B] text-[#94A3B8]',
} as const;

export function OfferPackagesSection() {
  return (
    <section id="paquetes" className="border-b border-[#26324A] bg-[#111827] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Paquetes"
          title="Caminos comerciales para contratar"
          description="Elegí el punto de partida según tu objetivo actual. Después escalamos por etapas con una hoja de ruta clara."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offerPackages.map((pkg) => (
            <Card key={pkg.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">{pkg.subtitle}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[pkg.statusLabel]}`}>
                  {pkg.statusLabel}
                </span>
              </div>

              <h3 className="mt-2 text-base font-semibold text-[#FFFBF5]">{pkg.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">
                <span className="font-semibold text-[#E2E8F0]">Ideal para:</span> {pkg.idealFor}
              </p>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#A78BFA]">Incluye</p>
                <ul className="mt-2 space-y-1 text-xs text-[#CBD5E1]">
                  {pkg.includes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-xs text-[#94A3B8]">
                <span className="font-semibold text-[#CBD5E1]">Resultado esperado:</span> {pkg.outcome}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
