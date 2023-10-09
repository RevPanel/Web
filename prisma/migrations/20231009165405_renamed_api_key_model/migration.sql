/*
  Warnings:

  - You are about to drop the `APIKey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "APIKey" DROP CONSTRAINT "APIKey_ownerId_fkey";

-- DropTable
DROP TABLE "APIKey";

-- CreateTable
CREATE TABLE "ApiKey" (
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ips" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
