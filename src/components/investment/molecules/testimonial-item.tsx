"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ThumbsUp } from 'lucide-react'

interface TestimonialItemProps {
  quote: string
  author: string
  avatar: string
  initialLikes: number
  initialLiked?: boolean
}

export function TestimonialItem({
  quote,
  author,
  avatar,
  initialLikes,
  initialLiked = false,
}: TestimonialItemProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div
      className="flex flex-row items-end w-full"
      style={{
        gap: '16px',
      }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 relative">
        <Image
          src={avatar}
          alt={author}
          fill
          className="object-cover rounded-full"
          sizes="(min-width: 1024px) 64px, 48px"
        />
      </div>

      {/* Testimonial Card */}
      <div
        className="flex flex-col items-start flex-1 bg-white dark:bg-[#1A1A1A] border border-[#EAEAEA] dark:border-[#404040]"
        style={{
          padding: '24px 16px',
          gap: '32px',
          borderRadius: '4px',
        }}
      >
        {/* Quote and Like Container */}
        <div
          className="flex flex-col items-start w-full"
          style={{
            gap: '16px',
          }}
        >
          {/* Quote Text */}
          <p
            className="text-[#505050] dark:text-muted-foreground w-full"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '23px',
              letterSpacing: '-0.01em',
            }}
          >
            {quote} - {author}
          </p>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex flex-row items-center cursor-pointer border-none bg-transparent p-0"
            style={{
              gap: '8px',
            }}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <ThumbsUp
              className="text-[#6259C0]"
              fill={liked ? '#6259C0' : 'none'}
              strokeWidth={liked ? 0 : 1.5}
              style={{
                width: '24px',
                height: '24px',
              }}
            />
            <span
              className="text-[#6259C0]"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '21px',
                letterSpacing: '0.01em',
              }}
            >
              Like ({likeCount})
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
