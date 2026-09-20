import {
  backend,
  devOps,
  AI,
  web,
  javascript,
  reactjs,
  git,
  java,
  mysql,
  springboot,
  docker,
  kubernates,
  tailwind,
  typescript,
  thales,
  boc,
  project2,
} from "../assets";

// High-reliability local & CDN icons
const ICONS = {
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  gcp: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  postman: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  datadog: "https://cdn.worldvectorlogo.com/logos/datadog.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  bun: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
  playwright: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
  cucumber: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cucumber/cucumber-plain.svg",
  shopify: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/shopify.svg",
  claude: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/anthropic.svg",
  greensock: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/greensock.svg",
  keycloak: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg",
};

export const navLinks = [
  { id: "about", title: "Overview" },
  { id: "skills", title: "Skills" },
  { id: "work", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Cloud & Microservices (Thales)",
    tag: "SPECIAL GRADE BACKEND",
    icon: backend,
    description: "Java 17/21 · Spring Boot 3 · K8s · Redis · 10k+ Daily Txns (<200ms) · 99.9% Uptime SLA",
    color: "#ff3b00",
  },
  {
    title: "Shopify & E-Commerce Architect",
    tag: "STOREFRONT & LIQUID",
    icon: web,
    description: "Custom Liquid Themes · Storefront API · Webhook ERP Sync · 100/100 Core Web Vitals",
    color: "#10b981",
  },
  {
    title: "Modern Frontend & Motion",
    tag: "REACT 19 & NEXT.JS 15",
    icon: devOps,
    description: "React 19 · Next.js 15 · Vite · Bun · GSAP Animations · Tailwind CSS · 60fps Smooth UI",
    color: "#f59e0b",
  },
  {
    title: "AI Engineering & Automation",
    tag: "AUTONOMOUS AGENTS",
    icon: AI,
    description: "ChatGPT & Claude APIs · LiteLLM · Schema Migration CLI · Playwright BDD (~90% Coverage)",
    color: "#38bdf8",
  },
];

export const techGroups = [
  {
    label: "Core Backend & Cloud Architecture",
    tag: "SPECIAL GRADE",
    techs: [
      { name: "Java", icon: java },
      { name: "Spring Boot", icon: springboot },
      { name: "Python", icon: ICONS.python },
      { name: "Kubernetes", icon: ICONS.kubernetes },
      { name: "Docker", icon: docker },
      { name: "AWS", icon: ICONS.aws },
      { name: "GCP", icon: ICONS.gcp },
      { name: "Redis", icon: ICONS.redis },
      { name: "MySQL", icon: mysql },
      { name: "Git", icon: git },
    ],
  },
  {
    label: "E-Commerce, Shopify & Performance",
    tag: "CONVERSION & SEO",
    techs: [
      { name: "Shopify", icon: ICONS.shopify },
      { name: "Liquid", icon: ICONS.shopify },
      { name: "Storefront API", icon: ICONS.shopify },
      { name: "Tech SEO", icon: ICONS.gcp },
      { name: "Core Vitals", icon: ICONS.greensock },
    ],
  },
  {
    label: "Modern Frontend & Motion Engineering",
    tag: "60 FPS FLUID UX",
    techs: [
      { name: "React 19", icon: reactjs },
      { name: "Next.js 15", icon: ICONS.nextjs },
      { name: "GSAP", icon: ICONS.greensock },
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javascript },
      { name: "Vite", icon: ICONS.vite },
      { name: "Bun", icon: ICONS.bun },
      { name: "Tailwind", icon: tailwind },
      { name: "Angular", icon: ICONS.angular },
    ],
  },
  {
    label: "AI Engineering & Automated Testing",
    tag: "INTELLIGENT TOOLING",
    techs: [
      { name: "Claude 3.5", icon: ICONS.claude },
      { name: "ChatGPT API", icon: ICONS.playwright },
      { name: "LiteLLM", icon: ICONS.python },
      { name: "Playwright", icon: ICONS.playwright },
      { name: "Cucumber BDD", icon: ICONS.cucumber },
      { name: "Okta / SAML", icon: ICONS.keycloak },
      { name: "Datadog", icon: ICONS.datadog },
      { name: "Postman", icon: ICONS.postman },
    ],
  },
];

const technologies = [
  { name: "Java", icon: java },
  { name: "Spring Boot", icon: springboot },
  { name: "Shopify", icon: ICONS.shopify },
  { name: "React", icon: reactjs },
  { name: "Next.js", icon: ICONS.nextjs },
  { name: "GSAP", icon: ICONS.greensock },
  { name: "TypeScript", icon: typescript },
  { name: "Kubernetes", icon: ICONS.kubernetes },
  { name: "Docker", icon: docker },
  { name: "AWS", icon: ICONS.aws },
  { name: "GCP", icon: ICONS.gcp },
  { name: "Redis", icon: ICONS.redis },
  { name: "MySQL", icon: mysql },
  { name: "Python", icon: ICONS.python },
  { name: "Claude 3.5", icon: ICONS.claude },
  { name: "Playwright", icon: ICONS.playwright },
  { name: "Tailwind", icon: tailwind },
  { name: "Bun", icon: ICONS.bun },
  { name: "Vite", icon: ICONS.vite },
  { name: "Datadog", icon: ICONS.datadog },
];

const experiences = [
  {
    title: "Software Engineer II",
    company_name: "Thales India Pvt Ltd",
    icon: thales,
    iconBg: "#1a102f",
    date: "April 2023 — Present",
    location: "Noida, India",
    badge: "SPECIAL GRADE FULL-STACK",
    groups: [
      {
        label: "Platform & Backend Engineering",
        points: [
          "Architected Spring Boot microservices powering customer onboarding, entitlement management, and self-service licensing across enterprise B2B/B2C platforms.",
          "Optimized service orchestration with asynchronous queue processing and Redis caching, sustaining 10,000+ daily API transactions at sub-200ms latency.",
          "Engineered extensible licensing frameworks and REST/SOAP integration layers; standardized enterprise contracts with OpenAPI/Swagger.",
        ],
      },
      {
        label: "Security, Integrations & Enterprise Solutions",
        points: [
          "Accelerated enterprise client onboarding time by 25% via SAML 2.0 and Okta SSO implementation.",
          "Automated license provisioning across SAP, Salesforce, MuleSoft, and ERP systems, slashing manual toil by 35%.",
          "Delivered plugin-based integration layers allowing custom enterprise workflows without altering core microservice engines.",
        ],
      },
      {
        label: "Cloud, Reliability & DevOps",
        points: [
          "Containerized and orchestrated services on Kubernetes (GKE) and cloud pipelines, guaranteeing 99.9% uptime SLA.",
          "Engineered resilient event-driven architectures with automated retries, dead-letter queues (DLQs), and circuit breakers.",
          "Cut operational overhead by 40% using Kubernetes CronJobs for scheduled workflows; implemented Datadog telemetry dashboards.",
        ],
      },
      {
        label: "AI, Automation & Engineering Leadership",
        points: [
          "Built internal AI-powered developer utilities using LiteLLM, Python, and Flask to auto-generate tests and automate code reviews.",
          "Developed an LLM-assisted database schema migration assistant; raised test automation coverage to ~90% with Cucumber & Playwright.",
          "Mentored junior engineers and led technical architecture discussions across cross-functional squads in Agile cadences.",
        ],
      },
    ],
    get points() {
      return this.groups.flatMap(g => g.points);
    },
  },
  {
    title: "Freelance Full-Stack & Shopify Architect",
    company_name: "Independent Consultant",
    icon: web,
    iconBg: "#0e2a27",
    date: "2023 — Present",
    location: "Remote / Global",
    badge: "E-COMMERCE & STOREFRONT ARCHITECT",
    groups: [
      {
        label: "Shopify & Headless Store Engineering",
        points: [
          "Engineered bespoke Shopify themes with Liquid, custom modular sections, and dynamic cart-drawer optimizations for high conversion rates.",
          "Integrated Shopify Storefront API and custom webhook endpoints to synchronize product catalogs, multi-channel inventory, and orders across ERPs.",
          "Audited and rebuilt storefront architectures for 100/100 Core Web Vitals, sub-second LCP, and top Google Search ranking indexation.",
        ],
      },
      {
        label: "Creative Frontends & Motion (GSAP + Next.js)",
        points: [
          "Developed interactive web applications using React 19, Next.js 15, Vite, Bun, and GSAP scroll-triggered animations.",
          "Engineered responsive, accessible UI components with Tailwind CSS and Framer Motion with fluid 60fps micro-interactions.",
        ],
      },
    ],
    get points() {
      return this.groups.flatMap(g => g.points);
    },
  },
];

const projects = [
  {
    name: "AI Database Migration Assistant",
    tag: "AI & DATABASE AUTOMATION",
    description:
      "AI-driven database schema transformation & validation engine using LiteLLM, Python, and Flask. Converts legacy schemas into optimized DDL scripts with risk analysis and automated reports.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "LiteLLM", color: "green-text-gradient" },
      { name: "ChatGPT / Claude", color: "pink-text-gradient" },
      { name: "MySQL", color: "orange-text-gradient" },
    ],
    image: boc,
    source_code_link: "https://github.com/Saikiran8844",
  },
  {
    name: "Shopify E-Commerce & Inventory Hub",
    tag: "HEADLESS STOREFRONT & LIQUID",
    description:
      "Headless Shopify storefront & automated webhook synchronization engine. Integrates Shopify Storefront API with ERP inventory, featuring bespoke Liquid components and 100/100 Core Web Vitals.",
    tags: [
      { name: "Shopify", color: "green-text-gradient" },
      { name: "Liquid", color: "blue-text-gradient" },
      { name: "Next.js", color: "pink-text-gradient" },
      { name: "Tech SEO", color: "orange-text-gradient" },
    ],
    image: project2,
    source_code_link: "https://nannapaneni-saikiran.vercel.app/",
  },
  {
    name: "AI BDD & Playwright Test Engine",
    tag: "AUTOMATED TESTING & BDD",
    description:
      "Automated end-to-end testing pipeline translating Jira user stories into executable Gherkin scenarios with Cucumber and Playwright, boosting automated test coverage to ~90%.",
    tags: [
      { name: "Playwright", color: "green-text-gradient" },
      { name: "Cucumber", color: "blue-text-gradient" },
      { name: "Python", color: "pink-text-gradient" },
      { name: "CI/CD", color: "orange-text-gradient" },
    ],
    image: boc,
    source_code_link: "https://github.com/Saikiran8844",
  },
  {
    name: "BackOffice Connector Chatbot",
    tag: "ENTERPRISE JAVA MICROSERVICE",
    description:
      "High-throughput backend service for conversational user & subscription management — REST APIs secured with JWT, OpenAPI/Swagger docs, and MySQL persistence.",
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "Spring Boot", color: "green-text-gradient" },
      { name: "MySQL", color: "pink-text-gradient" },
      { name: "Swagger", color: "orange-text-gradient" },
    ],
    image: boc,
    source_code_link: "https://github.com/Saikiran8844/back-office-connector-chatbot",
  },
  {
    name: "OAuth Letter Editor",
    tag: "CLOUD DOCUMENT PLATFORM",
    description:
      "Secure document editor with OAuth 2.0 authentication, MySQL database storage, and Google Drive cloud integration for real-time document creation and synchronization.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "OAuth 2.0", color: "green-text-gradient" },
      { name: "Node.js", color: "pink-text-gradient" },
      { name: "Cloud Drive", color: "orange-text-gradient" },
    ],
    image: project2,
    source_code_link: "https://o-auth2-0-nine.vercel.app/",
  },
  {
    name: "MediAssist.ai",
    tag: "HEALTHCARE NLP & CLOUD",
    description:
      "Medical NLP document understanding pipeline using Hugging Face QA + NER to analyze clinical reports, cross-referencing medications via OpenFDA and generating plain-language summaries.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "FastAPI", color: "green-text-gradient" },
      { name: "Next.js", color: "pink-text-gradient" },
      { name: "Hugging Face", color: "orange-text-gradient" },
    ],
    image: boc,
    source_code_link: "https://github.com/Saikiran8844/MedAssist.ai",
  },
];

const testimonials = [];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
};
