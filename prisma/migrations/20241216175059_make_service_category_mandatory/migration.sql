/*
  Warnings:

  - Made the column `category` on table `service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "service" ALTER COLUMN "category" SET NOT NULL;
