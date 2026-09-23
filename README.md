# Saikiran Nannapaneni — Portfolio

Personal portfolio website built with Next.js 16, React 19, Three.js, GSAP, and Tailwind CSS. It showcases my work across full-stack engineering, developer tooling, AI applications, and interactive web experiences.

**Live Site:** [nannapaneni-saikiran.vercel.app](https://nannapaneni-saikiran.vercel.app/)

---

## Featured Projects

Here are a few of the projects highlighted in the portfolio:

| Project | Description | Links |
|---|---|---|
| **Vercel Extension** | VS Code extension to view deployments, stream logs, and manage Vercel projects directly inside your editor. | [Marketplace](https://marketplace.visualstudio.com/items?itemName=saikiran-n.vercel) · [GitHub](https://github.com/Saikiran8844/vercel-extension) |
| **CarrotKart** | High-conversion e-commerce platform built with custom Shopify Liquid themes and sub-second load times. | [carrotkart.live](https://carrotkart.live) |
| **LegalAssistant AI** | Legal assistant platform with automated PDF/DOCX contract generation, document chat, and Supabase auth/RLS. | [justra.vercel.app](https://justra.vercel.app) |
| **AI Interview Assistant** | Mock technical interview tool featuring real-time speech synthesis, audio streaming, and rubric evaluations. | [ai-interview.vercel.app](https://ai-interview-assistant-stage.vercel.app) |
| **NavvYug LMS** | Learning management system designed for educators and students with course tracking and assessments. | [navvyug.vercel.app](https://navvyug.vercel.app) |

---

## What's Inside

- **3D & Canvas Graphics**: Interactive WebGL mesh background and an animated 3D rotating globe with fracture split interactions.
- **Micro-Animations & Smooth Scroll**: GSAP-driven card interactions, perspective tilt, and Lenis smooth scrolling.
- **Direct Scheduling & Contact**: Fullscreen interactive booking and collaboration forms powered by EmailJS.
- **Light & Dark Theme**: Full theme support with carefully matched palettes and contrast for both modes.
- **Live Local Time**: Displays real-time IST time ticker in the footer.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Animations**: GSAP 3, Framer Motion
- **3D / WebGL**: Three.js, OGL
- **Smooth Scrolling**: Lenis
- **Form Handling & Email**: React Hook Form, Zod, EmailJS
- **Icons**: Lucide React, Tabler Icons, React Icons

---

## Getting Started

To run the project locally on your machine:

```bash
# 1. Clone the repo
git clone https://github.com/Saikiran8844/portfolio-ph-II.git
cd portfolio-ph-II

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory if you want to test the email dispatch forms:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_SITE_URL=https://nannapaneni-saikiran.vercel.app
```

---

## Build & Scripts

```bash
# Typecheck
npx tsc --noEmit

# Build production bundle
npm run build

# Start production build
npm start
```

---

## 📬 Get in Touch

- **Portfolio**: [nannapaneni-saikiran.vercel.app](https://nannapaneni-saikiran.vercel.app)
- **LinkedIn**: [linkedin.com/in/nannapaneni-saikiran](https://linkedin.com/in/nannapaneni-saikiran)
- **GitHub**: [github.com/Saikiran8844](https://github.com/Saikiran8844)
- **Email**: [sai8844n@gmail.com](mailto:sai8844n@gmail.com)
