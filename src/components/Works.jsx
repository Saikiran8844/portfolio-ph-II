import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="card-glow-wrapper"
    >
      <Tilt
        options={{ max: 18, scale: 1.02, speed: 400 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 hover:border-[#915EFF]/25 transition-colors duration-300"
      >
        {/* Image */}
        <div className="relative w-full h-[220px] group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 rounded-xl bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              onClick={() => window.open(source_code_link, "_blank")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-[#915EFF] flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(145,94,255,0.6)]"
            >
              <img src={github} alt="source code" className="w-5 h-5 object-contain invert" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-5">
          <h3 className="text-white font-bold text-[20px]">{name}</h3>
          <p className="mt-2 text-secondary text-[13px] leading-[22px] line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] px-2.5 py-1 rounded-full bg-white/5 ${tag.color} font-medium`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>What I've built</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Real-world projects spanning AI tooling, enterprise backend services, and full-stack
          applications — each with links to live demos or source code.
        </motion.p>
      </div>

      <div className="mt-14 flex flex-wrap gap-6" id="projects">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
