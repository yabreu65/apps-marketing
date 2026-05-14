import { NextResponse } from 'next/server';

import { normalizeLeadPayload, validateLeadPayload } from '@/lib/lead-validation';
import type { LeadApiResponse } from '@/types/lead';

function createLeadId() {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const response: LeadApiResponse = {
      ok: false,
      message: 'Payload JSON inválido.',
    };
    return NextResponse.json(response, { status: 400 });
  }

  const payload = normalizeLeadPayload(body);
  const errors = validateLeadPayload(payload);

  if (errors.length > 0) {
    const response: LeadApiResponse = {
      ok: false,
      message: 'No pudimos validar tu consulta. Revisá los campos e intentá nuevamente.',
      errors,
    };
    return NextResponse.json(response, { status: 400 });
  }

  const response: LeadApiResponse = {
    ok: true,
    message: 'Consulta recibida correctamente. Te contactaremos de forma manual.',
    leadId: createLeadId(),
  };

  return NextResponse.json(response, { status: 201 });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message: 'Método no permitido.',
    },
    {
      status: 405,
      headers: { Allow: 'POST' },
    },
  );
}
