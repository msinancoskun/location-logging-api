/*
  Warnings:

  - You are about to drop the column `timeOfEntry` on the `Log` table. All the data in the column will be lost.
  - Added the required column `radiusInKilometers` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "radiusInKilometers" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "timeOfEntry",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
