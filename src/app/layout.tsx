import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/context/ThemeContext'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

const SITE_NAME = "Sureshkumar R";
const SITE_TITLE = "Sureshkumar R | Full Stack Engineer";
const SITE_DESCRIPTION =
  "Full Stack Engineer with 3+ years of experience building scalable web apps, multi-tenant SaaS, and Multi-LLM AI Agent workflows using React, Node.js, LangGraph, Drizzle ORM, and PostgreSQL — serving 10,000+ production users.";
const OG_IMAGE = "/assets/og-banner.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  keywords: [
    "Sureshkumar R",
    "Full Stack Engineer",
    "Full Stack Developer",
    "LangGraph",
    "AI Agent Orchestration",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Drizzle ORM",
    "PostgreSQL",
    "Python",
    "AWS Bedrock",
    "AWS SES",
    "WebSockets",
    "React Native",
    "TypeScript",
    "Portfolio",
    "India",
    "Coimbatore",
    "Tamil Nadu",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        alt: "Sureshkumar R — Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@suresh6602",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sureshkumar R",
  url: SITE_URL,
  image: `${SITE_URL}/assets/PP.png`,
  jobTitle: "Full Stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "OneData Software Solutions",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Government College of Engineering, Erode",
  },
  sameAs: [
    "https://github.com/suresh6602",
    "https://linkedin.com/in/sureshkumar-r-dev",
  ],
  knowsAbout: [
    "React 18",
    "Next.js",
    "Node.js",
    "TypeScript",
    "LangGraph",
    "Multi-LLM Agents",
    "PostgreSQL",
    "Drizzle ORM",
    "AWS Bedrock",
    "AWS SES",
    "Python",
    "Flask",
    "Docker",
    "WebSockets",
  ],
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <RefreshRedirect />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}