import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

/**
 * INTERNAL/LOCAL ONLY:
 * Esta ruta se usa para revisión local de leads.
 * Antes de producción debe protegerse con autenticación/autorización.
 */
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
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

    return NextResponse.json({ ok: true, leads }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "No se pudieron listar los leads en este momento.",
      },
      { status: 500 },
    );
  }
}
