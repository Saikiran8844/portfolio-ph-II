import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import { styles } from "../styles";
import { heroAvatar } from "../assets";
import { useTheme } from "../context/ThemeContext";

const ROLES = [
  "Software Engineer II @ Thales",
  "High-Throughput Microservices Architect",
  "Freelance Shopify & Storefront Engineer",
  "AI Tooling & Test Automation Specialist",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const glowRingRef = useRef(null);
  const chakraRingRef = useRef(null);
  const flameTailsRef = useRef([]);
  const { isKurama } = useTheme();

  // Rotate roles every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Dynamic Chakra Aura & Flame Tail Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isKurama) {
        // Kurama Mode: Blazing, aggressive fiery chakra pulses
        gsap.to(glowRingRef.current, {
          scale: 1.25,
          opacity: 0.9,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        if (chakraRingRef.current) {
          gsap.to(chakraRingRef.current, {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none",
          });
        }

        // Animated waving Kurama flame tails
        flameTailsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            rotation: i % 2 === 0 ? 18 : -18,
            scaleY: 1.15,
            duration: 1 + i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
          });
        });
      } else {
        // Naruto Sage Nature Mode: Calm, harmonious natural breathing aura
        gsap.to(glowRingRef.current, {
          scale: 1.1,
          opacity: 0.7,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        if (chakraRingRef.current) {
          gsap.to(chakraRingRef.current, {
            rotation: 360,
            duration: 22,
            repeat: -1,
            ease: "none",
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isKurama]);

  const role = ROLES[roleIndex];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Ambient Ambient Chakra Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isKurama
            ? "bg-gradient-to-tr from-[#ff2a00]/25 via-[#ff0055]/20 to-[#ffaa00]/15"
            : "bg-gradient-to-tr from-[#f59e0b]/20 via-[#10b981]/20 to-[#38bdf8]/15"
        }`}
      />

      <div className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full z-10`}>
        {/* ── Left Column: Intro & Master Resume Data ── */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          {/* Theme Mode Status Pill */}
          <motion.div
            key={isKurama ? "kurama-badge" : "naruto-badge"}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md mb-5 transition-colors duration-500 ${
              isKurama
                ? "bg-[#20080c]/80 border-[#ff0055]/50 shadow-[0_0_20px_rgba(255,0,85,0.3)]"
                : "bg-[#0b1610]/80 border-[#f59e0b]/40 shadow-[0_0_18px_rgba(245,158,11,0.2)]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isKurama ? "bg-[#ff0055] animate-ping" : "bg-[#10b981] animate-pulse"
              }`}
            />
            <span
              className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
              }`}
            >
              {isKurama
                ? "KURAMA NINE-TAILS MODE · SPECIAL GRADE ARCHITECT"
                : "NATURAL SAGE MODE · SPECIAL GRADE ARCHITECT"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`${styles.heroHeadText} text-white leading-tight font-black`}
          >
            Hi, I'm{" "}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${
                isKurama
                  ? "from-[#ff2a00] via-[#ff0055] to-[#ffaa00] drop-shadow-[0_0_35px_rgba(255,0,85,0.5)]"
                  : "from-[#f59e0b] via-[#10b981] to-[#38bdf8] drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]"
              }`}
            >
              Saikiran
            </span>
          </motion.h1>

          {/* Animated Dynamic Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-2 h-14 flex items-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={role}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${
                  isKurama
                    ? "from-[#ffaa00] via-[#ff6b8b] to-[#ffffff]"
                    : "from-[#38bdf8] via-[#a7f3d0] to-[#fef08a]"
                }`}
              >
                {role}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Master Resume Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 text-[#cbd5e1] text-[16px] max-w-xl leading-[28px]"
          >
            Software Engineer II with <span className="text-white font-semibold">3.8+ years</span> architecting
            high-throughput cloud microservices (Java 17 & Spring Boot 3), autonomous AI workflows (ChatGPT & Claude),
            and conversion-focused{" "}
            <span className={isKurama ? "text-[#ffaa00] font-semibold" : "text-[#10b981] font-semibold"}>
              Shopify e-commerce architectures
            </span>{" "}
            — sustaining <span className="text-white font-semibold">10k+ daily transactions</span> at sub-200ms latency.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-7 py-3.5 rounded-xl font-bold text-white transition-all duration-300 ${
                isKurama
                  ? "bg-gradient-to-r from-[#ff0055] via-[#ff2a00] to-[#e11d48] shadow-[0_0_25px_rgba(255,0,85,0.5)] hover:shadow-[0_0_35px_rgba(255,42,0,0.8)]"
                  : "bg-gradient-to-r from-[#f59e0b] via-[#10b981] to-[#059669] shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)]"
              }`}
            >
              Explore Arsenal
            </motion.a>
            <motion.a
              href={import.meta.env.VITE_RESUME_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-7 py-3.5 rounded-xl font-bold text-white bg-white/5 border backdrop-blur-md transition-all duration-300 ${
                isKurama
                  ? "border-[#ff0055]/30 hover:border-[#ff0055] hover:bg-[#ff0055]/10 hover:shadow-[0_0_25px_rgba(255,0,85,0.3)]"
                  : "border-[#f59e0b]/30 hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              }`}
            >
              View Master Resume
            </motion.a>
          </motion.div>

          {/* Stats Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 w-full max-w-xl"
          >
            {[
              { value: "3.8+", label: "Years at Thales" },
              { value: "10k+", label: "Daily Transactions" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "~90%", label: "Test Coverage" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className={`border rounded-xl p-3 flex flex-col transition-colors duration-300 ${
                  isKurama
                    ? "bg-[#140608]/90 border-[#ff0055]/20 hover:border-[#ff0055]/50"
                    : "bg-[#09130d]/90 border-[#f59e0b]/20 hover:border-[#f59e0b]/50"
                }`}
              >
                <span
                  className={`font-black text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${
                    isKurama ? "from-white to-[#ffaa88]" : "from-white to-[#fef08a]"
                  }`}
                >
                  {value}
                </span>
                <span className="text-[#94a3b8] text-xs mt-1 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column: Avatar with Naruto Sage & Kurama Animations ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex-shrink-0 relative flex items-center justify-center"
        >
          {/* Kurama Fiery Chakra Tails (Active in Kurama Mode) */}
          {isKurama && (
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
              {[ -65, -35, -12, 12, 35, 65 ].map((rot, idx) => (
                <div
                  key={idx}
                  ref={(el) => (flameTailsRef.current[idx] = el)}
                  style={{ transform: `rotate(${rot}deg)` }}
                  className="absolute bottom-1/2 w-8 h-48 sm:w-10 sm:h-64 origin-bottom rounded-full bg-gradient-to-t from-transparent via-[#ff2a00]/50 to-[#ffaa00]/70 blur-[14px]"
                />
              ))}
            </div>
          )}

          {/* Pulsating Chakra Aura Blur Behind Avatar */}
          <div
            ref={glowRingRef}
            className={`absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full blur-[65px] pointer-events-none transition-all duration-700 ${
              isKurama
                ? "bg-gradient-to-tr from-[#ff2a00]/50 via-[#ff0055]/40 to-[#ffaa00]/30"
                : "bg-gradient-to-tr from-[#f59e0b]/40 via-[#10b981]/35 to-[#38bdf8]/25"
            }`}
          />

          {/* Rotating Sage Rasengan / Kurama Chakra Orbit Ring */}
          <div
            ref={chakraRingRef}
            className={`absolute w-[350px] h-[350px] lg:w-[470px] lg:h-[470px] rounded-full border border-dashed pointer-events-none transition-colors duration-700 ${
              isKurama ? "border-[#ff0055]/40" : "border-[#10b981]/40"
            }`}
          />

          {/* Avatar Card Container */}
          <div
            className={`relative z-10 w-[270px] h-[370px] lg:w-[340px] lg:h-[450px] rounded-[28px] overflow-hidden border-2 shadow-2xl transition-all duration-700 ${
              isKurama
                ? "border-[#ff0055]/50 shadow-[0_0_50px_rgba(255,0,85,0.35)] bg-[#0e0406]"
                : "border-[#f59e0b]/50 shadow-[0_0_50px_rgba(245,158,11,0.3)] bg-[#070e0a]"
            }`}
          >
            <img
              src={heroAvatar}
              alt="Saikiran Nannapaneni"
              className="w-full h-full object-cover object-top filter contrast-105"
            />
            {/* Vignette */}
            <div
              className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-85 ${
                isKurama ? "from-[#0d0305]" : "from-[#050b07]"
              }`}
            />
          </div>

          {/* Floating Location Pill */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute z-20 -bottom-4 -left-4 border rounded-2xl px-4 py-2 shadow-xl backdrop-blur-md transition-colors duration-500 ${
              isKurama
                ? "bg-[#180608]/90 border-[#ff0055]/40"
                : "bg-[#09150e]/90 border-[#f59e0b]/40"
            }`}
          >
            <p className="text-white text-xs font-bold tracking-wider">📍 New Delhi, India</p>
          </motion.div>

          {/* Floating Mode Status Pill */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className={`absolute z-20 -top-4 -right-4 border rounded-2xl px-4 py-2 shadow-xl backdrop-blur-md transition-colors duration-500 ${
              isKurama
                ? "bg-[#180608]/90 border-[#ff2a00]/50"
                : "bg-[#09150e]/90 border-[#10b981]/50"
            }`}
          >
            <p
              className={`text-xs font-bold flex items-center gap-2 ${
                isKurama ? "text-[#ff6b8b]" : "text-[#34d399]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isKurama ? "bg-[#ff0055] animate-ping" : "bg-[#10b981] animate-pulse"
                }`}
              />
              {isKurama ? "🔥 Kurama Chakra Cloak Active" : "🍃 Natural Senjutsu Active"}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-75">
        <span
          className={`text-[10px] tracking-[0.3em] uppercase font-mono font-bold transition-colors duration-500 ${
            isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
          }`}
        >
          Scroll Down
        </span>
        <a href="#about">
          <div
            className={`w-[26px] h-[44px] rounded-3xl border-2 flex justify-center items-start p-1.5 transition-colors duration-500 ${
              isKurama ? "border-[#ff0055]/50" : "border-[#f59e0b]/50"
            }`}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className={`w-2 h-2 rounded-full ${isKurama ? "bg-[#ff0055]" : "bg-[#f59e0b]"}`}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
