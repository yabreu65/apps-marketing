import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import { buildLeadReplySuggestionWithOptionalAI } from '@/lib/lead-reply-suggestion-ai';
import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Sugerencia de respuesta para conversación simulada.
 * No envía mensajes reales ni crea mensajes outbound automáticamente.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
    }

    const { id } = await params;

    if (!id || id.length < 10) {
      return errorResponse('ID de lead inválido.', 400, undefined, headers);
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        serviceInterest: true,
        businessType: true,
        message: true,
        source: true,
        status: true,
        conversations: {
          orderBy: { createdAt: 'desc' },
          take: 12,
          select: {
            direction: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    if (!lead) {
      return errorResponse('Lead no encontrado.', 404, undefined, headers);
    }

    const result = await buildLeadReplySuggestionWithOptionalAI({
      lead: {
        name: lead.name,
        serviceInterest: lead.serviceInterest,
        businessType: lead.businessType,
        message: lead.message,
        source: lead.source,
        status: lead.status,
      },
      messages: lead.conversations.map((conversation) => ({
        direction: conversation.direction === 'outbound' ? 'outbound' : 'inbound',
        content: conversation.content,
        createdAt: conversation.createdAt,
      })),
    });

    return successResponse(
      {
        message: 'Sugerencia local generada correctamente.',
        suggestion: result.suggestion,
        source: result.source,
      },
      200,
      headers,
    );
  } catch {
    return errorResponse('No se pudo generar la sugerencia local.', 500, undefined, headers);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['POST'], internalNoStoreHeaders());
}
