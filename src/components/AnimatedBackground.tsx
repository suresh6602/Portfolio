'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

const AnimatedBackground = () => {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const { particlesEnabled, reducedMotion } = useTheme()

  useEffect(() => {
    if (!particlesEnabled || reducedMotion) return

    let requestId: number

    const handleScroll = () => {
      const scroll = window.pageYOffset

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return

        const xOffset = Math.sin(scroll / 120 + index * 0.6) * 100
        const yOffset = Math.cos(scroll / 120 + index * 0.6) * 35

        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`
        blob.style.transition = 'transform 1.2s ease-out'
      })

      requestId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(requestId)
    }
  }, [particlesEnabled, reducedMotion])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-500">
      {/* Dynamic ambient blobs */}
      {particlesEnabled && (
        <div className="absolute inset-0 transition-opacity duration-700">
          {/* Top Left Blob */}
          <div
            ref={(ref) => {
              blobRefs.current[0] = ref
            }}
            className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full blur-[110px] transition-all duration-700"
            style={{
              backgroundColor: 'var(--blob-1)',
              boxShadow: '0 0 100px var(--accent-glow)',
            }}
          />

          {/* Top Right Blob */}
          <div
            ref={(ref) => {
              blobRefs.current[1] = ref
            }}
            className="absolute top-10 right-10 w-48 h-48 md:w-72 md:h-72 rounded-full blur-[120px] transition-all duration-700"
            style={{
              backgroundColor: 'var(--blob-2)',
            }}
          />

          {/* Bottom Left Blob */}
          <div
            ref={(ref) => {
              blobRefs.current[2] = ref
            }}
            className="absolute bottom-10 left-10 w-52 h-52 md:w-80 md:h-80 rounded-full blur-[130px] transition-all duration-700"
            style={{
              backgroundColor: 'var(--blob-2)',
            }}
          />

          {/* Bottom Right Blob */}
          <div
            ref={(ref) => {
              blobRefs.current[3] = ref
            }}
            className="absolute bottom-10 right-10 w-48 h-48 md:w-72 md:h-72 rounded-full blur-[110px] transition-all duration-700"
            style={{
              backgroundColor: 'var(--blob-1)',
              boxShadow: '0 0 100px var(--accent-glow)',
            }}
          />
        </div>
      )}

      {/* Dynamic Theme Grid Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  )
}

export default AnimatedBackground