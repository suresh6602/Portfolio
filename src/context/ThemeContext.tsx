'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

export type ThemeMode = 'dark' | 'light' | 'system'
export type ColorPalette =
  | 'obsidian'
  | 'cyberpunk'
  | 'emerald'
  | 'amber'
  | 'cobalt'

export interface PaletteInfo {
  id: ColorPalette
  name: string
  accent: string
  secondary: string
  glow: string
  description: string
}

export const PALETTES: PaletteInfo[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Silver',
    accent: '#ffffff',
    secondary: '#a1a1aa',
    glow: 'rgba(255, 255, 255, 0.2)',
    description: 'Clean monochrome elegance',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    accent: '#c084fc',
    secondary: '#38bdf8',
    glow: 'rgba(192, 132, 252, 0.3)',
    description: 'Vibrant neon purple & cyan',
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    accent: '#34d399',
    secondary: '#10b981',
    glow: 'rgba(52, 211, 153, 0.3)',
    description: 'High-tech mint & forest slate',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    accent: '#fbbf24',
    secondary: '#f97316',
    glow: 'rgba(251, 191, 36, 0.3)',
    description: 'Warm gold & bronze glow',
  },
  {
    id: 'cobalt',
    name: 'Cobalt Azure',
    accent: '#38bdf8',
    secondary: '#2563eb',
    glow: 'rgba(56, 189, 248, 0.3)',
    description: 'Deep navy & electric blue',
  },
]

interface ThemeContextType {
  mode: ThemeMode
  resolvedMode: 'dark' | 'light'
  palette: ColorPalette
  particlesEnabled: boolean
  soundEnabled: boolean
  reducedMotion: boolean
  setMode: (mode: ThemeMode) => void
  setPalette: (palette: ColorPalette) => void
  setParticlesEnabled: (enabled: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  resetDefaults: () => void
  playSound: (type?: 'click' | 'toggle' | 'select' | 'modal') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio_theme_preferences_v1'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setModeState] = useState<ThemeMode>('dark')
  const [resolvedMode, setResolvedMode] = useState<'dark' | 'light'>('dark')
  const [palette, setPaletteState] = useState<ColorPalette>('obsidian')
  const [particlesEnabled, setParticlesState] = useState<boolean>(true)
  const [soundEnabled, setSoundState] = useState<boolean>(true)
  const [reducedMotion, setReducedMotionState] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  // Web Audio API Synthesizer for high-end micro-interaction sound cues
  const playSound = useCallback(
    (type: 'click' | 'toggle' | 'select' | 'modal' = 'click') => {
      if (!soundEnabled || typeof window === 'undefined') return

      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext
        if (!AudioCtx) return

        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        const now = ctx.currentTime

        if (type === 'click') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(480, now)
          osc.frequency.exponentialRampToValueAtTime(240, now + 0.04)
          gain.gain.setValueAtTime(0.04, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
          osc.start(now)
          osc.stop(now + 0.04)
        } else if (type === 'toggle') {
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(320, now)
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.06)
          gain.gain.setValueAtTime(0.05, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
          osc.start(now)
          osc.stop(now + 0.06)
        } else if (type === 'select') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(560, now)
          osc.frequency.exponentialRampToValueAtTime(840, now + 0.08)
          gain.gain.setValueAtTime(0.05, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
          osc.start(now)
          osc.stop(now + 0.08)
        } else if (type === 'modal') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(280, now)
          osc.frequency.exponentialRampToValueAtTime(420, now + 0.1)
          gain.gain.setValueAtTime(0.03, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
          osc.start(now)
          osc.stop(now + 0.1)
        }
      } catch {
        // Silently ignore audio errors if blocked by browser policy
      }
    },
    [soundEnabled]
  )

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.mode) setModeState(parsed.mode)
        if (parsed.palette) setPaletteState(parsed.palette)
        if (typeof parsed.particlesEnabled === 'boolean')
          setParticlesState(parsed.particlesEnabled)
        if (typeof parsed.soundEnabled === 'boolean')
          setSoundState(parsed.soundEnabled)
        if (typeof parsed.reducedMotion === 'boolean')
          setReducedMotionState(parsed.reducedMotion)
      }
    } catch {
      // Ignore JSON parse errors
    }
    setMounted(true)
  }, [])

  // Resolve mode (handles 'system' mode checking OS preference)
  useEffect(() => {
    if (!mounted) return

    const applyThemeAttributes = () => {
      let activeMode: 'dark' | 'light' = 'dark'

      if (mode === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        activeMode = prefersDark ? 'dark' : 'light'
      } else {
        activeMode = mode
      }

      setResolvedMode(activeMode)

      const root = document.documentElement
      root.setAttribute('data-mode', activeMode)
      root.setAttribute('data-palette', palette)
      root.setAttribute('data-particles', particlesEnabled ? 'on' : 'off')
      root.setAttribute('data-reduced-motion', reducedMotion ? 'on' : 'off')
    }

    applyThemeAttributes()

    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = () => applyThemeAttributes()
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    }
  }, [mode, palette, particlesEnabled, reducedMotion, mounted])

  // Save to localStorage whenever state changes
  const saveState = useCallback(
    (
      newMode = mode,
      newPalette = palette,
      newParticles = particlesEnabled,
      newSound = soundEnabled,
      newMotion = reducedMotion
    ) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            mode: newMode,
            palette: newPalette,
            particlesEnabled: newParticles,
            soundEnabled: newSound,
            reducedMotion: newMotion,
          })
        )
      } catch {
        // Storage might be disabled
      }
    },
    [mode, palette, particlesEnabled, soundEnabled, reducedMotion]
  )

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode)
      saveState(newMode, palette, particlesEnabled, soundEnabled, reducedMotion)
      playSound('toggle')
    },
    [palette, particlesEnabled, soundEnabled, reducedMotion, saveState, playSound]
  )

  const setPalette = useCallback(
    (newPalette: ColorPalette) => {
      setPaletteState(newPalette)
      saveState(mode, newPalette, particlesEnabled, soundEnabled, reducedMotion)
      playSound('select')
    },
    [mode, particlesEnabled, soundEnabled, reducedMotion, saveState, playSound]
  )

  const setParticlesEnabled = useCallback(
    (enabled: boolean) => {
      setParticlesState(enabled)
      saveState(mode, palette, enabled, soundEnabled, reducedMotion)
      playSound('toggle')
    },
    [mode, palette, soundEnabled, reducedMotion, saveState, playSound]
  )

  const setSoundEnabled = useCallback(
    (enabled: boolean) => {
      setSoundState(enabled)
      saveState(mode, palette, particlesEnabled, enabled, reducedMotion)
    },
    [mode, palette, particlesEnabled, reducedMotion, saveState]
  )

  const setReducedMotion = useCallback(
    (enabled: boolean) => {
      setReducedMotionState(enabled)
      saveState(mode, palette, particlesEnabled, soundEnabled, enabled)
      playSound('toggle')
    },
    [mode, palette, particlesEnabled, soundEnabled, saveState, playSound]
  )

  const resetDefaults = useCallback(() => {
    setModeState('dark')
    setPaletteState('obsidian')
    setParticlesState(true)
    setSoundState(true)
    setReducedMotionState(false)
    saveState('dark', 'obsidian', true, true, false)
    playSound('modal')
  }, [saveState, playSound])

  return (
    <ThemeContext.Provider
      value={{
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
