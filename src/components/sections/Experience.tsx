'use client'

import { motion } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  Calendar,
  ArrowUpRight,
} from 'lucide-react'
import { experiences } from '@/data/portfolioData'

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z" />
  </svg>
)

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full max-w-[1450px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-24 pb-12 text-white"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: smoothEase }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-5">
          <Briefcase size={11} className="text-white/70" />
          <span
            className="text-[11px] text-white/75 uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.22em',
            }}
          >
            Experience
          </span>
        </div>

        <h1
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
          style={{ letterSpacing: '-0.03em' }}
        >
          Where I&apos;ve Worked
        </h1>

        <p className="text-white/70 max-w-xl mx-auto text-[15px] leading-relaxed">
          3 years of production engineering — full-stack delivery,
          design systems, and AI integration.
        </p>
      </motion.div>

      {/* TIMELINE */}
      <div className="max-w-[920px] mx-auto space-y-6">
        {experiences.map((exp, i) => {
          const techs = exp.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: smoothEase,
              }}
              whileHover={{ y: -3 }}
              className="group relative rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.06] transition-colors duration-300"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -inset-px rounded-[26px] opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_30%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />

              {/* TOP — role + period */}
              <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[22px] md:text-[26px] font-bold leading-tight text-white"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2.5 mt-2 text-[14px] text-white/80 flex-wrap">
                    {exp.website ? (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium hover:text-white transition-colors group/co"
                      >
                        {exp.company}
                        <ArrowUpRight
                          size={12}
                          className="opacity-50 group-hover/co:opacity-100 group-hover/co:translate-x-0.5 group-hover/co:-translate-y-0.5 transition-all"
                        />
                      </a>
                    ) : (
                      <span className="font-medium">
                        {exp.company}
                      </span>
                    )}

                    <span className="text-white/25">·</span>

                    <span className="inline-flex items-center gap-1 text-white/65">
                      <MapPin size={12} />
                      {exp.location}
                    </span>

                    {exp.linkedin && (
                      <a
                        href={exp.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${exp.company} on LinkedIn`}
                        className="text-white/55 hover:text-white transition-colors"
                      >
                        <LinkedinIcon size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Period pill */}
                <div
                  className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-white/70 whitespace-nowrap"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: '0.12em',
                  }}
                >
                  <Calendar size={11} />
                  {exp.period.toUpperCase()}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="relative text-white/75 text-[14.5px] leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* TECH CHIPS */}
              <div className="relative flex flex-wrap gap-2">
                {techs.map((t, j) => (
                  <span
                    key={j}
                    className="text-[11px] text-white/75 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
