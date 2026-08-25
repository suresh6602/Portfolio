'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { playSound } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    playSound('click')
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 group flex items-center justify-center p-3 sm:px-4 sm:py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-nav)',
            color: 'var(--text-primary)',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.4), 0 0 15px var(--accent-glow)',
          }}
          aria-label="Back to top"
          title="Scroll to top"
        >
          <ArrowUp
            size={16}
            className="group-hover:-translate-y-0.5 transition-transform"
            style={{ color: 'var(--accent)' }}
          />
          <span
            className="hidden sm:inline-block ml-2 text-[11.5px] font-semibold tracking-wider uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: 'var(--text-primary)',
            }}
          >
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
