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

const GROUP_COLORS = {
  "Platform & Backend Engineering": "#915EFF",
  "Security, Integrations & Enterprise Solutions": "#00cea8",
  "Cloud, Reliability & DevOps": "#4285F4",
  "AI, Automation & Engineering Leadership": "#FF6C37",
};

const ExperienceCard = ({ experience }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const hasGroups = experience.groups && experience.groups.length > 0;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(21, 16, 48, 0.95)",
        color: "#fff",
        border: "1px solid rgba(145,94,255,0.2)",
        boxShadow: "0 8px 32px rgba(145,94,255,0.1)",
        borderRadius: "16px",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(145,94,255,0.3)" }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow: "0 0 0 4px rgba(145,94,255,0.3), 0 0 20px rgba(145,94,255,0.2)",
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
        <h3 className="text-white text-[22px] font-bold">{experience.title}</h3>
        <p className="text-[#915EFF] text-[15px] font-semibold mt-0.5" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
        {experience.location && (
          <p className="text-secondary text-[13px] mt-1">📍 {experience.location}</p>
        )}
      </div>

      {hasGroups ? (
        <div className="mt-5 space-y-3">
          {experience.groups.map((group) => {
            const accent = GROUP_COLORS[group.label] || "#915EFF";
            const isOpen = openGroup === group.label;
            return (
              <div
                key={group.label}
                className="rounded-xl border overflow-hidden transition-all duration-300"
                style={{ borderColor: `${accent}30` }}
              >
                <button
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-[13px] font-semibold" style={{ color: accent }}>
                    {group.label}
                  </span>
                  <span className="text-secondary text-sm">{isOpen ? "−" : "+"}</span>
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
                      <ul className="px-4 pb-4 space-y-2">
                        {group.points.map((point, i) => (
                          <li
                            key={i}
                            className="text-white-100 text-[13px] pl-3 border-l-2 leading-relaxed"
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
          <p className="text-secondary text-[11px] mt-2 text-center">
            Click a domain to expand details
          </p>
        </div>
      ) : (
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
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
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
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
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
