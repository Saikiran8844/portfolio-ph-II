"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
import { SelectedWorks } from "@/components/sections/works/selected-works";
import ServicesSection from "@/components/sections/services/services-section";
import { BlogsSection } from "@/components/sections/blogs/blogs-section";
import CalBooking from "@/components/sections/home/cal-booking";
import Preloader from "@/components/common/preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
    document.body.style.cursor = "default";
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center scroll-smooth bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handleLoaded} />}
      </AnimatePresence>

      {/* 1. About Me (Hero & Interactive 3D WebGL Backdrop) */}
      <section id="about" className="w-full scroll-mt-24">
        <AboutMe />
      </section>

      {/* 2. Professional Experience & Tech Craft */}
      <section id="craft" className="w-full scroll-mt-24">
        <TimelineDemo />
      </section>

      {/* 3. Selected Works & Projects (CarrotKart, LegalAssistant, AI Interview Assistant, etc.) */}
      <section id="works" className="w-full scroll-mt-24">
        <SelectedWorks />
      </section>

      {/* 4. Architectural Capabilities & Creator Services */}
      <section id="services" className="w-full scroll-mt-24">
        <ServicesSection />
      </section>

      {/* 5. Engineering Insights, Shopify Architecture & Growth Blogs */}
      <section id="blogs" className="w-full scroll-mt-24">
        <BlogsSection />
      </section>

      {/* 6. Contact & Schedule Call */}
      <section id="contact" className="w-full scroll-mt-24">
        <CalBooking />
      </section>
    </div>
  );
}
