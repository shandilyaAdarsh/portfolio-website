import { Experience } from "@/types";

export const experienceData: Experience[] = [
  {
    id: "g8g-agency",
    role: "Freelance Full Stack Developer",
    company: "G8G Agency",
    location: "Remote",
    period: "21 May 2026 – Present",
    isCurrent: true,
    description:
      "Developing and maintaining production-oriented full-stack web applications using modern web technologies and real-time architectures.",
    bulletPoints: [
      "Working on frontend-backend integration, REST APIs, authentication, RBAC, and real-time application workflows.",
      "Contributing to the Restaurant Ordering SaaS Platform, including QR menus, table management, order lifecycle tracking, kitchen workflows, operational dashboards, and tenant-isolated backend architecture.",
      "Contributing to the Staff App for floor execution, waiter coordination, order lifecycle visibility, kitchen workflows, and real-time operational synchronization.",
      "Architecting solutions with Next.js, TypeScript, Supabase, PostgreSQL, REST APIs, Supabase Realtime, and RLS-based security.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Supabase Realtime",
      "REST APIs",
      "RLS",
      "Tailwind CSS",
    ],
  },
  {
    id: "elevance-skill",
    role: "Full Stack Developer Intern",
    company: "Elevance Skill",
    location: "Remote, India",
    period: "Ongoing",
    isCurrent: true,
    description:
      "Developing and maintaining full-stack web applications with modern web technologies, responsive interfaces, and optimized performance.",
    bulletPoints: [
      "Developing and maintaining full-stack web applications using modern web technologies.",
      "Working on frontend-backend integration and robust REST API development.",
      "Contributing to debugging, performance optimization, and real-world development workflows.",
      "Improving UI/UX design fidelity, mobile responsiveness, and client-side rendering speed.",
    ],
    technologies: ["React", "JavaScript (ES6+)", "Node.js", "Express.js", "REST APIs", "UI/UX"],
  },
  {
    id: "internshala-cybersecurity",
    role: "Cyber Security Intern",
    company: "Internshala",
    location: "Remote",
    period: "2025",
    isCurrent: false,
    description:
      "Conducted vulnerability assessments and gained foundational training in network security and threat detection.",
    bulletPoints: [
      "Performed vulnerability assessment and basic security analysis across simulated network environments.",
      "Gained practical exposure to network security protocols, vulnerability scanning, and threat detection.",
      "Learned fundamentals of ethical hacking and secure coding practices for web applications.",
    ],
    technologies: [
      "Vulnerability Assessment",
      "Threat Detection",
      "Network Security",
      "Secure Coding",
    ],
  },
];
