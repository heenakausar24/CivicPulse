import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with authority users...');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('adminpassword123', salt);
  const officerPasswordHash = await bcrypt.hash('officerpassword123', salt);

  // Seed Admin Authority
  const admin = await prisma.user.upsert({
    where: { email: 'admin@civicpulse.gov' },
    update: {},
    create: {
      email: 'admin@civicpulse.gov',
      name: 'Admin Authority',
      password: adminPasswordHash,
      phone: '1234567890',
      role: 'AUTHORITY',
    },
  });
  console.log(`Seeded Authority: ${admin.email}`);

  // Seed Officer Authority
  const officer = await prisma.user.upsert({
    where: { email: 'officer@civicpulse.gov' },
    update: {},
    create: {
      email: 'officer@civicpulse.gov',
      name: 'Officer Authority',
      password: officerPasswordHash,
      phone: '0987654321',
      role: 'AUTHORITY',
    },
  });
  console.log(`Seeded Authority: ${officer.email}`);

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
