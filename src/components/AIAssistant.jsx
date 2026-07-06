'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, Loader2, Send, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getChatbotReply } from '@/lib/chatbotEngine'
import { useIsMobile } from '@/lib/useMediaQuery'
import { useAIAssistantCopy } from '@/i18n/hooks/useExtraPages'
import { useTranslation } from '@/i18n/LocaleProvider'

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[90%] rounded-xl px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser ? 'bg-neon/20 text-white' : 'bg-navy-800 text-slate-300'
        }`}
      >
        {message.text}
        {message.links?.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-lg bg-neon/10 border border-neon/25 px-2.5 py-1 text-[11px] font-medium text-neon hover:bg-neon/20 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AIAssistant() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { locale } = useTranslation()
  const copy = useAIAssistantCopy()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'assistant', ...copy.welcome }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'assistant', ...copy.welcome }])
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset welcome when locale changes
  }, [locale])

  useEffect(() => {
    if (!open) return
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: isMobile ? 'auto' : 'smooth',
    })
  }, [messages, loading, open, isMobile])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const sendMessage = useCallback(
    async (rawText) => {
      const text = rawText.trim()
      if (!text || loading) return

      const userMessage = { id: `u-${Date.now()}`, role: 'user', text }
      const nextMessages = [...messagesRef.current, userMessage]
      setMessages(nextMessages)
      setInput('')
      setLoading(true)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.text })),
          }),
        })

        if (res.ok) {
          const data = await res.json()
          setMessages((prev) => [
            ...prev,
            { id: `a-${Date.now()}`, role: 'assistant', text: data.reply.text, links: data.reply.links },
          ])
        } else {
          throw new Error('API error')
        }
      } catch {
        const fallback = getChatbotReply(text)
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', text: fallback.text, links: fallback.links },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading],
  )

  const send = () => sendMessage(input)

  if (pathname === '/quote') return null

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            className="fixed z-[60] flex flex-col overflow-hidden glass neon-border shadow-2xl
              max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[min(88dvh,680px)] max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:border-b-0
              sm:top-20 sm:bottom-24 sm:right-[max(1rem,env(safe-area-inset-right,1rem))] sm:left-auto sm:w-[380px] sm:rounded-2xl
              max-sm:left-0 max-sm:right-0"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-neon/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neon/15 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <span className="font-display font-semibold text-sm block">{copy.title}</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-neon/60" />
                    {copy.subtitle}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                aria-label={copy.closeChat}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-touch p-4 space-y-3">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-navy-800 rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs text-slate-500">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-neon/70" />
                    {copy.thinking}
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && !loading && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {copy.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="text-[11px] rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-400 hover:border-neon/30 hover:text-neon transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 pt-2 border-t border-white/5 flex gap-2 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder={copy.placeholder}
                disabled={loading}
                className="mobile-input flex-1 bg-navy-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="touch-target p-2.5 rounded-xl bg-neon text-navy-950 hover:bg-neon-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={copy.sendMessage}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 touch-target w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-neon text-navy-950 shadow-lg shadow-neon/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform max-lg:bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-[max(1rem,env(safe-area-inset-bottom,1rem))] right-[max(0.75rem,env(safe-area-inset-right,0.75rem))] lg:right-[max(1rem,env(safe-area-inset-right,1rem))]"
        aria-label={open ? copy.closeAssistant : copy.openAssistant}
      >
        {open ? <X className="w-5 h-5 lg:w-6 lg:h-6" /> : <Bot className="w-5 h-5 lg:w-6 lg:h-6" />}
      </button>
    </>
  )
}
