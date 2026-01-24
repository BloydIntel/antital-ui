"use client"

import React, { useEffect, useRef } from 'react';
import { TestimonialCard } from '@/components/testimonials/molecules/testimonial-card';

interface TestimonialsProps {
  className?: string;
}

// Testimonials data
const testimonialsData = [
  {
    id: '1',
    quote: 'Raising our seed round on Antital was a game changer. The platform connected us with strategic investors who brought not just capital, but invaluable industry expertise.',
    authorName: 'Ngozi Okoronkwo',
    authorTitle: 'COO of Future Designs',
    avatarSrc: '/avatars/ngozi.jpg',
  },
  {
    id: '2',
    quote: 'Antital made fundraising simple and transparent. We attracted investors who truly believed in our vision and helped us refine our long-term growth strategy.',
    authorName: 'Tunde Adebayo',
    authorTitle: 'Product Lead, FinPort Technologies',
    avatarSrc: '/avatars/Tunde.jpg',
  },
  // We'll duplicate these for seamless infinite scroll
];

export function Testimonials({ className }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5; // Pixels per frame

    const animate = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        // Calculate the width of one set of testimonials
        const cardWidth = 625; // Width of each card
        const gap = 32; // Gap between cards
        const singleSetWidth = testimonialsData.length * (cardWidth + gap);

        const currentScroll = scrollContainer.scrollLeft;
        let nextScroll = currentScroll + scrollSpeed;

        if (nextScroll >= singleSetWidth) {
          nextScroll = 0;
        }

        scrollContainer.scrollLeft = nextScroll;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (!scrollRef.current) return;

      const walk = e.pageX - startXRef.current;
      scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    document.addEventListener('mousemove', handleMouseMoveGlobal);

    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
    };
  }, []);

  // ---- Mouse drag (desktop) ----
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;

    const walk = e.pageX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // ---- Touch drag (mobile) ----
  const handleTouchStart = (e: React.TouchEvent) => {
    isPausedRef.current = true;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX;
    scrollLeftRef.current = scrollRef.current!.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;

    e.preventDefault();

    const walk = e.touches[0].pageX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    isPausedRef.current = false;
    isDraggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollRef.current) return;

    const step = 80;

    if (e.key === 'ArrowRight') {
      scrollRef.current.scrollLeft += step;
    }

    if (e.key === 'ArrowLeft') {
      scrollRef.current.scrollLeft -= step;
    }
  };

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className={`w-full bg-white py-[62px] overflow-hidden ${className}`}>
      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-[80px] max-w-[600px]">
          <h2
            className="font-rethink-sans font-medium text-[36px] leading-[43px] tracking-[-0.01em] text-[#01100E]"
          >
            Success stories from our community.
          </h2>
          <p
            className="font-dm-sans font-normal text-lg leading-[23px] tracking-[-0.01em] text-[#505050]"
          >
            Hear from the investors and founders building Africa&apos;s future with Antital.
          </p>
        </div>

      </div>

      {/* Scrolling Container - Full width, starts from left edge with padding */}
      <div
        ref={scrollRef}
        className="overflow-x-scroll overflow-y-visible relative w-full cursor-grab active:cursor-grabbing"
        style={{
          scrollBehavior: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        {/* Hide scrollbar for webkit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
        `}</style>

        {/* Testimonials Track - padding left only, like Figma */}
        <div className="flex flex-row items-start gap-8 w-max pl-4 md:pl-6 lg:pl-12 xl:pl-[104px]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              quote={testimonial.quote}
              authorName={testimonial.authorName}
              authorTitle={testimonial.authorTitle}
              avatarSrc={testimonial.avatarSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

