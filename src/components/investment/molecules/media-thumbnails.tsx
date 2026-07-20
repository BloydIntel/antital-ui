"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ThumbsUp, Share2 } from 'lucide-react'
import { shareCurrentPage } from '@/lib/share-page'

interface MediaThumbnailsProps {
  thumbnails?: string[]
  onThumbnailClick?: (index: number) => void
}

export function MediaThumbnails({ 
  thumbnails = [
    '/investments/Nexus_thumbnail1.png',
    '/investments/Nexus_thumbnail2.png',
    '/investments/Nexus_thumbnail3.png',
  ],
  onThumbnailClick
}: MediaThumbnailsProps) {
  const [liked, setLiked] = useState(false)

  return (
    <div 
      className="flex flex-row justify-between items-center w-full max-w-[816px]"
      style={{
        height: '41px',
      }}
    >
      {/* Thumbnails Container */}
      <div 
        className="flex flex-row items-center"
        style={{
          gap: '8px',
          height: '41px',
        }}
      >
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => onThumbnailClick?.(index)}
            style={{
              width: '72px',
              height: '41px',
              borderRadius: '4px',
              border: index === 0 ? '1px solid #A7B832' : 'none',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="72px"
            />
          </div>
        ))}
      </div>

      {/* Like and Share Icons Container */}
      <div 
        className="flex flex-row items-center"
        style={{
          gap: '16px',
          height: '24px',
        }}
      >
        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="cursor-pointer border-none bg-transparent p-0"
          style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <ThumbsUp
            className="text-[#4A90E2]"
            fill={liked ? '#4A90E2' : 'none'}
            style={{
              width: '24px',
              height: '24px',
            }}
          />
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={() => {
            void shareCurrentPage()
          }}
          className="cursor-pointer border-none bg-transparent p-0"
          style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Share"
        >
          <Share2
            className="text-[#4A90E2]"
            style={{
              width: '24px',
              height: '24px',
            }}
          />
        </button>
      </div>
    </div>
  )
}
