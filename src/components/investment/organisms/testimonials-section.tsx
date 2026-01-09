"use client"

import React from 'react'
import { TestimonialItem } from '../molecules/testimonial-item'
import { Button } from '@/components/ui/button'

const testimonialsData = [
  {
    quote: "Investing in Nexus AI was a game-changer! The AI-driven supply chain solutions have greatly improved our efficiency. I'm excited to see what's next!",
    author: "Adebayo A.",
    avatar: "/avatars/Tunde.jpg",
    likes: 45,
    liked: true,
  },
  {
    quote: "I'm so glad I invested in Nexus AI. Their innovative approach to logistics has already saved us time and money. Looking forward to the webinar!",
    author: "Nkechi I.",
    avatar: "/avatars/lady1.png",
    likes: 32,
    liked: false,
  },
  {
    quote: "Being an early backer of Nexus AI has been incredibly rewarding. Their vision and execution are top-notch. Can't wait for the live Q&A!",
    author: "Chinedu O.",
    avatar: "/avatars/alex_chen.jpg",
    likes: 28,
    liked: false,
  },
  {
    quote: "The partnership announcements are exciting! Nexus AI's strategic collaborations are a testament to their growth potential. Looking forward to the webinar to learn more!",
    author: "Fatima Y.",
    avatar: "/avatars/lady2.jpg",
    likes: 42,
    liked: false,
  },
  {
    quote: "The beta program is fantastic! Providing feedback and shaping the future of Nexus AI's product is an amazing opportunity. Count me in!",
    author: "Emeka D.",
    avatar: "/avatars/ngozi.jpg",
    likes: 15,
    liked: true,
  },
]

export function TestimonialsSection() {
  return (
    <div
      className="flex flex-col items-center w-full max-w-[816px]"
      style={{
        gap: '32px',
      }}
    >
      {/* Testimonials List */}
      <div
        className="flex flex-col items-center w-full"
        style={{
          gap: '32px',
        }}
      >
        {testimonialsData.map((testimonial, index) => (
          <TestimonialItem
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            avatar={testimonial.avatar}
            initialLikes={testimonial.likes}
            initialLiked={testimonial.liked}
          />
        ))}
      </div>

      {/* Read More Button */}
      <Button
        variant="outline"
        className="border-[#A8A8A8] text-[#A7B832] hover:bg-[#A7B832] hover:text-white hover:border-[#A7B832] dark:hover:bg-[#A7B832] dark:hover:text-white dark:hover:border-[#A7B832]"
        style={{
          width: '111px',
          height: '48px',
          padding: '8px 16px',
          borderRadius: '8px',
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '21px',
        }}
      >
        Read more
      </Button>
    </div>
  )
}
