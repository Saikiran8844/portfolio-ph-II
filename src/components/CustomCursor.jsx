import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { isKurama } = useTheme();

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot transition-colors duration-500"
        style={{
          backgroundColor: isKurama ? "#ff0055" : "#f59e0b",
          boxShadow: isKurama
            ? "0 0 10px #ff0055, 0 0 20px rgba(255, 0, 85, 0.7)"
            : "0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.7)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring transition-colors duration-500"
        style={{
          borderColor: isKurama ? "rgba(255, 42, 0, 0.7)" : "rgba(16, 185, 129, 0.7)",
          boxShadow: isKurama
            ? "0 0 15px rgba(255, 59, 0, 0.3)"
            : "0 0 15px rgba(16, 185, 129, 0.3)",
        }}
      />
    </>
  );
};

export default CustomCursor;
