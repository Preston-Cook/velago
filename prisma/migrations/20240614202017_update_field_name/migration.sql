/*
  Warnings:

  - You are about to drop the column `serviceAtLocationId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_serviceAtLocationId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "serviceAtLocationId",
ADD COLUMN     "service_at_location_id" UUID;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
