# Public Lead Assistant with Local Memory — Proposed Data Model

## Resumen

Modelo propuesto para conversaciones públicas con memoria local. Esta fase es solo especificación; no aplica migraciones.

## Modelos propuestos

1. `PublicChatVisitor`
2. `PublicChatSession`
3. `PublicChatMessage`
4. `PublicVisitorMemory`

## Propuesta de campos

### PublicChatVisitor
- `id: String @id @default(cuid())`
- `visitorKey: String @unique`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`

### PublicChatSession
- `id: String @id @default(cuid())`
- `visitorId: String`
- `visitor: PublicChatVisitor`
- `status: String` (e.g. `active`, `closed`)
- `startedAt: DateTime @default(now())`
- `endedAt: DateTime?`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`

### PublicChatMessage
- `id: String @id @default(cuid())`
- `sessionId: String`
- `session: PublicChatSession`
- `role: String` (`visitor` | `assistant`)
- `content: String`
- `intent: String?`
- `createdAt: DateTime @default(now())`

### PublicVisitorMemory
- `id: String @id @default(cuid())`
- `visitorId: String @unique`
- `visitor: PublicChatVisitor`
- `summary: String`
- `interests: Json`
- `lastTopic: String?`
- `lastIntent: String?`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`

## Relaciones sugeridas

- `PublicChatVisitor 1:N PublicChatSession`
- `PublicChatSession 1:N PublicChatMessage`
- `PublicChatVisitor 1:1 PublicVisitorMemory`

## Índices recomendados

- `PublicChatVisitor(visitorKey)` único.
- `PublicChatSession(visitorId, startedAt)`.
- `PublicChatMessage(sessionId, createdAt)`.
- `PublicVisitorMemory(visitorId)` único.

## Notas de diseño

- `interests` en JSON permite evolucionar taxonomía sin migración inmediata.
- `summary` corto evita almacenar historial literal completo en memoria persistida.
- `role/content` simple facilita tests y observabilidad.

## Fuera de fase

- No aplicar schema.
- No crear migraciones.
- No persistir producción.
