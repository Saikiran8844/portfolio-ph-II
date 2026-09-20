"use client";
import { useScroll, useTransform, motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import PhraseAnimation from "@/components/common/phrase-reveal";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-background text-foreground md:px-10 transition-colors duration-300"
      ref={containerRef}
    >
      {/* ── Section header with compact, modern reveal ── */}
      <div
        ref={headerRef}
        className="container relative z-10 pt-4 px-6 text-center mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-2.5 w-fit rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-mono font-medium text-primary uppercase tracking-widest"
        >
          Career &amp; Experience
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground inline-flex items-center justify-center gap-2">
            <span>Work</span>
            <span className="text-primary">Experience.</span>
          </h2>
        </motion.div>

        {/* Subtle accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0.5 }}
          className="mx-auto mt-2.5 h-px max-w-xs bg-linear-to-r from-transparent via-primary/40 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm text-muted-foreground font-light leading-relaxed"
        >
          <p>
            Full-time engineering roles, production freelance engagements, and high-impact distributed systems.
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineRow key={index} item={item} index={index} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-primary/80 to-transparent from-[0%] via-[20%] rounded-full shadow-[0_0_12px_rgba(201,58,42,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};

// ── Per-row scroll-reveal wrapper ────────────────────────────────────────────
function TimelineRow({
  item,
  index,
}: {
  item: { title: string; content: React.ReactNode };
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(rowRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
      animate={rowInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex justify-start pt-10 md:pt-15 md:gap-10"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background border border-primary/40 shadow-lg shadow-primary/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
        </div>
        <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
          <PhraseAnimation phrase={item.title} />
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block text-2xl mb-4 text-left font-extrabold text-foreground tracking-tight">
          <PhraseAnimation phrase={item.title} />
        </h3>
        {item.content}
      </div>
    </motion.div>
  );
}
