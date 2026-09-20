import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, github, narutoAvatar, kuramaAvatar } from "../assets";
import linkedin from "../assets/linkedin.svg";
import { useTheme, THEMES } from "../context/ThemeContext";

const ThemeRadioSwitcher = () => {
  const { theme, setTheme, isKurama, isNaruto } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode switcher"
      className={`flex items-center p-1 rounded-full border backdrop-blur-md transition-all duration-500 ${
        isKurama
          ? "bg-[#16070a]/90 border-[#ff0055]/50 shadow-[0_0_20px_rgba(255,0,85,0.3)]"
          : "bg-[#0b140f]/90 border-[#f59e0b]/40 shadow-[0_0_18px_rgba(245,158,11,0.25)]"
      }`}
    >
      {/* ── Naruto Sage / Nature Mode Radio ── */}
      <label
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer select-none transition-all duration-300 ${
          isNaruto
            ? "text-white font-semibold"
            : "text-[#94a3b8] hover:text-white"
        }`}
      >
        <input
          type="radio"
          name="ninja-theme-radio"
          value={THEMES.NARUTO}
          checked={isNaruto}
          onChange={() => setTheme(THEMES.NARUTO)}
          className="sr-only"
        />
        {isNaruto && (
          <motion.div
            layoutId="activeThemeHighlight"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f59e0b]/25 to-[#10b981]/20 border border-[#f59e0b]/60"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-1.5">
          <div className="relative">
            <img
              src={narutoAvatar}
              alt="Naruto Sage Mode"
              className={`w-6 h-6 rounded-full object-cover transition-transform duration-300 ${
                isNaruto
                  ? "ring-2 ring-[#f59e0b] scale-110 shadow-[0_0_10px_#f59e0b]"
                  : "opacity-75 grayscale-[30%]"
              }`}
            />
            {isNaruto && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            )}
          </div>
          <span className="text-xs font-bold tracking-wide sm:inline hidden">
            Sage Mode
          </span>
        </div>
      </label>

      {/* ── Kurama Nine-Tails Mode Radio ── */}
      <label
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer select-none transition-all duration-300 ${
          isKurama
            ? "text-white font-semibold"
            : "text-[#94a3b8] hover:text-white"
        }`}
      >
        <input
          type="radio"
          name="ninja-theme-radio"
          value={THEMES.KURAMA}
          checked={isKurama}
          onChange={() => setTheme(THEMES.KURAMA)}
          className="sr-only"
        />
        {isKurama && (
          <motion.div
            layoutId="activeThemeHighlight"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff0055]/30 to-[#ff3b00]/30 border border-[#ff0055]/70"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-1.5">
          <div className="relative">
            <img
              src={kuramaAvatar}
              alt="Kurama Mode"
              className={`w-6 h-6 rounded-full object-cover transition-transform duration-300 ${
                isKurama
                  ? "ring-2 ring-[#ff0055] scale-110 shadow-[0_0_12px_#ff0055]"
                  : "opacity-75 grayscale-[30%]"
              }`}
            />
            {isKurama && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
            )}
          </div>
          <span className="text-xs font-bold tracking-wide sm:inline hidden">
            Kurama Mode
          </span>
        </div>
      </label>
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isKurama } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full flex items-center py-3.5 fixed top-0 z-30 transition-colors duration-500 ${styles.paddingX} ${
        scrolled ? "floating-nav scrolled" : "floating-nav"
      } ${
        isKurama
          ? "border-b border-[#ff0055]/20 shadow-[0_4px_30px_rgba(255,0,85,0.15)]"
          : "border-b border-[#f59e0b]/15 shadow-[0_4px_30px_rgba(245,158,11,0.08)]"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* ── Brand ── */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => { setActive(""); window.scrollTo(0, 0); }}
          >
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <p className="text-white text-[16px] font-bold cursor-pointer">
              Saikiran{" "}
              <span className={`transition-colors duration-300 ${isKurama ? "text-[#ff3b00]" : "text-[#f59e0b]"}`}>
                Nannapaneni
              </span>
            </p>
          </Link>

          {/* Social Links */}
          <div className="hidden md:flex gap-2 ml-1">
            <a
              href="https://www.linkedin.com/in/nannapaneni-saikiran-89100017b"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors"
            >
              <img src={linkedin} alt="LinkedIn" className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Saikiran8844"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors"
            >
              <img src={github} alt="GitHub" className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ── Theme Switcher Radio Button (Desktop & Mobile Center) ── */}
        <div className="flex items-center">
          <ThemeRadioSwitcher />
        </div>

        {/* ── Desktop Nav Links ── */}
        <ul className="list-none hidden lg:flex flex-row gap-1 items-center">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setActive(nav.title)}
                className={`px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200 ${
                  active === nav.title
                    ? isKurama
                      ? "text-white bg-[#ff0055]/20 border border-[#ff0055]/40"
                      : "text-white bg-[#f59e0b]/20 border border-[#f59e0b]/40"
                    : "text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                {nav.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href={import.meta.env.VITE_RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className={`ml-2 px-4 py-1.5 rounded-full text-[14px] font-semibold text-white transition-all duration-300 ${
                isKurama
                  ? "bg-gradient-to-r from-[#ff0055] to-[#ff3b00] hover:shadow-[0_0_20px_rgba(255,0,85,0.6)]"
                  : "bg-gradient-to-r from-[#f59e0b] to-[#10b981] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              }`}
            >
              Resume ↗
            </a>
          </li>
        </ul>

        {/* ── Mobile Hamburger ── */}
        <div className="lg:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[24px] h-[24px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <motion.div
            initial={false}
            animate={toggle ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${
              !toggle ? "pointer-events-none" : ""
            } absolute top-16 right-4 floating-nav scrolled rounded-2xl p-5 min-w-[220px] z-40 border ${
              isKurama ? "border-[#ff0055]/30 bg-[#140608]/95" : "border-[#f59e0b]/30 bg-[#08120c]/95"
            }`}
          >
            <ul className="list-none flex flex-col gap-3">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  onClick={() => { setToggle(false); setActive(nav.title); }}
                >
                  <a
                    href={`#${nav.id}`}
                    className={`block px-3 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                      active === nav.title
                        ? isKurama
                          ? "text-white bg-[#ff0055]/25"
                          : "text-white bg-[#f59e0b]/25"
                        : "text-secondary hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={import.meta.env.VITE_RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`block px-3 py-2 rounded-xl text-[14px] font-semibold ${
                    isKurama ? "text-[#ff0055]" : "text-[#f59e0b]"
                  }`}
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
