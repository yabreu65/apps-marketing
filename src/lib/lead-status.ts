export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'closed', 'archived'] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && LEAD_STATUSES.includes(value as LeadStatus);
}

export function getLeadStatusLabel(status: string): string {
  switch (status) {
    case 'new':
      return 'Nuevo';
    case 'contacted':
      return 'Contactado';
    case 'qualified':
      return 'Calificado';
    case 'proposal':
      return 'Propuesta';
    case 'closed':
      return 'Cerrado';
    case 'archived':
      return 'Archivado';
    default:
      return status;
  }
}

export function getLeadStatusBadgeClass(status: string): string {
  switch (status) {
    case 'new':
      return 'border-orange-500/40 bg-orange-500/15 text-orange-100';
    case 'contacted':
      return 'border-sky-500/40 bg-sky-500/15 text-sky-100';
    case 'qualified':
      return 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100';
    case 'proposal':
      return 'border-violet-500/40 bg-violet-500/15 text-violet-100';
    case 'closed':
      return 'border-teal-500/40 bg-teal-500/15 text-teal-100';
    case 'archived':
      return 'border-slate-500/40 bg-slate-500/15 text-slate-200';
    default:
      return 'border-slate-500/40 bg-slate-500/15 text-slate-200';
  }
}
