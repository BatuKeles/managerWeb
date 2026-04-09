'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { io, Socket } from 'socket.io-client'
import type { ChatMessage } from '@/types'

interface ChatWindowProps {
  onClose: () => void
}

type ChatStep = 'name' | 'chat'

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [step, setStep] = useState<ChatStep>('name')
  const [visitorName, setVisitorName] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  const startChat = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_session',
          visitorName: visitorName.trim() || 'Ziyaretçi',
        }),
      })

      const session = await res.json()
      setSessionId(session.id)
      setStep('chat')

      // Add welcome message
      setMessages([
        {
          id: 0,
          sessionId: session.id,
          senderType: 'admin',
          message: 'Merhaba! 👋 Müşteri hizmetlerimize hoş geldiniz. Temsilcimiz en geç 5 dakika içinde size bağlanacak.',
          createdAt: new Date().toISOString(),
          readAt: null,
        },
      ])

      // Connect to Socket.io
      const socket = io(window.location.origin, {
        path: '/socket.io',
      })

      socketRef.current = socket

      socket.on('connect', () => {
        socket.emit('join:session', session.id)
        // Notify admin of new session
        socket.emit('session:new', {
          sessionId: session.id,
          visitorName: visitorName.trim() || 'Ziyaretçi',
        })
      })

      socket.on('message:new', (data: ChatMessage) => {
        if (data.senderType === 'admin') {
          setMessages((prev) => [...prev, data])
        }
      })

      socket.on('session:closed', () => {
        setIsClosed(true)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sessionId: session.id,
            senderType: 'admin',
            message: 'Bu oturum kapatıldı. Tekrar yardım için yeni bir sohbet başlatabilirsiniz.',
            createdAt: new Date().toISOString(),
            readAt: null,
          },
        ])
      })
    } catch (error) {
      console.error('Chat start error:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputText.trim() || !sessionId || isClosed) return

    const message = inputText.trim()
    setInputText('')

    // Optimistically add message
    const optimisticMsg: ChatMessage = {
      id: Date.now(),
      sessionId,
      senderType: 'visitor',
      message,
      createdAt: new Date().toISOString(),
      readAt: null,
    }
    setMessages((prev) => [...prev, optimisticMsg])

    try {
      // Save to DB
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_message', sessionId, message }),
      })

      // Emit via socket
      socketRef.current?.emit('visitor:message', { sessionId, message })
    } catch (error) {
      console.error('Send message error:', error)
    }
  }

  return (
    <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Canlı Destek</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-blue-100">Çevrimiçi</p>
            </div>
          </div>
        </div>
      </div>

      {step === 'name' ? (
        // Name input step
        <div className="p-6 flex flex-col gap-4">
          <div className="text-center">
            <div className="text-4xl mb-3">👋</div>
            <h3 className="font-semibold text-gray-900 text-lg">Merhaba!</h3>
            <p className="text-gray-500 text-sm mt-1">
              Size nasıl yardımcı olabiliriz? Sohbet başlatmak için adınızı girin.
            </p>
          </div>
          <div>
            <Input
              placeholder="Adınız (opsiyonel)"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startChat()}
              className="mb-3"
            />
            <Button
              className="w-full"
              onClick={startChat}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sohbeti Başlat
            </Button>
          </div>
        </div>
      ) : (
        // Chat step
        <>
          <ScrollArea className="h-72 p-4">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    msg.senderType === 'visitor' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                      msg.senderType === 'visitor'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    )}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            {isClosed ? (
              <p className="text-center text-gray-500 text-sm">Bu oturum kapatılmıştır.</p>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Mesajınızı yazın..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={sendMessage} disabled={!inputText.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
