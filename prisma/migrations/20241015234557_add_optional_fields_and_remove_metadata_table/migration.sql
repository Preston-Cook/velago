/*
  Warnings:

  - You are about to drop the `metadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."organization" ADD COLUMN     "organization_status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."metadata";
