/*
  Warnings:

  - You are about to drop the column `requester` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `requester` on the `tripreq` table. All the data in the column will be lost.
  - Added the required column `requesterId` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `tripreq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trip" DROP COLUMN "requester",
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tripreq" DROP COLUMN "requester",
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "requester" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "requester_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "requester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tripreq" ADD CONSTRAINT "tripreq_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "requester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
