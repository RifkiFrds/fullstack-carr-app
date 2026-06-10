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
  console.log('✅ Categories seeded successfully.');

  // ──────────────────────────────────────────────────────
  // 3. Seed Listings (30 total — 3 per category)
  // ──────────────────────────────────────────────────────

  const existingCount = await prisma.listing.count();
  if (existingCount > 0) {
    console.log(`⏭️  Listings already seeded (${existingCount} found). Skipping.`);
  } else {
    // Resolve admin user
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!admin) {
      console.error('❌ Admin user not found. Cannot seed listings.');
      return;
    }

    // Resolve all categories by slug
    const catMap = {};
    for (const cat of categories) {
      const found = await prisma.category.findUnique({ where: { slug: cat.slug } });
      if (found) catMap[cat.slug] = found.id;
    }

    const listings = [
      // ─── Handphone (3) ──────────────────────────────
      {
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Flagship Samsung terbaru dengan kamera 200MP, S Pen, dan layar Dynamic AMOLED 2X. Kondisi baru, garansi resmi SEIN.',
        imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
        metadata: { brand: 'Samsung', model: 'Galaxy S24 Ultra', ram: '12GB', storage: '256GB', price: 19999000, condition: 'Baru' },
        categorySlug: 'handphone'
      },
      {
        title: 'iPhone 15 Pro Max 256GB',
        description: 'Apple iPhone 15 Pro Max titanium design, chip A17 Pro. Fullset box, charger, dan kabel. Garansi iBox.',
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        metadata: { brand: 'Apple', model: 'iPhone 15 Pro Max', ram: '8GB', storage: '256GB', price: 24999000, condition: 'Baru' },
        categorySlug: 'handphone'
      },
      {
        title: 'Xiaomi Redmi Note 13 Pro',
        description: 'HP murah spek dewa. Kamera 200MP, AMOLED 120Hz, pengisian cepat 67W. Cocok untuk gaming dan fotografi.',
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
        metadata: { brand: 'Xiaomi', model: 'Redmi Note 13 Pro', ram: '8GB', storage: '128GB', price: 3299000, condition: 'Baru' },
        categorySlug: 'handphone'
      },

      // ─── Kendaraan (3) ──────────────────────────────
      {
        title: 'Toyota Avanza 1.5 G MT 2023',
        description: 'Mobil keluarga terlaris di Indonesia. Warna putih metalik, KM rendah 8.000, pajak hidup panjang. Tangan pertama dari baru.',
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800',
        metadata: { brand: 'Toyota', model: 'Avanza 1.5 G', year: 2023, fuel: 'Bensin', transmission: 'Manual', price: 245000000 },
        categorySlug: 'kendaraan'
      },
      {
        title: 'Honda Beat Street 2024',
        description: 'Motor matic Honda Beat edisi terbaru. Hemat BBM, desain sporty, cocok untuk harian. Surat lengkap, plat B.',
        imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
        metadata: { brand: 'Honda', model: 'Beat Street', year: 2024, fuel: 'Bensin', transmission: 'Matic', price: 18500000 },
        categorySlug: 'kendaraan'
      },
      {
        title: 'Daihatsu Xenia R Sporty AT 2022',
        description: 'MPV sporty dengan transmisi otomatis. Interior bersih, AC double blower, ban baru. Siap pakai luar kota.',
        imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
        metadata: { brand: 'Daihatsu', model: 'Xenia R Sporty', year: 2022, fuel: 'Bensin', transmission: 'Otomatis', price: 195000000 },
        categorySlug: 'kendaraan'
      },

      // ─── Laptop (3) ─────────────────────────────────
      {
        title: 'MacBook Air M2 13 inch 2023',
        description: 'Laptop Apple ultra tipis dengan chip M2. Performa luar biasa untuk coding, editing video, dan multitasking berat.',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        metadata: { brand: 'Apple', model: 'MacBook Air M2', ram: '8GB', storage: '256GB SSD', screen: '13.6 inch', price: 16499000 },
        categorySlug: 'laptop'
      },
      {
        title: 'ASUS ROG Strix G16 Gaming Laptop',
        description: 'Laptop gaming powerful dengan Intel i7 Gen 13, RTX 4060. Layar 165Hz, RGB keyboard. Cocok untuk AAA gaming.',
        imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800',
        metadata: { brand: 'ASUS', model: 'ROG Strix G16', ram: '16GB', storage: '512GB SSD', gpu: 'RTX 4060', price: 22999000 },
        categorySlug: 'laptop'
      },
      {
        title: 'Lenovo ThinkPad X1 Carbon Gen 11',
        description: 'Laptop bisnis premium, ringan hanya 1.12kg. Layar 14 inch 2.8K OLED, Intel i7 vPro. Ideal untuk profesional.',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        metadata: { brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 11', ram: '16GB', storage: '512GB SSD', screen: '14 inch OLED', price: 27500000 },
        categorySlug: 'laptop'
      },

      // ─── Buku (3) ───────────────────────────────────
      {
        title: 'Atomic Habits — James Clear (Terjemahan)',
        description: 'Buku self-improvement bestseller dunia. Edisi bahasa Indonesia. Pelajari cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk.',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
        metadata: { author: 'James Clear', genre: 'Self-Improvement', pages: 352, language: 'Indonesia', price: 89000 },
        categorySlug: 'buku'
      },
      {
        title: 'Laskar Pelangi — Andrea Hirata',
        description: 'Novel legendaris Indonesia tentang perjuangan anak-anak Belitung meraih mimpi melalui pendidikan. Wajib baca!',
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
        metadata: { author: 'Andrea Hirata', genre: 'Novel', pages: 534, language: 'Indonesia', price: 79000 },
        categorySlug: 'buku'
      },
      {
        title: 'Clean Code — Robert C. Martin',
        description: 'Buku wajib untuk programmer. Pelajari cara menulis kode yang bersih, mudah dibaca, dan maintainable. Edisi bahasa Inggris.',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800',
        metadata: { author: 'Robert C. Martin', genre: 'Programming', pages: 464, language: 'English', price: 450000 },
        categorySlug: 'buku'
      },

      // ─── Film (3) ───────────────────────────────────
      {
        title: 'KKN di Desa Penari — Screening Spesial',
        description: 'Film horor Indonesia terlaris sepanjang masa. Nikmati pengalaman screening spesial di bioskop premium CGV Grand Indonesia.',
        imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        metadata: { genre: 'Horror', duration: '132 menit', rating: 'D17+', cinema: 'CGV Grand Indonesia', ticketPrice: 75000 },
        categorySlug: 'film'
      },
      {
        title: 'Avengers: Secret Wars — Premiere Ticket',
        description: 'Tiket premiere film Marvel terbaru. Termasuk popcorn dan minuman combo. Seat premium IMAX.',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
        metadata: { genre: 'Action/Sci-Fi', duration: '180 menit', rating: 'PG-13', cinema: 'XXI IMAX', ticketPrice: 150000 },
        categorySlug: 'film'
      },
      {
        title: 'Bumi Manusia — Film Adaptasi Novel',
        description: 'Adaptasi novel Pramoedya Ananta Toer. Film drama sejarah Indonesia yang memukau. Tersedia streaming dan DVD collector edition.',
        imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
        metadata: { genre: 'Drama/Sejarah', duration: '157 menit', rating: 'SU', format: 'Streaming & DVD', price: 49000 },
        categorySlug: 'film'
      },

      // ─── Makanan (3) ────────────────────────────────
      {
        title: 'Nasi Padang Komplit — Rumah Makan Sederhana',
        description: 'Paket nasi Padang lengkap: rendang, ayam pop, gulai nangka, sambal ijo, dan kerupuk. Porsi jumbo, rasa autentik Minang.',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
        metadata: { cuisine: 'Padang', portion: 'Jumbo', spicyLevel: 'Sedang', delivery: true, price: 35000 },
        categorySlug: 'makanan'
      },
      {
        title: 'Bakso Beranak Urat Super',
        description: 'Bakso jumbo isi bakso kecil di dalamnya, plus urat kenyal. Kuah kaldu sapi segar. Tersedia frozen pack untuk pengiriman.',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        metadata: { cuisine: 'Jawa', portion: 'Regular', spicyLevel: 'Ringan', delivery: true, price: 25000 },
        categorySlug: 'makanan'
      },
      {
        title: 'Kopi Susu Gula Aren — Cold Brew 1 Liter',
        description: 'Cold brew premium dengan susu segar dan gula aren asli. Dikemas dalam botol kaca. Cocok untuk pecinta kopi nusantara.',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        metadata: { cuisine: 'Minuman', type: 'Cold Brew', size: '1 Liter', delivery: true, price: 45000 },
        categorySlug: 'makanan'
      },

      // ─── Wisata (3) ─────────────────────────────────
      {
        title: 'Paket Tour Bali 4 Hari 3 Malam',
        description: 'Paket wisata Bali all-inclusive: hotel bintang 4, transportasi AC, guide, tiket masuk Tanah Lot, Ubud, Kintamani, dan Pantai Pandawa.',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        metadata: { destination: 'Bali', duration: '4D3N', includes: 'Hotel, Transport, Guide, Meals', price: 3500000 },
        categorySlug: 'wisata'
      },
      {
        title: 'Open Trip Labuan Bajo & Komodo Island',
        description: 'Open trip 3 hari 2 malam ke Labuan Bajo. Snorkeling, trekking Pulau Komodo, Padar Island sunset. Include kapal phinisi.',
        imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800',
        metadata: { destination: 'Labuan Bajo, NTT', duration: '3D2N', includes: 'Kapal, Snorkeling, Guide, Meals', price: 4200000 },
        categorySlug: 'wisata'
      },
      {
        title: 'Tiket Masuk Taman Safari Bogor',
        description: 'Tiket masuk Taman Safari Indonesia, Cisarua Bogor. Termasuk akses Safari Journey, Baby Zoo, dan pertunjukan satwa.',
        imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800',
        metadata: { destination: 'Bogor, Jawa Barat', type: 'Tiket Harian', includes: 'Safari Journey, Baby Zoo', price: 250000 },
        categorySlug: 'wisata'
      },

      // ─── Sewa (3) ───────────────────────────────────
      {
        title: 'Kost Eksklusif Dekat UI Depok — AC & WiFi',
        description: 'Kamar kost full furnished, AC, WiFi cepat, kamar mandi dalam. Lokasi strategis 5 menit dari gerbang UI Depok.',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        metadata: { type: 'Kost', location: 'Depok, Jawa Barat', facilities: 'AC, WiFi, KM Dalam, Furnished', pricePerMonth: 2500000 },
        categorySlug: 'sewa'
      },
      {
        title: 'Kontrakan 2 Kamar Tidur — Bekasi Timur',
        description: 'Rumah kontrakan 2KT, 1KM, dapur, carport. Lingkungan aman dan tenang. Dekat stasiun KRL Bekasi Timur.',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        metadata: { type: 'Kontrakan', location: 'Bekasi Timur, Jawa Barat', rooms: '2KT, 1KM', pricePerYear: 18000000 },
        categorySlug: 'sewa'
      },
      {
        title: 'Villa Puncak 3 Kamar — Weekend Getaway',
        description: 'Villa di Puncak Bogor dengan view pegunungan. 3 kamar tidur, ruang tamu luas, BBQ area, kolam renang privat.',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        metadata: { type: 'Villa', location: 'Puncak, Bogor', rooms: '3KT, 2KM', amenities: 'Pool, BBQ, Mountain View', pricePerNight: 1800000 },
        categorySlug: 'sewa'
      },

      // ─── Lowongan Kerja (3) ─────────────────────────
      {
        title: 'Frontend Developer — PT Tokopedia (Remote)',
        description: 'Dibutuhkan Frontend Developer berpengalaman React.js minimal 2 tahun. Remote-friendly, benefit lengkap, gaji kompetitif.',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        metadata: { company: 'PT Tokopedia', position: 'Frontend Developer', type: 'Full-time', workMode: 'Remote', salary: 'Rp 12.000.000 - 18.000.000' },
        categorySlug: 'lowongan-kerja'
      },
      {
        title: 'Barista Part-time — Kopi Kenangan Jakarta',
        description: 'Lowongan barista part-time di outlet Kopi Kenangan area Jakarta Selatan. Training disediakan, jam kerja fleksibel.',
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
        metadata: { company: 'Kopi Kenangan', position: 'Barista', type: 'Part-time', workMode: 'On-site', salary: 'Rp 2.500.000 - 3.500.000' },
        categorySlug: 'lowongan-kerja'
      },
      {
        title: 'Data Analyst Intern — Gojek Indonesia',
        description: 'Program magang 6 bulan di tim Data Analytics Gojek. Belajar langsung dari mentor senior. Terbuka untuk mahasiswa semester akhir.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        metadata: { company: 'Gojek Indonesia', position: 'Data Analyst Intern', type: 'Internship', workMode: 'Hybrid', salary: 'Rp 3.000.000 (stipend)' },
        categorySlug: 'lowongan-kerja'
      },

      // ─── Acara (3) ──────────────────────────────────
      {
        title: 'Tech Conference Jakarta 2024',
        description: 'Konferensi teknologi terbesar di Indonesia. Speaker dari Google, Meta, dan startup unicorn lokal. Networking, workshop, dan expo.',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        metadata: { date: '2024-09-15', location: 'JCC Senayan, Jakarta', type: 'Konferensi', ticketPrice: 350000 },
        categorySlug: 'acara'
      },
      {
        title: 'Workshop UI/UX Design for Beginners',
        description: 'Workshop intensif 2 hari belajar UI/UX dari nol. Praktek langsung dengan Figma. Sertifikat dan portofolio project.',
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        metadata: { date: '2024-08-20', location: 'CoHive Mega Kuningan, Jakarta', type: 'Workshop', ticketPrice: 500000 },
        categorySlug: 'acara'
      },
      {
        title: 'Festival Budaya Nusantara 2024',
        description: 'Festival seni dan budaya dari 34 provinsi. Pertunjukan tari, musik tradisional, pameran batik, dan bazaar kuliner nusantara.',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        metadata: { date: '2024-10-01', location: 'Taman Mini Indonesia Indah, Jakarta', type: 'Festival', ticketPrice: 50000 },
        categorySlug: 'acara'
      }
    ];

    // Insert all listings
    let insertedCount = 0;
    for (const listing of listings) {
      const categoryId = catMap[listing.categorySlug];
      if (!categoryId) {
        console.warn(`⚠️  Category "${listing.categorySlug}" not found. Skipping: ${listing.title}`);
        continue;
      }

      await prisma.listing.create({
        data: {
          title: listing.title,
          description: listing.description,
          imageUrl: listing.imageUrl,
          metadata: listing.metadata,
          categoryId: categoryId,
          createdBy: admin.id
        }
      });
      insertedCount++;
    }

    console.log(`✅ Listings seeded successfully: ${insertedCount} records inserted.`);
  }

  // ──────────────────────────────────────────────────────
  // Seed Verification Summary
  // ──────────────────────────────────────────────────────
  const userCount = await prisma.user.count();
  const categoryCount = await prisma.category.count();
  const listingCount = await prisma.listing.count();

  console.log('\n─────────────────────────────────────');
  console.log('📊 SEED VERIFICATION SUMMARY');
  console.log('─────────────────────────────────────');
  console.log(`   Users:      ${userCount}`);
  console.log(`   Categories: ${categoryCount}`);
  console.log(`   Listings:   ${listingCount}`);
  console.log('─────────────────────────────────────\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
