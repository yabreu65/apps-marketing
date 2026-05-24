import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { requireInternalAdminAccess } from '@/lib/internal-admin-auth';
import { internalNoStoreHeaders } from '@/lib/internal-security';
import { normalizeLeadConversationPayload, validateLeadConversationPayload } from '@/lib/lead-conversation-validation';
import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Conversación simulada (canal whatsapp_simulated) para pruebas locales del dashboard.
 * Debe protegerse con auth/autorización robusta antes de producción.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = internalNoStoreHeaders();

  try {
    const authError = requireInternalAdminAccess(request, headers, { checkOrigin: false });
    if (authError) return authError;

    const { id } = await params;

    if (!id || id.length < 10) {
      return errorResponse('ID de lead inválido.', 400, undefined, headers);
    }

    const messages = await prisma.leadConversationMessage.findMany({
      where: { leadId: id },
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        leadId: true,
        channel: true,
        direction: true,
        content: true,
        createdAt: true,
      },
    });

    return successResponse({ messages }, 200, headers);
  } catch {
    return errorResponse('No se pudo listar la conversación simulada.', 500, undefined, headers);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = internalNoStoreHeaders();

  try {
    const authError = requireInternalAdminAccess(request, headers);
    if (authError) return authError;

    const { id } = await params;

    if (!id || id.length < 10) {
      return errorResponse('ID de lead inválido.', 400, undefined, headers);
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return errorResponse('Payload JSON inválido.', 400, undefined, headers);
    }

    const payload = normalizeLeadConversationPayload(body);
    const errors = validateLeadConversationPayload(payload);

    if (errors.length > 0) {
      return errorResponse('No se pudo validar el mensaje de conversación.', 400, errors, headers);
    }

    const leadExists = await prisma.lead.findUnique({ where: { id }, select: { id: true } });

    if (!leadExists) {
      return errorResponse('Lead no encontrado.', 404, undefined, headers);
    }

    const message = await prisma.leadConversationMessage.create({
      data: {
        leadId: id,
        channel: payload.channel ?? 'whatsapp_simulated',
        direction: payload.direction,
        content: payload.content,
      },
      select: {
        id: true,
        leadId: true,
        channel: true,
        direction: true,
        content: true,
        createdAt: true,
      },
    });

    return successResponse(
      {
        message: 'Mensaje simulado guardado correctamente.',
        conversationMessage: message,
      },
      201,
      headers,
    );
  } catch {
    return errorResponse('No se pudo guardar el mensaje simulado.', 500, undefined, headers);
  }
}

export async function PATCH() {
  return methodNotAllowedResponse(['GET', 'POST'], internalNoStoreHeaders());
}
