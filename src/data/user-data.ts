export interface UserData {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  brandLogo?: string;
  mediaImage?: string;
  message: string;
  project?: string;
  rating?: number;
  date?: string;
  vimeoId?: string;
}

export const userData: UserData[] = [
  {
    id: "minith-reddy",
    name: "Minith Reddy",
    role: "Founder & CEO",
    company: "CarrotKart.live",
    avatar: "/brands/carrotkart-founder.png",
    brandLogo: "/brands/CarrotKart1.png",
    mediaImage: "/brands/carrotkart-founder.png",
    message: "Saikiran architected our production Shopify e-commerce platform from the ground up. His attention to micro-interactions, responsive UX, and sub-second checkout speeds directly increased our customer conversion by 38%. An absolute rockstar engineer.",
    project: "CarrotKart.live",
    rating: 5,
    date: "Mar 2026",
  },
  {
    id: "ved-gupta",
    name: "Ved Gupta",
    role: "Founder",
    company: "LX7 House",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    brandLogo: "/brands/LOGO-LX7_3.webp",
    mediaImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80",
    message: "Working with Saikiran on LX7 House a luxury perfume brand. He is an expert in building complete and production ready applications, right from planning, architecting, designing, developing, testing, debugging, and deploying with absolute craftsmanship.",
    project: "LX7 House",
    rating: 5,
    date: "June 2026",
  },
  {
    id: "justra-legal",
    name: "Vikram Malhotra",
    role: "Senior Legal Advocate & Partner",
    company: "Justra Legal Technologies",
    avatar: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80",
    brandLogo: "/brands/justra.png",
    mediaImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    message: "Saikiran engineered LegalAssistant AI with automated doc templating, case analytics, and bank-grade security. As advocates handling mission-critical matters, having an engineer who understands courtroom legal workflows was invaluable.",
    project: "LegalAssistant AI",
    rating: 5,
    date: "Apr 2026",
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Principal Security Architect",
    company: "Nexus Cybersecurity Systems",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    brandLogo: "/brands/nexus-logo.svg",
    mediaImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    message: "Saikiran possesses a razor-sharp understanding of zero-trust architecture, threat-surface defense, and Spring Boot microservices. He implemented automated audit pipelines that hardened our cyber infrastructure with 99.99% uptime.",
    project: "Cyber Defense Architecture",
    rating: 5,
    date: "Jan 2025",
  },
  {
    id: "surrender",
    name: "Surrender Rajput",
    role: "Director of Digital Education",
    company: "NavvYug Learning Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    brandLogo: "/brands/navvyug-logo.svg",
    mediaImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
    message: "Saikiran delivered our comprehensive Learning Management Platform well ahead of deadline. The role-based dashboards for educators, student course analytics, and zero-downtime deployment exceeded all expectations. True technical leadership.",
    project: "NavvYug LMS",
    rating: 5,
    date: "May 2026",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Head of Training & Engineering Mentorship",
    company: "Cognitive Labs (Training Side Gig)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    brandLogo: "/brands/cognitive-logo.svg",
    mediaImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    message: "Saikiran ran our engineering cohorts and hands-on AI workshops. His ability to break down complex full-stack architectures into intuitive real-world exercises inspired dozens of engineers. Outstanding trainer and mentor.",
    project: "AI Engineering Bootcamp",
    rating: 5,
    date: "Feb 2025",
  },
];
