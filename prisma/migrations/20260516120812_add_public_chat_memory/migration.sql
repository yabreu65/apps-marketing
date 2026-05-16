-- CreateTable
CREATE TABLE "PublicChatVisitor" (
    "id" TEXT NOT NULL,
    "visitorKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicChatVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicChatSession" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicVisitorMemory" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "summary" TEXT,
    "interests" JSONB,
    "lastTopic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicVisitorMemory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicChatVisitor_visitorKey_key" ON "PublicChatVisitor"("visitorKey");

-- CreateIndex
CREATE INDEX "PublicChatSession_visitorId_createdAt_idx" ON "PublicChatSession"("visitorId", "createdAt");

-- CreateIndex
CREATE INDEX "PublicChatMessage_sessionId_createdAt_idx" ON "PublicChatMessage"("sessionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PublicVisitorMemory_visitorId_key" ON "PublicVisitorMemory"("visitorId");

-- AddForeignKey
ALTER TABLE "PublicChatSession" ADD CONSTRAINT "PublicChatSession_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "PublicChatVisitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicChatMessage" ADD CONSTRAINT "PublicChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PublicChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicVisitorMemory" ADD CONSTRAINT "PublicVisitorMemory_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "PublicChatVisitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
