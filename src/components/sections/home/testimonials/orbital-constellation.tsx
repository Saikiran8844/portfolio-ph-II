"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserData } from "@/data/user-data";
import { Star, Globe, MessageSquarePlus } from "lucide-react";

interface OrbitalConstellationProps {
  reviews: UserData[];
  onOpenFeedback: () => void;
}

interface ConstellationNode {
  id: string;
  review: UserData;
  baseAngle: number;
  distance: number;
  width: number;
  height: number;
  imageSrc: string;
  logoSrc?: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export const OrbitalConstellation: React.FC<OrbitalConstellationProps> = ({
  reviews,
  onOpenFeedback,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1100, height: 750 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Measure container width and adjust viewport dynamically
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = w < 640 ? 580 : w < 1024 ? 700 : 780;
      setDimensions({ width: w, height: h });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Continuous slow circular orbital drift
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Pause rotation when a node is hovered or selected
      if (!hoveredId && !selectedId) {
        // Slow, elegant 360 drift (~110 seconds for full orbit)
        const speed = 0.045;
        setRotationAngle((prev) => (prev + speed * delta) % (Math.PI * 2));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredId, selectedId]);

  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;

  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width < 1024;

  // Curated nodes layout matching the geometry and aspect ratios of the reference image
  const nodes: ConstellationNode[] = useMemo(() => {
    // Spatial configuration matching the reference image:
    // 1. Top-Right: Editorial feature (sofa/editorial photo + quote)
    // 2. Right: Large industrial/tech prototype landscape photo
    // 3. Bottom: Vertical colonnade / architecture portrait photo
    // 4. Bottom-Left / Center: Small community / team landscape photo
    // 5. Middle-Left: Slit / architectural vertical photo
    // 6. Top-Left: Large landscape team photo
    const layout = [
      {
        angleDeg: 35, // Top-Right (Forbes style)
        dist: isMobile ? 185 : isTablet ? 250 : 300,
        w: isMobile ? 100 : 130,
        h: isMobile ? 80 : 105,
      },
      {
        angleDeg: 95, // Right
        dist: isMobile ? 175 : isTablet ? 230 : 280,
        w: isMobile ? 115 : 150,
        h: isMobile ? 75 : 95,
      },
      {
        angleDeg: 165, // Bottom
        dist: isMobile ? 180 : isTablet ? 240 : 285,
        w: isMobile ? 85 : 110,
        h: isMobile ? 105 : 135,
      },
      {
        angleDeg: 215, // Bottom-Left
        dist: isMobile ? 160 : isTablet ? 210 : 250,
        w: isMobile ? 95 : 120,
        h: isMobile ? 70 : 85,
      },
      {
        angleDeg: 280, // Middle-Left
        dist: isMobile ? 165 : isTablet ? 220 : 265,
        w: isMobile ? 75 : 95,
        h: isMobile ? 100 : 125,
      },
      {
        angleDeg: 330, // Top-Left
        dist: isMobile ? 190 : isTablet ? 250 : 300,
        w: isMobile ? 120 : 155,
        h: isMobile ? 80 : 100,
      },
    ];

    return reviews.slice(0, 6).map((review, i) => {
      const cfg = layout[i % layout.length];
      const baseRad = (cfg.angleDeg * Math.PI) / 180;
      const imageSrc = review.mediaImage || review.avatar;

      return {
        id: review.id,
        review,
        baseAngle: baseRad,
        distance: cfg.dist,
        width: cfg.w,
        height: cfg.h,
        imageSrc,
        logoSrc: review.brandLogo,
        title: review.company || review.project || review.name,
        quote: review.message,
        author: review.name,
        role: review.role,
        rating: review.rating || 5,
      };
    });
  }, [reviews, isMobile, isTablet]);

  // Compute animated real-time positions for each node
  const computedNodes = useMemo(() => {
    return nodes.map((node) => {
      const angle = node.baseAngle + rotationAngle;
      // Slight perspective compression for natural visual depth
      const x = cx + Math.cos(angle) * node.distance;
      const y = cy + Math.sin(angle) * (node.distance * 0.78);

      return {
        ...node,
        x,
        y,
      };
    });
  }, [nodes, rotationAngle, cx, cy]);

  const activeId = hoveredId || selectedId;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible select-none bg-transparent"
      style={{ minHeight: dimensions.height }}
    >
      {/* SVG CONNECTING BRANCHES / SPIDERWEB LINES */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="treeBranchActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {computedNodes.map((node) => {
          const isActive = activeId === node.id;
          return (
            <g key={`branch-${node.id}`}>
              {/* Thin straight line radiating from the center crosshair directly to the node */}
              <line
                x1={cx}
                y1={cy}
                x2={node.x}
                y2={node.y}
                stroke={isActive ? "url(#treeBranchActive)" : "currentColor"}
                strokeWidth={isActive ? 1.6 : 0.8}
                strokeDasharray={isActive ? "none" : "2 3"}
                className={isActive ? "" : "text-foreground/25 dark:text-white/25"}
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />

              {/* Minute junction point at node attachment */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 2.5 : 1.5}
                fill="currentColor"
                className={isActive ? "text-primary" : "text-foreground/40 dark:text-white/40"}
              />
            </g>
          );
        })}

        {/* CENTER CROSSHAIR RETICLE (+) (No photo, pure subtle origin crosshair as in reference) */}
        <g className="text-foreground/60 dark:text-white/60">
          <line
            x1={cx - 12}
            y1={cy}
            x2={cx + 12}
            y2={cy}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1={cx}
            y1={cy - 12}
            x2={cx}
            y2={cy + 12}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx={cx}
            cy={cy}
            r="1.8"
            fill="currentColor"
          />
        </g>
      </svg>

      {/* SURROUNDING FREE-TREE IMAGE NODES */}
      {computedNodes.map((node) => {
        const isActive = activeId === node.id;

        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedId(selectedId === node.id ? null : node.id)}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300"
            style={{
              left: node.x,
              top: node.y,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.06 : 1})`,
            }}
          >
            {/* The Image Node (Clean photograph/image with minimalist border like reference) */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                isActive
                  ? "border border-foreground/90 dark:border-white/90 shadow-2xl ring-1 ring-primary/40"
                  : "border border-foreground/20 dark:border-white/25 hover:border-foreground/60 dark:hover:border-white/60 opacity-85 hover:opacity-100"
              }`}
              style={{
                width: node.width,
                height: node.height,
              }}
            >
              <Image
                src={node.imageSrc}
                alt={node.title}
                fill
                unoptimized
                className="object-cover"
              />

              {/* Minimal brand logo chip in the top corner */}
              {node.logoSrc && (
                <div className="absolute top-1.5 right-1.5 size-8 rounded-md bg-background/90 dark:bg-black/90 backdrop-blur-md p-1 border border-border/60 dark:border-white/20 shadow-md">
                  <Image
                    src={node.logoSrc}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain p-0.5"
                  />
                </div>
              )}
            </div>

            {/* ON-HOVER / ON-CLICK EDITORIAL FEEDBACK (Exact Forbes Style in Reference) */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40 w-64 sm:w-72 p-3 text-left pointer-events-none rounded-lg bg-background/95 dark:bg-neutral-950/95 border border-border/80 dark:border-white/20 backdrop-blur-md shadow-2xl"
                >
                  {/* Brand Title / Logo Row */}
                  <div className="flex items-center gap-2 mb-1.5">
                    {node.logoSrc && (
                      <div className="relative size-5 rounded overflow-hidden bg-muted p-0.5 border border-border/50 shrink-0">
                        <Image
                          src={node.logoSrc}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="text-xs font-bold tracking-tight text-foreground uppercase font-sans">
                      {node.title}
                    </span>
                    <div className="flex text-amber-500 dark:text-amber-400 ml-auto">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="size-2.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Editorial Quote in Quotes — Forbes Typographic Style */}
                  <p className="text-xs sm:text-[13px] text-muted-foreground dark:text-neutral-200 italic font-serif leading-snug">
                    &ldquo;{node.quote}&rdquo;
                  </p>

                  {/* Author credit */}
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/60 dark:border-white/10 pt-1.5">
                    <span className="text-foreground dark:text-white font-medium">{node.author}</span>
                    <span className="truncate max-w-[120px]">{node.role}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* BOTTOM FOOTER BAR (Matching Reference: (c) Info on Left, ACCÈS CLIENT on Right) */}
      <div className="absolute bottom-2 inset-x-0 px-4 sm:px-8 flex items-center justify-between text-xs font-mono text-muted-foreground z-30 pointer-events-auto">
        {/* Left: Global Client Network badge */}
        <div className="flex items-center gap-2">
          <Globe className="size-3.5 text-muted-foreground/70" />
          <span className="text-[11px] tracking-wide">
            Global Client Network &middot; Verified Engagements
          </span>
        </div>

        {/* Right: Client Access & Feedback CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFeedback}
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 dark:border-white/20 bg-background/80 dark:bg-black/80 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-foreground transition-all hover:border-foreground/60 dark:hover:border-white/60 hover:shadow-md active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <MessageSquarePlus className="size-3.5 text-primary" />
            <span>ACC&Egrave;S CLIENT &middot; Leave Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
