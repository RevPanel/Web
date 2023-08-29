/*
  Warnings:

  - Added the required column `status` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InstallStatus" AS ENUM ('STARTED', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "InstallStatus" NOT NULL;
