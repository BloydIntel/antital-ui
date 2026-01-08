'use client'

import React, { useState } from 'react'
import { ThumbsUp } from 'lucide-react'

interface UpdateItemProps {
  date: string
  title: string
  body: string
  likeCount: number
}

export function UpdateItem({ date, title, body, likeCount }: UpdateItemProps) {
  const [liked, setLiked] = useState(false)
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)

  const handleLike = () => {
    if (liked) {
      setCurrentLikeCount(currentLikeCount - 1)
    } else {
      setCurrentLikeCount(currentLikeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="flex flex-row items-start w-full relative">
      {/* Date Column - positioned absolutely to align with timeline */}
      <div
        className="absolute left-[-120px]"
        style={{
          width: '120px',
        }}
      >
        <span
          className="text-muted-foreground"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
          }}
        >
          {date}
        </span>
      </div>

      {/* Content Box */}
      <div
        className="flex-1 bg-background border border-[#EAEAEA] rounded p-4"
      >
        {/* Title */}
        <h3
          className="mb-2 text-foreground"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '22px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>

        {/* Body Text */}
        <p
          className="mb-3 text-muted-foreground"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
          }}
        >
          {body}
        </p>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-row items-center gap-2 px-3 py-1.5 border border-[#EAEAEA] rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
          }}
        >
          <ThumbsUp
            className={liked ? 'text-[#7A6FF0] fill-[#7A6FF0]' : ''}
            style={{
              width: '16px',
              height: '16px',
            }}
          />
          <span>Like ({currentLikeCount})</span>
        </button>
      </div>
    </div>
  )
}

