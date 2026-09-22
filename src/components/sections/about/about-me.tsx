"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroThreeCanvas } from "@/components/sections/hero/hero-three-canvas";
import {
  ArrowDown,
  Sparkles,
  Terminal,
  Github,
  Linkedin,
  Mail,
  Zap,
  ArrowUpRight,
  Radio,
  Code2,
  Briefcase,
  Download,
  X,
  CheckCircle2,
} from "lucide-react";
import { PERSONAL_DATA } from "@/data/resume-data";

// ── Cinematic Portrait Frame with 3D Tilt & Motion Graphics ──────────────────
const CinematicPortrait = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
      className="group relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[430px] aspect-[3/4] mx-auto rounded-3xl p-1.5 bg-gradient-to-b from-primary/30 via-border/60 to-border/30 border border-border/80 shadow-2xl shadow-black/40 overflow-hidden cursor-pointer select-none"
    >
      {/* 1. Motion Graphics Traveling Perimeter Border Beam */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="23"
            stroke="url(#portrait-beam)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              strokeDasharray: "120 580",
              animation: "portraitBeamAnim 4s linear infinite",
            }}
          />
          <defs>
            <linearGradient id="portrait-beam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <style jsx>{`
          @keyframes portraitBeamAnim {
            from {
              stroke-dashoffset: 0;
            }
            to {
              stroke-dashoffset: -700;
            }
          }
        `}</style>
      </div>

      {/* 2. Interactive Specular Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.14) 0%, transparent 60%)`,
        }}
      />

      {/* 3. Laser Sweep Scanline Animation */}
      <motion.div
        animate={{ y: ["-100%", "350%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_14px_rgba(201,58,42,0.8)] pointer-events-none z-20 opacity-60"
      />

      {/* 4. The Studio Portrait Photo */}
      <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black">
        <img
          src="/profile.jpg"
          alt="Saikiran Nannapaneni"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110"
        />

        {/* Cinematic Film Vignette & Bottom Shadow Blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

        {/* Cyber Reticles at Corners */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-white/50 font-bold pointer-events-none z-10">
          ⌜ [SYS.ID // SAIKIRAN]
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-white/50 font-bold pointer-events-none z-10">
          ⌝
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/50 font-bold pointer-events-none z-10">
          ⌞
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/50 font-bold pointer-events-none z-10">
          ⌟
        </div>

        {/* Top-Right Live Status Pill */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[10px] font-mono text-white shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ACTIVE // NEW DELHI</span>
        </div>

        {/* Bottom Floating Identity Card (3D translateZ) */}
        <div
          className="absolute bottom-4 inset-x-4 z-10 p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl space-y-2"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {PERSONAL_DATA.name}
              </h3>
              <p className="text-[11px] font-mono text-white/70">
                Software Engineer II (Thales) · Shopify Architect
              </p>
            </div>

            <div className="size-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/90 group-hover:bg-primary group-hover:text-white transition-colors">
              <Code2 className="size-4" />
            </div>
          </div>

          {/* Quick Tech Chips */}
          <div className="flex flex-wrap gap-1 pt-1">
            {["Java 21", "Spring Boot", "Shopify Liquid", "React 19", "Next.js", "GenAI"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono text-white/85 border border-white/10"
                >
                  {tech}
                </span>
              )
            )}
          </div>

          {/* Latest Client Deployment Link */}
          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-white/60">
            <span className="flex items-center gap-1">
              <Radio className="size-2 text-emerald-400 animate-pulse" />
              <span>Prod Client:</span>
            </span>
            <a
              href="https://carrotkart.live"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              <span>CarrotKart.live</span>
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main AboutMe / Hero Banner Section ────────────────────────────────────────
const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hireMeBtnRef = useRef<HTMLDivElement>(null);

  // "Catch me to hire me" crawling mini-game state
  const [isCrawling, setIsCrawling] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const [crawlCountdown, setCrawlCountdown] = useState(5);
  const [isCaught, setIsCaught] = useState(false);
  const [ballPath, setBallPath] = useState<{ x: number[]; y: number[] }>({ x: [0], y: [0] });
  const crawlTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const startHireMeGame = () => {
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setIsCrawling(true);
    setHasStopped(false);
    setIsCaught(false);
    setCrawlCountdown(5);

    let startX = 600;
    let startY = 100;
    let endX = 600;
    let endY = 150;
    let w = typeof window !== "undefined" ? window.innerWidth : 1200;
    let h = typeof window !== "undefined" ? window.innerHeight : 800;

    if (containerRef.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      w = cRect.width;
      h = Math.max(cRect.height, 700);
      if (hireMeBtnRef.current) {
        const bRect = hireMeBtnRef.current.getBoundingClientRect();
        startX = bRect.left - cRect.left + bRect.width / 2 - 28;
        startY = bRect.top - cRect.top;
        endX = startX;
        endY = bRect.bottom - cRect.top + 10;
      }
    }

    // Dynamic wide bounce path throughout the entire About Me section!
    setBallPath({
      x: [
        startX,
        w * 0.12,
        w * 0.82,
        w * 0.05,
        w * 0.9,
        w * 0.28,
        w * 0.76,
        w * 0.15,
        endX,
      ],
      y: [
        startY,
        h * 0.72,
        h * 0.18,
        h * 0.58,
        h * 0.82,
        h * 0.25,
        h * 0.85,
        h * 0.45,
        endY,
      ],
    });

    countdownIntervalRef.current = setInterval(() => {
      setCrawlCountdown((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    crawlTimerRef.current = setTimeout(() => {
      setIsCrawling(false);
      setHasStopped(true);
    }, 5000);
  };

  const handleCatch = () => {
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setIsCrawling(false);
    setHasStopped(true);
    setIsCaught(true);
  };

  const closeCrawler = () => {
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setIsCrawling(false);
    setHasStopped(false);
    setIsCaught(false);
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = PERSONAL_DATA.socials.resume;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Saikiran_Nannapaneni_Resume.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const scrollToWorks = () => {
    const el = document.getElementById("works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-10 px-6 sm:px-12 lg:px-20 bg-background"
    >
      {/* ── Keyframes for Vibrating Hire Me Button ── */}
      <style>{`
        @keyframes hireMeShake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          15% { transform: translate(-1.5px, 1px) rotate(-1.5deg); }
          30% { transform: translate(1.5px, -1px) rotate(1.5deg); }
          45% { transform: translate(-1px, 1px) rotate(-1deg); }
          60% { transform: translate(1px, -1px) rotate(1deg); }
          75% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }
          90% { transform: translate(1px, -0.5px) rotate(0.5deg); }
        }
      `}</style>

      {/* 3D WebGL Three.js Particle Mesh Backdrop */}
      <HeroThreeCanvas />

      {/* Subtle Noise & Radial Gradients */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/noise.svg')]" />
      <div className="absolute inset-0 z-0 bg-radial from-primary/10 via-transparent to-background/95 pointer-events-none" />

      {/* ── Bouncing Smiley Ball Across the Entire About Me Section ── */}
      {isCrawling && (
        <motion.div
          onClick={handleCatch}
          initial={{ x: ballPath.x[0], y: ballPath.y[0], opacity: 0, scale: 0.5 }}
          animate={{
            x: ballPath.x,
            y: ballPath.y,
            rotate: [0, 180, 360, 540, 720, 900, 1080, 1260, 1440],
            scale: [1, 0.85, 1.15, 0.88, 1.12, 0.88, 1.1, 0.9, 1],
            opacity: 1,
          }}
          transition={{
            duration: 5,
            times: [0, 0.13, 0.28, 0.42, 0.56, 0.7, 0.82, 0.92, 1],
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 z-[9999] pointer-events-auto cursor-pointer select-none"
          title="Click to catch me!"
        >
          {/* Circular Smiley Ball */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff176_0%,#f59e0b_55%,#b45309_100%)] shadow-[0_0_35px_rgba(245,158,11,0.95),inset_0_-4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center border-2 border-white active:scale-90 transition-transform">
            {/* Cute Energetic Smiley Face */}
            <div className="flex flex-col items-center justify-center select-none pointer-events-none">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-2.5 h-3 rounded-full bg-zinc-950" />
                <div className="w-2.5 h-3 rounded-full bg-zinc-950" />
              </div>
              <div className="w-6 h-3.5 border-b-[3.5px] border-zinc-950 rounded-full" />
            </div>

            {/* Floating Speech Tag */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/95 text-white border border-amber-400 text-[10px] font-mono font-bold whitespace-nowrap shadow-xl flex items-center gap-1.5 pointer-events-none">
              <span>Catch me!</span>
              <span className="text-amber-400 font-extrabold">{crawlCountdown}s</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 1. Top Status & Social Links Strip (z-50 to stay strictly above hero grid) */}
      <div className="relative z-50 flex flex-wrap items-center justify-between w-full max-w-7xl mx-auto pt-2 gap-4">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/75 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-foreground/90 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-emerald-400">OPEN FOR ROLES &amp; CLIENT PROJECTS</span>
          <span className="text-muted-foreground hidden sm:inline">// {PERSONAL_DATA.location.toUpperCase()}</span>
        </motion.div>

        {/* Quick Social & Connect Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 text-xs font-mono relative z-50"
        >
          <a
            href={PERSONAL_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href={PERSONAL_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="size-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* ── Vibrating "Hire Me" / "Catch Me!" Button ── */}
          <div ref={hireMeBtnRef} className="relative inline-block group z-50">
            <button
              type="button"
              onClick={startHireMeGame}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border font-semibold shadow-md transition-all cursor-pointer select-none ${isCrawling
                ? "border-amber-400 bg-amber-500/20 text-amber-500 shadow-amber-500/30 scale-105"
                : "border-primary/50 bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground shadow-primary/20"
                }`}
              style={{
                animation: "hireMeShake 0.6s ease-in-out infinite",
              }}
              title={isCrawling ? "Catch Me!" : "Hire Me"}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCrawling ? "bg-amber-400" : "bg-primary"
                  }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isCrawling ? "bg-amber-400" : "bg-primary"
                  }`} />
              </span>
              <span>{isCrawling ? "Catch Me!" : "Hire Me"}</span>
              <Briefcase className="size-3.5 transition-transform group-hover:scale-110" />
            </button>

            {/* Tooltip on Hover: "Download my resume" */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[11px] font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
              Download my resume
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900 dark:border-b-zinc-100" />
            </div>

            {/* ── Docked Just Below the Hire Me Button After 5s / Caught (z-[9999] Top Level) ── */}
            {hasStopped && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute top-full right-0 mt-3 z-[9999] pointer-events-auto flex items-center gap-3 p-3 rounded-2xl bg-black text-white border-2 border-primary shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(201,58,42,0.8)] backdrop-blur-2xl text-xs font-mono whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 animate-pulse" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-white text-[11px]">
                      {isCaught ? "🎉 Fast catch!" : "🎯 Ready to hire?"}
                    </span>
                    <span className="text-white/70 text-[9.5px]">
                      Saikiran&apos;s Resume Ready
                    </span>
                  </div>
                </div>

                <a
                  href={PERSONAL_DATA.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Saikiran_Nannapaneni_Resume.pdf"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
                >
                  <Download className="size-3.5" />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeCrawler();
                  }}
                  className="p-1 rounded-full hover:bg-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Dismiss"
                >
                  <X className="size-3.5" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 2. Main Hero Grid: Personal Introduction + Cinematic Portrait Showcase */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        {/* Left Column: Personal Introduction & Identity (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Personal Salutation Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-mono text-primary font-bold tracking-wider uppercase"
          >
            <Sparkles className="size-3.5 text-primary animate-pulse" />
            <span>HI, I&apos;M {PERSONAL_DATA.name.toUpperCase()}</span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]"
          >
            Software Engineer, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
              Shopify Builder
            </span>{" "}
            <br />
            &amp; Creative Tech.
          </motion.h1>

          {/* Authentic Personal About Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 space-y-3.5 max-w-2xl"
          >
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              I am a <span className="text-foreground font-semibold">Software Engineer II at Thales</span> and an independent{" "}
              <span className="text-foreground font-semibold">Shopify &amp; Full-Stack Architect</span> with{" "}
              <span className="text-primary font-bold">3.8+ years</span> of production experience building mission-critical cloud microservices, enterprise integrations, and high-conversion e-commerce systems.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/90 font-light leading-relaxed">
              My engineering craft bridges <span className="text-foreground font-medium">Java, Spring Boot &amp; Kubernetes</span> for resilient enterprise scale with bespoke <span className="text-emerald-400 font-medium">Shopify Storefronts</span>, modern <span className="text-foreground font-medium">React 19 / Next.js 15</span> interfaces, and autonomous <span className="text-foreground font-medium">Generative AI</span> tooling.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={scrollToWorks}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Featured Projects</span>
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 cursor-pointer shadow-sm"
            >
              <Terminal className="size-4 text-primary" />
              <span>Schedule Strategy Call</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Cinematic Portrait Motion Graphic Showcase (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
        >
          <CinematicPortrait />
        </motion.div>
      </motion.div>

      {/* 3. Bottom Horizontal Tech & Craft Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Zap className="size-3.5 text-primary" />
          <span className="font-bold text-foreground">ENGINEERING DISCIPLINES:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-foreground/80 font-medium">
          <span className="hover:text-primary transition-colors">Enterprise Cloud &amp; Microservices</span>
          <span>•</span>
          <span className="hover:text-primary transition-colors">Shopify &amp; Storefront Architecture</span>
          <span>•</span>
          <span className="hover:text-primary transition-colors">Modern React 19 &amp; Next.js</span>
          <span>•</span>
          <span className="hover:text-primary transition-colors">Three.js &amp; GSAP Motion</span>
          <span>•</span>
          <span className="hover:text-primary transition-colors">Generative AI Tooling</span>
        </div>

        <div className="text-[11px] text-muted-foreground/60 hidden md:block">
          SCROLL TO EXPLORE WORKS ↓
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
