const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1. Seed admin user
  const adminEmail = 'admin@platform.com';
  const adminUsername = 'admin';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword
      }
    });
    console.log('Admin user seeded.');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Seed categories
  const categories = [
    { name: 'Handphone', slug: 'handphone', description: 'Listing handphone dan aksesoris' },
    { name: 'Kendaraan', slug: 'kendaraan', description: 'Listing mobil, motor, dan kendaraan lainnya' },
    { name: 'Laptop', slug: 'laptop', description: 'Listing laptop baru maupun bekas' },
    { name: 'Buku', slug: 'buku', description: 'Listing novel, buku pelajaran, dan komik' },
    { name: 'Film', slug: 'film', description: 'Listing film, series, dan cinema' },
    { name: 'Makanan', slug: 'makanan', description: 'Listing makanan, minuman, dan menu kuliner' },
    { name: 'Wisata', slug: 'wisata', description: 'Listing destinasi wisata menarik' },
    { name: 'Sewa', slug: 'sewa', description: 'Listing kontrakan, kost, dan penginapan' },
    { name: 'Lowongan Kerja', slug: 'lowongan-kerja', description: 'Listing pekerjaan dan magang' },
    { name: 'Acara', slug: 'acara', description: 'Listing event, seminar, dan workshop' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }
  console.log('Categories seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
