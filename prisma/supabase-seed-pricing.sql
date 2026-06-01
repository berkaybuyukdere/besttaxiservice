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
