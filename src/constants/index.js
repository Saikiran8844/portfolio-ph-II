import {
  backend,
  devOps,
  AI,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  kubernates,
  mongodb,
  git,
  java,
  mysql,
  springboot,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  tcs,
  thales,
  intelligence,
  kodnest,
  sun,
  payment,
  boc,
  intelligence2,
  rental,
  project2
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Cloud & DevOps Solutions",
    icon: devOps,
  },
  {
    title: "Edge Computing & IOT",
    icon: AI,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Kubernates",
    icon: kubernates,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Spring Boot",
    icon: springboot,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Engineer II",
    company_name: "Thales India",
    icon: thales,
    iconBg: "#f4f4f4ff",
    date: "April 2023 -  Present",
    points: [
      "Designed, developed, and maintained web applications with React.js, Next.js, and Tailwind CSS, ensuring responsive design and seamless user experience.",
      "Built and optimized scalable backend services using Express.js, integrating with MySQL and MongoDB to guarantee data security, consistency, and high performance.",
      "Collaborated closely with cross-functional teams including designers, product managers, and engineers to deliver business-critical features.",
      "Conducted code reviews, provided mentorship, and shared best practices to maintain coding standards and improve team efficiency.",
      "Ensured application performance, reliability, and maintainability by following secure coding principles and performing rigorous testing.",
      "Contributed to the full software development lifecycle (SDLC) including design, development, testing, deployment, and support.",
      "Actively engaged in agile practices (Scrum, sprint planning, retrospectives) to deliver incremental value and meet tight deadlines."
    ],
  },
  {
    title: "Full Stack Java Development Trainee",
    company_name: "KodNest",
    icon: kodnest,
    iconBg: "#ffffffff",
    date: "Dec 2022 - May 2023",
    points: [
      "Completed an intensive 4-month training program in Full Stack Development with Java and Python.",
      "Gained hands-on experience in backend development with Spring Boot, REST APIs, and database integration.",
      "Built front-end applications using ReactJS and Angular with a focus on responsive design.",
      "Practiced Agile methodologies, coding standards, and version control using Git & GitHub.",
      "Developed mini-projects integrating frontend, backend, and databases to strengthen real-world problem-solving skills."
    ],
  },
];

const testimonials = [
 
];

const projects = [
  {
    name: "BackOffice Connector Chatbot",
    description:
      // "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      "This is the backend service for a Personal Assistant/Chatbot application. It provides REST APIs for user management, conversation handling, and subscription services.",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "MySQL",
        color: "pink-text-gradient",
      },
      {
        name: "Sprinboot",
        color: "green-text-gradient",
      },
      {
        name: "Swagger UI",
        color: "pink-text-gradient",
      },
    ],
    image: boc,
    source_code_link: "https://github.com/Saikiran8844/back-office-connector-chatbot",
  },
  {
    name: "Letter Editor - Using OAuth ",
    description:
      "Buit a letter editor that utilizes OAuth for secure login, MySQL for user and document data storage, and Google Drive integration to allow users to edit and save documents directly to their personal cloud storage.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind css",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "orange-text-gradient",
      },
      {
        name: "node js",
        color: "pink-text-gradient",
      },
      {
        name: "OAuth 2.0",
        color: "green-text-gradient",
      },
      {
        name: "jwt",
        color: "blue-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://o-auth2-0-nine.vercel.app/",
  },
  {
    name: "MediAssist.ai",
    description: "Built a production-ready document understanding pipeline using Hugging Face Document QA + NER + Text Generation to analyze PDFs/images of medical reports, summarize findings in lay language, and cross-check medications via OpenFDA. Deployed FastAPI (Python) and Next.js on free-tier cloud with S3-compatible storage, caching, and basic observability. Delivered privacy-aware design (JWT, signed URLs, redaction) and a clean, card-based UX.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind css",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "orange-text-gradient",
      },
      {
        name: "python fast api",
        color: "pink-text-gradient",
      },
      {
        name: "vite",
        color: "green-text-gradient",
      },
      {
        name: "jwt",
        color: "blue-text-gradient",
      },
       ],
    image: project2,
    source_code_link: "https://github.com/Saikiran8844/MedAssist.ai",
  }
];

export { services, technologies, experiences, testimonials, projects };
