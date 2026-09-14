import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { certifications } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const CertCard = ({ index, title, subtitle, issuer, icon, color, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noreferrer"
    variants={fadeIn("up", "spring", index * 0.2, 0.6)}
    whileHover={{ scale: 1.04, y: -4 }}
    className="block group cursor-pointer"
  >
    <div
      className="relative bg-tertiary rounded-2xl p-6 border border-white/5
                 hover:border-opacity-60 transition-all duration-300 overflow-hidden"
      style={{ "--accent": color }}
    >
      {/* Glow blob on hover */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: color }}
      />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border"
          style={{
            background: `${color}15`,
            borderColor: `${color}30`,
          }}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-1"
            style={{ color }}
          >
            {issuer}
          </p>
          <h3 className="text-white font-bold text-[16px] leading-snug">{title}</h3>
          <p className="text-secondary text-[13px] mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Arrow */}
      <div
        className="absolute bottom-4 right-4 text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ↗
      </div>
    </div>
  </motion.a>
);

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Recognition & Learning</p>
        <h2 className={styles.sectionHeadText}>Certifications.</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, index) => (
          <CertCard key={cert.title} index={index} {...cert} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
