import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  CustomCursor,
  CanvasLoader,
} from "./components";
import FloatingResume from "./components/FloatingResume";

const PortfolioContent = () => {
  const { isKurama } = useTheme();

  return (
    <div
      className={`relative z-0 min-h-screen transition-colors duration-700 ${
        isKurama
          ? "bg-[#090305] text-white selection:bg-[#ff0055] selection:text-white"
          : "bg-[#070b09] text-white selection:bg-[#f59e0b] selection:text-black"
      }`}
    >
      <CustomCursor />

      {/* Header with Naruto / Kurama Switcher */}
      <Navbar />

      {/* Hero with Natural Sage Mode vs Kurama Nine-Tails Mode */}
      <Hero />

      {/* Main Sections */}
      <About />
      <div id="skills">
        <Tech />
      </div>
      <Experience />
      <Works />

      {/* Contact + 3D Chakra Stars Canvas */}
      <div className="relative z-0">
        <Contact />
        <Suspense fallback={<CanvasLoader />}>
          <StarsCanvas />
        </Suspense>
      </div>

      <FloatingResume />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <PortfolioContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
