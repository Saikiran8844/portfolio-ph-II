export interface UserData {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
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
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    message: "Saikiran architected our production Shopify e-commerce platform from the ground up. His attention to micro-interactions, responsive UX, and sub-second checkout speeds directly increased our customer conversion by 38%. An absolute rockstar engineer.",
    project: "CarrotKart.live",
    rating: 4.5,
    date: "Mar 2026",
  },
  {
    id: "ved-gupta",
    name: "Ved Gupta",
    role: "Founder",
    company: "LX7 House",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    message: "Working with Saikiran on LX7 House a perfume brand.  He is an expert in building complete and production ready applications, right from planning, architecting, designing, developing, testing, debugging, and deploying. He is an expert in building complete and production ready applications, right from planning, architecting, designing, developing, testing, debugging, and deploying.",
    project: "LX7 House",
    rating: 5,
    date: "June 2026",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Senior AI Engineering Lead",
    company: "Cognitive Prep Labs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    message: "Saikiran delivered an ultra-responsive AI Interview Assistant with streaming evaluation rubrics, low-latency API orchestration, and stunning frontend motion. Finding an engineer who balances deep backend plumbing with elite frontend aesthetics is extraordinarily rare.",
    project: "AI Interview Assistant",
    rating: 5,
    date: "Feb 2025",
  },
  {
    id: "surrender",
    name: "Surrender Rajput",
    role: "Director of Digital Education",
    company: "NavvYug Learning Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    message: "Saikiran delivered our comprehensive Learning Management Platform well ahead of deadline. The role-based dashboards for educators, student course analytics, and zero-downtime deployment exceeded all expectations. True technical leadership.",
    project: "NavvYug LMS",
    rating: 5,
    date: "May 2026",
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Cloud Architect & Co-Founder",
    company: "Nexus Systems Core",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    message: "Saikiran possesses a razor-sharp understanding of distributed systems, Spring Boot microservices, and Redis event brokers. He turned complex architectural requirements into clean, scalable, maintainable services with 99.99% uptime.",
    project: "Enterprise Cloud Architecture",
    rating: 5,
    date: "Jan 2025",
  },
];
