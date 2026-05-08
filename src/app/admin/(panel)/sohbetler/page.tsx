'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface SessionRow {
  id: string
  visitorName: string
  status: 'waiting' | 'active' | 'closed'
  createdAt: string
  updatedAt: string
  messageCount: number
}

interface ChatMessage {
  id: string | number
  senderType: 'visitor' | 'admin' | 'system'
  message: string
  createdAt: string
}

export default function SohbetlerPage() {
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const loadSessions = useCallback(async () => {
    const res = await fetch('/api/admin/chat/sessions')
    if (res.ok) setSessions(await res.json())
  }, [])

  // Connect socket and join admin room
  useEffect(() => {
    const s = io({ path: '/socket.io', transports: ['websocket', 'polling'] })
    socketRef.current = s
    s.on('connect', () => s.emit('join:admin'))
    s.on('session:new', () => loadSessions())
    s.on('session:update', () => loadSessions())
    s.on('admin:newMessage', () => loadSessions())
    s.on('message:new', (msg: ChatMessage) => {
      // Only update messages of currently selected session
      setMessages((prev) => prev.find((m) => String(m.id) === String(msg.id)) ? prev : [...prev, msg])
    })
    return () => { s.disconnect(); socketRef.current = null }
  }, [loadSessions])

  useEffect(() => { loadSessions() }, [loadSessions])

  // Load messages when session changes
  useEffect(() => {
    if (!activeId) return
    fetch(`/api/chat/${activeId}/messages`)
      .then((r) => (r.ok ? r.json() : []))
      .then((m: ChatMessage[]) => Array.isArray(m) && setMessages(m))
    // Join the session room to receive new messages
    socketRef.current?.emit('join:session', activeId)
  }, [activeId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text || !activeId || !socketRef.current) return
    socketRef.current.emit('admin:message', { sessionId: activeId, message: text })
    setInput('')
  }

  const close = (id: string) => {
    if (!confirm('Sohbeti kapatmak istiyor musunuz?')) return
    socketRef.current?.emit('session:close', id)
  }

  const activeSession = sessions.find((s) => s.id === activeId)

  return (
    <div>
      <h1 className="font-headline text-2xl font-semibold text-slate-900 mb-1">Canlı Destek</h1>
      <p className="text-sm text-slate-500 mb-6">Ziyaretçilerden gelen sohbet talepleri.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        {/* Sessions list */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h2 className="text-sm font-semibold text-slate-900">Sohbetler ({sessions.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {sessions.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-400">Henüz sohbet yok</div>
            )}
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors ${
                  activeId === s.id ? 'bg-indigo-50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-sm text-slate-900 truncate">{s.visitorName}</span>
                  <StatusBadge status={s.status} />
                </div>
                <div className="text-xs text-slate-500">{s.messageCount} mesaj · {new Date(s.updatedAt).toLocaleString('tr-TR')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden">
          {!activeSession ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Görüntülemek için soldan bir sohbet seçin
            </div>
          ) : (
            <>
              <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{activeSession.visitorName}</div>
                  <div className="text-xs text-slate-500">{activeSession.id.slice(0, 8)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={activeSession.status} />
                  {activeSession.status !== 'closed' && (
                    <button onClick={() => close(activeSession.id)} className="text-xs text-red-500 hover:text-red-700">Kapat</button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-2">
                {messages.length === 0 ? (
                  <div className="text-center text-sm text-slate-400 my-12">Henüz mesaj yok</div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        m.senderType === 'visitor'
                          ? 'bg-white border border-slate-200 self-start'
                          : m.senderType === 'admin'
                          ? 'bg-indigo-600 text-white self-end'
                          : 'bg-amber-50 border border-amber-200 self-center text-xs italic'
                      }`}
                    >
                      <div>{m.message}</div>
                      <div className={`text-[10px] mt-1 ${m.senderType === 'admin' ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {new Date(m.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {activeSession.status !== 'closed' && (
                <div className="p-3 border-t border-slate-200 flex gap-2">
                  <input
                    type="text"
                    placeholder="Yanıt yazın..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 text-sm"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold"
                  >
                    Gönder
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: 'waiting' | 'active' | 'closed' }) {
  const styles =
    status === 'waiting' ? 'bg-amber-100 text-amber-700' :
    status === 'active' ? 'bg-emerald-100 text-emerald-700' :
    'bg-slate-100 text-slate-500'
  const label = status === 'waiting' ? 'Bekliyor' : status === 'active' ? 'Açık' : 'Kapalı'
  return <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${styles}`}>{label}</span>
}
