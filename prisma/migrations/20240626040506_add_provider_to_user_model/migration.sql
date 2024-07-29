/*
  Warnings:

  - Added the required column `provider` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "provider" TEXT NOT NULL;
