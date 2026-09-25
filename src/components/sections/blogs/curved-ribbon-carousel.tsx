"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/data/blogs-data";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface CurvedRibbonCarouselProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onActiveItemChange?: (post: BlogPost) => void;
}

// 11 distinct visual themes echoing the Trionn editorial references
const CARD_THEMES = [
  {
    // 0: Novaglam Fashion Studio (Vibrant Magenta / Violet)
    bg: "bg-gradient-to-br from-[#6b114d] via-[#a21caf] to-[#3b0764]",
    textPrimary: "text-white",
    textSecondary: "text-pink-200/80",
    badgeBg: "bg-white/15 border-white/25 text-white",
    accent: "#ec4899",
    kicker: "NOVAGLAM · STUDIO",
    displayYear: "2026",
  },
  {
    // 1: Swank Minimalist Editorial (Crisp Off-White / Monochrome Stone)
    bg: "bg-[#f5f5f3] text-neutral-900 border border-neutral-300/80",
    textPrimary: "text-neutral-900",
    textSecondary: "text-neutral-600",
    badgeBg: "bg-neutral-900/10 border-neutral-900/20 text-neutral-900",
    accent: "#10b981",
    kicker: "SWANK® // SYSTEM",
    displayYear: "2026",
  },
  {
    // 2: Designed For Every Note / Sound (Moody Dark Slate & Gold Metallic)
    bg: "bg-gradient-to-b from-[#181a20] via-[#121316] to-[#0a0b0d] text-white border border-amber-500/20",
    textPrimary: "text-neutral-100",
    textSecondary: "text-neutral-400",
    badgeBg: "bg-amber-400/10 border-amber-400/30 text-amber-300",
    accent: "#f59e0b",
    kicker: "ACOUSTIC AI · SYNTH",
    displayYear: "SERIES 03",
  },
  {
    // 3: Loose Sketches / CRO (Fiery Vermilion Orange Monochrome)
    bg: "bg-[#ff4e11] text-black border border-black/15",
    textPrimary: "text-black",
    textSecondary: "text-black/80",
    badgeBg: "bg-black/15 border-black/25 text-black",
    accent: "#000000",
    kicker: "AI // CRO PLAYBOOK",
    displayYear: "© 2026",
  },
  {
    // 4: Future Drive / Architecture (Deep Tech Cyan & Cobalt Blueprint)
    bg: "bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#070b14] text-white border border-cyan-500/30",
    textPrimary: "text-cyan-50",
    textSecondary: "text-cyan-200/70",
    badgeBg: "bg-cyan-500/15 border-cyan-400/30 text-cyan-300",
    accent: "#06b6d4",
    kicker: "STOREFRONT · EDGE",
    displayYear: "0.4s FCP",
  },
  {
    // 5: Enterprise Confidential / RLS (Dark Violet Obsidian)
    bg: "bg-gradient-to-br from-[#1e1138] via-[#140b27] to-[#0a0515] text-white border border-purple-500/25",
    textPrimary: "text-purple-100",
    textSecondary: "text-purple-300/70",
    badgeBg: "bg-purple-500/15 border-purple-400/30 text-purple-200",
    accent: "#8b5cf6",
    kicker: "ENTERPRISE · RLS",
    displayYear: "10K+ FILES",
  },
  {
    // 6: Context Caching & KV State (Matrix Emerald & Dark Graphite)
    bg: "bg-gradient-to-br from-[#06241b] via-[#093529] to-[#041510] text-emerald-100 border border-emerald-500/30",
    textPrimary: "text-emerald-50",
    textSecondary: "text-emerald-300/70",
    badgeBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
    accent: "#10b981",
    kicker: "KV CACHE · TTFT",
    displayYear: "-85% COST",
  },
  {
    // 7: Head-of-Line Blocking / QUIC (Electric Amber & Carbon)
    bg: "bg-gradient-to-br from-[#2a1705] via-[#3a2007] to-[#140a02] text-amber-100 border border-amber-500/30",
    textPrimary: "text-amber-50",
    textSecondary: "text-amber-300/70",
    badgeBg: "bg-amber-500/15 border-amber-400/30 text-amber-300",
    accent: "#f59e0b",
    kicker: "HTTP/3 · QUIC",
    displayYear: "0ms STALL",
  },
  {
    // 8: Constrained Decoding (Crimson Rose & Silver)
    bg: "bg-gradient-to-br from-[#3b0b18] via-[#5c1125] to-[#20050c] text-rose-100 border border-rose-500/30",
    textPrimary: "text-rose-50",
    textSecondary: "text-rose-300/70",
    badgeBg: "bg-rose-500/15 border-rose-400/30 text-rose-300",
    accent: "#f43f5e",
    kicker: "FSM · GRAMMAR",
    displayYear: "100% JSON",
  },
  {
    // 9: Continuous Profiling (Ice Cyan & Deep Sapphire)
    bg: "bg-gradient-to-br from-[#06182a] via-[#092b4c] to-[#04101e] text-cyan-100 border border-cyan-400/30",
    textPrimary: "text-cyan-50",
    textSecondary: "text-cyan-300/70",
    badgeBg: "bg-cyan-400/15 border-cyan-300/30 text-cyan-200",
    accent: "#38bdf8",
    kicker: "eBPF · KERNEL",
    displayYear: "<0.8% CPU",
  },
  {
    // 10: Dynamic Model Routing (Luxe Royal Amethyst & Gold)
    bg: "bg-gradient-to-br from-[#230b38] via-[#38125a] to-[#120420] text-purple-100 border border-purple-400/30",
    textPrimary: "text-purple-50",
    textSecondary: "text-purple-300/70",
    badgeBg: "bg-purple-500/15 border-purple-400/30 text-purple-200",
    accent: "#c084fc",
    kicker: "CASCADE · SLM",
    displayYear: "-74% SPEND",
  },
];

export const CurvedRibbonCarousel: React.FC<CurvedRibbonCarouselProps> = ({
  posts,
  onSelectPost,
  onActiveItemChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastActivePostIdRef = useRef<string | null>(null);

  // Map each post to a unique theme from CARD_THEMES
  const ribbonItems = React.useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return posts.map((post, index) => ({
      post,
      uniqueId: `${post.id}-${index}`,
      themeIndex: index % CARD_THEMES.length,
    }));
  }, [posts]);

  const totalItems = ribbonItems.length;

  // Interaction & Physics state
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Force re-render on animation frames
  const [, setTick] = useState(0);

  // Responsive configuration
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync initial active item
  useEffect(() => {
    if (posts && posts.length > 0 && !lastActivePostIdRef.current) {
      lastActivePostIdRef.current = posts[0].id;
      onActiveItemChange?.(posts[0]);
    }
  }, [posts, onActiveItemChange]);

  // Sync active item when hovered
  useEffect(() => {
    if (hoveredIndex !== null && ribbonItems[hoveredIndex]?.post) {
      const hoveredPost = ribbonItems[hoveredIndex].post;
      if (hoveredPost.id !== lastActivePostIdRef.current) {
        lastActivePostIdRef.current = hoveredPost.id;
        onActiveItemChange?.(hoveredPost);
      }
    }
  }, [hoveredIndex, ribbonItems, onActiveItemChange]);

  // Animation frame loop with physics tuned by user
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (!isDraggingRef.current) {
        // Auto drift when not hovering any card
        if (!isHoveredRef.current && Math.abs(velocityRef.current) < 0.005) {
          targetOffsetRef.current += 0.0032;
        }

        // Apply velocity decay with momentum
        if (Math.abs(velocityRef.current) > 0.0001) {
          targetOffsetRef.current += velocityRef.current;
          velocityRef.current *= 0.75;
        }
      }

      // Snappy lerp towards target offset
      const diff = targetOffsetRef.current - offsetRef.current;
      offsetRef.current += diff * 0.70;

      // Update active item in motion if not hovering a specific card
      if (totalItems > 0 && isHoveredRef.current === false) {
        const roundedIndex = ((Math.round(offsetRef.current) % totalItems) + totalItems) % totalItems;
        const currentPost = ribbonItems[roundedIndex]?.post;
        if (currentPost && currentPost.id !== lastActivePostIdRef.current) {
          lastActivePostIdRef.current = currentPost.id;
          onActiveItemChange?.(currentPost);
        }
      }

      setTick((t) => (t + 1) % 100000);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [totalItems, ribbonItems, onActiveItemChange]);

  // Drag handlers with clean click vs drag threshold
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    // Detect actual drag movement (> 5px)
    const dist = Math.hypot(e.clientX - startXRef.current, e.clientY - startYRef.current);
    if (dist > 5) {
      hasDraggedRef.current = true;
      isDraggingRef.current = true;
    }

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;

      // Fast, responsive offset delta
      const offsetDelta = -deltaX / (isMobile ? 150 : 210);
      targetOffsetRef.current += offsetDelta;
      velocityRef.current = offsetDelta;
    }
  }, [isMobile]);

  const handlePointerUp = useCallback(() => {
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
  }, []);

  // Dedicated Card Click Handler (Guarantees click works when not actively dragging)
  const handleCardClick = useCallback((e: React.MouseEvent, post: BlogPost) => {
    if (hasDraggedRef.current) return;
    e.stopPropagation();
    velocityRef.current = 0;
    onSelectPost(post);
  }, [onSelectPost]);

  // Responsive wheel / trackpad scrub
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 4) {
      targetOffsetRef.current += (delta / 220) * 0.55;
    }
  }, []);

  // Step buttons
  const handleStep = useCallback((direction: "prev" | "next") => {
    const step = direction === "next" ? 1 : -1;
    targetOffsetRef.current = Math.round(targetOffsetRef.current) + step;
    velocityRef.current = 0;
  }, []);

  if (totalItems === 0) return null;

  const currentOffset = offsetRef.current;

  // Spacing parameters along the 3D helical arc
  const spacing = isMobile ? 290 : 370;
  const curveYRate = isMobile ? 70 : 95;
  const curveZRate = isMobile ? 120 : 165;

  return (
    <div className="relative w-full overflow-hidden select-none py-4 sm:py-8">
      {/* 3D Perspective Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: isMobile ? "900px" : "1300px",
          transformStyle: "preserve-3d",
        }}
      >
        {ribbonItems.map((item, index) => {
          // Normalize relative position around 0 within [-totalItems/2, totalItems/2]
          let s = ((index - currentOffset) % totalItems + totalItems) % totalItems;
          if (s > totalItems / 2) {
            s -= totalItems;
          }

          // Cull items outside the visible curve range
          const isVisible = Math.abs(s) <= 4.2;
          if (!isVisible) return null;

          const isHovered = hoveredIndex === index;

          // Helical / Cylindrical Arc Math:
          const posX = s * spacing;
          const posY = -s * curveYRate + (s * s * (isMobile ? 12 : 16));
          const posZ = -s * curveZRate - (Math.abs(s) * (isMobile ? 35 : 55)) + (isHovered ? 130 : 0);

          const rotY = isHovered ? 0 : -s * (isMobile ? 18 : 22);
          const rotZ = isHovered ? 0 : -10 + s * 3.5;
          const rotX = isHovered ? 0 : 4 - s * 2.2;
          const scale = isHovered ? (isMobile ? 1.12 : 1.18) : Math.max(0.72, 1 - Math.abs(s) * 0.07);

          // Z-index calculation
          const zIndex = isHovered ? 120 : Math.round(100 - posZ / 10);

          // Opacity fades gracefully at ribbon extremities
          const opacity = Math.min(1, Math.max(0, 1 - (Math.abs(s) - 2.8) * 0.7));

          const theme = CARD_THEMES[item.themeIndex];
          const post = item.post;

          return (
            <div
              key={item.uniqueId}
              onMouseEnter={() => {
                isHoveredRef.current = true;
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                setHoveredIndex(null);
              }}
              onClick={(e) => handleCardClick(e, post)}
              className="absolute will-change-transform transition-shadow duration-300 cursor-pointer pointer-events-auto"
              style={{
                transform: `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
                transition: isDraggingRef.current
                  ? "box-shadow 0.25s ease, opacity 0.2s ease"
                  : "transform 0.15s ease-out, box-shadow 0.3s ease, opacity 0.2s ease",
              }}
            >
              {/* Card Container */}
              <div
                className={`relative w-[280px] sm:w-[330px] md:w-[350px] h-[220px] sm:h-[245px] md:h-[260px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${theme.bg}`}
                style={{
                  boxShadow: isHovered
                    ? "0 35px 70px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.3)"
                    : "0 20px 40px -12px rgba(0, 0, 0, 0.35)",
                }}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />

                {/* Top Bar: Kicker / Tag & Action Arrow */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase border backdrop-blur-sm ${theme.badgeBg}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {post.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-widest opacity-60 uppercase">
                      {theme.displayYear}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleCardClick(e, post)}
                      aria-label={`Read ${post.title}`}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 cursor-pointer ${
                        isHovered ? "scale-110 rotate-45 bg-white text-black" : "bg-black/20 text-current"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Center */}
                <div className="relative z-10 my-auto pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase opacity-70 mb-1">
                    <span>{theme.kicker}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3
                    className={`text-base sm:text-lg md:text-xl font-bold leading-tight line-clamp-2 tracking-tight ${theme.textPrimary}`}
                  >
                    {post.title}
                  </h3>

                  {post.highlightMetric && (
                    <div className="mt-2.5 inline-flex items-baseline gap-1.5 px-2.5 py-0.5 rounded-md bg-black/20 backdrop-blur-sm border border-white/10">
                      <span className="font-black text-xs sm:text-sm text-white tracking-tight">
                        {post.highlightMetric.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] opacity-75 font-mono uppercase">
                        {post.highlightMetric.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Bottom */}
                <div className="relative z-10 flex items-center justify-between border-t border-current/15 pt-2.5 text-[11px]">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono tracking-tight opacity-75 truncate max-w-[100px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleCardClick(e, post)}
                    className={`font-mono text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 transition-opacity cursor-pointer ${
                      isHovered ? "opacity-100 underline underline-offset-4" : "opacity-80"
                    }`}
                  >
                    READ ARTICLE →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls & Drag Hint */}
      <div className="relative z-20 mt-4 flex items-center justify-between px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Navigation Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleStep("prev")}
            aria-label="Previous card"
            className="w-9 h-9 rounded-full border border-border bg-card/60 hover:bg-card text-foreground flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleStep("next")}
            aria-label="Next card"
            className="w-9 h-9 rounded-full border border-border bg-card/60 hover:bg-card text-foreground flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Drag Scrubber Hint */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-muted-foreground uppercase select-none">
          <span className="inline-block w-8 h-[1px] bg-border" />
          <span>DRAG OR SCROLL TO ROTATE RIBBON</span>
          <span className="inline-block w-8 h-[1px] bg-border" />
        </div>

        {/* Post Counter Badge */}
        <div className="font-mono text-xs text-muted-foreground">
          <span>{posts.length} ARTICLES IN ROTATION</span>
        </div>
      </div>
    </div>
  );
};

export default CurvedRibbonCarousel;
