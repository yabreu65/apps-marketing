import type { OfferPackageItem } from '@/types/site';

export const offerPackages: OfferPackageItem[] = [
  {
    id: 'landing-package',
    title: 'Landing Comercial',
    subtitle: 'Validación y captación inicial',
    idealFor: 'Negocios que necesitan comunicar mejor su oferta y generar consultas.',
    includes: ['Estructura comercial de la landing', 'Copy orientado a conversión', 'WhatsApp/formulario manual'],
    outcome: 'Base clara para captar oportunidades con bajo nivel de complejidad.',
    statusLabel: 'Disponible ahora',
  },
  {
    id: 'professional-web-package',
    title: 'Web Profesional',
    subtitle: 'Presencia digital sólida',
    idealFor: 'Empresas de servicios que necesitan credibilidad y mejor presentación comercial.',
    includes: ['Sitio profesional por secciones', 'Mensajes clave por servicio', 'SEO y estructura inicial de contenido'],
    outcome: 'Mejor posicionamiento de marca y recorrido comercial más claro.',
    statusLabel: 'Disponible ahora',
  },
  {
    id: 'custom-system-package',
    title: 'Sistema Web a Medida',
    subtitle: 'Orden operativo',
    idealFor: 'Equipos con procesos internos que necesitan una solución adaptada.',
    includes: ['Definición funcional por proceso', 'Flujos y vistas clave', 'Arquitectura pensada para evolución'],
    outcome: 'Operación más ordenada y trazable para escalar con menos fricción.',
    statusLabel: 'Proyecto a medida',
  },
  {
    id: 'mvp-saas-package',
    title: 'MVP SaaS',
    subtitle: 'Validación de producto digital',
    idealFor: 'Founders o empresas que quieren probar una idea SaaS con enfoque iterativo.',
    includes: ['Definición de alcance MVP', 'Experiencia principal del usuario', 'Base técnica para iterar por etapas'],
    outcome: 'Versión inicial lista para aprender del mercado y priorizar próximas iteraciones.',
    statusLabel: 'Proyecto a medida',
  },
  {
    id: 'automation-ai-package',
    title: 'Automatización / IA Aplicada',
    subtitle: 'Evolución avanzada',
    idealFor: 'Negocios con procesos y datos más maduros que buscan optimizar operación.',
    includes: ['Diagnóstico de procesos automatizables', 'Roadmap de adopción por fases', 'Diseño de evolución tecnológica responsable'],
    outcome: 'Hoja de ruta clara para evolucionar sin saltar etapas críticas del negocio.',
    statusLabel: 'Fase avanzada',
  },
];
