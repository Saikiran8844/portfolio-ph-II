import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { isKurama } = useTheme();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Saikiran Nannapaneni",
          from_email: form.email,
          to_email: "sai8844n@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you! I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please reach out directly at sai8844n@gmail.com.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className={`flex-[0.75] p-8 rounded-2xl border transition-all duration-500 ${
          isKurama
            ? "bg-[#140608]/90 border-[#ff0055]/30 shadow-[0_0_30px_rgba(255,0,85,0.15)]"
            : "bg-[#0a140f]/90 border-[#f59e0b]/30 shadow-[0_0_30px_rgba(245,158,11,0.12)]"
        }`}
      >
        <p
          className={`font-mono uppercase tracking-widest text-xs font-bold transition-colors duration-500 ${
            isKurama ? "text-[#ff6b8b]" : "text-[#f59e0b]"
          }`}
        >
          {isKurama ? "// TRANSMIT MISSION DIRECTIVE" : "// GET IN TOUCH"}
        </p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-sm">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className={`py-3.5 px-5 placeholder:text-[#64748b] text-white rounded-xl outline-none border transition-colors duration-300 font-medium text-sm ${
                isKurama
                  ? "bg-[#1f090c] border-[#ff0055]/20 focus:border-[#ff0055]"
                  : "bg-[#112117] border-[#f59e0b]/20 focus:border-[#f59e0b]"
              }`}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-sm">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={`py-3.5 px-5 placeholder:text-[#64748b] text-white rounded-xl outline-none border transition-colors duration-300 font-medium text-sm ${
                isKurama
                  ? "bg-[#1f090c] border-[#ff0055]/20 focus:border-[#ff0055]"
                  : "bg-[#112117] border-[#f59e0b]/20 focus:border-[#f59e0b]"
              }`}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-sm">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project, requirements, or opportunities..."
              className={`py-3.5 px-5 placeholder:text-[#64748b] text-white rounded-xl outline-none border transition-colors duration-300 font-medium text-sm ${
                isKurama
                  ? "bg-[#1f090c] border-[#ff0055]/20 focus:border-[#ff0055]"
                  : "bg-[#112117] border-[#f59e0b]/20 focus:border-[#f59e0b]"
              }`}
            />
          </label>

          <button
            type="submit"
            className={`py-3.5 px-8 rounded-xl font-bold text-white transition-all duration-300 w-fit ${
              isKurama
                ? "bg-gradient-to-r from-[#ff0055] to-[#ff3b00] shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,42,0,0.7)]"
                : "bg-gradient-to-r from-[#f59e0b] to-[#10b981] shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
            }`}
          >
            {loading ? "Sending Transmission..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
