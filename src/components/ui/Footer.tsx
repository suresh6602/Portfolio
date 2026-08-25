'use client'

import { Mail, MapPin, ArrowUpRight, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.02c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z" />
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ]

  const social = [
    {
      label: 'Email',
      href: 'mailto:sureshkumar27082002@gmail.com',
      icon: <Mail size={14} />,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/suresh6602',
      icon: <GithubIcon size={14} />,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/sureshkumar-r-dev',
      icon: <LinkedinIcon size={14} />,
    },
    {
      label: 'Resume',
      href: '/resume',
      icon: <FileText size={14} />,
    },
  ]

  return (
    <footer className="relative border-t border-white/10 mt-20 text-white">
      {/* soft top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="w-full max-w-[1450px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-14">
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          {/* brand block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className="text-[10.5px] text-white/75 uppercase"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.22em',
                }}
              >
                Available for work
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold mb-3 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
              style={{ letterSpacing: '-0.02em' }}
            >
              Let&apos;s build something great together.
            </h3>

            <p className="text-white/70 text-[14px] leading-relaxed max-w-md">
              Full Stack Engineer building production React.js, Node.js,
              LangGraph, and AI agent applications for 10,000+ users — open to
              full-time and freelance.
            </p>
          </motion.div>

          {/* navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4
              className="text-[10.5px] text-white/55 uppercase mb-5"
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.22em',
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[14px] text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h4
              className="text-[10.5px] text-white/55 uppercase mb-5"
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.22em',
              }}
            >
              Connect
            </h4>
            <ul className="grid grid-cols-2 gap-3">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07] transition-all"
                  >
                    <span className="flex items-center gap-2 text-[13px] text-white/80 group-hover:text-white">
                      {item.icon}
                      {item.label}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div
            className="flex items-center gap-2 text-[11px] text-white/55 uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.18em',
            }}
          >
            <MapPin size={12} />
            Tamil Nadu, India · Open to relocate
          </div>

          <p
            className="text-[11px] text-white/55"
            style={{
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.14em',
            }}
          >
            © {year} suresh.dev — Crafted with React &amp; Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
