◇ injected env (1) from .env // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
◇ injected env (10) from .env.local // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('BUSINESS_FAMILY', 'VIP_ULTRA_COMFORT', 'PREMIUM_CLASS');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'CASH', 'INVOICE');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "passengerName" TEXT NOT NULL,
    "passengerEmail" TEXT NOT NULL,
    "passengerPhone" TEXT NOT NULL,
    "flightNumber" TEXT,
    "specialRequests" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "isSameDay" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "approvalToken" TEXT,
    "approvalTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "taxiToAirport" DOUBLE PRECISION NOT NULL,
    "vanToAirport" DOUBLE PRECISION NOT NULL,
    "taxiToZurich" DOUBLE PRECISION NOT NULL,
    "vanToZurich" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingOverride" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "modifier" DOUBLE PRECISION NOT NULL,
    "label" TEXT NOT NULL,
    "pricingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PricingOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedRoute" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "onRequest" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixedRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "luggageCapacity" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "priceMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "vehicleType" "VehicleType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_approvalToken_key" ON "Booking"("approvalToken");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "PricingOverride" ADD CONSTRAINT "PricingOverride_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Run AFTER supabase-init.sql in Supabase SQL Editor
-- Admin: admin@besttaxiservice.ch / admin123

INSERT INTO "Vehicle" ("id", "name", "model", "capacity", "luggageCapacity", "priceMultiplier", "vehicleType", "isActive", "createdAt", "updatedAt")
VALUES
  ('BUSINESS_FAMILY', 'Business & Family Class', 'Mercedes Benz V-Class', 7, 7, 1.0, 'BUSINESS_FAMILY', true, NOW(), NOW()),
  ('VIP_ULTRA_COMFORT', 'VIP Ultra Comfort', 'Mercedes Benz V300 Maybach', 5, 5, 1.3, 'VIP_ULTRA_COMFORT', true, NOW(), NOW()),
  ('PREMIUM_CLASS', 'Premium Class', 'Mercedes Benz S-Class', 3, 3, 1.5, 'PREMIUM_CLASS', true, NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "model" = EXCLUDED."model",
  "updatedAt" = NOW();

INSERT INTO "AdminUser" ("id", "email", "password", "name", "createdAt", "updatedAt")
VALUES (
  'admin-default',
  'admin@besttaxiservice.ch',
  '$2b$10$HVQ/GNG0bh6n.6ulvlKb7eD7jevzBeCbzVrBlAcj9/UhA2ZJGwNIS',
  'Admin',
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO NOTHING;
-- Auto-generated — run in Supabase SQL Editor after supabase-init.sql
INSERT INTO "Pricing" ("id", "region", "location", "taxiToAirport", "vanToAirport", "taxiToZurich", "vanToZurich", "updatedAt")
VALUES
  ('winterthur-winterthur', 'WINTERTHUR', 'Winterthur', 100, 110, 120, 130, NOW()),
  ('winterthur-effretikon--kemptthal', 'WINTERTHUR', 'Effretikon & Kemptthal', 80, 90, 90, 100, NOW()),
  ('winterthur-illnau--lindau', 'WINTERTHUR', 'Illnau & Lindau', 80, 90, 90, 100, NOW()),
  ('winterthur-neftenbach', 'WINTERTHUR', 'Neftenbach', 90, 100, 120, 130, NOW()),
  ('winterthur-pfunden', 'WINTERTHUR', 'Pfunden', 80, 90, 90, 100, NOW()),
  ('winterthur-henggart--hettlingen', 'WINTERTHUR', 'Henggart & Hettlingen', 110, 120, 120, 130, NOW()),
  ('winterthur-elsau', 'WINTERTHUR', 'Elsau', 110, 120, 120, 130, NOW()),
  ('winterthur-frauenfeld', 'WINTERTHUR', 'Frauenfeld', 180, 190, 190, 200, NOW()),
  ('zrich-oberland-turbenthal', 'ZÜRICH OBERLAND', 'Turbenthal', 130, 140, 140, 150, NOW()),
  ('zrich-oberland-bauma', 'ZÜRICH OBERLAND', 'Bauma', 150, 160, 160, 170, NOW()),
  ('zrich-oberland-wetzikon', 'ZÜRICH OBERLAND', 'Wetzikon', 110, 120, 120, 130, NOW()),
  ('zrich-oberland-pfffikon-zh', 'ZÜRICH OBERLAND', 'Pfäffikon ZH', 110, 120, 120, 130, NOW()),
  ('zrich-oberland-uster', 'ZÜRICH OBERLAND', 'Uster', 80, 90, 80, 90, NOW()),
  ('zrich-oberland-volketswil', 'ZÜRICH OBERLAND', 'Volketswil', 70, 80, 70, 80, NOW()),
  ('zrich-oberland-hinwil', 'ZÜRICH OBERLAND', 'Hinwil', 110, 120, 130, 140, NOW()),
  ('zrich-oberland-rti-zh', 'ZÜRICH OBERLAND', 'Rüti ZH', 180, 190, 140, 150, NOW()),
  ('zrich-oberland-rapperswil', 'ZÜRICH OBERLAND', 'Rapperswil', 210, 220, 180, 190, NOW()),
  ('goldkste-stfa', 'GOLDKÜSTE', 'Stäfa', 150, 160, 90, 100, NOW()),
  ('goldkste-mnnedorf', 'GOLDKÜSTE', 'Männedorf', 130, 140, 80, 90, NOW()),
  ('goldkste-meilen', 'GOLDKÜSTE', 'Meilen', 120, 130, 70, 80, NOW()),
  ('goldkste-herrliberg', 'GOLDKÜSTE', 'Herrliberg', 100, 110, 60, 70, NOW()),
  ('goldkste-erlenbach', 'GOLDKÜSTE', 'Erlenbach', 90, 100, 60, 70, NOW()),
  ('goldkste-ksnacht', 'GOLDKÜSTE', 'Küsnacht', 80, 90, 50, 60, NOW()),
  ('goldkste-zollikerberg--zollikon', 'GOLDKÜSTE', 'Zollikerberg & Zollikon', 80, 90, 40, 50, NOW()),
  ('rechte-zrich-seeseite-adliswil--kirchberg', 'RECHTE ZÜRICH-SEESEITE', 'Adliswil & Kirchberg', 80, 90, 30, 40, NOW()),
  ('rechte-zrich-seeseite-thalwil--rschlikon', 'RECHTE ZÜRICH-SEESEITE', 'Thalwil & Rüschlikon', 90, 100, 50, 60, NOW()),
  ('rechte-zrich-seeseite-horgen', 'RECHTE ZÜRICH-SEESEITE', 'Horgen', 120, 130, 80, 90, NOW()),
  ('rechte-zrich-seeseite-au-zh--wdenswil', 'RECHTE ZÜRICH-SEESEITE', 'Au ZH & Wädenswil', 130, 140, 90, 100, NOW()),
  ('rechte-zrich-seeseite-richterswil--samstagern', 'RECHTE ZÜRICH-SEESEITE', 'Richterswil & Samstagern', 140, 150, 100, 110, NOW()),
  ('kanton-schwyz-wollerau--bch-sz', 'KANTON SCHWYZ', 'Wollerau / Bäch SZ', 150, 160, 120, 130, NOW()),
  ('kanton-schwyz-schindellegi--feusisberg', 'KANTON SCHWYZ', 'Schindellegi & Feusisberg', 160, 170, 130, 140, NOW()),
  ('kanton-schwyz-lachen-sz--altendorf-sz', 'KANTON SCHWYZ', 'Lachen SZ & Altendorf SZ', 220, 230, 170, 180, NOW()),
  ('kanton-schwyz-hurden-sz--pfffikon-sz--freienbach-sz', 'KANTON SCHWYZ', 'Hurden SZ & Pfäffikon SZ & Freienbach SZ', 180, 190, 140, 150, NOW()),
  ('kanton-zug-zug', 'KANTON ZUG', 'Zug', 170, 180, 130, 140, NOW()),
  ('kanton-zug-baar', 'KANTON ZUG', 'Baar', 180, 190, 140, 150, NOW()),
  ('kanton-zug-cham--steinhausen', 'KANTON ZUG', 'Cham / Steinhausen', 150, 160, 120, 130, NOW())
ON CONFLICT ("id") DO UPDATE SET
  "taxiToAirport" = EXCLUDED."taxiToAirport",
  "vanToAirport" = EXCLUDED."vanToAirport",
  "taxiToZurich" = EXCLUDED."taxiToZurich",
  "vanToZurich" = EXCLUDED."vanToZurich",
  "updatedAt" = NOW();

INSERT INTO "FixedRoute" ("id", "from", "to", "price", "onRequest", "description", "createdAt", "updatedAt")
VALUES
  ('stadt-zrich-flughafen', 'Stadt Zürich', 'Flughafen', 70, false, NULL, NOW(), NOW()),
  ('flughafen-davos', 'Flughafen', 'Davos', 600, false, NULL, NOW(), NOW()),
  ('flughafen-st-moritz', 'Flughafen', 'St. Moritz', 750, false, NULL, NOW(), NOW()),
  ('flughafen-bad-ragaz', 'Flughafen', 'Bad Ragaz', 350, false, NULL, NOW(), NOW()),
  ('flughafen-basel', 'Flughafen', 'Basel', 350, false, NULL, NOW(), NOW()),
  ('flughafen-bern', 'Flughafen', 'Bern', 500, false, NULL, NOW(), NOW()),
  ('flughafen-genf', 'Flughafen', 'Genf', 1000, false, NULL, NOW(), NOW()),
  ('flughafen-milano', 'Flughafen', 'Milano', NULL, true, NULL, NOW(), NOW()),
  ('flughafen-mnchen', 'Flughafen', 'München', NULL, true, NULL, NOW(), NOW()),
  ('tages-pauschale-250-km--85-std', 'Tages Pauschale', '250 km / 8.5 Std', 900, false, NULL, NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "price" = EXCLUDED."price",
  "onRequest" = EXCLUDED."onRequest",
  "updatedAt" = NOW();
