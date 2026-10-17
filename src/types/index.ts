export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases & Cloud"
  | "Data Structures & Algorithms"
  | "Core Concepts";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 1 - 100
  iconName?: string;
  isFeatured?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: "SaaS Platform" | "Full-Stack" | "Real-Time Systems" | "Web Application";
  tags: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  highlights: string[];
  date: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string; // e.g. "2023 - Present"
  isCurrent: boolean;
  description: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gradeOrGpa?: string;
  highlights: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
  iconName: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  title: string;
  location: string;
  bio: string;
  shortBio: string;
  email: string;
  availableForHire: boolean;
  resumeUrl: string;
  avatarUrl?: string;
}
