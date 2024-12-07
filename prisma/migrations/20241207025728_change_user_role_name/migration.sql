/*
  Warnings:

  - You are about to drop the column `user_role` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MEDICAL_ORG', 'NON_MEDICAL_ORG', 'ADMIN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "user_role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "UserRole";
