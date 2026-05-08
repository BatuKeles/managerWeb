'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import MascotVideo from '@/components/Mascot/MascotVideo'

interface ChatMessage {
  id: string | number
  senderType: 'visitor' | 'admin' | 'system'
  message: string
  createdAt: string
}

const VISITOR_NAME_KEY = 'kb_chat_visitor'
const SESSION_ID_KEY = 'kb_chat_session_id'

export default function SupportBubble() {
  const [chatOpen, setChatOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [visitorName, setVisitorName] = useState<string | null>(null)
  const [askingName, setAskingName] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Expose chat opener globally for ContactSection's "Sohbet Başlat" button
  useEffect(() => {
    ;(window as any).__openChat = () => setChatOpen(true)
    return () => { delete (window as any).__openChat }
  }, [])

  // Restore visitor + session
  useEffect(() => {
    const savedName = localStorage.getItem(VISITOR_NAME_KEY)
    const savedSessionId = localStorage.getItem(SESSION_ID_KEY)
    if (savedName) setVisitorName(savedName)
    if (savedSessionId) setSessionId(savedSessionId)
  }, [])

  // Connect socket when chat opens with a session
  useEffect(() => {
    if (!chatOpen || !sessionId) return
    const s = io({ path: '/socket.io', transports: ['websocket', 'polling'] })
    socketRef.current = s
    s.on('connect', () => setConnected(true))
    s.on('disconnect', () => setConnected(false))
    s.emit('join:session', sessionId)
    s.on('message:new', (msg: ChatMessage) => {
      setMessages((prev) => prev.find((m) => String(m.id) === String(msg.id)) ? prev : [...prev, msg])
    })
    s.on('session:closed', () => {
      setMessages((prev) => [...prev, {
        id: `sys-${Date.now()}`,
        senderType: 'system',
        message: 'Sohbet temsilci tarafından sonlandırıldı.',
        createdAt: new Date().toISOString(),
      }])
    })
    return () => {
      s.disconnect()
      socketRef.current = null
    }
  }, [chatOpen, sessionId])

  // Load existing messages when session known
  useEffect(() => {
    if (!sessionId) return
    fetch(`/api/chat/${sessionId}/messages`)
      .then((r) => (r.ok ? r.json() : []))
      .then((msgs: ChatMessage[]) => Array.isArray(msgs) && setMessages(msgs))
      .catch(() => {})
  }, [sessionId])

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen && !askingName) inputRef.current?.focus()
  }, [chatOpen, askingName])

  const startSession = useCallback(async (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const res = await fetch('/api/chat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorName: trimmed }),
    })
    if (!res.ok) return
    const data = await res.json()
    localStorage.setItem(VISITOR_NAME_KEY, trimmed)
    localStorage.setItem(SESSION_ID_KEY, data.id)
    setVisitorName(trimmed)
    setSessionId(data.id)
    setAskingName(false)
  }, [])

  const handleOpen = () => {
    setChatOpen(true)
    setShowWelcome(false)
    if (!visitorName || !sessionId) setAskingName(true)
  }

  const sendMessage = useCallback(() => {
    const text = inputValue.trim()
    if (!text || !sessionId || !socketRef.current) return
    socketRef.current.emit('visitor:message', { sessionId, message: text })
    setInputValue('')
  }, [inputValue, sessionId])

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  const onNameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') startSession(nameInput)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 12,
    }}>
      {/* Chat panel */}
      {chatOpen && (
        <div className="support-chat-panel">
          {/* Header */}
          <div className="support-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <MascotVideo src="/videos/mascot/taking_note.webm" width={36} height={36} style={{ borderRadius: '50%' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#0f172a' }}>Kulüp Bul</p>
                <p style={{ margin: 0, fontSize: 11, color: connected ? '#10b981' : '#94a3b8' }}>
                  {connected ? '● Çevrimiçi' : 'Bağlanıyor...'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              aria-label="Sohbeti kapat"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                lineHeight: 1,
                padding: 4,
                color: '#64748b',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="support-chat-body">
            {askingName ? (
              <div className="support-msg-bubble support-msg-bubble--admin">
                <p style={{ margin: 0, fontSize: 13, color: '#0f172a' }}>Merhaba 👋 Önce ismin nedir?</p>
              </div>
            ) : messages.length === 0 ? (
              <>
                <div className="support-msg-bubble support-msg-bubble--admin">
                  <p style={{ margin: 0, fontSize: 13, color: '#0f172a' }}>
                    Merhaba {visitorName} 👋 Size nasıl yardımcı olabilirim?
                  </p>
                </div>
                <div className="support-msg-bubble support-msg-bubble--admin">
                  <p style={{ margin: 0, fontSize: 13, color: '#0f172a' }}>
                    Platformumuz hakkında sorularınızı yanıtlamak için buradayım.
                  </p>
                </div>
              </>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`support-msg-bubble support-msg-bubble--${m.senderType}`}
                >
                  <p style={{ margin: 0, fontSize: 13, color: m.senderType === 'visitor' ? '#fff' : '#0f172a' }}>
                    {m.message}
                  </p>
                  <p style={{
                    margin: '4px 0 0',
                    fontSize: 10,
                    opacity: 0.6,
                    color: m.senderType === 'visitor' ? '#fff' : '#64748b',
                  }}>
                    {new Date(m.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="support-chat-input">
            {askingName ? (
              <>
                <input
                  type="text"
                  placeholder="İsmini yaz..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={onNameKey}
                  autoFocus
                  className="support-input-field"
                />
                <button
                  className="support-send-btn"
                  onClick={() => startSession(nameInput)}
                  disabled={!nameInput.trim()}
                >
                  Devam
                </button>
              </>
            ) : (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Mesajınızı yazın..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={onInputKey}
                  className="support-input-field"
                />
                <button
                  className="support-send-btn"
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || !connected}
                  aria-label="Gönder"
                >
                  Gönder
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom row: greeting bubble + mascot */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        {showWelcome && !chatOpen && (
          <div className="support-greeting">
            <p style={{ fontSize: 13, fontWeight: 500, margin: 0, color: '#0f172a' }}>
              Merhaba 👋 Yardıma mı ihtiyacın var?
            </p>
            <p style={{ fontSize: 11, marginTop: 4, marginBottom: 0, color: '#64748b' }}>
              Tıklayıp sohbet başlat
            </p>
          </div>
        )}

        <div
          onClick={handleOpen}
          className="support-bubble-btn"
          role="button"
          aria-label="Sohbet aç"
          tabIndex={0}
          style={{
            cursor: 'pointer',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)'
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.55)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.4)'
          }}
        >
          <MascotVideo
            src="/videos/mascot/taking_note.webm"
            width={96}
            height={96}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>

      <style>{`
        .support-bubble-btn {
          width: 108px;
          height: 108px;
        }
        @media (max-width: 767px) {
          .support-bubble-btn { width: 84px; height: 84px; }
          .support-bubble-btn video { width: 72px !important; height: 72px !important; }
        }

        .support-greeting {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          border-bottom-right-radius: 4px;
          padding: 10px 16px;
          max-width: 220px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
        }

        .support-chat-panel {
          width: 360px;
          max-height: 520px;
          height: 520px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(15, 23, 42, 0.18);
          display: flex;
          flex-direction: column;
          animation: support-slide-up 0.3s ease;
          background: #ffffff;
          border: 1px solid #e2e8f0;
        }

        .support-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid #e2e8f0;
          background: #ffffff;
        }

        .support-chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f8fafc;
        }

        .support-msg-bubble {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 14px;
          max-width: 85%;
          align-self: flex-start;
        }
        .support-msg-bubble--admin { border-bottom-left-radius: 4px; }
        .support-msg-bubble--visitor {
          background: #6366f1;
          border-color: #6366f1;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .support-msg-bubble--system {
          background: #fef3c7;
          border-color: #fde68a;
          align-self: center;
          font-style: italic;
        }

        .support-chat-input {
          display: flex;
          align-items: center;
          border-top: 1px solid #e2e8f0;
          padding: 8px;
          background: #ffffff;
          gap: 6px;
        }

        .support-input-field {
          flex: 1;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .support-input-field:focus { border-color: #6366f1; background: #fff; }
        .support-input-field::placeholder { color: #94a3b8; }

        .support-send-btn {
          background: #6366f1;
          color: #fff;
          border: none;
          cursor: pointer;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          transition: background 0.15s ease;
        }
        .support-send-btn:hover:not(:disabled) { background: #4f46e5; }
        .support-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @keyframes support-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 767px) {
          .support-chat-panel {
            width: calc(100vw - 48px);
            max-height: 480px;
            height: 480px;
          }
          .support-greeting { max-width: 180px; }
        }
      `}</style>
    </div>
  )
}
