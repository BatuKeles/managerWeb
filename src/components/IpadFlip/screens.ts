export interface ScreenMeta {
  key: string
  src: string
  eyebrow: string
  title: string
  description: string
  features: string[]
}

export const IMAGES: ScreenMeta[] = [
  {
    key: 'dashboard',
    src: '/screens/dashboard.png',
    eyebrow: 'Modül 01 · Dashboard',
    title: 'Kulübünüzün Nabzı Tek Ekranda',
    description:
      'Toplam üye, aktif seans, onay bekleyen talepler ve okunmamış mesajlar — hepsi açılır açılmaz önünüzde. Yaklaşan seansları, borçlu üyeleri ve bu ayın net gelirini tek bakışta görün.',
    features: ["Canlı KPI'lar", 'Yaklaşan Seanslar', 'Tahsilat Özeti'],
  },
  {
    key: 'seanslar',
    src: '/screens/seanslar.png',
    eyebrow: 'Modül 02 · Seans Takvimi',
    title: 'Haftalık Planlama, Dakikasında',
    description:
      'Günlük, haftalık ve aylık görünüm arasında geçiş yapın; antrenör ya da seans bazlı filtreleyin. Boş saatleri görün, çakışmaları önleyin, yeni seansı tek tıkla ekleyin.',
    features: ['Haftalık Grid', 'Antrenör Filtresi', 'Hızlı Ekleme'],
  },
  {
    key: 'onaylar',
    src: '/screens/onaylar.png',
    eyebrow: 'Modül 03 · Onaylar',
    title: 'Taleplere Saniyeler İçinde Dönüş',
    description:
      'Seans kayıt, telafi dersi ve iptal talepleri tek panelde toplanır. Onaylayın, tarih atayın ya da reddedin — her adım otomatik kayıt altına alınır, veliler beklemez.',
    features: ['Kayıt Talepleri', 'Telafi Dersleri', 'İptal Yönetimi'],
  },
  {
    key: 'antrenorler',
    src: '/screens/antrenorler.png',
    eyebrow: 'Modül 04 · Antrenör Yönetimi',
    title: 'Ekibinizi Tek Tıkla Yönetin',
    description:
      'Antrenör ekleyin, gruplara atayın, mesaj izinlerini yönetin. Kim aktif, kim beklemede, kim hangi grupla çalışıyor — tüm ekip şeffaf ve güncel.',
    features: ['Ekip Listesi', 'Görevlendirme', 'Mesaj İzinleri'],
  },
  {
    key: 'mesajlar',
    src: '/screens/mesajlar.png',
    eyebrow: 'Modül 05 · Otomatik Mesajlar',
    title: 'Otomatik Hatırlatmalar, Kişisel Dokunuş',
    description:
      'Ödeme hatırlatmaları, geciken tahsilatlar ve özel kutlamalar otomatik gönderilir. Dinamik şablonlara üye adı, tutar ve tarih değişkenleri tek tıkla eklenir — siz yazmadan konuşur.',
    features: ['Dinamik Şablon', 'Değişken Alanlar', 'Zamanlı Gönderim'],
  },
  {
    key: 'paketler',
    src: '/screens/paketler.png',
    eyebrow: 'Modül 06 · Üyelik Paketleri',
    title: 'Esnek Fiyatlandırma, Net Görünürlük',
    description:
      'Aylık, çok aylık ve yıllık paketlerinizi süreler ve ders sayılarıyla tanımlayın. Popüler olanları vurgulayın, KDV otomatik hesaplansın, toplam ciro anlık görünsün.',
    features: ['Özel Planlar', 'Popüler Rozeti', 'KDV Otomasyonu'],
  },
  {
    key: 'stok',
    src: '/screens/stok.png',
    eyebrow: 'Modül 07 · Stok Takibi',
    title: 'Malzemeniz Azalmadan Haberiniz Olsun',
    description:
      'Ekipman, kıyafet, aksesuar ve beslenme ürünlerinizi kategorilere ayırın. Kritik seviyenin altına düşen ürünleri öne çıkarın, stok değerinizi gerçek zamanlı takip edin.',
    features: ['4 Kategori', 'Kritik Uyarılar', 'Anlık Stok Değeri'],
  },
]
