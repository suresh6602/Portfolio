export type Project = {
  id: string
  title: string
  description: string
  technologies: string
  key_features: string
  image_url: string
  image_urls: string[]
  live_url: string
  github_url: string
  period: string
}

export type Certificate = {
  id: string
  title: string
  image_url: string
}

export type TechStack = {
  id: string
  name: string
  logo_url: string
}

export type Experience = {
  id: string
  role: string
  company: string
  period: string
  location: string
  description: string
  technologies: string
  website?: string
  linkedin?: string
}

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Full Stack Engineer',
    company: 'OneData Software Solutions',
    period: 'Jun 2026 — Present',
    location: 'Coimbatore, India',
    description:
      'Joined the OmniReach AI multi-tenant outreach platform as part of a founding team, taking sole ownership of end-to-end architecture, development, and bug fixes. Built bulk email delivery pipelines (AWS SES), multi-tenant workspaces, LinkedIn/Outlook integrations, and multi-LLM agent research & campaign workflows (LangGraph, OpenAI, Claude 3.5, Gemini). Resolved critical API loops saving $4,200+ in external API spend.',
    technologies:
      'React 18, TypeScript, Node.js, Express, Drizzle ORM, PostgreSQL (pgvector), LangGraph, OpenAI, Claude 3.5, Gemini, AWS Bedrock, AWS SES, WebSockets, React Native, TanStack Query, Tailwind CSS, pg-boss, Docker',
    website: 'https://app.onereach.app/',
    linkedin: 'https://www.linkedin.com/company/onedata-software-solutions/',
  },
  {
    id: '2',
    role: 'Software Engineer',
    company: 'Navadhiti Business Consultancy Pvt. Ltd.',
    period: 'Jul 2023 — Mar 2026',
    location: 'Bangalore, India',
    description:
      'Delivered 3 concurrent full-stack products for client EkStep Foundation (AXL, Wildway, TELL) — scaling to 10,000+ active students across low-connectivity regions. Improved application rendering performance by 60% via code splitting, lazy loading, and service worker caching. Architected 6 independent microservices on GCP and debugged 15+ backend security vulnerabilities for ISO 27001 compliance.',
    technologies:
      'React.js, Next.js, TypeScript, Node.js, MongoDB, Python, Flask, PWA, GCP, Firebase, Gemini API, Microservices, WCAG 2.1 AA',
    website: 'https://navadhiti.com',
    linkedin:
      'https://www.linkedin.com/company/navadhiti-business-consultancy-services-pvt-ltd/',
  },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'OneReach (OmniReach AI) – Sales Outreach & AI Research Platform',
    description:
      'OneReach is a multi-tenant, multi-channel AI sales outreach and research platform integrating LinkedIn, Email (Gmail/Outlook), SMS, and WhatsApp messaging automation. Powered by Multi-LLM agent orchestration (LangGraph, OpenAI, Claude 3.5, Gemini), it automates prospect discovery, deep company data enrichment via Apollo API, hyper-personalized messaging, and low-latency voice AI over WebSockets.',
    technologies:
      'React, TypeScript, Node.js, Express, Next.js, Drizzle ORM, PostgreSQL, pgvector, LangGraph, OpenAI, Claude 3.5, Gemini, AWS Bedrock, AWS SES, WebSockets, React Native, TanStack Query, Tailwind CSS, Docker, Stripe, pg-boss',
    key_features:
      'Multi-channel messaging automation integrating LinkedIn, Email (Gmail/Outlook), SMS, and WhatsApp with real-time delivery and engagement analytics;Multi-LLM agent orchestration using LangGraph with OpenAI, Claude 3.5, and Gemini for automated prospect discovery, Apollo company data enrichment, and hyper-personalized message generation;High-performance React 18/TypeScript interface built with TanStack Query and Tailwind CSS for complex data visualization and multi-channel campaign management;Multi-tenant backend architecture on Node.js/Express with ESM, Drizzle ORM, and PostgreSQL (pgvector) featuring strict workspace isolation and background worker queues via pg-boss;Real-time WebSocket bridge enabling low-latency voice AI interactions;Cross-platform mobile companion apps built with React Native;Built-in cost-optimization algorithms with intelligent caching (Apollo enrichment) and rate-limiting (Google Places) saving $4,200+ in external API spend',
    image_url: '/assets/onereach-1.png',
    image_urls: [
      '/assets/onereach-1.png',
      '/assets/onereach-2.png',
      '/assets/onereach-3.png',
      '/assets/onereach-4.png',
      '/assets/onereach-5.png',
    ],
    live_url: 'https://app.onereach.app/',
    github_url: '',
    period: 'Jun 2026 – Present',
  },
  {
    id: '2',
    title: 'AXL – Assisted Language Learning',
    description:
      'AXL is an offline-first Progressive Web Application built for government school students in Karnataka and Telangana. Designed for low-connectivity environments, it enables students to learn English, Maths and regional languages through a gamified, level-based structure with real-time scoring and a sandbox mode — making learning feel like a game, not a classroom.',
    technologies:
      'React.js, TypeScript, Material UI, Tailwind CSS, Vite, Webpack, MongoDB, Claude API, AI4Bharat ASR, AI4Bharat TTS, Recommendation Engine, PWA, Service Workers, Caching Strategies, GitHub Actions',
    key_features:
      'State-adopted — Karnataka and Telangana have included AXL in their state budget, with 10,000+ school lab students actively using the platform;Offline-first PWA architecture for low-network regions — 40% reduction in data usage with background sync and conflict resolution;Gamified learning system — level progression, real-time scoring, and sandbox mode drive consistent student engagement;Telemetry-driven personalization — every learning interaction is tracked and used to recommend content tailored to each student;ASR and TTS integration for spoken language practice and real-time pronunciation feedback;Multi-language support — English, Maths, and regional native languages, with more states in discussion for future rollout;WCAG 2.1 AA accessibility compliance for inclusive learning;Vulnerability-tested — student data security verified through penetration testing',
    image_url: '/assets/axl-1.png',
    image_urls: [
      '/assets/axl-1.png',
      '/assets/axl-2.png',
      '/assets/axl-3.png',
      '/assets/axl-4.png',
      '/assets/axl-5.png',
    ],
    live_url: 'https://kalikadeepa.the-axl.ai',
    github_url: '',
    period: 'Feb 2025 – Mar 2026',
  },
  {
    id: '3',
    title: 'AXL – Program Analytics Dashboard',
    description:
      'AXL Program Analytics Dashboard is a role-based analytics platform built for administrators overseeing the AXL learning program. State officials, district leads, mandal coordinators, headmasters, and class teachers each see only the data relevant to their role — giving every level of the education hierarchy a clear, actionable view of student engagement without manual calculation or reporting overhead.',
    technologies:
      'React.js, TypeScript, Tailwind CSS, NestJS, MongoDB, REST API, Recharts, Apache Superset, Microservices, GCP',
    key_features:
      'Role-based access control — State, District, Mandal, School, Headmaster, and Class Teacher levels with isolated data views;Real-time student tracking — monitors usage frequency, time spent, session depth, and learning progress per student;Telemetry-powered analytics — pulls directly from the AXL student telemetry database, eliminating manual data collection across 6 administrative levels;Session and language analytics — identifies high-engagement sessions, most/least used languages, and time-on-task metrics;AI-assisted metric calculation — reduced manual reporting time significantly across district and state coordinators;Period-wise and scope-based filtering — view data by school, mandal, district, or state with time-range controls;Downloadable reports — replaced manual Excel-based reporting for school, mandal, district, and state submissions;Flags drop-offs, low engagement, and at-risk student patterns for proactive intervention',
    image_url: '/assets/axl-dash-1.png',
    image_urls: [
      '/assets/axl-dash-1.png',
      '/assets/axl-dash-2.png',
      '/assets/axl-dash-3.png',
      '/assets/axl-dash-4.png',
    ],
    live_url: '',
    github_url: '',
    period: 'Feb 2025 – Mar 2026',
  },
  {
    id: '4',
    title: 'WILDWAY – Wildlife Field Tracking',
    description:
      'WILDWAY is a real-time web application for wildlife incident tracking and ranger team coordination in remote, low-connectivity environments. Rangers receive instant push notifications for nearby animal activity, while geospatial camera data and movement tracking help field teams monitor species, predict animal paths, and reduce human-wildlife conflict.',
    technologies:
      'React.js, JavaScript, Material UI, Tailwind CSS, Vite, Python, Flask, MongoDB, REST API, Firebase, Gemini API, Recharts, SMTP, GitHub Actions',
    key_features:
      'Real-time push notifications via Firebase — alerts rangers and nearby personnel to animal sightings and incidents instantly;Geospatial camera tracking — maps spotted camera locations using GPS coordinates to build a live field coverage grid;Animal movement analysis — tracks species sightings over time to identify movement patterns and predict high-risk zones;Species inventory — catalogs animals and species present across tracked zones for wildlife monitoring and research;Offline-capable reporting pipeline — field teams can log incidents in low or no-connectivity remote environments;Incident data aggregation — correlates sighting history, camera positions, and patrol data to reduce wildlife attacks',
    image_url: '/assets/wildway-1.png',
    image_urls: [
      '/assets/wildway-1.png',
      '/assets/wildway-2.png',
      '/assets/wildway-3.png',
      '/assets/wildway-4.png',
      '/assets/wildway-5.png',
    ],
    live_url: 'https://wildfriends.navadhiti.com',
    github_url: '',
    period: 'Nov 2024 – Mar 2026',
  },
  {
    id: '5',
    title: 'Teacher Assistant Portal',
    description:
      'Automated teacher assistance platform combining OCR-based answer sheet grading with a multilingual AI chatbot for teacher support. Achieved 95% OCR accuracy in automated evaluation, reducing teacher grading time by 60%, with multilingual support across 5+ Indian languages.',
    technologies:
      'React.js, JavaScript, Material UI, Node.js, OCR, REST API, MongoDB, Gemini API',
    key_features:
      '95% accuracy in OCR-based automated answer sheet evaluation;60% reduction in teacher grading time through automated scoring pipeline;Multilingual AI chatbot supporting 5+ Indian languages for teacher assistance;Computer vision pipeline for answer sheet digitization and automated scoring at scale;Improved overall data input accuracy and teacher productivity across multiple schools',
    image_url: '/assets/tap-1.png',
    image_urls: ['/assets/tap-1.png'],
    live_url: '',
    github_url: '',
    period: 'May 2024 – Nov 2024',
  },
  {
    id: '6',
    title: 'TELL – Technology Enabled Language Learning',
    description:
      'Multilingual language learning platform with real-time speech recognition and personalized content recommendations for 2,000–5,000 learners. Achieved 92% speech recognition accuracy across 5+ Indian languages using AI4Bharat ASR/TTS integration.',
    technologies:
      'React.js, JavaScript, Material UI, Node.js, AI4Bharat ASR, TTS, REST API, Firebase, GitHub Actions, Multilingual Support',
    key_features:
      '92% speech recognition accuracy across 5+ Indian languages using AI4Bharat ASR/TTS;Personalized recommendation engine adapting content delivery based on individual learner patterns;Serving 2,000–5,000 learners with inclusive learning for diverse student populations;Indic phoneme accuracy advantage over generic ASR providers for improved spoken assessment reliability',
    image_url: '/assets/tell-1.png',
    image_urls: ['/assets/tell-1.png'],
    live_url: '',
    github_url: '',
    period: 'Nov 2023 – Feb 2024',
  },
]

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Hugging Face – AI & Machine Learning',
    image_url: '/assets/cert-huggingface.webp',
  },
]

export const techStacks: TechStack[] = [
  {
    id: '1',
    name: 'React.js',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    id: '2',
    name: 'TypeScript',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    id: '3',
    name: 'Next.js',
    logo_url: 'https://cdn.simpleicons.org/nextdotjs/white',
  },
  {
    id: '4',
    name: 'Node.js',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    id: '5',
    name: 'LangGraph',
    logo_url: '/assets/langgraph.svg',
  },
  {
    id: '6',
    name: 'OpenAI',
    logo_url: '/assets/openai.svg',
  },
  {
    id: '7',
    name: 'Claude 3.5',
    logo_url: 'https://cdn.simpleicons.org/claude/D97757',
  },
  {
    id: '8',
    name: 'Gemini API',
    logo_url: 'https://cdn.simpleicons.org/googlegemini/4796E3',
  },
  {
    id: '9',
    name: 'PostgreSQL',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    id: '10',
    name: 'Drizzle ORM',
    logo_url: 'https://cdn.simpleicons.org/drizzle/C5F74F',
  },
  {
    id: '11',
    name: 'AWS Bedrock / SES',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    id: '12',
    name: 'TanStack Query',
    logo_url: 'https://cdn.simpleicons.org/reactquery/FF4154',
  },
  {
    id: '13',
    name: 'WebSockets',
    logo_url: 'https://cdn.simpleicons.org/socketdotio/white',
  },
  {
    id: '14',
    name: 'React Native',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    id: '15',
    name: 'Python',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    id: '16',
    name: 'MongoDB',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    id: '17',
    name: 'Express.js',
    logo_url: 'https://cdn.simpleicons.org/express/white',
  },
  {
    id: '18',
    name: 'Tailwind CSS',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    id: '19',
    name: 'Docker',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    id: '20',
    name: 'Stripe',
    logo_url: 'https://cdn.simpleicons.org/stripe/635BFF',
  },
  {
    id: '21',
    name: 'GitHub Actions',
    logo_url: 'https://cdn.simpleicons.org/githubactions/2088FF',
  },
  {
    id: '22',
    name: 'Firebase',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  },
  {
    id: '23',
    name: 'Redux Toolkit',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  },
  {
    id: '24',
    name: 'PWA',
    logo_url: 'https://cdn.simpleicons.org/pwa/5A0FC8',
  },
]
