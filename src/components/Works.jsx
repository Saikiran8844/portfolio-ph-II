import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const ProjectCard = ({ index, name, tag, description, tags, image, source_code_link, isKurama }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.25, 0.75)}
      className="card-glow-wrapper"
    >
      <Tilt
        options={{ max: 15, scale: 1.02, speed: 400 }}
        className={`p-5 rounded-2xl sm:w-[360px] w-full border transition-all duration-500 flex flex-col justify-between ${
          isKurama
            ? "bg-[#140609]/90 border-[#ff0055]/20 hover:border-[#ff0055]/50 hover:shadow-[0_0_30px_rgba(255,0,85,0.25)]"
            : "bg-[#0a140f]/90 border-[#f59e0b]/20 hover:border-[#f59e0b]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
        }`}
      >
        {/* Image / Thumbnail */}
        <div className="relative w-full h-[210px] group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
          {tag && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider font-bold border backdrop-blur-md ${
                isKurama
                  ? "bg-[#120406]/85 border-[#ff0055]/40 text-[#ff6b8b]"
                  : "bg-[#08120c]/85 border-[#f59e0b]/40 text-[#f59e0b]"
              }`}
            >
              {tag}
            </span>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              onClick={() => window.open(source_code_link, "_blank")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg ${
                isKurama
                  ? "bg-gradient-to-r from-[#ff0055] to-[#ff3b00] shadow-[0_0_20px_rgba(255,0,85,0.6)]"
                  : "bg-gradient-to-r from-[#f59e0b] to-[#10b981] shadow-[0_0_20px_rgba(245,158,11,0.6)]"
              }`}
            >
              <img src={github} alt="source code" className="w-5 h-5 object-contain invert" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-[19px] leading-tight">{name}</h3>
            <p className="mt-2 text-[#cbd5e1] text-[13px] leading-[22px]">
              {description}
            </p>
          </div>

          {/* Tech Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tagItem) => (
              <span
                key={`${name}-${tagItem.name}`}
                className={`text-[11px] px-2.5 py-1 rounded-full bg-white/5 ${tagItem.color} font-medium`}
              >
                #{tagItem.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { isKurama } = useTheme();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`font-mono uppercase tracking-widest text-xs font-bold transition-colors duration-500 ${
            isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
          }`}
        >
          {isKurama
            ? "// NINE-TAILS ARSENAL · FEATURED DELIVERABLES"
            : "// SAGE ARSENAL · FEATURED DELIVERABLES"}
        </p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-[#94a3b8] text-[16px] max-w-3xl leading-[30px]"
        >
          Special-grade engineering deliverables spanning AI automation tools, high-throughput enterprise backend services, and conversion-optimized Shopify architectures.
        </motion.p>
      </div>

      <div className="mt-14 flex flex-wrap gap-6" id="projects">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            isKurama={isKurama}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
