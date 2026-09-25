"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  Check,
  Copy,
  Bookmark,
  Share2,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { BlogPost } from "@/data/blogs-data";
import { toast } from "sonner";
import { useLenis } from "lenis/react";

const RED = "oklch(59.71% 0.23 23.86)";
const RED_RGBA = "rgba(201, 58, 42,";

const CORNERS = [
  { id: "tl", top: 24, left: 24 },
  { id: "tr", top: 24, right: 24 },
  { id: "bl", bottom: 24, left: 24 },
  { id: "br", bottom: 24, right: 24 },
] as const;

interface BlogReaderModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Track reading scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = target.scrollTop / (target.scrollHeight - target.clientHeight);
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  };

  if (!isOpen || !post) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}#blogs`);
      toast.success("Article link copied!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-210 overflow-y-auto"
          style={{ background: "#080808" }}
          aria-modal="true"
          role="dialog"
          aria-label="Article Reader"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onScroll={handleScroll}
          ref={containerRef}
        >
          {/* Reading Progress Bar at the Very Top */}
          <div
            className="fixed top-0 left-0 right-0 h-1 z-30 transition-all duration-150 pointer-events-none"
            style={{
              width: `${scrollProgress * 100}%`,
              backgroundColor: RED,
            }}
          />

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
          {CORNERS.map((c) => (
            <div
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
            />
          ))}

          {/* Scrollable Article Layout */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between max-w-4xl mx-auto px-6 sm:px-12 py-8 sm:py-10">
            {/* Top Navigation & Action Bar */}
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
                  ✦ {post.category} // TECHNICAL ESSAY
                </span>
              </div>

              {/* Actions & CollabModal Close Button */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 text-white/40 hover:text-white transition-colors cursor-pointer"
                  title="Share Article Link"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-3 cursor-pointer group"
                  style={{ background: "none", border: "none", padding: 0 }}
                  aria-label="Close article"
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
            </div>

            {/* Thin Top Rule */}
            <div
              className="w-full mb-10 shrink-0"
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            {/* Article Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>

              {/* Giant Kinetic Article Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-4">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal mb-6">
                {post.subtitle}
              </p>

              {/* Tags Bar */}
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlight Metric Banner (if available) */}
            {post.highlightMetric && (
              <div
                className="mb-10 flex items-center gap-5 p-6 rounded-2xl border"
                style={{
                  borderColor: `${RED_RGBA} 0.35)`,
                  backgroundColor: `${RED_RGBA} 0.07)`,
                }}
              >
                <div
                  className="flex w-14 h-14 items-center justify-center rounded-xl shrink-0"
                  style={{
                    backgroundColor: `${RED_RGBA} 0.18)`,
                    color: RED,
                  }}
                >
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight leading-none mb-1">
                    {post.highlightMetric.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/60">
                    {post.highlightMetric.label}
                  </div>
                </div>
              </div>
            )}

            {/* Key Strategic Takeaways Box */}
            <div className="mb-12 rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8">
              <h3
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] font-bold mb-5"
                style={{ color: RED }}
              >
                <Bookmark className="w-4 h-4" />
                Key Strategic Takeaways
              </h3>
              <ul className="space-y-4">
                {post.keyTakeaways.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 text-xs sm:text-sm text-white/85 leading-relaxed"
                  >
                    <span
                      className="flex w-5 h-5 items-center justify-center rounded-full shrink-0 mt-0.5 text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${RED_RGBA} 0.22)`,
                        color: "#ffffff",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Article Body */}
            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-white/75 pb-16">
              {/* Executive Intro */}
              <p
                className="font-medium text-white/95 pl-5 italic leading-relaxed text-base sm:text-lg"
                style={{ borderLeft: `3px solid ${RED}` }}
              >
                {post.content.intro}
              </p>

              {/* Sections */}
              {post.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4 pt-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                    {section.heading}
                  </h3>
                  <p className="leading-relaxed text-white/70">{section.body}</p>

                  {/* Architecture Code Snippet Terminal */}
                  {section.codeSnippet && (
                    <div className="relative mt-4 rounded-xl border border-white/10 bg-[#040404] p-5 font-mono text-xs overflow-x-auto shadow-2xl">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] text-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500/70" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                          <span className="w-2 h-2 rounded-full bg-green-500/70" />
                          <span className="ml-2">ARCHITECTURE SNIPPET</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopy(section.codeSnippet!)}
                          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-white/60"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>COPY CODE</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-neutral-200 overflow-x-auto leading-relaxed">
                        <code>{section.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Implementation Tips */}
                  {section.tips && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                      <div
                        className="text-[10px] font-mono uppercase tracking-widest font-bold mb-3"
                        style={{ color: RED }}
                      >
                        PRODUCTION TIPS & HEURISTICS
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                        {section.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2.5">
                            <span style={{ color: RED }}>✦</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Conclusion Block */}
              <div
                className="rounded-2xl border p-6 sm:p-8 mt-8"
                style={{
                  borderColor: `${RED_RGBA} 0.35)`,
                  backgroundColor: `${RED_RGBA} 0.05)`,
                }}
              >
                <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 mb-3 font-bold">
                  CONCLUSION & OUTLOOK
                </h4>
                <p className="text-white/95 leading-relaxed text-sm sm:text-base font-normal">
                  {post.content.conclusion}
                </p>
              </div>
            </div>

            {/* Bottom Navigation & Close Footer */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-white/60 hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>RETURN TO ARCHIVE</span>
              </button>

              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                ENGINEERING INTELLIGENCE // SAIKIRAN N.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogReaderModal;
