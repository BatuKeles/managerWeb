import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Gizlilik Politikası | Kulüp Bul',
  description: 'Kulüp Bul gizlilik politikası ve kişisel verilerin işlenmesi.',
}

export default function GizlilikPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl font-semibold text-slate-900 mb-2">Gizlilik Politikası</h1>
        <p className="text-sm text-slate-500 mb-12">Son güncelleme: {new Date().getFullYear()}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Veri Sorumlusu</h2>
            <p>
              Bu sitede ("Kulüp Bul"), kişisel verilerinizin işlenmesinden Kulüp Bul ekibi
              veri sorumlusu sıfatıyla yetkilidir. İletişim için: <a href="mailto:info@kulupbul.com" className="text-indigo-600 hover:text-indigo-700">info@kulupbul.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Toplanan Veriler</h2>
            <p>Sitemizi ziyaret ettiğinizde aşağıdaki veriler toplanabilir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>İletişim formundan veya canlı destekten gönderdiğiniz bilgiler (ad, e-posta, mesaj)</li>
              <li>Çerezler aracılığıyla site kullanım verileri</li>
              <li>IP adresi ve tarayıcı bilgisi (güvenlik amacıyla)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Verilerin Kullanım Amacı</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hizmet sağlama ve destek talebi yanıtlama</li>
              <li>Site iyileştirmeleri ve performans analizi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Verilerin Paylaşımı</h2>
            <p>
              Kişisel verileriniz üçüncü kişilerle satış, kiralama veya pazarlama amacıyla paylaşılmaz.
              Sadece yasal zorunluluk halinde yetkili mercilerle paylaşılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Çerezler (Cookies)</h2>
            <p>
              Site, deneyiminizi geliştirmek için zorunlu çerezler kullanır. Detaylar için
              <a href="/kvkk" className="text-indigo-600 hover:text-indigo-700"> KVKK aydınlatma metnine</a> göz atın.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Haklarınız</h2>
            <p>
              KVKK 11. madde uyarınca; verilerinize erişme, düzeltilmesini veya silinmesini talep etme,
              işleme itiraz etme ve diğer haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
