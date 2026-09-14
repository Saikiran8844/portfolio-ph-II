import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, github } from "../assets";
import linkedin from "../assets/linkedin.svg";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      className={`w-full flex items-center py-4 fixed top-0 z-20 ${styles.paddingX} ${
        scrolled ? "floating-nav scrolled" : "floating-nav"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* ── Brand ── */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => { setActive(""); window.scrollTo(0, 0); }}
          >
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <p className="text-white text-[17px] font-bold cursor-pointer">
              Saikiran{" "}
              <span className="text-[#915EFF] sm:inline hidden">Nannapaneni</span>
            </p>
          </Link>

          {/* Social icons */}
          <div className="flex gap-3 ml-2">
            <a
              href="https://www.linkedin.com/in/nannapaneni-saikiran-89100017b"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#915EFF]/20 transition-colors"
            >
              <img src={linkedin} alt="LinkedIn" className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Saikiran8844"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#915EFF]/20 transition-colors"
            >
              <img src={github} alt="GitHub" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── Desktop Nav Links ── */}
        <ul className="list-none hidden sm:flex flex-row gap-1 items-center">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setActive(nav.title)}
                className={`px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-200 ${
                  active === nav.title
                    ? "text-white bg-[#915EFF]/20"
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
              className="ml-2 px-5 py-2 rounded-full text-[15px] font-semibold text-white bg-gradient-to-r from-[#915EFF] to-[#6b3fd4] hover:shadow-[0_0_20px_rgba(145,94,255,0.4)] transition-shadow duration-300"
            >
              Resume ↗
            </a>
          </li>
        </ul>

        {/* ── Mobile Hamburger ── */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[26px] h-[26px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <motion.div
            initial={false}
            animate={toggle ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${
              !toggle ? "pointer-events-none" : ""
            } absolute top-16 right-4 floating-nav scrolled rounded-2xl p-5 min-w-[200px] z-30`}
          >
            <ul className="list-none flex flex-col gap-3">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  onClick={() => { setToggle(false); setActive(nav.title); }}
                >
                  <a
                    href={`#${nav.id}`}
                    className={`block px-3 py-2 rounded-xl text-[15px] font-medium transition-colors ${
                      active === nav.title
                        ? "text-white bg-[#915EFF]/20"
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
                  className="block px-3 py-2 rounded-xl text-[15px] font-semibold text-[#915EFF]"
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
