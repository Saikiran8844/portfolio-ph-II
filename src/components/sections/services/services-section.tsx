"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  ShoppingBag,
  Bot,
  Share2,
  Briefcase,
  GitBranch,
  Server,
  Smartphone,
  Sparkles,
  Shield,
  Gauge,
  Cpu,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Filter,
  Layers,
  CheckCircle2,
} from "lucide-react";
import CollabModal from "@/components/sections/home/collab-modal";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  badge: string;
  color: string;
  motifType:
  | "planetary-orb"
  | "mobius-loop"
  | "synaptic-ai"
  | "cart-core"
  | "network-bridge"
  | "radar-shield"
  | "git-branch"
  | "cloud-cube"
  | "mobile-wireframe"
  | "cipher-matrix"
  | "speed-gauge"
  | "turbine";
}

// ── 12 Specialized Services Roster ─────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    id: "full-stack-web-dev",
    title: "Full-Stack Web Dev",
    subtitle: "Enterprise cloud backends coupled with high-speed modern frontends",
    code: "[FS.DEV.01]",
    badge: "REACT 19 // NEXT.JS",
    color: "#f59e0b", // Amber glow (matching reference)
    motifType: "planetary-orb",
  },
  {
    id: "shopify-builder",
    title: "Shopify & E-Commerce",
    subtitle: "Custom Liquid storefronts engineered for sub-second checkout conversion",
    code: "[SHPFY.CRO.02]",
    badge: "LIQUID // STOREFRONT",
    color: "#10b981", // Emerald
    motifType: "cart-core",
  },
  {
    id: "prompt-engineering-ai",
    title: "Prompt Engineering & AI",
    subtitle: "Agentic LLM workflows, Model Context Protocol (MCP), and prompt tuning",
    code: "[AI.PROMPT.03]",
    badge: "GEMINI // CLAUDE // GPT",
    color: "#8b5cf6", // Violet
    motifType: "synaptic-ai",
  },
  {
    id: "influencer-marketing-bridge",
    title: "Influencer Marketing & Brand Bridge",
    subtitle: "Strategic catalyst connecting ambitious tech brands with creator communities",
    code: "[INFL.BRDG.04]",
    badge: "SOCIAL // AUDIENCE REACH",
    color: "#f43f5e", // Rose
    motifType: "network-bridge",
  },
  {
    id: "technical-consulting-freelance",
    title: "Technical Consulting & Sprints",
    subtitle: "Turnkey software delivery, architectural roadmaps, and code health audits",
    code: "[CONS.SPRINT.05]",
    badge: "CONSULTING // FREELANCE",
    color: "#06b6d4", // Cyan
    motifType: "radar-shield",
  },
  {
    id: "open-source-developer",
    title: "Open Source Tooling",
    subtitle: "Reusable developer CLI utilities, libraries, and public GitHub packages",
    code: "[OSS.TOOL.06]",
    badge: "OPEN SOURCE // GITHUB",
    color: "#eab308", // Golden Yellow
    motifType: "git-branch",
  },
  {
    id: "microservices-cloud-backend",
    title: "Microservices & Cloud Backend",
    subtitle: "High-throughput Java 21 & Spring Boot services with RabbitMQ event queues",
    code: "[MSVC.CLD.07]",
    badge: "SPRING BOOT // DOCKER",
    color: "#6366f1", // Indigo
    motifType: "cloud-cube",
  },
  {
    id: "mobile-app-engineering",
    title: "Mobile App Development",
    subtitle: "Cross-platform Flutter & React Native interfaces with native telemetry",
    code: "[MOBL.DEV.08]",
    badge: "FLUTTER // CROSS-PLATFORM",
    color: "#14b8a6", // Teal
    motifType: "mobile-wireframe",
  },
  {
    id: "creative-webgl-3d-motion",
    title: "Creative WebGL & 3D Motion",
    subtitle: "High-frame-rate Three.js, WebGL shader pipelines, and kinetic GSAP rigs",
    code: "[GL.3DMOT.09]",
    badge: "THREE.JS // WEBGL",
    color: "#f97316", // Bright Orange (like reference mobius)
    motifType: "mobius-loop",
  },
  {
    id: "database-security-architecture",
    title: "Database Security & RLS",
    subtitle: "Postgres Row-Level Security, Supabase schemas, and Redis caching topologies",
    code: "[SEC.DB.10]",
    badge: "POSTGRES // RLS MATRIX",
    color: "#ef4444", // Red
    motifType: "cipher-matrix",
  },
  {
    id: "performance-core-web-vitals",
    title: "Core Web Vitals & Speed",
    subtitle: "Sub-second FCP optimization, edge caching, and perfect 100/100 Lighthouse audits",
    code: "[PERF.VITL.11]",
    badge: "SUB-SECOND FCP // SEO",
    color: "#22c55e", // Bright Green
    motifType: "speed-gauge",
  },
  {
    id: "developer-automation-tooling",
    title: "Developer Automation & CI/CD",
    subtitle: "Autonomous testing suites, Playwright headless runs, and webhook automation",
    code: "[AUTO.BOT.12]",
    badge: "PLAYWRIGHT // CI/CD",
    color: "#a855f7", // Purple
    motifType: "turbine",
  },
];

// ── Minimal High-End Cyber Visual Motifs inside Cards ──────────────────────────
const ServiceMotif = ({
  type,
  color,
  isActive,
}: {
  type: ServiceItem["motifType"];
  color: string;
  isActive: boolean;
}) => {
  if (type === "planetary-orb") {
    // Glowing planetary orb with atmospheric color bands
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden my-auto">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 35%, #fff 0%, ${color} 40%, #000 90%)`,
            boxShadow: isActive
              ? `0 0 20px ${color}99, inset 0 0 12px ${color}`
              : `0 0 8px ${color}44`,
          }}
        />
        <motion.div
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-70 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 20%, rgba(255,255,255,0.8) 35%, rgba(0,0,0,0.6) 50%, rgba(255,200,100,0.8) 70%, transparent 85%)`,
          }}
        />
      </div>
    );
  }

  if (type === "mobius-loop") {
    // Glowing mobius loop / infinity ribbon
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{
              borderColor: color,
              boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            }}
          />
          <div
            className="w-8 h-8 rounded-full border border-border animate-pulse"
            style={{ borderColor: color }}
          />
          <Sparkles
            className="absolute size-4 text-foreground dark:text-white"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </motion.div>
      </div>
    );
  }

  if (type === "synaptic-ai") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative"
          style={{
            background: `radial-gradient(circle, ${color}44 0%, transparent 70%)`,
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-dashed"
            style={{ borderColor: color }}
          />
          <Bot className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "cart-core") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative border border-border/60 bg-muted/70 dark:bg-black/40 backdrop-blur-md"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShoppingBag className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "network-bridge") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed"
            style={{ borderColor: color }}
          />
          <Share2 className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "cloud-cube") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative bg-muted/70 dark:bg-black/50 border border-border/60"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <Server className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "cipher-matrix") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative border border-border/60 bg-muted/70 dark:bg-black/40"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <Shield className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "speed-gauge") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative border border-border/60 bg-muted/70 dark:bg-black/40"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <Gauge className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "mobile-wireframe") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-10 h-13 rounded-lg flex items-center justify-center relative border-2 bg-muted/70 dark:bg-black/40"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <Smartphone className="size-5 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "git-branch") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative bg-muted/70 dark:bg-black/40 border border-border/60"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <GitBranch className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  if (type === "radar-shield") {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative bg-muted/70 dark:bg-black/40 border border-border/60"
          style={{
            boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
            borderColor: color,
          }}
        >
          <Briefcase className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </div>
      </div>
    );
  }

  // Turbine default
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-auto">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative border border-dashed"
        style={{
          boxShadow: isActive ? `0 0 16px ${color}88` : `none`,
          borderColor: color,
        }}
      >
        <Cpu className="size-5 sm:size-6 text-foreground dark:text-white" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </motion.div>
    </div>
  );
};

// ── Main Architectural Services Section ─────────────────────────────────────────
export const ServicesSection: React.FC = () => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100%
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  const total = SERVICES.length;
  const angleStep = 360 / total; // 30 deg for 12 cards

  // Dynamic wide elliptical dimensions
  const [ellipseSize, setEllipseSize] = useState({ rx: 480, rz: 210 });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setEllipseSize({ rx: 260, rz: 130 });
        } else if (window.innerWidth < 1024) {
          setEllipseSize({ rx: 380, rz: 170 });
        } else {
          setEllipseSize({ rx: 480, rz: 210 });
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize selected index whenever angle changes
  useEffect(() => {
    // Normalizing angle to find active card facing forward (0 deg)
    const normalized = ((-currentAngle % 360) + 360) % 360;
    const closestIdx = Math.round(normalized / angleStep) % total;
    setSelectedIdx(closestIdx);
  }, [currentAngle, angleStep, total]);

  // Select card by index (rotates card to front center)
  const selectCard = (index: number) => {
    setHoldProgress(0);
    const targetAngle = -index * angleStep;
    // Find shortest rotational path
    let diff = (targetAngle - currentAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setCurrentAngle((prev) => prev + diff);
  };

  const nextCard = () => {
    setHoldProgress(0);
    const nextIdx = (selectedIdx + 1) % total;
    selectCard(nextIdx);
  };

  const prevCard = () => {
    setHoldProgress(0);
    const prevIdx = (selectedIdx - 1 + total) % total;
    selectCard(prevIdx);
  };

  // Auto-scroll on hover: 5-second hold per card
  useEffect(() => {
    if (!isHovered) {
      setHoldProgress(0);
      return;
    }

    const intervalTime = 50; // ms
    const totalHoldTime = 5000; // 5000ms = 5 sec hold
    const step = (intervalTime / totalHoldTime) * 100;

    const timer = setInterval(() => {
      // Pause countdown if user is actively dragging
      if (isDraggingRef.current) return;

      setHoldProgress((prev) => {
        if (prev + step >= 100) {
          // Auto-advance to next card
          setCurrentAngle((curr) => curr - angleStep);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovered, angleStep, total]);

  // Drag & Scroll Touch Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = currentAngle;
    setHoldProgress(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    setCurrentAngle(startAngleRef.current + delta * 0.25);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Snap to closest card
    const normalized = ((-currentAngle % 360) + 360) % 360;
    const closestIdx = Math.round(normalized / angleStep) % total;
    selectCard(closestIdx);
  };

  // Wheel scroll interaction
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal trackpad swipe
      setCurrentAngle((prev) => prev - e.deltaX * 0.2);
    }
  };

  const activeService = SERVICES[selectedIdx] || SERVICES[0];

  return (
    <section
      id="services"
      className="relative w-full py-14 sm:py-20 px-4 sm:px-8 lg:px-16 bg-background text-foreground overflow-hidden select-none transition-colors duration-300 scroll-mt-24"
    >
      {/* ── Keyframe Animations for Wave Shape on Hovered Card ── */}
      <style>{`
        @keyframes waveShapeMorph {
          0%, 100% {
            border-radius: 40px 18px 45px 20px / 22px 45px 20px 42px;
            transform: translateY(-10px) scale(1.07);
          }
          33% {
            border-radius: 20px 45px 22px 42px / 42px 20px 45px 22px;
            transform: translateY(-14px) scale(1.09) rotateZ(1deg);
          }
          66% {
            border-radius: 45px 22px 40px 24px / 24px 42px 22px 45px;
            transform: translateY(-8px) scale(1.08) rotateZ(-1deg);
          }
        }
      `}</style>

      {/* ── Background Cyber Stage & Overhead Ambient Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]"
        style={{
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none rounded-full blur-[140px] opacity-25 dark:opacity-30 transition-colors duration-700"
        style={{ background: activeService.color }}
      />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4 relative z-20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-2 font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Architecture &amp; Core Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Services <span className="text-muted-foreground font-light">&amp; Solutions.</span>
          </h2>
        </div>

        <p className="max-w-sm text-xs font-mono text-muted-foreground leading-relaxed">
          Wide 3D Elliptical Carousel: Hover any card to see it transform into an undulating wave shape. Auto-scrolls with a 5-second hold.
        </p>
      </div>

      {/* ── 3D WIDE ELLIPTICAL CAROUSEL STAGE ── */}
      <div
        className="relative w-full h-[380px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing my-2 sm:my-4 overflow-hidden"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setHoldProgress(0);
          setHoveredCardIdx(null);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Subtle Auto-scroll 5s Hold Indicator Badge on Stage */}
        {isHovered && (
          <div className="hidden absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-card/90 dark:bg-black/80 border border-border dark:border-white/20 backdrop-blur-md text-[10px] font-mono text-foreground/80 dark:text-white/80 pointer-events-none transition-all duration-300 shadow-md">
            <span
              className="inline-block size-1.5 rounded-full animate-ping"
              style={{ backgroundColor: activeService.color }}
            />
            <span className="hidden font-semibold text-foreground/90 dark:text-white/90">Auto-scrolling: 5s hold</span>
            <span className="hidden font-bold px-1.5 py-0.5 rounded bg-muted dark:bg-white/10" style={{ color: activeService.color }}>
              {(5 - (holdProgress / 100) * 5).toFixed(1)}s
            </span>
          </div>
        )}

        {/* 3D Wide Elliptical Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {SERVICES.map((service, idx) => {
            // Calculate rotational position on the WIDE ELLIPSE
            const angle = idx * angleStep + currentAngle;
            const rad = (angle * Math.PI) / 180;
            const x = ellipseSize.rx * Math.sin(rad);
            const z = ellipseSize.rz * Math.cos(rad);

            // Angle facing outward perpendicular to the ellipse
            const cardAngleY = -Math.atan2(
              ellipseSize.rx * Math.sin(rad),
              ellipseSize.rz * Math.cos(rad)
            ) * (180 / Math.PI);

            const normalized = ((angle % 360) + 360) % 360;
            const diff = normalized > 180 ? normalized - 360 : normalized;
            const absDiff = Math.abs(diff);
            const isFront = absDiff < 16;

            const zRatio = (z + ellipseSize.rz) / (2 * ellipseSize.rz); // 0 (back) to 1 (front)
            const scale = 0.74 + 0.31 * zRatio;
            const opacity = Math.max(0.2, 0.3 + 0.7 * zRatio);

            const isWaveShape = hoveredCardIdx === idx;

            return (
              <div
                key={service.id}
                onClick={(e) => {
                  e.stopPropagation();
                  selectCard(idx);
                }}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                className="absolute w-36 sm:w-44 h-56 sm:h-64 cursor-pointer select-none"
                style={{
                  transform: `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${cardAngleY.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
                  transformStyle: "preserve-3d",
                  zIndex: Math.round(500 + z),
                  opacity: opacity,
                  transition: isDraggingRef.current
                    ? "none"
                    : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease",
                }}
              >
                {/* ── Card Body (Transforms to Wave Shape ONLY When Hovered) ── */}
                <div
                  className={`w-full h-full p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-card/95 dark:bg-zinc-950/90 text-card-foreground backdrop-blur-xl shadow-lg ${
                    isWaveShape ? "" : "rounded-2xl sm:rounded-3xl"
                  }`}
                  style={{
                    border: isWaveShape || isFront
                      ? `2px solid ${service.color}`
                      : `1.5px solid ${service.color}66`,
                    boxShadow: isWaveShape
                      ? `0 0 35px ${service.color}bb, inset 0 0 16px ${service.color}33, 0 12px 28px rgba(0,0,0,0.14)`
                      : isFront
                        ? `0 0 24px ${service.color}66, inset 0 0 10px ${service.color}22, 0 8px 22px rgba(0,0,0,0.1)`
                        : `0 0 10px ${service.color}20, 0 4px 14px rgba(0,0,0,0.06)`,
                    // ONLY the hovered card becomes the wave shape!
                    animation: isWaveShape ? "waveShapeMorph 3s ease-in-out infinite" : "none",
                    transformOrigin: "center bottom",
                  }}
                >
                  {/* Liquid Wave Ripple overlay on hovered card */}
                  {isWaveShape && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(ellipse at center, ${service.color}, transparent 70%)`,
                        }}
                      />
                      <svg
                        viewBox="0 0 200 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -bottom-2 inset-x-0 w-full h-24 opacity-35"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M 0 50 Q 50 25, 100 50 T 200 50 L 200 100 L 0 100 Z"
                          fill={service.color}
                          animate={{
                            d: [
                              "M 0 50 Q 50 25, 100 50 T 200 50 L 200 100 L 0 100 Z",
                              "M 0 40 Q 50 65, 100 40 T 200 40 L 200 100 L 0 100 Z",
                              "M 0 50 Q 50 25, 100 50 T 200 50 L 200 100 L 0 100 Z",
                            ],
                          }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>
                  )}

                  {/* 5-second Hold Progress Bar (when hovered & is front active card) */}
                  {isFront && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-muted dark:bg-white/10 overflow-hidden z-20">
                      <div
                        className="h-full"
                        style={{
                          width: isHovered ? `${holdProgress}%` : "0%",
                          backgroundColor: service.color,
                          boxShadow: `0 0 10px ${service.color}`,
                          transition: isHovered ? "width 50ms linear" : "none",
                        }}
                      />
                    </div>
                  )}

                  {/* Neon Glowing Perimeter Rim Light in that card's unique color */}
                  <div
                    className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 ${
                      isWaveShape || isFront ? "opacity-45 animate-pulse" : "opacity-15 group-hover:opacity-35"
                    }`}
                    style={{
                      boxShadow: `inset 0 0 16px ${service.color}`,
                    }}
                  />

                  {/* Minimal Card Header */}
                  <div className="relative z-10 flex items-center justify-between text-[9px] font-mono">
                    <span className="text-foreground/70 dark:text-white/60 font-bold tracking-wider">
                      {service.code}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold tracking-widest"
                      style={{
                        backgroundColor: `${service.color}20`,
                        color: service.color,
                        border: `1px solid ${service.color}66`,
                      }}
                    >
                      {isFront ? (isHovered ? `${(5 - (holdProgress / 100) * 5).toFixed(1)}s` : "ACTIVE") : "0" + (idx + 1)}
                    </span>
                  </div>

                  {/* Center High-End Geometric Cyber Motif */}
                  <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-auto">
                    <ServiceMotif
                      type={service.motifType}
                      color={service.color}
                      isActive={isFront}
                    />
                  </div>

                  {/* Minimal Card Footer */}
                  <div className="relative z-10 pt-2 border-t border-border/60 dark:border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                    <span className="text-foreground dark:text-white/90 font-bold truncate max-w-[105px] sm:max-w-[125px]">
                      {service.title}
                    </span>
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 shrink-0"
                      style={{ color: service.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Floor Transition Beneath the Carousel ── */}
        <div
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10 bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-[2px]"
        />
      </div>

      {/* ── Bottom Editorial Display & Controls ── */}
      <div className="max-w-7xl mx-auto pt-5 border-t border-border flex flex-col md:flex-row md:items-end justify-between gap-5 relative z-20">
        {/* Left: Prominent Editorial Title & Snappy One-Liner */}
        <div className="max-w-xl">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl sm:text-4xl font-light select-none"
              style={{ color: activeService.color }}
            >
              ↳
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif tracking-tight text-foreground font-bold">
              {activeService.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mt-2 pl-7 font-light">
            {activeService.subtitle}
          </p>
        </div>

        {/* Center/Right: Interactive Scrubber Ruler & Inquire CTA */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Arrow Step Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevCard}
              className="p-2.5 rounded-full border border-border bg-card/80 hover:bg-card text-foreground shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
              title="Previous Service"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={nextCard}
              className="p-2.5 rounded-full border border-border bg-card/80 hover:bg-card text-foreground shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
              title="Next Service"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Interactive Index Scrubber Ruler */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 border border-border text-xs font-mono text-muted-foreground shadow-sm">
            <span className="font-bold text-foreground">
              {String(selectedIdx + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-[3px] px-1">
              {SERVICES.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => selectCard(i)}
                  className={`cursor-pointer transition-all ${
                    i === selectedIdx
                      ? "w-2 h-4 rounded-full shadow-[0_0_10px_currentColor]"
                      : "w-[2px] h-2.5 bg-muted-foreground/30 hover:bg-foreground/60"
                  }`}
                  style={{
                    backgroundColor: i === selectedIdx ? s.color : undefined,
                    color: s.color,
                  }}
                />
              ))}
            </div>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          {/* Inquire Action Button (Opens Collab Modal) */}
          <button
            onClick={() => setIsCollabOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold text-black transition-all cursor-pointer shadow-lg active:scale-95"
            style={{
              backgroundColor: activeService.color,
              boxShadow: `0 0 25px ${activeService.color}66`,
            }}
          >
            <span>Inquire Service</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Collaboration Modal */}
      <CollabModal
        isOpen={isCollabOpen}
        onClose={() => setIsCollabOpen(false)}
      />
    </section>
  );
};

export default ServicesSection;
