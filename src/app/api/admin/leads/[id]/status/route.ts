import { NextResponse } from 'next/server';

import { isLeadStatus } from '@/lib/lead-status';
import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Esta ruta es para pruebas internas del dashboard local.
 * Debe protegerse con autenticación/autorización antes de producción.
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: unknown };

    if (!isLeadStatus(body?.status)) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Status inválido.',
          allowedStatuses: ['new', 'contacted', 'qualified', 'proposal', 'closed', 'archived'],
        },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id }, select: { id: true, status: true } });

    if (!lead) {
      return NextResponse.json({ ok: false, message: 'Lead no encontrado.' }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: { status: body.status },
      select: { id: true, status: true, updatedAt: true },
    });

    return NextResponse.json({ ok: true, lead: updated }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, message: 'No se pudo actualizar el status del lead.' }, { status: 500 });
  }
}
