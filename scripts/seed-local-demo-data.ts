import 'dotenv/config';

import { prisma } from '../src/lib/prisma';

type DemoLeadSeed = {
  name: string;
  email?: string | null;
  phone?: string | null;
  businessType?: string | null;
  serviceInterest: string;
  message: string;
  source: string;
  status: string;
  createdAtOffsetDays: number;
  notes?: Array<{
    content: string;
    createdAtOffsetDays: number;
    updatedAtOffsetDays?: number;
  }>;
  statusHistory?: Array<{
    fromStatus: string | null;
    toStatus: string;
    createdAtOffsetDays: number;
  }>;
};

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

const demoLeads: DemoLeadSeed[] = [
  {
    name: '[DEMO] Landing Lead Nuevo',
    email: 'landing.nuevo@example.com',
    phone: null,
    businessType: 'Clínica odontológica',
    serviceInterest: 'Landing comercial',
    message: 'Necesito una landing clara para captar más consultas este mes con campañas y derivar rápido a WhatsApp manual.',
    source: 'contact_form',
    status: 'new',
    createdAtOffsetDays: 1,
    notes: [
      {
        content: 'Lead reciente. Falta calificar presupuesto y urgencia real.',
        createdAtOffsetDays: 1,
      },
    ],
  },
  {
    name: '[DEMO] Web Profesional Contactado',
    email: 'web.contactado@example.com',
    phone: '+54 9 11 2000 0001',
    businessType: 'Estudio contable',
    serviceInterest: 'Sitio web profesional',
    message: 'Buscamos renovar nuestro sitio institucional para mejorar confianza y ordenar servicios.',
    source: 'contact_form',
    status: 'contacted',
    createdAtOffsetDays: 4,
    notes: [
      {
        content: 'Primer contacto positivo. Pidieron propuesta de estructura de páginas.',
        createdAtOffsetDays: 3,
      },
      {
        content: 'Solicitan incluir casos de servicios y formulario de consulta simple.',
        createdAtOffsetDays: 2,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 3 },
    ],
  },
  {
    name: '[DEMO] MVP SaaS Alto Potencial',
    email: 'mvp.alto.potencial@example.com',
    phone: '+54 9 11 2000 0002',
    businessType: 'Startup B2B logística',
    serviceInterest: 'MVP SaaS',
    message:
      'Tenemos validación inicial con clientes y queremos construir un MVP SaaS en 8 semanas para gestionar pedidos, seguimiento y reportes. Necesitamos priorizar features y salida rápida al mercado.',
    source: 'diagnosis',
    status: 'qualified',
    createdAtOffsetDays: 9,
    notes: [
      {
        content: 'Interés alto. Entregaron contexto de usuarios y flujo principal.',
        createdAtOffsetDays: 8,
      },
      {
        content: 'Piden propuesta por etapas con alcance de MVP y roadmap.',
        createdAtOffsetDays: 6,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 8 },
      { fromStatus: 'contacted', toStatus: 'qualified', createdAtOffsetDays: 6 },
    ],
  },
  {
    name: '[DEMO] Sistema Interno Operaciones',
    email: 'sistema.operaciones@example.com',
    phone: '+54 9 11 2000 0003',
    businessType: 'Distribuidora mayorista',
    serviceInterest: 'Sistema web a medida',
    message: 'Necesitamos ordenar procesos internos: pedidos, stock y seguimiento comercial en un solo sistema web.',
    source: 'chat',
    status: 'contacted',
    createdAtOffsetDays: 7,
    notes: [
      {
        content: 'Detectado dolor operativo fuerte en seguimiento manual de pedidos.',
        createdAtOffsetDays: 6,
      },
      {
        content: 'Pendiente workshop para mapear proceso actual.',
        createdAtOffsetDays: 5,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 6 },
    ],
  },
  {
    name: '[DEMO] Dashboard Ejecutivo',
    email: 'dashboard.ejecutivo@example.com',
    phone: '+54 9 11 2000 0004',
    businessType: 'Agencia comercial',
    serviceInterest: 'Dashboard / panel interno',
    message: 'Queremos un dashboard ejecutivo para ver performance comercial, pipeline y evolución de conversiones.',
    source: 'contact_form',
    status: 'proposal',
    createdAtOffsetDays: 12,
    notes: [
      {
        content: 'Propuesta enviada con alcance de panel, métricas clave y filtros por equipo.',
        createdAtOffsetDays: 3,
      },
      {
        content: 'Esperando feedback final sobre presupuesto de implementación.',
        createdAtOffsetDays: 2,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 11 },
      { fromStatus: 'contacted', toStatus: 'qualified', createdAtOffsetDays: 9 },
      { fromStatus: 'qualified', toStatus: 'proposal', createdAtOffsetDays: 4 },
    ],
  },
  {
    name: '[DEMO] IA Automatización',
    email: 'ia.automatizacion@example.com',
    phone: '+54 9 11 2000 0005',
    businessType: 'Call center de servicios',
    serviceInterest: 'IA aplicada al negocio',
    message:
      'Nos interesa aplicar IA y automatización para clasificar consultas y mejorar tiempos de seguimiento sin perder control humano del proceso.',
    source: 'diagnosis',
    status: 'qualified',
    createdAtOffsetDays: 10,
    notes: [
      {
        content: 'Interés alto en IA local/controlada. Alinear expectativas por fases.',
        createdAtOffsetDays: 9,
      },
      {
        content: 'Se recomendó base de datos limpia y proceso de seguimiento antes de automatizar.',
        createdAtOffsetDays: 7,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 9 },
      { fromStatus: 'contacted', toStatus: 'qualified', createdAtOffsetDays: 7 },
    ],
  },
  {
    name: '[DEMO] SEO Marketing',
    email: 'seo.marketing@example.com',
    phone: null,
    businessType: 'Estudio jurídico',
    serviceInterest: 'SEO / marketing digital',
    message: 'Queremos mejorar visibilidad orgánica y calidad de consultas en nuestra web.',
    source: 'contact_form',
    status: 'new',
    createdAtOffsetDays: 2,
    notes: [
      {
        content: 'Lead frío inicial. Falta información de presupuesto.',
        createdAtOffsetDays: 1,
      },
    ],
  },
  {
    name: '[DEMO] No Estoy Seguro',
    email: 'no.seguro@example.com',
    phone: null,
    businessType: 'Pequeño comercio',
    serviceInterest: 'No estoy seguro (quiero orientación)',
    message: 'No sé qué necesito todavía.',
    source: 'chat',
    status: 'new',
    createdAtOffsetDays: 1,
    notes: [
      {
        content: 'Mensaje corto. Recomendado diagnóstico inicial por alcance.',
        createdAtOffsetDays: 1,
      },
    ],
  },
  {
    name: '[DEMO] Lead Archivado',
    email: 'lead.archivado@example.com',
    phone: '+54 9 11 2000 0008',
    businessType: 'E-commerce nicho',
    serviceInterest: 'Landing comercial',
    message: 'Consultó por landing pero frenó avance por prioridades internas.',
    source: 'contact_form',
    status: 'archived',
    createdAtOffsetDays: 22,
    notes: [
      {
        content: 'No respondió luego de 3 intentos de contacto. Se archiva por ahora.',
        createdAtOffsetDays: 18,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 21 },
      { fromStatus: 'contacted', toStatus: 'archived', createdAtOffsetDays: 18 },
    ],
  },
  {
    name: '[DEMO] Lead Cerrado',
    email: 'lead.cerrado@example.com',
    phone: '+54 9 11 2000 0009',
    businessType: 'Consultora IT',
    serviceInterest: 'Sistema web a medida',
    message: 'Proyecto interno definido; avanzamos con alcance cerrado para desarrollo por etapas.',
    source: 'contact_form',
    status: 'closed',
    createdAtOffsetDays: 30,
    notes: [
      {
        content: 'Cierre comercial demo: alcance aprobado para fase de implementación local.',
        createdAtOffsetDays: 12,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 29 },
      { fromStatus: 'contacted', toStatus: 'qualified', createdAtOffsetDays: 25 },
      { fromStatus: 'qualified', toStatus: 'proposal', createdAtOffsetDays: 20 },
      { fromStatus: 'proposal', toStatus: 'closed', createdAtOffsetDays: 12 },
    ],
  },
  {
    name: '[DEMO] Lead Sin Teléfono',
    email: 'sin.telefono@example.com',
    phone: null,
    businessType: 'Academia online',
    serviceInterest: 'Sitio web profesional',
    message: 'Queremos mejorar presencia digital con sitio moderno y ordenado para nuevos alumnos.',
    source: 'contact_form',
    status: 'new',
    createdAtOffsetDays: 3,
    notes: [
      {
        content: 'Tiene email válido, falta canal de WhatsApp para seguimiento rápido.',
        createdAtOffsetDays: 2,
      },
    ],
  },
  {
    name: '[DEMO] Lead Solo WhatsApp',
    email: null,
    phone: '+54 9 11 2000 0011',
    businessType: 'Servicio técnico',
    serviceInterest: 'Automatización comercial',
    message: 'Solo uso WhatsApp. Quiero ordenar seguimiento comercial y no perder consultas.',
    source: 'chat',
    status: 'contacted',
    createdAtOffsetDays: 5,
    notes: [
      {
        content: 'Prefiere contacto por WhatsApp manual. Interés en mejoras de proceso.',
        createdAtOffsetDays: 4,
      },
      {
        content: 'No respondió a último mensaje, reintentar en 72 horas.',
        createdAtOffsetDays: 2,
      },
    ],
    statusHistory: [
      { fromStatus: 'new', toStatus: 'contacted', createdAtOffsetDays: 4 },
    ],
  },
];

async function seedLocalDemoData() {
  const existingDemoCount = await prisma.lead.count({
    where: {
      name: {
        startsWith: '[DEMO]',
      },
    },
  });

  if (existingDemoCount > 0) {
    const deleted = await prisma.lead.deleteMany({
      where: {
        name: {
          startsWith: '[DEMO]',
        },
      },
    });

    console.info(`[seed-local] Eliminados ${deleted.count} leads DEMO previos.`);
  } else {
    console.info('[seed-local] No había leads DEMO previos para limpiar.');
  }

  for (const demoLead of demoLeads) {
    const createdAt = daysAgo(demoLead.createdAtOffsetDays);

    const latestTimelineOffsets = [
      demoLead.createdAtOffsetDays,
      ...(demoLead.notes?.map((note) => note.updatedAtOffsetDays ?? note.createdAtOffsetDays) ?? []),
      ...(demoLead.statusHistory?.map((item) => item.createdAtOffsetDays) ?? []),
    ];

    const updatedAt = daysAgo(Math.min(...latestTimelineOffsets));

    await prisma.lead.create({
      data: {
        name: demoLead.name,
        email: demoLead.email ?? null,
        phone: demoLead.phone ?? null,
        businessType: demoLead.businessType ?? null,
        serviceInterest: demoLead.serviceInterest,
        message: demoLead.message,
        source: demoLead.source,
        status: demoLead.status,
        createdAt,
        updatedAt,
        notes: demoLead.notes?.length
          ? {
              create: demoLead.notes.map((note) => ({
                content: note.content,
                createdAt: daysAgo(note.createdAtOffsetDays),
                updatedAt: daysAgo(note.updatedAtOffsetDays ?? note.createdAtOffsetDays),
              })),
            }
          : undefined,
        statusHistory: demoLead.statusHistory?.length
          ? {
              create: demoLead.statusHistory.map((statusTransition) => ({
                fromStatus: statusTransition.fromStatus,
                toStatus: statusTransition.toStatus,
                createdAt: daysAgo(statusTransition.createdAtOffsetDays),
              })),
            }
          : undefined,
      },
    });
  }

  const createdDemoCount = await prisma.lead.count({
    where: {
      name: {
        startsWith: '[DEMO]',
      },
    },
  });

  console.info(`[seed-local] Seed completo. Leads DEMO activos: ${createdDemoCount}`);
}

seedLocalDemoData()
  .catch((error) => {
    console.error('[seed-local] Error al crear demo data local.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
