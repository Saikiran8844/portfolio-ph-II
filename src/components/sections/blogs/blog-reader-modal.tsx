"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Calendar,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  Bookmark,
  Share2,
  TrendingUp,
} from "lucide-react";
import { BlogPost } from "@/data/blogs-data";
import { toast } from "sonner";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-3xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-2xl"
        >
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: post.accentColor }}
          />

          {/* Sticky Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-border/40 px-6 py-4 shrink-0 bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-mono font-medium"
                style={{
                  borderColor: `${post.accentColor}40`,
                  backgroundColor: `${post.accentColor}15`,
                  color: post.accentColor,
                }}
              >
                <Sparkles className="size-3" />
                {post.category}
              </span>
              <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-muted-foreground/70">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {post.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="rounded-lg border border-border/60 p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                title="Share Article"
                aria-label="Share article"
              >
                <Share2 className="size-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-border/60 p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Article Body */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 scrollbar-thin">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
                {post.title}
              </h2>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {post.subtitle}
              </p>
            </div>

            {/* Highlight Metric Banner */}
            {post.highlightMetric && (
              <div className="flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <TrendingUp className="size-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-foreground">
                    {post.highlightMetric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {post.highlightMetric.label}
                  </div>
                </div>
              </div>
            )}

            {/* Key Takeaways Box */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
              <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-3">
                <Bookmark className="size-3.5" />
                Key Strategic Takeaways
              </h3>
              <ul className="space-y-2">
                {post.keyTakeaways.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed"
                  >
                    <span className="flex size-4 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0 mt-0.5 text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Article Content */}
            <div className="space-y-5 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground/90 border-l-2 border-primary/50 pl-4 italic">
                {post.content.intro}
              </p>

              {post.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {section.heading}
                  </h3>
                  <p>{section.body}</p>

                  {/* Code Snippet Box */}
                  {section.codeSnippet && (
                    <div className="relative mt-3 rounded-xl border border-border/70 bg-zinc-950 p-4 font-mono text-xs text-zinc-200 overflow-x-auto">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
                        <span className="text-[11px] text-zinc-500">Code Architecture</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(section.codeSnippet!)}
                          className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="size-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs leading-relaxed text-emerald-400/95">
                        {section.codeSnippet}
                      </pre>
                    </div>
                  )}

                  {/* Bullet Tips */}
                  {section.tips && (
                    <ul className="space-y-1.5 pt-2">
                      {section.tips.map((tip, tIdx) => (
                        <li
                          key={tIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-0.5">❯</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5 mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Bottom Line
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {post.content.conclusion}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                  SN
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Saikiran Nannapaneni
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Software Engineer &amp; Shopify Builder
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer"
              >
                <span>Done Reading</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
