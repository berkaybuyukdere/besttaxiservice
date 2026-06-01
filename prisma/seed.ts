import { PrismaClient } from '@prisma/client';
import { PRICING_DATA, FIXED_ROUTES } from '../src/lib/pricing-data';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed pricing data
  for (const entry of PRICING_DATA) {
    await prisma.pricing.upsert({
      where: {
        id: `${entry.region}-${entry.location}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      create: entry,
      update: entry,
    });
  }
  console.log(`✅ Seeded ${PRICING_DATA.length} pricing entries`);

  // Seed fixed routes
  for (const route of FIXED_ROUTES) {
    await prisma.fixedRoute.upsert({
      where: {
        id: `${route.from}-${route.to}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      create: route,
      update: route,
    });
  }
  console.log(`✅ Seeded ${FIXED_ROUTES.length} fixed routes`);

  // Seed vehicles
  const vehicles = [
    { vehicleType: 'BUSINESS_FAMILY' as const, name: 'Business & Family Class', model: 'Mercedes Benz V-Class', capacity: 7, luggageCapacity: 7, priceMultiplier: 1.0 },
    { vehicleType: 'VIP_ULTRA_COMFORT' as const, name: 'VIP Ultra Comfort', model: 'Mercedes Benz V300 Maybach', capacity: 5, luggageCapacity: 5, priceMultiplier: 1.3 },
    { vehicleType: 'PREMIUM_CLASS' as const, name: 'Premium Class', model: 'Mercedes Benz S-Class', capacity: 3, luggageCapacity: 3, priceMultiplier: 1.5 },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: v.vehicleType },
      create: { id: v.vehicleType, ...v },
      update: v,
    });
  }
  console.log('✅ Seeded vehicles');

  // Seed admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@besttaxiservice.ch' },
    create: {
      email: 'admin@besttaxiservice.ch',
      password: hashedPassword,
      name: 'Admin',
    },
    update: {},
  });
  console.log('✅ Seeded admin user (admin@besttaxiservice.ch / admin123)');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
