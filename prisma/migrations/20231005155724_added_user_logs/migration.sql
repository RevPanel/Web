-- CreateEnum
CREATE TYPE "UserAction" AS ENUM ('LOGIN', 'REGISTER', 'CREATE_SEVRER');

-- CreateTable
CREATE TABLE "UserLogs" (
    "id" SERIAL NOT NULL,
    "action" "UserAction" NOT NULL,
    "data" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLogs" ADD CONSTRAINT "UserLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
