"use client"

import React from 'react'
import { TestimonialItem } from '../molecules/testimonial-item'
import type { Testimonial } from '@/types/investment'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return (
      <p className="text-muted-foreground font-dm-sans text-base">No testimonials yet.</p>
    )
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[816px] gap-8">
      <div className="flex flex-col items-center w-full gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialItem
            key={testimonial.id}
            quote={testimonial.quote}
            author={`${testimonial.authorName}${testimonial.authorTitle ? `, ${testimonial.authorTitle}` : ''}`}
            avatar={testimonial.imageUrl ?? '/avatars/adara.jpg'}
            initialLikes={0}
            initialLiked={false}
          />
        ))}
      </div>
    </div>
  )
}
