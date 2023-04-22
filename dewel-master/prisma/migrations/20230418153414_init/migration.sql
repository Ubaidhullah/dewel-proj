-- AlterTable
ALTER TABLE "location" ADD COLUMN     "distance" INTEGER;

-- CreateTable
CREATE TABLE "tripreq" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requester" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "departureDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),

    CONSTRAINT "tripreq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tripreq" ADD CONSTRAINT "tripreq_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
