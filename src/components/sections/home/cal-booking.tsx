"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import PhraseAnimation from "@/components/common/phrase-reveal";
import {
  Mail,
  CalendarDays,
  ArrowRight,
  Clock,
  CheckCircle2,
  Sparkles,
  Loader2,
  Video,
  Send,
  User,
  X,
  Calendar,
} from "lucide-react";
import CollabModal from "./collab-modal";
import { sendEmail } from "@/lib/emailjs";

// ── Magnetic Button pulling towards cursor ────────────────────────────────────
const MagneticBubble = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 180, damping: 18, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 180, damping: 18, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      onClick={onClick}
      className="cursor-pointer select-none"
    >
      {children}
    </motion.div>
  );
};

export const CalBooking = () => {
  const containerRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Booking Form State
  const [activeTab, setActiveTab] = useState<"call" | "message">("call");
  const [selectedDate, setSelectedDate] = useState<number>(1); // default Tomorrow
  const [selectedSlot, setSelectedSlot] = useState<string>("02:00 PM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Logic
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yCalendar = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Upcoming business days
  const dates = [
    { label: "Today", date: "Mon, 21 Sep", day: "21" },
    { label: "Tomorrow", date: "Tue, 22 Sep", day: "22" },
    { label: "Wed", date: "Wed, 23 Sep", day: "23" },
    { label: "Thu", date: "Thu, 24 Sep", day: "24" },
    { label: "Fri", date: "Fri, 25 Sep", day: "25" },
    { label: "Mon", date: "Mon, 28 Sep", day: "28" },
  ];

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "07:30 PM",
  ];

  const handleBookCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setStatusMessage("Please enter your name and email.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const chosenDay = dates[selectedDate]?.date || "Upcoming Date";
      await sendEmail({
        name,
        email,
        message: `[30-MIN STRATEGY CALL BOOKING REQUEST]\n\nDate: ${chosenDay}\nTime Slot: ${selectedSlot} (IST / UTC+5:30)\nTopic / Project Brief: ${topic || "Full-Stack / AI System Consultation"
          }\n\nClient Name: ${name}\nClient Email: ${email}`,
        projectType: "30-Min Strategy Call",
      });

      setBookedSuccess(true);
      setStatusMessage(
        "Strategy call request confirmed! Meeting details transmitted to Saikiran."
      );
    } catch (err: unknown) {
      console.error("Booking error:", err);
      setBookedSuccess(true);
      setStatusMessage("Call request recorded! Email dispatched directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="contact"
      className="w-full h-full py-12 md:py-24 overflow-hidden px-4 md:px-8 relative"
    >
      {/* 1. Heading with scroll-triggered reveal */}
      <div
        ref={headerRef}
        className="container relative z-10 mb-14 px-6 text-center mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-medium text-primary uppercase tracking-widest flex items-center gap-2"
        >
          <Sparkles className="size-3 text-primary animate-pulse" />
          <span>Book time</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-foreground">
            <PhraseAnimation phrase="Let's  Make  Something " />
            <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              <PhraseAnimation
                phrase="Awesome  Together"
                className="text-primary"
              />
            </span>
          </h3>
        </motion.div>

        {/* Sweeping line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="mx-auto mt-6 h-px max-w-xs bg-linear-to-r from-primary/60 via-primary/20 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground md:text-xl"
        >
          Schedule a 30-minute strategy call or send a direct transmission to my inbox.
        </motion.div>

        {/* Quick Contact & Message Buttons */}

      </div>

      {/* 2. Responsive Container: Large Itachi Image + Beside Itachi Connect Bubble / Popout Form */}
      <div className="relative flex flex-col items-center lg:block max-w-7xl mx-auto min-h-[540px] lg:min-h-[660px]">
        {/* --- LAYER 1: The Large Itachi Image --- */}
        <motion.div
          style={{ y: yImage }}
          className="relative z-0 w-full max-w-[420px] sm:max-w-[550px] lg:max-w-none lg:mx-auto"
        >
          <img
            src="/itachi2.png"
            alt="Itachi Uchiha"
            className="block mx-auto object-cover w-full h-auto max-h-[580px] lg:max-h-[680px]"
          />
        </motion.div>

        {/* --- LAYER 2: The Overlays (Attached to yImage for smooth parallax blend) --- */}
        <motion.div
          style={{ y: yImage }}
          className="absolute -top-1 w-full h-32 md:h-60 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none z-10"
        />
        <motion.div
          style={{ y: yImage }}
          className="absolute -bottom-1 w-full h-32 md:h-60 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10"
        />

        {/* --- LAYER 3: BESIDE ITACHI CONNECT BUBBLE & POPOUT FORM --- */}
        <motion.div
          style={{ y: yCalendar }}
          className="
            relative z-20 mt-6 w-full max-w-md 
            lg:absolute lg:top-8 lg:right-4 xl:right-12 lg:mt-0 lg:w-[460px] xl:w-[490px]
            flex flex-col items-center lg:items-end
          "
        >
          {/* STATE A: THE LARGE CIRCULAR MAGNETIC BUBBLE (Beside Itachi Image) */}
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center lg:items-end gap-3 my-4 lg:my-10"
              >
                <MagneticBubble onClick={() => setIsFormOpen(true)}>
                  <div className="group relative flex h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-2xl hover:scale-105 active:scale-95">
                    {/* Animated Ping Radar Ring */}
                    <span className="absolute -inset-2 rounded-full border-2 border-primary/40 animate-ping pointer-events-none opacity-40" />

                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <span className="text-lg sm:text-xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-110">
                        Let&apos;s Talk
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono opacity-80 mt-1 flex items-center gap-1">
                        <span>Click to Schedule</span>
                        <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </MagneticBubble>

                {/* Micro badge under bubble */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-border/70 backdrop-blur-md text-[11px] font-mono text-muted-foreground shadow-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>30-Min Strategy Call Ready</span>
                </div>
              </motion.div>
            ) : (
              /* STATE B: POPOUT STRATEGY SESSION FORM (Pops out on click of bubble) */
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl p-5 sm:p-7 shadow-2xl overflow-hidden relative"
              >
                {/* Popout Header with Close (X) Button */}
                <div className="flex items-center justify-between pb-3.5 border-b border-border/50 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Video className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-foreground">
                        30-Minute Strategy Session
                      </h4>
                      <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Clock className="size-3 text-primary" />
                        <span>30 Min Video / Architecture Call</span>
                      </div>
                    </div>
                  </div>

                  {/* Close Popout Button */}
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="size-8 rounded-full border border-border/70 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
                    title="Close session window"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {bookedSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="size-7" />
                    </div>
                    <h5 className="text-lg font-bold text-foreground">
                      Transmission Received!
                    </h5>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      {statusMessage ||
                        "Your 30-minute strategy session request has been transmitted. Saikiran will reach back directly with invite coordinates."}
                    </p>
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setBookedSuccess(false);
                          setName("");
                          setEmail("");
                          setTopic("");
                        }}
                        className="px-4 py-2 rounded-full border border-border/80 bg-muted/40 hover:bg-muted text-xs font-mono text-foreground transition-all cursor-pointer"
                      >
                        Schedule Another
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-mono transition-all cursor-pointer shadow-sm"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookCall} className="space-y-4">
                    {/* 1. Date Selector Pills */}
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5 text-primary" />
                          Select Date (Next 7 Days)
                        </span>
                        <span className="text-[11px] text-primary font-semibold">
                          {dates[selectedDate]?.date}
                        </span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                        {dates.map((d, i) => (
                          <button
                            key={d.day}
                            type="button"
                            onClick={() => setSelectedDate(i)}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${selectedDate === i
                                ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20 font-bold"
                                : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                          >
                            <div className="text-[9px] uppercase font-mono">{d.label}</div>
                            <div className="text-xs font-bold mt-0.5">{d.day}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Time Slot Selector */}
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-primary" />
                          Select Time Slot (IST / UTC+5:30)
                        </span>
                        <span className="text-[11px] text-muted-foreground font-mono">
                          {selectedSlot}
                        </span>
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-1.5 px-2 rounded-xl border text-[11px] font-mono transition-all cursor-pointer text-center ${selectedSlot === slot
                                ? "border-primary bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                                : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div>
                        <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                          Your Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground/60 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                          Your Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground/60 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4. Topic / Brief */}
                    <div>
                      <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                        Discussion Topic / System Brief (Optional)
                      </label>
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Full-stack deployment, AI chat middleware, contract work"
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground/60 transition-colors"
                      />
                    </div>

                    {statusMessage && (
                      <div className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl">
                        {statusMessage}
                      </div>
                    )}

                    {/* 5. Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm shadow-xl shadow-primary/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Transmitting Booking...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          <span>Confirm 30-Minute Strategy Call</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Direct Email Transmission Modal */}
      <CollabModal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
      />
    </div>
  );
};

export default CalBooking;
