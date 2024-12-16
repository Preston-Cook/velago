-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MEDICAL_ORG', 'NON_MEDICAL_ORG', 'ADMIN');

-- CreateEnum
CREATE TYPE "status_type" AS ENUM ('ACTIVE', 'INACTIVE', 'DEFUNCT', 'TEMPORARILY_CLOSED');

-- CreateEnum
CREATE TYPE "location_type" AS ENUM ('PHYSICAL', 'POSTAL', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('TEXT', 'VOICE', 'FAX', 'CELL', 'VIDEO', 'PAGER');

-- CreateEnum
CREATE TYPE "extent_type" AS ENUM ('GEOJSON', 'TOPOJSON', 'KML', 'TEXT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "alternate_name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "website" TEXT,
    "year_incorporated" INTEGER,
    "legal_status" TEXT,
    "logo" TEXT,
    "uri" TEXT,
    "parent_organization_id" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT,
    "url" TEXT,
    "email" TEXT,
    "status" "status_type" NOT NULL,
    "interpretation_services" TEXT,
    "application_process" TEXT,
    "fees_description" TEXT,
    "accreditations" TEXT,
    "eligibility_description" TEXT,
    "minimum_age" INTEGER,
    "maximum_age" INTEGER,
    "assured_date" TEXT,
    "assurer_email" TEXT,
    "alert" TEXT,
    "last_modified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "organization_id" TEXT,
    "category" TEXT,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_capacity" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT,
    "unit_id" TEXT NOT NULL,
    "available" INTEGER NOT NULL,
    "maximum" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "scheme" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "organization_id" TEXT,
    "service_id" TEXT,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "organization_id" TEXT,
    "name" TEXT NOT NULL,
    "alternate_name" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "location_id" TEXT,
    "attention" TEXT,
    "address_1" TEXT,
    "address_2" TEXT,
    "city" TEXT,
    "region" TEXT,
    "state_province" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "address_type" "location_type",

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "organization_id" TEXT,
    "service_id" TEXT,
    "service_at_location_id" TEXT,
    "location_id" TEXT,
    "name" TEXT,
    "title" TEXT,
    "department" TEXT,
    "email" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "required_document" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT,
    "document" TEXT,
    "uri" TEXT,

    CONSTRAINT "required_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "location_type" "location_type",
    "url" TEXT,
    "organization_id" TEXT,
    "name" TEXT,
    "alternate_name" TEXT,
    "description" TEXT,
    "transportation" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "external_identifier" TEXT,
    "external_identifier_type" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_at_location" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT,
    "description" TEXT,
    "location_id" TEXT,

    CONSTRAINT "service_at_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phone" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "location_id" TEXT,
    "service_id" TEXT,
    "organization_id" TEXT,
    "contact_id" TEXT,
    "service_at_location_id" TEXT,
    "number" TEXT NOT NULL,
    "extension" INTEGER,
    "phone_type" "PhoneType",
    "description" TEXT,

    CONSTRAINT "phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_area" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "extent" TEXT,
    "extent_type" "extent_type" NOT NULL,
    "uri" TEXT,
    "service_at_location_id" TEXT,

    CONSTRAINT "service_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_option" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT,
    "valid_from" TEXT,
    "valid_to" TEXT,
    "option" TEXT NOT NULL,
    "currency" TEXT,
    "amount" DECIMAL(65,30),
    "amount_description" TEXT,

    CONSTRAINT "cost_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accessability" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "location_id" TEXT,
    "description" TEXT,
    "details" TEXT,
    "url" TEXT,

    CONSTRAINT "accessability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT,
    "location_id" TEXT,
    "service_at_location_id" TEXT,
    "valid_from" TEXT,
    "valid_to" TEXT,
    "dtstart" TEXT,
    "timezone" INTEGER NOT NULL,
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
CREATE TABLE "language" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "service_id" TEXT,
    "location_id" TEXT,
    "phone_id" TEXT,
    "name" TEXT,
    "code" TEXT,
    "note" TEXT,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "organization_id" TEXT,
    "service_id" TEXT,
    "source" TEXT,

    CONSTRAINT "funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_identifier" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "organization_id" TEXT NOT NULL,
    "identifier_scheme" TEXT,
    "identifier_type" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "organization_identifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uri" TEXT,
    "version" TEXT,

    CONSTRAINT "taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy_term" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parent_id" TEXT,
    "taxonomy" TEXT NOT NULL,
    "taxonomy_id" TEXT,
    "term_uri" TEXT,

    CONSTRAINT "taxonomy_term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meta_table_description" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "character_set" TEXT NOT NULL,

    CONSTRAINT "meta_table_description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "link_id" TEXT NOT NULL,
    "link_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "taxonomy_term_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "resource_id" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "last_action_date" TEXT NOT NULL,
    "last_action_type" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "previous_value" TEXT NOT NULL,
    "replacement_value" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProgramToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProgramToService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sms_otp_phone_key" ON "sms_otp"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "program_organization_id_key" ON "program"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_service_id_key" ON "contact"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_service_at_location_id_key" ON "contact"("service_at_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_location_id_key" ON "contact"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "accessability_location_id_key" ON "accessability"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "funding_organization_id_key" ON "funding"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "funding_service_id_key" ON "funding"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_identifier_organization_id_key" ON "organization_identifier"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "taxonomy_term_taxonomy_id_key" ON "taxonomy_term"("taxonomy_id");

-- CreateIndex
CREATE INDEX "_ProgramToService_B_index" ON "_ProgramToService"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_parent_organization_id_fkey" FOREIGN KEY ("parent_organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_capacity" ADD CONSTRAINT "service_capacity_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_capacity" ADD CONSTRAINT "service_capacity_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program" ADD CONSTRAINT "program_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_document" ADD CONSTRAINT "required_document_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_at_location" ADD CONSTRAINT "service_at_location_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_at_location" ADD CONSTRAINT "service_at_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_area" ADD CONSTRAINT "service_area_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_area" ADD CONSTRAINT "service_area_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_option" ADD CONSTRAINT "cost_option_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accessability" ADD CONSTRAINT "accessability_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_service_at_location_id_fkey" FOREIGN KEY ("service_at_location_id") REFERENCES "service_at_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "language_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "language_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "language_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_identifier" ADD CONSTRAINT "organization_identifier_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy_term" ADD CONSTRAINT "taxonomy_term_taxonomy_id_fkey" FOREIGN KEY ("taxonomy_id") REFERENCES "taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute" ADD CONSTRAINT "attribute_taxonomy_term_id_fkey" FOREIGN KEY ("taxonomy_term_id") REFERENCES "taxonomy_term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToService" ADD CONSTRAINT "_ProgramToService_A_fkey" FOREIGN KEY ("A") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToService" ADD CONSTRAINT "_ProgramToService_B_fkey" FOREIGN KEY ("B") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
