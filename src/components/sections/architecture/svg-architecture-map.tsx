"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotionPreference } from "@/providers/motion-provider";
import { Activity, ShieldCheck, Cpu, Database, Cloud, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NodeData {
  id: string;
  name: string;
  tag: string;
  role: string;
  details: string;
  icon: React.ElementType;
  tech: string[];
}

const ARCHITECTURE_NODES: Record<string, NodeData> = {
  gateway: {
    id: "gateway",
    name: "Edge API Gateway",
    tag: "Network Ingress",
    role: "Traffic Router & Proxy",
    details: "Acts as single entry point for clients, managing rate limiting, SSL termination, and routing requests to appropriate downstream services.",
    icon: Cloud,
    tech: ["Spring Cloud Gateway", "REST APIs", "Reverse Proxy"],
  },
  auth: {
    id: "auth",
    name: "Identity & Access Layer",
    tag: "Security",
    role: "Token Verification & RBAC",
    details: "Validates OAuth2/OIDC and SAML credentials, manages cryptographic token lifecycles, and enforces role-based access permissions.",
    icon: ShieldCheck,
    tech: ["OAuth2 / OIDC", "SAML 2.0", "JWT", "Spring Security"],
  },
  core: {
    id: "core",
    name: "Microservices Platform",
    tag: "Backend Core",
    role: "Domain Logic & Orchestration",
    details: "Decoupled microservice units handling core business workflows, transaction validation, and asynchronous event publishing.",
    icon: Cpu,
    tech: ["Java 17", "Spring Boot", "Clean Architecture", "RESTful APIs"],
  },
  cache: {
    id: "cache",
    name: "Distributed Redis Broker",
    tag: "Caching & Queues",
    role: "In-Memory Event Bus",
    details: "Provides ultra-fast data caching, pub/sub event distribution, and queue-based task management between distributed services.",
    icon: Zap,
    tech: ["Redis Cluster", "Pub/Sub", "Distributed Locks"],
  },
  cluster: {
    id: "cluster",
    name: "Container Mesh",
    tag: "Infrastructure",
    role: "Automated Orchestration",
    details: "Containerized deployment topology utilizing Docker and Kubernetes with automated scaling, self-healing pods, and zero-downtime rollouts.",
    icon: Activity,
    tech: ["Docker", "Kubernetes", "Automated CI/CD"],
  },
  integrations: {
    id: "integrations",
    name: "Persistent Storage & Connectors",
    tag: "Data Layer",
    role: "Relational & Integration Connectors",
    details: "Modular persistence layer utilizing transactional SQL databases and standardized external integration adapters.",
    icon: Database,
    tech: ["MySQL", "JPA/Hibernate", "Plugin Interfaces"],
  },
};

export const SvgArchitectureMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string>("core");
  const { isReducedMotion } = useMotionPreference();

  useGSAP(
    () => {
      if (isReducedMotion || typeof window === "undefined" || !containerRef.current) return;

      // Animate SVG circuit lines with GSAP stroke-dashoffset
      const paths = containerRef.current.querySelectorAll(".animated-circuit-path");
      if (paths && paths.length > 0) {
        gsap.to(paths, {
          strokeDashoffset: -120,
          duration: 3.5,
          repeat: -1,
          ease: "none",
        });
      }

      // Animate packet pulses along coordinates
      const packets = containerRef.current.querySelectorAll(".data-packet-pulse");
      if (packets && packets.length > 0) {
        gsap.to(packets, {
          scale: 1.3,
          opacity: 0.9,
          stagger: 0.35,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });
      }

      // ScrollTrigger reveal
      gsap.from(containerRef.current.querySelectorAll(".arch-node-group"), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  const activeData = ARCHITECTURE_NODES[selectedNode] || ARCHITECTURE_NODES.core;
  const ActiveIcon = activeData.icon;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono text-primary mb-3">
          <Activity className="h-3.5 w-3.5" />
          <span>ARCHITECTURE // SVG &amp; SCROLL STREAM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Distributed Systems <span className="text-muted-foreground font-light">Topology</span>
        </h2>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed font-light">
          An interactive model of how I architect scalable, resilient microservices with event-driven pipelines, token verification, and automated orchestration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive Topology Canvas (Cols 1-8) */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative rounded-3xl border border-border/60 bg-card/50 backdrop-blur-xl p-4 sm:p-8 shadow-xl overflow-hidden group"
        >
          <div className="relative w-full aspect-[16/10] min-h-[340px] flex items-center justify-center">
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full drop-shadow-[0_0_25px_rgba(59,130,246,0.1)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>

                <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {/* Connecting Circuit Lines */}
              <path
                d="M 80 250 L 190 250"
                stroke="url(#grad-blue)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animated-circuit-path opacity-80"
              />
              <path
                d="M 230 210 L 230 140 L 370 140"
                stroke="url(#grad-blue)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animated-circuit-path opacity-70"
                fill="none"
              />
              <path
                d="M 270 250 L 370 250"
                stroke="url(#grad-blue)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animated-circuit-path opacity-90"
              />
              <path
                d="M 450 250 L 550 250"
                stroke="url(#grad-emerald)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animated-circuit-path opacity-90"
              />
              <path
                d="M 410 290 L 410 370 L 550 370"
                stroke="url(#grad-blue)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animated-circuit-path opacity-70"
                fill="none"
              />
              <path
                d="M 630 250 L 710 250"
                stroke="url(#grad-emerald)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animated-circuit-path opacity-80"
              />

              {/* Node: Client Ingress */}
              <g className="cursor-pointer">
                <circle cx="60" cy="250" r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="60" y="254" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="monospace">Clients</text>
              </g>

              {/* Node: API Gateway */}
              <g
                className="arch-node-group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedNode("gateway")}
              >
                <circle
                  cx="230"
                  cy="250"
                  r="36"
                  fill={selectedNode === "gateway" ? "#1e3a8a" : "#0f172a"}
                  stroke={selectedNode === "gateway" ? "#60a5fa" : "#3b82f6"}
                  strokeWidth={selectedNode === "gateway" ? "2.5" : "1.5"}
                  filter="url(#neon-glow)"
                />
                <text x="230" y="246" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">API Gateway</text>
                <text x="230" y="262" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="monospace">Proxy Layer</text>
              </g>

              {/* Node: Identity Layer */}
              <g
                className="arch-node-group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedNode("auth")}
              >
                <rect
                  x="360"
                  y="105"
                  width="110"
                  height="70"
                  rx="12"
                  fill={selectedNode === "auth" ? "#4c1d95" : "#0f172a"}
                  stroke={selectedNode === "auth" ? "#c084fc" : "#8b5cf6"}
                  strokeWidth={selectedNode === "auth" ? "2.5" : "1.5"}
                  filter="url(#neon-glow)"
                />
                <text x="415" y="136" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Identity &amp; Auth</text>
                <text x="415" y="154" textAnchor="middle" fill="#c084fc" fontSize="9" fontFamily="monospace">OAuth2 / SAML</text>
              </g>

              {/* Node: Microservices Core */}
              <g
                className="arch-node-group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedNode("core")}
              >
                <circle
                  cx="410"
                  cy="250"
                  r="40"
                  fill={selectedNode === "core" ? "#064e3b" : "#0f172a"}
                  stroke={selectedNode === "core" ? "#34d399" : "#10b981"}
                  strokeWidth={selectedNode === "core" ? "3" : "1.8"}
                  filter="url(#neon-glow)"
                />
                <text x="410" y="246" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Microservices</text>
                <text x="410" y="262" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace">Domain Core</text>
              </g>

              {/* Node: Redis Broker */}
              <g
                className="arch-node-group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedNode("cache")}
              >
                <rect
                  x="540"
                  y="215"
                  width="100"
                  height="70"
                  rx="12"
                  fill={selectedNode === "cache" ? "#7f1d1d" : "#0f172a"}
                  stroke={selectedNode === "cache" ? "#f87171" : "#ef4444"}
                  strokeWidth={selectedNode === "cache" ? "2.5" : "1.5"}
                  filter="url(#neon-glow)"
                />
                <text x="590" y="246" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Redis Broker</text>
                <text x="590" y="264" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">Cache &amp; Queue</text>
              </g>

              {/* Node: Container Mesh */}
              <g
                className="arch-node-group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedNode("cluster")}
              >
                <rect
                  x="540"
                  y="335"
                  width="110"
                  height="70"
                  rx="12"
                  fill={selectedNode === "cluster" ? "#0c4a6e" : "#0f172a"}
                  stroke={selectedNode === "cluster" ? "#38bdf8" : "#0284c7"}
                  strokeWidth={selectedNode === "cluster" ? "2.5" : "1.5"}
                  filter="url(#neon-glow)"
                />
                <text x="595" y="366" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Container Mesh</text>
                <text x="595" y="384" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace">K8s &amp; Docker</text>
              </g>

              {/* Node: Data & Connectors */}
              <g
                className="arch-node-group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedNode("integrations")}
              >
                <circle
                  cx="730"
                  cy="250"
                  r="32"
                  fill={selectedNode === "integrations" ? "#581c87" : "#0f172a"}
                  stroke={selectedNode === "integrations" ? "#d8b4fe" : "#a855f7"}
                  strokeWidth={selectedNode === "integrations" ? "2.5" : "1.5"}
                  filter="url(#neon-glow)"
                />
                <text x="730" y="246" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Storage</text>
                <text x="730" y="260" textAnchor="middle" fill="#d8b4fe" fontSize="8" fontFamily="monospace">SQL &amp; Adapters</text>
              </g>

              {/* Data Packet Pulses */}
              <circle cx="130" cy="250" r="3.5" fill="#60a5fa" className="data-packet-pulse" />
              <circle cx="320" cy="250" r="4" fill="#34d399" className="data-packet-pulse" />
              <circle cx="500" cy="250" r="4" fill="#f87171" className="data-packet-pulse" />
              <circle cx="670" cy="250" r="3.5" fill="#c084fc" className="data-packet-pulse" />
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border/40">
            <span>SVG Circuit Stream active</span>
            <span>Click any node to view architecture details</span>
          </div>
        </div>

        {/* Node Details Inspector (Cols 9-12) */}
        <div className="lg:col-span-4 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl p-8 shadow-xl flex flex-col justify-between h-full min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                <ActiveIcon className="h-4 w-4" />
                {activeData.tag}
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">ACTIVE COMPONENT</span>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-1">{activeData.name}</h3>
            <div className="text-xs font-mono text-muted-foreground mb-4">{activeData.role}</div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
              {activeData.details}
            </p>

            <div>
              <div className="text-xs font-mono text-foreground font-medium mb-2.5 uppercase tracking-wider">
                Core Stack:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeData.tech.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 border border-border/50 px-2.5 py-1 text-xs font-mono text-foreground/90"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/40 text-xs font-mono text-muted-foreground">
            Architecture Pattern: Decoupled Event-Driven Systems
          </div>
        </div>
      </div>
    </section>
  );
};
