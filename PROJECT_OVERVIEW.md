# Portfolio v1 — Project Overview

## What Is This?

A full-stack personal portfolio website with an admin panel for content management. Built with Next.js and Supabase, it showcases projects, certificates, and tech stacks, with a public comment/testimonial system and a protected admin dashboard.

---

## Tech Stack

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 3.4.19 |
| CSS Processing | PostCSS + Autoprefixer | 8.5.10 |

### Animation & 3D
| Library | Purpose |
|---------|---------|
| Framer Motion | Page/section animations, scroll triggers, stagger effects |
| Three.js | 3D rendering engine |
| React Three Fiber | React renderer for Three.js |
| React Three Drei | Three.js helper utilities |
| React Three Rapier | Physics engine for 3D scene |
| GSAP | Timeline-based animations |
| Meshline | Line rendering in Three.js |

### Backend / Data
| Technology | Role |
|-----------|------|
| Supabase (PostgreSQL) | Database, Auth, Storage, Realtime subscriptions |
| Supabase SSR | Server-side session handling |
| Supabase Auth Helpers | Next.js middleware integration |

### UI Utilities
| Library | Purpose |
|---------|---------|
| Lucide React | Icon set |
| React Icons | Additional icons |
| SweetAlert2 | Modal alerts and notifications |

---

## Database Schema

```
projects        → portfolio project records
certificates    → certification records
tech_stack      → technology logos/info
comments        → public user comments/testimonials
```

Supabase Storage bucket holds comment profile images.

---

## Application Workflow

### 1. Public Portfolio (Visitor Flow)

```
/ (Home)
  │
  ├── WelcomeScreen          (one-time intro animation per session)
  │     └── fades out after 2.8s
  │
  ├── AnimatedBackground     (Three.js 3D scene, always present)
  │
  ├── Navbar                 (fixed, tracks active section on scroll)
  │
  ├── Hero Section           (typed text animation, 3D canvas)
  │
  ├── About Section          (bio, live project/cert counts from Supabase)
  │
  ├── Portfolio Showcase     (tabbed: Projects / Certificates / Tech Stack)
  │     └── data fetched from Supabase, cached in sessionStorage
  │
  └── Contact Section
        ├── ContactForm      (sends email via form submission)
        └── CommentsSection  (read + post comments, like, upload avatar)
                              └── realtime updates via Supabase Postgres Changes

/portfolio/[id]              (individual project detail page)
```

**Session Optimizations:**
- `introPlayed`, `heroPlayed`, `navbarPlayed` flags in `sessionStorage` prevent animations from replaying on navigate-back.
- Portfolio data (`projects`, `certificates`, `techStacks`) is cached in `sessionStorage` to avoid redundant Supabase queries.
- Comment likes are tracked in `localStorage` (`liked-{id}`) so re-renders do not reset like state.

---

### 2. Admin Panel (Owner Flow)

```
/admin/login
  └── Supabase email/password auth → JWT cookie set

/admin/dashboard             (stats overview)
/admin/projects              (CRUD: add, edit, delete projects)
/admin/projects/[id]         (edit individual project)
/admin/certificates          (CRUD: certificates)
/admin/comments              (moderate/pin/delete comments)
/admin/tech                  (manage tech stack logos)
```

**Auth Protection:**
- `middleware.ts` intercepts every `/admin/*` request (except `/admin/login`).
- It uses Supabase SSR to verify the session cookie server-side.
- Unauthenticated requests are redirected to `/admin/login`.

---

### 3. Realtime Comment Flow

```
User posts comment
  → commentService.createCommentService()
  → Supabase INSERT into `comments` table
  → Supabase Postgres Changes fires event
  → useComments() hook receives event
  → UI updates instantly without page reload
```

Likes also use optimistic UI — the count updates locally before the Supabase call resolves.

---

## Key Files & Their Roles

```
src/
├── app/
│   ├── layout.tsx               Root layout, sets metadata, wraps RefreshRedirect
│   ├── page.tsx                 Home page, orchestrates all sections
│   ├── admin/                   All admin panel pages (protected)
│   └── portfolio/[id]/page.tsx  Project detail page
│
├── components/
│   ├── AnimatedBackground.tsx   Three.js 3D background scene
│   ├── WelcomeScreen.tsx        One-time intro animation
│   ├── Navbar.tsx               Fixed nav with scroll-spy
│   ├── RefreshRedirect.tsx      Session state / redirect handler
│   ├── band/TextType.tsx        Typing cursor animation
│   └── sections/
│       ├── Hero.tsx             Hero with Framer Motion stagger + 3D
│       ├── About.tsx            Bio, stats (live data)
│       ├── PortfolioShowcase.tsx Tabbed project/cert/tech grid
│       ├── PortfolioCard.tsx    Individual project card
│       └── contact/
│           ├── ContactForm.tsx  Email form
│           └── CommentsSection.tsx Realtime comments + likes + uploads
│
├── hooks/
│   ├── usePortfolio.ts          Fetches + caches portfolio data
│   └── useComments.ts           Fetches + subscribes to realtime comments
│
└── lib/
    ├── supabase.ts              Browser Supabase client
    ├── supabaseServer.ts        Server-side Supabase client
    ├── portfolioService.ts      DB queries: projects, certs, tech stacks
    ├── commentService.ts        DB queries + storage: comments, images
    └── introState.ts            sessionStorage helpers for animation flags
```

---

## Design System

**Color Palette (dark theme):**
```
Background primary   #0d0d0d
Background secondary #141414
Card background      #1a1a1a
Border               #2a2a2a
Text primary         #f0f0f0
Text secondary       #888888
Text muted           #555555
Accent               #d4d4d4
```

**Typography:**
- `Syne` — main UI headings and body (wght 400–800)
- `DM Mono` — code snippets and accent labels (wght 300–500)

**Motion:**
- Custom easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Scroll-triggered reveals via Framer Motion `whileInView`
- Stagger children delays for list/card entrances
- Glass morphism effects: `backdrop-blur` + `bg-white/10`

---

## Data Flow Summary

```
Supabase DB
    │
    ├── portfolioService.ts  ←──  usePortfolio hook  ←──  PortfolioShowcase, About
    │
    ├── commentService.ts   ←──  useComments hook   ←──  CommentsSection
    │         └── Supabase Storage (comment images)
    │
    └── Supabase Auth       ←──  middleware.ts       ←──  Admin routes
```

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Environment variables required (`.env.local`):**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Deployment

Compatible with **Vercel** out of the box (Next.js App Router + middleware). Supabase handles all backend infrastructure — no separate server needed.
