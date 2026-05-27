import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';

type EcosystemArea = {
  title: string;
  description: string;
  bullets: string[];
  action: string;
  icon: 'web' | 'marketing' | 'systems' | 'ai';
  accent: {
    card: string;
    icon: string;
    text: string;
    line: string;
  };
};

const ecosystemAreas: EcosystemArea[] = [
  {
    title: 'Web',
    description: 'Presencia profesional que convierte.',
    bullets: [
      'Sitios y landings optimizados',
      'Diseño enfocado en conversión',
      'Experiencia rápida y segura',
      'SEO técnico y estructura sólida',
    ],
    action: 'Atrae y convierte visitas',
    icon: 'web',
    accent: {
      card: 'border-[rgba(168,85,247,0.46)] bg-[rgba(88,28,135,0.18)] shadow-[0_24px_80px_rgba(124,58,237,0.16)]',
      icon: 'border-[rgba(196,181,253,0.58)] bg-[radial-gradient(circle_at_35%_25%,rgba(216,180,254,0.7),rgba(124,58,237,0.72)_58%,rgba(58,15,103,0.9))] text-[var(--warm-white)] shadow-[0_0_40px_rgba(168,85,247,0.42)]',
      text: 'text-[rgb(216,180,254)]',
      line: 'rgba(168,85,247,0.72)',
    },
  },
  {
    title: 'Marketing',
    description: 'Estrategia y contenido que generan clientes.',
    bullets: [
      'Estrategia y embudos',
      'Contenido que vende',
      'Campañas y anuncios',
      'Analítica y optimización',
    ],
    action: 'Genera y nutre clientes',
    icon: 'marketing',
    accent: {
      card: 'border-[rgba(34,211,238,0.46)] bg-[rgba(8,145,178,0.16)] shadow-[0_24px_80px_rgba(6,182,212,0.14)]',
      icon: 'border-[rgba(103,232,249,0.58)] bg-[radial-gradient(circle_at_35%_25%,rgba(103,232,249,0.78),rgba(8,145,178,0.75)_58%,rgba(12,74,110,0.9))] text-[var(--warm-white)] shadow-[0_0_40px_rgba(34,211,238,0.38)]',
      text: 'text-[var(--cyan-accent)]',
      line: 'rgba(34,211,238,0.76)',
    },
  },
  {
    title: 'Sistemas',
    description: 'Automatización y procesos que ordenan tu negocio.',
    bullets: [
      'CRM y gestión de leads',
      'Automatizaciones y flujos',
      'Paneles, reportes y dashboards',
      'Integraciones y datos',
    ],
    action: 'Ordena y escala operaciones',
    icon: 'systems',
    accent: {
      card: 'border-[rgba(251,146,60,0.48)] bg-[rgba(154,52,18,0.14)] shadow-[0_24px_80px_rgba(249,115,22,0.13)]',
      icon: 'border-[rgba(253,186,116,0.62)] bg-[radial-gradient(circle_at_35%_25%,rgba(253,186,116,0.82),rgba(234,88,12,0.78)_58%,rgba(124,45,18,0.92))] text-[var(--warm-white)] shadow-[0_0_40px_rgba(249,115,22,0.34)]',
      text: 'text-[var(--orange-soft)]',
      line: 'rgba(251,146,60,0.78)',
    },
  },
  {
    title: 'IA aplicada',
    description: 'Inteligencia gradual para decisiones reales.',
    bullets: [
      'Asistentes y chatbots inteligentes',
      'Análisis y recomendaciones',
      'Predicción y automatización',
      'Datos que impulsan decisiones',
    ],
    action: 'Potencia decisiones y resultados',
    icon: 'ai',
    accent: {
      card: 'border-[rgba(96,165,250,0.48)] bg-[rgba(29,78,216,0.16)] shadow-[0_24px_80px_rgba(59,130,246,0.14)]',
      icon: 'border-[rgba(125,211,252,0.58)] bg-[radial-gradient(circle_at_35%_25%,rgba(125,211,252,0.72),rgba(37,99,235,0.8)_58%,rgba(30,64,175,0.92))] text-[var(--warm-white)] shadow-[0_0_40px_rgba(59,130,246,0.38)]',
      text: 'text-[rgb(125,211,252)]',
      line: 'rgba(96,165,250,0.78)',
    },
  },
];

const growthLayers = [
  { label: 'Estrategia', icon: 'target' },
  { label: 'Ejecución', icon: 'gear' },
  { label: 'Medición', icon: 'chart' },
  { label: 'Optimización', icon: 'spark' },
] as const;

function AreaIcon({ type }: { type: EcosystemArea['icon'] }) {
  if (type === 'web') {
    return (
      <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 9h16" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 7h.01M11 7h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 13h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'marketing') {
    return (
      <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path d="M5 14h3l9 4V6L8 10H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 14v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19 9.5c1 .7 1.5 1.5 1.5 2.5S20 13.8 19 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'systems') {
    return (
      <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 10h4v4h-4z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GrowthIcon({ type }: { type: (typeof growthLayers)[number]['icon'] }) {
  if (type === 'target') {
    return (
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M15 9l4-4M17 5h2v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'gear') {
    return (
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15 6h3v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function AreaCard({ area, className = '' }: { area: EcosystemArea; className?: string }) {
  return (
    <article
      className={`relative z-10 overflow-hidden rounded-[1.75rem] border p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/[0.035] sm:p-5 ${area.accent.card} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.08),transparent_14rem)]" />
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border ${area.accent.icon}`}>
            <AreaIcon type={area.icon} />
          </div>
          <div>
            <h3 className="text-xl font-semibold leading-tight text-[var(--text-bright)] sm:text-2xl">{area.title}</h3>
            <p className={`mt-2 text-sm font-medium leading-6 ${area.accent.text}`}>{area.description}</p>
          </div>
        </div>

        <div className="my-5 h-px bg-[var(--border-subtle)]/70" />

        <ul className="space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
          {area.bullets.map((bullet, index) => (
            <li key={bullet} className={`flex gap-3 ${index > 1 ? 'hidden sm:flex' : ''}`}>
              <span className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${area.accent.text}`}>
                <svg aria-hidden="true" className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6.2 5.1 8.3 9 3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className={`mt-5 hidden items-center gap-2 rounded-full border border-current/25 bg-[var(--bg-primary)]/38 px-4 py-2 text-sm font-semibold sm:inline-flex ${area.accent.text}`}>
          <span aria-hidden="true">✦</span>
          {area.action}
        </div>
      </div>
    </article>
  );
}

function ConnectorLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1200 680"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="agentGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M525 285 C430 245 390 155 310 155 H252" stroke={ecosystemAreas[0].accent.line} strokeWidth="2" fill="none" opacity="0.74" filter="url(#agentGlow)" />
      <path d="M675 285 C770 245 810 155 890 155 H948" stroke={ecosystemAreas[1].accent.line} strokeWidth="2" fill="none" opacity="0.74" filter="url(#agentGlow)" />
      <path d="M525 400 C430 440 390 525 310 525 H252" stroke={ecosystemAreas[2].accent.line} strokeWidth="2" fill="none" opacity="0.74" filter="url(#agentGlow)" />
      <path d="M675 400 C770 440 810 525 890 525 H948" stroke={ecosystemAreas[3].accent.line} strokeWidth="2" fill="none" opacity="0.74" filter="url(#agentGlow)" />
      {[ecosystemAreas[0], ecosystemAreas[1], ecosystemAreas[2], ecosystemAreas[3]].map((area, index) => {
        const points = [
          { x: 252, y: 155 },
          { x: 948, y: 155 },
          { x: 252, y: 525 },
          { x: 948, y: 525 },
        ];
        const point = points[index];

        return (
          <g key={area.title}>
            <circle cx={point.x} cy={point.y} r="6" fill={area.accent.line} opacity="0.95" />
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="none"
              stroke={area.accent.line}
              strokeWidth="1"
              opacity="0.35"
              className="motion-safe:animate-pulse motion-reduce:animate-none"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ConceptEcosystemSection() {
  const [webArea, marketingArea, systemsArea, aiArea] = ecosystemAreas;

  return (
    <section
      id="sistema-conectado"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(37,99,235,0.18),transparent_32rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(168,85,247,0.14),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_68%,rgba(34,211,238,0.11),transparent_30rem)]" />

      <Container className="relative z-10 max-w-[1440px]">
        <div className="mx-auto sm:max-w-5xl  text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--purple-soft)] sm:text-sm">
            Un agente central para conectar
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-[1.02] text-[var(--text-bright)] sm:text-5xl lg:text-6xl">
            Web, marketing, sistemas e IA trabajando como un{' '}
            <span className="text-gradient">solo ecosistema.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            Elegimos qué capa activar según tu etapa para que cada mejora tenga impacto real.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--text-soft)] sm:text-base">
            Marketing atrae. Web convierte. Sistemas ordenan. IA potencia.
          </p>
        </div>

        <MotionReveal className="relative mx-auto mt-10 max-w-[1280px] sm:mt-12">
          <ConnectorLines />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <div className="space-y-5 lg:space-y-9">
              <AreaCard area={webArea} />
              <AreaCard area={systemsArea} />
            </div>

            <div className="relative order-first mx-auto flex w-full max-w-[520px] flex-col items-center justify-center py-2 sm:py-3 lg:order-none lg:min-h-[620px]">
              <div className="pointer-events-none absolute left-1/2 top-[47%] h-[33rem] w-[33rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--cyan-accent)]/10 max-lg:hidden" />
              <div className="pointer-events-none absolute left-1/2 top-[47%] h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--purple-soft)]/18 max-lg:hidden" />
              <div className="pointer-events-none absolute left-1/2 top-[47%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--purple-soft)]/28 max-lg:hidden" />
              <div className="pointer-events-none absolute left-1/2 top-[47%] h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--cyan-accent)]/34 max-lg:hidden" />

              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-[var(--cyan-accent)]/55 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.24),rgba(124,58,237,0.34)_48%,rgba(5,10,28,0.96)_100%)] shadow-[0_0_100px_rgba(99,102,241,0.4)] sm:h-72 sm:w-72 lg:h-96 lg:w-96">
                <div className="pointer-events-none absolute inset-8 rounded-full border border-[var(--warm-white)]/18" />
                <div className="pointer-events-none absolute inset-14 rounded-full border border-[var(--purple-soft)]/28" />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,rgba(168,85,247,0.28),rgba(34,211,238,0.36),rgba(168,85,247,0.28))] opacity-35 blur-xl" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <Image
                    src="/logoTech.png"
                    alt="PAW Tech"
                    width={210}
                    height={153}
                    className="h-14 w-auto sm:h-20 lg:h-24"
                    priority
                  />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--purple-soft)] sm:mt-3 sm:text-sm sm:tracking-[0.36em]">
                    Ecosistema PAW Tech
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-8 text-center">
                <p className="mx-auto max-w-xs text-xl font-semibold leading-7 text-[var(--text-bright)]">
                  Coordina las 4 capas de crecimiento
                </p>
              </div>

              <p className="relative z-10 mt-4 max-w-xs text-center text-sm leading-6 text-[var(--text-soft)] sm:hidden">
                Activamos la capa correcta según tu etapa: captar mejor, ordenar operación y escalar con control.
              </p>

              <div className="relative z-10 mt-6 hidden w-full max-w-[520px] grid-cols-2 rounded-[2rem] border border-[var(--border-subtle)]/70 bg-[var(--bg-primary)]/48 p-3 shadow-[0_20px_70px_rgba(2,6,23,0.34)] backdrop-blur-md sm:grid sm:grid-cols-4">
                {growthLayers.map((layer, index) => (
                  <div
                    key={layer.label}
                    className={`flex flex-col items-center gap-2 px-3 py-3 text-center text-sm text-[var(--text-secondary)] ${
                      index > 0 ? 'sm:border-l sm:border-[var(--border-subtle)]/70' : ''
                    }`}
                  >
                    <span className="text-[var(--cyan-accent)]">
                      <GrowthIcon type={layer.icon} />
                    </span>
                    {layer.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:space-y-9">
              <AreaCard area={marketingArea} />
              <AreaCard area={aiArea} />
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
