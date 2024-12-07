/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `sms_otp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sms_otp_phone_key" ON "sms_otp"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
