"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { PERSONAL_DATA, PersonalWork } from "@/data/resume-data";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Check,
  X,
  Layers,
  Globe,
  Radio,
  ShoppingBag,
  FileCode,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Filter,
  ShieldCheck,
  Activity,
  Cpu,
  Bot,
  Zap,
  Server,
  Code2,
  Shuffle,
  RotateCcw,
  LayoutGrid,
  Layers2,
  Play,
  Terminal,
} from "lucide-react";

// ── Motion Graphics SVG Perimeter Border Beam ─────────────────────────────────
const BorderBeam = ({
  color = "#8b5cf6",
  duration = 4,
}: {
  color?: string;
  duration?: number;
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-20">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="23"
          stroke="url(#beam-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            strokeDasharray: "140 650",
            animation: `borderBeamAnim ${duration}s linear infinite`,
          }}
        />
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        @keyframes borderBeamAnim {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -790;
          }
        }
      `}</style>
    </div>
  );
};

// ── Motion Graphic Hero Stage for each project ────────────────────────────────
const MotionGraphicHero = ({ work }: { work: PersonalWork }) => {
  const id = work.id;

  // 0. Vercel Extension — VS Code Control Center & Observability Hub
  if (id === "vercel-extension" || id.toLowerCase().includes("vercel")) {
    return (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-blue-950/40 via-black/60 to-black/90 border border-blue-500/25 overflow-hidden flex items-center justify-between p-4 my-4 shadow-inner">
        {/* Animated Cyber Grid Floor */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 112, 243, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 112, 243, 0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Laser Sweep Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 0.2 }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#0070f3] pointer-events-none opacity-80"
        />

        {/* Left: VS Code Telemetry & Deployment Stream */}
        <div className="relative z-10 flex flex-col justify-center space-y-1.5">
          <div className="p-2.5 rounded-xl bg-black/70 border border-blue-500/30 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Terminal className="size-3.5 text-sky-400" />
              <span className="text-[10px] font-mono font-bold text-sky-300 tracking-wider">
                VS CODE CONSOLE
              </span>
            </div>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">DEPLOY:</span>
                <span className="text-emerald-400 font-bold">READY (480ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">ENV SYNC:</span>
                <span className="text-sky-300">.env.local 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">RUNTIME:</span>
                <span className="text-amber-400">EDGE LOGS STREAM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: 3D Glowing Vercel Triangle */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer Rotating Radar Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-sky-400/50"
            />
            {/* Inner Counter-Rotating Hexagon */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1.5 rounded-full border border-blue-500/30"
            />
            <motion.div
              animate={{ scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 rounded-2xl bg-blue-500/20 border border-sky-400 text-white shadow-[0_0_24px_rgba(0,112,243,0.5)] backdrop-blur-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 3L22 21H2L12 3Z" />
              </svg>
            </motion.div>
          </div>
          <span className="text-[10px] font-mono text-sky-300 font-semibold mt-1.5">
            Vercel Control
          </span>
        </div>

        {/* Right: Telemetry */}
        <div className="relative z-10 flex flex-col space-y-2 text-right">
          <div className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[10px] font-mono text-sky-400">
            VS CODE API
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-border/50 text-[10px] font-mono text-muted-foreground">
            TypeScript + esbuild
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-[10px] font-mono flex items-center justify-end gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>MARKETPLACE LIVE</span>
          </div>
        </div>
      </div>
    );
  }

  // 1. CarrotKart.live — E-Commerce Motion Graphics
  if (id === "carrotkart-live") {
    return (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-emerald-950/30 via-black/50 to-black/80 border border-emerald-500/20 overflow-hidden flex items-center justify-between p-4 my-4 shadow-inner">
        {/* Animated Cyber Grid Floor */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Laser Sweep Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] pointer-events-none opacity-70"
        />

        {/* Left: Barcode Scanner with moving laser */}
        <div className="relative z-10 flex flex-col justify-center space-y-2">
          <div className="relative p-2.5 rounded-xl bg-black/70 border border-emerald-500/30 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 mb-1.5">
              <ShoppingBag className="size-3.5 text-emerald-400" />
              <span className="text-[10px] font-mono font-bold text-emerald-300 tracking-wider">
                STOREFRONT ENGINE
              </span>
            </div>
            {/* Animated Barcode */}
            <div className="relative flex items-center gap-[2.5px] h-8 px-1">
              {[4, 2, 6, 1, 5, 2, 4, 3, 6, 2, 5, 1, 4, 3, 6, 2, 3, 5].map((w, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                  style={{ width: `${w * 1.5}px` }}
                  className="h-full bg-emerald-400/80 rounded-[1px]"
                />
              ))}
              {/* Red laser scanner bouncing across barcode */}
              <motion.div
                animate={{ x: [0, 80, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ef4444]"
              />
            </div>
            <div className="text-[9px] font-mono text-emerald-400/70 mt-1">
              SKU: CARROT-PROD-2026
            </div>
          </div>
        </div>

        {/* Center: Isometric 3D Floating Shopping Cube */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div
            animate={{
              rotateY: [0, 360],
              rotateX: [15, 25, 15],
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/60 shadow-[0_0_24px_rgba(16,185,129,0.35)] flex items-center justify-center relative backdrop-blur-md"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Zap className="size-6 text-emerald-400" />
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>
          <div className="text-[10px] font-mono text-emerald-300 font-semibold mt-2">
            320ms Checkout
          </div>
        </div>

        {/* Right: Live Telemetry HUD */}
        <div className="relative z-10 flex flex-col space-y-2 text-right">
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 justify-end">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ORDER STREAM</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-border/50 text-[10px] font-mono text-muted-foreground">
            Shopify Liquid API
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-[10px] font-mono">
            +28% CONV. RATE
          </div>
        </div>
      </div>
    );
  }

  // 2. LegalAssistant AI — Document Intelligence & Supabase RLS
  if (id === "legalassistant-ai") {
    return (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-blue-950/30 via-black/50 to-black/80 border border-blue-500/20 overflow-hidden flex items-center justify-between p-4 my-4 shadow-inner">
        {/* Animated Cyber Grid Floor */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Laser Sweep Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#3b82f6] pointer-events-none opacity-70"
        />

        {/* Left: Dynamic Cryptographic Hash Matrix */}
        <div className="relative z-10 space-y-1.5 font-mono text-[10px] text-blue-300/80">
          <div className="flex items-center gap-1.5 text-blue-400 font-bold">
            <ShieldCheck className="size-3.5" />
            <span>POSTGRES RLS</span>
          </div>
          <div className="p-2 rounded-lg bg-black/70 border border-blue-500/20 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">HASH:</span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-blue-400 font-bold"
              >
                0x7F2A...9C
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">DOCX:</span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">AUTH:</span>
              <span className="text-blue-300">SUPABASE JWT</span>
            </div>
          </div>
        </div>

        {/* Center: Rotating Holographic Legal Shield */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer Rotating Gear / Radar Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-blue-400/50"
            />
            {/* Inner Counter-Rotating Hexagon */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1.5 rounded-full border border-blue-500/30"
            />
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 rounded-2xl bg-blue-500/20 border border-blue-400 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-md"
            >
              <FileCode className="size-6 text-blue-400" />
            </motion.div>
          </div>
          <span className="text-[10px] font-mono text-blue-300 font-semibold mt-1.5">
            Docx Automated
          </span>
        </div>

        {/* Right: Contract Pipeline Progress */}
        <div className="relative z-10 flex flex-col space-y-2 text-right">
          <div className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[10px] font-mono text-blue-400">
            JUS-TRA ENGINE
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-border/50 text-[10px] font-mono text-muted-foreground">
            React 19 + Vite
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 text-[10px] font-mono flex items-center justify-end gap-1.5">
            <span className="size-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>CASELOAD ACTIVE</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. AI Interview Assistant — Speech & Real-Time Critique Visualizer
  if (id === "ai-interview-assistant") {
    return (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-purple-950/30 via-black/50 to-black/80 border border-purple-500/20 overflow-hidden flex items-center justify-between p-4 my-4 shadow-inner">
        {/* Animated Cyber Grid Floor */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Laser Sweep Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_#a855f7] pointer-events-none opacity-70"
        />

        {/* Left: Live Multi-Band Equalizer */}
        <div className="relative z-10 flex flex-col justify-center space-y-2">
          <div className="p-2.5 rounded-xl bg-black/70 border border-purple-500/30 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-2">
              <Radio className="size-3.5 text-purple-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-purple-300 tracking-wider">
                SPEECH WAVEFORM
              </span>
            </div>
            {/* 14 Frequency Equalizer Columns */}
            <div className="flex items-end gap-1 h-10 px-1">
              {[25, 60, 90, 45, 80, 100, 50, 75, 95, 40, 85, 60, 30, 70].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`],
                  }}
                  transition={{
                    duration: 0.7 + (i % 4) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }}
                  className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 via-violet-400 to-cyan-300 shadow-[0_0_6px_rgba(168,85,247,0.5)]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center: 3D Rotating AI Neural Sphere */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Concentric Rotating Orbital Ellipses */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-purple-400/60"
              style={{ transform: "rotateX(60deg)" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan-400/50"
              style={{ transform: "rotateY(60deg)" }}
            />
            <motion.div
              animate={{ scale: [0.95, 1.15, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 rounded-2xl bg-purple-500/25 border border-purple-400 text-purple-200 shadow-[0_0_24px_rgba(168,85,247,0.5)] backdrop-blur-md"
            >
              <Bot className="size-6 text-purple-300" />
            </motion.div>
          </div>
          <span className="text-[10px] font-mono text-purple-300 font-semibold mt-1.5">
            Gemini AI Rubric
          </span>
        </div>

        {/* Right: Feedback Metric Ticker */}
        <div className="relative z-10 flex flex-col space-y-2 text-right">
          <div className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300">
            94.8% AI CRITIQUE
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-border/50 text-[10px] font-mono text-muted-foreground">
            Next.js + Vercel
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 text-[10px] font-mono flex items-center justify-end gap-1.5">
            <span className="size-1.5 rounded-full bg-purple-400 animate-ping" />
            <span>LIVE STAGE</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. NavvYug LMS — Educational Platform Node Graph
  if (id === "NavvYug LMS" || id.toLowerCase().includes("navvyug")) {
    return (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-amber-950/30 via-black/50 to-black/80 border border-amber-500/20 overflow-hidden flex items-center justify-between p-4 my-4 shadow-inner">
        {/* Animated Cyber Grid Floor */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(245, 158, 11, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.15) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Laser Sweep Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b] pointer-events-none opacity-70"
        />

        {/* Left: Constellation Node Network */}
        <div className="relative z-10 flex flex-col justify-center space-y-1.5">
          <div className="p-2.5 rounded-xl bg-black/70 border border-amber-500/30 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Activity className="size-3.5 text-amber-400" />
              <span className="text-[10px] font-mono font-bold text-amber-300 tracking-wider">
                LEARNER GRAPH
              </span>
            </div>
            {/* SVG Interactive Constellation */}
            <svg className="w-28 h-12" viewBox="0 0 112 48">
              {/* Lines */}
              <line x1="12" y1="24" x2="48" y2="10" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="48" y1="10" x2="84" y2="24" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="48" y1="10" x2="48" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="12" y1="24" x2="48" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="48" y1="40" x2="84" y2="24" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="84" y1="24" x2="104" y2="12" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />

              {/* Pulsing Nodes */}
              <circle cx="12" cy="24" r="3.5" fill="#f59e0b" />
              <circle cx="48" cy="10" r="4.5" fill="#fbbf24" />
              <circle cx="48" cy="40" r="3.5" fill="#f59e0b" />
              <circle cx="84" cy="24" r="4.5" fill="#fbbf24" />
              <circle cx="104" cy="12" r="3" fill="#f59e0b" />

              {/* Animated Traveling Packet */}
              <motion.circle
                r="2.5"
                fill="#ffffff"
                animate={{
                  cx: [12, 48, 84, 104],
                  cy: [24, 10, 24, 12],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
        </div>

        {/* Center: Rotating 3D Academy Glyph */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-amber-400/50"
            />
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] backdrop-blur-md"
            >
              <GraduationCap className="size-6 text-amber-400" />
            </motion.div>
          </div>
          <span className="text-[10px] font-mono text-amber-300 font-semibold mt-1.5">
            LMS Platform
          </span>
        </div>

        {/* Right: Student Telemetry */}
        <div className="relative z-10 flex flex-col space-y-2 text-right">
          <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-400">
            SPRING BOOT 3
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-border/50 text-[10px] font-mono text-muted-foreground">
            PostgreSQL + Docker
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[10px] font-mono flex items-center justify-end gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>99.9% UPTIME</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Back-Office Connector Chatbot — Enterprise Integration Hub
  return (
    <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-rose-950/30 via-black/50 to-black/80 border border-rose-500/20 overflow-hidden flex items-center justify-between p-4 my-4 shadow-inner">
      {/* Animated Cyber Grid Floor */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(244, 63, 94, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 63, 94, 0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Laser Sweep Scanline */}
      <motion.div
        animate={{ y: ["-100%", "300%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_12px_#f43f5e] pointer-events-none opacity-70"
      />

      {/* Left: Asynchronous Event Bus Pipeline */}
      <div className="relative z-10 flex flex-col justify-center space-y-1.5">
        <div className="p-2.5 rounded-xl bg-black/70 border border-rose-500/30 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Cpu className="size-3.5 text-rose-400" />
            <span className="text-[10px] font-mono font-bold text-rose-300 tracking-wider">
              MESSAGE BROKER
            </span>
          </div>
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">TOPIC:</span>
              <span className="text-rose-400">/events/ai_chat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">QUEUE:</span>
              <span className="text-emerald-400">RABBITMQ 0 LAG</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">THROUGHPUT:</span>
              <span className="text-rose-300">2.4k req/sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: 3D Rotating Microservice Core */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-rose-400/50"
          />
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-2xl bg-rose-500/20 border border-rose-400 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.4)] backdrop-blur-md"
          >
            <Server className="size-6 text-rose-400" />
          </motion.div>
        </div>
        <span className="text-[10px] font-mono text-rose-300 font-semibold mt-1.5">
          Middleware Hub
        </span>
      </div>

      {/* Right: Telemetry */}
      <div className="relative z-10 flex flex-col space-y-2 text-right">
        <div className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono text-rose-400">
          MICROSERVICES
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-border/50 text-[10px] font-mono text-muted-foreground">
          REST &amp; SOAP Bridge
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-[10px] font-mono flex items-center justify-end gap-1.5">
          <span className="size-1.5 rounded-full bg-rose-400 animate-ping" />
          <span>ASYNC ROUTED</span>
        </div>
      </div>
    </div>
  );
};

// ── 3D Interactive Motion Graphics Card Component (Clean & Simplified) ─────────
const MotionGraphicsCard = ({
  work,
  idx,
  onClick,
}: {
  work: PersonalWork;
  idx: number;
  onClick: () => void;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  const accentColor = work.accentColor || "#8b5cf6";

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition:
          "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="group relative rounded-3xl border border-border/70 bg-card/85 backdrop-blur-2xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 w-full"
    >
      {/* 1. Motion Graphics Perimeter Glowing Border Beam */}
      <BorderBeam color={accentColor} duration={3.5 + idx * 0.4} />

      {/* 2. Dynamic Specular Glare Reflection on Hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.09) 0%, transparent 60%)`,
        }}
      />

      {/* 3. Ambient Colorful Aura */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`}
      />

      {/* 4. Motion Graphic Cyber Reticle Markers in Corners */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-muted-foreground/40 font-bold select-none pointer-events-none">
        ⌜ [SYS.0{idx + 1}]
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground/40 font-bold select-none pointer-events-none">
        ⌝
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground/40 font-bold select-none pointer-events-none">
        ⌞
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-muted-foreground/40 font-bold select-none pointer-events-none">
        ⌟
      </div>

      {/* 5. Main Card Content (Clean & High-Impact) */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {/* Top Status & Category Bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase font-semibold">
              0{idx + 1} // {work.category}
            </span>
            {work.liveUrl && work.liveUrl !== "#" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold shadow-sm">
                <Radio className="size-2 animate-pulse" />
                LIVE PRODUCTION
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/25 px-2 py-0.5 text-[10px] font-mono text-primary font-semibold">
                <Code2 className="size-2.5" />
                ENTERPRISE
              </span>
            )}
          </div>
          <div className="h-8 w-8 rounded-full border border-border/80 bg-background/80 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 group-hover:scale-110 transition-all shadow-sm">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl sm:text-3xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
          {work.title}
        </h3>
        <div className="text-xs font-mono text-muted-foreground/90 mt-1 mb-2">
          {work.subtitle}
        </div>

        {/* Dedicated Motion Graphics Hero Stage */}
        <MotionGraphicHero work={work} />
      </div>

      {/* 6. Card Footer: Tech Stack & Pop-up Inspection CTA */}
      <div
        className="relative z-10 mt-4 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3"
        style={{ transform: "translateZ(18px)" }}
      >
        <div className="flex flex-wrap gap-1.5">
          {work.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted/60 px-2.5 py-1 text-[11px] font-mono text-foreground/80 border border-border/40"
            >
              {tech}
            </span>
          ))}
          {work.techStack.length > 4 && (
            <span className="rounded-full bg-muted/40 px-2 py-1 text-[11px] font-mono text-muted-foreground">
              +{work.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {work.liveUrl && work.liveUrl !== "#" && (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{work.id === "vercel-extension" ? "Marketplace" : "Launch"}</span>
            </a>
          )}
          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary font-medium flex items-center gap-1 transition-colors">
            Inspect Specs <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ── Interactive Card Deck Dealer Stage ─────────────────────────────────────────
const CardDeckDealer = ({
  works,
  onSelectWork,
}: {
  works: PersonalWork[];
  onSelectWork: (work: PersonalWork) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [throwDir, setThrowDir] = useState<"forward" | "reverse">("forward");
  const [isShuffling, setIsShuffling] = useState(false);

  // Synchronize with scroll progress through container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (works.length === 0) return;
    const target = Math.min(
      works.length - 1,
      Math.max(0, Math.floor(progress * works.length))
    );
    if (target !== activeIdx) {
      setThrowDir(target > activeIdx ? "forward" : "reverse");
      setActiveIdx(target);
    }
  });

  // Handle activeIdx bounding when filters change
  useEffect(() => {
    if (activeIdx >= works.length) {
      setActiveIdx(Math.max(0, works.length - 1));
    }
  }, [works.length, activeIdx]);

  // Kinetic Riffle Shuffle Animation & Auto-Shuffle
  const handleShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      // Pick random or cycle next
      setActiveIdx((prev) => (prev + 1) % works.length);
      setIsShuffling(false);
    }, 700);
  };

  // Full Auto-Shuffle & Reset Deck to Card 0
  const handleAutoShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setThrowDir("reverse");
    setTimeout(() => {
      setActiveIdx(0);
      setIsShuffling(false);
    }, 700);
  };

  // Auto-shuffle when deck is empty (all cards dealt to table)
  useEffect(() => {
    if (works.length <= 1) return;

    if (activeIdx >= works.length - 1 && !isShuffling) {
      const timer = setTimeout(() => {
        handleAutoShuffle();
      }, 1600); // 1.6s display delay before auto-shuffling pack back to start

      return () => clearTimeout(timer);
    }
  }, [activeIdx, works.length, isShuffling]);

  const dealNext = () => {
    if (activeIdx < works.length - 1) {
      setThrowDir("forward");
      setActiveIdx((prev) => prev + 1);
    } else {
      handleAutoShuffle();
    }
  };

  const recallPrevious = () => {
    if (activeIdx > 0) {
      setThrowDir("reverse");
      setActiveIdx((prev) => prev - 1);
    }
  };

  if (works.length === 0) return null;

  const activeWork = works[activeIdx] || works[0];
  const remainingInDeck = works.length - 1 - activeIdx;

  return (
    <div ref={containerRef} className="relative w-full min-h-[220vh]">
      {/* Sticky Table Presentation Arena */}
      <div className="sticky top-20 sm:top-24 w-full">
        {/* Cyber HUD Control Bar */}
        <div className=" hidden flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono text-primary font-bold">
              <Layers2 className="h-3.5 w-3.5" />
              <span>
                DECK: 0{activeIdx + 1} / 0{works.length}
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline-block">
              {remainingInDeck > 0
                ? `${remainingInDeck} cards remaining in pack`
                : "Deck empty — Auto-shuffling pack..."}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-muted/40 hover:bg-primary/20 hover:text-primary hover:border-primary/40 text-xs font-mono text-foreground font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Shuffle card deck"
            >
              <Shuffle
                className={`h-3.5 w-3.5 ${isShuffling ? "animate-spin" : ""}`}
              />
              <span>Shuffle Pack</span>
            </button>

            <button
              onClick={recallPrevious}
              disabled={activeIdx === 0}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-mono font-medium transition-all ${activeIdx === 0
                ? "border-border/40 text-muted-foreground/40 opacity-50 cursor-not-allowed"
                : "border-border/80 bg-muted/40 hover:bg-muted text-foreground cursor-pointer active:scale-95"
                }`}
              title="Recall card back into deck"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Recall</span>
            </button>

            {remainingInDeck > 0 ? (
              <button
                onClick={dealNext}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 cursor-pointer active:scale-95"
                title="Deal next card onto table"
              >
                <span>Deal Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleAutoShuffle}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 cursor-pointer active:scale-95 animate-pulse"
                title="Auto-shuffle and reset deck"
              >
                <Shuffle className="h-3.5 w-3.5 animate-spin" />
                <span>Auto-Shuffle</span>
              </button>
            )}
          </div>
        </div>

        {/* The Card Dealer Arena */}
        <div className="relative w-full rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/60 to-background/90 p-5 sm:p-8 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Table Background Radial Aura */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-25"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${activeWork.accentColor || "#8b5cf6"} 0%, transparent 65%)`,
            }}
          />

          {/* Table Top Cyber Felt Grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* ── Left Column: The Deck Shoe / Stack of Cards ── */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <div className="text-center mb-4">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                  ⌜ Dealer&apos;s Pack ⌝
                </span>
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  Scroll down or click deck to throw next card
                </p>
              </div>

              {/* The Physical Deck Stack */}
              <div
                onClick={dealNext}
                className="relative w-56 sm:w-64 h-72 sm:h-80 flex items-center justify-center cursor-pointer group select-none"
              >
                {/* Layered Cards in Deck */}
                {[0, 1, 2, 3, 4].map((offset) => {
                  const cardOffsetIdx = activeIdx + 1 + offset;
                  const exists = cardOffsetIdx < works.length;
                  if (!exists && offset > 0) return null;

                  const rot = [-4, 3, -2, 5, -1][offset % 5];
                  const yOff = offset * -7;
                  const xOff = offset * 3;

                  return (
                    <motion.div
                      key={offset}
                      animate={
                        isShuffling
                          ? {
                            x: offset % 2 === 0 ? [-35, 0] : [35, 0],
                            rotate: offset % 2 === 0 ? [-8, rot] : [8, rot],
                          }
                          : {
                            x: xOff,
                            y: yOff,
                            rotate: rot,
                          }
                      }
                      transition={
                        isShuffling
                          ? { duration: 0.6, ease: "easeInOut" }
                          : { duration: 0.3 }
                      }
                      className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/95 to-primary/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between p-5 overflow-hidden group-hover:border-primary/60 transition-colors"
                      style={{
                        zIndex: 10 - offset,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Holographic Card Back Matrix Pattern */}
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: "12px 12px",
                        }}
                      />

                      <div className="flex items-center justify-between text-[10px] font-mono text-primary/70 font-bold">
                        <span>#0{cardOffsetIdx + 1}</span>
                        <span>[READY]</span>
                      </div>

                      <div className="flex flex-col items-center justify-center space-y-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-12 h-12 rounded-full border border-dashed border-primary/50 flex items-center justify-center text-primary"
                        >
                          <Layers className="size-5" />
                        </motion.div>
                        <span className="text-[11px] font-mono font-bold text-foreground tracking-wide">
                          {exists
                            ? works[cardOffsetIdx]?.title.slice(0, 16)
                            : "END OF DECK"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground">
                        <span>SAIKIRAN // PORTFOLIO</span>
                        <span className="text-primary font-bold">THROW ➔</span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Auto-Shuffling Empty Deck State */}
                {remainingInDeck <= 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-card/95 via-primary/10 to-card/95 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex flex-col items-center justify-center p-6 text-center backdrop-blur-md z-20 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutoShuffle();
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="p-3 rounded-full bg-primary/20 text-primary border border-primary/40 mb-2.5 shadow-lg"
                    >
                      <Shuffle className="h-6 w-6 text-primary" />
                    </motion.div>
                    <span className="text-xs font-mono font-bold text-foreground tracking-wider uppercase">
                      Deck Empty
                    </span>
                    <span className="text-[11px] font-mono text-primary font-semibold mt-1 animate-pulse">
                      Auto-Shuffling Pack...
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground mt-2">
                      Click to shuffle instantly ➔
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Right Column: The Table & Active Thrown Card ── */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center">
              <div className="w-full relative min-h-[460px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWork.id}
                    initial={{
                      opacity: 0,
                      x: throwDir === "forward" ? -180 : 180,
                      y: throwDir === "forward" ? -40 : 40,
                      rotateZ: throwDir === "forward" ? -12 : 12,
                      scale: 0.9,
                      filter: "blur(4px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotateZ: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      x: throwDir === "forward" ? 180 : -180,
                      y: throwDir === "forward" ? 40 : -40,
                      rotateZ: throwDir === "forward" ? 12 : -12,
                      scale: 0.9,
                      filter: "blur(4px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                      mass: 0.85,
                    }}
                    className="w-full"
                  >
                    <MotionGraphicsCard
                      work={activeWork}
                      idx={activeIdx}
                      onClick={() => onSelectWork(activeWork)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Table Dealt Tray: Quick Navigation Chips */}
              <div className="w-full mt-6 flex flex-wrap items-center justify-center gap-2">
                {works.map((w, i) => {
                  const isCurrent = i === activeIdx;
                  const isDealt = i <= activeIdx;

                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        setThrowDir(i > activeIdx ? "forward" : "reverse");
                        setActiveIdx(i);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${isCurrent
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25 scale-105"
                        : isDealt
                          ? "border border-border/80 bg-card/80 text-foreground hover:border-primary/50"
                          : "border border-border/40 bg-muted/20 text-muted-foreground/60 hover:text-muted-foreground"
                        }`}
                    >
                      <span className="text-[10px] opacity-70">0{i + 1}</span>
                      <span>{w.title.split(" ")[0]}</span>
                      {isCurrent && (
                        <span className="size-1.5 rounded-full bg-primary-foreground animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main SelectedWorks Section ───────────────────────────────────────────────
export const SelectedWorks: React.FC = () => {
  const [activeModal, setActiveModal] = useState<PersonalWork | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"dealer" | "grid">("dealer");

  const filterCategories = [
    "All",
    "Developer Tools",
    "Full-Stack",
    "Generative AI",
    "Production Live",
  ];

  const filteredWorks = PERSONAL_DATA.works.filter((w) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Production Live")
      return w.liveUrl && w.liveUrl !== "#";
    return w.category === activeFilter;
  });

  return (
    <section
      id="works"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-background/50 overflow-x-clip"
    >
      {/* Background Motion Graphics Ambient Grid & Particles */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Production Works &amp; Client Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Featured{" "}
              <span className="text-muted-foreground font-light">Projects.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed font-light">
            Interactive card dealer experience: scroll down to deal and throw cards onto the table, or toggle grid mode to inspect all projects simultaneously.
          </p>
        </div>

        {/* Filters & View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
            {filterCategories.map((cat) => {
              const count = PERSONAL_DATA.works.filter((w) => {
                if (cat === "All") return true;
                if (cat === "Production Live")
                  return w.liveUrl && w.liveUrl !== "#";
                return w.category === cat;
              }).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${activeFilter === cat
                    ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFilter === cat
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Interactive Deck Arena vs Grid */}
          <div className=" flex items-center gap-1 p-1 rounded-full border border-border/80 bg-card/60">
            <button
              onClick={() => setViewMode("dealer")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${viewMode === "dealer"
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Layers2 className="h-3.5 w-3.5" />
              <span>Card Deck</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${viewMode === "grid"
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Main Content Area based on View Mode */}
        {viewMode === "dealer" ? (
          <CardDeckDealer
            works={filteredWorks}
            onSelectWork={(work) => setActiveModal(work)}
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6"
          >
            {filteredWorks.map((work, idx) => (
              <MotionGraphicsCard
                key={work.id}
                work={work}
                idx={idx}
                onClick={() => setActiveModal(work)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Interactive Project Modal (Full In-Depth Architecture Details) */}
      <AnimatePresence>
        {activeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 h-8 w-8 rounded-full border border-border/60 bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary mb-4">
                <Layers className="h-3 w-3" />
                <span>{activeModal.category.toUpperCase()}</span>
              </div>

              <h3 className="text-3xl font-bold text-foreground">
                {activeModal.title}
              </h3>
              <div className="text-sm font-mono text-muted-foreground mt-1 mb-4">
                {activeModal.subtitle}
              </div>

              {/* Modal Embedded Motion Graphics Stage */}
              <MotionGraphicHero work={activeModal} />

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed my-6">
                {activeModal.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="text-xs font-mono text-foreground font-semibold uppercase tracking-wider">
                  Key Technical Highlights:
                </div>
                <div className="space-y-2.5">
                  {activeModal.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-xs font-mono text-foreground font-semibold uppercase tracking-wider mb-3">
                  Technologies Utilized:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeModal.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-muted/60 border border-border/60 px-3 py-1.5 text-xs font-mono text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/40">
                {activeModal.githubUrl && activeModal.githubUrl !== "#" ? (
                  <a
                    href={activeModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Source on GitHub</span>
                  </a>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  {activeModal.liveUrl && activeModal.liveUrl !== "#" && (
                    <a
                      href={activeModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
                    >
                      <span>
                        {activeModal.id === "vercel-extension"
                          ? "View on VS Code Marketplace"
                          : "Visit Live Site"}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setActiveModal(null)}
                    className="rounded-full border border-border/60 bg-muted/40 hover:bg-muted text-foreground px-4 py-2 text-xs font-medium cursor-pointer transition-colors"
                  >
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

