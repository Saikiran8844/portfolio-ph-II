"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMotionPreference } from "@/providers/motion-provider";
import {
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Zap,
  Terminal,
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  Flame,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  category: "React" | "VueJS" | "Scroll Animation" | "Text Animation" | "SVG Animation" | "Three.js" | "Web GL" | "UI Interactions";
  subtitle: string;
  description: string;
  gsapTechnique: string;
  inspiration: string;
  tags: string[];
  gradient: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "vue-react-playground",
    title: "Dual-Engine Reactive Architecture",
    category: "VueJS",
    subtitle: "Vue 3 Composition vs React 19 Concurrent Mesh",
    description:
      "Interactive multi-framework benchmark comparing Vue 3's reactive proxy system with React 19's concurrent state model for real-time telemetry streaming in enterprise dashboards.",
    gsapTechnique: "GSAP timeline state interpolator with numerical tweening and scrubbed comparative metrics.",
    inspiration: "Modern GSAP Community Showcases & Reactive State Systems",
    tags: ["VueJS", "React", "State Architecture", "Telemetry"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "kinetic-cyber-text",
    title: "Kinetic Cyber Decryption Text Engine",
    category: "Text Animation",
    subtitle: "Character-by-character cryptographic reveal",
    description:
      "High-impact matrix cyber text decoder mimicking mainframe decryption sequences used in enterprise security authentication monitoring.",
    gsapTechnique: "GSAP text scramble with randomized hexadecimal characters, staggered easing, and soundless kinetic typography.",
    inspiration: "Illoca & Revelatio Studio GSAP Showcases",
    tags: ["Text Animation", "GSAP Scramble", "Typography"],
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "holographic-card-tilt",
    title: "Holographic 3D Interactive Card Physics",
    category: "UI Interactions",
    subtitle: "Gyroscope & cursor reactive perspective tilt",
    description:
      "Awwwards-winning 3D perspective card utilizing WebGL glare overlays, dynamic surface specular reflections, and physics-driven spring easing.",
    gsapTechnique: "GSAP quickTo for 60fps cursor spring physics, transform-style: preserve-3d, and dynamic glare coordinates.",
    inspiration: "Huy Phan Portfolio & Graffico Office Showcases",
    tags: ["UI Interactions", "3D Physics", "Webflow Style"],
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "svg-mesh-morph",
    title: "Dynamic Cloud-Native SVG Mesh Morph",
    category: "SVG Animation",
    subtitle: "Self-healing Kubernetes node visualization",
    description:
      "Continuous geometric path morphing representing autonomous Kubernetes pod healing, scaling from healthy state to recovery mode.",
    gsapTechnique: "GSAP MorphSVG & stroke-dashoffset interpolation with glowing drop-shadows.",
    inspiration: "Unseen Studio & GSAP SVG Award Winners",
    tags: ["SVG Animation", "Morphing", "Kubernetes"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
];

export const GsapShowcaseLabs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedLab, setSelectedLab] = useState<ShowcaseItem>(SHOWCASE_ITEMS[0]);
  const [vueCounter, setVueCounter] = useState<number>(10480);
  const [reactCounter, setReactCounter] = useState<number>(10480);
  const [scrambleText, setScrambleText] = useState<string>("ZERO-TRUST SECURITY ENCRYPTED");
  const { isReducedMotion } = useMotionPreference();

  const categories = ["All", "VueJS", "React", "Text Animation", "UI Interactions", "SVG Animation"];

  const filteredItems =
    activeCategory === "All"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory || item.tags.includes(activeCategory));

  // Cyber Text Decryption Animation Trigger
  const triggerScramble = () => {
    if (isReducedMotion) {
      setScrambleText("REACTIVE STREAM // PROTOCOL INITIALIZED");
      return;
    }

    const phrases = [
      "ZERO-TRUST IDENTITY PROTOCOL ONLINE",
      "DISTRIBUTED EVENT MESH SYNCHRONIZED",
      "KINETIC DECRYPTION SEQUENCE READY",
      "LITELLM AGENT FUNCTION ROUTER ACTIVE",
      "THREE.JS WEBGL RENDER BUFFER MOUNTED",
    ];
    const targetPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let iteration = 0;

    const interval = setInterval(() => {
      setScrambleText(
        targetPhrase
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return targetPhrase[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetPhrase.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  // Tilt Card Handler
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section ref={containerRef} id="creative-labs" className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono text-primary mb-4">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span>GSAP SHOWCASE &amp; CREATIVE LABS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Interactive <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">Engineering Labs</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl">
              Consuming patterns from leading GSAP award showcases (Illoca, Huy Phan, Revelatio, Unseen Studio) and applying them to Saikiran&apos;s real-world software architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                    : "border border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              onClick={() => setSelectedLab(item)}
              className={`relative rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 transition-all duration-300 hover:border-primary/50 cursor-pointer shadow-xl overflow-hidden group ${
                selectedLab.id === item.id ? "ring-2 ring-primary/40 border-primary" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-80 transition-opacity`} />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-background/80 border border-border/60 px-3 py-1 text-xs font-mono text-primary font-bold">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                      Explore Lab <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-muted-foreground mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="rounded bg-muted/60 px-2 py-0.5 text-[11px] text-foreground/80">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Inspired by {item.inspiration.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Interactive Lab Sandbox */}
        <div className="rounded-3xl border border-border/70 bg-card/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-border/40 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-muted-foreground ml-2">
                active-lab-sandbox://{selectedLab.id}
              </span>
            </div>
            <span className="text-xs font-mono text-primary font-bold">
              TECHNIQUE: {selectedLab.category}
            </span>
          </div>

          {/* Interactive Lab Content Switcher */}
          {selectedLab.id === "vue-react-playground" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vue 3 Composition API Panel */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="text-sm font-bold text-emerald-400">Vue 3 Composition API</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-500">Fine-Grained Proxy</span>
                  </div>
                  <div className="text-3xl font-mono font-black text-foreground mb-2">
                    {vueCounter.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">events/sec</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Direct proxy reactivity. Tracked state mutation without virtual DOM tree reconciliation over thousands of telemetry payloads.
                  </p>
                  <button
                    onClick={() => setVueCounter((c) => c + 150)}
                    className="w-full rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 py-2.5 text-xs font-mono text-emerald-300 font-semibold transition-all cursor-pointer"
                  >
                    + Emulate Vue 3 Reactive Stream
                  </button>
                </div>

                {/* React 19 Concurrent Model Panel */}
                <div className="rounded-2xl border border-blue-500/30 bg-blue-950/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <span className="text-sm font-bold text-blue-400">React 19 Concurrent Hooks</span>
                    </div>
                    <span className="text-xs font-mono text-blue-500">Transition Queues</span>
                  </div>
                  <div className="text-3xl font-mono font-black text-foreground mb-2">
                    {reactCounter.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">events/sec</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Coordinated fiber reconciliation with Server Components, Actions, and seamless GSAP lifecycle integration.
                  </p>
                  <button
                    onClick={() => setReactCounter((c) => c + 150)}
                    className="w-full rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 py-2.5 text-xs font-mono text-blue-300 font-semibold transition-all cursor-pointer"
                  >
                    + Emulate React 19 Concurrent Update
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-xs font-mono text-muted-foreground flex items-center justify-between">
                <span>BENCHMARK: High-throughput Kafka/Redis streaming consumer with synchronized UI updates</span>
                <span className="text-primary font-bold">SLA: &lt;5ms Frame Budget</span>
              </div>
            </div>
          )}

          {selectedLab.id === "kinetic-cyber-text" && (
            <div className="space-y-6 text-center py-8">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Interactive Text Decryption Buffer
              </div>
              <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-foreground tracking-wider py-4 bg-muted/20 rounded-2xl border border-border/50 select-all">
                {scrambleText}
              </div>
              <div>
                <button
                  onClick={triggerScramble}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-xs font-mono font-bold tracking-wider transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  ⚡ Run GSAP Kinetic Decrypt Sequence
                </button>
              </div>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Inspired by GSAP split-text &amp; kinetic typography showcases. Scrambles random bytes before locking into authenticated system telemetry.
              </p>
            </div>
          )}

          {selectedLab.id !== "vue-react-playground" && selectedLab.id !== "kinetic-cyber-text" && (
            <div className="py-6 space-y-4">
              <div className="text-xl font-bold text-foreground">{selectedLab.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedLab.description}</p>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="text-xs font-mono text-primary font-bold uppercase mb-1">GSAP Mechanics:</div>
                <div className="text-xs font-mono text-muted-foreground">{selectedLab.gsapTechnique}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
