import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    create: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

import { GET, POST } from '@/app/api/leads/route';

describe('POST /api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responde 201 con payload válido y leadId', async () => {
    prismaMock.lead.create.mockResolvedValueOnce({ id: 'lead_123' });

    const request = createJsonRequest('http://localhost:3000/api/leads', 'POST', {
      name: 'Juan Pérez',
      email: 'juan@test.com',
      phone: '',
      businessType: 'Clínica',
      serviceInterest: 'Landing comercial',
      message: 'Necesito captar más consultas para mi negocio.',
      source: 'contact_form',
    });

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; leadId?: string }>(response);

    expect(response.status).toBe(201);
    expect(data.ok).toBe(true);
    expect(data.leadId).toBe('lead_123');
    expect(prismaMock.lead.create).toHaveBeenCalledOnce();
  });

  it('responde 400 cuando el JSON es inválido', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{invalid-json',
    });

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('JSON');
  });

  it('responde 400 con errors cuando el payload es inválido', async () => {
    const request = createJsonRequest('http://localhost:3000/api/leads', 'POST', {
      name: '',
      email: 'bad-email',
      phone: '',
      businessType: 'x'.repeat(121),
      serviceInterest: 'Landing comercial',
      message: 'hola',
      source: 'contact_form',
    });

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; errors?: Array<{ field: string }> }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(Array.isArray(data.errors)).toBe(true);
    expect(data.errors?.some((error) => error.field === 'name')).toBe(true);
    expect(data.errors?.some((error) => error.field === 'message')).toBe(true);
  });

  it('responde 500 genérico cuando falla DB', async () => {
    prismaMock.lead.create.mockRejectedValueOnce(new Error('db down'));

    const request = createJsonRequest('http://localhost:3000/api/leads', 'POST', {
      name: 'Ana',
      email: 'ana@test.com',
      phone: '',
      businessType: 'Ecommerce',
      serviceInterest: 'Sitio web profesional',
      message: 'Necesito mejorar mi presencia digital y conversiones.',
      source: 'contact_form',
    });

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; message: string; stack?: string }>(response);

    expect(response.status).toBe(500);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('No pudimos registrar tu consulta');
    expect(data.stack).toBeUndefined();
  });

  it('GET responde 405 método no permitido', async () => {
    const response = await GET();
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
    expect(data.ok).toBe(false);
  });
});
