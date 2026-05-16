import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import { clearPublicChatMemoryByVisitorKey } from '@/modules/lead-assistant/server/public-chat-service';

export async function DELETE(request: Request) {
  const headers = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
    }

    const { searchParams } = new URL(request.url);
    const visitorKey = searchParams.get('visitorKey')?.trim() ?? '';

    if (!visitorKey) {
      return errorResponse('visitorKey es requerido.', 400, undefined, headers);
    }

    await clearPublicChatMemoryByVisitorKey(visitorKey);

    return successResponse(
      {
        message: 'Memoria pública borrada correctamente.',
      },
      200,
      headers,
    );
  } catch {
    return errorResponse('No se pudo borrar la memoria pública.', 500, undefined, headers);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['DELETE'], internalNoStoreHeaders());
}
