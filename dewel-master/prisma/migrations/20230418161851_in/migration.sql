/*
  Warnings:

  - You are about to drop the column `atoll` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "atoll",
DROP COLUMN "distance";
