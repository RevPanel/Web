/*
  Warnings:

  - You are about to drop the `CheckoutSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckoutSession" DROP CONSTRAINT "CheckoutSession_userId_fkey";

-- DropTable
DROP TABLE "CheckoutSession";
