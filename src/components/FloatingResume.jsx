import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const FloatingResume = () => {
  const constraintsRef = useRef(null);
  const isDragging = useRef(false);
  const { isKurama } = useTheme();

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="absolute bottom-10 right-10 pointer-events-auto cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => setTimeout(() => (isDragging.current = false), 100)}
        onClick={() => {
          if (!isDragging.current) {
            window.open(import.meta.env.VITE_RESUME_URL, "_blank");
          }
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className={`w-14 h-14 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/80 relative group transition-all duration-500 ${
            isKurama
              ? "bg-gradient-to-tr from-[#ff0055] to-[#ff3b00] shadow-[0_0_25px_rgba(255,0,85,0.6)]"
              : "bg-gradient-to-tr from-[#f59e0b] to-[#10b981] shadow-[0_0_25px_rgba(245,158,11,0.5)]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-7 h-7 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <span className="absolute right-full mr-2 w-max bg-black/90 border border-white/20 text-white text-xs font-bold rounded-lg py-1 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Download Resume
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingResume;
