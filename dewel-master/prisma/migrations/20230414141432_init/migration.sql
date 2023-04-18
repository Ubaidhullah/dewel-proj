/*
  Warnings:

  - You are about to drop the column `deaptureDate` on the `trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trip" DROP COLUMN "deaptureDate",
ADD COLUMN     "departureDate" TIMESTAMP(3),
ALTER COLUMN "returnDate" DROP NOT NULL,
ALTER COLUMN "estimatedBudget" DROP NOT NULL,
ALTER COLUMN "estimatedDuration" DROP NOT NULL,
ALTER COLUMN "estimatedTravelers" DROP NOT NULL;
