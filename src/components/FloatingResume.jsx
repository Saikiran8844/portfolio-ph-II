import React, { useRef } from "react";
import { motion } from "framer-motion";

const FloatingResume = () => {
  const constraintsRef = useRef(null);
  const isDragging = useRef(false);

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
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 bg-[#915EFF] rounded-full flex justify-center items-center shadow-card border-2 border-white relative group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <span className="absolute right-full mr-2 w-max bg-tertiary text-white text-xs font-bold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Download My resume
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingResume;