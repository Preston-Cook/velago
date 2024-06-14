/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'INACTIVE', 'DEFUNCT', 'TEMPORARILY_CLOSED');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('PHYSICAL', 'POSTAL', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "ExtentType" AS ENUM ('GEOJSON', 'TOPOJSON', 'KML');

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
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

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT,
    "url" TEXT,
    "email" TEXT,
    "status" "StatusType" NOT NULL,
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

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
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

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "service_id" UUID,
    "service_at_location_id" UUID,
    "location_id" UUID,
    "name" TEXT,
    "title" TEXT,
    "department" TEXT,
    "email" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequiredDocument" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "document" TEXT,
    "uri" TEXT,

    CONSTRAINT "RequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "location_type" "LocationType" NOT NULL,
    "url" TEXT,
    "organization_id" UUID,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceAtLocation" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "description" TEXT,
    "location_id" UUID,

    CONSTRAINT "ServiceAtLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
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

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceArea" (
    "id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "extent" TEXT,
    "extent_type" "ExtentType" NOT NULL,
    "uri" TEXT,

    CONSTRAINT "ServiceArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostOption" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "valid_from" TEXT,
    "valid_to" TEXT,
    "option" TEXT NOT NULL,
    "currency" TEXT,
    "amount" DECIMAL(65,30),
    "amount_description" TEXT,

    CONSTRAINT "CostOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessability" (
    "id" UUID NOT NULL,
    "location_id" UUID,
    "description" TEXT,
    "details" TEXT,
    "url" TEXT,

    CONSTRAINT "Accessability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "serviceAtLocationId" UUID,
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

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "location_id" UUID,
    "phone_id" UUID,
    "name" TEXT,
    "code" TEXT,
    "note" TEXT,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funding" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "service_id" UUID,
    "source" TEXT,

    CONSTRAINT "Funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationIdentifier" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "identifier_scheme" TEXT,
    "identifier_type" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "OrganizationIdentifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uri" TEXT,
    "version" TEXT,

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxonomyTerm" (
    "id" UUID NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parent_id" UUID,
    "taxonomy" TEXT NOT NULL,
    "taxonomy_id" UUID,
    "term_uri" TEXT,

    CONSTRAINT "TaxonomyTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
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

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaTableDescription" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "language" TEXT,
    "character_set" TEXT,

    CONSTRAINT "MetaTableDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
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

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_organization_id_key" ON "Service"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_program_id_key" ON "Service"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "Program_organization_id_key" ON "Program"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_locationId_key" ON "Address"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_service_id_key" ON "Contact"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_service_at_location_id_key" ON "Contact"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_location_id_key" ON "Contact"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "RequiredDocument_service_id_key" ON "RequiredDocument"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_organization_id_key" ON "Location"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAtLocation_service_id_key" ON "ServiceAtLocation"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_location_id_key" ON "Phone"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_service_id_key" ON "Phone"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_contact_id_key" ON "Phone"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_service_at_location_id_key" ON "Phone"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Accessability_location_id_key" ON "Accessability"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_service_id_key" ON "Schedule"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Funding_organization_id_key" ON "Funding"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Funding_service_id_key" ON "Funding"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationIdentifier_organization_id_key" ON "OrganizationIdentifier"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaxonomyTerm_taxonomy_id_key" ON "TaxonomyTerm"("taxonomy_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_taxonomy_term_id_key" ON "Attribute"("taxonomy_term_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_cost_option_id_key" ON "Attribute"("cost_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_organization_identifier_id_key" ON "Attribute"("organization_identifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_organization_id_key" ON "Attribute"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_service_id_key" ON "Attribute"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_phone_id_key" ON "Attribute"("phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_contact_id_key" ON "Attribute"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_taxonomy_id_key" ON "Metadata"("taxonomy_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_taxonomy_term_id_key" ON "Metadata"("taxonomy_term_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_attribute_id_key" ON "Metadata"("attribute_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_meta_table_description_id_key" ON "Metadata"("meta_table_description_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_cost_option_id_key" ON "Metadata"("cost_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_organization_identifier_id_key" ON "Metadata"("organization_identifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_program_id_key" ON "Metadata"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_organization_id_key" ON "Metadata"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_service_id_key" ON "Metadata"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_accessability_id_key" ON "Metadata"("accessability_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_funding_id_key" ON "Metadata"("funding_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_language_id_key" ON "Metadata"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_service_area_id_key" ON "Metadata"("service_area_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_required_document_id_key" ON "Metadata"("required_document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_address_id_key" ON "Metadata"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_service_at_location_id_key" ON "Metadata"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_phone_id_key" ON "Metadata"("phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_schedule_id_key" ON "Metadata"("schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_contact_id_key" ON "Metadata"("contact_id");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_parent_organization_id_fkey" FOREIGN KEY ("parent_organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredDocument" ADD CONSTRAINT "RequiredDocument_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAtLocation" ADD CONSTRAINT "ServiceAtLocation_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAtLocation" ADD CONSTRAINT "ServiceAtLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceArea" ADD CONSTRAINT "ServiceArea_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostOption" ADD CONSTRAINT "CostOption_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessability" ADD CONSTRAINT "Accessability_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_serviceAtLocationId_fkey" FOREIGN KEY ("serviceAtLocationId") REFERENCES "ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "Funding_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "Funding_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationIdentifier" ADD CONSTRAINT "OrganizationIdentifier_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxonomyTerm" ADD CONSTRAINT "TaxonomyTerm_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "TaxonomyTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_meta_table_desciption_id_fkey" FOREIGN KEY ("meta_table_desciption_id") REFERENCES "MetaTableDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_cost_option_id_fkey" FOREIGN KEY ("cost_option_id") REFERENCES "CostOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_organization_identifier_id_fkey" FOREIGN KEY ("organization_identifier_id") REFERENCES "OrganizationIdentifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_accessability_id_fkey" FOREIGN KEY ("accessability_id") REFERENCES "Accessability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_funding_id_fkey" FOREIGN KEY ("funding_id") REFERENCES "Funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_service_area_id_fkey" FOREIGN KEY ("service_area_id") REFERENCES "ServiceArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_required_document_id_fkey" FOREIGN KEY ("required_document_id") REFERENCES "RequiredDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "TaxonomyTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_meta_table_description_id_fkey" FOREIGN KEY ("meta_table_description_id") REFERENCES "MetaTableDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_cost_option_id_fkey" FOREIGN KEY ("cost_option_id") REFERENCES "CostOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_organization_identifier_id_fkey" FOREIGN KEY ("organization_identifier_id") REFERENCES "OrganizationIdentifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_accessability_id_fkey" FOREIGN KEY ("accessability_id") REFERENCES "Accessability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_funding_id_fkey" FOREIGN KEY ("funding_id") REFERENCES "Funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_service_area_id_fkey" FOREIGN KEY ("service_area_id") REFERENCES "ServiceArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_required_document_id_fkey" FOREIGN KEY ("required_document_id") REFERENCES "RequiredDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
