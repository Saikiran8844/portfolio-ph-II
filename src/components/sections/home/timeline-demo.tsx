"use client";

import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import { FocusThreeMesh } from "./focus-three-mesh";
import {
  Server,
  Sparkles,
  Bot,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Cpu,
  Database,
  ShieldCheck,
  Building2,
  ShoppingBag,
  Scale,
  GraduationCap,
  ExternalLink,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

export function TimelineDemo() {
  // Live metric ticker for Distributed Systems (2023 - Present Company)
  const [rps, setRps] = useState(4820);
  const [latency, setLatency] = useState(12);

  // Terminal simulated steps for Justra LegalAssistant AI
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRps((prev) => prev + Math.floor(Math.random() * 41) - 20);
      setLatency((prev) => Math.max(8, Math.min(22, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 2000);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % 4);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  const aiLogs = [
    { text: "INCOMING QUERY: Synthesize distributed legal contract statute...", type: "query" },
    { text: "[LiteLLM Router] Selected: Google Gemini 1.5 Flash (Latency: 140ms)", type: "router" },
    { text: "[MCP Agent Tool] Executed: get_case_precedent(jurisdiction='US-CA')", type: "tool" },
    { text: "[Guardrail Pass] Strict schema validated. Confidence: 0.998", type: "success" },
  ];

  const data = [
    {
      title: "2023 – Present",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
              <Building2 className="h-4 w-4" />
              <span>Full-Time Role // 2023 – Present</span>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/30">
              CURRENT COMPANY
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Software Engineer — Distributed Systems &amp; Enterprise Cloud Architecture
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Designing and scaling high-throughput decoupled microservices with Java 17/21 and Spring Boot. Engineering distributed caching with Redis, asynchronous message queues with RabbitMQ, and zero-trust authentication (OAuth2 / SAML) for mission-critical enterprise workloads.
          </p>

          {/* Animated Microservices Visual Telemetry Card */}
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-foreground">
                  LIVE CLUSTER TELEMETRY
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-muted-foreground">
                  RPS: <span className="text-foreground font-semibold">{rps.toLocaleString()}</span>
                </span>
                <span className="text-muted-foreground">
                  p99: <span className="text-emerald-500 font-semibold">{latency}ms</span>
                </span>
              </div>
            </div>

            {/* Architecture Node Conduit Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl border border-border/50 bg-background/60 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                  <span>API Gateway</span>
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div className="text-sm font-bold text-foreground">Spring Cloud GW</div>
                <div className="text-[11px] font-mono text-emerald-500 mt-1">● 99.99% Up</div>
              </div>

              <div className="p-3.5 rounded-xl border border-border/50 bg-background/60 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                  <span>Event Bus</span>
                  <Database className="h-3.5 w-3.5 text-rose-500" />
                </div>
                <div className="text-sm font-bold text-foreground">RabbitMQ / Redis</div>
                <div className="text-[11px] font-mono text-emerald-500 mt-1">● 0 Dropped Msgs</div>
              </div>

              <div className="p-3.5 rounded-xl border border-border/50 bg-background/60 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                  <span>Security</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                </div>
                <div className="text-sm font-bold text-foreground">OAuth2.0 / RBAC</div>
                <div className="text-[11px] font-mono text-emerald-500 mt-1">● JWT Verified</div>
              </div>
            </div>

            {/* Key Architectural Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "High-Throughput Microservices (Spring Boot 3 & Java 21)",
                "Distributed Caching & Event Queues (Redis / RabbitMQ)",
                "Zero-Trust Authentication (OAuth2, OIDC, SAML 2.0)",
                "Enterprise SQL Topologies & CI/CD Pipeline Telemetry",
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/40 p-3 text-xs text-foreground font-mono"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Justra LegalAssistant",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-500 uppercase tracking-wider">
              <Scale className="h-4 w-4" />
              <span>Freelance AI Engineering // 2026 – Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                ACTIVE FREELANCE GIG
              </span>
              <a
                href="https://justra.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
              >
                <span>justra.vercel.app</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Justra LegalAssistant — Automated Legal Document &amp; Case Workflow Engine
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Enterprise legal technology platform streamlining automated doc generation, contract analysis, and caseload tracking with Supabase backend, DOCX templating engines, and Model Context Protocol (MCP) agent tools.
          </p>

          {/* Interactive Simulated AI Agent Terminal */}
          <div className="rounded-2xl border border-border/60 bg-[#0c0d0e] p-5 shadow-2xl font-mono text-xs overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/80" />
                  <div className="size-2.5 rounded-full bg-yellow-500/80" />
                  <div className="size-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] text-muted-foreground ml-2">
                  justra-mcp-agent // live stream
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                ACTIVE ENGINE
              </span>
            </div>

            <div className="space-y-2 py-1">
              {aiLogs.slice(0, stepIndex + 1).map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2 ${
                    log.type === "query"
                      ? "text-cyan-400"
                      : log.type === "router"
                      ? "text-purple-400"
                      : log.type === "tool"
                      ? "text-amber-400"
                      : "text-emerald-400 font-semibold"
                  }`}
                >
                  <span className="text-muted-foreground/60 select-none">❯</span>
                  <span>{log.text}</span>
                </motion.div>
              ))}
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-muted-foreground/60 select-none">❯</span>
                <span className="inline-block w-2 h-3.5 bg-primary animate-pulse" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/20 flex flex-wrap items-center justify-between text-[11px] text-muted-foreground">
              <span>Tool Engine: Model Context Protocol (MCP)</span>
              <span>Backend: Supabase + Postgres RLS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Automated DOCX Contract & Template Compilation",
              "Model Context Protocol (MCP) Agent Precedent Search",
              "Supabase Role-Based Access & Row-Level Security",
              "Sub-Second Case Telemetry & Schedule Tracking",
            ].map((point, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-card/60 p-3 text-xs text-foreground font-mono"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "CarrotKart.live",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-wider">
              <ShoppingBag className="h-4 w-4" />
              <span>Freelance Storefront Architecture // Dec 2025 – Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ACTIVE FREELANCE GIG
              </span>
              <a
                href="https://carrotkart.live"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
              >
                <span>carrotkart.live</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            CarrotKart.live — High-Conversion E-Commerce &amp; Liquid Storefront
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Engineered production online retail storefront for CarrotKart with custom Shopify Liquid themes, streamlined multi-currency checkout, dynamic inventory synchronization, and sub-second Core Web Vitals optimization.
          </p>

          {/* Storefront Performance Telemetry Card */}
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 relative overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="p-4 rounded-xl border border-border/50 bg-background/60">
                <div className="text-xs font-mono text-muted-foreground mb-1">First Contentful Paint</div>
                <div className="text-2xl font-bold text-emerald-500">0.78s</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">● 100/100 Lighthouse Perf</div>
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-background/60">
                <div className="text-xs font-mono text-muted-foreground mb-1">Conversion Lift</div>
                <div className="text-2xl font-bold text-amber-500">+34.2%</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">● Optimized Checkout Flow</div>
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-background/60">
                <div className="text-xs font-mono text-muted-foreground mb-1">Storefront Uptime</div>
                <div className="text-2xl font-bold text-blue-500">99.98%</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">● Edge Cached CDN</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Custom Shopify Liquid Theme Engineering",
                "Sub-Second Checkout & Cart Optimization",
                "Dynamic Catalog & Variant Inventory Filtering",
                "Mobile-First Touch Gestures & Micro-Interactions",
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/40 p-3 text-xs text-foreground font-mono"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Navyug Edu Tech",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Freelance Backend &amp; LMS // Jan 2026 – Mar 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                FREELANCE CLIENT GIG
              </span>
              <a
                href="https://navvyug-lms.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
              >
                <span>navvyug-lms.vercel.app</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Navyug Edu Tech — Scalable Learning Management System (LMS)
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Engineered the core backend and course workflows for Navyug Edu Tech. Built modular course management, automated assessment workflows, real-time submission tracking, and multi-tenant role-based access for institutions.
          </p>

          {/* EdTech Telemetry Card */}
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 relative overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="p-4 rounded-xl border border-border/50 bg-background/60">
                <div className="text-xs font-mono text-muted-foreground mb-1">Architecture</div>
                <div className="text-base font-bold text-foreground">Spring Boot 3</div>
                <div className="text-[10px] font-mono text-emerald-500 mt-1">● REST Microservices</div>
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-background/60">
                <div className="text-xs font-mono text-muted-foreground mb-1">Security &amp; Auth</div>
                <div className="text-base font-bold text-foreground">Role RBAC</div>
                <div className="text-[10px] font-mono text-emerald-500 mt-1">● Students / Educators / Admins</div>
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-background/60">
                <div className="text-xs font-mono text-muted-foreground mb-1">Database</div>
                <div className="text-base font-bold text-foreground">PostgreSQL</div>
                <div className="text-[10px] font-mono text-emerald-500 mt-1">● Dockerized Deployment</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Dynamic Syllabus & Course Content Management",
                "Automated Assessment Submissions & Grading Pipelines",
                "Real-time Student Progress Analytics & Gradebooks",
                "Docker Containerization & Zero-Downtime Releases",
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/40 p-3 text-xs text-foreground font-mono"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Creative Tech",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-pink-500 uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Interactive 3D WebGL &amp; GSAP Motion</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Kinetic Shaders &amp; High-Frame-Rate Experiences
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Fusing robust technical engineering with visual artistry. Engineering 60fps web experiences using Three.js WebGL shaders, GSAP 3 scroll timelines, and React 19 concurrent rendering while maintaining fluid performance and accessibility.
          </p>

          {/* Interactive Three.js 3D Torus Knot Mesh Canvas */}
          <FocusThreeMesh accentColor="#ec4899" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "React 19 & Next.js 15 Full-Stack Integration",
              "Three.js WebGL 3D Geometry & Particle Meshes",
              "GSAP 3 Scroll-Triggered Timelines & Micro-Motion",
              "Lenis Smooth Scrolling & Prefers-Reduced-Motion",
            ].map((point, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-card/60 p-3 text-xs text-foreground font-mono"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-pink-500 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="craft" className="w-full">
      <Timeline data={data} />
    </section>
  );
}
