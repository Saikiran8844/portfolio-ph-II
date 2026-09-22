"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BlogPost } from "@/data/blogs-data";
import { useMotionPreference } from "@/providers/motion-provider";
import {
  Sparkles,
  ArrowUpRight,
  Clock,
  TrendingUp,
  Zap,
  Radio,
  CornerDownRight,
} from "lucide-react";

interface GsapBlogCardProps {
  post: BlogPost;
  index: number;
  onOpen: (post: BlogPost) => void;
}

export const GsapBlogCard: React.FC<GsapBlogCardProps> = ({
  post,
  index,
  onOpen,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const foilRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const beamSpinnerRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const { isReducedMotion } = useMotionPreference();

  useGSAP(
    () => {
      if (!outerRef.current || !cardRef.current || isReducedMotion) return;

      const outer = outerRef.current;
      const card = cardRef.current;
      const foil = foilRef.current;
      const spotlight = spotlightRef.current;
      const spinner = beamSpinnerRef.current;

      // Continuous hyper-speed beam rotation on spinner
      if (spinner) {
        gsap.to(spinner, {
          rotation: 360,
          duration: 4,
          repeat: -1,
          ease: "none",
        });
      }

      // GSAP quickTo for ultra-fluid 60fps 3D holographic tilt
      const setRotX = gsap.quickTo(card, "rotationX", {
        duration: 0.35,
        ease: "power2.out",
      });
      const setRotY = gsap.quickTo(card, "rotationY", {
        duration: 0.35,
        ease: "power2.out",
      });
      const setScale = gsap.quickTo(card, "scale", {
        duration: 0.35,
        ease: "power2.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = outer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalized offsets: -1 to +1 from center
        const xPercent = (mouseX / rect.width - 0.5) * 2;
        const yPercent = (mouseY / rect.height - 0.5) * 2;

        // Dynamic 3D tilt angles (up to ±14deg)
        setRotY(xPercent * 14);
        setRotX(-yPercent * 14);
        setScale(1.03);

        // Update Specular Spotlight & Prismatic Hologram reflection angle
        const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
        if (spotlight) {
          const spotAlpha = isDark ? "0.18" : "0.10";
          const spotColor = isDark ? "255,255,255" : "16,185,129";
          spotlight.style.background = `radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(${spotColor},${spotAlpha}), transparent 70%)`;
          spotlight.style.opacity = "1";
        }

        if (foil) {
          const angle = Math.atan2(yPercent, xPercent) * (180 / Math.PI) + 90;
          foil.style.background = `linear-gradient(${angle}deg, transparent 15%, ${post.accentColor}25 35%, #38bdf830 50%, #ec489930 65%, ${post.accentColor}25 80%, transparent 95%)`;
          foil.style.opacity = isDark ? "0.75" : "0.4";
        }
      };

      const handleMouseEnter = () => {
        setIsHovered(true);
        const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
        if (spinner) {
          gsap.to(spinner, { timeScale: 2.2, duration: 0.4 });
        }
        const hoverShadow = isDark
          ? `0 20px 60px -10px ${post.accentColor}40, 0 0 35px -5px ${post.accentColor}30`
          : `0 20px 45px -12px ${post.accentColor}35, 0 8px 25px -6px rgba(0,0,0,0.08)`;
        gsap.to(card, {
          boxShadow: hoverShadow,
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset beam rotation speed
        if (spinner) {
          gsap.to(spinner, { timeScale: 1, duration: 0.6 });
        }
        // Elastic organic bounce return to rest
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          boxShadow: typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "0 10px 30px -10px rgba(0,0,0,0.5)" : "0 10px 30px -10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          duration: 0.85,
          ease: "elastic.out(1, 0.4)",
        });

        if (spotlight) spotlight.style.opacity = "0";
        if (foil) foil.style.opacity = "0";
      };

      outer.addEventListener("mousemove", handleMouseMove);
      outer.addEventListener("mouseenter", handleMouseEnter);
      outer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        outer.removeEventListener("mousemove", handleMouseMove);
        outer.removeEventListener("mouseenter", handleMouseEnter);
        outer.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: outerRef, dependencies: [isReducedMotion, post.accentColor] }
  );

  return (
    <div
      ref={outerRef}
      onClick={() => onOpen(post)}
      style={{ perspective: "1200px" }}
      className="group relative h-full cursor-pointer select-none p-1"
    >
      {/* ── 3D TILTING CONTAINER ── */}
      <div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
        }}
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-[1.5px] transition-all duration-300 shadow-md shadow-black/5 dark:shadow-xl bg-border/50 dark:bg-white/5"
      >
        {/* ── 1. ROTATING CONIC LASER BEAM BORDER (Aceternity / Raycast Style) ── */}
        <div className="absolute -inset-[150%] pointer-events-none overflow-hidden z-0">
          <div
            ref={beamSpinnerRef}
            className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 270deg, ${post.accentColor} 320deg, #38bdf8 345deg, #f43f5e 355deg, ${post.accentColor} 360deg)`,
            }}
          />
        </div>

        {/* ── 2. BLURRED GLOW UNDER-LAYER (Soft Ambient Aura) ── */}
        <div
          className="absolute -inset-1 rounded-[28px] opacity-0 group-hover:opacity-60 dark:group-hover:opacity-75 blur-xl transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle at center, ${post.accentColor}50, transparent 70%)`,
          }}
        />

        {/* ── 3. INNER CARD MESH (Deep Obsidian Glass) ── */}
        <div className="relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-card/95 dark:bg-zinc-950/92 p-6 sm:p-7 backdrop-blur-2xl border border-border/40 dark:border-white/10 transition-colors duration-300">
          {/* Specular Spotlight Reflection */}
          <div
            ref={spotlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-200"
          />

          {/* Prismatic Holographic Foil Overlay */}
          <div
            ref={foilRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-soft-light dark:mix-blend-color-dodge transition-opacity duration-300"
          />

          {/* Cyber Diagonal Scanline Texture */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:18px_18px] opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Futuristic Sci-Fi Corner HUD Reticles */}
          <div className="pointer-events-none absolute top-3 left-3 text-[9px] font-mono text-primary/60 dark:text-primary/40 group-hover:text-primary transition-colors flex items-center gap-1">
            <span>[+]</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px]">
              PLAYBOOK.0{index + 1}
            </span>
          </div>
          <div className="pointer-events-none absolute top-3 right-3 text-[9px] font-mono text-muted-foreground/40 dark:text-muted-foreground/30 group-hover:text-primary/70 transition-colors">
            ◈
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 text-[8px] font-mono text-muted-foreground/30 dark:text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors">
            SEC.DEV
          </div>
          <div className="pointer-events-none absolute bottom-3 right-3 text-[9px] font-mono text-primary/50 dark:text-primary/30 group-hover:text-primary transition-colors">
            [+]
          </div>

          {/* ── CARD CONTENT (With Virtual 3D Depth) ── */}
          <div className="relative z-20 flex flex-col justify-between h-full pt-2">
            {/* Top Section */}
            <div>
              {/* Category Pill & Read Time */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="relative inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono font-medium text-primary shadow-sm backdrop-blur-md overflow-hidden group-hover:border-primary group-hover:bg-primary/15 dark:group-hover:bg-primary/20 transition-all">
                  <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-muted/50 dark:bg-muted/20 px-2 py-0.5 rounded-md border border-border/60 dark:border-border/40">
                  <Clock className="size-3 text-primary/80 dark:text-primary/70" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title with Gradient Text Transition */}
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-foreground transition-all duration-300 line-clamp-2 leading-snug group-hover:text-primary dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-white dark:group-hover:via-emerald-300 dark:group-hover:to-cyan-300">
                {post.title}
              </h4>

              {/* Subtitle / Summary */}
              <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
                {post.summary}
              </p>

              {/* Flashy Neon Metric Highlight Banner */}
              {post.highlightMetric && (
                <div className="mt-5 relative overflow-hidden rounded-2xl border border-emerald-500/25 dark:border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-3.5 backdrop-blur-md group-hover:border-emerald-500/50 dark:group-hover:border-emerald-400/60 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] dark:group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-500/25 dark:border-emerald-500/30 group-hover:scale-110 transition-transform">
                      <TrendingUp className="size-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-base sm:text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight flex items-center gap-1">
                        {post.highlightMetric.value}
                        <Zap className="size-3 fill-emerald-600 dark:fill-emerald-400 animate-bounce" />
                      </span>
                      <span className="text-[11px] text-muted-foreground truncate font-medium">
                        {post.highlightMetric.label}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Light Ray */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/80 dark:via-emerald-400/80 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </div>
              )}

              {/* Key Takeaways Preview */}
              <div className="mt-4 space-y-1.5 border-t border-border/50 dark:border-border/30 pt-3">
                {post.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                  <div
                    key={tIdx}
                    className="flex items-start gap-1.5 text-[11px] text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors"
                  >
                    <CornerDownRight className="size-3 text-primary mt-0.5 shrink-0" />
                    <span className="truncate">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer: Tags & Read CTA Button */}
            <div className="mt-6 pt-4 border-t border-border/50 dark:border-border/40 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/60 bg-muted/40 dark:bg-background/60 px-2 py-0.5 text-[10px] font-mono text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3.5 py-1 text-xs font-mono font-semibold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] dark:group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-105 shrink-0">
                <span>Explore</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GsapBlogCard;
