/*
  Warnings:

  - You are about to drop the `ContactMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."status_type" AS ENUM ('ACTIVE', 'INACTIVE', 'DEFUNCT', 'TEMPORARILY_CLOSED');

-- CreateEnum
CREATE TYPE "public"."location_type" AS ENUM ('PHYSICAL', 'POSTAL', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "public"."extent_type" AS ENUM ('GEOJSON', 'TOPOJSON', 'KML');

-- DropTable
DROP TABLE "public"."ContactMessage";

-- CreateTable
CREATE TABLE "public"."contact_message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "contact_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organization" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "tax_status" TEXT,
    "tax_id" TEXT,
    "year_incorporated" INTEGER,
    "legal_status" TEXT,
    "logo" TEXT,
    "uri" TEXT,
    "parent_organization_id" UUID,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT,
    "url" TEXT,
    "email" TEXT,
    "status" "public"."status_type" NOT NULL,
    "interpretation_services" TEXT,
    "application_process" TEXT,
    "wait_time" TEXT,
    "fees" TEXT,
    "fees_description" TEXT,
    "accreditations" TEXT,
    "eligibility_description" TEXT,
    "minimum_age" INTEGER,
    "maximum_age" INTEGER,
    "assured_date" TEXT,
    "assurer_email" TEXT,
    "licenses" TEXT,
    "alert" TEXT,
    "last_modified" TIMESTAMP(3),
    "organization_id" UUID,
    "program_id" UUID,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."program" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."address" (
    "id" UUID NOT NULL,
    "locationId" UUID,
    "attention" TEXT,
    "address_1" TEXT,
    "address_2" TEXT,
    "city" TEXT,
    "region" TEXT,
    "state_province" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "address_type" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contact" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "service_id" UUID,
    "service_at_location_id" UUID,
    "location_id" UUID,
    "name" TEXT,
    "title" TEXT,
    "department" TEXT,
    "email" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."required_document" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "document" TEXT,
    "uri" TEXT,

    CONSTRAINT "required_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location" (
    "id" UUID NOT NULL,
    "location_type" "public"."location_type" NOT NULL,
    "url" TEXT,
    "organization_id" UUID,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_at_location" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "description" TEXT,
    "location_id" UUID,

    CONSTRAINT "service_at_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."phone" (
    "id" UUID NOT NULL,
    "location_id" UUID,
    "service_id" UUID,
    "organization_id" UUID,
    "contact_id" UUID,
    "service_at_location_id" UUID,
    "description" TEXT,
    "number" TEXT NOT NULL,
    "extention" INTEGER NOT NULL,
    "phone_type" TEXT,

    CONSTRAINT "phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."serice_area" (
    "id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "extent" TEXT,
    "extent_type" "public"."extent_type" NOT NULL,
    "uri" TEXT,

    CONSTRAINT "serice_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cost_option" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "valid_from" TEXT,
    "valid_to" TEXT,
    "option" TEXT NOT NULL,
    "currency" TEXT,
    "amount" DECIMAL(65,30),
    "amount_description" TEXT,

    CONSTRAINT "cost_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accessability" (
    "id" UUID NOT NULL,
    "location_id" UUID,
    "description" TEXT,
    "details" TEXT,
    "url" TEXT,

    CONSTRAINT "accessability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."schedule" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "service_at_location_id" UUID,
    "valid_from" TEXT,
    "valid_to" TEXT,
    "dstart" TEXT,
    "timezome" INTEGER NOT NULL,
    "until" TEXT,
    "count" INTEGER,
    "wkst" TEXT,
    "freq" TEXT,
    "interval" INTEGER,
    "byday" TEXT,
    "byweekno" TEXT,
    "bymonthday" TEXT,
    "byyearday" TEXT,
    "description" TEXT,
    "opens_at" TEXT,
    "closes_at" TEXT,
    "schedule_link" TEXT,
    "attending_type" TEXT,
    "notes" TEXT,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."language" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "location_id" UUID,
    "phone_id" UUID,
    "name" TEXT,
    "code" TEXT,
    "note" TEXT,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."funding" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "service_id" UUID,
    "source" TEXT,

    CONSTRAINT "funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organization_identifier" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "identifier_scheme" TEXT,
    "identifier_type" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "organization_identifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."taxonomy" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uri" TEXT,
    "version" TEXT,

    CONSTRAINT "taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."taxonomy_term" (
    "id" UUID NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parent_id" UUID,
    "taxonomy" TEXT NOT NULL,
    "taxonomy_id" UUID,
    "term_uri" TEXT,

    CONSTRAINT "taxonomy_term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."attribute" (
    "id" UUID NOT NULL,
    "link_id" UUID,
    "link_type" TEXT,
    "value" TEXT,
    "taxonomy_term_id" UUID,
    "meta_table_desciption_id" UUID,
    "cost_option_id" UUID,
    "organization_identifier_id" UUID,
    "program_id" UUID,
    "organization_id" UUID,
    "service_id" UUID,
    "accessability_id" UUID,
    "funding_id" UUID,
    "language_id" UUID,
    "service_area_id" UUID,
    "required_document_id" UUID,
    "address_id" UUID,
    "service_at_location_id" UUID,
    "phone_id" UUID,
    "schedule_id" UUID,
    "contact_id" UUID,

    CONSTRAINT "attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meta_table_description" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "language" TEXT,
    "character_set" TEXT,

    CONSTRAINT "meta_table_description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."metadata" (
    "id" UUID NOT NULL,
    "resource_id" TEXT,
    "resource_type" TEXT,
    "last_action_date" TEXT NOT NULL,
    "last_action_type" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "previous_value" TEXT NOT NULL,
    "replacement_value" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "taxonomy_id" UUID,
    "taxonomy_term_id" UUID,
    "attribute_id" UUID,
    "meta_table_description_id" UUID,
    "cost_option_id" UUID,
    "organization_identifier_id" UUID,
    "program_id" UUID,
    "organization_id" UUID,
    "service_id" UUID,
    "accessability_id" UUID,
    "funding_id" UUID,
    "language_id" UUID,
    "service_area_id" UUID,
    "required_document_id" UUID,
    "address_id" UUID,
    "service_at_location_id" UUID,
    "phone_id" UUID,
    "schedule_id" UUID,
    "contact_id" UUID,

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_organization_id_key" ON "public"."service"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "service_program_id_key" ON "public"."service"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "program_organization_id_key" ON "public"."program"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_locationId_key" ON "public"."address"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_service_id_key" ON "public"."contact"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_service_at_location_id_key" ON "public"."contact"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_location_id_key" ON "public"."contact"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "required_document_service_id_key" ON "public"."required_document"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_organization_id_key" ON "public"."location"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "service_at_location_service_id_key" ON "public"."service_at_location"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "phone_location_id_key" ON "public"."phone"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "phone_service_id_key" ON "public"."phone"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "phone_contact_id_key" ON "public"."phone"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "phone_service_at_location_id_key" ON "public"."phone"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "accessability_location_id_key" ON "public"."accessability"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_service_id_key" ON "public"."schedule"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "funding_organization_id_key" ON "public"."funding"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "funding_service_id_key" ON "public"."funding"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_identifier_organization_id_key" ON "public"."organization_identifier"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "taxonomy_term_taxonomy_id_key" ON "public"."taxonomy_term"("taxonomy_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_taxonomy_term_id_key" ON "public"."attribute"("taxonomy_term_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_cost_option_id_key" ON "public"."attribute"("cost_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_organization_identifier_id_key" ON "public"."attribute"("organization_identifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_organization_id_key" ON "public"."attribute"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_service_id_key" ON "public"."attribute"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_phone_id_key" ON "public"."attribute"("phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_contact_id_key" ON "public"."attribute"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_taxonomy_id_key" ON "public"."metadata"("taxonomy_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_taxonomy_term_id_key" ON "public"."metadata"("taxonomy_term_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_attribute_id_key" ON "public"."metadata"("attribute_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_meta_table_description_id_key" ON "public"."metadata"("meta_table_description_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_cost_option_id_key" ON "public"."metadata"("cost_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_organization_identifier_id_key" ON "public"."metadata"("organization_identifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_program_id_key" ON "public"."metadata"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_organization_id_key" ON "public"."metadata"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_service_id_key" ON "public"."metadata"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_accessability_id_key" ON "public"."metadata"("accessability_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_funding_id_key" ON "public"."metadata"("funding_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_language_id_key" ON "public"."metadata"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_service_area_id_key" ON "public"."metadata"("service_area_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_required_document_id_key" ON "public"."metadata"("required_document_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_address_id_key" ON "public"."metadata"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_service_at_location_id_key" ON "public"."metadata"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_phone_id_key" ON "public"."metadata"("phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_schedule_id_key" ON "public"."metadata"("schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_contact_id_key" ON "public"."metadata"("contact_id");

-- AddForeignKey
ALTER TABLE "public"."organization" ADD CONSTRAINT "organization_parent_organization_id_fkey" FOREIGN KEY ("parent_organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service" ADD CONSTRAINT "service_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service" ADD CONSTRAINT "service_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."program" ADD CONSTRAINT "program_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."address" ADD CONSTRAINT "address_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."required_document" ADD CONSTRAINT "required_document_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_at_location" ADD CONSTRAINT "service_at_location_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_at_location" ADD CONSTRAINT "service_at_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."phone" ADD CONSTRAINT "phone_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."phone" ADD CONSTRAINT "phone_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."phone" ADD CONSTRAINT "phone_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."phone" ADD CONSTRAINT "phone_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."phone" ADD CONSTRAINT "phone_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."serice_area" ADD CONSTRAINT "serice_area_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cost_option" ADD CONSTRAINT "cost_option_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accessability" ADD CONSTRAINT "accessability_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."schedule" ADD CONSTRAINT "schedule_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."schedule" ADD CONSTRAINT "schedule_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."language" ADD CONSTRAINT "language_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."language" ADD CONSTRAINT "language_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."language" ADD CONSTRAINT "language_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "public"."phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."funding" ADD CONSTRAINT "funding_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."funding" ADD CONSTRAINT "funding_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organization_identifier" ADD CONSTRAINT "organization_identifier_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."taxonomy_term" ADD CONSTRAINT "taxonomy_term_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "public"."taxonomy_term"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_meta_table_desciption_id_fkey" FOREIGN KEY ("meta_table_desciption_id") REFERENCES "public"."meta_table_description"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_cost_option_id_fkey" FOREIGN KEY ("cost_option_id") REFERENCES "public"."cost_option"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_organization_identifier_id_fkey" FOREIGN KEY ("organization_identifier_id") REFERENCES "public"."organization_identifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_accessability_id_fkey" FOREIGN KEY ("accessability_id") REFERENCES "public"."accessability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_funding_id_fkey" FOREIGN KEY ("funding_id") REFERENCES "public"."funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_service_area_id_fkey" FOREIGN KEY ("service_area_id") REFERENCES "public"."serice_area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_required_document_id_fkey" FOREIGN KEY ("required_document_id") REFERENCES "public"."required_document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "public"."phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attribute" ADD CONSTRAINT "attribute_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "public"."taxonomy_term"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_meta_table_description_id_fkey" FOREIGN KEY ("meta_table_description_id") REFERENCES "public"."meta_table_description"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_cost_option_id_fkey" FOREIGN KEY ("cost_option_id") REFERENCES "public"."cost_option"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_organization_identifier_id_fkey" FOREIGN KEY ("organization_identifier_id") REFERENCES "public"."organization_identifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_accessability_id_fkey" FOREIGN KEY ("accessability_id") REFERENCES "public"."accessability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_funding_id_fkey" FOREIGN KEY ("funding_id") REFERENCES "public"."funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_service_area_id_fkey" FOREIGN KEY ("service_area_id") REFERENCES "public"."serice_area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_required_document_id_fkey" FOREIGN KEY ("required_document_id") REFERENCES "public"."required_document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "public"."phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metadata" ADD CONSTRAINT "metadata_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
