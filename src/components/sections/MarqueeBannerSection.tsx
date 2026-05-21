'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';

type BenefitItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

const benefitItems: BenefitItem[] = [
  {
    title: 'Más consultas calificadas',
    description:
      'La visita llega con más contexto, entiende mejor tu oferta y te escribe con intención real.',
    image: '/mas_consultas.png',
    alt: 'Embudo visual que muestra consultas desde Google, Instagram y WhatsApp convirtiéndose en una web lista.',
  },
  {
    title: 'No perder mensajes',
    description:
      'Ordená la entrada de consultas para que ninguna oportunidad importante quede olvidada.',
    image: '/no_perder_mensajes.png',
    alt: 'Vista visual de mensajes organizados y seguimiento claro.',
  },
  {
    title: 'Web que convierte',
    description:
      'Una página pensada para explicar tu oferta, generar confianza y llevar al contacto.',
    image: '/web_que_covierte.png',
    alt: 'Mockup de landing con llamada a la acción clara.',
  },
  {
    title: 'Chat inteligente',
    description:
      'Orientá mejor a tus visitantes con respuestas claras y un primer filtro comercial.',
    image: '/chat_inteligente.png',
    alt: 'Interfaz de chat inteligente respondiendo consultas comerciales.',
  },
  {
    title: 'Seguimiento ordenado',
    description:
      'Tené más claridad sobre quién consultó, qué necesita y cuál es el próximo paso.',
    image: '/seguimiento_ordenado.png',
    alt: 'Pipeline simple de seguimiento de leads.',
  },
  {
    title: 'Landing conectada a consultas',
    description:
      'Un camino simple desde la visita hasta el formulario o contacto comercial.',
    image: '/landing_consulta.png',
    alt: 'Flujo visual desde landing hasta consulta registrada.',
  },
  {
    title: 'Dashboard comercial',
    description:
      'Visualizá oportunidades, estados y señales importantes de tu negocio.',
    image: '/dashboard.png',
    alt: 'Dashboard comercial con métricas y oportunidades.',
  },
  {
    title: 'Base digital para crecer',
    description:
      'Una estructura preparada para sumar sistemas, automatización o IA por etapas.',
    image: '/base_digital.png',
    alt: 'Capas digitales conectadas para crecimiento progresivo.',
  },
];

export function MarqueeBannerSection() {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState(0);
  const activeDesktopBenefit = benefitItems[activeDesktopIndex] ?? benefitItems[0];

  return (
    <section className="relative  overflow-hidden border-y border-[var(--border-subtle)] py-14 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050917_0%,#0b1028_55%,#45307C_100%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold sm:text-4xl">En qué te ayudamos</h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)] sm:text-base">
            Elegí un beneficio y mirá cómo se vería aplicado en una experiencia digital real.
          </p>
        </div>

        <MotionReveal className="mt-8 lg:hidden">
          <div className="space-y-3" role="tablist" aria-label="Beneficios en mobile">
            {benefitItems.map((item, index) => {
              const isExpanded = expandedMobileIndex === index;

              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--bg-elevated)_72%,#ffffff_8%)]"
                >
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
                    onClick={() => setExpandedMobileIndex(index)}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-benefit-panel-${index}`}
                    id={`mobile-benefit-trigger-${index}`}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-[var(--text-bright)] sm:text-base">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs text-[var(--text-secondary)] sm:text-sm">
                        {item.description}
                      </span>
                    </span>
                    <span
                      className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs text-[var(--text-bright)] transition-transform duration-300 ${
                        isExpanded ? 'rotate-45' : 'rotate-0'
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`mobile-benefit-panel-${index}`}
                    role="region"
                    aria-labelledby={`mobile-benefit-trigger-${index}`}
                    className={`grid transition-all duration-400 ease-out ${
                      isExpanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4">
                        <div className="overflow-hidden rounded-xl border border-white/10">
                          <Image
                            src={item.image}
                            alt={item.alt}
                            width={1200}
                            height={700}
                            className="h-auto w-full object-cover"
                            sizes="100vw"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </MotionReveal>

        <MotionReveal className="mt-10 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2" role="tablist" aria-label="Beneficios en desktop">
            {benefitItems.map((item, index) => {
              const isActive = activeDesktopIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`desktop-benefit-preview-${index}`}
                  id={`desktop-benefit-tab-${index}`}
                  onMouseEnter={() => setActiveDesktopIndex(index)}
                  onFocus={() => setActiveDesktopIndex(index)}
                  onClick={() => setActiveDesktopIndex(index)}
                  className={`benefit-card rounded-2xl border px-3 py-3 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[var(--purple-soft)]/70 bg-[color-mix(in_srgb,var(--bg-elevated)_76%,#ffffff_12%)] shadow-[0_14px_34px_rgba(124,58,237,0.16)]'
                      : 'border-white/10 bg-[color-mix(in_srgb,var(--bg-elevated)_68%,#ffffff_6%)] hover:border-[var(--purple-soft)]/35'
                  }`}
                >
                  <span className="block text-sm font-semibold leading-snug text-[var(--text-bright)]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[color-mix(in_srgb,var(--bg-elevated)_72%,#ffffff_8%)]">
              <article
                key={activeDesktopBenefit.title}
                id={`desktop-benefit-preview-${activeDesktopIndex}`}
                role="tabpanel"
                aria-labelledby={`desktop-benefit-tab-${activeDesktopIndex}`}
                className="motion-fade-in transition-all duration-500 ease-out"
              >
                <div className="overflow-hidden border border-white/10">
                  <Image
                    src={activeDesktopBenefit.image}
                    alt={activeDesktopBenefit.alt}
                    width={1400}
                    height={840}
                    className="mx-auto h-auto max-h-[calc(100vh-9rem)] w-auto max-w-full object-contain"
                    sizes="(max-width: 1279px) 100vw, 54vw"
                    priority={activeDesktopIndex === 0}
                  />
                </div>
              </article>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
