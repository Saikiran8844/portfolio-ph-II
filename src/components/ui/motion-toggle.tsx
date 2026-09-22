"use client";

import React from "react";
import { useMotionPreference } from "@/providers/motion-provider";
import { Sparkles, Eye, EyeOff, Activity } from "lucide-react";

export const MotionToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { isReducedMotion, toggleReducedMotion } = useMotionPreference();

  return (
    <button
      onClick={toggleReducedMotion}
      type="button"
      title={isReducedMotion ? "Switch to Cinematic Animations (GSAP / 3D)" : "Switch to Reduced Motion (A11y Friendly)"}
      className={`group relative inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-mono backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/10 shadow-sm cursor-pointer ${className}`}
      aria-pressed={isReducedMotion}
      aria-label="Toggle Reduced Motion"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isReducedMotion ? "bg-amber-400" : "animate-ping bg-emerald-400"
            }`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${isReducedMotion ? "bg-amber-500" : "bg-emerald-500"
            }`}
        />
      </span>

      {isReducedMotion ? (
        <>
          <EyeOff className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-muted-foreground group-hover:text-foreground">Reduced</span>
        </>
      ) : (
        <>
          <Eye className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-muted-foreground group-hover:text-foreground">Cinematic</span>
        </>
      )}

      <span className="hidden lg:inline text-[10px] text-muted-foreground/60 border-l border-border/40 pl-1.5 font-mono">
        {isReducedMotion ? "A11y ON" : "GSAP + 3D"}
      </span>
    </button>
  );
};
