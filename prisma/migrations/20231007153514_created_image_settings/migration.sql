-- CreateTable
CREATE TABLE "ImageConfiguration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "homepage" TEXT,
    "mountPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "environments" TEXT[],
    "dockerImage" TEXT NOT NULL,

    CONSTRAINT "ImageConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagePort" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "publicPort" INTEGER NOT NULL,
    "containerPort" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "ImagePort_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagePort" ADD CONSTRAINT "ImagePort_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ImageConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
