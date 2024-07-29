/*
  Warnings:

  - Made the column `role_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_role_id_fkey";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "role_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
