/*
  Warnings:

  - Added the required column `address` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "user_agent" TEXT NOT NULL;
