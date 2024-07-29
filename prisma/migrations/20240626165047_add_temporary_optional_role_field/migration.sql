-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_role_id_fkey";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "role_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
