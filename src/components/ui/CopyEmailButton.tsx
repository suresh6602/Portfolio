'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Sparkles } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface CopyEmailButtonProps {
  variant?: 'pill' | 'button' | 'compact'
  className?: string
  email?: string
}

export default function CopyEmailButton({
  variant = 'pill',
  className = '',
  email = 'sureshkumar27082002@gmail.com',
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)
  const { playSound } = useTheme()

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    let copiedSuccessfully = false

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(email)
        copiedSuccessfully = true
      } catch {
        copiedSuccessfully = false
      }
    }

    if (!copiedSuccessfully && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = email
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        textarea.style.top = '0'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        const res = document.execCommand('copy')
        document.body.removeChild(textarea)
        if (res) copiedSuccessfully = true
      } catch {
        // Continue
      }
    }

    setCopied(true)
    playSound('select')
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={`group relative inline-flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer select-none ${
          variant === 'pill'
            ? 'px-4 py-2 rounded-full border text-[12.5px] font-medium'
            : variant === 'button'
            ? 'px-5 py-2.5 rounded-xl border text-[13px] font-semibold shadow-sm'
            : 'p-2.5 rounded-xl border text-[12px]'
        } ${className}`}
        style={{
          borderColor: copied ? 'var(--accent)' : 'var(--border)',
          backgroundColor: copied ? 'var(--badge-bg)' : 'var(--bg-card)',
          color: 'var(--text-primary)',
          boxShadow: copied
            ? '0 0 20px var(--accent-glow)'
            : '0 4px 12px rgba(0,0,0,0.1)',
        }}
        aria-label="Copy Email to Clipboard"
        title="Click to copy email address"
      >
        {copied ? (
          <Check size={14} className="text-emerald-400 stroke-[3]" />
        ) : (
          <Copy
            size={14}
            className="text-white/60 group-hover:text-white transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          />
        )}

        <span style={{ fontFamily: "'DM Mono', monospace" }}>
          {copied ? 'Copied to Clipboard!' : email}
        </span>

        {copied && (
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        )}
      </button>

      {/* Floating Toast Notification with high z-index */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-3 px-6 py-3.5 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--accent)',
              color: 'var(--text-primary)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 25px var(--accent-glow)',
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shadow-inner"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--accent)',
              }}
            >
              <Check size={14} className="stroke-[3]" />
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[13.5px] font-bold tracking-wide">
                Email copied to clipboard!
              </p>
              <Sparkles size={14} className="text-amber-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
