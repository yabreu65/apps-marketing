import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const metrics = [
  ['Lead Score', '0-100', 'estimación local'],
  ['Resumen IA', 'Local', 'Ollama opcional'],
  ['Seguimiento', 'Manual', 'decisión humana'],
];

const rows = [
  ['Lead A', 'MVP SaaS', 'Proposal'],
  ['Lead B', 'Sitio web', 'Contacted'],
  ['Lead C', 'Dashboard', 'New'],
];

export function ProductShowcaseSection() {
  return (
    <section className="product-depth-bg relative overflow-hidden border-b border-[#26324A] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-28 top-12 h-[30rem] w-[30rem] rounded-full bg-[#7C3AED]/20 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-[#F97316]/10 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 h-24 bg-[url('/visual/arc-flow.svg')] bg-cover bg-center opacity-75" />
      <Container className="relative z-10 space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow="Product showcase"
            title="Un mock SaaS para visualizar operación comercial"
            description="Demo conceptual local de captura, seguimiento y priorización de leads, sin presentarlo como producto público en producción."
          />
          <p className="max-w-xl text-sm leading-6 text-[#A8B6CC] lg:justify-self-end">
            El objetivo visual es mostrar dirección de producto: dashboard, scoring, resumen local y timeline en un flujo claro para decisión humana.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['Leads activos', 'Demo visual'],
            ['Scoring local', '0-100 explicable'],
            ['Resumen IA', 'Ollama opcional'],
            ['Operación', 'Sin envío a terceros'],
          ].map(([label, value]) => (
            <div key={label} className="glass-card rounded-2xl px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#A8B6CC]">{label}</p>
              <p className="mt-1 text-sm font-semibold text-[#FFFBF5]">{value}</p>
            </div>
          ))}
        </div>

        <article className="glass-card relative rounded-[2rem] p-3 sm:p-5">
          <div className="pointer-events-none absolute -inset-1 rounded-[2.2rem] bg-[linear-gradient(135deg,rgba(124,58,237,0.36),transparent_45%,rgba(249,115,22,0.16))] blur" />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-[#26324A] bg-[#0A0F20]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26324A] bg-[#0E1528] px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-[#FFFBF5]">Lead Operations Mock</p>
                <p className="text-xs text-[#A8B6CC]">Dashboard conceptual para gestión interna local</p>
              </div>
              <span className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-3 py-1 text-[10px] uppercase tracking-wider text-[#C4B5FD]">Demo conceptual local</span>
            </div>

            <div className="grid lg:grid-cols-[220px_1fr]">
              <aside className="hidden border-r border-[#26324A] bg-[#070B18] p-5 text-xs text-[#A8B6CC] lg:block">
                <p className="mb-5 text-sm font-semibold text-[#F8FAFC]">Workspace</p>
                <div className="space-y-2">
                  {['Leads', 'Scoring', 'Resumen IA', 'Timeline', 'Diagnóstico'].map((item, index) => (
                    <p key={item} className={index === 0 ? 'rounded-lg bg-[#7C3AED]/16 px-3 py-2 text-[#E9D5FF]' : 'px-3 py-2'}>
                      {item}
                    </p>
                  ))}
                </div>
              </aside>

              <div className="space-y-4 p-4 sm:p-6">
                <div className="grid gap-3 md:grid-cols-3">
                  {metrics.map(([label, value, meta]) => (
                    <div key={label} className="mock-panel rounded-2xl p-4">
                      <p className="text-xs text-[#A8B6CC]">{label}</p>
                      <p className="mt-2 text-2xl font-semibold text-[#FFFBF5]">{value}</p>
                      <p className="mt-1 text-[11px] text-[#A78BFA]">{meta}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="mock-panel rounded-2xl p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-medium text-[#F8FAFC]">Pipeline de oportunidades</p>
                      <span className="text-xs text-[#A78BFA]">Ejemplo visual</span>
                    </div>
                    <div className="space-y-2">
                      {rows.map(([name, project, status]) => (
                        <div key={name} className="grid grid-cols-[0.8fr_1fr_auto] gap-3 rounded-xl border border-[#26324A] bg-[#0B1020] px-3 py-2 text-xs text-[#CBD5E1]">
                          <span className="font-medium text-[#FFFBF5]">{name}</span>
                          <span>{project}</span>
                          <span className="rounded-full bg-[#7C3AED]/16 px-2 py-0.5 text-[#C4B5FD]">{status}</span>
                        </div>
                      ))}
                    </div>
                    <svg viewBox="0 0 520 170" className="mt-5 h-36 w-full" role="img" aria-label="Gráfico conceptual de pipeline">
                      <defs>
                        <linearGradient id="showcaseLine" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#C4B5FD" />
                        </linearGradient>
                        <linearGradient id="showcaseArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 132 C62 92 88 116 134 84 C178 54 210 104 256 76 C310 42 332 84 386 50 C438 18 470 42 520 22 L520 170 L0 170 Z" fill="url(#showcaseArea)" />
                      <path d="M0 132 C62 92 88 116 134 84 C178 54 210 104 256 76 C310 42 332 84 386 50 C438 18 470 42 520 22" fill="none" stroke="url(#showcaseLine)" strokeLinecap="round" strokeWidth="4" />
                      <path d="M0 124 C58 128 84 96 130 112 C180 130 210 88 260 102 C318 118 336 76 390 90 C442 104 480 68 520 78" fill="none" stroke="#F97316" strokeLinecap="round" strokeOpacity="0.72" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <div className="mock-panel rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-[#FDBA74]">Lead Score</p>
                      <p className="mt-2 text-3xl font-semibold text-[#FFFBF5]">78/100</p>
                      <p className="mt-2 text-sm text-[#CBD5E1]">Ejemplo de estimación local explicable. No cambia estados ni toma decisiones automáticas.</p>
                    </div>
                    <div className="mock-panel rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-[#C4B5FD]">Resumen IA local</p>
                      <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">Ollama opcional con fallback por reglas locales. Sin envío a servicios externos.</p>
                    </div>
                    <div className="mock-panel rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-[#A8B6CC]">Notas / timeline</p>
                      <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">Contexto para seguimiento manual y continuidad comercial.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <p className="text-xs text-[#A8B6CC]">Demo visual local/controlada. No representa un SaaS público en producción ni automatización externa activa.</p>
      </Container>
    </section>
  );
}
