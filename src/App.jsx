import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Certifications,
  CustomCursor,
  CanvasLoader,
} from "./components";
import FloatingResume from "./components/FloatingResume";

const App = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="relative z-0 bg-primary">
        {/* Hero — full-screen cinematic, no bg pattern needed */}
        <Navbar />
        <Hero />

        {/* Main content */}
        <About />
        <Experience />
        <Tech />
        <Certifications />
        <Works />

        {/* Contact + Star canvas */}
        <div className="relative z-0">
          <Contact />
          <Suspense fallback={<CanvasLoader />}>
            <StarsCanvas />
          </Suspense>
        </div>

        <FloatingResume />
      </div>
    </BrowserRouter>
  );
};

export default App;
