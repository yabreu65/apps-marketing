import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const whatsappMessage =
  'Hola, quiero solicitar un diagnóstico para mi proyecto digital y definir el mejor camino de implementación.';

const navItems = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'IA local', href: '#ia-local' },
  { label: 'Diagnóstico', href: '#project-diagnosis' },
  { label: 'Contacto', href: '#contact-form' },
];

const badges = ['Web & SaaS', 'Sistemas internos', 'Dashboards', 'IA local'];
const trustSignals = ['Proyectos B2B', 'Equipos de operaciones', 'Negocios en crecimiento'];

export function HeroSection() {
  const whatsappHref = buildWhatsAppLink('+54 9 11 0000 0000', whatsappMessage);

  return (
    <section className="hero-cosmic-bg relative isolate overflow-hidden border-b border-[#26324A] pb-20 pt-5 sm:pb-28 sm:pt-6">
      <div className="pointer-events-none absolute -left-44 top-14 h-[43rem] w-[43rem] rounded-full hero-orb" />
      <div className="pointer-events-none absolute -left-24 top-28 h-[34rem] w-[34rem] rounded-full border border-[#A78BFA]/20" />
      <div className="pointer-events-none absolute left-[18%] top-24 h-[50rem] w-[50rem] rounded-full border border-[#A78BFA]/10" />
      <div className="pointer-events-none absolute -bottom-20 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#F97316]/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 h-36 bg-[url('/visual/arc-flow.svg')] bg-cover bg-center opacity-70" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent" />

      <Container className="relative z-10 space-y-14">
        <header className="glass-card flex items-center justify-between rounded-2xl px-4 py-3">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold text-[#FFFBF5]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/20 text-lg text-[#C4B5FD] glow-effect">
              ✦
            </span>
            Yoryi AI Studio
          </a>
          <nav className="hidden items-center gap-6 text-xs font-medium text-[#CBD5E1] lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" className="rounded-xl px-3 py-1.5 text-xs">
            Solicitar diagnóstico ↗
          </Button>
        </header>

        <div className="grid min-h-[640px] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-7">
            <p className="inline-flex rounded-full border border-[#A78BFA]/35 bg-[#7C3AED]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
              Estrategia • Producto • IA local
            </p>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[#F8FAFC] sm:text-6xl md:text-7xl xl:text-8xl">
                Creamos productos <span className="text-gradient">digitales con IA local</span> que impulsan tu negocio al futuro.
              </h1>
              <p className="max-w-xl text-pretty text-base leading-7 text-[#CBD5E1] sm:text-lg">
                Diseñamos, desarrollamos y escalamos soluciones web, sistemas internos y MVP SaaS con inteligencia comercial local.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="primary" className="rounded-xl px-5 py-3">
                Solicitar diagnóstico ↗
              </Button>
              <Button href="#soluciones" variant="secondary" className="rounded-xl px-5 py-3">
                Ver soluciones ↗
              </Button>
            </div>

            <div className="grid max-w-xl grid-cols-2 gap-2 pt-3 sm:flex sm:flex-wrap">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full border border-[#A78BFA]/20 bg-[#0B1020]/70 px-3 py-1.5 text-center text-xs text-[#CBD5E1] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur">
                  {badge}
                </span>
              ))}
            </div>

            <div className="glass-card max-w-xl rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['Y', 'A', 'I'].map((initial) => (
                    <span
                      key={initial}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#A78BFA]/45 bg-[#0B1020] text-[11px] font-semibold text-[#E9D5FF]"
                    >
                      {initial}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#CBD5E1]">Equipos de servicios, SaaS y operaciones internas trabajan este enfoque.</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {trustSignals.map((signal) => (
                  <span key={signal} className="rounded-full border border-[#26324A] bg-[#0B1020]/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#A8B6CC]">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <article className="glass-card relative rounded-[2rem] p-3 sm:p-5">
            <div className="pointer-events-none absolute -inset-1 rounded-[2.15rem] bg-[linear-gradient(135deg,rgba(124,58,237,0.44),transparent_40%,rgba(249,115,22,0.22))] opacity-80 blur" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#A78BFA]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.55rem] border border-[#26324A] bg-[#080D1F]">
              <div className="flex items-center justify-between border-b border-[#26324A] bg-[#0E1528]/95 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#FFFBF5]">AI Command Center</p>
                  <p className="text-xs text-[#94A3B8]">Demo conceptual local</p>
                </div>
                <div className="flex items-center gap-3 text-[#94A3B8]">
                  <span className="text-xs">⌕</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED] shadow-[0_0_16px_rgba(124,58,237,0.9)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.7)]" />
                </div>
              </div>

              <div className="grid lg:grid-cols-[0.28fr_0.72fr]">
                <aside className="hidden border-r border-[#26324A] bg-[#070B18] p-4 text-xs text-[#94A3B8] lg:block">
                  <p className="mb-5 text-sm font-semibold text-[#F8FAFC]">Yoryi AI</p>
                  <div className="space-y-2.5">
                    <p className="rounded-lg bg-[#7C3AED]/18 px-3 py-2 text-[#E9D5FF]">Resumen</p>
                    <p className="px-3 py-1.5">Leads</p>
                    <p className="px-3 py-1.5">Scoring</p>
                    <p className="px-3 py-1.5">Timeline</p>
                    <p className="px-3 py-1.5">Diagnóstico</p>
                  </div>
                </aside>

                <div className="space-y-4 p-4 sm:p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ['Resumen', 'Local', 'sin terceros'],
                      ['Score', '78', 'estimación'],
                      ['Estado', 'Manual', 'humano'],
                    ].map(([label, value, meta]) => (
                      <div key={label} className="mock-panel rounded-xl p-3">
                        <p className="text-xs text-[#94A3B8]">{label}</p>
                        <p className="mt-1 text-2xl font-semibold text-[#FFFBF5]">{value}</p>
                        <p className="mt-1 text-[11px] text-[#A78BFA]">{meta}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mock-panel rounded-xl p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-[#F8FAFC]">Flujo de oportunidades</p>
                      <span className="rounded-full bg-[#7C3AED]/15 px-2 py-1 text-[10px] text-[#C4B5FD]">ejemplo visual</span>
                    </div>
                    <svg viewBox="0 0 360 140" className="h-32 w-full" role="img" aria-label="Gráfico conceptual de oportunidades">
                      <defs>
                        <linearGradient id="heroLine" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#C4B5FD" />
                        </linearGradient>
                        <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 116 C45 88 54 74 92 86 C132 99 132 46 176 56 C220 66 206 20 252 34 C300 50 308 20 360 28 L360 140 L0 140 Z" fill="url(#heroArea)" />
                      <path d="M0 116 C45 88 54 74 92 86 C132 99 132 46 176 56 C220 66 206 20 252 34 C300 50 308 20 360 28" fill="none" stroke="url(#heroLine)" strokeLinecap="round" strokeWidth="4" />
                      <path d="M0 104 C46 100 58 122 96 108 C136 92 150 120 188 102 C230 82 238 106 274 88 C312 69 326 84 360 66" fill="none" stroke="#F97316" strokeLinecap="round" strokeOpacity="0.7" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="mock-panel rounded-xl p-3 text-sm text-[#CBD5E1]">
                      <p className="mb-1 text-xs uppercase tracking-wider text-[#A78BFA]">Resumen IA local</p>
                      Ollama opcional + fallback por reglas.
                    </div>
                    <div className="mock-panel rounded-xl p-3 text-sm text-[#CBD5E1]">
                      <p className="mb-1 text-xs uppercase tracking-wider text-[#FDBA74]">Actividad</p>
                      Notas y timeline para seguimiento manual.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
