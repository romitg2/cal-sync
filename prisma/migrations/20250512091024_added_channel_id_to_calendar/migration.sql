-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "GoogleChannelId" TEXT;

-- CreateIndex
CREATE INDEX "Calendar_GoogleChannelId_idx" ON "Calendar"("GoogleChannelId");
