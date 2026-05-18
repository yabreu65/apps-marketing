import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  publicChatVisitor: {
    upsert: vi.fn(),
    findUnique: vi.fn(),
  },
  publicChatSession: {
    findFirst: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
  },
  publicChatMessage: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
  publicVisitorMemory: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
    deleteMany: vi.fn(),
  },
  $transaction: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.mock('@/modules/lead-assistant/agent/public-sales-agent', () => ({
  resolvePublicSalesAgentReply: vi.fn(async ({ baseReply }) => ({
    source: 'rules',
    summary: '',
    leadAction: 'none',
    reply: { ...baseReply, source: 'rules' },
  })),
}));

import {
  clearPublicChatMemoryByVisitorKey,
  getPublicChatStateByVisitorKey,
  processPersistentPublicChatTurn,
} from '@/modules/lead-assistant/server/public-chat-service';

describe('public-chat-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    prismaMock.$transaction.mockImplementation(async (callback: (tx: typeof prismaMock) => unknown) => callback(prismaMock));
  });

  it('getPublicChatStateByVisitorKey crea sesión inicial y devuelve estado', async () => {
    prismaMock.publicChatVisitor.upsert.mockResolvedValueOnce({ id: 'visitor_db_1' });
    prismaMock.publicChatSession.findFirst.mockResolvedValueOnce(null);
    prismaMock.publicChatSession.create.mockResolvedValueOnce({ id: 'session_1' });
    prismaMock.publicVisitorMemory.findUnique.mockResolvedValueOnce(null);
    prismaMock.publicChatMessage.findMany.mockResolvedValueOnce([
      {
        id: 'msg_1',
        role: 'assistant',
        content: 'Hola',
        createdAt: new Date('2026-05-16T00:00:00Z'),
      },
    ]);

    const state = await getPublicChatStateByVisitorKey('visitor-abc');

    expect(state.visitorKey).toBe('visitor-abc');
    expect(state.messages[0].content).toContain('Hola');
  });

  it('processPersistentPublicChatTurn procesa mensaje y persiste memoria', async () => {
    prismaMock.publicChatVisitor.upsert.mockResolvedValue({ id: 'visitor_db_1' });
    prismaMock.publicChatSession.findFirst.mockResolvedValue({ id: 'session_1' });
    prismaMock.publicVisitorMemory.findUnique.mockResolvedValue(null);
    prismaMock.publicChatMessage.findMany
      .mockResolvedValueOnce([
        {
          id: 'msg_1',
          role: 'assistant',
          content: 'Hola inicial',
          createdAt: new Date('2026-05-16T00:00:00Z'),
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 'msg_3',
          role: 'assistant',
          content: 'Respuesta',
          createdAt: new Date('2026-05-16T00:02:00Z'),
        },
        {
          id: 'msg_2',
          role: 'visitor',
          content: 'Necesito un dashboard',
          createdAt: new Date('2026-05-16T00:01:00Z'),
        },
      ]);

    const result = await processPersistentPublicChatTurn({
      visitorKey: 'visitor-abc',
      message: 'Necesito un dashboard para priorizar leads',
    });

    expect(prismaMock.publicChatMessage.create).toHaveBeenCalledTimes(2);
    expect(prismaMock.publicVisitorMemory.upsert).toHaveBeenCalled();
    expect(result.reply.intent).toBe('dashboard');
    expect(result.state.messages.length).toBeGreaterThan(0);
  });

  it('clearPublicChatMemoryByVisitorKey borra memoria y sesiones del visitante', async () => {
    prismaMock.publicChatVisitor.findUnique.mockResolvedValueOnce({ id: 'visitor_db_1' });

    await clearPublicChatMemoryByVisitorKey('visitor-abc');

    expect(prismaMock.publicVisitorMemory.deleteMany).toHaveBeenCalledWith({ where: { visitorId: 'visitor_db_1' } });
    expect(prismaMock.publicChatSession.deleteMany).toHaveBeenCalledWith({ where: { visitorId: 'visitor_db_1' } });
  });
});
