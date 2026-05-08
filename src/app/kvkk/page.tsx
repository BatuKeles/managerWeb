import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'KVKK Aydınlatma Metni | Kulüp Bul',
  description: 'Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
}

export default function KvkkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl font-semibold text-slate-900 mb-2">KVKK Aydınlatma Metni</h1>
        <p className="text-sm text-slate-500 mb-12">6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Veri Sorumlusu</h2>
            <p>Kulüp Bul, KVKK'nın 3. maddesi uyarınca veri sorumlusu sıfatıyla hareket etmektedir.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">İşlenen Veri Kategorileri</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Kimlik:</strong> Ad, soyad</li>
              <li><strong>İletişim:</strong> E-posta, telefon</li>
              <li><strong>İşlem güvenliği:</strong> IP adresi, log kayıtları</li>
              <li><strong>Müşteri işlem:</strong> Sohbet kayıtları, talep ve şikâyetler</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">İşleme Amaçları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hizmetin sağlanması ve sürdürülmesi</li>
              <li>Talep ve şikâyetlerin yönetilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Bilgi güvenliği süreçlerinin yürütülmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Aktarım</h2>
            <p>
              Verileriniz; yetkili kişi/kurum, kanunen yetkili makamlar veya hizmet aldığımız altyapı
              sağlayıcıları (Hetzner, Cloudflare, Google Workspace) ile sınırlı şekilde paylaşılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Çerezler</h2>
            <p>
              Site, deneyiminizi geliştirmek için zorunlu çerezler ve isteğe bağlı analitik çerezler kullanır.
              Çerez tercihlerinizi sayfanın altındaki banner üzerinden yönetebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Haklarınız (KVKK m.11)</h2>
            <p>Verilerinizle ilgili olarak şu haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>İşlenip işlenmediğini öğrenme, bilgi talep etme</li>
              <li>Düzeltilmesini, silinmesini veya yok edilmesini isteme</li>
              <li>İşlemeye itiraz etme</li>
            </ul>
            <p>
              Başvurularınızı <a href="mailto:kvkk@kulupbul.com" className="text-indigo-600 hover:text-indigo-700">kvkk@kulupbul.com</a> adresine gönderebilirsiniz.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
