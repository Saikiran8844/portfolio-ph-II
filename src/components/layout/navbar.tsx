"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleButton } from "./theme-switcher";
import { MotionToggle } from "@/components/ui/motion-toggle";

const navItems = [
  { name: "EXPERIENCE", href: "#craft", id: "craft" },
  { name: "PROJECTS", href: "#works", id: "works" },
  { name: "SERVICES", href: "#services", id: "services" },
  { name: "BLOGS", href: "#blogs", id: "blogs" },
  { name: "REVIEWS", href: "#testimonials", id: "testimonials" },
  { name: "CONTACT", href: "#contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  // Track scroll position & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = [
        "about",
        "craft",
        "works",
        "services",
        "blogs",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe animated toggle preventing multi-click glitches
  const handleToggleMobileMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMobileMenuOpen((prev) => !prev);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    e.preventDefault();
    if (mobileMenuOpen) {
      if (isAnimating) return;
      setIsAnimating(true);
      setMobileMenuOpen(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    }

    setActiveSection(id);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3.5 sm:py-4 shadow-sm"
        : "bg-background/40 backdrop-blur-md border-b border-border/30 py-4 sm:py-5"
        }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* ── Brand on Left (With Entrance Motion) ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-sm sm:text-base md:text-lg tracking-[0.28em] font-normal uppercase text-foreground hover:text-primary transition-colors select-none block"
            style={{ fontFamily: "var(--font-accent), Georgia, serif" }}
          >
            SAIKIRAN N.
          </Link>
        </motion.div>

        {/* ── Continuous Horizontal Divider Line (Draw-in Motion) ─── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="flex-1 h-px bg-foreground/25 dark:bg-foreground/20 mx-4 sm:mx-8 md:mx-12"
        />

        {/* ── Desktop Navigation Links (Staggered Animation) ──── */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10 shrink-0">
          {navItems.map((item, idx) => {
            const isActive =
              activeSection === item.id ||
              (item.id === "services" && activeSection === "about");

            return (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -1.5 }}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`text-[11px] lg:text-xs font-mono tracking-[0.22em] uppercase transition-colors cursor-pointer relative group py-1 ${isActive
                  ? "text-foreground font-bold"
                  : "text-foreground/70 hover:text-foreground"
                  }`}
              >
                <span>{item.name}</span>

                {/* Animated Active / Hover Underline Indicator */}
                {isActive ? (
                  <motion.span
                    layoutId="active-navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary/60 transition-all duration-300 group-hover:w-full" />
                )}
              </motion.a>
            );
          })}

          {/* Motion (Eye Icon) & Theme Toggles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pl-3 border-l border-border/60 flex items-center gap-2.5"
          >
            <MotionToggle />
            <ThemeToggleButton variant="rectangle" className="scale-90" />
          </motion.div>

          {/* Top-Right Cyber Reticle Accent from Sample */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] font-mono text-muted-foreground/50 hidden xl:inline select-none"
          >
            ⌜ ⌝
          </motion.span>
        </nav>

        {/* ── Mobile Hamburger Toggle Button ─────────────────── */}
        <div className="flex md:hidden items-center gap-2.5 shrink-0">
          <MotionToggle className="scale-85" />
          <ThemeToggleButton variant="rectangle" className="scale-80" />
          <motion.button
            type="button"
            disabled={isAnimating}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleMobileMenu}
            className="p-1.5 rounded-lg border border-border/60 bg-card/60 text-foreground hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Toggle Navigation Menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="size-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Drawer Navigation with Safe Animation ────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden w-full bg-background/95 backdrop-blur-2xl border-b border-border/80 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className="text-xs font-mono tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground py-2 border-b border-border/40 flex items-center justify-between transition-colors"
                >
                  <span
                    className={
                      activeSection === item.id ? "text-primary font-bold" : ""
                    }
                  >
                    {item.name}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground/60" />
                </motion.a>
              ))}

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>SAIKIRAN NANNAPANENI</span>
                <span>UTC+5:30</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
