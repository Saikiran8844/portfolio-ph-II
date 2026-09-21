"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Quote, Star, CheckCircle2, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageCardProps {
  message: string;
  name: string;
  role: string;
  company?: string;
  project?: string;
  rating?: number;
  date?: string;
  avatar: string;
  isActive: boolean;
  vimeoId?: string;
}

export const MessageCard = ({
  message,
  name,
  role,
  company,
  project,
  rating = 5,
  date,
  avatar,
  isActive,
}: MessageCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "embla__slide group relative flex flex-col transition-all duration-300 select-none",
      )}
      style={{
        flex: "0 0 calc(100vw - 48px)",
        marginRight: "16px",
        minWidth: "300px",
        maxWidth: "520px",
      }}
    >
      {/* Inner Card */}
      <figure
        className={cn(
          "relative flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-300",
          "border bg-card/60 backdrop-blur-xl p-6 sm:p-8",
          isActive
            ? "border-primary/50 shadow-xl shadow-primary/10 opacity-100 ring-1 ring-primary/20"
            : "border-border/40 opacity-60 hover:opacity-85 hover:border-border/80",
        )}
      >
        {/* Glow & Shine Effects */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-primary/15 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute inset-0 z-20 -translate-x-[100%] bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]" />

        {/* Top Meta Bar: Stars & Project Tag */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-5">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4 transition-colors",
                  i < rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted-foreground/30",
                )}
              />
            ))}
            <span className="ml-1.5 text-xs font-mono font-semibold text-foreground/80">
              {rating}.0
            </span>
          </div>

          {/* Project Tag */}
          {project && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-primary">
              <Sparkles className="size-2.5" />
              {project}
            </span>
          )}
        </div>

        {/* Decorative Quote mark */}
        <Quote className="absolute right-6 top-8 size-20 text-muted/10 pointer-events-none group-hover:text-primary/10 transition-colors duration-500" />

        {/* Testimonial Body */}
        <blockquote className="relative z-10 flex-1 text-sm sm:text-[15px] leading-relaxed text-muted-foreground group-hover:text-foreground/95 transition-colors duration-300">
          &ldquo;{message}&rdquo;
        </blockquote>

        {/* Divider */}
        <div className="relative z-10 my-5 h-px w-full bg-border/40" />

        {/* Author Footer */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-11 border border-border/80 shrink-0">
              <AvatarImage src={avatar} alt={name} className="object-cover" />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <figcaption className="text-sm sm:text-base font-semibold text-foreground truncate">
                  {name}
                </figcaption>
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {role}
                {company && (
                  <span className="text-foreground/70"> &middot; {company}</span>
                )}
              </p>
            </div>
          </div>

          {date && (
            <span className="text-[11px] font-mono text-muted-foreground/60 shrink-0">
              {date}
            </span>
          )}
        </div>
      </figure>

      {/* Futuristic Corner Accents on Active Card */}
      {isActive && (
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="absolute -left-1 -top-1 size-4 border-l-2 border-t-2 border-primary rounded-tl-sm" />
          <div className="absolute -right-1 -top-1 size-4 border-r-2 border-t-2 border-primary rounded-tr-sm" />
          <div className="absolute -left-1 -bottom-1 size-4 border-l-2 border-b-2 border-primary rounded-bl-sm" />
          <div className="absolute -right-1 -bottom-1 size-4 border-r-2 border-b-2 border-primary rounded-br-sm" />
        </div>
      )}
    </div>
  );
};
