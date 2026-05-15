import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import { buildLeadSummaryWithOptionalAI } from '@/lib/lead-summary-ai';
import { prisma } from '@/lib/prisma';

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
        name: true,
        serviceInterest: true,
        businessType: true,
        message: true,
        source: true,
        status: true,
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: { content: true },
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: { fromStatus: true, toStatus: true, createdAt: true },
        },
      },
    });

    if (!lead) {
      return errorResponse('Lead no encontrado.', 404, undefined, headers);
    }

    const result = await buildLeadSummaryWithOptionalAI(lead);

    return successResponse({ summary: result.summary, source: result.source }, 200, headers);
  } catch {
    return errorResponse('No se pudo regenerar el resumen comercial.', 500, undefined, headers);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['POST'], internalNoStoreHeaders());
}
