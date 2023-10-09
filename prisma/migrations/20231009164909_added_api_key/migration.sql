/*
  Warnings:

  - You are about to drop the column `publicPort` on the `ImagePort` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImagePort" DROP COLUMN "publicPort";

-- CreateTable
CREATE TABLE "APIKey" (
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ips" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "APIKey_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "APIKey" ADD CONSTRAINT "APIKey_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
