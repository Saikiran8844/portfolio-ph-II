"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PhraseAnimation from "@/components/common/phrase-reveal";
import { OrbitalConstellation } from "./testimonials/orbital-constellation";
import { ClientFeedbackModal } from "./testimonials/client-feedback-modal";
import { userData, UserData } from "@/data/user-data";
import {
  MessageSquarePlus,
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<UserData[]>(userData);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  const handleReviewSubmitted = (newReview: UserData) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <motion.section
      id="testimonials"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden scroll-mt-24"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[450px] bg-primary/15 blur-[140px] rounded-full pointer-events-none -z-10 opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] -z-20 opacity-40" />

      <div
        ref={headerRef}
        className="container relative z-10 mb-14 px-4 sm:px-6 text-center mx-auto max-w-4xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-mono font-medium text-primary uppercase tracking-widest flex items-center gap-1.5"
        >
          <Sparkles className="size-3 text-primary animate-pulse" />
          <span>Wall of Trust &amp; Reviews</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            <PhraseAnimation phrase="Trusted by Founders &amp;" className="" />
            <span className="block bg-gradient-to-r from-foreground via-primary/90 to-muted-foreground bg-clip-text text-transparent">
              <PhraseAnimation phrase="Engineering Leaders" className="text-primary" />
            </span>
          </h3>
        </motion.div>

        {/* Horizontal rule sweep */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="mx-auto mt-6 h-px max-w-xs bg-linear-to-r from-primary/60 via-primary/20 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground"
        >
          Collaborating with innovative teams on e-commerce, cloud architectures, and generative AI. Here is what partners say about our code and delivery.
        </motion.p>

        {/* Trust Badges + Client Review CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Rating Pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-3.5 py-1.5 text-xs font-mono text-foreground backdrop-blur-sm">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold">5.0 / 5.0</span>
            <span className="text-muted-foreground/60">&middot; Verified Reviews</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-3.5 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur-sm">
            <ShieldCheck className="size-3.5 text-primary" />
            <span>100% On-Time Delivery</span>
          </div>

          {/* Action: Open Feedback Form */}
          <button
            type="button"
            onClick={() => setFeedbackModalOpen(true)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-xs sm:text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 active:scale-98 cursor-pointer"
          >
            <MessageSquarePlus className="size-4 transition-transform group-hover:scale-110" />
            <span>Leave a Client Review</span>
          </button>
        </motion.div>
      </div>

      {/* Testimonials Orbital Constellation Graph */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6"
      >
        <OrbitalConstellation
          reviews={reviews}
          onOpenFeedback={() => setFeedbackModalOpen(true)}
        />
      </motion.div>

      {/* Interactive Client Review / Feedback Modal */}
      <ClientFeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </motion.section>
  );
};

export default Testimonials;
