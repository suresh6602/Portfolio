'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { projects } from '@/data/portfolioData'

// brand colors for the "Technologies Used" chips
const TECH_COLORS: Record<string, string> = {
  react: '#61DAFB',
  typescript: '#3178C6',
  javascript: '#F7DF1E',
  nest: '#E0234E',
  next: '#ffffff',
  tailwind: '#06B6D4',
  'claude': '#D97757',
  gemini: '#8E75B2',
  openai: '#10A37F',
  langgraph: '#38BDF8',
  drizzle: '#C5F74F',
  postgresql: '#336791',
  pgvector: '#336791',
  'aws': '#FF9900',
  bedrock: '#FF9900',
  tanstack: '#FF4154',
  websocket: '#00D8FF',
  'react native': '#61DAFB',
  stripe: '#635BFF',
  pwa: '#5A0FC8',
  'service worker': '#FF784B',
  webpack: '#8DD6F9',
  vite: '#646CFF',
  'material': '#007FFF',
  recharts: '#FF7300',
  superset: '#20A7C9',
  'github actions': '#2088FF',
  github: '#ffffff',
  mongodb: '#47A248',
  'rest api': '#22C55E',
  firebase: '#FFCA28',
  node: '#8CC84B',
  python: '#4B8BBE',
  flask: '#cfcfcf',
  express: '#cfcfcf',
  ocr: '#F59E0B',
  ai4bharat: '#FF6B6B',
  tts: '#A78BFA',
  html: '#E34F26',
  css: '#1572B6',
  docker: '#2496ED',
}

function getTechColor(name: string): string {
  const n = name.toLowerCase()
  for (const key in TECH_COLORS) {
    if (n.includes(key)) return TECH_COLORS[key]
  }
  return '#9CA3AF'
}

// devicon logos for the "Technologies Used" chips
const DEVICON = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`

const TECH_LOGOS: Record<string, string> = {
  react: DEVICON('react/react-original.svg'),
  typescript: DEVICON('typescript/typescript-original.svg'),
  javascript: DEVICON('javascript/javascript-original.svg'),
  next: DEVICON('nextjs/nextjs-original.svg'),
  tailwind: DEVICON('tailwindcss/tailwindcss-original.svg'),
  node: DEVICON('nodejs/nodejs-original.svg'),
  nest: DEVICON('nestjs/nestjs-original.svg'),
  python: DEVICON('python/python-original.svg'),
  flask: DEVICON('flask/flask-original.svg'),
  mongodb: DEVICON('mongodb/mongodb-original.svg'),
  postgresql: DEVICON('postgresql/postgresql-original.svg'),
  pgvector: DEVICON('postgresql/postgresql-original.svg'),
  drizzle: 'https://cdn.simpleicons.org/drizzle/C5F74F',
  langgraph: '/assets/langgraph.svg',
  openai: '/assets/openai.svg',
  'claude': 'https://cdn.simpleicons.org/claude/D97757',
  gemini: 'https://cdn.simpleicons.org/googlegemini/4796E3',
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  bedrock: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  tanstack: 'https://cdn.simpleicons.org/reactquery/FF4154',
  websocket: 'https://cdn.simpleicons.org/socketdotio/white',
  stripe: 'https://cdn.simpleicons.org/stripe/635BFF',
  firebase: DEVICON('firebase/firebase-plain.svg'),
  express: DEVICON('express/express-original.svg'),
  webpack: DEVICON('webpack/webpack-original.svg'),
  vite: DEVICON('vite/vite-original.svg'),
  material: DEVICON('materialui/materialui-original.svg'),
  'github actions': 'https://cdn.simpleicons.org/githubactions/2088FF',
  github: DEVICON('github/github-original.svg'),
  redux: DEVICON('redux/redux-original.svg'),
  docker: DEVICON('docker/docker-original.svg'),
  jest: DEVICON('jest/jest-plain.svg'),
  git: DEVICON('git/git-original.svg'),
  html: DEVICON('html5/html5-original.svg'),
  bootstrap: DEVICON('bootstrap/bootstrap-original.svg'),
}

function getTechLogo(name: string): string | null {
  const n = name.toLowerCase()
  for (const key in TECH_LOGOS) {
    if (n.includes(key)) return TECH_LOGOS[key]
  }
  return null
}
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Code2,
  Layers,
  X,
} from 'lucide-react'

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const project = projects.find((p) => p.id === String(id))

  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  const imageCount =
    project?.image_urls && project.image_urls.length > 0
      ? project.image_urls.length
      : project?.image_url
      ? 1
      : 0

  // auto-advance the gallery (pauses while the fullscreen preview is open)
  useEffect(() => {
    if (previewOpen || imageCount <= 1) return
    const timer = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % imageCount)
    }, 3500)
    return () => clearTimeout(timer)
  }, [currentImage, previewOpen, imageCount])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-white/50 mb-4">Project not found.</p>
          <button
            onClick={() => router.push('/#portfolio')}
            className="text-sm text-white/70 hover:text-white underline"
          >
            Back to portfolio
          </button>
        </div>
      </div>
    )
  }

  const tech = project.technologies
    .split(',')
    .filter((t) => t.trim() !== '')

  const features = project.key_features
    .split(';')
    .filter((f) => f.trim() !== '')

  const galleryImages =
    project.image_urls && project.image_urls.length > 0
      ? project.image_urls
      : project.image_url
      ? [project.image_url]
      : []

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1)
    }
  }

  const handleBack = () => {
    sessionStorage.setItem('skipIntroOnce', 'true')
    router.push('/#portfolio')
  }

  return (
    <>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              src={galleryImages[currentImage]}
              alt={`${project.title} — screenshot ${currentImage + 1}`}
              className="max-w-[85vw] max-h-[80vh] rounded-3xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen text-white px-6 md:px-10 lg:px-16 py-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#1a1a1a_0%,#0a0a0a_35%,#050505_100%)]" />
        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[140px] -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-white/[0.04] blur-[160px] -z-10" />

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[520px]"
          >
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-all duration-300 mb-6"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[28px] md:text-[38px] font-bold leading-tight tracking-tight mb-3"
              >
                {project.title}
              </motion.h1>

              {project.period && (
                <p className="text-[12px] text-white/40 mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {project.period}
                </p>
              )}

              <motion.div
                initial={{ width: 0, x: -20 }}
                animate={{ width: 65, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] rounded-full bg-gradient-to-r from-white/40 to-white/5 mb-5"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[13px] leading-7 text-white/75 mb-7"
            >
              {project.description}
            </motion.p>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3 mb-7 max-w-[420px]"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-gradient-to-br from-[#111] to-[#171717] border border-white/10 rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Code2 size={16} />
                </div>
                <div>
                  <p className="text-base font-semibold">{tech.length}</p>
                  <p className="text-[10px] text-white/40">Technologies Used</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="bg-gradient-to-br from-[#111] to-[#171717] border border-white/10 rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Layers size={16} />
                </div>
                <div>
                  <p className="text-base font-semibold">{features.length}</p>
                  <p className="text-[10px] text-white/40">Key Features</p>
                </div>
              </motion.div>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, x: 55 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 mb-7"
            >
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#111] to-[#181818] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-sm"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101010] border border-white/[0.08] text-white/30 text-sm cursor-default">
                  <ExternalLink size={14} />
                  Internal / NDA
                </div>
              )}

              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#111] to-[#181818] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-sm"
                >
                  <GitBranch size={14} />
                  Github
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101010] border border-white/[0.08] text-white/30 text-sm cursor-default">
                  <GitBranch size={14} />
                  Private Repo
                </div>
              )}
            </motion.div>

            {/* TECH */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={14} className="text-white/70" />
                <p className="text-[13px] font-semibold">Technologies Used</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => {
                  const name = t.trim()
                  const color = getTechColor(name)
                  const logo = getTechLogo(name)
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl border text-[11px] font-medium transition-colors"
                      style={{
                        color,
                        borderColor: `${color}40`,
                        backgroundColor: `${color}14`,
                      }}
                    >
                      {logo ? (
                        <span className="w-5 h-5 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0">
                          <img
                            src={logo}
                            alt={name}
                            className="w-full h-full object-contain"
                          />
                        </span>
                      ) : (
                        <span
                          className="w-2 h-2 ml-0.5 rounded-full shrink-0"
                          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                        />
                      )}
                      {name}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full pt-10 md:pt-14"
          >
            {/* IMAGE */}
            {galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 55 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5"
              >
                <div className="relative rounded-[26px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#111] to-[#171717] max-w-[640px] mx-auto h-[220px] md:h-[280px]">
                  <AnimatePresence>
                    <motion.img
                      key={currentImage}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 0.9, ease: 'easeInOut' },
                        scale: { duration: 4, ease: 'easeOut' },
                      }}
                      src={galleryImages[currentImage]}
                      alt={`${project.title} — screenshot ${currentImage + 1}`}
                      onClick={() => setPreviewOpen(true)}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    />
                  </AnimatePresence>

                  {currentImage > 0 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 transition-all duration-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {currentImage < galleryImages.length - 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 transition-all duration-300"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>

                {galleryImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {galleryImages.map((_, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.45 }}
                        onClick={() => setCurrentImage(i)}
                        className={`rounded-full transition-all duration-300 ${
                          currentImage === i
                            ? 'w-6 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, x: -55 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="bg-gradient-to-br from-[#101010] to-[#171717] border border-white/10 rounded-3xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-white/70" />
                <p className="text-sm font-semibold">Key Features</p>
              </div>

              <ul className="space-y-2.5 text-[12px] text-white/80 leading-6">
                {features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3"
                  >
                    <span className="text-white/35">•</span>
                    <span>{f.trim()}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
