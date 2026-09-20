import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies, techGroups } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { useTheme } from "../context/ThemeContext";

const TechIcon = ({ name, icon, delay = 0, isKurama }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.6)}
    whileHover={{ scale: 1.15, y: -4 }}
    className="flex flex-col items-center gap-2 group cursor-default"
  >
    <div
      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
        isKurama
          ? "bg-[#160609] border-white/10 group-hover:border-[#ff0055]/70 group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]"
          : "bg-[#0c1611] border-white/10 group-hover:border-[#f59e0b]/70 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
      }`}
    >
      <img
        src={icon}
        alt={name}
        className="w-8 h-8 object-contain tech-float"
        style={{ animationDelay: `${delay * 0.3}s` }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.innerHTML = `<span class="text-white font-bold text-xs">${name.slice(0, 3)}</span>`;
        }}
      />
    </div>
    <span className="text-[#94a3b8] text-[11px] font-medium text-center max-w-[65px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {name}
    </span>
  </motion.div>
);

const Tech = () => {
  const { isKurama } = useTheme();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`font-mono uppercase tracking-widest text-xs font-bold transition-colors duration-500 ${
            isKurama ? "text-[#ff6b8b]" : "text-[#10b981]"
          }`}
        >
          {isKurama
            ? "// NINE-TAILS CHAKRA · MASTER TECH ARSENAL"
            : "// SAGE SENJUTSU · MASTER TECH ARSENAL"}
        </p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      {/* Bento Technique Cards */}
      <div className="mt-10 space-y-6">
        {techGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            variants={fadeIn("up", "spring", gi * 0.15, 0.6)}
            className={`rounded-2xl p-6 border transition-all duration-500 ${
              isKurama
                ? "bg-[#140608]/90 border-[#ff0055]/15 hover:border-[#ff0055]/50 hover:shadow-[0_0_25px_rgba(255,0,85,0.2)]"
                : "bg-[#0a140f]/90 border-[#f59e0b]/15 hover:border-[#f59e0b]/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.18)]"
            }`}
          >
            <div className="flex items-center justify-between mb-5">
              <p
                className={`text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isKurama ? "bg-[#ff0055]" : "bg-[#10b981]"
                  }`}
                />
                {group.label}
              </p>
              {group.tag && (
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full border ${
                    isKurama
                      ? "text-[#ff6b8b] border-[#ff0055]/30 bg-[#ff0055]/10"
                      : "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10"
                  }`}
                >
                  {group.tag}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-5">
              {group.techs.map((tech, ti) => (
                <TechIcon
                  key={tech.name}
                  {...tech}
                  isKurama={isKurama}
                  delay={gi * 0.1 + ti * 0.05}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Marquee ticker ── */}
      <div
        className={`mt-10 overflow-hidden rounded-2xl border py-5 transition-colors duration-500 ${
          isKurama
            ? "bg-[#140608] border-[#ff0055]/15"
            : "bg-[#09140e] border-[#f59e0b]/15"
        }`}
      >
        <div className="marquee-track">
          {[...technologies, ...technologies].map((tech, i) => (
            <div
              key={`ticker-${i}`}
              className="flex items-center gap-2.5 mx-7 shrink-0"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-6 h-6 object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span className="text-[#cbd5e1] text-[13px] font-medium whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
