export interface PersonalWork {
  id: string;
  title: string;
  subtitle: string;
  category: "Full-Stack" | "Generative AI" | "Creative Tech" | "Systems";
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  gradient: string;
  accentColor: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  iconName: string;
}

export const PERSONAL_DATA = {
  name: "Saikiran Nannapaneni",
  role: "Software Engineer & Creative Technologist",
  tagline: "Crafting modern web architectures, distributed software, and interactive digital experiences.",
  about:
    "I specialize in building elegant cloud-native software, resilient backend services, and immersive interactive web experiences. Passionate about modern JavaScript ecosystems, Generative AI tooling, and fluid motion design.",
  location: "New Delhi",
  email: "sai8844n@yahoo.com",
  phone: "+91 75697 67364",
  socials: {
    github: "https://github.com/Saikiran8844",
    linkedin: "https://linkedin.com/in/nannapaneni-saikiran",
    email: "mailto:sai8844n@yahoo.com",
    resume: "https://storage.googleapis.com/portfolio-public-files/Saikiran_Nannapaneni_Resume.pdf", // Set your resume URL here
  },

  works: [
    {
      id: "carrotkart-live",
      title: "CarrotKart.live",
      subtitle: "Production Shopify E-Commerce Platform",
      category: "Full-Stack",
      description:
        "High-conversion, production-grade online retail storefront engineered for CarrotKart. Features custom Shopify Liquid themes, optimized checkout flow, dynamic catalog filtering, and sub-second performance.",
      highlights: [
        "Architected custom production Shopify storefront with fluid UI micro-interactions",
        "Streamlined multi-currency checkout pipeline and dynamic inventory syncing",
        "Optimized mobile Core Web Vitals achieving sub-second first contentful paint",
      ],
      techStack: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS", "Storefront API"],
      githubUrl: "https://github.com/Saikiran8844/carrotkart-mobile-app",
      liveUrl: "https://carrotkart.live",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accentColor: "#2713ffff",
    },
    {
      id: "legalassistant-ai",
      title: "LegalAssistant AI",
      subtitle: "Automated Legal Document & Case Workflow Engine",
      category: "Full-Stack",
      description:
        "Enterprise legal technology platform streamlining document automation, contract analysis, and caseload tracking with Supabase backend, DOCX templating engines, and rich analytics.",
      highlights: [
        "Automated dynamic legal document generation with DocxTemplater and client-side PDF rendering",
        "Integrated secure Supabase authentication, role-based access control, and Postgres row-level security",
        "Built interactive analytics telemetry and caseload scheduling with Recharts",
      ],
      techStack: ["React 19", "TypeScript", "Supabase", "DocxTemplater", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/Saikiran8844/legalassistant",
      liveUrl: "https://justra.vercel.app",
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      accentColor: "#3b82f6",
    },
    {
      id: "ai-interview-assistant",
      title: "AI Interview Assistant",
      subtitle: "Intelligent Mock Interviewer & Qualitative Feedback Engine",
      category: "Generative AI",
      description:
        "Production AI-powered technical interview prep platform delivering context-aware questions, real-time speech interaction, and automated qualitative critique rubrics.",
      highlights: [
        "Contextual mock technical interview generation tailored to specific engineering roles and seniority",
        "Streaming low-latency response architecture with dynamic performance evaluation rubrics",
        "Deployed to production on Vercel with responsive dark/light interface",
      ],
      techStack: ["TypeScript", "Next.js", "OpenAI / Gemini API", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/Saikiran8844/AI_Interview_Assistant",
      liveUrl: "https://ai-interview-assistant-stage.vercel.app",
      gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
      accentColor: "#8b5cf6",
    },
    {
      id: "NavvYug LMS",
      title: "NavvYug Learning Management System",
      subtitle: "Learning Management System for Students and Educators",
      category: "Full-Stack",
      description:
        "Scalable Learning Management System for Students and Educators",
      highlights: [
        "Comprehensive course architecture with dynamic syllabus management, student analytics, and gradebook tracking",
        "Interactive assessment workflows with real-time assignment submissions and progress telemetry",
        "Modular role-based access control for educators, students, and institutional administrators",
      ],
      techStack: ["Java", "Spring Boot", "REST APIs", "Microservices", "Docker", "PostgreSQL"],
      githubUrl: "https://github.com/Saikiran8844/navvyug-lms",
      liveUrl: "https://navvyug-lms.vercel.app",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      accentColor: "#f59e0b",
    },
    {
      id: "back-office-connector-chatbot",
      title: "Back-Office Connector Chatbot",
      subtitle: "Enterprise Integration Middleware & Conversational AI Hub",
      category: "BackEnd",
      description:
        "High-performance enterprise middleware bridging conversational AI agents with legacy back-office ERP/CRM systems via asynchronous event streams and microservices.",
      highlights: [
        "Engineered robust RESTful and webhook middleware connecting conversational AI chatbots to core enterprise databases",
        "High-throughput asynchronous payload routing and fault-tolerant transactional reliability",
        "Secured back-office API endpoints with OAuth2, token verification, and granular rate limiting",
      ],
      techStack: ["Java", "Spring Boot", "Microservices", "REST APIs", "Docker", "RabbitMQ"],
      githubUrl: "https://github.com/Saikiran8844",
      liveUrl: "#",
      gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
      accentColor: "#f43f5e",
    },
  ] as PersonalWork[],

  skills: [
    {
      category: "Languages & Core",
      skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "HTML5 & CSS3"],
      iconName: "Code",
    },
    {
      category: "Backend & Systems",
      skills: ["Spring Boot", "Microservices", "REST & SOAP APIs", "Redis", "MySQL", "Docker", "Kubernetes"],
      iconName: "Server",
    },
    {
      category: "Frontend & Creative Tech",
      skills: ["React 19 / Next.js", "Vue 3", "Three.js / WebGL", "GSAP & ScrollTrigger", "TailwindCSS", "Angular"],
      iconName: "Sparkles",
    },
    {
      category: "AI & Automation",
      skills: ["Generative AI", "Google Gemini API", "Chat GPT Wrappers", "Model Context Protocol (MCP)", "Playwright", "Cucumber"],
      iconName: "Bot",
    },
  ] as SkillCategory[],

  focusAreas: [
    {
      title: "Full-Stack & Cloud Architecture",
      description: "Designing modular, resilient services and coupling them with responsive, accessible user interfaces.",
    },
    {
      title: "Creative Development & Motion",
      description: "Crafting fluid, high-frame-rate web interactions with GSAP, Three.js, and WebGL.",
    },
    {
      title: "Generative AI Tooling",
      description: "Building autonomous agents and developer tooling that streamline engineering workflows.",
    },
  ],
};
