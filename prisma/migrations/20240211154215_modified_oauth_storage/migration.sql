/*
  Warnings:

  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_github_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_id";

-- CreateTable
CREATE TABLE "OauthAccount" (
    "providerId" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OauthAccount_pkey" PRIMARY KEY ("providerId","providerUserId")
);

-- AddForeignKey
ALTER TABLE "OauthAccount" ADD CONSTRAINT "OauthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
