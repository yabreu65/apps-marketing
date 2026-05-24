import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { requireInternalAdminAccess } from '@/lib/internal-admin-auth';
import { internalNoStoreHeaders } from '@/lib/internal-security';
import { validateLeadNoteContent } from '@/lib/lead-note-validation';
import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Ruta de notas internas para pruebas locales.
 * Debe protegerse con autenticación/autorización antes de producción.
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

    const notes = await prisma.leadNote.findMany({
      where: { leadId: id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse({ notes }, 200, headers);
  } catch {
    return errorResponse('No se pudieron listar las notas.', 500, undefined, headers);
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

    const body = (await request.json()) as { content?: unknown };
    const noteValidation = validateLeadNoteContent(body.content);

    if (!noteValidation.ok) {
      return errorResponse(noteValidation.message ?? 'No se pudo validar la nota.', 400, undefined, headers);
    }

    const leadExists = await prisma.lead.findUnique({ where: { id }, select: { id: true } });

    if (!leadExists) {
      return errorResponse('Lead no encontrado.', 404, undefined, headers);
    }

    const note = await prisma.leadNote.create({
      data: {
        leadId: id,
        content: noteValidation.content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse({ note, message: 'Nota interna guardada correctamente.' }, 201, headers);
  } catch {
    return errorResponse('No se pudo crear la nota.', 500, undefined, headers);
  }
}

export async function PATCH() {
  return methodNotAllowedResponse(['GET', 'POST'], internalNoStoreHeaders());
}
