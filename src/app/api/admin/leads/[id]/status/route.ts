import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import { isLeadStatus, LEAD_STATUSES } from '@/lib/lead-status';
import { prisma } from '@/lib/prisma';

type TransactionClient = Omit<
  typeof prisma,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

/**
 * INTERNAL/LOCAL ONLY:
 * Esta ruta es para pruebas internas del dashboard local.
 * Debe protegerse con autenticación/autorización antes de producción.
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
    }

    const { id } = await params;

    if (!id || id.length < 10) {
      return errorResponse('ID de lead inválido.', 400, undefined, headers);
    }

    const body = (await request.json()) as { status?: unknown };

    if (!isLeadStatus(body?.status)) {
      return errorResponse('Estado inválido.', 400, { allowedStatuses: LEAD_STATUSES }, headers);
    }

    const nextStatus = body.status;

    const lead = await prisma.lead.findUnique({ where: { id }, select: { id: true, status: true } });

    if (!lead) {
      return errorResponse('Lead no encontrado.', 404, undefined, headers);
    }

    const updated = await prisma.$transaction(async (tx: TransactionClient) => {
      const next = await tx.lead.update({
        where: { id },
        data: { status: nextStatus },
        select: { id: true, status: true, updatedAt: true },
      });

      if (lead.status !== nextStatus) {
        await tx.leadStatusHistory.create({
          data: {
            leadId: id,
            fromStatus: lead.status,
            toStatus: nextStatus,
          },
        });
      }

      return next;
    });

    return successResponse({ lead: updated, message: 'Estado actualizado correctamente.' }, 200, headers);
  } catch {
    return errorResponse('No se pudo actualizar el estado del lead.', 500, undefined, headers);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['PATCH'], internalNoStoreHeaders());
}
