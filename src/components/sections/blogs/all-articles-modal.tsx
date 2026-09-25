"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { BlogPost } from "@/data/blogs-data";
import { useLenis } from "lenis/react";

const RED = "oklch(59.71% 0.23 23.86)";
const RED_RGBA = "rgba(201, 58, 42,";

const CORNERS = [
  { id: "tl", top: 24, left: 24 },
  { id: "tr", top: 24, right: 24 },
  { id: "bl", bottom: 24, left: 24 },
  { id: "br", bottom: 24, right: 24 },
] as const;

const ARCHIVE_WORDS = [
  { text: "TECHNICAL", accent: false },
  { text: "ARCHIVE.", accent: true },
  { text: "SYSTEMS", accent: false },
  { text: "INDEX.", accent: true },
];

interface AllArticlesModalProps {
  posts: BlogPost[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const AllArticlesModal: React.FC<AllArticlesModalProps> = ({
  posts,
  isOpen,
  onClose,
  onSelectPost,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [focusedSearch, setFocusedSearch] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();

  // Escape key + body scroll lock + Lenis stop/start (Fixes scroll triggering main page)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, onClose, lenis]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [posts]);

  // Filter posts by search query and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-200 overflow-y-auto"
          style={{ background: "#080808" }}
          aria-modal="true"
          role="dialog"
          aria-label="All Articles Archive"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          ref={scrollContainerRef}
        >
          {/* Subtle Fractal Noise Grain Overlay (CollabModal signature) */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px",
            }}
          />

          {/* Red Corner Brackets (CollabModal signature) */}
          {CORNERS.map((c, i) => (
            <motion.div
              key={c.id}
              aria-hidden="true"
              className="fixed w-9 h-9 z-20 pointer-events-none hidden sm:block"
              style={{
                ...("top" in c ? { top: (c as { top: number }).top } : {}),
                ...("bottom" in c ? { bottom: (c as { bottom: number }).bottom } : {}),
                ...("left" in c ? { left: (c as { left: number }).left } : {}),
                ...("right" in c ? { right: (c as { right: number }).right } : {}),
                borderTop: c.id.includes("t") ? `1px solid ${RED_RGBA} 0.5)` : "none",
                borderBottom: c.id.includes("b") ? `1px solid ${RED_RGBA} 0.5)` : "none",
                borderLeft: c.id.includes("l") ? `1px solid ${RED_RGBA} 0.5)` : "none",
                borderRight: c.id.includes("r") ? `1px solid ${RED_RGBA} 0.5)` : "none",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
            />
          ))}

          {/* Full Scrollable Container */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-10">
            {/* Top Bar: Kicker + Animated Close Button */}
            <div className="flex items-center justify-between pb-6">
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: RED }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: RED,
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  ✦ SAIKIRAN // TECHNICAL INDEX ({posts.length} PUBLICATIONS)
                </span>
              </div>

              {/* CollabModal Signature Animated Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-3 cursor-pointer group"
                style={{ background: "none", border: "none", padding: 0 }}
                aria-label="Close archive catalog"
              >
                <span
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    transition: "color 0.2s",
                  }}
                  className="group-hover:text-white"
                >
                  CLOSE
                </span>
                <span
                  className="text-lg leading-none transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
                  style={{ color: RED }}
                >
                  ✕
                </span>
              </button>
            </div>

            {/* Thin Top Rule */}
            <div
              className="w-full mb-8 shrink-0"
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            {/* Header Content: Kinetic Typography + Underline Search */}
            <div className="mb-10">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4 select-none">
                {ARCHIVE_WORDS.map((w, idx) => (
                  <span
                    key={idx}
                    className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none"
                    style={{ color: w.accent ? RED : "#ffffff" }}
                  >
                    {w.text}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-mono text-white/50 tracking-wider uppercase mb-8 max-w-2xl leading-relaxed">
                ENGINEERING ARCHITECTURES SPANNING CONTEXT CACHING, HIGH-SPEED SHOPIFY LIQUID,
                HEAD-OF-LINE BLOCKING, CONTINUOUS PROFILING, AND MODEL ROUTING.
              </p>

              {/* CollabModal Signature Underline Search Input */}
              <div className="relative w-full max-w-2xl">
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-poppins)",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: "8px",
                  }}
                >
                  SEARCH ARCHIVE // KEYWORD, ARCHITECTURE, TAG
                </label>

                <div
                  className="flex items-center transition-all duration-300"
                  style={{
                    borderBottom: focusedSearch
                      ? `1px solid ${RED}`
                      : "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <Search
                    className="w-4 h-4 mr-3 shrink-0 transition-colors"
                    style={{ color: focusedSearch ? RED : "rgba(255,255,255,0.4)" }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setFocusedSearch(true)}
                    onBlur={() => setFocusedSearch(false)}
                    placeholder="Type to filter e.g. 'caching', 'HTTP/3', 'Shopify', 'profiling'..."
                    className="w-full bg-transparent border-none outline-none py-2 text-sm sm:text-base text-white placeholder:text-white/25 font-mono"
                    style={{ caretColor: RED }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white px-2 py-1 cursor-pointer"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Tags */}
              <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
                <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase mr-1 shrink-0">
                  TOPICS:
                </span>
                {allTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 shrink-0 cursor-pointer border ${
                        isSelected
                          ? `border-[${RED}] text-white font-semibold`
                          : "border-white/10 text-white/50 hover:text-white hover:border-white/30 bg-white/[0.02]"
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${RED_RGBA} 0.18)` : undefined,
                        borderColor: isSelected ? RED : undefined,
                        color: isSelected ? "#ffffff" : undefined,
                      }}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
              {filteredPosts.length === 0 ? (
                <div className="col-span-full py-20 text-center font-mono text-xs tracking-widest text-white/40 uppercase">
                  NO PUBLICATIONS FOUND MATCHING &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      onClose();
                      onSelectPost(post);
                    }}
                    className="group relative p-6 sm:p-7 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-red-500/60 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                    style={{
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
                    }}
                  >
                    {/* Hover Red Ambient Corner Glow */}
                    <div
                      className="absolute -right-16 -top-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: RED }}
                    />

                    <div>
                      {/* Top Meta: Category + Clock */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                          style={{
                            borderColor: `${RED_RGBA} 0.35)`,
                            backgroundColor: `${RED_RGBA} 0.08)`,
                            color: "#ffffff",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: RED }}
                          />
                          {post.category}
                        </span>

                        <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white/95 leading-snug tracking-tight mb-2 transition-colors">
                        {post.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-white/50 line-clamp-3 leading-relaxed mb-5 font-normal">
                        {post.summary}
                      </p>
                    </div>

                    {/* Bottom: Highlight Metric & Read CTA */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                      {post.highlightMetric ? (
                        <div className="inline-flex items-baseline gap-1.5 px-2.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono border border-white/5">
                          <span className="font-bold text-white">
                            {post.highlightMetric.value}
                          </span>
                          <span className="text-[9px] text-white/40 uppercase">
                            {post.highlightMetric.label}
                          </span>
                        </div>
                      ) : (
                        <div />
                      )}

                      {/* Read Link with Rotating Arrow */}
                      <div
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium transition-all duration-300"
                        style={{ color: "#ffffff" }}
                      >
                        <span className="group-hover:underline underline-offset-4">READ ESSAY</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45"
                          style={{ color: RED }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Status Footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/40 uppercase">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: RED }}
                />
                <span>SHOWING {filteredPosts.length} OF {posts.length} PUBLICATIONS</span>
              </div>

              <span>PRESS ESC TO CLOSE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllArticlesModal;
