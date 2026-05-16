import type { LeadStatus } from '@/lib/lead-status';

type LeadCsvInput = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  businessType: string | null;
  serviceInterest: string;
  source: string;
  status: LeadStatus | string;
  message: string;
  createdAt: Date;
};

function escapeCsvCell(value: string) {
  if (/[",\n\r;]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

function formatCell(value: string | number | null | undefined) {
  if (value === null || value === undefined) return '';
  return escapeCsvCell(String(value));
}

export function buildLeadsCsv(leads: LeadCsvInput[]) {
  const headers = [
    'id',
    'nombre',
    'email',
    'telefono',
    'tipo_negocio',
    'servicio_interes',
    'fuente',
    'estado',
    'fecha_creacion_iso',
    'mensaje',
  ];

  const lines = [headers.join(',')];

  for (const lead of leads) {
    const row = [
      formatCell(lead.id),
      formatCell(lead.name),
      formatCell(lead.email),
      formatCell(lead.phone),
      formatCell(lead.businessType),
      formatCell(lead.serviceInterest),
      formatCell(lead.source),
      formatCell(lead.status),
      formatCell(lead.createdAt.toISOString()),
      formatCell(lead.message),
    ];

    lines.push(row.join(','));
  }

  return `\uFEFF${lines.join('\n')}`;
}

export function buildLeadsCsvFilename() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');

  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const sec = pad(now.getSeconds());

  return `leads-export-${yyyy}${mm}${dd}-${hh}${min}${sec}.csv`;
}
