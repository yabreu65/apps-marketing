import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { isAllowedPublicApiRequest } from '@/lib/public-security';
import { normalizeLeadPayload, validateLeadPayload } from '@/lib/lead-validation';
import { prisma } from '@/lib/prisma';

const CONTACT_FORM_RATE_LIMIT_MAX_ATTEMPTS = 8;
const CONTACT_FORM_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type PublicLeadRateRecord = {
  attempts: number[];
};

const attemptsByKey = new Map<string, PublicLeadRateRecord>();

function getPublicRateLimitKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  return 'unknown';
}

function isRateLimited(request: Request) {
  const key = getPublicRateLimitKey(request);
  const now = Date.now();
  const record = attemptsByKey.get(key) ?? { attempts: [] };
  record.attempts = record.attempts.filter((value) => now - value <= CONTACT_FORM_RATE_LIMIT_WINDOW_MS);

  if (record.attempts.length >= CONTACT_FORM_RATE_LIMIT_MAX_ATTEMPTS) {
    attemptsByKey.set(key, record);
    return true;
  }

  record.attempts.push(now);
  attemptsByKey.set(key, record);
  return false;
}

export async function POST(request: Request) {
  if (!isAllowedPublicApiRequest(request)) {
    return errorResponse('Solicitud de origen inválida.', 403);
  }

  if (isRateLimited(request)) {
    return errorResponse('Demasiadas solicitudes. Intentá nuevamente en unos minutos.', 429);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse('Payload JSON inválido.', 400);
  }

  const payload = normalizeLeadPayload(body);
  const honeypot = String((body as Record<string, unknown>)?.website ?? '').trim();

  if (honeypot.length > 0) {
    return successResponse(
      {
        message: 'Consulta recibida correctamente. Te contactaremos de forma manual.',
      },
      202,
    );
  }

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
