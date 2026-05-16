-- CreateTable
CREATE TABLE "LeadConversationMessage" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'whatsapp_simulated',
    "direction" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadConversationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadConversationMessage_leadId_createdAt_idx" ON "LeadConversationMessage"("leadId", "createdAt");

-- AddForeignKey
ALTER TABLE "LeadConversationMessage" ADD CONSTRAINT "LeadConversationMessage_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
