/*
  Warnings:

  - Added the required column `estimatedBudget` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedDuration` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedTravelers` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "estimatedBudget" INTEGER NOT NULL,
ADD COLUMN     "estimatedDuration" INTEGER NOT NULL,
ADD COLUMN     "estimatedTravelers" INTEGER NOT NULL;
