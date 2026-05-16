import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import {
  getPublicChatStateByVisitorKey,
  processPersistentPublicChatTurn,
} from '@/modules/lead-assistant/server/public-chat-service';
import type { PublicChatTurnRequest } from '@/modules/lead-assistant/types/lead-assistant';

export async function GET(request: Request) {
  const headers = internalNoStoreHeaders();

  try {
    const { searchParams } = new URL(request.url);
    const visitorKey = searchParams.get('visitorKey')?.trim() ?? '';

    if (!visitorKey) {
      return errorResponse('visitorKey es requerido.', 400, undefined, headers);
    }

    const state = await getPublicChatStateByVisitorKey(visitorKey);

    return successResponse(
      {
        message: 'Estado de chat cargado correctamente.',
        state,
      },
      200,
      headers,
    );
  } catch {
    return errorResponse('No se pudo cargar el chat público.', 500, undefined, headers);
  }
}

export async function POST(request: Request) {
  const headers = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return errorResponse('Payload JSON inválido.', 400, undefined, headers);
    }

    const payload = (body && typeof body === 'object' ? body : {}) as Partial<PublicChatTurnRequest>;
    const visitorKey = `${payload.visitorKey ?? ''}`.trim();
    const message = `${payload.message ?? ''}`.trim();

    if (!visitorKey) {
      return errorResponse('visitorKey es requerido.', 400, undefined, headers);
    }

    if (!message) {
      return errorResponse('El mensaje es obligatorio.', 400, undefined, headers);
    }

    const result = await processPersistentPublicChatTurn({ visitorKey, message });

    return successResponse(
      {
        message: 'Respuesta generada correctamente.',
        state: result.state,
        reply: result.reply,
        suggestedActions: result.reply.ctas,
      },
      200,
      headers,
    );
  } catch {
    return errorResponse('No se pudo procesar el chat público.', 500, undefined, headers);
  }
}

export async function PATCH() {
  return methodNotAllowedResponse(['GET', 'POST'], internalNoStoreHeaders());
}
