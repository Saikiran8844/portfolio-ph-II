"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface MotionContextType {
  isReducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  isReducedMotion: false,
  setReducedMotion: () => {},
  toggleReducedMotion: () => {},
});

export const useMotionPreference = () => useContext(MotionContext);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check localStorage preference first
    const saved = localStorage.getItem("portfolio-reduced-motion");
    if (saved !== null) {
      setIsReducedMotion(saved === "true");
      return;
    }

    // Otherwise detect system prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const setReducedMotion = (value: boolean) => {
    setIsReducedMotion(value);
    localStorage.setItem("portfolio-reduced-motion", String(value));
    if (value) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!isReducedMotion);
  };

  return (
    <MotionContext.Provider value={{ isReducedMotion, setReducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};
