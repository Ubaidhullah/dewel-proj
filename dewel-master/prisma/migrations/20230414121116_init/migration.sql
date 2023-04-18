/*
  Warnings:

  - You are about to drop the column `Requester` on the `trip` table. All the data in the column will be lost.
  - Added the required column `requester` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trip" DROP COLUMN "Requester",
ADD COLUMN     "requester" TEXT NOT NULL;
