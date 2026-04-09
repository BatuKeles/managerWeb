# Spor Kulübü Web Sitesi

## Başlangıç

### 1. Gereksinimler
- Node.js 18+
- Docker Desktop (PostgreSQL için)
- npm

### 2. Çevre Değişkenleri
`.env` dosyası zaten oluşturuldu. Production için güncelle:
```env
JWT_SECRET="güçlü-ve-uzun-bir-secret-key"
```

### 3. Veritabanını Başlat (Docker)
```bash
# Docker Desktop'ı başlat, sonra:
docker compose up -d postgres

# Veritabanı hazır olana kadar bekle (~10 saniye)
```

### 4. Prisma Migration + Seed
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

### 5. Geliştirme Sunucusu
```bash
npm run dev
```
Site: http://localhost:3000
Admin: http://localhost:3000/admin/login
Login: **admin / admin123**

---

## Production Deploy (VPS)

### Port Kontrolü
```bash
ss -tlnp | grep -E '3001|5433'
```

### Docker Compose
```bash
docker compose up -d
npx prisma migrate deploy
npm run prisma:seed
```

### Nginx
```bash
cp nginx.conf /etc/nginx/sites-available/sportsclub
ln -s /etc/nginx/sites-available/sportsclub /etc/nginx/sites-enabled/
# nginx.conf içindeki domain adını güncelle
nginx -t && systemctl reload nginx
```

---

## Proje Yapısı

```
src/
├── app/
│   ├── page.tsx              # Landing page (SSR)
│   ├── admin/                # Admin panel sayfaları
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── content/
│   │   ├── packages/
│   │   ├── media/
│   │   └── chat/
│   └── api/                  # REST API
│       ├── auth/
│       ├── content/
│       ├── packages/
│       ├── media/
│       └── chat/
├── components/
│   ├── sections/             # Landing page bölümleri
│   ├── chat/                 # Chat widget
│   └── admin/               # Admin bileşenleri
└── lib/
    ├── db.ts                 # Prisma client
    ├── auth.ts               # JWT auth
    └── socket.ts             # Socket.io server
```

## Özellikler

### Landing Page
- Hero section (görsel + başlık + CTA)
- App screenshots carousel
- Rol seçici (Veli / Kulüp / Sporcu / Antrenör)
- Dinamik rol içeriği + paketler
- App Store / Google Play bağlantıları
- Hakkımızda + İletişim
- Canlı destek chat widget

### Admin Panel
- İçerik yönetimi (metin, HTML, görsel)
- Paket yönetimi (aylık + şenlik)
- Medya kütüphanesi (drag & drop upload)
- Canlı destek paneli (Socket.io)

### Güvenlik
- bcrypt şifre hashleme
- JWT httpOnly cookie
- Admin route middleware koruması
- File upload tipi/boyut kontrolü
- Rate limiting (chat endpoint)
