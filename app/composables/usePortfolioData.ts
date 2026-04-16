import identityRaw from '~/data/identity.json'
import projectsRaw from '~/data/project.json'

// ---- Types ----
export interface SkillItem { name: string; level: number }
export interface ExperienceStat { number: string; label: string }
export interface SocialLink { name: string; url: string }
export interface MenuItem { name: string; path: string }
export interface ProjectType { value: string; label: string }

export interface Project {
  slug: string
  title: string
  description: string
  fullDescription: string
  role: string
  client: string
  tags: string[]
  year: string
  image: string
  gallery: string[]
}

export interface Identity {
  personal: {
    firstName: string
    lastName: string
    fullName: string
    title: string
    email: string
    description: string
  }
  branding: { logoText: { first: string; last: string } }
  hero: {
    label: string
    description: string
    ctaButtonText: string
    stats: { years: string; yearsLabel: string }
  }
  about: {
    sectionNumber: string
    sectionLabel: string
    statement: string
    highlights: string[]
    imagePlaceholderLabels: string[]
    expertise: { title: string; description: string }
    skills: SkillItem[]
    experience: ExperienceStat[]
  }
  contact: {
    sectionNumber: string
    sectionLabel: string
    title: { lines: string[] }
    email: string
    education: { school: string; major: string; years: string }
    certifications: string[]
    social: SocialLink[]
    form: { submitButtonText: string; projectTypes: ProjectType[] }
  }
  navigation: { menuItems: MenuItem[]; menuSocial: SocialLink[] }
  footer: { copyrightText: string; socialLinks: SocialLink[] }
  seo: {
    siteUrl: string
    siteName: string
    twitterHandle: string
    keywords: string[]
    ogImage: string
    themeColor: string
  }
}

export function usePortfolioData() {
  const identity = identityRaw as Identity
  const projects = projectsRaw as Project[]

  function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug)
  }

  return { identity, projects, getProjectBySlug }
}
