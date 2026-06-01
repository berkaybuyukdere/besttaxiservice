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
