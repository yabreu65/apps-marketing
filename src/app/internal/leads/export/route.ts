import { errorResponse, methodNotAllowedResponse } from '@/lib/api-response';
import { buildLeadWhereInput, extractLeadFiltersFromUrl } from '@/lib/lead-dashboard-filters';
import { buildLeadsCsv, buildLeadsCsvFilename } from '@/lib/lead-csv';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * INTERNAL/LOCAL ONLY:
 * Exporta CSV del corte actual del dashboard interno.
 * Antes de producción debe reforzarse con auth/autorización completa y controles adicionales.
 */
export async function GET(request: Request) {
  const noStoreHeaders = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, noStoreHeaders);
    }

    const url = new URL(request.url);
    const filters = extractLeadFiltersFromUrl(url);
    const where = buildLeadWhereInput(filters);

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        businessType: true,
        serviceInterest: true,
        source: true,
        status: true,
        message: true,
        createdAt: true,
      },
    });

    const csv = buildLeadsCsv(leads);
    const filename = buildLeadsCsvFilename();
    const headers = new Headers({
      ...noStoreHeaders,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      'X-Content-Type-Options': 'nosniff',
    });

    return new Response(csv, {
      status: 200,
      headers,
    });
  } catch {
    return errorResponse('No se pudo exportar el CSV en este momento.', 500, undefined, noStoreHeaders);
  }
}

export async function POST() {
  return methodNotAllowedResponse(['GET'], internalNoStoreHeaders());
}
