"use client"

import React, { useEffect, useRef } from 'react';
import { TestimonialCard } from '@/components/testimonials/molecules/testimonial-card';

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

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Calculate the width of one set of testimonials
      const cardWidth = 625; // Width of each card
      const gap = 32; // Gap between cards
      const singleSetWidth = testimonialsData.length * (cardWidth + gap);
      
      // Reset scroll position when we've scrolled through one complete set
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className="w-full bg-white py-[62px] overflow-hidden">
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
            Hear from the investors and founders building Africa's future with Antital.
          </p>
        </div>

      </div>

      {/* Scrolling Container - Full width, starts from left edge with padding */}
      <div
        ref={scrollRef}
        className="overflow-x-scroll overflow-y-visible relative w-full"
        style={{
          scrollBehavior: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
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

