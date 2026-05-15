import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { validateLeadNoteContent } from '@/lib/lead-note-validation';
import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Ruta de notas internas para pruebas locales.
 * Debe protegerse con autenticación/autorización antes de producción.
 */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id || id.length < 10) {
      return errorResponse('ID de lead inválido.', 400);
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

    return successResponse({ notes });
  } catch {
    return errorResponse('No se pudieron listar las notas.', 500);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id || id.length < 10) {
      return errorResponse('ID de lead inválido.', 400);
    }

    const body = (await request.json()) as { content?: unknown };
    const noteValidation = validateLeadNoteContent(body.content);

    if (!noteValidation.ok) {
      return errorResponse(noteValidation.message ?? 'No se pudo validar la nota.', 400);
    }

    const leadExists = await prisma.lead.findUnique({ where: { id }, select: { id: true } });

    if (!leadExists) {
      return errorResponse('Lead no encontrado.', 404);
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

    return successResponse({ note, message: 'Nota interna guardada correctamente.' }, 201);
  } catch {
    return errorResponse('No se pudo crear la nota.', 500);
  }
}

export async function PATCH() {
  return methodNotAllowedResponse(['GET', 'POST']);
}
