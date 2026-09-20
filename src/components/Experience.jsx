import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, AnimatePresence } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const GROUP_COLORS_NARUTO = {
  "Platform & Backend Engineering": "#f59e0b",
  "Security, Integrations & Enterprise Solutions": "#10b981",
  "Cloud, Reliability & DevOps": "#38bdf8",
  "AI, Automation & Engineering Leadership": "#a78bfa",
  "Shopify & Headless Store Engineering": "#34d399",
  "Creative Frontends & Motion (GSAP + Next.js)": "#fcd34d",
};

const GROUP_COLORS_KURAMA = {
  "Platform & Backend Engineering": "#ff0055",
  "Security, Integrations & Enterprise Solutions": "#ff3b00",
  "Cloud, Reliability & DevOps": "#ffaa00",
  "AI, Automation & Engineering Leadership": "#f43f5e",
  "Shopify & Headless Store Engineering": "#fb923c",
  "Creative Frontends & Motion (GSAP + Next.js)": "#e11d48",
};

const ExperienceCard = ({ experience, isKurama }) => {
  const [openGroup, setOpenGroup] = useState(experience.groups?.[0]?.label || null);
  const hasGroups = experience.groups && experience.groups.length > 0;
  const groupColors = isKurama ? GROUP_COLORS_KURAMA : GROUP_COLORS_NARUTO;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isKurama ? "rgba(20, 6, 9, 0.95)" : "rgba(10, 20, 14, 0.95)",
        color: "#fff",
        border: isKurama
          ? "1px solid rgba(255, 0, 85, 0.3)"
          : "1px solid rgba(245, 158, 11, 0.25)",
        boxShadow: isKurama
          ? "0 8px 32px rgba(255, 0, 85, 0.15)"
          : "0 8px 32px rgba(245, 158, 11, 0.12)",
        borderRadius: "18px",
      }}
      contentArrowStyle={{
        borderRight: isKurama
          ? "7px solid rgba(255, 0, 85, 0.5)"
          : "7px solid rgba(245, 158, 11, 0.5)",
      }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow: isKurama
          ? "0 0 0 4px rgba(255, 0, 85, 0.4), 0 0 25px rgba(255, 0, 85, 0.35)"
          : "0 0 0 4px rgba(245, 158, 11, 0.4), 0 0 25px rgba(245, 158, 11, 0.3)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        {experience.badge && (
          <span
            className={`inline-block px-3 py-1 mb-2.5 rounded-full text-[10px] font-mono font-bold tracking-widest border ${
              isKurama
                ? "bg-[#ff0055]/20 border-[#ff0055]/40 text-[#ff6b8b]"
                : "bg-[#f59e0b]/20 border-[#f59e0b]/40 text-[#f59e0b]"
            }`}
          >
            {experience.badge}
          </span>
        )}
        <h3 className="text-white text-[21px] font-bold">{experience.title}</h3>
        <p
          className={`text-[15px] font-semibold mt-0.5 ${
            isKurama ? "text-[#ffaa00]" : "text-[#10b981]"
          }`}
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
        {experience.location && (
          <p className="text-[#94a3b8] text-[13px] mt-1 font-mono">📍 {experience.location}</p>
        )}
      </div>

      {hasGroups ? (
        <div className="mt-5 space-y-3">
          {experience.groups.map((group) => {
            const accent = groupColors[group.label] || (isKurama ? "#ff0055" : "#f59e0b");
            const isOpen = openGroup === group.label;
            return (
              <div
                key={group.label}
                className="rounded-xl border overflow-hidden transition-all duration-300"
                style={{ borderColor: `${accent}35` }}
              >
                <button
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-[13px] font-bold flex items-center gap-2" style={{ color: accent }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                    {group.label}
                  </span>
                  <span className="text-[#94a3b8] text-sm font-bold">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="px-4 pb-4 space-y-2.5">
                        {group.points.map((point, i) => (
                          <li
                            key={i}
                            className="text-[#e2e8f0] text-[13px] pl-3 border-l-2 leading-relaxed"
                            style={{ borderColor: accent }}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <p className="text-[#94a3b8] text-[11px] mt-2 text-center font-mono">
            Click domain headers to expand technical deliverables
          </p>
        </div>
      ) : (
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-[#e2e8f0] text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { isKurama } = useTheme();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`font-mono uppercase tracking-widest text-xs font-bold text-center transition-colors duration-500 ${
            isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
          }`}
        >
          {isKurama
            ? "// NINE-TAILS CHRONICLES · PRODUCTION CAREER LOG"
            : "// SAGE CHRONICLES · PRODUCTION CAREER LOG"}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.8)}
        className="mt-20 flex flex-col"
      >
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              isKurama={isKurama}
            />
          ))}
        </VerticalTimeline>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
