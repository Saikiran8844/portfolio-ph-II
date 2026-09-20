"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
import { SelectedWorks } from "@/components/sections/works/selected-works";
import ServicesSection from "@/components/sections/services/services-section";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
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

      {/* Hero & About Section with Interactive 3D WebGL Backdrop */}
      <section id="about" className="w-full scroll-mt-24">
        <AboutMe />
      </section>

      {/* Selected Production & Client Works (CarrotKart, LegalAssistant, AI Interview Assistant, etc.) */}
      <section id="works" className="w-full scroll-mt-24">
        <SelectedWorks />
      </section>

      {/* Architectural Capabilities, Freelance & Creator Services */}
      <ServicesSection />

      {/* Professional Experience, Career & Tech Craft */}
      <section id="craft" className="w-full scroll-mt-24">
        <TimelineDemo />
      </section>

      {/* Contact & Schedule Call */}
      <section id="contact" className="w-full scroll-mt-24">
        <CalBooking />
      </section>
    </div>
  );
}
