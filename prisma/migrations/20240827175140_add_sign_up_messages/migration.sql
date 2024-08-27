-- AlterTable
ALTER TABLE "public"."contact_message" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."sign_up_message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additional_info" TEXT,

    CONSTRAINT "sign_up_message_pkey" PRIMARY KEY ("id")
);
