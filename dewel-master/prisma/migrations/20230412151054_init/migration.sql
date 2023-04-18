-- CreateTable
CREATE TABLE "trip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Requester" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "deaptureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
