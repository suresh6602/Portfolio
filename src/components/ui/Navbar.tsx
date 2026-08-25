'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Palette, Sliders } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import SettingsModal from '@/components/ui/SettingsModal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

  const { resolvedMode, playSound } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['home', 'about', 'experience', 'portfolio', 'contact']

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (!section) continue

        const rect = section.getBoundingClientRect()

        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    handleResize()
    handleScroll()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const navbarPlayed = sessionStorage.getItem('navbarPlayed')

    if (navbarPlayed) {
      setShowNavbar(true)
      return
    }

    const timer = setTimeout(() => {
      setShowNavbar(true)
      sessionStorage.setItem('navbarPlayed', 'true')
    }, 3800)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  const smoothScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()

    const target = document.querySelector(targetId)
    if (!target) return

    const navbarOffset = 3
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarOffset

    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    const duration = 1200

    let startTime: number | null = null

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime

      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      const ease = easeInOutCubic(progress)

      window.scrollTo({
        top: startPosition + distance * ease,
      })

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
    setOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleOpenSettings = () => {
    setSettingsOpen(true)
    playSound('modal')
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{
          opacity: showNavbar ? 1 : 0,
          y: showNavbar ? 0 : -40,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'fixed',
          top: 20,
          left: isMobile ? 16 : 60,
          right: isMobile ? 16 : 60,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '8px 16px' : '10px 24px 10px 30px',
            width: '100%',
            borderRadius: 999,
            backgroundColor: scrolled
              ? 'var(--bg-nav)'
              : 'var(--bg-nav)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
        >
          {/* LOGO */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: 'var(--text-primary)',
              letterSpacing: '0.1em',
            }}
          >
            <span
              className="animate-pulse"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent-glow)',
              }}
            />
            suresh.dev
          </span>

          {/* DESKTOP NAV ITEMS */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <div style={{ display: 'flex', gap: 36 }}>
                {navItems.map((item) => {
                  const isActive = activeSection === item.id

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                      style={{
                        position: 'relative',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        color: isActive
                          ? 'var(--text-primary)'
                          : 'var(--text-secondary)',
                        textDecoration: 'none',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        paddingBottom: 4,
                        transition: '0.25s ease',
                      }}
                    >
                      {item.label}

                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: 1.5,
                          background: 'var(--accent)',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.25s ease',
                        }}
                      />
                    </a>
                  )
                })}
              </div>

              {/* SETTINGS / THEME TRIGGER BUTTON */}
              <button
                onClick={handleOpenSettings}
                className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Open Theme and Visual Settings"
              >
                <div
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent-glow)',
                  }}
                />
                {resolvedMode === 'dark' ? (
                  <Moon size={13} className="text-white/80" />
                ) : (
                  <Sun size={13} className="text-amber-500" />
                )}
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.05em',
                  }}
                >
                  Theme
                </span>
              </button>
            </div>
          )}

          {/* MOBILE RIGHT BUTTONS */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Settings button on mobile */}
              <button
                onClick={handleOpenSettings}
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-transform active:scale-90"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Open Theme Settings"
              >
                {resolvedMode === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
              </button>

              {/* Hamburger Icon */}
              <div
                onClick={() => setOpen(!open)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 2,
                    background: 'var(--text-primary)',
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    width: 18,
                    height: 2,
                    background: 'var(--text-primary)',
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    width: 18,
                    height: 2,
                    background: 'var(--text-primary)',
                    borderRadius: 1,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 10,
              borderRadius: 20,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(16px)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: isActive
                      ? 'var(--accent)'
                      : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '4px 0',
                  }}
                >
                  {item.label}
                </a>
              )
            })}

            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => {
                  setOpen(false)
                  handleOpenSettings()
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[12px] font-medium"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--text-primary)',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                <Sliders size={13} />
                Preferences &amp; Theme
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* SETTINGS MODAL / FLYOUT */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  )
}