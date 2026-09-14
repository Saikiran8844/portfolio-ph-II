import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <Tilt className="xs:w-[240px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="card-glow-wrapper w-full"
    >
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-6 px-8 min-h-[220px] flex flex-col items-center justify-center gap-4"
        >
          <img src={icon} alt={title} className="w-14 h-14 object-contain" />
          <h3 className="text-white text-[18px] font-bold text-center">{title}</h3>
          {description && (
            <p className="text-secondary text-[12px] text-center leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a{" "}
        <span className="text-[#915EFF] font-semibold">Software Engineer II at Thales India</span>{" "}
        building cloud-native microservices and enterprise platforms with{" "}
        <span className="text-white font-medium">Java, Spring Boot, Kubernetes, AWS, and GCP</span>.
        I work across distributed systems, authentication (OAuth2, SAML, Keycloak, Okta),
        event-driven architecture, and enterprise integrations (SAP, Salesforce, MuleSoft) — and
        I'm increasingly focused on{" "}
        <span className="text-[#00cea8] font-medium">AI-powered automation</span>, building internal
        tools with LLMs to speed up testing, migrations, and developer workflows.
      </motion.p>

      {/* Bento stat strip */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.8)}
        className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
      >
        {[
          { label: "Years Experience", value: "3+" },
          { label: "Daily API Transactions", value: "10k+" },
          { label: "Availability SLA", value: "99.9%" },
          { label: "Test Coverage", value: "~90%" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-tertiary rounded-2xl p-4 border border-[#915EFF]/10 hover:border-[#915EFF]/30 transition-colors"
          >
            <p className="text-white font-black text-2xl">{value}</p>
            <p className="text-secondary text-xs mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
