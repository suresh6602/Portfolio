'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Code2,
  Server,
  Cloud,
  Cpu,
  Layers,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const DRIVE_URL =
  'https://drive.google.com/drive/folders/1I4UlRwRDbbzf5ll3eBITZulbyUgnFcSc'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    color: '#38BDF8',
    skills: [
      'React JS / React 18',
      'Next.js (App Router)',
      'TypeScript',
      'Vite',
      'Redux / RTK',
      'TanStack React Query',
      'Tailwind CSS',
      'Responsive UI / UX',
      'HTML5 & CSS3',
    ],
  },
  {
    icon: Server,
    title: 'Backend & Databases',
    color: '#4ADE80',
    skills: [
      'Node.js & Express.js',
      'Drizzle ORM',
      'PostgreSQL (pgvector)',
      'MongoDB',
      'REST API Design',
      'WebSockets',
      'pg-boss Worker Queues',
      'Python & Flask',
      'Firebase',
    ],
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    color: '#C084FC',
    skills: [
      'LangGraph Agent Orchestration',
      'OpenAI API',
      'Claude 3.5 Sonnet',
      'Google Gemini API',
      'AWS Bedrock',
      'Voice AI & WebSockets',
      'OCR & Computer Vision',
      'AI4Bharat ASR / TTS',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & Architecture',
    color: '#FB923C',
    skills: [
      'AWS (SES, Bedrock, S3)',
      'Google Cloud Platform (GCP)',
      'Multi-Tenant Architecture',
      'Microservices Design',
      'React Native (Mobile)',
      'Docker & Containers',
      'CI/CD (GitHub Actions)',
      'Offline-First PWAs',
    ],
  },
]

export default function ResumePage() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden pb-20 selection:bg-white/20 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#151515_0%,#0a0a0a_40%,#050505_100%)]" />
      <div className="fixed top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] blur-[150px] -z-10" />
      <div className="fixed top-[40%] right-[-200px] w-[550px] h-[550px] rounded-full bg-purple-500/[0.03] blur-[170px] -z-10" />
      <div className="fixed bottom-[-150px] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[160px] -z-10" />

      <div className="max-w-[1150px] mx-auto px-5 sm:px-8 lg:px-12 pt-8">
        {/* TOP BAR / NAVIGATION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-white/10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-white/90 transition-all font-medium text-[13px] shadow-lg shadow-white/10 active:scale-95"
            >
              <Download size={14} />
              Open Drive Folder
            </a>
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition-all text-white/85 text-[13px] font-medium active:scale-95"
            >
              <ExternalLink size={14} />
              Google Drive Link
            </a>
          </div>
        </motion.div>

        {/* HERO / PROFILE HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05, ease: smoothEase }}
          className="relative rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 mb-8 overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-medium tracking-wide uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Full-time Roles
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-white"
                style={{ letterSpacing: '-0.03em' }}
              >
                Sureshkumar R
              </h1>

              <p className="text-lg sm:text-xl font-medium text-white/80 mb-4">
                Full Stack Engineer{' '}
                <span className="text-white/40 font-normal">
                  · React JS &amp; Node.js · Python · LangGraph
                </span>
              </p>

              {/* Contact Pills */}
              <div className="flex flex-wrap items-center gap-2.5 text-[12px] sm:text-[13px] text-white/70">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03]">
                  <MapPin size={13} className="text-white/50" />
                  Tamil Nadu, India
                </span>

                <a
                  href="mailto:sureshkumar27082002@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 hover:text-white transition-colors"
                >
                  <Mail size={13} className="text-white/50" />
                  sureshkumar27082002@gmail.com
                </a>

                <a
                  href="tel:+916374215819"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-white/50" />
                  +91 6374215819
                </a>

                <a
                  href="https://linkedin.com/in/sureshkumar-r-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 hover:text-white transition-colors"
                >
                  <FaLinkedinIn size={12} className="text-[#0A66C2]" />
                  linkedin.com/in/sureshkumar-r-dev
                </a>

                <a
                  href="https://github.com/suresh6602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 hover:text-white transition-colors"
                >
                  <FaGithub size={13} className="text-white/80" />
                  github.com/suresh6602
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROFESSIONAL SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: smoothEase }}
          className="rounded-[26px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <Sparkles size={16} className="text-amber-400" />
            <h2 className="text-base font-bold tracking-wide uppercase text-white/90">
              Professional Summary
            </h2>
          </div>
          <p className="text-[14.5px] leading-relaxed text-white/80">
            Full Stack Engineer with <strong>3+ years of experience</strong>{' '}
            building end-to-end features using React.js, Next.js, Node.js,
            LangGraph, and RESTful APIs, with proven ability to troubleshoot,
            optimize performance, and deliver in agile, cloud-first
            environments. Delivered platforms adopted by{' '}
            <strong>2 state governments</strong> and used by{' '}
            <strong>10,000+ active students</strong> in production. Operates
            independently as a subject matter expert (SME) across
            cross-functional teams to meet high-stakes product requirements.
          </p>
        </motion.div>

        {/* TECHNICAL SKILLS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: smoothEase }}
          className="mb-10"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <Layers size={16} className="text-blue-400" />
            <h2 className="text-base font-bold tracking-wide uppercase text-white/90">
              Technical Skills Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon
              return (
                <div
                  key={idx}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      <Icon size={14} style={{ color: cat.color }} />
                    </div>
                    <h3 className="text-[14px] font-semibold text-white/90">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11.5px] px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-white/75"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* PROFESSIONAL EXPERIENCE TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: smoothEase }}
          className="mb-10"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <Briefcase size={16} className="text-emerald-400" />
            <h2 className="text-base font-bold tracking-wide uppercase text-white/90">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-6">
            {/* ROLE 1 - ONEDATA */}
            <div className="rounded-[26px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 hover:border-white/20 transition duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    Full Stack Engineer
                  </h3>
                  <p className="text-[14px] text-white/80 mt-1 font-medium">
                    OneData Software Solutions{' '}
                    <span className="text-white/40">· Coimbatore, India</span>
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-[11px] text-white/80"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <Calendar size={11} />
                  JUN 2026 – PRESENT
                </div>
              </div>

              <ul className="space-y-2.5 text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed mb-5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400 shrink-0 mt-1"
                  />
                  <span>
                    Joined the <strong>OmniReach AI</strong> multi-tenant
                    outreach platform as part of a founding team; took sole
                    ownership of end-to-end development, bug fixes, and system
                    architecture for the platform.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400 shrink-0 mt-1"
                  />
                  <span>
                    Built the bulk email module (<strong>AWS SES</strong>{' '}
                    sending pipeline with delivery tracking and analytics),
                    workspace module (creation, org-member sharing, activity
                    tracking), and LinkedIn/Outlook account-connection modules
                    end-to-end.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400 shrink-0 mt-1"
                  />
                  <span>
                    Built the campaign and research module, orchestrating{' '}
                    <strong>
                      Multi-LLM agent workflows (LangGraph, OpenAI, Claude 3.5,
                      Gemini)
                    </strong>{' '}
                    for prospect research and hyper-personalized outreach.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400 shrink-0 mt-1"
                  />
                  <span>
                    Fixed two costly production API-looping bugs — an Apollo
                    enrichment bug and uncontrolled Google Places search loop —
                    preventing over <strong>$4,200+ in wasted API spend</strong>
                    .
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {[
                  'React 18',
                  'TypeScript',
                  'Node.js',
                  'Express',
                  'Drizzle ORM',
                  'PostgreSQL (pgvector)',
                  'LangGraph',
                  'AWS SES & Bedrock',
                  'WebSockets',
                  'React Native',
                  'TanStack Query',
                ].map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.02] text-white/60"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ROLE 2 - NAVADHITI */}
            <div className="rounded-[26px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 hover:border-white/20 transition duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    Software Engineer
                  </h3>
                  <p className="text-[14px] text-white/80 mt-1 font-medium">
                    Navadhiti Business Consultancy Pvt. Ltd.{' '}
                    <span className="text-white/40">
                      · Bangalore, India (Client: EkStep Foundation)
                    </span>
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-[11px] text-white/80"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <Calendar size={11} />
                  JUL 2023 – MAR 2026
                </div>
              </div>

              <ul className="space-y-2.5 text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed mb-5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-blue-400 shrink-0 mt-1"
                  />
                  <span>
                    Designed and developed full-stack, offline-first Progressive
                    Web Applications (AXL, Wildway, TELL) using React JS,
                    Next.js, and Node.js REST APIs, scaling to{' '}
                    <strong>10,000+ active students</strong> across
                    low-connectivity regions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-blue-400 shrink-0 mt-1"
                  />
                  <span>
                    Improved application rendering performance by{' '}
                    <strong>60%</strong> through code splitting, lazy loading,
                    and service worker caching.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-blue-400 shrink-0 mt-1"
                  />
                  <span>
                    Built and integrated AI-assisted chatbot features (Gemini
                    API) and real-time dashboards (React JS, MongoDB) to power
                    intelligent learning recommendations.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-blue-400 shrink-0 mt-1"
                  />
                  <span>
                    Architected <strong>6 independently deployable microservices</strong>{' '}
                    (orchestration, content, learner, text evaluation, and
                    telemetry) deployed and maintained on Google Cloud Platform
                    (GCP).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-blue-400 shrink-0 mt-1"
                  />
                  <span>
                    Debugged 15+ backend security vulnerabilities through
                    rigorous testing and code review, contributing to{' '}
                    <strong>ISO 27001 compliance</strong>.
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {[
                  'React.js',
                  'Next.js',
                  'Node.js',
                  'MongoDB',
                  'Python',
                  'Flask',
                  'GCP Microservices',
                  'Offline PWAs',
                  'Gemini API',
                  'Firebase',
                ].map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.02] text-white/60"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* EDUCATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: smoothEase }}
          className="rounded-[26px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <GraduationCap size={16} className="text-purple-400" />
            <h2 className="text-base font-bold tracking-wide uppercase text-white/90">
              Education
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">
                Bachelor of Engineering (B.E.) — Computer Science &amp;
                Engineering
              </h3>
              <p className="text-[14px] text-white/70 mt-0.5">
                Government College of Engineering, Erode · Tamil Nadu, India
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-300 text-[12px] font-semibold"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                CGPA: 8.12
              </span>
              <span
                className="text-[12px] text-white/50"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                2019 – 2023
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
