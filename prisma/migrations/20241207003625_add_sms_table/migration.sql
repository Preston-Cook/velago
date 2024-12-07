-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "sms_otp" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "phone" TEXT NOT NULL,
    "otp_hash" TEXT NOT NULL,
    "expiration_time" TIMESTAMP(3) NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sms_otp_pkey" PRIMARY KEY ("id")
);
