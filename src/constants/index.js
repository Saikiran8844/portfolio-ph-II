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
  thales,
  boc,
  project2,
} from "../assets";

// CDN icon URLs for technologies not available as local assets
const CDN = {
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  gcp: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  keycloak: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg",
  postman: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  datadog: "https://cdn.worldvectorlogo.com/logos/datadog.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
};

export const navLinks = [
  { id: "about",   title: "About" },
  { id: "work",    title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Backend & Microservices",
    icon: backend,
    description: "Spring Boot · REST/SOAP · Redis · Event-Driven Arch",
  },
  {
    title: "Cloud & DevOps",
    icon: devOps,
    description: "AWS · GCP · Kubernetes · CI/CD · Docker",
  },
  {
    title: "Enterprise Integrations & SSO",
    icon: web,
    description: "SAP · Salesforce · MuleSoft · SAML 2.0 · Okta · Keycloak",
  },
  {
    title: "AI-Powered Automation",
    icon: AI,
    description: "LiteLLM · LLM Tooling · Playwright · Test Gen · MCP",
  },
];

// Grouped by domain for the new bento-style tech section
export const techGroups = [
  {
    label: "Backend",
    techs: [
      { name: "Java",        icon: java },
      { name: "Spring Boot", icon: springboot },
      { name: "Python",      icon: CDN.python },
      { name: "Node.js",     icon: reactjs },   // placeholder — keeping reactjs for now
      { name: "MySQL",       icon: mysql },
      { name: "Redis",       icon: CDN.redis },
    ],
  },
  {
    label: "Cloud & DevOps",
    techs: [
      { name: "AWS",        icon: CDN.aws },
      { name: "GCP",        icon: CDN.gcp },
      { name: "Docker",     icon: docker },
      { name: "Kubernetes", icon: CDN.kubernetes },
      { name: "Git",        icon: git },
    ],
  },
  {
    label: "Frontend & APIs",
    techs: [
      { name: "Angular",    icon: CDN.angular },
      { name: "React",      icon: reactjs },
      { name: "JavaScript", icon: javascript },
      { name: "Postman",    icon: CDN.postman },
    ],
  },
  {
    label: "Security & Monitoring",
    techs: [
      { name: "Okta / SAML",  icon: CDN.keycloak },
      { name: "Datadog",      icon: CDN.datadog },
    ],
  },
];

// Flat list kept for marquee ticker
const technologies = [
  { name: "Java",        icon: java },
  { name: "Spring Boot", icon: springboot },
  { name: "Python",      icon: CDN.python },
  { name: "MySQL",       icon: mysql },
  { name: "Redis",       icon: CDN.redis },
  { name: "AWS",         icon: CDN.aws },
  { name: "GCP",         icon: CDN.gcp },
  { name: "Docker",      icon: docker },
  { name: "Kubernetes",  icon: CDN.kubernetes },
  { name: "Git",         icon: git },
  { name: "Angular",     icon: CDN.angular },
  { name: "React",       icon: reactjs },
  { name: "JavaScript",  icon: javascript },
  { name: "Postman",     icon: CDN.postman },
  { name: "Okta/SAML",   icon: CDN.keycloak },
  { name: "Datadog",     icon: CDN.datadog },
];

const experiences = [
  {
    title: "Software Engineer II",
    company_name: "Thales India Pvt Ltd",
    icon: thales,
    iconBg: "#f4f4f4",
    date: "April 2023 — Present",
    location: "Noida, India",
    groups: [
      {
        label: "Platform & Backend Engineering",
        points: [
          "Designed Spring Boot microservices for customer onboarding, entitlement management, and self-service licensing across enterprise B2B/B2C platforms.",
          "Optimized service orchestration with async processing and Redis caching — 10,000+ daily API transactions at sub-200ms latency.",
          "Built extensible licensing frameworks and REST/SOAP integration layers bridging modern and legacy systems; standardized API contracts with Swagger/OpenAPI.",
        ],
      },
      {
        label: "Security, Integrations & Enterprise Solutions",
        points: [
          "Reduced onboarding time 25% via SAML 2.0 and Okta SSO implementation.",
          "Automated license provisioning across SAP, Salesforce, MuleSoft, and ERP systems — 35% efficiency gain.",
          "Delivered customizable enterprise integrations through REST APIs, SOAP, and plugin extensions without modifying core platform services.",
        ],
      },
      {
        label: "Cloud, Reliability & DevOps",
        points: [
          "Containerized microservices on Kubernetes/GKE with CI/CD pipelines — 99.9% availability.",
          "Engineered event-driven architecture with retries, DLQs, and circuit breakers.",
          "Reduced operational overhead 40% via Kubernetes CronJob automation; improved observability with Datadog dashboards and centralized audit logging.",
        ],
      },
      {
        label: "AI, Automation & Engineering Leadership",
        points: [
          "Built internal AI-powered engineering tools (LiteLLM, Python, Flask) for test generation and workflow automation.",
          "Built an LLM-powered database migration assistant; raised automated test coverage to ~90% with Cucumber/Playwright + LLM-assisted frameworks.",
          "Mentored junior engineers; collaborated cross-functionally with architects, QA, and DevOps in Agile sprints.",
        ],
      },
    ],
    // Flat list for any component that needs it
    get points() {
      return this.groups.flatMap(g => g.points);
    },
  },
];

const certifications = [
  {
    title: "Postman API Fundamentals",
    subtitle: "Student Expert",
    issuer: "Postman",
    icon: "🔬",
    color: "#FF6C37",
    link: "https://api.badgr.com/public/assertions/nHB-7oBFTCuaLWFkHdJXCw",
  },
  {
    title: "Google Cloud Machine Learning",
    subtitle: "Vertex AI",
    issuer: "Google Cloud",
    icon: "☁️",
    color: "#4285F4",
    link: "https://www.cloudskillsboost.google/public_profiles/4d1bef4c-dab9-4a18-88db-d89d68e8b22a",
  },
  {
    title: "Quarterly Recognition Award",
    subtitle: "Employee Excellence",
    issuer: "Thales India",
    icon: "🏆",
    color: "#915EFF",
    link: "#",
  },
];

const projects = [
  {
    name: "BackOffice Connector Chatbot",
    description:
      "Backend service for a personal assistant chatbot — REST APIs for user management, conversation handling, and subscription services, secured with JWT and documented via Swagger UI.",
    tags: [
      { name: "Java",        color: "blue-text-gradient" },
      { name: "Spring Boot", color: "green-text-gradient" },
      { name: "MySQL",       color: "pink-text-gradient" },
      { name: "Swagger UI",  color: "orange-text-gradient" },
    ],
    image: boc,
    source_code_link: "https://github.com/Saikiran8844/back-office-connector-chatbot",
  },
  {
    name: "OAuth Letter Editor",
    description:
      "Letter editor with OAuth 2.0 secure login, MySQL storage, and Google Drive integration — users can edit and save documents directly to their personal cloud storage.",
    tags: [
      { name: "React",      color: "blue-text-gradient" },
      { name: "OAuth 2.0",  color: "green-text-gradient" },
      { name: "Node.js",    color: "pink-text-gradient" },
      { name: "MySQL",      color: "orange-text-gradient" },
    ],
    image: project2,
    source_code_link: "https://o-auth2-0-nine.vercel.app/",
  },
  {
    name: "MediAssist.ai",
    description:
      "Document understanding pipeline using Hugging Face QA + NER to analyze medical reports, summarize findings in plain language, and cross-check medications via OpenFDA. FastAPI + Next.js with JWT auth and S3-compatible storage.",
    tags: [
      { name: "Python",       color: "blue-text-gradient" },
      { name: "FastAPI",      color: "green-text-gradient" },
      { name: "Next.js",      color: "pink-text-gradient" },
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
  certifications,
};
