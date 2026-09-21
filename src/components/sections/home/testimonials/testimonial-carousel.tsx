"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AvatarCarousel } from "./avatar-carousel";
import { MessageCard } from "./message-card";
import { UserData } from "@/data/user-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCarouselProps {
  users: UserData[];
}

export const TestimonialCarousel = ({ users }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    slidesToScroll: 1,
    duration: 20,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const rafId = requestAnimationFrame(() => onSelect());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      cancelAnimationFrame(rafId);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll effect
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => {
      clearInterval(autoScroll);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="mx-auto w-full space-y-6 sm:space-y-8 md:space-y-10">
      <AvatarCarousel
        users={users}
        activeIndex={activeIndex}
        onAvatarClick={scrollTo}
      />

      <div className="relative">
        <div className="embla overflow-hidden px-4 sm:px-0" ref={emblaRef}>
          <div className="embla__container flex cursor-grab active:cursor-grabbing touch-pan-y select-none py-2">
            {users.map((user, index) => (
              <MessageCard
                key={user.id}
                message={user.message}
                name={user.name}
                avatar={user.avatar}
                role={user.role}
                company={user.company}
                project={user.project}
                rating={user.rating}
                date={user.date}
                vimeoId={user.vimeoId}
                isActive={activeIndex === index}
              />
            ))}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {users.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
