"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Cpu, RotateCcw } from "lucide-react";
import { useMotionPreference } from "@/providers/motion-provider";

const GLYPHS = "01#$_&%<>{}[]=/\\+*!^~?◈◆▲▼⚡⌘";
const PRIMARY_PHRASE = "Playbooks";
const SECONDARY_PHRASE = "";

export const KineticPlaybookHeading: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-80px" });
  const { isReducedMotion } = useMotionPreference();

  // Scramble State
  const [displayText, setDisplayText] = useState(PRIMARY_PHRASE);
  const [isScrambling, setIsScrambling] = useState(false);
  const [scrambleCount, setScrambleCount] = useState(0);

  // Trigger cyber scramble animation
  const triggerScramble = () => {
    if (isReducedMotion || isScrambling) return;

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = PRIMARY_PHRASE.length * 2.5;

    const interval = setInterval(() => {
      setDisplayText(
        PRIMARY_PHRASE.split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2.5) {
              return PRIMARY_PHRASE[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(PRIMARY_PHRASE);
        setIsScrambling(false);
        setScrambleCount((prev) => prev + 1);
      }
    }, 28);
  };

  // Auto-scramble on first entrance into view
  useEffect(() => {
    if (isInView && !isReducedMotion) {
      const timer = setTimeout(() => {
        triggerScramble();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none py-2"
    >
      {/* ── Sub-header Tech Matrix Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-mono text-primary shadow-sm shadow-primary/20 backdrop-blur-md"
      >
        <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] uppercase tracking-widest font-semibold">
          SYS.PLAYBOOKS // VER.2026
        </span>
        <button
          type="button"
          onClick={triggerScramble}
          title="Click to re-decrypt"
          className="ml-1 flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary-foreground hover:bg-primary transition-colors cursor-pointer"
        >
          <RotateCcw className={`size-2.5 ${isScrambling ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Re-Decrypt</span>
        </button>
      </motion.div>

      {/* ── Main Kinetic Heading ── */}
      <div
        onMouseEnter={triggerScramble}
        className="group relative cursor-pointer text-center px-4"
        title="Hover to decrypt"
      >
        {/* Glowing Background Light Sweep on Hover */}
        <div className="pointer-events-none absolute -inset-x-12 -inset-y-6 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/20 to-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

        <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
          {/* Top Line: "Technical Playbooks" with 3D Kinetic Letter Stagger */}
          <span
            className="inline-flex flex-wrap items-center justify-center gap-x-[0.2em] relative font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_2px_18px_rgba(16,185,129,0.35)]"
            style={{ perspective: "1000px" }}
          >
            {displayText.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}-${scrambleCount}`}
                initial={{
                  opacity: 0,
                  y: 40,
                  rotateX: -75,
                  filter: "blur(6px)",
                }}
                animate={
                  isInView
                    ? {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      filter: "blur(0px)",
                    }
                    : {}
                }
                whileHover={{
                  y: -10,
                  scale: 1.15,
                  rotateZ: (index % 2 === 0 ? 1 : -1) * 6,
                  color: "#34d399",
                  transition: { type: "spring", stiffness: 450, damping: 14 },
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block transform-gpu transition-colors ${char === " " ? "w-[0.3em]" : ""
                  } ${isScrambling && char !== PRIMARY_PHRASE[index]
                    ? "text-cyan-300 font-mono"
                    : ""
                  }`}
                style={{ transformOrigin: "bottom center" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Bottom Line: "& Engineering Blogs" with subtle neon flow */}
          <motion.span
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={
              isInView
                ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block mt-1 sm:mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent"
          >
            {SECONDARY_PHRASE}
          </motion.span>
        </h3>

        {/* Laser Underline Sweep with Pulsing Node */}
        <div className="relative mx-auto mt-5 max-w-sm sm:max-w-md h-0.5 overflow-hidden rounded-full bg-border/40">
          <motion.div
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "100%" } : {}}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
            className="h-full w-24 sm:w-36 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981]"
          />
        </div>

        {/* Hover Hint */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-mono text-muted-foreground/60 transition-opacity duration-300 group-hover:text-primary">
          <Sparkles className="size-3 text-emerald-400 animate-pulse" />
          <span>Hover characters for kinetic spring &amp; matrix decryption</span>
        </div>
      </div>
    </div>
  );
};

export default KineticPlaybookHeading;
