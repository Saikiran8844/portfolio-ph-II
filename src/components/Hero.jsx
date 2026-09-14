import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import heroAvatar from "../assets/hero_avatar.jpg";

const roles = [
  "Backend & Cloud Engineer",
  "Microservices Architect",
  "AI-Powered Tool Builder",
  "99.9% Uptime Deliverer",
];

const useTypewriter = (words, interval = 2800) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);
  return words[index];
};

const Hero = () => {
  const role = useTypewriter(roles);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Subtle mesh gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#915EFF] opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#00cea8] opacity-[0.05] blur-[100px]" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#915EFF 1px, transparent 1px), linear-gradient(90deg, #915EFF 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div
        className={`relative z-10 w-full max-w-7xl mx-auto ${styles.paddingX} flex flex-col lg:flex-row items-center gap-12 lg:gap-0 pt-28 pb-16`}
      >
        {/* ── Left: Text Content ── */}
        <div className="flex-1 flex flex-col items-start">
          {/* Accent pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#915EFF]/40 bg-[#915EFF]/10"
          >
            <span className="w-2 h-2 rounded-full bg-[#915EFF] animate-pulse" />
            <span className="text-[#915EFF] text-sm font-medium tracking-wide">
              Software Engineer II · Thales India
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`${styles.heroHeadText} text-white leading-tight`}
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#00cea8]">
              Saikiran
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 h-12 flex items-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`${styles.heroSubText} text-[#dfd9ff]`}
              >
                {role}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Description line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 text-secondary text-[16px] max-w-lg leading-[28px]"
          >
            Building cloud-native microservices, enterprise integrations, and
            AI-powered tooling at Thales — 3+ years, 10k+ daily requests,
            99.9% uptime.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hero-btn-primary"
            >
              View Projects
            </motion.a>
            <motion.a
              href={import.meta.env.VITE_RESUME_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hero-btn-secondary"
            >
              Download Resume ↗
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex gap-8"
          >
            {[
              { value: "3+", label: "Years at Thales" },
              { value: "10k+", label: "Daily API Calls" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "~90%", label: "Test Coverage" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-white font-black text-2xl">{value}</span>
                <span className="text-secondary text-xs mt-0.5">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Avatar ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex-shrink-0 relative flex items-center justify-center"
        >
          {/* Glow ring */}
          <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-tr from-[#915EFF]/30 to-[#00cea8]/20 blur-[60px]" />
          {/* Avatar image */}
          <div className="relative w-[280px] h-[380px] lg:w-[360px] lg:h-[480px] rounded-[32px] overflow-hidden border border-[#915EFF]/30 shadow-[0_0_60px_rgba(145,94,255,0.25)]">
            <img
              src={heroAvatar}
              alt="Saikiran Nannapaneni"
              className="w-full h-full object-cover object-top"
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          </div>

          {/* Floating badge — Location */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-6 bg-tertiary border border-[#915EFF]/30 rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm"
          >
            <p className="text-white text-xs font-semibold">📍 New Delhi, India</p>
          </motion.div>

          {/* Floating badge — Status */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-4 -right-6 bg-tertiary border border-[#00cea8]/30 rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm"
          >
            <p className="text-[#00cea8] text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-pulse" />
              Open to Opportunities
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-secondary text-xs tracking-widest uppercase">Scroll</span>
        <a href="#about">
          <div className="w-[30px] h-[54px] rounded-3xl border-2 border-secondary/50 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2 h-2 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
