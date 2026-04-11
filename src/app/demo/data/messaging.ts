// ============================================================
// AcquaManager Demo — Messaging Data
// ============================================================
import type { MessageTemplate } from '../types'

export const mockTemplates: MessageTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Yakla\u015fan \u00d6demeler',
    category: '\u00d6deme',
    templateText: 'Say\u0131n {isim}, {tutar} tutar\u0131ndaki \u00f6demenizin son tarihi {tarih} olarak belirlenmistir. L\u00fctfen \u00f6demenizi ger\u00e7ekle\u015ftirin.',
    isActive: true,
    isSystemTemplate: true,
  },
  {
    id: 'tpl-2',
    name: 'Geciken \u00d6demeler',
    category: '\u00d6deme',
    templateText: 'Say\u0131n {isim}, {tutar} tutar\u0131ndaki \u00f6demeniz gecikmi\u015ftir. En k\u0131sa s\u00fcrede \u00f6demenizi ger\u00e7ekle\u015ftirmenizi rica ederiz.',
    isActive: true,
    isSystemTemplate: true,
  },
  {
    id: 'tpl-3',
    name: 'Do\u011fum G\u00fcn\u00fc Kutlamas\u0131',
    category: 'Kutlama',
    templateText: 'Mutlu y\u0131llar {isim}! \ud83c\udf82 Demo Y\u00fczme Kul\u00fcb\u00fc ailesi olarak do\u011fum g\u00fcn\u00fcn\u00fcz\u00fc kutlar\u0131z.',
    isActive: true,
    isSystemTemplate: false,
  },
  {
    id: 'tpl-4',
    name: '\u00d6zel Kutlama',
    category: 'Kutlama',
    templateText: 'Tebrikler {isim}! Ba\u015far\u0131lar\u0131n\u0131z\u0131n devam\u0131n\u0131 dileriz. Demo Y\u00fczme Kul\u00fcb\u00fc',
    isActive: true,
    isSystemTemplate: false,
  },
  {
    id: 'tpl-5',
    name: 'Seans \u0130ptali Bildirimi',
    category: 'Bilgilendirme',
    templateText: 'Say\u0131n {isim}, {tarih} tarihli {seans} seans\u0131 iptal edilmi\u015ftir. Telafi seans\u0131 hakk\u0131nda bilgilendirileceksiniz.',
    isActive: true,
    isSystemTemplate: true,
  },
]
