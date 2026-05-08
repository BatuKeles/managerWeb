import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Kullanım Şartları | Kulüp Bul',
  description: 'Kulüp Bul kullanım şartları ve hizmet koşulları.',
}

export default function KullanimSartlariPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl font-semibold text-slate-900 mb-2">Kullanım Şartları</h1>
        <p className="text-sm text-slate-500 mb-12">Son güncelleme: {new Date().getFullYear()}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Hizmetin Tanımı</h2>
            <p>
              Kulüp Bul, spor kulüpleri, antrenörler, veliler ve sporcular için tasarlanmış bir
              dijital yönetim platformudur. Üyelik, kayıt, devam takibi, ödeme ve iletişim
              özellikleri sunar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Hesap Sorumluluğu</h2>
            <p>
              Hesap bilgilerinizin (kullanıcı adı, parola) gizliliğinden siz sorumlusunuz.
              Hesabınız üzerinden gerçekleşen tüm işlemlerden siz sorumlu tutulursunuz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Yasaklı Davranışlar</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sistemi kötüye kullanmak, başkalarının hesabına erişmeye çalışmak</li>
              <li>Yasalara aykırı içerik paylaşmak</li>
              <li>Otomatik araçlarla aşırı yük oluşturmak (scraping, DDoS)</li>
              <li>Telif hakkı ihlali oluşturan materyaller yüklemek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Ödeme ve Abonelik</h2>
            <p>
              Ücretli paketler abonelik bazlıdır. Aboneliklerinizi istediğiniz zaman iptal edebilirsiniz;
              ancak ödenmiş süre için iade yapılmaz. Fiyatlar önceden bildirimle değiştirilebilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Sorumluluk Sınırlandırması</h2>
            <p>
              Hizmet "olduğu gibi" sunulmaktadır. Kulüp Bul, hizmetin kesintisiz veya hatasız olacağını
              garanti etmez. Veri kaybı, gelir kaybı veya dolaylı zararlardan sorumlu tutulamaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Değişiklikler</h2>
            <p>
              Bu şartlar zaman zaman güncellenebilir. Önemli değişikliklerde sizinle iletişime geçeceğiz.
              Güncel sürümü bu sayfada bulabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. İletişim</h2>
            <p>
              Sorularınız için: <a href="mailto:info@kulupbul.com" className="text-indigo-600 hover:text-indigo-700">info@kulupbul.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
