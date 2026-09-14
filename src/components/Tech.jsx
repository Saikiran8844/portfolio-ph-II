import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies, techGroups } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";

const TechIcon = ({ name, icon, delay = 0 }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.6)}
    whileHover={{ scale: 1.15, y: -4 }}
    className="flex flex-col items-center gap-2 group cursor-default"
  >
    <div
      className="w-14 h-14 rounded-2xl bg-tertiary border border-white/5 flex items-center justify-center
                 group-hover:border-[#915EFF]/50 group-hover:shadow-[0_0_20px_rgba(145,94,255,0.25)]
                 transition-all duration-300"
    >
      <img
        src={icon}
        alt={name}
        className="w-8 h-8 object-contain tech-float"
        style={{ animationDelay: `${delay * 0.3}s` }}
        onError={(e) => {
          // Fallback: show first 2 letters if icon fails to load
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.innerHTML = `<span class="text-white font-bold text-sm">${name.slice(0,2)}</span>`;
        }}
      />
    </div>
    <span className="text-secondary text-[11px] font-medium text-center max-w-[60px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {name}
    </span>
  </motion.div>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      {/* Bento grouped grid */}
      <div className="mt-12 space-y-6">
        {techGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            variants={fadeIn("up", "spring", gi * 0.15, 0.6)}
            className="bg-tertiary rounded-2xl p-6 border border-white/5 hover:border-[#915EFF]/20 transition-colors"
          >
            <p className="text-[#915EFF] text-[13px] font-semibold uppercase tracking-widest mb-5">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-5">
              {group.techs.map((tech, ti) => (
                <TechIcon
                  key={tech.name}
                  {...tech}
                  delay={gi * 0.1 + ti * 0.08}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Marquee ticker ── */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-white/5 bg-tertiary py-5">
        <div className="marquee-track">
          {[...technologies, ...technologies].map((tech, i) => (
            <div
              key={`ticker-${i}`}
              className="flex items-center gap-2 mx-8 shrink-0"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-6 h-6 object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span className="text-secondary text-[13px] font-medium whitespace-nowrap">
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
