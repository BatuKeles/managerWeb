'use client'

import { useState } from 'react'
import { DemoTopBar } from './DemoTopBar'
import { Plus, Info, Pencil, Trash2, Copy, Minus } from 'lucide-react'
import { useDemoStore } from '../store'

const tabs = ['Yaklasan Odemeler', 'Geciken Odemeler', 'Ozel Kutlamalar', 'Sablonlar'] as const

const reminderOptions = ['Ayni gun', '1 gun kala', '3 gun kala', '1 hafta kala', '10 gun kala']

const variableTags = ['{Uye Adi}', '{Tutar}', '{Tarih}', '{Kulup Adi}']

const overdueFrequencies = ['Her gun', '2 gunde bir', 'Haftada bir']

export default function MesajlarDemo() {
  const templates = useDemoStore((s) => s.templates)
  const toggleTemplate = useDemoStore((s) => s.toggleTemplate)
  const updateTemplate = useDemoStore((s) => s.updateTemplate)
  const addTemplate = useDemoStore((s) => s.addTemplate)
  const removeTemplate = useDemoStore((s) => s.removeTemplate)
  const updateTemplateName = useDemoStore((s) => s.updateTemplateName)

  const [activeTab, setActiveTab] = useState<string>('Yaklasan Odemeler')
  const [mode, setMode] = useState<'Dinamik' | 'Sabit'>('Dinamik')
  const [selectedReminder, setSelectedReminder] = useState('3 gun kala')

  // Tab 1: Yaklasan Odemeler state
  const activeTemplate = templates[0]
  const isActive = activeTemplate?.isActive ?? true
  const messageText = activeTemplate?.templateText ?? ''

  // Tab 2: Geciken Odemeler state
  const overdueTemplate = templates.find((t) => t.name === 'Geciken Odemeler') ?? templates[1]
  const [overdueActive, setOverdueActive] = useState(true)
  const [overdueFreq, setOverdueFreq] = useState('Her gun')
  const [overdueThreshold, setOverdueThreshold] = useState(3)
  const [overdueMsg, setOverdueMsg] = useState(overdueTemplate?.templateText ?? '')

  // Tab 3: Ozel Kutlamalar state
  const birthdayTemplate = templates.find((t) => t.name === 'Dogum Gunu Kutlamasi') ?? templates[2]
  const anniversaryTemplate = templates.find((t) => t.name === 'Ozel Kutlama') ?? templates[3]
  const [birthdayEnabled, setBirthdayEnabled] = useState(true)
  const [birthdayMsg, setBirthdayMsg] = useState(birthdayTemplate?.templateText ?? '')
  const [anniversaryEnabled, setAnniversaryEnabled] = useState(true)
  const [anniversaryMsg, setAnniversaryMsg] = useState(anniversaryTemplate?.templateText ?? '')

  // Tab 4: Sablonlar state
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [tplName, setTplName] = useState('')
  const [tplText, setTplText] = useState('')

  const openNewTemplate = () => {
    setEditingTemplateId(null)
    setTplName('')
    setTplText('')
    setShowTemplateDialog(true)
  }

  const openEditTemplate = (t: typeof templates[0]) => {
    setEditingTemplateId(t.id)
    setTplName(t.name)
    setTplText(t.templateText)
    setShowTemplateDialog(true)
  }

  const handleSaveTemplate = () => {
    if (!tplName.trim()) return
    if (editingTemplateId) {
      updateTemplateName(editingTemplateId, tplName)
      updateTemplate(editingTemplateId, tplText)
    } else {
      addTemplate({
        id: `tpl-${Date.now()}`,
        name: tplName,
        category: 'Ozel',
        templateText: tplText,
        isActive: true,
        isSystemTemplate: false,
      })
    }
    setShowTemplateDialog(false)
  }

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const ToggleSwitch = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${active ? 'bg-teal-500' : 'bg-gray-600'}`}
    >
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar title="Mesajlar" />

      {/* Tab bar */}
      <div className="flex gap-2 px-6 pt-5 pb-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                : 'text-gray-400 hover:text-gray-300 border border-white/[0.06] hover:border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* ========== TAB 1: YAKLASAN ODEMELER ========== */}
        {activeTab === 'Yaklasan Odemeler' && (
          <div className="space-y-6 max-w-3xl">
            {/* Temel Bilgiler */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                  </div>
                  <h3 className="text-white font-semibold">Temel Bilgiler</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Aktif</span>
                  <ToggleSwitch
                    active={isActive}
                    onToggle={() => { if (activeTemplate) toggleTemplate(activeTemplate.id) }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-400 ml-7">
                Otomasyonu acik tuttugounuzda uyelerinize hatirlatma mesajlari otomatik gonderilir.
              </p>

              {/* Otomasyon Modu */}
              <div className="mt-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Otomasyon Modu</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode('Dinamik')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === 'Dinamik'
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                        : 'text-gray-400 border border-white/[0.06] hover:border-white/10'
                    }`}
                  >
                    Dinamik
                  </button>
                  <button
                    onClick={() => setMode('Sabit')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === 'Sabit'
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                        : 'text-gray-400 border border-white/[0.06] hover:border-white/10'
                    }`}
                  >
                    Sabit
                  </button>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-lg bg-teal-500/5 border-l-2 border-teal-400 p-3">
                  <Info className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-teal-300/80">
                    Odeme vadesi tarihine gore otomatik hesaplar. Her uyenin son odeme gunune bakarak mesaj gonderilir.
                  </p>
                </div>
              </div>
            </div>

            {/* Mesaj Icerigi */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                  </div>
                  <h3 className="text-white font-semibold">Mesaj Icerigi</h3>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-teal-400 hover:text-teal-300 transition-colors border border-teal-500/30 rounded-lg px-3 py-1.5">
                  <span>Sablonlar</span>
                </button>
              </div>
              <p className="text-sm text-gray-400 ml-7 mb-4">
                Kisisellestirilmis mesaj yazin. Asagidaki etiketler gonderim sirasinda uye bilgileriyle otomatik doldurulur.
              </p>

              <textarea
                value={messageText}
                onChange={(e) => {
                  if (activeTemplate) updateTemplate(activeTemplate.id, e.target.value)
                }}
                rows={4}
                className="w-full rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white text-sm p-3 resize-none focus:outline-none focus:border-teal-500/40 placeholder-gray-500"
                placeholder="Mesajinizi buraya yazin..."
              />

              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Mesaja ekle:</p>
                <div className="flex flex-wrap gap-2">
                  {variableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (activeTemplate) updateTemplate(activeTemplate.id, messageText + ' ' + tag)
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 text-xs hover:bg-teal-500/10 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gonderim Ayarlari */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-5 w-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500" />
                </div>
                <h3 className="text-white font-semibold">Gonderim Ayarlari</h3>
              </div>
              <p className="text-sm text-gray-400 ml-7 mb-4">
                Odeme tarihinden kac gun once hatirlatma gonderilsin? Birden fazla secebilirsiniz.
              </p>

              <div className="flex flex-wrap gap-2 ml-7">
                {reminderOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedReminder(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedReminder === opt
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                        : 'text-gray-400 border border-white/[0.06] hover:border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 ml-7 mt-3">
                Secilen zamanlama icin hatirlatma gonderilecek.
              </p>
            </div>

            <div className="flex justify-end pb-6">
              <button className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-colors">
                Degisiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ========== TAB 2: GECIKEN ODEMELER ========== */}
        {activeTab === 'Geciken Odemeler' && (
          <div className="space-y-6 max-w-3xl">
            {/* Toggle */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                  </div>
                  <h3 className="text-white font-semibold">Geciken Odeme Hatirlatmalari</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Aktif</span>
                  <ToggleSwitch active={overdueActive} onToggle={() => setOverdueActive(!overdueActive)} />
                </div>
              </div>
              <p className="text-sm text-gray-400 ml-7">
                Odeme tarihi gecen uyelere otomatik hatirlatma gonderin.
              </p>
            </div>

            {/* Frequency */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <h3 className="text-white font-semibold mb-3">Hatirlatma Sikligi</h3>
              <div className="flex flex-wrap gap-2">
                {overdueFrequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setOverdueFreq(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      overdueFreq === f
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                        : 'text-gray-400 border border-[#1E293B] hover:border-white/10'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Threshold */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <h3 className="text-white font-semibold mb-3">Gecikme Esigi</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOverdueThreshold(Math.max(1, overdueThreshold - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E293B] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-bold text-[#D97706]">{overdueThreshold} gun</span>
                <button
                  onClick={() => setOverdueThreshold(overdueThreshold + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E293B] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Odeme tarihinden {overdueThreshold} gun sonra hatirlatma baslar.</p>
            </div>

            {/* Message template */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <h3 className="text-white font-semibold mb-3">Mesaj Sablonu</h3>
              <textarea
                value={overdueMsg}
                onChange={(e) => setOverdueMsg(e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white text-sm p-3 resize-none focus:outline-none focus:border-teal-500/40 placeholder-gray-500"
              />
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Mesaja ekle:</p>
                <div className="flex flex-wrap gap-2">
                  {variableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setOverdueMsg(overdueMsg + ' ' + tag)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 text-xs hover:bg-teal-500/10 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pb-6">
              <button
                onClick={() => { if (overdueTemplate) updateTemplate(overdueTemplate.id, overdueMsg) }}
                className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-colors"
              >
                Degisiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ========== TAB 3: OZEL KUTLAMALAR ========== */}
        {activeTab === 'Ozel Kutlamalar' && (
          <div className="space-y-6 max-w-3xl">
            {/* Birthday */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Dogum Gunu</h3>
                <ToggleSwitch active={birthdayEnabled} onToggle={() => setBirthdayEnabled(!birthdayEnabled)} />
              </div>
              {birthdayEnabled && (
                <>
                  <textarea
                    value={birthdayMsg}
                    onChange={(e) => setBirthdayMsg(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white text-sm p-3 resize-none focus:outline-none focus:border-teal-500/40 placeholder-gray-500"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['{Uye Adi}', '{Kulup Adi}'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setBirthdayMsg(birthdayMsg + ' ' + tag)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 text-xs hover:bg-teal-500/10 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Anniversary */}
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Yil Donumu</h3>
                <ToggleSwitch active={anniversaryEnabled} onToggle={() => setAnniversaryEnabled(!anniversaryEnabled)} />
              </div>
              {anniversaryEnabled && (
                <>
                  <textarea
                    value={anniversaryMsg}
                    onChange={(e) => setAnniversaryMsg(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white text-sm p-3 resize-none focus:outline-none focus:border-teal-500/40 placeholder-gray-500"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['{Uye Adi}', '{Kulup Adi}'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setAnniversaryMsg(anniversaryMsg + ' ' + tag)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 text-xs hover:bg-teal-500/10 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end pb-6">
              <button
                onClick={() => {
                  if (birthdayTemplate) updateTemplate(birthdayTemplate.id, birthdayMsg)
                  if (anniversaryTemplate) updateTemplate(anniversaryTemplate.id, anniversaryMsg)
                }}
                className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-colors"
              >
                Degisiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ========== TAB 4: SABLONLAR ========== */}
        {activeTab === 'Sablonlar' && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-semibold">Mesaj Sablonlari</h2>
              <button
                onClick={openNewTemplate}
                className="flex items-center gap-2 rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Yeni Sablon
              </button>
            </div>

            {templates.map((t) => (
              <div key={t.id} className="rounded-xl bg-[#111827] border border-[#1E293B] p-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{t.name}</h3>
                    <span className="text-xs text-[#9ca3af]">{t.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditTemplate(t)}
                      className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#9ca3af] hover:text-white transition-colors"
                      title="Duzenle"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleCopyTemplate(t.templateText)}
                      className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#9ca3af] hover:text-white transition-colors"
                      title="Kopyala"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    {!t.isSystemTemplate && (
                      <button
                        onClick={() => removeTemplate(t.id)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.06] text-red-400 hover:text-red-300 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#9ca3af] line-clamp-2">{t.templateText}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== TEMPLATE EDITOR DIALOG ========== */}
      {showTemplateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowTemplateDialog(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">
              {editingTemplateId ? 'Sablon Duzenle' : 'Yeni Sablon'}
            </h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">SABLON ADI</label>
              <input
                type="text"
                value={tplName}
                onChange={(e) => setTplName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                placeholder="Sablon adi..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">MESAJ ICERIGI</label>
              <textarea
                value={tplText}
                onChange={(e) => setTplText(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
                placeholder="Mesaj metni..."
              />
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Degisken ekle:</p>
              <div className="flex flex-wrap gap-2">
                {variableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setTplText(tplText + ' ' + tag)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 text-xs hover:bg-teal-500/10 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowTemplateDialog(false)} className="px-4 py-2 rounded-xl border border-[#1E293B] text-[#9ca3af] hover:text-white transition-colors">Iptal</button>
              <button onClick={handleSaveTemplate} className="px-6 py-2 rounded-xl bg-[#0D9488] text-white font-semibold hover:bg-teal-600 transition-colors">Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
