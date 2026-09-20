import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const ServiceCard = ({ index, title, tag, icon, description, color, isKurama }) => (
  <Tilt className="xs:w-[260px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.35, 0.75)}
      className="card-glow-wrapper w-full"
    >
      <div
        className="w-full p-[1px] rounded-[22px] transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${color || (isKurama ? "#ff0055" : "#f59e0b")} 0%, #101614 100%)`,
          boxShadow: `0 0 25px ${color || (isKurama ? "#ff0055" : "#f59e0b")}25`,
        }}
      >
        <div
          options={{ max: 40, scale: 1.02, speed: 450 }}
          className={`rounded-[22px] py-7 px-6 min-h-[250px] flex flex-col items-center justify-between gap-3 text-center transition-colors duration-500 ${
            isKurama ? "bg-[#120508]" : "bg-[#0a120d]"
          }`}
        >
          {tag && (
            <span
              className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full border ${
                isKurama
                  ? "text-[#ff6b8b] border-[#ff0055]/30 bg-[#ff0055]/10"
                  : "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10"
              }`}
            >
              {tag}
            </span>
          )}
          <img
            src={icon}
            alt={title}
            className="w-14 h-14 object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
          />
          <h3 className="text-white text-[16px] font-bold leading-snug">{title}</h3>
          {description && (
            <p className="text-[#94a3b8] text-[12px] leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
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
            ? "// NINE-TAILS CHAKRA SHROUD · THE ARCHITECT'S PATH"
            : "// NATURAL SAGE SENJUTSU · THE ARCHITECT'S PATH"}
        </p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#cbd5e1] text-[16px] max-w-3xl leading-[30px]"
      >
        I'm a{" "}
        <span className={isKurama ? "text-[#ff3b00] font-bold" : "text-[#f59e0b] font-bold"}>
          Software Engineer II at Thales India
        </span>{" "}
        and an independent{" "}
        <span className={isKurama ? "text-[#ffaa00] font-bold" : "text-[#10b981] font-bold"}>
          Shopify & Full-Stack Architect
        </span>{" "}
        with <span className="text-white font-semibold">3.8+ years of production experience</span> building
        cloud-native microservices, distributed architectures, and modern web applications with{" "}
        <span className="text-white font-medium">Java, Spring Boot, Kubernetes, AWS, and GCP</span>.
        <br /><br />
        My focus spans high-throughput APIs (
        <span className="text-white font-semibold">10K+ daily transactions</span> at &lt;200ms latency),
        enterprise integrations (
        <span className="text-white font-medium">SAP, Salesforce, MuleSoft, SAML 2.0</span>
        ), and bespoke{" "}
        <span className={isKurama ? "text-[#ffaa00] font-semibold" : "text-[#10b981] font-semibold"}>
          Shopify e-commerce architectures
        </span>{" "}
        achieving 100/100 Core Web Vitals.
        I am deeply immersed in{" "}
        <span className={isKurama ? "text-[#ff6b8b] font-semibold" : "text-[#38bdf8] font-semibold"}>
          AI engineering
        </span>
        , building autonomous LLM workflows (ChatGPT, Claude, LiteLLM) for automated schema migrations and
        end-to-end BDD testing (~90% coverage with Playwright & Cucumber).
      </motion.p>

      {/* Bento Power Strip */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.8)}
        className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
      >
        {[
          { label: "Production Experience", value: "3.8+ Yrs", tag: "THALES" },
          { label: "Daily API Volume", value: "10K+", tag: "<200MS SLA" },
          { label: "System Availability", value: "99.9%", tag: "K8S / GKE" },
          { label: "Automated Coverage", value: "~90%", tag: "PLAYWRIGHT" },
        ].map(({ label, value, tag }) => (
          <div
            key={label}
            className={`rounded-2xl p-4 border transition-all duration-500 ${
              isKurama
                ? "bg-[#140608]/90 border-[#ff0055]/20 hover:border-[#ff0055]/60 hover:shadow-[0_0_20px_rgba(255,0,85,0.25)]"
                : "bg-[#09140d]/90 border-[#f59e0b]/20 hover:border-[#f59e0b]/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            }`}
          >
            <span
              className={`text-[10px] font-mono font-bold tracking-widest ${
                isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
              }`}
            >
              {tag}
            </span>
            <p className="text-white font-black text-2xl mt-1">{value}</p>
            <p className="text-[#94a3b8] text-xs mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-7">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} isKurama={isKurama} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
