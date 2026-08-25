'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun,
  Moon,
  Laptop,
  Palette,
  Sparkles,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  RotateCcw,
  X,
  Check,
  Sliders,
} from 'lucide-react'
import { useTheme, PALETTES, ThemeMode, ColorPalette } from '@/context/ThemeContext'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    mode,
    resolvedMode,
    palette,
    particlesEnabled,
    soundEnabled,
    reducedMotion,
    setMode,
    setPalette,
    setParticlesEnabled,
    setSoundEnabled,
    setReducedMotion,
    resetDefaults,
    playSound,
  } = useTheme()

  const modalRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
        playSound('click')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, playSound])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onClose()
        playSound('click')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, playSound])

  const modes: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'dark', label: 'Dark', icon: <Moon size={14} /> },
    { id: 'light', label: 'Light', icon: <Sun size={14} /> },
    { id: 'system', label: 'System', icon: <Laptop size={14} /> },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-end p-4 sm:p-6 md:p-8 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              onClose()
              playSound('click')
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[390px] rounded-[28px] border border-white/15 bg-[#121212]/95 text-white backdrop-blur-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] mt-12 sm:mt-16 overflow-hidden"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: 'var(--badge-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--accent)',
                  }}
                >
                  <Sliders size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight">
                    Preferences &amp; Theme
                  </h3>
                  <p className="text-[11px] text-white/50" style={{ color: 'var(--text-muted)' }}>
                    Customize visual &amp; audio experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose()
                  playSound('click')
                }}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Close settings"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-5 custom-scroll max-h-[70vh] overflow-y-auto pr-1">
              {/* 1. THEME MODE (DARK / LIGHT / SYSTEM) */}
              <div>
                <label className="text-[12px] font-semibold tracking-wider uppercase mb-2.5 block text-white/60" style={{ color: 'var(--text-muted)' }}>
                  Theme Mode
                </label>

                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl border border-white/10 bg-black/20" style={{ borderColor: 'var(--border)' }}>
                  {modes.map((m) => {
                    const isSelected = mode === m.id
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`relative flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[12.5px] font-medium transition-all duration-200 ${
                          isSelected
                            ? 'text-black font-bold shadow-md'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                        style={{
                          color: isSelected ? '#000000' : 'var(--text-secondary)',
                          backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                        }}
                      >
                        {m.icon}
                        <span>{m.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. AMBIENT COLOR PALETTES */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[12px] font-semibold tracking-wider uppercase text-white/60" style={{ color: 'var(--text-muted)' }}>
                    Ambient Palette
                  </label>
                  <span className="text-[11px] font-mono text-white/50" style={{ color: 'var(--accent)' }}>
                    {PALETTES.find((p) => p.id === palette)?.name}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {PALETTES.map((p) => {
                    const isSelected = palette === p.id
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPalette(p.id)}
                        className="group relative flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          borderColor: isSelected ? p.accent : 'var(--border)',
                          backgroundColor: isSelected
                            ? 'var(--badge-bg)'
                            : 'transparent',
                          boxShadow: isSelected
                            ? `0 0 16px ${p.glow}`
                            : 'none',
                        }}
                      >
                        {/* Swatch circle */}
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shadow-inner border border-white/20 transition-transform group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${p.accent}, ${p.secondary})`,
                          }}
                        >
                          {isSelected && (
                            <Check
                              size={13}
                              className="text-black drop-shadow-md stroke-[3]"
                            />
                          )}
                        </div>

                        <span
                          className="text-[9.5px] font-medium leading-none text-center truncate max-w-full"
                          style={{
                            color: isSelected
                              ? 'var(--text-primary)'
                              : 'var(--text-muted)',
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          {p.name.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 3. INTERACTIVE VISUAL & AUDIO TOGGLES */}
              <div>
                <label className="text-[12px] font-semibold tracking-wider uppercase mb-2.5 block text-white/60" style={{ color: 'var(--text-muted)' }}>
                  Interactive Features
                </label>

                <div className="space-y-2">
                  {/* Ambient 3D Particles Toggle */}
                  <div
                    className="flex items-center justify-between p-3 rounded-2xl border bg-black/10"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: 'var(--badge-bg)',
                          color: 'var(--accent)',
                        }}
                      >
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">
                          3D Ambient Lighting
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          Floating particle backdrop
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setParticlesEnabled(!particlesEnabled)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                        particlesEnabled ? 'justify-end' : 'justify-start'
                      }`}
                      style={{
                        backgroundColor: particlesEnabled
                          ? 'var(--accent)'
                          : 'rgba(255,255,255,0.15)',
                      }}
                      aria-label="Toggle background particles"
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                        className="w-5 h-5 rounded-full bg-black shadow-md"
                        style={{
                          backgroundColor: particlesEnabled ? '#000000' : '#ffffff',
                        }}
                      />
                    </button>
                  </div>

                  {/* Sound FX Audio Toggle */}
                  <div
                    className="flex items-center justify-between p-3 rounded-2xl border bg-black/10"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: 'var(--badge-bg)',
                          color: 'var(--accent)',
                        }}
                      >
                        {soundEnabled ? (
                          <Volume2 size={14} />
                        ) : (
                          <VolumeX size={14} />
                        )}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">
                          Audio Micro-cues
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          Click &amp; interaction feedback
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const next = !soundEnabled
                        setSoundEnabled(next)
                        if (next) playSound('select')
                      }}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                        soundEnabled ? 'justify-end' : 'justify-start'
                      }`}
                      style={{
                        backgroundColor: soundEnabled
                          ? 'var(--accent)'
                          : 'rgba(255,255,255,0.15)',
                      }}
                      aria-label="Toggle sound cues"
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                        className="w-5 h-5 rounded-full shadow-md"
                        style={{
                          backgroundColor: soundEnabled ? '#000000' : '#ffffff',
                        }}
                      />
                    </button>
                  </div>

                  {/* Reduced Motion Toggle */}
                  <div
                    className="flex items-center justify-between p-3 rounded-2xl border bg-black/10"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: 'var(--badge-bg)',
                          color: 'var(--accent)',
                        }}
                      >
                        {reducedMotion ? <EyeOff size={14} /> : <Eye size={14} />}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">
                          Reduced Motion
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          Minimal animations for performance
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setReducedMotion(!reducedMotion)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                        reducedMotion ? 'justify-end' : 'justify-start'
                      }`}
                      style={{
                        backgroundColor: reducedMotion
                          ? 'var(--accent)'
                          : 'rgba(255,255,255,0.15)',
                      }}
                      aria-label="Toggle reduced motion"
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                        className="w-5 h-5 rounded-full shadow-md"
                        style={{
                          backgroundColor: reducedMotion ? '#000000' : '#ffffff',
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Reset */}
            <div className="pt-4 border-t border-white/10 mt-5 flex items-center justify-between">
              <button
                onClick={resetDefaults}
                className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <RotateCcw size={12} />
                Reset Defaults
              </button>

              <button
                onClick={() => {
                  onClose()
                  playSound('click')
                }}
                className="px-4 py-2 rounded-xl text-[12.5px] font-semibold transition-transform active:scale-95"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: resolvedMode === 'dark' ? '#000000' : '#ffffff',
                }}
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
