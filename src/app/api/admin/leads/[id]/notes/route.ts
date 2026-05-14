import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

/**
 * INTERNAL/LOCAL ONLY:
 * Ruta de notas internas para pruebas locales.
 * Debe protegerse con autenticación/autorización antes de producción.
 */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

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

    return NextResponse.json({ ok: true, notes }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, message: 'No se pudieron listar las notas.' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { content?: unknown };

    if (typeof body.content !== 'string') {
      return NextResponse.json({ ok: false, message: 'El contenido de la nota es requerido.' }, { status: 400 });
    }

    const content = body.content.trim();

    if (content.length < 3 || content.length > 1000) {
      return NextResponse.json(
        { ok: false, message: 'La nota debe tener entre 3 y 1000 caracteres.' },
        { status: 400 },
      );
    }

    const leadExists = await prisma.lead.findUnique({ where: { id }, select: { id: true } });

    if (!leadExists) {
      return NextResponse.json({ ok: false, message: 'Lead no encontrado.' }, { status: 404 });
    }

    const note = await prisma.leadNote.create({
      data: {
        leadId: id,
        content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ ok: true, note }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: 'No se pudo crear la nota.' }, { status: 500 });
  }
}
