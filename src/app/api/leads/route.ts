import { NextResponse } from 'next/server';

import { normalizeLeadPayload, validateLeadPayload } from '@/lib/lead-validation';
import { prisma } from '@/lib/prisma';
import type { LeadApiResponse } from '@/types/lead';

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

  try {
    const lead = await prisma.lead.create({
      data: {
        name: payload.name,
        email: payload.email || null,
        phone: payload.phone || null,
        businessType: payload.businessType || null,
        serviceInterest: payload.serviceInterest,
        message: payload.message,
        source: payload.source,
        status: 'new',
      },
      select: { id: true },
    });

    const response: LeadApiResponse = {
      ok: true,
      message: 'Consulta recibida correctamente. Te contactaremos de forma manual.',
      leadId: lead.id,
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: LeadApiResponse = {
      ok: false,
      message: 'No pudimos registrar tu consulta en este momento. Intentá nuevamente.',
    };

    return NextResponse.json(response, { status: 500 });
  }
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
