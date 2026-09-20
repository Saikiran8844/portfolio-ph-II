import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEMES = {
  NARUTO: "naruto",
  KURAMA: "kurama",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem("ninja_portfolio_theme");
      return saved === THEMES.KURAMA ? THEMES.KURAMA : THEMES.NARUTO;
    } catch {
      return THEMES.NARUTO;
    }
  });

  const setTheme = (newTheme) => {
    const valid = newTheme === THEMES.KURAMA ? THEMES.KURAMA : THEMES.NARUTO;
    setThemeState(valid);
    try {
      localStorage.setItem("ninja_portfolio_theme", valid);
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === THEMES.NARUTO ? THEMES.KURAMA : THEMES.NARUTO);
  };

  const isKurama = theme === THEMES.KURAMA;
  const isNaruto = theme === THEMES.NARUTO;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-naruto", "theme-kurama");
    root.classList.add(isKurama ? "theme-kurama" : "theme-naruto");
    root.setAttribute("data-theme", theme);
  }, [theme, isKurama]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isKurama,
    isNaruto,
    // Theme palette shortcuts
    colors: isKurama
      ? {
          primary: "#ff2a00",
          secondary: "#ff0055",
          accent: "#ffaa00",
          glow: "rgba(255, 42, 0, 0.45)",
          tag: "KURAMA NINE-TAILS MODE",
          border: "border-[#ff2a00]/40",
          gradient: "from-[#ff2a00] via-[#ff0055] to-[#ffaa00]",
          textGradient: "from-[#ff4500] via-[#ff0055] to-[#ffa500]",
        }
      : {
          primary: "#f59e0b",
          secondary: "#10b981",
          accent: "#38bdf8",
          glow: "rgba(245, 158, 11, 0.35)",
          tag: "NATURAL SAGE MODE",
          border: "border-[#f59e0b]/40",
          gradient: "from-[#f59e0b] via-[#10b981] to-[#38bdf8]",
          textGradient: "from-[#f59e0b] via-[#10b981] to-[#38bdf8]",
        },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
