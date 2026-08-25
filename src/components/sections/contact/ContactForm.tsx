'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import { createMessageService } from '@/lib/messageService'
import { useTheme } from '@/context/ThemeContext'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const socialLinks = [
  {
    title: 'GitHub',
    user: '@suresh6602',
    icon: FaGithub,
    link: 'https://github.com/suresh6602',
  },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const { playSound } = useTheme()

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setToast({
        type: 'error',
        message: 'Please fill in your name, email, and message.',
      })
      setTimeout(() => setToast(null), 4000)
      return
    }

    if (status === 'sending') return

    setStatus('sending')

    try {
      await createMessageService({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      })

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      playSound('select')
      setToast({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. 🚀',
      })

      setTimeout(() => {
        setStatus('idle')
        setToast(null)
      }, 5000)
    } catch (err) {
      console.error('Failed to send message:', err)
      setStatus('error')
      setToast({
        type: 'error',
        message: 'Could not send message. Please check connection and try again.',
      })

      setTimeout(() => {
        setStatus('idle')
        setToast(null)
      }, 5000)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        viewport={{ once: false, amount: 0.2 }}
        className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full"
      >
        {/* HEADER */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Get In Touch
          </h2>

          <p className="text-sm text-white/75 mb-7">
            Feel free to reach out if you want to collaborate,
            discuss ideas, or simply say hello.
          </p>
        </motion.div>

        {/* FORM */}
        <div className="space-y-4">
          {/* NAME */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                aria-label="Your name"
                autoComplete="name"
                className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
              />
            </div>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.16 }}
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                aria-label="Your email address"
                autoComplete="email"
                className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
              />
            </div>
          </motion.div>

          {/* MESSAGE */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.22 }}
          >
            <div className="relative">
              <MessageSquare className="absolute left-4 top-5 text-white/40" />

              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                aria-label="Your message"
                className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
              />
            </div>
          </motion.div>

          {/* BUTTON */}
          <motion.button
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.28 }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.12 },
            }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={
              status === 'sending' ||
              !name.trim() ||
              !email.trim() ||
              !message.trim()
            }
            className={`w-full rounded-2xl py-4 border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              status === 'sent'
                ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                : status === 'error'
                ? 'bg-red-500/15 border-red-400/30 text-red-300'
                : 'bg-white text-black border-white hover:bg-white/90 disabled:bg-white/10 disabled:text-white/40 disabled:border-white/10 disabled:cursor-not-allowed'
            }`}
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : status === 'sent' ? (
              <>
                <Check size={16} />
                Message sent
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle size={16} />
                Failed — try again
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </motion.button>
        </div>

        {/* SOCIAL */}
        <div className="border-t border-white/10 pt-5 mt-6">
          <motion.p
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.34 }}
            className="text-sm text-white/75 mb-4"
          >
            Connect With Me
          </motion.p>

          {/* LINKEDIN */} 
          <motion.a
            href="https://linkedin.com/in/sureshkumar-r-dev"
            target="_blank"
            rel="noopener noreferrer"
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            transition={{ delay: 0.36 }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.12 },
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 mb-3 flex items-center justify-between"
          >
            <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

            <div className="relative z-10 flex items-center gap-3">
              <FaLinkedinIn />

              <div>
                <p className="text-sm font-medium">LinkedIn</p>
                <p className="text-xs text-white/35">@sureshkumar-r-dev</p>
              </div>
            </div>

            <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.a>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialLinks.map((item, i) => {
              const Icon = item.icon

              return (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false }}
                  transition={{
                    delay: 0.42 + i * 0.05,
                  }}
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.12 },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3 flex items-center justify-between"
                >
                  <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                  <div className="relative z-10 flex items-center gap-3">
                    <Icon />

                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-[11px] text-white/35">
                        {item.user}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                    <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Floating Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-3 px-6 py-3.5 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor:
                toast.type === 'success' ? 'var(--accent)' : 'rgba(239,68,68,0.5)',
              color: 'var(--text-primary)',
              boxShadow:
                toast.type === 'success'
                  ? '0 20px 50px rgba(0,0,0,0.5), 0 0 25px var(--accent-glow)'
                  : '0 20px 50px rgba(239,68,68,0.2)',
            }}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shadow-inner ${
                toast.type === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}
              style={{
                backgroundColor:
                  toast.type === 'success'
                    ? 'rgba(16,185,129,0.15)'
                    : 'rgba(239,68,68,0.15)',
              }}
            >
              {toast.type === 'success' ? (
                <Check size={14} className="stroke-[3]" />
              ) : (
                <AlertCircle size={14} className="stroke-[3]" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[13.5px] font-bold tracking-wide">
                {toast.message}
              </p>
              {toast.type === 'success' && (
                <Sparkles size={14} className="text-amber-400" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}