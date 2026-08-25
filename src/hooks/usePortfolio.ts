'use client'

import { projects, certificates, techStacks } from '@/data/portfolioData'

export default function usePortfolio() {
  return {
    projects,
    certificates,
    techStacks,
    loading: false,
  }
}
