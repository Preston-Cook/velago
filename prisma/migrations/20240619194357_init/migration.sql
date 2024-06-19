-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "grapql";

-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('ACTIVE', 'INACTIVE', 'DEFUNCT', 'TEMPORARILY_CLOSED');

-- CreateEnum
CREATE TYPE "public"."LocationType" AS ENUM ('PHYSICAL', 'POSTAL', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "public"."ExtentType" AS ENUM ('GEOJSON', 'TOPOJSON', 'KML');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Organization" (
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
CREATE TABLE "public"."Service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT,
    "url" TEXT,
    "email" TEXT,
    "status" "public"."StatusType" NOT NULL,
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
CREATE TABLE "public"."Program" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
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
CREATE TABLE "public"."Contact" (
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
CREATE TABLE "public"."RequiredDocument" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "document" TEXT,
    "uri" TEXT,

    CONSTRAINT "RequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" UUID NOT NULL,
    "location_type" "public"."LocationType" NOT NULL,
    "url" TEXT,
    "organization_id" UUID,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceAtLocation" (
    "id" UUID NOT NULL,
    "service_id" UUID,
    "description" TEXT,
    "location_id" UUID,

    CONSTRAINT "ServiceAtLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Phone" (
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
CREATE TABLE "public"."ServiceArea" (
    "id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "extent" TEXT,
    "extent_type" "public"."ExtentType" NOT NULL,
    "uri" TEXT,

    CONSTRAINT "ServiceArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CostOption" (
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
CREATE TABLE "public"."Accessability" (
    "id" UUID NOT NULL,
    "location_id" UUID,
    "description" TEXT,
    "details" TEXT,
    "url" TEXT,

    CONSTRAINT "Accessability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Schedule" (
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

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Language" (
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
CREATE TABLE "public"."Funding" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "service_id" UUID,
    "source" TEXT,

    CONSTRAINT "Funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrganizationIdentifier" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "identifier_scheme" TEXT,
    "identifier_type" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "OrganizationIdentifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Taxonomy" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uri" TEXT,
    "version" TEXT,

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TaxonomyTerm" (
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
CREATE TABLE "public"."Attribute" (
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
CREATE TABLE "public"."MetaTableDescription" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "language" TEXT,
    "character_set" TEXT,

    CONSTRAINT "MetaTableDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Metadata" (
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
CREATE UNIQUE INDEX "Service_organization_id_key" ON "public"."Service"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_program_id_key" ON "public"."Service"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "Program_organization_id_key" ON "public"."Program"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_locationId_key" ON "public"."Address"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_service_id_key" ON "public"."Contact"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_service_at_location_id_key" ON "public"."Contact"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_location_id_key" ON "public"."Contact"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "RequiredDocument_service_id_key" ON "public"."RequiredDocument"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_organization_id_key" ON "public"."Location"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAtLocation_service_id_key" ON "public"."ServiceAtLocation"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_location_id_key" ON "public"."Phone"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_service_id_key" ON "public"."Phone"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_contact_id_key" ON "public"."Phone"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_service_at_location_id_key" ON "public"."Phone"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Accessability_location_id_key" ON "public"."Accessability"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_service_id_key" ON "public"."Schedule"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Funding_organization_id_key" ON "public"."Funding"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Funding_service_id_key" ON "public"."Funding"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationIdentifier_organization_id_key" ON "public"."OrganizationIdentifier"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaxonomyTerm_taxonomy_id_key" ON "public"."TaxonomyTerm"("taxonomy_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_taxonomy_term_id_key" ON "public"."Attribute"("taxonomy_term_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_cost_option_id_key" ON "public"."Attribute"("cost_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_organization_identifier_id_key" ON "public"."Attribute"("organization_identifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_organization_id_key" ON "public"."Attribute"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_service_id_key" ON "public"."Attribute"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_phone_id_key" ON "public"."Attribute"("phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_contact_id_key" ON "public"."Attribute"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_taxonomy_id_key" ON "public"."Metadata"("taxonomy_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_taxonomy_term_id_key" ON "public"."Metadata"("taxonomy_term_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_attribute_id_key" ON "public"."Metadata"("attribute_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_meta_table_description_id_key" ON "public"."Metadata"("meta_table_description_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_cost_option_id_key" ON "public"."Metadata"("cost_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_organization_identifier_id_key" ON "public"."Metadata"("organization_identifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_program_id_key" ON "public"."Metadata"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_organization_id_key" ON "public"."Metadata"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_service_id_key" ON "public"."Metadata"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_accessability_id_key" ON "public"."Metadata"("accessability_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_funding_id_key" ON "public"."Metadata"("funding_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_language_id_key" ON "public"."Metadata"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_service_area_id_key" ON "public"."Metadata"("service_area_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_required_document_id_key" ON "public"."Metadata"("required_document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_address_id_key" ON "public"."Metadata"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_service_at_location_id_key" ON "public"."Metadata"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_phone_id_key" ON "public"."Metadata"("phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_schedule_id_key" ON "public"."Metadata"("schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_contact_id_key" ON "public"."Metadata"("contact_id");

-- AddForeignKey
ALTER TABLE "public"."Organization" ADD CONSTRAINT "Organization_parent_organization_id_fkey" FOREIGN KEY ("parent_organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Program" ADD CONSTRAINT "Program_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RequiredDocument" ADD CONSTRAINT "RequiredDocument_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Location" ADD CONSTRAINT "Location_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceAtLocation" ADD CONSTRAINT "ServiceAtLocation_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceAtLocation" ADD CONSTRAINT "ServiceAtLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceArea" ADD CONSTRAINT "ServiceArea_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CostOption" ADD CONSTRAINT "CostOption_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Accessability" ADD CONSTRAINT "Accessability_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedule" ADD CONSTRAINT "Schedule_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedule" ADD CONSTRAINT "Schedule_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Language" ADD CONSTRAINT "Language_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Language" ADD CONSTRAINT "Language_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Language" ADD CONSTRAINT "Language_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "public"."Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Funding" ADD CONSTRAINT "Funding_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Funding" ADD CONSTRAINT "Funding_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrganizationIdentifier" ADD CONSTRAINT "OrganizationIdentifier_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaxonomyTerm" ADD CONSTRAINT "TaxonomyTerm_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "public"."TaxonomyTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_meta_table_desciption_id_fkey" FOREIGN KEY ("meta_table_desciption_id") REFERENCES "public"."MetaTableDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_cost_option_id_fkey" FOREIGN KEY ("cost_option_id") REFERENCES "public"."CostOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_organization_identifier_id_fkey" FOREIGN KEY ("organization_identifier_id") REFERENCES "public"."OrganizationIdentifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_accessability_id_fkey" FOREIGN KEY ("accessability_id") REFERENCES "public"."Accessability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_funding_id_fkey" FOREIGN KEY ("funding_id") REFERENCES "public"."Funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_service_area_id_fkey" FOREIGN KEY ("service_area_id") REFERENCES "public"."ServiceArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_required_document_id_fkey" FOREIGN KEY ("required_document_id") REFERENCES "public"."RequiredDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "public"."Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "public"."Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "public"."TaxonomyTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."Attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_meta_table_description_id_fkey" FOREIGN KEY ("meta_table_description_id") REFERENCES "public"."MetaTableDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_cost_option_id_fkey" FOREIGN KEY ("cost_option_id") REFERENCES "public"."CostOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_organization_identifier_id_fkey" FOREIGN KEY ("organization_identifier_id") REFERENCES "public"."OrganizationIdentifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_accessability_id_fkey" FOREIGN KEY ("accessability_id") REFERENCES "public"."Accessability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_funding_id_fkey" FOREIGN KEY ("funding_id") REFERENCES "public"."Funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_service_area_id_fkey" FOREIGN KEY ("service_area_id") REFERENCES "public"."ServiceArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_required_document_id_fkey" FOREIGN KEY ("required_document_id") REFERENCES "public"."RequiredDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "public"."ServiceAtLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "public"."Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metadata" ADD CONSTRAINT "Metadata_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
