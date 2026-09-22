"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/data/user-data";

interface AvatarCarouselProps {
  users: UserData[];
  activeIndex: number;
  onAvatarClick: (index: number) => void;
}

export const AvatarCarousel = ({
  users,
  activeIndex,
  onAvatarClick,
}: AvatarCarouselProps) => {
  return (
    <div className="flex items-start justify-center gap-2.5 sm:gap-4 md:gap-6 px-2 pb-10 md:pb-8">
      {users.map((user, index) => {
        const isActive = activeIndex === index;
        const initials = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return (
          <button
            key={user.id}
            type="button"
            onClick={() => onAvatarClick(index)}
            aria-label={`View testimonial by ${user.name}`}
            className="relative transition-all duration-300 focus:outline-none flex flex-col items-center gap-2 min-w-0 group"
          >
            <motion.div
              animate={{
                scale: isActive ? 1.08 : 0.88,
                opacity: isActive ? 1 : 0.65,
              }}
              whileHover={{ scale: isActive ? 1.1 : 0.95, opacity: 0.9 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="relative shrink-0"
              style={{ willChange: "transform" }}
            >
              {isActive && (
                <motion.div
                  layoutId="avatar-glow"
                  className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/80 via-primary to-primary/80 blur-xs shadow-lg shadow-primary/30"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <div className="relative">
                <Avatar className="h-11 w-11 sm:h-13 sm:w-13 md:h-15 md:w-15 border-2 border-background/90 shadow-md">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs sm:text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </motion.div>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono font-medium text-foreground whitespace-nowrap absolute top-full mt-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 border border-primary/40 shadow-sm flex items-center gap-1.5"
              >
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span>{user.name}</span>
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
};
