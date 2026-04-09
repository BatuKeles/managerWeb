const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12)

  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
    },
  })

  console.log('Admin user created: admin / admin123')

  // Seed initial content blocks
  const contentBlocks = [
    // Hero Section
    { key: 'hero_title', type: 'text', value: 'Spor Kulübünüze Dijital Güç Katın', section: 'hero' },
    { key: 'hero_subtitle', type: 'text', value: 'Veliler, öğrenciler, antrenörler ve kulüpler için tek platform', section: 'hero' },
    { key: 'hero_cta_text', type: 'text', value: 'Uygulamayı İndir', section: 'hero' },
    { key: 'hero_image', type: 'image', value: null, section: 'hero' },

    // About Section
    { key: 'about_title', type: 'text', value: 'Hakkımızda', section: 'about' },
    { key: 'about_description', type: 'html', value: '<p>Spor kulüplerini dijital dönüşüme taşıyan yenilikçi platformumuz, sporcuların, ailelerin ve antrenörlerin iletişimini güçlendiriyor.</p>', section: 'about' },

    // Contact Section
    { key: 'contact_email', type: 'text', value: 'info@sporkulubu.com', section: 'contact' },
    { key: 'contact_phone', type: 'text', value: '+90 555 000 0000', section: 'contact' },
    { key: 'contact_address', type: 'text', value: 'İstanbul, Türkiye', section: 'contact' },

    // Role-specific content - Veli
    { key: 'veli_title', type: 'text', value: 'Çocuğunuzun Gelişimini Takip Edin', role: 'veli', section: 'role' },
    { key: 'veli_description', type: 'text', value: 'Antrenman programları, devamsızlık takibi ve antrenör geri bildirimlerine anında erişin.', role: 'veli', section: 'role' },

    // Role-specific content - Kulüp
    { key: 'kulup_title', type: 'text', value: 'Kulüpler İçin', role: 'kulup', section: 'role' },
    { key: 'kulup_description', type: 'text', value: 'Üye yönetimi, ödeme takibi ve organizasyon araçlarıyla kulübünüzü profesyonelce yönetin.', role: 'kulup', section: 'role' },

    // Role-specific content - Öğrenci
    { key: 'ogrenci_title', type: 'text', value: 'Sporcular İçin', role: 'ogrenci', section: 'role' },
    { key: 'ogrenci_description', type: 'text', value: 'Antrenman programın, performans istatistiklerin ve takım arkadaşlarınla iletişim tek uygulamada.', role: 'ogrenci', section: 'role' },

    // Role-specific content - Antrenör
    { key: 'antrenor_title', type: 'text', value: 'Antrenörler İçin', role: 'antrenor', section: 'role' },
    { key: 'antrenor_description', type: 'text', value: 'Sporcu performans takibi, program planlama ve veli iletişim araçları ile daha verimli çalışın.', role: 'antrenor', section: 'role' },
  ]

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: { value: block.value, type: block.type, role: block.role || null, section: block.section || null },
      create: {
        key: block.key,
        type: block.type,
        value: block.value || null,
        role: block.role || null,
        section: block.section || null,
      },
    })
  }

  console.log('Content blocks seeded')

  // Seed packages
  const packages = [
    {
      type: 'aylik',
      name: 'Başlangıç Paketi',
      price: 299,
      features: ['50 aktif sporcu', 'Temel raporlama', 'E-posta desteği', 'Mobil uygulama'],
      isActive: true,
      sortOrder: 1,
    },
    {
      type: 'aylik',
      name: 'Profesyonel Paket',
      price: 599,
      features: ['200 aktif sporcu', 'Gelişmiş raporlama', 'Öncelikli destek', 'Mobil uygulama', 'SMS bildirimleri', 'Özel raporlar'],
      isActive: true,
      sortOrder: 2,
    },
    {
      type: 'aylik',
      name: 'Kurumsal Paket',
      price: 999,
      features: ['Sınırsız sporcu', 'Tam analitik', '7/24 destek', 'Mobil uygulama', 'API erişimi', 'Özel entegrasyon', 'Çoklu şube'],
      isActive: true,
      sortOrder: 3,
    },
    {
      type: 'senlik',
      name: 'Şenlik Temel',
      price: 1990,
      features: ['100 katılımcı', 'Kayıt yönetimi', 'Turnuva braketi', 'Sonuç yayını'],
      isActive: true,
      sortOrder: 1,
    },
    {
      type: 'senlik',
      name: 'Şenlik Premium',
      price: 3990,
      features: ['Sınırsız katılımcı', 'Kayıt yönetimi', 'Turnuva braketi', 'Canlı sonuç', 'Kupa & madalya yönetimi', 'Mobil app desteği'],
      isActive: true,
      sortOrder: 2,
    },
  ]

  for (const pkg of packages) {
    const existing = await prisma.package.findFirst({ where: { name: pkg.name, type: pkg.type } })
    if (!existing) {
      await prisma.package.create({ data: pkg })
    }
  }

  console.log('Packages seeded')
  console.log('\nSeed complete!')
  console.log('Login: admin / admin123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
