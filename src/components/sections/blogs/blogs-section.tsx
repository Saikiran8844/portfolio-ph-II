"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BLOGS_DATA, BlogPost } from "@/data/blogs-data";
import { BlogReaderModal } from "./blog-reader-modal";
import { AllArticlesModal } from "./all-articles-modal";
import { CurvedRibbonCarousel } from "./curved-ribbon-carousel";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

// Dynamic kinetic headlines tailored to each relevant article
const KINETIC_HEADLINES: Record<
  string,
  { top: string; bottom: string; tagline: string }
> = {
  "context-caching-kv-state": {
    top: "CONTEXT",
    bottom: "CACHING",
    tagline: "DESIGN IN MOTION // PREFIX CACHING & DETERMINISTIC KV ATTENTION MASKING.",
  },
  "head-of-line-blocking": {
    top: "HEAD OF LINE",
    bottom: "BLOCKING",
    tagline: "DESIGN IN MOTION // HTTP/2 MULTIPLEXING VS HTTP/3 QUIC UDP ISOLATION.",
  },
  "llm-constrained-decoding": {
    top: "CONSTRAINED",
    bottom: "DECODING",
    tagline: "DESIGN IN MOTION // DETERMINISTIC FSM LOGIT MASKING AT ZERO LATENCY.",
  },
  "continuous-profiling": {
    top: "CONTINUOUS",
    bottom: "PROFILING",
    tagline: "DESIGN IN MOTION // SAMPLING KERNEL & USERSPACE STACKS VIA EBPF.",
  },
  "model-routing": {
    top: "MODEL",
    bottom: "ROUTING",
    tagline: "DESIGN IN MOTION // CASCADE ARCHITECTURES FROM SLMS TO FRONTIER LLMS.",
  },
  "shopify-cro-speed": {
    top: "HIGH-SPEED",
    bottom: "SHOPIFY",
    tagline: "DESIGN IN MOTION // CUSTOM LIQUID PIPELINES & SUB-SECOND CORE WEB VITALS.",
  },
  "headless-shopify-nextjs": {
    top: "HEADLESS",
    bottom: "COMMERCE",
    tagline: "DESIGN IN MOTION // NEXT.JS 15 STOREFRONT API & EDGE REVALIDATION.",
  },
  "ecommerce-cro-playbook": {
    top: "CONVERSION",
    bottom: "PSYCHOLOGY",
    tagline: "DESIGN IN MOTION // TACTICAL UI FRICTION REDUCTION & CART RETENTION.",
  },
  "react19-supabase-systems": {
    top: "REACT 19",
    bottom: "SUPABASE",
    tagline: "DESIGN IN MOTION // POSTGRES RLS SECURITY & CRYPTOGRAPHIC DOSSIERS.",
  },
  "retention-email-marketing": {
    top: "RETENTION",
    bottom: "ENGINEERING",
    tagline: "DESIGN IN MOTION // POST-PURCHASE LIFECYCLE HOOKS & VIP REPEAT CYCLES.",
  },
  "streaming-ai-lowlatency": {
    top: "STREAMING",
    bottom: "AI AGENTS",
    tagline: "DESIGN IN MOTION // SERVER-SENT EVENTS & LOW-LATENCY AUDIO SYNTHESIS.",
  },
};

export const BlogsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activePostInMotion, setActivePostInMotion] = useState<BlogPost>(BLOGS_DATA[0]);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post);
    setIsReaderOpen(true);
  };

  // Extract kinetic words for the relevant active item in motion
  const kinetic =
    (activePostInMotion && KINETIC_HEADLINES[activePostInMotion.id]) || {
      top: "DESIGN IN",
      bottom: "MOTION",
      tagline: "DESIGN IN MOTION // EXPLORING ARCHITECTURE THROUGH DAILY ENGINEERING PRACTICE.",
    };

  return (
    <motion.section
      id="blogs"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative flex w-full flex-col justify-between min-h-[820px] lg:min-h-[880px] py-12 sm:py-16 overflow-hidden scroll-mt-24 bg-background text-foreground transition-colors duration-500"
    >
      {/* Background Architectural Vector Arcs (exact match to reference) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 dark:opacity-15 stroke-current text-foreground/20 -z-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -100 220 C 380 100, 950 180, 1540 70"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M -80 720 C 500 840, 1020 660, 1540 560"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M 100 60 C 500 240, 1100 90, 1480 320"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Subtle Studio Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03] pointer-events-none -z-10" />

      {/* Top Controls Bar: Kicker Badge & Direct Index Counter */}
      <div className="relative z-30 w-full max-w-7xl px-4 sm:px-8 mx-auto flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-foreground/5 text-foreground border border-border backdrop-blur-sm">
          <Sparkles className="w-3 h-3 text-amber-500" />
          PUBLICATIONS & LABS
        </span>

        <button
          type="button"
          onClick={() => setIsArchiveOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-muted-foreground hover:text-foreground bg-foreground/5 hover:bg-foreground/10 border border-border/60 transition-all cursor-pointer"
        >
          <BookOpen className="w-3 h-3" />
          <span>INDEX [{BLOGS_DATA.length} ESSAYS]</span>
        </button>
      </div>

      {/* GIANT KINETIC BACKGROUND TYPOGRAPHY (Dynamically updates to the relevant item in motion) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Top Word + Kinetic Tagline */}
        <div className="w-full flex flex-col items-end pt-4 sm:pt-8 pr-2 sm:pr-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={kinetic.top}
              initial={{ opacity: 0, y: -25, filter: "blur(6px)" }}
              animate={{ opacity: 0.8, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black uppercase tracking-tighter leading-none select-none text-foreground/80 transition-opacity"
            >
              {kinetic.top}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={kinetic.tagline}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-[10px] sm:text-xs md:text-sm font-mono tracking-widest uppercase text-muted-foreground mt-2 text-right max-w-xl"
            >
              {kinetic.tagline}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom Word */}
        <div className="w-full flex items-baseline justify-start pb-12 sm:pb-16 pl-2 sm:pl-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={kinetic.bottom}
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={{ opacity: 0.8, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black uppercase tracking-tighter leading-none select-none text-foreground/80 transition-opacity"
            >
              {kinetic.bottom}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      {/* FOREGROUND 3D RIBBON (Layered directly in front of the giant typography) */}
      <div className="relative z-10 w-full my-auto">
        <CurvedRibbonCarousel
          posts={BLOGS_DATA}
          onSelectPost={handleOpenPost}
          onActiveItemChange={setActivePostInMotion}
        />
      </div>

      {/* Bottom Metadata & Action Bar (exact placement matching reference) */}
      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-8 mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-border">
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-md">
          Concepts, explorations, and interface experiments shared openly as part
          of our creative process.
        </p>

        {/* VIEW ALL ARTICLES Button - Opens full archive catalog */}
        <button
          type="button"
          onClick={() => setIsArchiveOpen(true)}
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold text-foreground hover:opacity-80 transition-all cursor-pointer border-b border-foreground/60 pb-0.5"
        >
          <span>VIEW ALL ARTICLES ({BLOGS_DATA.length})</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Full Article Reader Modal (Reads individual article) */}
      <BlogReaderModal
        post={activePost}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />

      {/* All Articles Archive Modal (Shows all 11 articles in full catalog) */}
      <AllArticlesModal
        posts={BLOGS_DATA}
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectPost={handleOpenPost}
      />
    </motion.section>
  );
};

export default BlogsSection;
