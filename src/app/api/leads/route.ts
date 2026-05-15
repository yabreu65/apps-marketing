import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { normalizeLeadPayload, validateLeadPayload } from '@/lib/lead-validation';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse('Payload JSON inválido.', 400);
  }

  const payload = normalizeLeadPayload(body);
  const errors = validateLeadPayload(payload);

  if (errors.length > 0) {
    return errorResponse('No pudimos validar tu consulta. Revisá los campos e intentá nuevamente.', 400, errors);
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

    return successResponse(
      {
        message: 'Consulta recibida correctamente. Te contactaremos de forma manual.',
        leadId: lead.id,
      },
      201,
    );
  } catch {
    return errorResponse('No pudimos registrar tu consulta en este momento. Intentá nuevamente.', 500);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['POST']);
}
