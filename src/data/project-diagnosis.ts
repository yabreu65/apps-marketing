import type { DiagnosisQuestion } from '@/types/diagnosis';

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 'goal',
    title: '¿Qué quieres lograr?',
    options: [
      { id: 'goal-leads', label: 'Captar más consultas', value: 'leads' },
      { id: 'goal-web', label: 'Tener una web profesional', value: 'web' },
      { id: 'goal-system', label: 'Ordenar procesos internos', value: 'system' },
      { id: 'goal-saas', label: 'Validar una idea SaaS', value: 'saas' },
      { id: 'goal-automation', label: 'Automatizar tareas', value: 'automation' },
      { id: 'goal-ai', label: 'Aplicar IA al negocio', value: 'ai' },
      { id: 'goal-unsure', label: 'No estoy seguro', value: 'unsure' },
    ],
  },
  {
    id: 'stage',
    title: '¿En qué etapa estás?',
    options: [
      { id: 'stage-idea', label: 'Idea inicial', value: 'idea' },
      { id: 'stage-running', label: 'Negocio funcionando', value: 'running' },
      { id: 'stage-manual', label: 'Tengo clientes pero procesos manuales', value: 'manual' },
      { id: 'stage-noconvert', label: 'Tengo una web pero no convierte', value: 'noconvert' },
      { id: 'stage-scale', label: 'Quiero escalar', value: 'scale' },
    ],
  },
  {
    id: 'urgency',
    title: '¿Qué urgencia tienes?',
    options: [
      { id: 'urgency-now', label: 'Este mes', value: 'now' },
      { id: 'urgency-soon', label: 'Próximos 2-3 meses', value: 'soon' },
      { id: 'urgency-explore', label: 'Estoy explorando', value: 'explore' },
    ],
  },
];
