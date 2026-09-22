"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BLOGS_DATA, BlogPost } from "@/data/blogs-data";
import { BlogReaderModal } from "./blog-reader-modal";
import { KineticPlaybookHeading } from "./kinetic-playbook-heading";
import { GsapBlogCard } from "./gsap-blog-card";
import { useMotionPreference } from "@/providers/motion-provider";

type CategoryFilter = "All" | "Shopify Dev" | "Software Dev" | "Growth & Marketing";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Shopify Dev",
  "Software Dev",
  "Growth & Marketing",
];

export const BlogsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isReducedMotion } = useMotionPreference();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  const filteredPosts =
    selectedCategory === "All"
      ? BLOGS_DATA
      : BLOGS_DATA.filter((post) => post.category === selectedCategory);

  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post);
    setIsModalOpen(true);
  };

  // GSAP 3D Isometric Deck Entrance Animation on Filter or Scroll
  useGSAP(
    () => {
      if (!gridRef.current || isReducedMotion) return;

      const cards = gridRef.current.querySelectorAll(".gsap-card-wrapper");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            rotationX: -18,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      }
    },
    { scope: gridRef, dependencies: [selectedCategory, isReducedMotion] }
  );

  return (
    <motion.section
      id="blogs"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative flex w-full flex-col items-center justify-center py-20 sm:py-28 overflow-hidden scroll-mt-24"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-primary/15 blur-[150px] rounded-full pointer-events-none -z-10 opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] -z-20 opacity-30" />

      {/* Header with Kinetic Decryption & 3D Stagger Animation */}
      <div
        ref={headerRef}
        className="container relative z-10 mb-12 px-4 sm:px-6 text-center mx-auto max-w-5xl"
      >
        <KineticPlaybookHeading />

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "border border-border/60 bg-muted/20 text-muted-foreground hover:border-primary/40 hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* GSAP 3D Interactive Cards Grid */}
      <div
        ref={gridRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <div key={post.id} className="gsap-card-wrapper h-full">
              <GsapBlogCard
                post={post}
                index={idx}
                onOpen={handleOpenPost}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      <BlogReaderModal
        post={activePost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.section>
  );
};

export default BlogsSection;
