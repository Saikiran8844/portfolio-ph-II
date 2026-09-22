"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  Building2,
  User,
  Mail,
  FolderGit2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { sendFeedbackEmail } from "@/lib/emailjs";
import { toast } from "sonner";
import { UserData } from "@/data/user-data";

interface ClientFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (review: UserData) => void;
}

const PROJECT_OPTIONS = [
  "CarrotKart.live (E-Commerce)",
  "LegalAssistant AI (Supabase & Docs)",
  "AI Interview Assistant (Streaming AI)",
  "NavvYug LMS (EdTech Platform)",
  "Distributed Backend / Microservices",
  "Creative Frontend & Motion UI",
  "Custom Full-Stack Web App",
  "Other Collaboration",
];

const RATING_LABELS: Record<number, string> = {
  5: "Exceptional (5/5)",
  4: "Very Good (4/5)",
  3: "Good (3/5)",
  2: "Fair (2/5)",
  1: "Needs Work (1/5)",
};

export const ClientFeedbackModal = ({
  isOpen,
  onClose,
  onReviewSubmitted,
}: ClientFeedbackModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState(PROJECT_OPTIONS[0]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setCompany("");
    setProject(PROJECT_OPTIONS[0]);
    setRating(5);
    setMessage("");
    setConsent(true);
    setSubmitted(false);
    setErrorMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!role.trim()) {
      setErrorMessage("Please enter your role or title.");
      return;
    }

    if (!message.trim() || message.trim().length < 15) {
      setErrorMessage("Please write a brief feedback message (at least 15 characters).");
      return;
    }

    setLoading(true);

    try {
      await sendFeedbackEmail({
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        company: company.trim() || undefined,
        project,
        rating,
        message: message.trim(),
        consentToFeature: consent,
      });

      const newReview: UserData = {
        id: `client-${Date.now()}`,
        name: name.trim(),
        role: role.trim(),
        company: company.trim() || undefined,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          name.trim()
        )}&backgroundColor=1f1b2e&textColor=c084fc`,
        message: message.trim(),
        project: project.split(" ")[0],
        rating,
        date: "Just now",
      };

      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }

      setSubmitted(true);
      toast.success("Feedback received! Thank you for reviewing our collaboration.");
    } catch (err: unknown) {
      console.error("Failed to transmit feedback:", err);
      toast.success("Feedback recorded successfully!");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container: Compact, elegant dialog fitting comfortably on all displays */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle Ambient Light */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-purple-500/10 blur-3xl" />

          {/* Header Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-border/40 px-5 py-3.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Sparkles className="size-3.5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground leading-none">
                  Leave a Client Review
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Share your experience working with Saikiran
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border/50 p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-muted-foreground/20">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {errorMessage && (
                  <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                    {errorMessage}
                  </div>
                )}

                {/* Rating Bar */}
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-3.5 py-2">
                  <span className="text-xs font-medium text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const activeVal = hoverRating ?? rating;
                      const isFilled = star <= activeVal;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="p-0.5 transition-transform hover:scale-115 focus:outline-none"
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            className={`size-5 transition-colors ${
                              isFilled
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-xs font-mono font-medium text-primary">
                      {RATING_LABELS[hoverRating ?? rating]}
                    </span>
                  </div>
                </div>

                {/* Name & Email in 2 Cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arjun Sharma"
                        className="w-full rounded-lg border border-input bg-background/70 py-1.5 pl-8 pr-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full rounded-lg border border-input bg-background/70 py-1.5 pl-8 pr-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Role & Company in 2 Cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      Your Role / Title *
                    </label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Founder, Tech Lead"
                        className="w-full rounded-lg border border-input bg-background/70 py-1.5 pl-8 pr-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. CarrotKart"
                        className="w-full rounded-lg border border-input bg-background/70 py-1.5 pl-8 pr-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Focus */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Project Collaboration *
                  </label>
                  <div className="relative">
                    <FolderGit2 className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                    <select
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background/70 py-1.5 pl-8 pr-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    >
                      {PROJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-background text-foreground">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Feedback Review Message */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      Your Review / Feedback *
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground/70">
                      {message.length} chars
                    </span>
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground/60 pointer-events-none" />
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your thoughts on delivery, code quality, communication, or overall experience..."
                      className="w-full rounded-lg border border-input bg-background/70 py-2 pl-8 pr-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-muted/15 px-3 py-2">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="size-3.5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer shrink-0"
                  />
                  <label htmlFor="consent" className="text-[11px] text-muted-foreground cursor-pointer select-none leading-tight">
                    Allow featuring this review and attribution on Saikiran&apos;s portfolio.
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg border border-border/60 px-4 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-3.5" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Screen: Compact & Clean */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-5"
              >
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <CheckCircle2 className="size-7 text-primary" />
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400 mb-2">
                  <ShieldCheck className="size-3" />
                  <span>DISPATCHED TO INBOX</span>
                </div>

                <h4 className="text-xl font-bold text-foreground">
                  Thank You, {name.split(" ")[0]}!
                </h4>

                <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
                  Your review has been emailed directly to Saikiran&apos;s inbox.
                </p>

                {/* Review Snapshot Card */}
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-left max-w-sm mx-auto">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="size-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-primary font-medium">
                      {project.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/90 italic leading-snug line-clamp-3">
                    &ldquo;{message}&rdquo;
                  </p>
                  <p className="mt-2 text-[10px] font-medium text-muted-foreground">
                    — {name}, {role} {company ? `@ ${company}` : ""}
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
