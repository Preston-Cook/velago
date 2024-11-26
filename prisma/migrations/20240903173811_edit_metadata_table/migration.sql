/*
  Warnings:

  - You are about to drop the column `accessability_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `contact_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `cost_option_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `funding_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `meta_table_description_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `organization_identifier_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `phone_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `program_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `required_document_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `schedule_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `service_area_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `service_at_location_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `taxonomy_id` on the `metadata` table. All the data in the column will be lost.
  - You are about to drop the column `taxonomy_term_id` on the `metadata` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_accessability_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_address_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_cost_option_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_funding_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_language_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_meta_table_description_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_organization_identifier_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_phone_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_program_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_required_document_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_service_area_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_service_at_location_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_service_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_taxonomy_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."metadata" DROP CONSTRAINT "metadata_taxonomy_term_id_fkey";

-- DropIndex
DROP INDEX "public"."metadata_accessability_id_key";

-- DropIndex
DROP INDEX "public"."metadata_address_id_key";

-- DropIndex
DROP INDEX "public"."metadata_attribute_id_key";

-- DropIndex
DROP INDEX "public"."metadata_contact_id_key";

-- DropIndex
DROP INDEX "public"."metadata_cost_option_id_key";

-- DropIndex
DROP INDEX "public"."metadata_funding_id_key";

-- DropIndex
DROP INDEX "public"."metadata_language_id_key";

-- DropIndex
DROP INDEX "public"."metadata_meta_table_description_id_key";

-- DropIndex
DROP INDEX "public"."metadata_organization_id_key";

-- DropIndex
DROP INDEX "public"."metadata_organization_identifier_id_key";

-- DropIndex
DROP INDEX "public"."metadata_phone_id_key";

-- DropIndex
DROP INDEX "public"."metadata_program_id_key";

-- DropIndex
DROP INDEX "public"."metadata_required_document_id_key";

-- DropIndex
DROP INDEX "public"."metadata_schedule_id_key";

-- DropIndex
DROP INDEX "public"."metadata_service_area_id_key";

-- DropIndex
DROP INDEX "public"."metadata_service_at_location_id_key";

-- DropIndex
DROP INDEX "public"."metadata_service_id_key";

-- DropIndex
DROP INDEX "public"."metadata_taxonomy_id_key";

-- DropIndex
DROP INDEX "public"."metadata_taxonomy_term_id_key";

-- AlterTable
ALTER TABLE "public"."metadata" DROP COLUMN "accessability_id",
DROP COLUMN "address_id",
DROP COLUMN "attribute_id",
DROP COLUMN "contact_id",
DROP COLUMN "cost_option_id",
DROP COLUMN "funding_id",
DROP COLUMN "language_id",
DROP COLUMN "meta_table_description_id",
DROP COLUMN "organization_id",
DROP COLUMN "organization_identifier_id",
DROP COLUMN "phone_id",
DROP COLUMN "program_id",
DROP COLUMN "required_document_id",
DROP COLUMN "schedule_id",
DROP COLUMN "service_area_id",
DROP COLUMN "service_at_location_id",
DROP COLUMN "service_id",
DROP COLUMN "taxonomy_id",
DROP COLUMN "taxonomy_term_id",
ALTER COLUMN "previous_value" DROP NOT NULL,
ALTER COLUMN "replacement_value" DROP NOT NULL;
