"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Mail,
  CalendarDays,
  Clock,
  CheckCircle2,
  Loader2,
  Video,
  Send,
  User,
  PhoneCall,
  ArrowUpRight,
  X,
} from "lucide-react";
import CollabModal from "./collab-modal";
import { sendEmail } from "@/lib/emailjs";
import { toast } from "sonner";

const RED = "oklch(59.71% 0.23 23.86)";
const RED_RGBA = "rgba(201, 58, 42,";

const CORNERS = [
  { id: "tl", top: 24, left: 24 },
  { id: "tr", top: 24, right: 24 },
  { id: "bl", bottom: 24, left: 24 },
  { id: "br", bottom: 24, right: 24 },
] as const;

const BOOKING_WORDS = [
  { text: "BOOK", accent: false },
  { text: "CLIENT.", accent: true },
  { text: "STRATEGY", accent: false },
  { text: "SESSION.", accent: true },
];

const SUCCESS_WORDS = [
  { text: "SESSION", accent: false },
  { text: "CONFIRMED.", accent: true },
];

// ── Strategy Call Booking Modal (Exact Same Theme as CollabModal) ─────────────
const CallBookingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string>("02:00 PM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setBookedSuccess(false);
        setName("");
        setEmail("");
        setTopic("");
        setLoading(false);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const dates = useMemo(() => {
    const list = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const isToday = i === 0;
      const isTomorrow = i === 1;
      const label = isToday
        ? "Today"
        : isTomorrow
        ? "Tmrw"
        : d.toLocaleDateString("en-US", { weekday: "short" });
      const formattedDate = d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      list.push({
        label,
        date: formattedDate,
        day: d.getDate().toString(),
      });
    }
    return list;
  }, []);

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
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter both your name and email.");
      return;
    }

    setLoading(true);

    try {
      const chosenDay = dates[selectedDate]?.date || "Upcoming Date";
      await sendEmail({
        name,
        email,
        message: `[30-MIN CLIENT STRATEGY CALL BOOKING]\n\nDate: ${chosenDay}\nTime Slot: ${selectedSlot} (IST / UTC+5:30)\nTopic / Project Brief: ${
          topic || "Full-Stack / AI System Consultation"
        }\n\nClient Name: ${name}\nClient Email: ${email}`,
        projectType: "30-Min Strategy Call",
      });

      setBookedSuccess(true);
      toast.success("Strategy call requested!", {
        description: `Scheduled for ${chosenDay} at ${selectedSlot}. Meeting invite transmitted to Saikiran.`,
      });
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("Transmission error", {
        description:
          err?.text ||
          err?.message ||
          "Please verify your connection or write directly to sai8844n@yahoo.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  const borderBottom = (field: string) =>
    `1px solid ${focusedField === field ? RED : "rgba(255,255,255,0.13)"}`;

  const baseInput: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    outline: "none",
    paddingBottom: "12px",
    paddingTop: "4px",
    fontFamily: "var(--font-poppins)",
    fontSize: "clamp(15px, 1.6vw, 19px)",
    color: "white",
    caretColor: RED,
    transition: "border-color 0.3s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-poppins)",
    fontSize: "9px",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.32)",
    marginBottom: "10px",
  };

  return (
    <>
      <style>{`
        .booking-input::placeholder {
          color: rgba(255,255,255,0.16);
          font-size: 13px;
          letter-spacing: 0.04em;
        }
        .booking-input::-webkit-scrollbar { display: none; }
        .booking-input { scrollbar-width: none; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-200"
            style={{ background: "#080808" }}
            aria-modal="true"
            role="dialog"
            aria-label="Strategy consultation booking form"
          >
            {/* Grain Texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "200px",
              }}
            />

            {/* Red Corner Brackets (Exact match to CollabModal) */}
            {CORNERS.map((c, i) => (
              <motion.div
                key={c.id}
                aria-hidden="true"
                className="absolute w-9 h-9 z-10 pointer-events-none"
                style={{
                  ...("top" in c ? { top: (c as { top: number }).top } : {}),
                  ...("bottom" in c
                    ? { bottom: (c as { bottom: number }).bottom }
                    : {}),
                  ...("left" in c
                    ? { left: (c as { left: number }).left }
                    : {}),
                  ...("right" in c
                    ? { right: (c as { right: number }).right }
                    : {}),
                  borderTop: c.id.includes("t")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                  borderBottom: c.id.includes("b")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                  borderLeft: c.id.includes("l")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                  borderRight: c.id.includes("r")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                }}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6 + i * 0.06,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}

            {/* Scrollable Container */}
            <div className="relative z-10 h-full overflow-y-auto flex flex-col">
              {/* ── HEADER ── */}
              <motion.header
                className="flex items-center justify-between px-8 md:px-16 pt-8 pb-5 shrink-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.5 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: RED,
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  ✦ SAIKIRAN NANNAPANENI
                </span>

                <motion.button
                  onClick={onClose}
                  className="flex items-center gap-3 cursor-pointer"
                  style={{ background: "none", border: "none", padding: 0 }}
                  aria-label="Close strategy session form"
                  whileHover="hov"
                >
                  <motion.span
                    variants={{ hov: { color: "rgba(255,255,255,0.6)" } }}
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      transition: "color 0.2s",
                    }}
                  >
                    CLOSE
                  </motion.span>
                  <motion.span
                    variants={{ hov: { rotate: 90, color: RED } }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "18px",
                      display: "block",
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </motion.span>
                </motion.button>
              </motion.header>

              {/* Thin top horizontal rule */}
              <motion.div
                className="mx-8 md:mx-16 shrink-0"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.07)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.52,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
              />

              {/* ── BODY (2-Column Layout) ── */}
              <div className="flex-1 flex flex-col lg:flex-row px-8 md:px-16 py-10 lg:py-0 gap-10 lg:gap-0 min-h-0">
                {/* ── LEFT — Kinetic Typography ── */}
                <div className="lg:w-[40%] flex flex-col justify-center lg:py-16 lg:pr-14">
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.66, duration: 0.5 }}
                    style={{
                      fontFamily: "var(--font-poppins)",
                      color: RED,
                      fontSize: "9px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      marginBottom: "28px",
                    }}
                  >
                    ✦ STRATEGY CONSULTATION
                  </motion.p>

                  {/* Stacked giant words */}
                  <div aria-hidden="true">
                    {BOOKING_WORDS.map(({ text, accent }, i) => (
                      <div key={text} style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: "112%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            delay: 0.62 + i * 0.095,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            fontFamily: "var(--font-poppins)",
                            fontSize: "clamp(46px, 6.8vw, 94px)",
                            lineHeight: 0.88,
                            color: accent ? RED : "white",
                            fontWeight: "normal",
                            paddingBottom: "2px",
                          }}
                        >
                          {text}
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.04, duration: 0.8 }}
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontSize: "11px",
                      lineHeight: "1.8",
                      color: "rgba(255,255,255,0.32)",
                      marginTop: "30px",
                      maxWidth: "280px",
                    }}
                  >
                    Direct 30-minute 1-on-1 strategy call via Google Meet / Zoom.
                    Let&apos;s evaluate architecture, AI workflows, and product scaling.
                  </motion.p>

                  {/* Red gradient line */}
                  <motion.div
                    aria-hidden="true"
                    style={{
                      height: "1px",
                      background: `linear-gradient(to right, ${RED}, transparent)`,
                      marginTop: "18px",
                      maxWidth: "280px",
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 1.14,
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />

                  {/* Timezone badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="mt-6 flex items-center gap-2"
                  >
                    <span className="size-1.5 rounded-full bg-[#c93a2a] animate-pulse" />
                    <span
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.45)",
                        textTransform: "uppercase",
                      }}
                    >
                      IST (UTC+5:30) • NEW DELHI, INDIA
                    </span>
                  </motion.div>
                </div>

                {/* Vertical Divider */}
                <motion.div
                  aria-hidden="true"
                  className="hidden lg:block w-px self-stretch shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    transformOrigin: "top",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    delay: 0.52,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                {/* ── RIGHT — Form / Success ── */}
                <div className="lg:w-[60%] flex flex-col justify-center lg:py-16 lg:pl-14">
                  <AnimatePresence mode="wait">
                    {!bookedSuccess ? (
                      <motion.form
                        key="booking-form"
                        onSubmit={handleBookCall}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-6"
                      >
                        {/* ── SELECT DATE ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.72,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label style={labelStyle}>
                            SELECT DATE <span style={{ color: RED }}>*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {dates.map((d, i) => {
                              const active = selectedDate === i;
                              return (
                                <motion.button
                                  key={d.day + i}
                                  type="button"
                                  onClick={() => setSelectedDate(i)}
                                  whileTap={{ scale: 0.94 }}
                                  style={{
                                    fontFamily: "var(--font-poppins)",
                                    fontSize: "9px",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    padding: "8px 14px",
                                    border: `1px solid ${
                                      active ? RED : "rgba(255,255,255,0.16)"
                                    }`,
                                    background: active
                                      ? `oklch(59.71% 0.23 23.86 / 0.14)`
                                      : "transparent",
                                    color: active
                                      ? RED
                                      : "rgba(255,255,255,0.45)",
                                    cursor: "pointer",
                                    transition: "all 0.22s ease",
                                  }}
                                >
                                  {d.label} • {d.date}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>

                        {/* ── SELECT TIME SLOT ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.8,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label style={labelStyle}>
                            SELECT TIME SLOT (IST) <span style={{ color: RED }}>*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {timeSlots.map((slot) => {
                              const active = selectedSlot === slot;
                              return (
                                <motion.button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedSlot(slot)}
                                  whileTap={{ scale: 0.94 }}
                                  style={{
                                    fontFamily: "var(--font-poppins)",
                                    fontSize: "9px",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    padding: "8px 14px",
                                    border: `1px solid ${
                                      active ? RED : "rgba(255,255,255,0.16)"
                                    }`,
                                    background: active
                                      ? `oklch(59.71% 0.23 23.86 / 0.14)`
                                      : "transparent",
                                    color: active
                                      ? RED
                                      : "rgba(255,255,255,0.45)",
                                    cursor: "pointer",
                                    transition: "all 0.22s ease",
                                  }}
                                >
                                  {slot}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>

                        {/* ── NAME ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.88,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label style={labelStyle}>
                            YOUR NAME <span style={{ color: RED }}>*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="booking-input"
                            style={{
                              ...baseInput,
                              borderBottom: borderBottom("name"),
                            }}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </motion.div>

                        {/* ── EMAIL ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.96,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label style={labelStyle}>
                            YOUR EMAIL <span style={{ color: RED }}>*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="booking-input"
                            style={{
                              ...baseInput,
                              borderBottom: borderBottom("email"),
                            }}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </motion.div>

                        {/* ── TOPIC ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 1.04,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label style={labelStyle}>
                            DISCUSSION TOPIC (OPTIONAL)
                          </label>
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. Next.js architecture, Shopify scaling, AI workflows"
                            className="booking-input"
                            style={{
                              ...baseInput,
                              borderBottom: borderBottom("topic"),
                            }}
                            onFocus={() => setFocusedField("topic")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </motion.div>

                        {/* ── SUBMIT BUTTON (Red Sweep from CollabModal) ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 1.12,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="pt-2"
                        >
                          <motion.button
                            type="submit"
                            disabled={loading}
                            className="relative overflow-hidden w-full cursor-pointer"
                            style={{
                              border: `1px solid ${RED}`,
                              padding: "20px 28px",
                              background: "transparent",
                            }}
                            initial="rest"
                            whileHover={!loading ? "hov" : undefined}
                          >
                            {/* Red fill sweep */}
                            <motion.div
                              aria-hidden="true"
                              variants={{
                                rest: { scaleX: 0 },
                                hov: {
                                  scaleX: 1,
                                  transition: {
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                },
                              }}
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundColor: RED,
                                transformOrigin: "left",
                              }}
                            />
                            {/* Shine line at top */}
                            <motion.div
                              aria-hidden="true"
                              variants={{
                                rest: { scaleX: 0 },
                                hov: {
                                  scaleX: 1,
                                  transition: {
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                },
                              }}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "1px",
                                background: "rgba(255,255,255,0.3)",
                                transformOrigin: "left",
                              }}
                            />
                            <span
                              style={{
                                position: "relative",
                                zIndex: 1,
                                fontFamily: "var(--font-poppins)",
                                fontSize: "10px",
                                letterSpacing: "0.36em",
                                textTransform: "uppercase",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px",
                              }}
                            >
                              {loading ? (
                                <>
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                    style={{
                                      display: "inline-block",
                                      fontSize: "11px",
                                    }}
                                  >
                                    ◌
                                  </motion.span>
                                  TRANSMITTING BOOKING
                                </>
                              ) : (
                                "CONFIRM 30-MIN STRATEGY CALL →"
                              )}
                            </span>
                          </motion.button>
                        </motion.div>
                      </motion.form>
                    ) : (
                      /* ── SUCCESS STATE (CollabModal style) ── */
                      <motion.div
                        key="booking-success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col"
                      >
                        {SUCCESS_WORDS.map(({ text, accent }, i) => (
                          <div key={text} style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: "110%" }}
                              animate={{ y: "0%" }}
                              transition={{
                                delay: i * 0.085,
                                duration: 0.9,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{
                                fontFamily: "var(--font-poppins)",
                                fontSize: "clamp(42px, 5.5vw, 76px)",
                                lineHeight: 0.88,
                                color: accent ? RED : "white",
                                fontWeight: "normal",
                                marginBottom: "2px",
                              }}
                            >
                              {text}
                            </motion.div>
                          </div>
                        ))}

                        {/* Animated red rule */}
                        <motion.div
                          aria-hidden="true"
                          style={{
                            height: "1px",
                            background: `linear-gradient(to right, ${RED}, transparent)`,
                            marginTop: "28px",
                            marginBottom: "24px",
                            transformOrigin: "left",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: 0.35,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />

                        <p
                          style={{
                            fontFamily: "var(--font-poppins)",
                            fontSize: "13px",
                            lineHeight: "1.75",
                            color: "rgba(255,255,255,0.48)",
                            maxWidth: "420px",
                            marginBottom: "36px",
                          }}
                        >
                          Your strategy call for{" "}
                          <span style={{ color: "white", fontWeight: 600 }}>
                            {dates[selectedDate]?.date} at {selectedSlot} (IST)
                          </span>{" "}
                          has been scheduled. Saikiran will email your calendar invite and video link.
                        </p>

                        <div>
                          <motion.button
                            onClick={onClose}
                            className="cursor-pointer"
                            style={{
                              border: `1px solid ${RED}`,
                              padding: "16px 36px",
                              background: "transparent",
                              fontFamily: "var(--font-poppins)",
                              fontSize: "10px",
                              letterSpacing: "0.32em",
                              textTransform: "uppercase",
                              color: "white",
                            }}
                            whileHover={{
                              backgroundColor: RED,
                              transition: { duration: 0.25 },
                            }}
                          >
                            DONE →
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Canvas 3D Rotating Globe ("Globle Normal Rounding") ────────────────────────
const GlobeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const size = 260;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Pre-generate surface constellation points on sphere (lat, lon)
    const points: { lat: number; lon: number }[] = [];
    const count = 56;
    for (let i = 0; i < count; i++) {
      const lat = ((i / count) - 0.5) * Math.PI * 0.8;
      const lon = (i * 2.39996) % (Math.PI * 2);
      points.push({ lat, lon });
    }

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const R = 112;
      const tilt = 0.22; // ~12 degrees axial tilt

      // Synchronize rotation with high-precision global clock
      const rotation = (performance.now() * 0.001) * 0.85;

      // Draw sphere background clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Tactile 3D Spherical Shading Gradient
      const grad = ctx.createRadialGradient(cx - 35, cy - 40, 15, cx, cy, R);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.68, "#f1f5f9");
      grad.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = grad;
      ctx.fill();

      // Latitude Parallels
      const latitudes = [-0.65, -0.35, 0, 0.35, 0.65];
      ctx.strokeStyle = "rgba(15, 23, 42, 0.16)";
      ctx.lineWidth = 1;
      for (const lat of latitudes) {
        const rLat = R * Math.cos(lat);
        const yLat = cy - R * Math.sin(lat) * Math.cos(tilt);
        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, rLat * Math.sin(tilt) * 0.85, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude Meridians (Rotating continuously in 3D around Y-axis)
      const numMeridians = 8;
      for (let i = 0; i < numMeridians; i++) {
        const mAngle = rotation + (i * Math.PI) / numMeridians;
        const cosM = Math.cos(mAngle);
        const sinM = Math.sin(mAngle);

        const isFront = sinM > 0;
        ctx.strokeStyle = isFront
          ? "rgba(15, 23, 42, 0.24)"
          : "rgba(15, 23, 42, 0.07)";
        ctx.lineWidth = isFront ? 1.2 : 0.8;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(Math.abs(cosM) * R, 1), R, tilt, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Surface Constellation Nodes with 3D Depth
      for (const pt of points) {
        const lon = pt.lon + rotation;
        const x3D = R * Math.cos(pt.lat) * Math.sin(lon);
        const y3D = -R * Math.sin(pt.lat);
        const z3D = R * Math.cos(pt.lat) * Math.cos(lon);

        const x2D = cx + x3D;
        const y2D = cy + y3D * Math.cos(tilt) + z3D * Math.sin(tilt);
        const zRot = z3D * Math.cos(tilt) - y3D * Math.sin(tilt);

        if (zRot > 0) {
          const alpha = 0.2 + (zRot / R) * 0.65;
          const radius = 1.0 + (zRot / R) * 1.6;
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x2D, y2D, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3D Rim Vignette
      const rimGrad = ctx.createRadialGradient(cx, cy, R * 0.78, cx, cy, R);
      rimGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      rimGrad.addColorStop(1, "rgba(0, 0, 0, 0.2)");
      ctx.fillStyle = rimGrad;
      ctx.fill();

      ctx.restore();

      // Outer Sphere Border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="size-full pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// ── Fracture Seam Math Constants ───────────────────────────────────────────────
// Complementary interlocking zigzag paths for genuine physical breaking effect
const FRACTURE_CLIP_TOP =
  "polygon(0% 0%, 100% 0%, 100% 50%, 88% 47%, 76% 53%, 62% 46%, 50% 54%, 38% 46%, 24% 53%, 12% 47%, 0% 50%)";

const FRACTURE_CLIP_BOTTOM =
  "polygon(0% 50%, 12% 47%, 24% 53%, 38% 46%, 50% 54%, 62% 46%, 76% 53%, 88% 47%, 100% 50%, 100% 100%, 0% 100%)";

const FRACTURE_SVG_PATH =
  "M 0 130 L 31.2 122.2 L 62.4 137.8 L 98.8 119.6 L 130 140.4 L 161.2 119.6 L 197.6 137.8 L 228.8 122.2 L 260 130";

// Kinetic burst shards when breaking triggers
const FRACTURE_SHARDS = [
  { x: -65, y: -50, r: -55, w: 10, h: 6, delay: 0 },
  { x: -35, y: -70, r: -80, w: 14, h: 7, delay: 0.02 },
  { x: 30, y: -65, r: 65, w: 12, h: 8, delay: 0.01 },
  { x: 70, y: -45, r: 90, w: 9, h: 5, delay: 0.03 },
  { x: -70, y: 40, r: -115, w: 11, h: 7, delay: 0.01 },
  { x: -30, y: 65, r: -135, w: 13, h: 8, delay: 0.03 },
  { x: 38, y: 70, r: 125, w: 10, h: 6, delay: 0.02 },
  { x: 75, y: 45, r: 145, w: 12, h: 7, delay: 0 },
  { x: -15, y: -35, r: -30, w: 8, h: 5, delay: 0.04 },
  { x: 16, y: 35, r: 40, w: 7, h: 4, delay: 0.04 },
];

// ── Authentic 3D Globe with Breaking / Splitting Animation ─────────────────────
interface BreakingGlobeProps {
  onBookCall: () => void;
  onEnquiry: () => void;
}

const BreakingGlobe: React.FC<BreakingGlobeProps> = ({
  onBookCall,
  onEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<"call" | "enquiry" | null>(null);

  // Magnetic cursor spring tracking
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 180, damping: 18, mass: 0.1 });
  const springY = useSpring(magY, { stiffness: 180, damping: 18, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    magX.set((e.clientX - centerX) * 0.22);
    magY.set((e.clientY - centerY) * 0.22);
  };

  const handleMouseLeave = () => {
    magX.set(0);
    magY.set(0);
    setIsHovered(false);
    setHoveredButton(null);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative size-60 sm:size-68 md:size-72 flex items-center justify-center cursor-pointer select-none"
    >
      {/* ── Outer Orbital Ambient Rings ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Orbital Dashed Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isHovered ? 6 : 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-foreground/20 dark:border-white/20"
        />

        {/* Orbiting Satellite Node */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isHovered ? 4 : 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-2.5 rounded-full bg-foreground dark:bg-white shadow-[0_0_12px_rgba(201,58,42,0.6)]" />
        </motion.div>
      </div>

      {/* ── BREAKING FRACTURE ANIMATION (Crack Lightning & Debris Shards) ── */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
            {/* Crack Lightning Line along Fissure */}
            <motion.svg
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0.7], scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-56 h-12"
              viewBox="0 0 260 50"
            >
              <defs>
                <filter id="crackGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 10 25 L 45 16 L 80 32 L 115 18 L 150 30 L 185 20 L 250 25"
                fill="none"
                stroke="#c93a2a"
                strokeWidth="3.5"
                filter="url(#crackGlow)"
              />
              <path
                d="M 80 32 L 95 44 M 150 30 L 165 14"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </motion.svg>

            {/* Glowing Energy Shards Bursting Outward */}
            {FRACTURE_SHARDS.map((shard, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0.3, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: [1, 0.9, 0],
                  scale: [0.3, 1.2, 0.6],
                  x: shard.x * 1.3,
                  y: shard.y * 1.3,
                  rotate: shard.r,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: shard.delay,
                }}
                style={{
                  width: `${shard.w}px`,
                  height: `${shard.h}px`,
                  clipPath: "polygon(20% 0%, 100% 25%, 80% 100%, 0% 75%)",
                }}
                className="absolute bg-linear-to-br from-white via-[#c93a2a] to-red-500 shadow-[0_0_12px_#c93a2a]"
              />
            ))}

            {/* Central Glowing Energy Rift */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.2, 1], opacity: [0, 0.8, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute w-48 h-1.5 rounded-full bg-linear-to-r from-transparent via-[#c93a2a] to-transparent blur-[2px]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── THE 2 FRACTURED GLOBE HALVES (Form a complete sphere when together, split when hovered) ── */}
      <div className="relative size-48 sm:size-56 md:size-60 z-30 flex items-center justify-center">
        {/* ── 1. TOP HALF OF GLOBE (Transforms into "Book Client" Button) ── */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBookCall();
          }}
          onMouseEnter={() => setHoveredButton("call")}
          onMouseLeave={() => setHoveredButton(null)}
          animate={{
            y: isHovered ? -44 : 0,
            rotate: isHovered ? -2.5 : 0,
            scale: isHovered ? (hoveredButton === "call" ? 1.05 : 1.02) : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 24,
          }}
          style={{
            clipPath: FRACTURE_CLIP_TOP,
          }}
          className="group/top absolute inset-0 size-full cursor-pointer overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_45px_rgba(255,255,255,0.12)] border-none outline-none"
        >
          {/* Synchronized 3D Rotating Globe Surface (Top Section) */}
          <div className="absolute inset-0 size-full">
            <GlobeCanvas />
          </div>

          {/* Normal Unbroken State: Top Half of "Let's Talk" */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight drop-shadow-xs select-none">
              Let&apos;s Talk
            </span>
          </motion.div>

          {/* Hover State: Top Half Background Overlay & Action Content (Crimson Red Theme - No Green) */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 transition-colors duration-300 flex flex-col items-center justify-start pt-6 sm:pt-7 px-4 ${
              hoveredButton === "call"
                ? "bg-[#c93a2a] text-white shadow-[0_0_35px_rgba(201,58,42,0.55)]"
                : "bg-white text-slate-900 hover:bg-[#c93a2a] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-tight uppercase">
              <CalendarDays className="size-3.5 sm:size-4" />
              <span>Book Client</span>
              <ArrowUpRight className="size-3 opacity-70 group-hover/top:translate-x-0.5 group-hover/top:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono opacity-85 mt-0.5 tracking-wider uppercase font-semibold">
              30-Min Strategy Call
            </span>
          </motion.div>

          {/* Glowing Jagged Fracture Rim along Bottom Edge */}
          <svg
            className="absolute inset-0 size-full pointer-events-none"
            viewBox="0 0 260 260"
            preserveAspectRatio="none"
          >
            <path
              d={FRACTURE_SVG_PATH}
              fill="none"
              stroke="#c93a2a"
              strokeWidth={isHovered ? 2.5 : 1}
              opacity={isHovered ? 0.9 : 0.25}
            />
          </svg>
        </motion.button>

        {/* ── 2. BOTTOM HALF OF GLOBE (Transforms into "Direct Enquiry" Button) ── */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEnquiry();
          }}
          onMouseEnter={() => setHoveredButton("enquiry")}
          onMouseLeave={() => setHoveredButton(null)}
          animate={{
            y: isHovered ? 44 : 0,
            rotate: isHovered ? 2.5 : 0,
            scale: isHovered ? (hoveredButton === "enquiry" ? 1.05 : 1.02) : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 24,
          }}
          style={{
            clipPath: FRACTURE_CLIP_BOTTOM,
          }}
          className="group/bottom absolute inset-0 size-full cursor-pointer overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_45px_rgba(255,255,255,0.12)] border-none outline-none"
        >
          {/* Synchronized 3D Rotating Globe Surface (Bottom Section) */}
          <div className="absolute inset-0 size-full">
            <GlobeCanvas />
          </div>

          {/* Normal Unbroken State: Bottom Half of "Let's Talk" */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight drop-shadow-xs select-none">
              Let&apos;s Talk
            </span>
          </motion.div>

          {/* Hover State: Bottom Half Background Overlay & Action Content */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 transition-colors duration-300 flex flex-col items-center justify-end pb-6 sm:pb-7 px-4 ${
              hoveredButton === "enquiry"
                ? "bg-[#c93a2a] text-white shadow-[0_0_35px_rgba(201,58,42,0.55)]"
                : "bg-white text-slate-900 hover:bg-[#c93a2a] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-tight uppercase">
              <Send className="size-3.5 sm:size-4" />
              <span>Direct Enquiry</span>
              <ArrowUpRight className="size-3 opacity-70 group-hover/bottom:translate-x-0.5 group-hover/bottom:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono opacity-85 mt-0.5 tracking-wider uppercase font-semibold">
              Project Brief &amp; Collab
            </span>
          </motion.div>

          {/* Glowing Jagged Fracture Rim along Top Edge */}
          <svg
            className="absolute inset-0 size-full pointer-events-none"
            viewBox="0 0 260 260"
            preserveAspectRatio="none"
          >
            <path
              d={FRACTURE_SVG_PATH}
              fill="none"
              stroke="#c93a2a"
              strokeWidth={isHovered ? 2.5 : 1}
              opacity={isHovered ? 0.9 : 0.25}
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ── Main Section Component: "Let's make waves." with Breaking Globe ───────────
export const CalBooking = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [collabModalOpen, setCollabModalOpen] = useState(false);

  return (
    <div
      ref={containerRef}
      id="contact"
      className="w-full min-h-[85vh] py-20 sm:py-28 md:py-36 px-6 sm:px-12 lg:px-20 relative flex flex-col justify-center bg-background text-foreground transition-colors duration-300 overflow-hidden"
    >
      {/* Background Subtle Radial Atmosphere (Theme-Aware) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-[#c93a2a]/10 dark:bg-[#c93a2a]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── MAIN SHOWCASE: "Let's make waves." + Breaking Globe ── */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 z-10">
        {/* Left Side: Exact Typography from Reference Image */}
        <div className="w-full lg:w-auto text-left">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground leading-[0.88] select-none">
            Let&apos;s make <br />
            <span className="text-[#c93a2a]">waves.</span>
          </h2>
        </div>

        {/* Right Side: Rotating Globe with Breaking Split Animation */}
        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end">
          <BreakingGlobe
            onBookCall={() => setCallModalOpen(true)}
            onEnquiry={() => setCollabModalOpen(true)}
          />
        </div>
      </div>

      {/* ── MODALS (Opened only when clicking the split buttons) ── */}
      <CallBookingModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
      />

      <CollabModal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
      />
    </div>
  );
};

export default CalBooking;
