import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { internalNoStoreHeaders } from '@/lib/internal-security';
import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Esta ruta se usa para revisión local de leads.
 * Antes de producción debe protegerse con autenticación/autorización.
 */
export async function GET() {
  const headers = internalNoStoreHeaders();

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        businessType: true,
        serviceInterest: true,
        message: true,
        source: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse({ leads }, 200, headers);
  } catch {
    return errorResponse('No se pudieron listar los leads en este momento.', 500, undefined, headers);
  }
}

export async function POST() {
  return methodNotAllowedResponse(['GET'], internalNoStoreHeaders());
}
