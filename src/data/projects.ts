import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "restaurant-ordering-saas",
    slug: "restaurant-ordering-saas",
    title: "Restaurant Ordering SaaS Platform",
    subtitle: "Multi-Tenant Ordering & Operations Platform — G8G Agency",
    description:
      "A comprehensive multi-tenant restaurant ordering SaaS platform supporting QR digital menus, role-based workflows, live table management, and tenant-isolated data architecture.",
    longDescription:
      "Developed for G8G Agency. Features role-based access control for administrators, staff, kitchen teams, and patrons. Integrated real-time order lifecycle tracking, operational analytics dashboards, and PostgreSQL Row-Level Security (RLS).",
    category: "SaaS Platform",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "Supabase Realtime",
      "RLS",
      "Tailwind CSS",
    ],
    featured: true,
    githubUrl: "https://github.com/shandilyaAdarsh",
    highlights: [
      "Built QR-based digital menus, table management, order lifecycle tracking, kitchen workflows, and operational dashboards.",
      "Implemented secure authentication, RBAC, and real-time order synchronization using Supabase.",
      "Designed tenant-isolated data architecture with PostgreSQL Row-Level Security (RLS) and REST APIs.",
    ],
    date: "Ongoing",
  },
  {
    id: "staff-app-g8g",
    slug: "staff-execution-app",
    title: "Staff Operational App",
    subtitle: "Real-Time Floor & Kitchen Execution System — G8G Agency",
    description:
      "A real-time operational execution application for restaurant floor staff, enabling waiter coordination, live order lifecycle visibility, and instant kitchen synchronization.",
    longDescription:
      "Engineered real-time operational synchronization for restaurant staff with multi-branch/tenant isolation, instant notification dispatch, and strictly enforced RBAC access policies.",
    category: "Real-Time Systems",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Supabase Realtime",
      "RLS",
      "Tailwind CSS",
    ],
    featured: true,
    githubUrl: "https://github.com/shandilyaAdarsh",
    highlights: [
      "Streamlined floor execution, waiter coordination, order lifecycle tracking, and kitchen workflows.",
      "Engineered real-time synchronization with Supabase Realtime across concurrent active devices.",
      "Implemented branch/tenant isolation with secure authentication and role-based permissions.",
    ],
    date: "Ongoing",
  },
  {
    id: "job-recommendation-portal",
    slug: "job-recommendation-portal",
    title: "Full-Stack Job Recommendation Portal",
    subtitle: "Full-Stack Career & Skill Matching Platform",
    description:
      "A full-stack job recommendation portal featuring secure authentication, skill-based filtering algorithms, and personalized discovery dashboards.",
    longDescription:
      "Built with MongoDB, Express.js, React, and Node.js. Incorporates personalized job recommendation matching based on user skills, experience preferences, and keywords.",
    category: "Full-Stack",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Tailwind CSS"],
    featured: true,
    githubUrl: "https://github.com/shandilyaAdarsh",
    highlights: [
      "Built full-stack job portal with JWT authentication and personalized recommendation algorithms.",
      "Implemented multi-attribute filtering based on user skills, preferences, and keyword weights.",
      "Engineered responsive modern dashboard and structured high-throughput REST APIs for scalability.",
    ],
    date: "2025",
  },
];
