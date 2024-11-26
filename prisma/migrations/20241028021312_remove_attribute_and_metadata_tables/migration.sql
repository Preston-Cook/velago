/*
  Warnings:

  - You are about to drop the `attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meta_table_description` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_accessability_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_address_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_cost_option_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_funding_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_language_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_meta_table_desciption_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_organization_identifier_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_phone_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_program_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_required_document_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_service_area_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_service_at_location_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_service_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attribute" DROP CONSTRAINT "attribute_taxonomy_term_id_fkey";

-- DropTable
DROP TABLE "public"."attribute";

-- DropTable
DROP TABLE "public"."meta_table_description";
